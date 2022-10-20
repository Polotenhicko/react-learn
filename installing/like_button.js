"use strict";
// код создания реакта, который я не понимаю типа
const e = React.createElement;

class LikeButton extends React.Component {
	constructor(props) {
		super(props);
		this.state = { liked: false };
	}

	render() {
		if (this.state.liked) {
			return "You liked this.";
		}

		return e("button", { onClick: () => this.setState({ liked: true }) }, "Like");
	}
}

// след код
// Эти три строки кода ищут элемент <div>, который мы добавили в HTML на первом шаге,
// а затем отображают React - компонент с кнопкой «Нравится» внутри него.
const domContainer = document.querySelector("#like_button_container");
const root = ReactDOM.createRoot(domContainer);
root.render(e(LikeButton));
root.render2(e(LikeButton));
