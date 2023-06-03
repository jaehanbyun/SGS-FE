import { Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import axios from "../../api/core";

export const connect = (client) => {
  // 연결할 때
  /*client.current.webSocketFactory = function () {
    return new SockJS("http://13.209.245.103:8031/chat/connect");
  };*/
  client = Stomp.over(() => {
    return new SockJS("http://13.209.245.103:8031/chat/connect");
  });
  client.connectHeaders = {
    Authorization: axios.defaults.headers.common.Authorization,
  };
  client.activate(); // 클라이언트 활성화
  console.log("client connected");

  client.onConnect = () => {
    console.log("success");
    subscribe(client, 0, null);
  };
  return client;
};

export const subscribe = (client, roomId, setChatList) => {
  client.subscribe(
    `/topic/${roomId}`,
    (body) => {
      const json_body = JSON.parse(body.body);
      console.log(json_body);
      /*if (setChatList !== null) {
        setChatList((_chat_list) => [..._chat_list, json_body]);
      }*/
    },
    {
      Authorization: axios.defaults.headers.common.Authorization,
      id: `sub-${roomId}`,
    }
  );
};

export const publish = async (client, roomId) => {
  if (!client.connected) {
    console.log("client disconnected");
    return;
  }
  try {
    const res = await axios.post("/chat/send", {
      messageType: "TEXT",
      roomId: 1,
      content: "테스트중입니다.",
    });
    console.log(res);
  } catch (err) {
    console.log(err);
  }
};

export const moveRoom = (client, prevRoomId, roomId, setChatList) => {
  client.unsubscribe(`sub-${prevRoomId}`, {
    Authorization: axios.defaults.headers.common.Authorization,
  });
  subscribe(client, roomId, null);
};

export const disconnect = (client) => {
  // 연결이 끊겼을 때
  client.deactivate();
  console.log("client disconnected");
};
