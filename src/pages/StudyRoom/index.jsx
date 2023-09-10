import React, { useEffect, useState } from "react";
import styles from "./StudyRoom.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { disconnect, subscribe, unsubscribe } from "../../utils/stomp";
import VideoScreen from "../../components/VideoScreen";
import Chat from "../../components/Chat";
import { setSelectedUserInfo } from "../../redux/selectedUserInfo/slice";
import moment from "moment";

const StudyRoom = ({ signaling }) => {
  const { roomId } = useParams();
  const { selectedUserInfo } = useSelector((state) => state);
  const [chatList, setChatList] = useState([]);
  const [participants, setParticipants] = useState({});
  const [timerText, setTimerText] = useState("타이머 시작");
  const [timerState, setTimerState] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    signaling.socket = new WebSocket("wss://sgs.p-e.kr:8051/socket");
    signaling.socket.onopen = () => {
      console.log("signaling socket open");
      signaling.joinRoom(selectedUserInfo.id, roomId);
      signaling.socket.onmessage = async (message) => {
        const parsedMessage = JSON.parse(message.data);
        if (parsedMessage.id !== "onIceCandidate")
          console.info("Received message: ", parsedMessage);
        switch (parsedMessage.id) {
          case "existingParticipants":
            await signaling.onExistingParticipants(parsedMessage);
            break;
          case "newParticipantArrived":
            await signaling.receiveVideo(parsedMessage.member);
            break;
          case "participantLeft":
            await signaling.onParticipantLeft(parsedMessage);
            setParticipants({ ...signaling._participants });
            break;
          case "receiveVideoAnswer":
            await signaling.receiveVideoResponse(parsedMessage);
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
            setParticipants({ ...signaling._participants });
            break;
          case "myInfo":
            await signaling.myInfo(parsedMessage);
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
          case "ALERT":
            alert(`경고 ${parsedMessage.alertCount}회`);
            break;
          case "KICK_OUT":
            for (const key in signaling._participants) {
              signaling._participants[key].rtcPeer.dispose();
              console.log(participants);
            }
            signaling._participants = {};
            setParticipants({ ...signaling._participants });
            await signaling.socket.close();
            navigate("/main");
            break;
          case "DELEGATE":
            dispatch(
              setSelectedUserInfo({
                ...selectedUserInfo,
                master: parsedMessage.userId,
              })
            );
            alert(`${parsedMessage.userId}가 방장이 되었습니다.`);
            setParticipants({ ...signaling._participants });
            break;
          case "RESET":
            Object.keys(signaling._participants).map(
              (k) => (signaling._participants[k].studyTime = "00:00:00")
            );
            setParticipants({ ...signaling._participants });
            setTimerState(false);
            setTimerText("타이머 시작");
            await signaling.sendMessage({
              id: "timerState",
              timerState: false,
              time: moment().format("HH:mm:ss"),
            });
            break;
          default:
            console.error("Unrecognized message", parsedMessage);
        }
      };
    };
    subscribe(selectedUserInfo.client, roomId, setChatList);
    return () => {
      signaling.socket.close();
      unsubscribe(selectedUserInfo.client, roomId);
      disconnect(selectedUserInfo.client);
    };
  }, [selectedUserInfo.client, roomId]);

  return (
    <div className={styles.studyroom}>
      <VideoScreen
        participants={participants}
        signaling={signaling}
        roomId={roomId}
        timerState={timerState}
        timerText={timerText}
        setTimerState={setTimerState}
        setTimerText={setTimerText}
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
