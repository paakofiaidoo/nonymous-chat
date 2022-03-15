import React from "react";
import style from "./styles.module.scss";

function Input() {
    return (
        <div className={style.input}>
            <div className={style.container}>
                <input
                    className={style.inputField}
                    type="text"
                    placeholder="Type a message..."
                />
                <button className={style.send}>
                    <img src="/send.png" alt="send" />
                </button>
            </div>
        </div>
    );
}

export default Input;
