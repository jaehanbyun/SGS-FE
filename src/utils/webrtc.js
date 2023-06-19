import { WebRtcPeer } from "kurento-utils";

class Signaling {
  constructor() {
    this.socket = null;
    this.userId = undefined;
    this.master = false;
    this.warned = 0;
    this._participants = new Map();
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
  /**
   * @param {WebSocket} ws
   */
  set webSocket(ws) {
    this.socket = ws;
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
    this._participants.set(user.id, user);
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
    this._participants.set(user.id, user);
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
    this._participants
      .get(result.userId)
      .rtcPeer.processAnswer(result.sdpAnswer, function (error) {
        if (error) {
          alert(error);
          return console.error(error);
        }
      });
  }

  onParticipantLeft(request) {
    console.log("Participant " + request.userId + " left");
    var participant = this._participants.get(request.userId);
    participant.dispose();
    this._participants.delete(request.userId);
  }

  leaveRoom = () => {
    this.socket.send(JSON.stringify({ id: "leaveRoom" }));
    for (const participant of this._participants) {
      participant.dispose();
    }
  };

  addICECandidate = (candidate) => {
    this._participants.get(this.userId).rtcPeer.addICECandidate(candidate);
  };
}

export default Signaling;
