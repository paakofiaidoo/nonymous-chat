/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import style from "./styles.module.scss";

function Input({ name, removeUser }) {
    const [active, setActive] = useState(false);
    const onMenuClick = () => {
        setActive(!active);
    };

    return (
        <div className={style.menu}>
            {active ? (
                <>
                    <button className={style.icon} onClick={onMenuClick}>
                        <img src="/xmark.svg" alt="menu" title="menu" />
                    </button>
                    <menu className={style.options}>
                        <div className={style.user}>
                            <h3>{name}</h3>
                            <a onClick={removeUser} className={style.update}>
                                change username
                            </a>
                        </div>
                        <p style={{ fontSize: ".5rem", marginTop: "0.5rem" }}>
                            built by{" "}
                            <a href="http://paakofiaidoo.tech">
                                paa-kofi aidoo
                            </a>
                        </p>
                    </menu>
                </>
            ) : (
                <button className={style.icon} onClick={onMenuClick}>
                    <img src="/bars.svg" alt="menu" title="menu" />
                </button>
            )}
        </div>
    );
}

export default Input;
