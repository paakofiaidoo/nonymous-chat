import React, { useEffect, useState } from "react";
import Menu from "./Menu";
import Input from "./Input";
import Messages from "./Messages";
import style from "../styles/layout.module.scss";

function NewChart() {
    const [state, setState] = useState({
        user: {},
        hasUser: false,
    });
    useEffect(() => {
        //check if userdata is in localstorage
        if (localStorage.getItem("user")) {
            setState({
                ...state,
                user: JSON.parse(localStorage.getItem("user")),
                hasUser: true,
            });
        }
    }, []);

    if (!state.hasUser) {
        return (
            <div className={style.container}>
                <h1>Create a username</h1>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        const name = e.target.elements.name.value;
                        if (name.length === 0) {
                            alert("Please enter a username");
                        } else {
                            setState({
                                ...state,
                                user: {
                                    name: name,
                                },
                                hasUser: true,
                            });
                            localStorage.setItem(
                                "user",
                                JSON.stringify(state.user)
                            );
                        }
                    }}
                >
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
                <Menu />
            </header>

            <main>
                <Messages></Messages>
                <Input></Input>
            </main>
        </layout>
    );
}

export default NewChart;
