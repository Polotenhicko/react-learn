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
	return <SplitPane left={<Contacts />} right={<Chat />} />;
}

// некоторые компоненты можно рассматривать как частные случаи других компонентов
// пример WelcomeDialog и Dialog

function Dialog(props) {
	return (
		<FancyBorder color="blue">
			<h1 className="Dialog-title">{props.title}</h1>
			<p className="Dialog-message">{props.message}</p>
		</FancyBorder>
	);
}

function WelcomeDialog() {
	return <Dialog title="Добро пожаловать" message="Спасибо, что посетили наш космический корабль!" />;
}
