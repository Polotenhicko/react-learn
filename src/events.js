import React from "react";
// Обработка событий в React-элементах очень похожа на обработку событий в DOM-элементах
// события именуются в стиле camelCase
// в HTML:
// <button onclick="method()"></button>
// в JSX
// <button onClick={method}></button>;

// ещё одно оличие:
// в React нельзя предотвратить обработчик события по умолчанию, вернув false.
// нужно явно вызывать preventDefault

// к примеру, в обычном html можно:
/*<form onsubmit="console.log('Отправлена форма.'); return false">
	  <button type="submit">Отправить</button>
  </form>; */

// в реакте:
function Form() {
	function handleSubmit(e) {
		// e - синтетическое событие в соответствии с W3C
		e.preventDefault();
		console.log("Форма отправлена");
	}

	return (
		<form onSubmit={handleSubmit}>
			<button type="submit">Отправить</button>
		</form>
	);
}

// в компоненте из класса, в качестве обработчика события обычно выступает метод класса
// пример компонент Toggle рендерит кнопку, которая позволяет пользователю переключать состояния
// между Включено и Выключено

let Toggle = class Toggle extends React.Component {
	constructor(props) {
		super(props);
		this.state = { isToggleOn: true };

		// эта привязка обязательна для работы this в колбэке
		// потому что функция передаётся в webApi и this теряется!!!
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick() {
		this.setState((prevState) => ({
			isToggleOn: !prevState.isToggleOn,
		}));
	}

	render() {
		return <button onClick={this.handleClick}>{this.state.isToggleOn ? "Включено" : "Выключено"}</button>;
	}
};

// варианты решения проблемы:
// 1 - сделать функцию стрелочной

// handleClick = () => {
// 	this.setState((prevState) => ({
// 		isToggleOn: !prevState.isToggleOn,
// 	}));
// };

// 2 - оставить функцию как есть, но в обработчик кидать стрелку
// render() {
//     // Такой синтаксис гарантирует, что `this` привязан к handleClick.
//     return (
//       <button onClick={() => this.handleClick()}>
//         Нажми на меня
//       </button>
//     );
//   }

// Проблема этого синтаксиса в том, что при каждом рендере создаётся новый колбэк.
// Чаще всего это не страшно. Однако, если этот колбэк попадает как проп в дочерние компоненты,
// эти компоненты могут быть отрендерены снова. Рекомендуют делать привязку в конструкторе
// или использовать синтаксис полей классов, чтобы избежать проблем с производительностью.

// иногда нужно передать аргументы

Toggle = class Toggle extends React.Component {
	constructor(props) {
		super(props);
		this.state = { isToggleOn: true };
		this.id = Math.random();
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick() {
		this.setState((prevState) => ({
			isToggleOn: !prevState.isToggleOn,
		}));
	}

	showId(id) {
		console.log(`${this.id} ${id}`);
		console.log(arguments);
	}

	render() {
		return (
			<div>
				<button onClick={this.handleClick}>{this.state.isToggleOn ? "Включено" : "Выключено"}</button>
				{/* эти строки экваивалентны друг другу */}
				<button onClick={(e) => this.showId(this.id + 3)}>Ваш айди</button>
				{/* с bind аргумент e передаётся последним аргументом(я не уверен) */}
				<button onClick={this.showId.bind(this, this.id + 3)}>Ваш айди 2</button>
			</div>
		);
	}
};

// проверить куда передаётся e

export { Toggle };
