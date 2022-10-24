import React from "react";

// компоненты позволяют разбить интерфейс на независимые части
// во многом они ведут себя как обычные функции JS, они принимают данные и возвращают React-элементы

// это функция-компонент, потому что она получает данные об одном объекте в качестве параметра
// и возвращает React-элемент
// Такой компонент называется "функциональным", т.к. является функцией буквально
function Welcome(props) {
	return <h1>Привет, {props.name}</h1>;
}

// ещё компоненты можно определть как классы
class Welcome2 extends React.Component {
	render() {
		// {name: 'Егор', data-id: '123'}
		console.log(this.props);
		return <h1>Привет, {this.props.name}</h1>;
	}
}

// Пока что было только такие элементы, представляющие DOM-теги

let element = <div />;
// но элементы могут описывать и собственные компоненты
element = <Welcome2 name="Егор" data-id="123" />;

export { element };

// Когда React встречает подобный элемент, он собирает все JSX-атрибуты и дочерние элементы в один объект
//  и передаёт их нашему компоненту.Этот объект называется «пропсы» (props).

// Мы вызываем root.render() c React-элементом <Welcome name="Егор" data-id='123' />.
// React вызывает наш компонент Welcome с пропсами {name: 'Егор', data-id: '123'}.
// Наш компонент Welcome возвращает элемент <h1>Привет, Алиса</h1> в качестве результата.
// React DOM делает минимальные изменения в DOM, чтобы получилось <h1>Привет, Алиса</h1>.

// !!! Всегда вызывать компоненты с заглавной буквы
// с маленькой - он ищет HTML теги

// компоненты могут ссылаться друг на друга
// позволяет использовать одну и ту же абстракцию
// к примеру отрендерить компонент несколько раз

export function App() {
	return (
		<div>
			<Welcome name="Андрей" />
			<Welcome name="Андрей2" />
			<Welcome name="Андрей3" />
		</div>
	);
}

let Comment = function Comment(props) {
	return (
		<div className="Comment">
			<div className="UserInfo">
				<img className="Avatar" src={props.author.avatarUrl} alt={props.author.name} />
				<div className="UserInfo-name">{props.author.name}</div>
			</div>
			<div className="Comment-text">{props.text}</div>
			<div className="Comment-date">{props.date.toLocaleString()}</div>
		</div>
	);
};

// извлечём пару компонентов
// компоненту Avatar незачем знать что он рендерится внутри Comment
// теперь он имеет менее конкретное имя - user, а не author
// главное называть пропсы так, чтобы в первую очередь они имели смысл с точки зрения самого компонента
// а уже потом с тех, которые его рендерят
function Avatar(props) {
	return <img className="Avatar" src={props.user.avatarUrl} alt={props.user.name} />;
}

// теперь упростим Comment

Comment = function Comment(props) {
	return (
		<div className="Comment">
			<div className="UserInfo">
				<Avatar user={props.author} />
				<div className="UserInfo-name">{props.author.name}</div>
			</div>
			<div className="Comment-text">{props.text}</div>
			<div className="Comment-date">{props.date.toLocaleString()}</div>
		</div>
	);
};

// дальше извлечём компонент UserInfo, который рендерит Avatar рядом с именем

function UserInfo(props) {
	return (
		<div className="UserInfo">
			<Avatar user={props.user} />
			<div className="UserInfo-name">{props.user.name}</div>
		</div>
	);
}

Comment = function Comment(props) {
	return (
		<div className="Comment">
			<UserInfo user={props.user} />
			<div className="Comment-text">{props.text}</div>
			<div className="Comment-date">{new Date(props.date).toLocaleString()}</div>
		</div>
	);
};

export { Comment };

// Если какая-то часть интерфейса многократно в нём повторяется (Button, Panel, Avatar)
// или сама по себе достаточно сложная(App, FeedStory, Comment), имеет смысл её вынести в независимый компонент.

// !!! компонент никогда не должен что-то записывать в свои пропсы
// он должен быть "чистым"
