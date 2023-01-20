// хуки - нововведение в реакте 16.8
// позволяет использовать состояние и другие возможности рекакта без написания классов

import React, { useState } from 'react';

// Первый хук - useState

// Зачем хуки?

// Нет способа присоединить повторно используемое поведение к компоненту
// С помощью хуков вы можете извлечь логику состояния из компонента, чтобы её протестировать или повторно использовать
// Хуки позволяют вам повторно использовать логику состояния, не затрагивая дерево компонентов

// Сложные компоненты становятся трудными для понимания
// Хуки позволяют разбить один компонент на маленькие функции по их назначению
// Также можно контролировать внутреннее состояние с помощью редьюсера(че ето)

// хуки обратно совместимы

// Начну с хука состояния

let Example = class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
  }

  render() {
    return (
      <div>
        <p>Вы кликнули {this.state.count} раз!</p>
        <button onClick={() => this.setState((state) => ({ count: state.count + 1 }))}>
          Нажми
        </button>
      </div>
    );
  }
};

Example = function Example() {
  // объявление переменной состояния, которую мы назовём "count"
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Вы кликнули {count} раз!</p>
      <button onClick={() => setCount(count + 1)}>Нажми</button>
    </div>
  );
};

// хуки не работают в классах

// необходимо вначале импортировать {useState} from 'react'

// Хук — это специальная функция, которая позволяет «подцепиться» к возможностям React
// Например, хук useState предоставляет функциональным компонентам доступ к состоянию React

// Раньше, если вы писали функциональный компонент и осознавали, что вам нужно наделить его состоянием,
// вам приходилось превращать этот компонент в класс.
// Теперь же вы можете использовать хук внутри существующего функционального компонента

// Допустим, мы хотим инициализировать в классе состояние count значением 0.
// Для этого в его конструкторе присваиваем this.state объект { count: 0 }:

// В функциональном компоненте нам недоступен this, поэтому мы не можем задать или считать состояние через this.state.
// Вместо этого мы вызываем хук useState напрямую изнутри нашего компонента.

// Вызов useState объявляет переменную состояния
// const [count, setCount] = useState(0)
// можно дать любой другое имя

// Аргументы useState
// Единственный аргумент - это исходное состояние
// Может быть чем угодно
// Если нужно хранить 2 разных значения в состоянии, то пришлось бы вызвать useState дважды

// Вызов useState вернёт пару значений: текущее состояние и функцию, обновляющую состояние

// Пример использования вместо деструктуризации
function Test() {
  var fruitStateVariable = useState('банан'); // Возвращает пару значений
  var fruit = fruitStateVariable[0]; // Извлекаем первое значение
  var setFruit = fruitStateVariable[1]; // Извлекаем второе значение
}

// Объявлять переменные состояния через пару [something, setSomething] удобно ещё и тем, что когда нам нужны несколько переменных,
//  мы можем назвать каждую из них собственным именем:

function ExampleWithManyStates() {
  // Объявим несколько переменных состояния!
  const [age, setAge] = useState(42);
  const [fruit, setFruit] = useState('банан');
  const [todos, setTodos] = useState([{ text: 'Изучить хуки' }]);
}

// В отличии от setState, функции от useState не сливают данные вместе, а заменяют

export { Example };
