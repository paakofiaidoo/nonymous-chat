import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";

function MessageCard({ content, date, user, me, reply, setReply, id, setCurrentID, currentID }) {
    let time = new Date(date);
    const getTimeDifference = (time) => {
        const currentTime = new Date().getTime();
        const timeDifference = currentTime - time;
        let minutes = Math.floor(timeDifference / 60000);
        if (!minutes) {
            return "just now";
        }
        let hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        let out = "";
        if (days !== 0) {
            //remaining hours
            hours = hours - days * 24;
            minutes = minutes - days * 24 * 60;
            out = `${days}d`;
        }
        if (hours !== 0) {
            //remaining minutes
            minutes = minutes - hours * 60;
            out += ` ${hours}h`;
        }

        return `${out} ${minutes}m  ago`;
    };
    date = getTimeDifference(time);
    // console.log(reply, content, "reply");
    return (
        <div id={id} className={`${styles.messageBox} ${currentID === id ? styles.focus : ""}`}>
            <div className={`${styles.message} ${me ? styles.me : ""}`}>
                <div className={styles.head}>
                    <h3 className={styles.username}>{user?.name}</h3>
                    <span className={styles.time}>{date}</span>
                </div>
                <p className={styles.content}>
                    {!!reply && (
                        <a
                            href={`#${reply.id}`}
                            className={styles.replyBox}
                            onClick={() => {
                                setCurrentID(reply.id);
                            }}
                        >
                            <span style={{ color: reply.content ? "" : "red" }} className={styles.username}>
                                {reply?.user.name}
                            </span>
                            <p className={styles.reply}>{reply.content ?? <span style={{ fontSize: "0.7rem", color: "red" }}>message lost</span>}</p>
                        </a>
                    )}
                    {content}
                </p>
            </div>
            <img
                src="/reply.svg"
                alt="relpy"
                style={{ width: "1.25rem", height: "1.25rem", opacity: 0.7 }}
                onClick={() => {
                    setReply({ content, date, user, id, reply: null });
                }}
            />
        </div>
    );
}

export default MessageCard;
