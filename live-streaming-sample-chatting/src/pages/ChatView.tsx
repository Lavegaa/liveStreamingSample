import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import styled, { css } from "styled-components";
import * as StompJs from "@stomp/stompjs";
import SockJS from "./socket";

interface IMessage {
  userId: string;
  message: string;
}

const SCContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  height: 100vh;
  background: skyblue;
`;

const SCChatContianer = styled.div<{ position: string }>`
  display: flex;
  ${({ position }) => css`
    justify-content: ${position};
  `}
`;

const SCChat = styled.div<{ backgroundColor: string }>`
  width: fit-content;
  padding: 15px 20px;
  font-size: 20px;
  ${({ backgroundColor }) => css`
    background: ${backgroundColor};
  `}
  border-radius: 10px;
  margin: 20px;
`;

const SCSubmitContainer = styled.div`
  display: flex;
  align-items: center;
`;

const SCInput = styled.input`
  height: 50px;
  width: 100%;
  margin-right: 20px;
  font-size: 30px;
`;

const SCButton = styled.button`
  width: 200px;
  height: 100%;
  font-size: 20px;
`;

const ChatView = () => {
  const { item } = useParams();
  const [message, setMessage] = useState("");
  const [userId, setUserId] = useState<string | null>("");
  const [messages, setMessages] = useState<IMessage[]>([]);

  const client = useRef<any>({});

  const handleMessage = (
    type: string = "ENTER",
    sender: string | null = "",
    message: string = ""
  ) => {
    client.current.publish({
      destination: "/pub/chat/message",
      body: JSON.stringify({
        type: type,
        roomId: item,
        sender: sender,
        message: message,
      }),
      headers: { priority: "9" },
    });
  };

  useEffect((): any => {
    const userStorage: string | null = localStorage.getItem("userId");
    const user = userStorage !== "" ? userStorage : "default";
    setUserId(user);
    client.current = new StompJs.Client({
      webSocketFactory: () => new SockJS("/ws-stomp"),
      debug: function (str: any) {
        console.log(str);
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      onConnect: () => {
        console.log(">>>>>>>> 소켓 연결 <<<<<<<<");
        client.current.subscribe(`/sub/chat/room/${item}`, function (m: any) {
          const message = JSON.parse(m.body);
          const iMessage: IMessage = {
            userId: message.type === "ENTER" ? "" : message.sender,
            message: message.message,
          };
          setMessages((prev) => [...prev, iMessage]);
        });

        handleMessage("ENTER", user, "");
      },
      onStompError: (frame: any) => {
        console.error(frame);
      },
    });

    client.current.activate();

    return () => {
      client.current.deactivate();
    };
  }, []);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const onClick = () => {
    handleMessage("TALK", userId, message);
    setMessage("");
  };

  const onPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onClick();
    }
  };

  return (
    <SCContainer>
      {messages.map((el, idx) => {
        return (
          <SCChatContianer
            key={idx}
            position={el.userId === "qwer" ? "flex-end" : "flex-start"}
          >
            <SCChat backgroundColor={el.userId === "qwer" ? "yellow" : "white"}>
              {el.userId && `${el.userId}: `}
              {el.message}
            </SCChat>
          </SCChatContianer>
        );
      })}

      <SCSubmitContainer>
        <SCInput value={message} onChange={onChange} onKeyPress={onPress} />
        <SCButton onClick={onClick}>확인</SCButton>
      </SCSubmitContainer>
    </SCContainer>
  );
};

export default ChatView;
