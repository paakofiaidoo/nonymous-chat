import React from "react";
import Menu from "./Menu";
import Input from "./Input";
import Messages from "./Messages";

function NewChart() {
    return (
        <layout>
            <header></header>
            <Menu></Menu>
            <main>
                <Messages></Messages>
                <Input></Input>
            </main>
        </layout>
    );
}

export default NewChart;
