import React, { useRef } from "react";
import styles from "./participants.module.css";
import { ws } from "../../../utils/websocket";
const Participants = ({ participants }) => {
  ws.onmessage = function (message) {
    var parsedMessage = JSON.parse(message.data);
    console.info("Received message: " + message.data);

    switch (parsedMessage.id) {
      case "existingParticipants":
        console.info("!!!!!!!!!why existingParticipants");
        //onExistingParticipants(parsedMessage);
        break;
    }
  };

  const vidRef = useRef();
  const onExistingParticipants = (msg, name, roomName) => {
    var constraints = {
      audio: true,
      video: {
        mandatory: {
          maxWidth: 320,
          maxFrameRate: 30,
          minFrameRate: 15,
        },
      },
    };
    const options = {
      localVideo: vidRef,
    };
    // console.log(name + " registered in room " + room);
    // var participant = new Participant(name);
    // participants[name] = participant;
    // var video = participant.getVideoElement();

    // var options = {
    //   localVideo: video,
    //   mediaConstraints: constraints,
    //   onicecandidate: participant.onIceCandidate.bind(participant),
    // };
    // participant.rtcPeer = new kurentoUtils.WebRtcPeer.WebRtcPeerSendonly(
    //   options,
    //   function (error) {
    //     if (error) {
    //       alert(error);
    //       return console.error(error);
    //     }
    //     this.generateOffer(participant.offerToReceiveVideo.bind(participant));
    //   }
    // );

    // msg.members.forEach(receiveVideo);
  };
  return (
    <ul className={styles.videos}>
      {participants.map((participant) => (
        <li key={participant}>
          <video ref={vidRef} className={styles.video} />
          <div className={styles.name}>{participant}</div>
        </li>
      ))}
      <li>
        <video className={styles.video} />
        <div className={styles.name}>tmp</div>
      </li>
    </ul>
  );
};

export default Participants;
