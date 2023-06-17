import { WebRtcPeer } from "kurento-utils";

class Signaling {
  constructor() {
    this.socket = new WebSocket("wss://localhost:8443/socket");
    this.userId = undefined;
    this._participants = {};
    this.socket.onmessage = (message) => {
      var parsedMessage = JSON.parse(message.data);
      if (parsedMessage.id !== "onIceCandidate")
        console.info("Received message: " + message.data);

      switch (parsedMessage.id) {
        case "existingParticipants":
          this.onExistingParticipants(parsedMessage);
          break;
        case "newParticipantArrived":
          this.receiveVideo(parsedMessage.member);
          break;
        case "participantLeft":
          this.onParticipantLeft(parsedMessage);
          break;
        case "receiveVideoAnswer":
          this.receiveVideoResponse(parsedMessage);
          break;
        case "onIceCandidate":
          this._participants[parsedMessage.userId].rtcPeer.addIceCandidate(
            parsedMessage.candidate,
            function (error) {
              if (error) {
                console.error("Error adding candidate: " + error);
                alert(error);
                return;
              }
            }
          );
          break;

        // case 'videoStateAnswer' :
        //   break;

        // case 'audioStateAnswer' :
        //   break;

        // case 'timerStateAnswer' :
        //   timerResponse(parsedMessage);
        //   break;

        // case 'myInfo' :
        //   break;

        default:
          console.error("Unrecognized message", parsedMessage);
      }
    };
  }

  get participants() {
    return this._participants;
  }

  /**
   * @param {any} id
   */
  set uid(id) {
    this.userId = id;
  }

  sendMessage = (msg) => {
    const jsonReq = JSON.stringify(msg);
    console.log("Sending message: " + jsonReq);
    this.socket.send(jsonReq);
  };

  joinRoom = (name, room) => {
    const req = {
      id: "joinRoom",
      userId: name,
      roomId: room,
      video: true,
      audio: true,
    };
    this.sendMessage(req);
  };

  receiveVideo = (sender) => {
    const user = {
      id: sender.userId,
      type: "remote",
      rtcPeer: null,
    };
    this._participants[user.id] = user;
    const options = {
      connectionConstraints: {
        offerToReceiveAudio: true,
        offerToReceiveVideo: true,
      },
      onicecandidate: (candidate) => {
        this.sendMessage({
          id: "onIceCandidate",
          userId: user.id,
          candidate,
        });
      },
    };
    user.rtcPeer = WebRtcPeer.WebRtcPeerRecvonly(options);
    user.rtcPeer.generateOffer((err, offerSdp) => {
      if (err) console.error("sdp offer error");
      console.log("Invoking SDP offer callback function");
      var msg = {
        id: "receiveVideoFrom",
        userId: user.id,
        sdpOffer: offerSdp,
      };
      this.sendMessage(msg);
    });
  };

  onExistingParticipants(msg) {
    var constraints = {
      audio: true,
      video: {
        mandatory: {
          maxWidth: 320,
          maxFrameRate: 30,
          minFrameRate: 30,
        },
      },
    };
    const user = {
      id: this.userId,
      type: "local",
      rtcPeer: null,
    };
    this._participants[user.id] = user;
    const options = {
      mediaConstraints: constraints,
      onicecandidate: (candidate) => {
        this.socket.send(
          JSON.stringify({
            id: "onIceCandidate",
            userId: user.id,
            candidate,
          })
        );
      },
    };
    user.rtcPeer = WebRtcPeer.WebRtcPeerSendonly(options, function (error) {
      if (error) {
        alert(error);
        return console.error(error);
      }
    });
    user.rtcPeer.generateOffer((err, offerSdp) => {
      if (err) console.error("sdp offer error");
      console.log("Invoking SDP offer callback function");
      var msg = {
        id: "receiveVideoFrom",
        userId: user.id,
        sdpOffer: offerSdp,
      };
      console.log("send message on onExistingParticipant");
      this.socket.send(JSON.stringify(msg));
    });
    msg.members.forEach(this.receiveVideo);
  }

  receiveVideoResponse(result) {
    this._participants[result.userId].rtcPeer.processAnswer(
      result.sdpAnswer,
      function (error) {
        if (error) {
          alert(error);
          return console.error(error);
        }
      }
    );
  }

  onParticipantLeft(request) {
    console.log("Participant " + request.userId + " left");
    var participant = this._participants[request.userId];
    participant.dispose();
    delete this._participants[request.userId];
  }

  leaveRoom = () => {
    this.socket.send(JSON.stringify({ id: "leaveRoom" }));
    for (const key in this._participants) {
      this._participants[key].dispose();
    }
  };

  addICECandidate = (candidate) => {
    this._participants[this.userId].rtcPeer.addICECandidate(candidate);
  };
}

export default Signaling;
