import React, { useEffect, useState, useRef } from "react";
import MessageCard from "../MessageCard";
import styles from "./styles.module.scss";
import { db } from "../../firebase";
import { ref, onChildAdded, onValue, get, child } from "firebase/database";

function Messages({ user }) {
    const [messages, setMessages] = useState([]);
    const [state, setState] = useState({
        isLoading: false,
    });
    const messagesBox = useRef();
    const MessageListRef = ref(db, "messages");
    useEffect(() => {
        onValue(MessageListRef, (snapshot) => {
            setMessages(Object.values(snapshot.val()));
            setState({ ...state, isLoading: true });
        });
    }, []);
    const scrollBottom = (e) => {
        console.log(e.scrollTop, e.scrollHeight, e.clientHeight);
        e.scrollTop = e.scrollHeight;
    };

    useEffect(() => {
        if (messagesBox.current !== null) {
            scrollBottom(messagesBox.current);
        }
    });

    return (
        <div className={styles.messages} ref={messagesBox}>
            {messages.map((message, i) => {
                return (
                    <MessageCard
                        {...{ ...message, me: user.id === message.user.id }}
                        key={i}
                    />
                );
            })}
        </div>
    );
}

export default Messages;
