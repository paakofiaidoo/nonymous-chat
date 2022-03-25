import React from "react";
import style from "../styles/layout.module.scss";

export function SignUp({ onSubmit }) {
    return (
        <div className={style.container}>
            <div className={style.card}>
                <img src="/Nonymous.png" style={{ height: "3rem", width: "5rem" }} alt="logo" />

                <h1 style={{ textAlign: "center" }}>
                    Welcome to Nonymous
                    <p style={{ fontSize: ".8rem", marginBottom: "2rem" }}>
                        feel free to say whatever you want,
                        <br /> no one knows it is you
                    </p>
                </h1>
                <h3>Create a username</h3>

                <form onSubmit={onSubmit}>
                    <input type="text" name="name" placeholder="Enter a username" />
                    <span
                        style={{
                            fontSize: "0.8rem",
                            marginTop: "0.3rem",
                            marginBottom: "1rem",
                        }}
                    >
                        Don't Use Your Real Name, it defeat the idea of anonymous
                    </span>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
}
