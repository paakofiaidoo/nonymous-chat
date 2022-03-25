import React, { useState, useRef, useEffect } from "react";
import style from "./styles.module.scss";
import { db, logEventFun } from "../../firebase";
import { ref, set, push } from "firebase/database";

function Input({ user, setReply, reply }) {
    const [message, setMessage] = useState("");
    const MessageListRef = ref(db, "messages");
    const input = useRef();
    let limit = 300;
    const writeMessageData = (message) => {
        const newMessageRef = push(MessageListRef);
        set(newMessageRef, {
            ...message,
        });
        return newMessageRef.key;
    };
    // console.log(reply, user);
    const send = (e) => {
        e.preventDefault();
        if (message.length > limit) {
            alert("message above test limit of 300");
        } else if (message.length > 0) {
            let time = Date();
            //fetch current time from public api
            fetch("https://worldtimeapi.org/api/timezone/Africa/Accra")
                .then((res) => res.json())
                .then((data) => {
                    time = new Date(data.datetime);
                });
            writeMessageData({ content: message, user, date: time, reply: reply ? reply.id : null });
            setMessage("");
            setReply(null);
            logEventFun("sent message");
        } else {
            alert("Please enter a message");
        }
    };
    useEffect(() => {
        input.current.focus();
        // console.log(reply);
    }, [reply]);

    return (
        <form className={style.input}>
            <div className={style.form}>
                {!!reply && (
                    <div className={style.replyBox}>
                        <span className={style.username}>
                            {reply.user.name}{" "}
                            <span
                                onClick={() => {
                                    setReply(null);
                                }}
                                style={{
                                    cursor: "pointer",
                                    color: "black",
                                    fontSize: "1rem",
                                    fontWeight: " 900",
                                }}
                            >
                                X
                            </span>
                        </span>
                        <p className={style.reply}>{reply.content}</p>
                    </div>
                )}
                <input
                    className={`${style.container} ${style.inputField}`}
                    type="text"
                    placeholder="try saying hello..."
                    value={message}
                    ref={input}
                    maxLength={limit}
                    autoFocus
                    spellCheck="true"
                    onChange={(e) => {
                        setMessage(e.target.value);
                    }}
                />
                {message.length === limit && (
                    <spam
                        style={{
                            color: "red",
                            fontSize: "0.8rem",
                        }}
                    >
                        text has limit of {limit}
                    </spam>
                )}
            </div>
            <button type="submit" disabled={message.length > limit || message.length === 0 ? "true" : null} onClick={send} className={style.send}>
                <div className={style.svgWrapper}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                        <path fill="none" d="M0 0h24v24H0z"></path>
                        <path
                            fill="currentColor"
                            d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
                        ></path>
                    </svg>
                </div>
                <span>Send</span>
            </button>
        </form>
    );
}

export default Input;
