import React from "react";
import styles from "./styles.module.scss";

function MessageCard() {
    return (
        <message className={styles.message}>
            <h3 className={styles.username}>userName</h3>
            <p className={styles.content}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Pariatur perferendis tempora commodi magnam, velit enim
                asperiores soluta, vitae optio distinctio laboriosam eligendi
                obcaecati voluptate? Debitis pariatur voluptas eligendi
                cupiditate similique.
            </p>
        </message>
    );
}

export default MessageCard;
