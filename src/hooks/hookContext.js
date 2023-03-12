import React, { useContext } from 'react';
// принимает объект контекста

const Theme = React.createContext('light');

function App() {
  // должен быть сам объект
  const context = useContext(Theme);
  return <div>{context}</div>;
}

// текущее значение контекста берётся пропом value из ближайшего Theme.Provider над компонентом
// когда ближайший Provider над компонентом обновится, этот хук вызовет повторный рендер
export default App;
