import React from "react";
import Menu from "./Menu";
import Input from "./Input";
import Messages from "./Messages";
import style from "../styles/layout.module.scss";

function NewChart() {
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
