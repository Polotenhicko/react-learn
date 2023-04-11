import { useEffect, useReducer } from 'react';

// альтернатива для useState
// применяется редко

// функция callback, будет вызываться на каждый dispatch с аргументом state текущим и action - то, что передали в dispatch
function reducer(state, action) {
  // console.log(state, action);
  switch (action.type) {
    case 'decrement':
      return { count: state.count - 1 };
    case 'increment':
      return { count: state.count + 1 };
  }
}

export function Counter() {
  // useReducer принимает 1 аргументом callback, 2 аргументом - наш стейт
  const [state, dispatch] = useReducer(reducer, { count: 0 });
  // фу-я dispatch стабильна и не изменяется, так что можно не совать её в список зависимостей
  useEffect(() => {
    console.log('useEffect', state);
  }, [dispatch]);
  return (
    <>
      Count: {state.count}
      <br />
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
    </>
  );
}

export function Hello() {
  // 2 способа указать начальное состояние
  // 1 - передать значение
  const [state, dispatch] = useReducer(reducer, { count: 0 });
  // 2 - лениво создать. нужно передать 3 аргумент - callback, принимающий начальное состояние, и возвращает результат вызова
  const [state2, dispatch2] = useReducer(reducer, { count: 1 }, (initialState) => {
    console.log(initialState); // {count: 1}
    //  Начальное состояние будет установлено равным результату вызова init(initialState).
    return { count: 1 + 1 };
  });
  return (
    <>
      <div>
        Count: {state.count}
        <br />
        <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
        <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      </div>
      <div>
        Count: {state2.count}
        <br />
        <button onClick={() => dispatch2({ type: 'decrement' })}>-</button>
        <button onClick={() => dispatch2({ type: 'increment' })}>+</button>
      </div>
    </>
  );
}

// Досрочное прекращение dispatch
// Если вы вернёте то же значение из редюсера хука, что и текущее состояние,
// React выйдет без перерисовки дочерних элементов или запуска эффектов. (React использует алгоритм сравнения Object.is.)
