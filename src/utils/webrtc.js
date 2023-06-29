import { WebRtcPeer } from "kurento-utils";

class Signaling {
  constructor() {
    this.socket = null;
    this.userId = undefined;
    this.master = false;
    this._participants = {};
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

  receiveVideo = async (sender) => {
    const user = {
      id: sender.userId,
      type: "remote",
      rtcPeer: null,
      studyTime: sender.studyTime,
      timer: sender.timer,
      video: sender.video,
      audio: sender.audio,
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

  async myInfo(msg) {
    const me = msg.member;
    const user = {
      id: this.userId,
      type: "local",
      rtcPeer: null,
      studyTime: me.studyTime,
      timer: false,
      video: true,
      audio: true,
    };
    this._participants[me.userId] = user;
  }

  async onExistingParticipants(msg) {
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

    const user = this._participants[this.userId];
    const options = {
      mediaConstraints: constraints,
      onicecandidate: (candidate) => {
        this.socket.send(
          JSON.stringify({
            id: "onIceCandidate",
            userId: this.userId,
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
        userId: this.userId,
        sdpOffer: offerSdp,
      };
      this.socket.send(JSON.stringify(msg));
    });
    msg.members.forEach(this.receiveVideo);
  }

  async receiveVideoResponse(result) {
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

  async onParticipantLeft(request) {
    console.log("Participant " + request.userId + " left");
    var participant = this._participants[request.userId];
    participant[request.userId].dispose();
    delete this._participants[request.userId];
  }

  leaveRoom = () => {
    this.socket.send(JSON.stringify({ id: "leaveRoom" }));
    for (const participant of this._participants.values()) {
      participant.dispose();
    }
  };

  addICECandidate = (candidate) => {
    this._participants[this.userId].rtcPeer.addICECandidate(candidate);
  };
}

export default Signaling;
