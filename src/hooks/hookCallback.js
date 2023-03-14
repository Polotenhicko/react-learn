import * as React from 'react';

// useCallback
// возвращает мемоизированный коллбэк (или кешированный)
// передаю коллбэк и массив зависимостей

function random(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function TestComponent(props) {
  React.useEffect(() => {
    console.log('useEffect', props.f('a'));
  });
  return <div>1</div>;
}

// какой-то рабочий пример
let App = function App() {
  const [count, setCount] = React.useState(5);
  const ran = random(0, 1);
  console.log(ran, count);
  const memoCallback = React.useCallback(
    // получать аргументы здесь
    (test) => {
      return [count, test];
      // если ran не будет изменяться, то и функция будет старая
      // и будет замыкание на старый count
    },
    [ran]
  );
  return (
    <div
      onClick={() => setCount(count + 1)}
      style={{ width: '100px', height: '100px', border: '1px solid black' }}
    >
      <TestComponent f={memoCallback} />
    </div>
  );
};

// и обязаельно писать в массив зависимостей все переменные, который используются в функции
export { App };
