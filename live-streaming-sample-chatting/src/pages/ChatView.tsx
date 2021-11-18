import React, { useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import * as StompJs from "@stomp/stompjs";
import SockJS from './socket';

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
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<IMessage[]>([]);

  const client = useRef<any>({});


  useEffect((): any => {
    client.current = new StompJs.Client({
      webSocketFactory: () => new SockJS("/ws"),
      debug: function (str) {
        console.log(str);
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      onConnect: () => {
        console.log(">>>>>>>> 소켓 연결 <<<<<<<<");
      },
      onStompError: (frame) => {
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
  }

  const onClick = () => {
  }

  return (
    <SCContainer>
      {
        messages.map((el, idx) => {
          return (
            <SCChatContianer key={idx} position={el.userId === 'qwer' ? 'flex-end' : 'flex-start'} >
              <SCChat backgroundColor={el.userId === 'qwer' ? 'yellow' : 'white'}>
                {el.message}
              </SCChat>
            </SCChatContianer>
          )
        })
      }

      <SCSubmitContainer>
        <SCInput value={message} onChange={onChange}/>
        <SCButton onClick={onClick}>
          확인
        </SCButton>
      </SCSubmitContainer>
    </SCContainer>
  );
};

export default ChatView;