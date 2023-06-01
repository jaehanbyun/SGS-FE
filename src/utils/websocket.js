import { Participant } from "./participants";
import { WebRtcPeer } from "kurento-utils";
export const ws = new WebSocket("wss://localhost:8443/socket");

var participants = {};
let name;
ws.addEventListener("open", () => {
  console.log("open");
});

ws.addEventListener("close", () => {
  console.log("close");
});
ws.onmessage = function (message) {
  var parsedMessage = JSON.parse(message.data);
  console.info("Received message: " + message.data);

  switch (parsedMessage.id) {
    case "existingParticipants":
      console.info("!!!!!!!!!why existingParticipants");
      onExistingParticipants(parsedMessage);
      break;
    case "newParticipantArrived":
      console.info("!!!!!!!!!why new");
      // onNewParticipant(parsedMessage);
      break;
    case "participantLeft":
      console.info("!!!!!!!!!why left");
      // onParticipantLeft(parsedMessage);
      break;
    case "receiveVideoAnswer":
      console.info("!!!!!!!!!why receive~");
      // receiveVideoResponse(parsedMessage);
      break;
    case "onIceCandidate":
      console.info("!!!!!!!!!why addIceCandidate 전");
      // participants[parsedMessage.userId].rtcPeer.addIceCandidate(
      //   parsedMessage.candidate,
      //   function (error) {
      //     console.info("!!!!!!!!!why addIceCandidate 후");
      //     if (error) {
      //       console.error("Error adding candidate: " + error);
      //       alert(error);
      //       return;
      //     }
      //   }
      // );
      break;
    default:
      console.error("Unrecognized message", parsedMessage);
  }
};

// function onNewParticipant(request) {
//   receiveVideo(request.member); // TODO : ??
// }

// function receiveVideoResponse(result) {
//   participants[result.userId].rtcPeer.processAnswer(
//     result.sdpAnswer,
//     function (error) {
//       if (error) {
//         alert(error);
//         return console.error(error);
//       }
//     }
//   );
// }

// function callResponse(message) {
//   if (message.response != "accepted") {
//     console.info("Call not accepted by peer. Closing call");
//     stop();
//   } else {
//     webRtcPeer.processAnswer(message.sdpAnswer, function (error) {
//       if (error) {
//         alert(error);
//         return console.error(error);
//       }
//     });
//   }
// }

function onExistingParticipants(msg) {
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
  console.log(name + " registered in room ");
  var participant = new Participant(name);
  participants[name] = participant;
  var video = participant.getVideoElement();

  var options = {
    localVideo: video,
    mediaConstraints: constraints,
    onicecandidate: participant.onIceCandidate.bind(participant),
  };

  participant.rtcPeer = new WebRtcPeer.WebRtcPeerSendonly(options, function (
    error
  ) {
    if (error) {
      alert(error);
      return console.error(error);
    }
    this.generateOffer(participant.offerToReceiveVideo.bind(participant));
  });

  msg.members.forEach(receiveVideo);
}

// function leaveRoom() {
//   sendMessage({
//     id: "leaveRoom",
//   });

//   for (var key in participants) {
//     participants[key].dispose();
//   }

//   document.getElementById("join").style.display = "block";
//   document.getElementById("room").style.display = "none";

//   ws.close();
// }

const receiveVideo = (sender) => {
  let userId = sender.userId;
  let videoStatus = sender.video;
  let audioStatus = sender.audio;

  // var participant = new Participant(userId, videoStatus, audioStatus);
  // participants[userId] = participant;
  // var video = participant.getVideoElement();

  // var options = {
  //   connectionConstraints: {
  //     offerToReceiveAudio: true,
  //     offerToReceiveVideo: true,
  //   },
  //   remoteVideo: video,
  //   onicecandidate: participant.onIceCandidate.bind(participant),
  // };

  // participant.rtcPeer = new kurentoUtils.WebRtcPeer.WebRtcPeerRecvonly(
  //   options,
  //   function (error) {
  //     if (error) {
  //       alert(error);
  //       return console.error(error);
  //     }
  //     this.generateOffer(participant.offerToReceiveVideo.bind(participant));
  //   }
  // );
};

export const joinRoom = (name, room) => {
  const req = {
    id: "joinRoom",
    userId: name,
    roomId: room,
    video: true,
    audio: true,
  };
  sendRequest(req);
};

export const sendRequest = (msg) => {
  const jsonReq = JSON.stringify(msg);
  console.log("Sending message: " + jsonReq);
  ws.send(jsonReq);
};
