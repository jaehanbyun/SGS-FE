import React, { useEffect } from "react";
import Video from "../../components/Video";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { disconnect, subscribe, unsubscribe } from "../../utils/stomp";

const StudyRoom = () => {
  const { roomId } = useParams();
  const { selectedUserInfo } = useSelector((state) => state);
  useEffect(() => {
    subscribe(selectedUserInfo.client, roomId, null);

    return () => {
      unsubscribe(selectedUserInfo.client, roomId);
      disconnect(selectedUserInfo.client);
    };
  }, []);

  return <Video roomId={roomId} />;
};

export default StudyRoom;
