import React from "react";
import ReactDOM, { createRoot } from "react-dom/client";
import { greeting } from "./greeting-jsx";
import { element, App, Comment } from "./components";
import { Clock } from "./clock";
import { Toggle } from "./events";
import { Greeting, WarningBanner } from "./conditionalRender";

// допустим есть div в html файле
// <div id="root"></div>

// он корневой, т.к. React DOM будет управлять его содержимым
// обычно есть только 1 корневой элемент

// Для рендеринга сперва передаётся DOM-элемент в ReactDOM.createRoot();
// далее передевать React элемент в root.render();

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(greeting);

// элементы в React иммутабельны
// после создания элемента нельзя изменить его потомков или атрибуты
// пока что есть только 1 способ изменить его - это создать новый элемент и передать его в root.render()

let tick = function tick() {
	const element = (
		<div>
			<h1>Hello</h1>
			<h2>Is {new Date().toLocaleString()}</h2>
		</div>
	);
	root.render(element);
};
let interval = setInterval(tick, 5e2);
// реакт обновляет только то, что необходимо!!
setTimeout(() => {
	clearInterval(interval);
	root.render(element);
}, 2e3);

setTimeout(() => {
	root.render(App());
}, 3e3);

setTimeout(() => {
	root.render(
		Comment({
			user: {
				name: "User",
				avatarUrl: "URL",
			},
			text: "Some text",
			date: Date.now(),
		})
	);
}, 4e3);

// несмотря на то, что мы создаём элемент, описывающий всё UI дерево,
// каждую секунду React DOM изменяет только текстовый узел, содержимое которое изменилось

// на практике обычно вызывают root.render() 1 раз
// можно обновлять при помощи компонента состояния

// пока что изучено обновление UI только при помощи root.render()
// попробуем инкапсулировать и обеспечить многократное использование компонента Clock

tick = function tick() {
	root.render(<Clock />);
};

setTimeout(() => {
	interval = setInterval(() => {
		tick();
	}, 1e3);
}, 5e3);

// проблема, компонент Clock не обновляет себя каждую секунду автоматически
// в идеале хочется чтобы Clock сам себя обновлял

// для этого добавим "состояние" (state) в компонент Clock
// «Состояние» очень похоже на уже знакомые нам пропсы,
// отличие в том, что состояние контролируется и доступно только конкретному компоненту.

setTimeout(() => {
	clearInterval(interval);
	root.render(<Clock />);
}, 6e3);

setTimeout(() => {
	root.render(<Toggle />);
}, 7e3);

setTimeout(() => {
	root.render(<Greeting isLoggedIn={false} />);
}, 8e3);

console.log(WarningBanner());
