import React from "react";
// реакт имеет мощную модель композиции, поэтому для повторного использования код между компонентами
// лучще использовать композиции вместо наследования

// есть элементы которые не знают своих потомков заранее
// для таких компонентов рекомендуется специальный проп children
// который передаст дочерние элементы сразу на вывод

function FancyBorder(props) {
	return <div className={"FancyBorder FancyBorder-" + props.color}>{props.children}</div>;
}

// пример

function WelcomeDialog(props) {
	return (
		<FancyBorder>
			<h1 className="Dialog-title">Добро пожаловать</h1>
			<p className="Dialog-message">Спасибо за посещение!</p>
		</FancyBorder>
	);
}

// всё что внутри JSX-тега FancyBorder передаётся в этот компонент через проп children
// посколько рендерится props.children

// иногда в компоненте необходимо иметь несколько мест для вставки
// для этого можно использовать свой формат

function SplitPane(props) {
	return (
		<div className="SplitPane">
			<div className="SplitPane-left">{props.left}</div>
			<div className="SplitPane-right">{props.right}</div>
		</div>
	);
}

function App() {
	// return <SplitPane left={<Contacts />} right={<Chat />} />;
}

// некоторые компоненты можно рассматривать как частные случаи других компонентов
// пример WelcomeDialog и Dialog

function Dialog(props) {
	return (
		<FancyBorder color="blue">
			<h1 className="Dialog-title">{props.title}</h1>
			<p className="Dialog-message">{props.message}</p>
			{props.children}
		</FancyBorder>
	);
}

function WelcomeDialog2() {
	return <Dialog title="Добро пожаловать" message="Спасибо, что посетили наш космический корабль!" />;
}

// композиция хорошо работает и для элементов, определённых через классы

class ComponentTestMount extends React.Component {
	componentDidMount() {
		console.log("didMount");
	}

	render() {
		return null;
	}
}

class SignUpDialog extends React.Component {
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
		this.handleSignUp = this.handleSignUp.bind(this);
		this.state = { login: "" };
		console.log(typeof props.testString);
		console.log(typeof props.testNumber);
	}

	render() {
		return (
			<Dialog title="Программа исследования Марса" message="Как к вам обращаться?">
				<input value={this.state.login} onChange={this.handleChange} />
				<button onClick={this.handleSignUp}>Запишите меня!</button>
				<ComponentTestMount />
			</Dialog>
		);
	}

	handleChange(e) {
		this.setState({ login: e.target.value });
	}

	handleSignUp() {
		console.log(`Добро пожаловать на борт, ${this.state.login}!`);
	}
}

export { SignUpDialog };

// не советуют наследование
