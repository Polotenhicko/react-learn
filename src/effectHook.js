// хук эффекта
// даёт возможность выполнять побочные эффекты в функциональном компоненте
import React, { useState, useEffect } from 'react';

let Example = function Example(props) {
  const [count, setCount] = useState(0);

  // аналогичен componentDidMount и componentDidUpdate
  useEffect(() => {
    // обновляем заголовок документа с помощью api браузера
    document.title = `Вы нажали ${count} раз`;
  });

  return (
    <div>
      <p>Вы нажали {count} раз!</p>
      <button onClick={() => setCount(count + 1)}>Нажми на меня</button>
    </div>
  );
};

// хук useEffect представляет собой совокупность методов componentDidMount, componentDidUpdate, и componentWillUnmount.
// Существует два распространённых вида побочных эффектов в компонентах React: компоненты, которые требуют и не требуют сброса

// Какие-то сбросы

// Иногда мы хотим выполнить дополнительный код после того, как React обновил DOM
export { Example };
