import React, { useEffect, useState } from "react";
import Menu from "./Menu";
import Input from "./Input";
import Messages from "./Messages";
import style from "../styles/layout.module.scss";
import { db, analytics, logEventFun } from "../firebase";
// import { ref, set, push } from "firebase/database";
import "firebase/analytics";
import { setUserId } from "firebase/analytics";
import { v4 as uuidv4 } from "uuid";
import { SignUp } from "./SignUp";
import { ref, onValue, query, orderByChild, limitToLast } from "firebase/database";

function MainChat() {
    const [state, setState] = useState({
        isLoading: true,
    });
    const [userState, setUserState] = useState({ user: {}, hasUser: false });
    const [messages, setMessages] = useState([]);
    const [reply, setReply] = useState(null);
    const MessageListRef = query(ref(db, "messages"), limitToLast(100));

    const removeUser = () => {
        setUserState({
            user: {},
            hasUser: false,
        });
        localStorage.removeItem("user");
        logEventFun("user removed");
    };
    const setUser = (name) => {
        let id = uuidv4();
        const user = {
            id,
            name,
        };
        logEventFun("new");
        setUserId(analytics, `${id}`);
        localStorage.setItem("user", JSON.stringify(user));
        setUserState({ user, hasUser: true });
        getMessages(user);
    };

    useEffect(() => {
        console.log(analytics && true);
        //check if userdata is in localstorage
        if (JSON.parse(localStorage.getItem("user"))?.name) {
            setUserState({ user: JSON.parse(localStorage.getItem("user")), hasUser: true });
            getMessages(JSON.parse(localStorage.getItem("user")));
        }
    }, []);

    const getMessages = () => {
        onValue(MessageListRef, (snapshot) => {
            let messagesObj = snapshot.val();
            let messagesQuery = Object.entries(snapshot.val()).map((mess) => {
                return {
                    id: mess[0],
                    ...mess[1],
                };
            });

            // console.log(messagesQuery, messagesObj, "messagesObj");
            messagesQuery = messagesQuery.map((message) => {
                if (message.reply) {
                    let tmp = messagesObj[message.reply] ? messagesObj[message.reply] : { ...message.reply, content: null, user: { name: "" } };
                    let reply = {
                        id: message.reply,
                        reply: null,
                        ...tmp,
                    };
                    message.reply = reply;
                }
                return message;
            });
            // console.log(messagesQuery);
            setMessages(messagesQuery);
            setState({ ...state, isLoading: false });
        });
    };

    if (!userState.hasUser) {
        const onSubmit = (e) => {
            e.preventDefault();
            const name = e.target.elements.name.value;
            if (name.length === 0) {
                alert("Please enter a username");
            } else if (name.toLocaleLowerCase() === process.env.REACT_APP_AdminName) {
                alert("can't use username, reserved for creator only");
            } else {
                setUser(name);
            }
        };

        return <SignUp onSubmit={onSubmit} />;
    }

    return (
        <div className={style.layout}>
            <header className={style.head}>
                <span>
                    <img src="/Nonymous.png" style={{ height: "2rem", width: "4rem" }} alt="logo" />
                    <p style={{ fontSize: "0.8rem" }}>feel free to say whatever you want, no one knows it is you</p>
                </span>
                <Menu {...{ ...userState.user, removeUser }} />
            </header>

            <main style={{ height: "100%", position: "absolute", width: "98vw", height: "90vh", top: "10vh" }}>
                <Messages style={{ height: reply ? "78%" : "83%" }} {...{ user: userState.user, messages, isLoading: state.isLoading, setReply }}></Messages>
                <Input {...{ user: userState.user, setReply, reply }}></Input>
            </main>
        </div>
    );
}

export default MainChat;
