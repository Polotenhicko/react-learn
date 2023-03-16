import React, { useMemo, useState } from 'react';

// const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
// возвращает мемоизированное значение

// принимает создающую функцию и массив зависимостей
// useMemo будет повторно вычислять значение только тогда, когда значение какой из зависимостей изменилось

// помогает избежать дорогостоящих вычислений при каждом рендере

// Помните, что функция, переданная useMemo, запускается во время рендеринга.
// Не делайте там ничего, что вы обычно не делаете во время рендеринга.
// Например, побочные эффекты принадлежат useEffect, а не useMemo.

// Если массив не был передан, новое значение будет вычисляться при каждом рендере.

// является эквивалентом для useCallback
// useCallback(fn, deps) — useMemo(() => fn, deps).

export function App() {
  const [count, setCount] = useState(0);
  console.log('render', count);
  const value = useMemo(() => {
    console.log('вызвали функцию', count);
    return Math.random();
  }, [count]);

  return (
    <div>
      <button onClick={() => setCount(1)}>1</button>
      <button onClick={() => setCount(2)}>2</button>
      <button onClick={() => setCount(3)}>3</button>
      <div>{value}</div>
    </div>
  );
}
