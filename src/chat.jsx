import React, { useState, useRef, useEffect } from "react";
import {
	ApolloClient,
	InMemoryCache,
	ApolloProvider,
	gql,
	useQuery,
	useMutation,
	useSubscription,
} from "@apollo/client";
import "./chat.scss";
import { WebSocketLink } from "@apollo/client/link/ws";

const link = new WebSocketLink({
	uri: `ws://localhost:4000/`,
	options: {
		reconnect: true,
	},
});
const client = new ApolloClient({
	link,
	uri: "http://localhost:4000/",
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
	mutation($user: String!, $content: String!) {
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
				{data.messages.map(({ id, user: messageUser, content }, ind) => (
					<div
						key={ind}
						style={{
							display: "flex",
							justifyContent: user === messageUser ? "flex-end" : "flex-start",
							padding: ".5rem",
						}}
					>
						<span
							style={{
								display: user === messageUser ? "none" : "",
								padding: "1rem",
								backgroundColor: "rgba(0,0,0,0.1)",
								margin: "0px 0.5rem",
								borderRadius: ".5rem",
								height: "max-content",
								width: "3rem",
							}}
						>
							{messageUser}
						</span>
						<span
							style={{
								backgroundColor: user === messageUser ? "green" : "yellow",
								color: user === messageUser ? "yellow" : "green",
								padding: "1rem",
								order: user === messageUser ? "1" : "2",
								borderRadius: ".5rem",
								maxWidth: "80vw",
								overflow: "auto",
							}}
						>
							{content}
						</span>
					</div>
				))}
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
		<div>
			{loading && <p>Loading...</p>}
			{error && <p>error...</p>}
			{data && (
				<div className="chat">
					<div className="title">
						<h1>Anonymous</h1>
						<h3>fell free to chat, nobody know it is you</h3>
					</div>

					<div className="messages" ref={box}>
						<button
							onClick={() => {
								scrollBottom(box.current);
							}}
						>
							<span></span>
						</button>
						<Message user={state.name} />
					</div>

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
							{valid.message === false ? <span>no message</span> : ""}
						</div>

						<button type="submit" style={{ backgroundColor: "green" }}>
							post
						</button>
						<button type="reset" style={{ backgroundColor: "red" }}>
							reset
						</button>
					</form>
				</div>
			)}
		</div>
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
