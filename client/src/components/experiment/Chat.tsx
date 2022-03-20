import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useSocket } from "../../contexts/SocketIo/actions/useSocket";
import { useUser } from "../../contexts/User/actions/UserAction";
import FormWrapper from "../nested-Components/FormWrapper";
import InputWrapper from "../nested-Components/InputWrapper";

interface ChatProps {}

const Chat: React.FC<ChatProps> = ({}) => {
  const { socket } = useSocket();
  const [chat, setChat] = useState("");
  const [senderName, setSenderName] = useState("");
  const [senderId, setSenderId] = useState(0);
  const [userState] = useUser();

  useEffect(() => {
    socket?.on("receiveChat", (data) => {
      console.log("receiveChat...");
      setChat(data.chat);
      setSenderId(data.senderId);
      setSenderName(data.senderName);
    });
  }, [socket]);

  return (
    <div>
      <div>senderName: {senderName}</div>
      <div>senderId: {senderId}</div>

      <div>{chat}</div>

      <Formik
        initialValues={{ chat, to: "" }}
        onSubmit={(value) => {
          if (userState.user)
            socket?.emit("sendChat", {
              chat: value.chat,
              reciverId: +value.to,
              senderId: userState.user.id,
              senderName: userState.user.username,
            });

          setChat(value.chat);
        }}
      >
        {(props) => (
          <FormWrapper props={props} formUsage="Create Post">
            <InputWrapper label="chat" name="chat" />
            <InputWrapper label="to" name="to" />
          </FormWrapper>
        )}
      </Formik>
    </div>
  );
};

export default Chat;
