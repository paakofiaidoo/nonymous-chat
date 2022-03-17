import React from "react";
import MessageCard from "../MessageCard";
import styles from "./styles.module.scss";

function Messages() {
    let messages = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    return (
        <div className={styles.messages}>
            {messages.map((message, i) => {
                return <MessageCard key={i} />;
            })}
            <MessageCard></MessageCard>
        </div>
    );
}

export default Messages;
