import React, { useEffect, useState } from "react";
import styles from "./StudyRoom.module.css";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { disconnect, subscribe, unsubscribe } from "../../utils/stomp";
import VideoScreen from "../../components/VideoScreen";
import Chat from "../../components/Chat";

const StudyRoom = ({ signaling }) => {
  const { roomId } = useParams();
  const { selectedUserInfo } = useSelector((state) => state);
  const [chatList, setChatList] = useState([]);

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
    subscribe(selectedUserInfo.client, roomId, setChatList);
    signaling.uid = selectedUserInfo.id;
    return () => {
      unsubscribe(selectedUserInfo.client, roomId);
      disconnect(selectedUserInfo.client);
    };
  }, [selectedUserInfo.client, roomId]);

  return (
    <div className={styles.studyroom}>
      (
      <VideoScreen
        studyTime={studyTime}
        signaling={signaling}
        roomId={roomId}
      />
      )
      <Chat roomId={roomId} chatList={chatList} setChatList={setChatList} />
    </div>
  );
};

export default StudyRoom;
