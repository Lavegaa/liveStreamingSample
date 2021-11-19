import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

interface IRoom {
  roomId: string;
  name: string;
}

const SCContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ivory;
`;

const SCInputContainer = styled.div`
  display: flex;
  margin-bottom: 100px;
`;

const SCInput = styled.input`
  width: 200px;
  height: 50px;
  font-size: 30px;
`;

const SCButton = styled.button`
  width: 100px;
  height: 50px;
  font-size: 30px;
`;

const SCRoom = styled(Link)`
  width: 80%;
  height: 50px;
  border: 1px solid black;
  margin-bottom: 30px;
  text-decoration: none;
  color: black;
`;

const Rooms = () => {
  const [id, setId] = useState("default");
  const [rooms, setRooms] = useState<IRoom[]>([]);
  const [roomName, setRoomName] = useState("");

  useEffect(() => {
    axios.get("/chat/rooms").then((res) => setRooms(res.data));
  }, []);

  useEffect(() => {
    localStorage.setItem("userId", id);
  }, [id]);

  const onChangeId = (e: React.ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
  };

  const onChangeRoomName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRoomName(e.target.value);
  };

  const onClickCreateRoom = () => {
    axios
      .post(`/chat/room?name=${roomName}`, { withCredentials: true })
      .then((res) => {
        console.log(res);
        setRoomName("");
      })
      .catch((res) => console.log(res));
  };

  const onClickEnterRoom = (roomId: string) => {
    console.log(roomId);
  };

  return (
    <SCContainer>
      <div>
        ID
        <SCInputContainer>
          <SCInput value={id} onChange={onChangeId} />
        </SCInputContainer>
      </div>
      <div>
        Rooms Create
        <SCInputContainer>
          <SCInput value={roomName} onChange={onChangeRoomName} />
          <SCButton onClick={onClickCreateRoom}>create</SCButton>
        </SCInputContainer>
      </div>
      Rooms
      {rooms.map((el) => {
        return (
          <SCRoom key={el.roomId} to={`/chat/${el.roomId}`}>
            {el.name}
          </SCRoom>
        );
      })}
    </SCContainer>
  );
};

export default Rooms;
