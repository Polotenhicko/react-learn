import React from "react";
// в реакте HTML формы ведут себя немного иначе по сравнению с DOM-элементами
// т.к. у элементов формы изначально есть внутреннее состояние

// В HTML элементы формы, такие как <input>, <textarea> и <select>,
// обычно сами управляют своим состоянием и обновляют его когда пользователь вводит данные.
// В React мутабельное состояние обычно содержится в свойстве компонентов state и обновляется только через вызов setState()

class NameForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = { value: "" };

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(e) {
		this.setState({ value: e.target.value });
	}

	handleSubmit(e) {
		e.preventDefault();
		console.log(`Отправленное имя: ${this.state.value}`);
	}

	render() {
		return (
			<form onSubmit={this.handleSubmit}>
				<label>Имя:</label>
				<input type="text" value={this.state.value} onChange={this.handleChange} />
				<button type="submit">Отправить</button>
			</form>
		);
	}
}

class EasyForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			value: "Напишите сюда что-то",
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
		this.setState({ value: event.target.value });
	}

	handleSubmit(event) {
		console.log("Сочинение отправлено: " + this.state.value);
		event.preventDefault();
	}

	render() {
		return (
			<form onSubmit={this.handleSubmit}>
				<label>Введите текст:</label>
				<textarea value={this.state.value} onChange={this.handleChange} />
				<button type="submit">Отправить</button>
			</form>
		);
	}
}

// для select React использует вместо selected у option свойсво value у select
class FlavorForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = { value: "coconut" };
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
		this.setState({ value: event.target.value });
	}

	handleSubmit(event) {
		console.log("Ваш любимый вкус: " + this.state.value);
		event.preventDefault();
	}

	render() {
		return (
			<form onSubmit={this.handleSubmit}>
				<label>
					Выберите ваш любимый вкус:
					<select value={this.state.value} onChange={this.handleChange}>
						<option value="grapefruit">Грейпфрут</option>
						<option value="lime">Лайм</option>
						<option value="coconut">Кокос</option>
						<option value="mango">Манго</option>
					</select>
				</label>
				<input type="submit" value="Отправить" />
			</form>
		);
	}
}

// если нужно несколько управляемых input можно назначить каждому атрибут name
// и уже от него отталкиваться

class Reservation extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isGoing: true,
			numberOfGuests: 2,
		};

		this.handleInputChange = this.handleInputChange.bind(this);
	}

	handleInputChange(event) {
		const target = event.target;
		const value = target.type === "checkbox" ? target.checked : target.value;
		const name = target.name;

		this.setState({
			[name]: value,
		});

		console.log(this.state);
	}

	render() {
		return (
			<form>
				<label>
					Пойдут:
					<input name="isGoing" type="checkbox" checked={this.state.isGoing} onChange={this.handleInputChange} />
				</label>
				<br />
				<label>
					Количество гостей:
					<input name="numberOfGuests" type="number" value={this.state.numberOfGuests} onChange={this.handleInputChange} />
				</label>
			</form>
		);
	}
}
export { NameForm, EasyForm, FlavorForm, Reservation };
