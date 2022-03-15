import React, { useState } from "react";
import style from "./styles.module.scss";

function Input() {
    const [active, setActive] = useState(false);
    const onMenuClick = () => {
        setActive(!active);
    };

    return (
        <div className={style.menu}>
            {active ? (
                <>
                    <div className="account">
                        <div className="username">
                            <h3>name</h3>
                            <button className={style.send}>
                                change username
                            </button>
                        </div>
                    </div>
                    <button className={style.icon} onClick={onMenuClick}>
                        <img src="/xmark.svg" alt="menu" title="menu" />
                    </button>
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
