import React, { useEffect, useState, useRef } from "react";
import MessageCard from "../MessageCard";
import styles from "./styles.module.scss";
import { db } from "../../firebase";
import {
    ref,
    onValue,
    query,
    orderByChild,
    limitToLast,
} from "firebase/database";
import Loader from "../Loader";

function Messages({ user }) {
    const [messages, setMessages] = useState([]);
    const [state, setState] = useState({
        isLoading: true,
    });
    const messagesBox = useRef();
    const MessageListRef = query(ref(db, "messages"), limitToLast(100));
    useEffect(() => {
        onValue(MessageListRef, (snapshot) => {
            setMessages(Object.values(snapshot.val()));
            setState({ ...state, isLoading: false });
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
            {state.isLoading ? (
                <Loader />
            ) : (
                messages.map((message, i) => {
                    return (
                        <MessageCard
                            {...{
                                ...message,
                                me: user.id === message.user.id,
                            }}
                            key={i}
                        />
                    );
                })
            )}
        </div>
    );
}

export default Messages;
