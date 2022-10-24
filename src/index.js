import React from "react";
import ReactDOM, { createRoot } from "react-dom/client";
import { greeting } from "./greeting-jsx";
import { element, App, Comment } from "./components";

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

function tick() {
	const element = (
		<div>
			<h1>Hello</h1>
			<h2>Is {new Date().toLocaleString()}</h2>
		</div>
	);
	root.render(element);
}
const interval = setInterval(tick, 5e2);
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
