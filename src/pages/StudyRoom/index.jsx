import React, { useEffect, useState } from "react";
import styles from "./StudyRoom.module.css";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { disconnect, subscribe, unsubscribe } from "../../utils/stomp";
import VideoScreen from "../../components/VideoScreen";
import Chat from "../../components/Chat";
import { setSelectedUserInfo } from "../../redux/selectedUserInfo/slice";

const StudyRoom = ({ signaling }) => {
  const { roomId } = useParams();
  const { selectedUserInfo } = useSelector((state) => state);
  const [chatList, setChatList] = useState([]);
  const [participants, setParticipants] = useState({});
  const dispatch = useDispatch();
  useEffect(() => {
    signaling.socket = new WebSocket("wss://localhost:8443/socket");
    signaling.socket.onopen = () => {
      console.log(chatList);
      signaling.joinRoom(selectedUserInfo.id, roomId);
      signaling.socket.onmessage = async (message) => {
        const parsedMessage = JSON.parse(message.data);
        if (parsedMessage.id !== "onIceCandidate")
          console.info("Received message: ", parsedMessage);

        switch (parsedMessage.id) {
          case "existingParticipants":
            if (parsedMessage.members.length === 0) {
              dispatch(
                setSelectedUserInfo({ ...selectedUserInfo, master: true })
              );
            }
            await signaling.onExistingParticipants(parsedMessage);
            setParticipants({ ...signaling._participants });
            break;
          case "newParticipantArrived":
            await signaling.receiveVideo(parsedMessage.member);
            setParticipants({ ...signaling._participants });
            break;
          case "participantLeft":
            await signaling.onParticipantLeft(parsedMessage);
            setParticipants({ ...signaling._participants });
            break;
          case "receiveVideoAnswer":
            await signaling.receiveVideoResponse(parsedMessage);
            setParticipants({ ...signaling._participants });
            break;
          case "onIceCandidate":
            signaling._participants[
              parsedMessage.userId
            ].rtcPeer.addIceCandidate(
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
          case "myInfo":
            signaling.myInfo(parsedMessage);
            setParticipants({ ...signaling._participants });
            break;
          case "videoStateAnswer":
            signaling._participants[parsedMessage.userId].video =
              parsedMessage.video;
            setParticipants({ ...signaling._participants });
            break;

          case "audioStateAnswer":
            signaling._participants[parsedMessage.userId].audio =
              parsedMessage.audio;
            setParticipants({ ...signaling._participants });
            break;

          case "timerStateAnswer":
            signaling._participants[parsedMessage.userId].timer =
              parsedMessage.timer;
            setParticipants({ ...signaling._participants });
            break;

          default:
            console.error("Unrecognized message", parsedMessage);
        }
      };
    };
    // subscribe(selectedUserInfo.client, roomId, setChatList);
    // return () => {
    //   unsubscribe(selectedUserInfo.client, roomId);
    //   disconnect(selectedUserInfo.client);
    // };
  }, [selectedUserInfo.client, roomId]);

  return (
    <div className={styles.studyroom}>
      <VideoScreen
        participants={participants}
        signaling={signaling}
        roomId={roomId}
      />

      <Chat
        participants={participants}
        roomId={roomId}
        chatList={chatList}
        setChatList={setChatList}
      />
    </div>
  );
};

export default StudyRoom;
