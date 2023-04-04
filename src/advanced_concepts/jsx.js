import React from 'react';
const ReactDOOM = {
  createRoot() {
    return {
      render() {},
    };
  },
};
// JSX не является обязательным для работы с React. React можно использовать без JSX.

// Это особенно удобно, когда вы не хотите настраивать транспиляцию в процессе сборки.

// Каждый JSX-элемент — это просто синтаксический сахар для вызова React.createElement(component, props, ...children)

// Пример кода с JSX:
class Hello extends React.Component {
  render() {
    return <div>Привет, {this.props.toWhat}</div>;
  }
}

// можно переделать в без JSX:
class Hello2 extends React.Component {
  render() {
    return React.createElement('div', null, `Привет, ${this.props.toWhat}`);
  }
}

const root = ReactDOOM.createRoot(document.getElementById('root'));
root.render(React.createElement(Hello2, { toWhat: 'Мир' }, null));

// Если вас утомляет печатать React.createElement, то распространённой практикой является создать сокращение:
const e = React.createElement;

function Moo() {
  return e('div', null, 'Привет мир!');
}

// Если вы примените эту сокращённую форму для React.createElement, то использование React без JSX станет почти таким же удобным,
// как вы привыкли.
