import React, { useEffect } from "react";
import Video from "../../components/Video";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { disconnect, subscribe, unsubscribe } from "../../utils/stomp";
import { setSelectedRoomInfo } from "../../redux/selectedRoomInfo/slice";

const StudyRoom = () => {
  const { roomId } = useParams();
  const { selectedUserInfo } = useSelector((state) => state);
  const { selectedRoomInfo } = useSelector((state) => state);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSelectedRoomInfo({ ...selectedRoomInfo, roomId: roomId }));
    subscribe(selectedUserInfo.client, roomId, null);

    return () => {
      unsubscribe(selectedUserInfo.client, roomId);
      disconnect(selectedUserInfo.client);
    };
  }, []);

  return <Video roomId={roomId} />;
};

export default StudyRoom;
