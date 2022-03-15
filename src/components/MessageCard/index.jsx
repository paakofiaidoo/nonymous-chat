import React from "react";
import styles from "./styles.module.scss";

function MessageCard() {
    return (
        <message className={styles.message}>
            <div className={styles.head}>
                <h3 className={styles.username}>userName</h3>
                <span className={styles.time}>11:10pm</span>
            </div>

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
