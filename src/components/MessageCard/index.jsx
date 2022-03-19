import React from "react";
import styles from "./styles.module.scss";

function MessageCard({ content, date, user, me }) {
    // const { content, user } = message;
    let time = new Date(date);

    return (
        <div className={`${styles.message} ${me ? styles.me : ""}`}>
            <div className={styles.head}>
                <h3 className={styles.username}>{user?.name}</h3>
                <span className={styles.time}>{time.toLocaleTimeString()}</span>
            </div>
            <p className={styles.content}>{content}</p>
        </div>
    );
}

export default MessageCard;
