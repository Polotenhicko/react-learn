import React from "react";
import ReactDOM, { createRoot } from "react-dom/client";
import { greeting } from "./greeting-jsx";

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

// реакт обновляет только то, что необходимо!!
setInterval(tick, 1e3);
// несмотря на то, что мы создаём элемент, описывающий всё UI дерево,
// каждую секунду React DOM изменяет только текстовый узел, содержимое которое изменилось

// на практике обычно вызывают root.render() 1 раз
// можно обновлять при помощи компонента состояния
