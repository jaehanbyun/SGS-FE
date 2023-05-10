const PARTICIPANT_MAIN_CLASS = "participant main";
const PARTICIPANT_CLASS = "participant";

class Participant {
  constructor(userId, videoStatus, audioStatus) {
    console.log(`참여자명 : ${userId}`);
    this.userId = userId;
    this.videoStatus = videoStatus;
    this.audioStatus = audioStatus;

    this.container = document.createElement("div");
    this.container.className = this.isPresentMainParticipant()
      ? PARTICIPANT_CLASS
      : PARTICIPANT_MAIN_CLASS;
    this.container.id = userId;

    this.span = document.createElement("span");
    this.video = document.createElement("video");
    this.rtcPeer = null;

    this.container.appendChild(this.video);
    this.container.appendChild(this.span);
    this.container.onclick = this.switchContainerClass.bind(this);
    document.getElementById("participants").appendChild(this.container);

    this.span.appendChild(document.createTextNode(userId));

    this.video.id = `video-${userId}`;
    this.video.autoplay = true;
    this.video.playsInline = true;
    this.video.controls = false;
  }

  getElement() {
    return this.container;
  }

  getVideoElement() {
    return this.video;
  }

  offerToReceiveVideo(error, offerSdp, wp) {
    if (error) {
      console.error("sdp offer error");
      return;
    }
    console.log("Invoking SDP offer callback function");
    const msg = {
      id: "receiveVideoFrom",
      userId: this.userId,
      sdpOffer: offerSdp,
    };
    sendMessage(msg);
  }

  onIceCandidate(candidate, wp) {
    console.log(`Local candidate ${JSON.stringify(candidate)}`);

    const message = {
      id: "onIceCandidate",
      userId: this.userId,
      candidate,
    };
    sendMessage(message);
  }

  dispose() {
    console.log(`Disposing participant ${this.userId}`);
    this.rtcPeer.dispose();
    this.container.parentNode.removeChild(this.container);
  }

  switchContainerClass() {
    if (this.container.className === PARTICIPANT_CLASS) {
      const elements = Array.prototype.slice.call(
        document.getElementsByClassName(PARTICIPANT_MAIN_CLASS)
      );
      elements.forEach((item) => {
        item.className = PARTICIPANT_CLASS;
      });

      this.container.className = PARTICIPANT_MAIN_CLASS;
    } else {
      this.container.className = PARTICIPANT_CLASS;
    }
  }

  isPresentMainParticipant() {
    return document.getElementsByClassName(PARTICIPANT_MAIN_CLASS).length !== 0;
  }
}
