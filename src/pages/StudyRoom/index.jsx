import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { disconnect, subscribe, unsubscribe } from "../../utils/stomp";
import VideoScreen from "../../components/VideoScreen";

const StudyRoom = ({ signaling }) => {
  const { roomId } = useParams();
  const { selectedUserInfo } = useSelector((state) => state);
  useEffect(() => {
    subscribe(selectedUserInfo.client, roomId, null);
    signaling.uid = selectedUserInfo.id;
    return () => {
      unsubscribe(selectedUserInfo.client, roomId);
      disconnect(selectedUserInfo.client);
    };
  }, [selectedUserInfo.client, roomId]);

  return <VideoScreen signaling={signaling} roomId={roomId} />;
};

export default StudyRoom;
