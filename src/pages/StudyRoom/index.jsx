import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { disconnect, subscribe, unsubscribe } from "../../utils/stomp";
import VideoScreen from "../../components/VideoScreen";

const StudyRoom = ({ signaling }) => {
  const { roomId } = useParams();
  const { selectedUserInfo } = useSelector((state) => state);
  const [studyTime, setStudyTime] = useState("");
  signaling.socket.onmessage = (message) => {
    var parsedMessage = JSON.parse(message.data);
    if (parsedMessage.id !== "onIceCandidate")
      console.info("Received message: " + message.data);
    switch (parsedMessage.id) {
      case "existingParticipants":
        signaling.onExistingParticipants(parsedMessage);
        if (parsedMessage.members.length === 0) {
          signaling.master = true;
        }
        break;
      case "newParticipantArrived":
        signaling.receiveVideo(parsedMessage.member);
        break;
      case "participantLeft":
        signaling.onParticipantLeft(parsedMessage);
        break;
      case "receiveVideoAnswer":
        signaling.receiveVideoResponse(parsedMessage);
        break;
      case "onIceCandidate":
        signaling._participants
          .get(parsedMessage.userId)
          .rtcPeer.addIceCandidate(parsedMessage.candidate, function (error) {
            if (error) {
              console.error("Error adding candidate: " + error);
              alert(error);
              return;
            }
          });
        break;
      case "myInfo":
        console.log(parsedMessage.member.studyTime);
        setStudyTime(parsedMessage.member.studyTime);
        // setStudyTime(parsedMessage.studyTime);
        break;
      // case 'videoStateAnswer' :
      //   break;

      // case 'audioStateAnswer' :
      //   break;

      // case 'timerStateAnswer' :
      //   timerResponse(parsedMessage);
      //   break;

      default:
        console.error("Unrecognized message", parsedMessage);
    }
  };
  useEffect(() => {
    subscribe(selectedUserInfo.client, roomId, null);
    signaling.uid = selectedUserInfo.id;
    return () => {
      unsubscribe(selectedUserInfo.client, roomId);
      disconnect(selectedUserInfo.client);
    };
  }, [selectedUserInfo.client, roomId]);

  return (
    <VideoScreen studyTime={studyTime} signaling={signaling} roomId={roomId} />
  );
};

export default StudyRoom;
