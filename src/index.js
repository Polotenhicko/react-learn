import React from "react";
import ReactDOM, { createRoot } from "react-dom/client";
import { greeting, element } from "./greeting-jsx";

function App() {
	return <div>{greeting}</div>;
}

// const root = ReactDOM.createRoot(document.getElementById("root"));

// root.render(greeting);

createRoot(document.getElementById("root")).render(React.createElement("h1", { className: "greeting" }, "Привет, мир!"));
