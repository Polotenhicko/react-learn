import React, { useRef, useEffect, useState } from 'react';
// хук рефа

let App = function App() {
  // возвращает изменяемый ref-объект
  // свойство current инициализируется переданным аргументом (initialValue)
  const element = useRef(null);
  console.log(element); // {current: null}
  const onBtnClick = () => {
    element.current.focus();
  };
  return (
    <div>
      <input ref={element} type="text" />
      <button onClick={onBtnClick}>Установить фокус</button>
    </div>
  );
};

// пока тоже самое что и React.createRef();
// кроме момента когда мы получаем из useRef уже созданный реф

// и это можно использовать как мутируемый объект
// Это возможно, поскольку useRef() создаёт обычный JavaScript-объект.
// Единственная разница между useRef() и просто созданием самого объекта {current: ...} — это то,
// что хук useRef даст один и тот же объект с рефом при каждом рендере.

// проблема только что useRef не уведомляет когда меняет содержимое объекта

App = function App() {
  const height = useRef(0);
  const [heightDoc, setHeightDoc] = useState(height.current);
  useEffect(() => {
    const timeout = setTimeout(() => {
      height.current = document.documentElement.clientHeight + 'px';
      setHeightDoc(() => {
        return Math.random();
      });
    }, 1e3);
    return () => {
      clearTimeout(timeout);
    };
  }, []);
  return (
    <div>
      {height.current}
      <div style={{ height: '100px', width: '100px', backgroundColor: '#fff' }}></div>
    </div>
  );
};
export { App };

// ещё пример
function App2() {
  // функция
  const f = () => 123;
  // реф берёт эту функцию
  const ref = React.useRef(f);
  // стейт просто для обновления
  const [count, setCount] = React.useState(0);
  // при первом рендере будет true, при последующих false, т.к. функция будет заново создаваться,
  // а ref хранит ссылку на первую функцию
  console.log(ref.current == f, 1);
  React.useEffect(() => {
    // при монтировании будет true, т.к. f замыкается на первой созданной функции
    // при последующих вызывается метод render, и функция заново создаётся
    console.log(ref.current == f, 2);
    setCount(count + 1);
  }, []);
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
    </div>
  );
}

// а вроде это реализуется всё на стейте
