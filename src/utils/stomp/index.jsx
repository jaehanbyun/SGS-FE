import { Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import axios from "../../api/core";

export const connect = (client) => {
  // 연결할 때
  client = Stomp.over(() => {
    return new SockJS("http://13.209.245.103:8079/chat/connect");
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
      if (setChatList !== null) {
        setChatList((_chat_list) => [..._chat_list, json_body]);
      }
    },
    {
      Authorization: axios.defaults.headers.common.Authorization,
      id: `sub-${roomId}`,
    }
  );
};

export const publish = async (client, roomId, type, content) => {
  if (!client.connected) {
    console.log("client disconnected");
    return;
  }
  try {
    await axios.post("/chat/send", {
      messageType: type,
      roomId: roomId,
      content: content,
    });
  } catch (err) {
    console.log(err);
  }
};

export const unsubscribe = (client, roomId) => {
  client.unsubscribe(`sub-${roomId}`, {
    Authorization: axios.defaults.headers.common.Authorization,
  });
};

export const disconnect = (client) => {
  // 연결이 끊겼을 때
  client.deactivate();
  console.log("client disconnected");
};
