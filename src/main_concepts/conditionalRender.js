import React from "react";

// реакт позволяет разделить логику на независимые компоненты
// которые можно прятать в зависимости от текущего состояния

// условный рендеринг в реакте работает так же, как условные выражение в JS

// 2 компонента

function UserGreeting(props) {
	return <h1>С возвращением!</h1>;
}

function GuestGreeting(props) {
	return <h1>Войдите, пожалуйста</h1>;
}

function Greeting(props) {
	const isLoggedIn = props.isLoggedIn;
	if (isLoggedIn) {
		return <UserGreeting />;
	}
	return <GuestGreeting />;
}

// в этом примере рендерится приветствие в зависимости от значения пропа

// элементы React можно хранить в переменных
// удобно когда есть условие рендеринга и нужно рендерить одну часть компонента, а другую нет

// ещё пример
// 2 компонента
function LoginButton(props) {
	return <button onClick={props.onClick}>Войти</button>;
}

function LogoutButton(props) {
	return <button onClick={props.onClick}>Выйти</button>;
}

class LoginControl extends React.Component {
	constructor(props) {
		super(props);
		this.handleLoginClick = this.handleLoginClick.bind(this);
		this.handleLogoutClick = this.handleLogoutClick.bind(this);
		this.state = { isLoggedIn: false };
	}

	handleLoginClick() {
		this.setState({
			isLoggedIn: true,
		});
	}

	handleLogoutClick() {
		this.setState({
			isLoggedIn: false,
		});
	}

	render() {
		const isLoggedIn = this.state.isLoggedIn;
		let button;
		if (isLoggedIn) {
			button = <LogoutButton onClick={this.handleLogoutClick} />;
		} else {
			button = <LoginButton onClick={this.handleLoginClick} />;
		}

		return (
			<div>
				<Greeting isLoggedIn={isLoggedIn} />
				{button}
			</div>
		);
	}
}

// выражение можно внедрить в JSX

function Mailbox(props) {
	// передаём массив
	const unreadMessages = props.unreadMessages;
	return (
		<div>
			<h1>Здравствуйте!</h1>
			{unreadMessages.length > 0 && <h2>У вас {unreadMessages.length} непрочитанных сообщений.</h2>}
		</div>
	);
}

// можно воспользоваться тернаркой

function render() {
	const isLoggedIn = this.state.isLoggedIn;
	return (
		<div>
			Пользователь <b>{isLoggedIn ? "сейчас" : "не"}</b> на сайте
		</div>
	);
}

// можно и с выражениями в тернарке, но тут не очевидно

function render2() {
	const isLoggedIn = this.state.isLoggedIn;
	return <div>{isLoggedIn ? <LogoutButton onClick={this.handleLogoutClick} /> : <LoginButton onClick={this.handleLoginClick} />}</div>;
}

// в каких-то случаях требуется предотвратить рендеринг
// для этого нужно вернуть null

function getRandom() {
	return Math.floor(Math.random() * 2);
}

function WarningBanner(props) {
	// 0 или 1

	if (getRandom()) {
		return null;
	}
	return <div className="warning">Предупреждение!</div>;
}

// сам факт возврата никак не влияет на срабатывание методов жизненного цикла компонента
// например componentDidUpdate будет всё равно вызван

export { LoginControl as Greeting, WarningBanner };
