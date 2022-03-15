import React, { useState, useRef, useEffect } from "react";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
    useMutation,
    useSubscription,
} from "@apollo/client";
import "./styles/chat.scss";
import { WebSocketLink } from "@apollo/client/link/ws";

const link = new WebSocketLink({
    uri: `wss://nonymous-chat-server.herokuapp.com/`,
    options: {
        reconnect: true,
    },
});
const client = new ApolloClient({
    link,
    uri: "https://nonymous-chat-server.herokuapp.com/",
    cache: new InMemoryCache(),
    onError: ({ networkError, graphQLErrors }) => {
        console.log("graphQLErrors", graphQLErrors);
        console.log("networkError", networkError);
    },
});
const GET_MESSAGES = gql`
    subscription {
        messages {
            id
            user
            content
        }
    }
`;
const POST_MESSAGES = gql`
    mutation ($user: String!, $content: String!) {
        postMessage(user: $user, content: $content)
    }
`;

const Chat = () => {
    const [state, setState] = useState({ name: "", message: "" });
    const { loading, error, data } = useSubscription(GET_MESSAGES);
    const [valid, setValid] = useState({ name: null, message: null });
    const [postMessage] = useMutation(POST_MESSAGES);
    const box = useRef(null);

    const onChange = (e) => {
        e.preventDefault();
        let value = e.target.value,
            name = e.target.name;
        setState({
            ...state,
            [name]: value,
        });
        if (name === "name" && value.length === 0) {
            setValid({
                ...valid,
                [name]: false,
            });
        } else {
            setValid({
                ...valid,
                [name]: true,
            });
        }
    };
    const onSubmit = () => {
        if (
            (state.name == null && state.message == null) ||
            (state.name.length === 0 && state.message.length === 0)
        ) {
            setValid({
                message: false,
                name: false,
            });
        } else if (state.name == null || state.name.length === 0) {
            setValid({
                ...valid,
                name: false,
            });
        } else if (state.message == null || state.message.length === 0) {
            setValid({
                ...valid,
                message: false,
            });
        } else {
            setState({
                ...state,
                message: "",
            });
            postMessage({
                variables: { user: state.name, content: state.message },
            });
        }
    };
    const onReset = () => {
        setState({ name: "", message: "" });
        setValid({ name: null, message: null });
    };
    const Message = ({ user }) => {
        if (!data) {
            return <div>no messages !</div>;
        }
        return (
            <>
                {data.messages.map(
                    ({ id, user: messageUser, content }, ind) => (
                        <div
                            key={ind}
                            style={{
                                display: "flex",
                                justifyContent:
                                    user === messageUser
                                        ? "flex-end"
                                        : "flex-start",
                                padding: ".5rem",
                            }}
                        >
                            <div
                                style={{
                                    backgroundColor:
                                        user === messageUser
                                            ? "green"
                                            : "yellow",
                                    color:
                                        user === messageUser
                                            ? "yellow"
                                            : "green",
                                    order: user === messageUser ? "1" : "2",
                                    borderTopLeftRadius:
                                        user === messageUser ? "0.5rem" : "0",
                                    borderTopRightRadius:
                                        user !== messageUser ? "0.5rem" : "0",
                                }}
                                className="message-card"
                            >
                                <span
                                    style={{
                                        display:
                                            user === messageUser ? "none" : "",
                                    }}
                                    className="message-user"
                                >
                                    {messageUser}
                                </span>
                                <span
                                    style={{
                                        padding: ".5rem",
                                    }}
                                >
                                    {content}
                                </span>
                            </div>
                        </div>
                    )
                )}
            </>
        );
    };
    const scrollBottom = (e) => {
        e.scrollTop = e.scrollHeight;
    };

    if (box.current !== null) {
        scrollBottom(box.current);
    }
    useEffect(() => {
        if (box.current !== null) {
            scrollBottom(box.current);
        }
    });
    const styles = (e) => {
        if (e === false) {
            return { borderColor: "red" };
        }
        if (e === null) {
            return {};
        }

        return { borderColor: "green" };
    };

    return (
        <>
            <div className="title">
                <h1>nonymous</h1>
                <h3>fell free to say what ever you want</h3>
            </div>

            <div className="chat">
                <div className="messages" ref={box}>
                    <button
                        onClick={() => {
                            scrollBottom(box.current);
                        }}
                    >
                        <span></span>
                    </button>
                    {loading && <p>Loading...</p>}
                    {error && <p>error...</p>}
                    {data && <Message user={state.name} />}
                </div>
                <div className="inputBar">
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            onSubmit();
                        }}
                        onReset={(e) => {
                            e.preventDefault();
                            onReset();
                        }}
                    >
                        {/* <label name="name">name</label> */}
                        <div className="input">
                            <input
                                type="text"
                                name="name"
                                id="name"
                                onChange={onChange}
                                placeholder="we should call you..."
                                value={state.name}
                                autoCapitalize="true"
                                autoSave="true"
                                style={styles(valid.name)}
                            />
                            {valid.name === false ? <span>no name</span> : ""}
                        </div>
                        <div className="input" style={{ width: "60%" }}>
                            <input
                                type="text"
                                name="message"
                                id="message"
                                onChange={onChange}
                                value={state.message}
                                style={styles(valid.message)}
                                placeholder="your message goes here ..."
                                onKeyUp={(e) => {
                                    if (e.keyCode === 13) {
                                        onSubmit();
                                    }
                                }}
                                autoCorrect="true"
                                autoComplete="true"
                            />
                            {valid.message === false ? (
                                <span>no message</span>
                            ) : (
                                ""
                            )}
                        </div>

                        <button
                            type="submit"
                            style={{ backgroundColor: "green" }}
                        >
                            post
                        </button>
                        <button type="reset" style={{ backgroundColor: "red" }}>
                            reset
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
    return (
        <ApolloProvider client={client}>
            <Chat />
        </ApolloProvider>
    );
};
