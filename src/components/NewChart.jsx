import React, { useEffect, useState } from "react";
import Menu from "./Menu";
import Input from "./Input";
import Messages from "./Messages";
import style from "../styles/layout.module.scss";
import { db } from "../firebase";
import { ref, set, push } from "firebase/database";

function NewChart() {
    const [state, setState] = useState({
        user: {},
        hasUser: false,
    });
    const userListRef = ref(db, "users");
    const writeUserData = (userId, name) => {
        const newUserRef = push(userListRef);
        set(newUserRef, {
            username: name,
        }).then((test) => {
            console.log(test);
        })
    };
    const removeUser = () => {
        setState({
            user: {},
            hasUser: false,
        });
        localStorage.removeItem("user");
    };
    const setUser = (name) => {
        setState({
            user: { name },
            hasUser: true,
        });
        localStorage.setItem("user", JSON.stringify({ name }));
        writeUserData(1, name);
    };

    useEffect(() => {
        //check if userdata is in localstorage
        if (JSON.parse(localStorage.getItem("user")).name) {
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
            } else {
                setUser(name);
            }
        };
        return (
            <div className={style.container}>
                <h1>Create a username</h1>
                <form onSubmit={onSubmit}>
                    <input
                        type="text"
                        name="name"
                        placeholder="Enter a username"
                    />
                    <button type="submit">Submit</button>
                </form>
            </div>
        );
    }

    return (
        <layout className={style.layout}>
            <header className={style.head}>
                <h2>Nonymous</h2>
                <Menu {...{ ...state.user, removeUser }} />
            </header>

            <main>
                <Messages></Messages>
                <Input></Input>
            </main>
        </layout>
    );
}

export default NewChart;
