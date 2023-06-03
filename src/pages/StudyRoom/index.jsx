import React, { useEffect, useState } from "react";
import Video from "../../components/Video";
import { useParams } from "react-router-dom";
// import { useSelector } from "react-redux";
// import Lobby from "../../components/Lobby";
// import Profile from "../../components/Profile";
// import ProfileEditModal from "../../components/Modal/ProfileEditModal";
// import SideBar from "../../components/SideBar";
// import styles from "./Main.module.css";
// import CalendarModal from "../../components/Modal/CalendarModal";
// import ChartModal from "../../components/Modal/ChartModal";

const StudyRoom = () => {
  const { roomId } = useParams();
  return <Video roomId={roomId} />;
};

export default StudyRoom;
