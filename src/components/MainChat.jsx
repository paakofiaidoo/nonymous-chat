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

function MainChat() {
    const [state, setState] = useState({
        user: {},
        hasUser: false,
    });
    // const userListRef = ref(db, "users");
    // const writeUserData = (name) => {
    //     const newUserRef = push(userListRef);
    //     set(newUserRef, {
    //         username: name,
    //     });

    //     return newUserRef.key;
    // };
    const removeUser = () => {
        setState({
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
        setState({
            user,
            hasUser: true,
        });
        localStorage.setItem("user", JSON.stringify(user));
    };

    useEffect(() => {
        console.log(analytics && true);
        //check if userdata is in localstorage
        if (JSON.parse(localStorage.getItem("user"))?.name) {
            setState({
                ...state,
                user: JSON.parse(localStorage.getItem("user")),
                hasUser: true,
            });
        }
    }, []);

    if (!state.hasUser) {
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

        return (
            <div className={style.container}>
                <div className={style.card}>
                    <img src="/Nonymous.png" style={{ height: "5rem", width: "5rem" }} alt="logo" />

                    <h1 style={{ textAlign: "center" }}>
                        Welcome to Nonymous
                        <p style={{ fontSize: ".8rem", marginBottom: "2rem" }}>
                            feel free to say whatever you want,
                            <br /> no one knows it is you
                        </p>
                    </h1>
                    <h3>Create a username</h3>

                    <form onSubmit={onSubmit}>
                        <input type="text" name="name" placeholder="Enter a username" />
                        <span
                            style={{
                                fontSize: "0.8rem",
                                marginTop: "0.3rem",
                                marginBottom: "1rem",
                            }}
                        >
                            Don't Use Your Real Name, it defeat the idea of anonymous
                        </span>
                        <button type="submit">Submit</button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className={style.layout}>
            <header className={style.head}>
                <img src="/Nonymous.png" style={{ height: "4rem", width: "4rem" }} alt="logo" />

                <h2>
                    Nonymous
                    <p style={{ fontSize: "0.8rem" }}>feel free to say whatever you want, no one knows it is you</p>
                </h2>
                <Menu {...{ ...state.user, removeUser }} />
            </header>

            <main style={{ height: "100%" }}>
                <Messages user={state.user}></Messages>
                <Input {...{ user: state.user }}></Input>
            </main>
        </div>
    );
}

export default MainChat;
