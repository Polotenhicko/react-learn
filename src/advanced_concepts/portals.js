import React, { useContext } from 'react';
import ReactDOM from 'react-dom';
// порталы позволяют рендерить элементы в DOM-узел, который находится вне иерархии родительского компонента

// ReactDOM.createPortal(child, container);
// Первый аргумент (child) — это любой React-компонент, который может быть отрендерен, такой как элемент,
// строка или фрагмент.Следующий аргумент(container) — это DOM - элемент.

// обычно

function Foo(props) {
  // React монтирует новый div и рендерит в него дочерние элементы
  return <div>{props.children}</div>;
}

function Foo2(props) {
  // Но иногда требуется поместить потомка в другое место в DOM:
  const domNode = null;
  return ReactDOM.createPortal(props.children, domNode);
}

// Как уже было сказано, портал может находиться в любом месте DOM-дерева
// Несмотря на это, во всех других аспектах он ведёт себя как обычный React-компонент.
// акие возможности, как контекст, работают привычным образом, даже если потомок является порталом,
// поскольку сам портал всё ещё находится в React - дереве, несмотря на его расположение в DOM - дереве.

// Так же работает и всплытие событий. Событие, сгенерированное изнутри портала,
// будет распространяться к родителям в содержащем React - дереве, даже если эти элементы не являются родительскими в DOM - дереве

// пример html
<html>
  <body>
    <div id="app-root"></div>
    <div id="modal-root"></div>
  </body>
</html>;

// Родительский компонент в #app-root сможет поймать неперехваченное всплывающее событие из соседнего узла #modal-root.

// Это два соседних контейнера в DOM
const appRoot = document.getElementById('app-root');
const modalRoot = document.getElementById('modal-root');
const MyContext = React.createContext('light');

class Modal extends React.Component {
  el = document.createElement('div');

  componentDidMount() {
    // Элемент портала добавляется в DOM-дерево после того, как
    // потомки компонента Modal будут смонтированы, это значит,
    // что потомки будут монтироваться на неприсоединённом DOM-узле.
    // Если дочерний компонент должен быть присоединён к DOM-дереву
    // сразу при подключении, например, для замеров DOM-узла,
    // или вызова в потомке 'autoFocus', добавьте в компонент Modal
    // состояние и рендерите потомков только тогда, когда
    // компонент Modal уже вставлен в DOM-дерево.
    modalRoot.appendChild(this.el);
    this.el.tabIndex = -1;
    this.el.focus();
  }

  componentWillUnmount() {
    modalRoot.removeChild(this.el);
  }

  render() {
    return ReactDOM.createPortal(this.props.children, this.el);
  }
}

class Parent extends React.Component {
  state = { click: 0 };

  handleClick = () => {
    this.setState((state) => ({ click: state.click + 1 }));
  };

  render() {
    // сработает всплытие клика, а также погрузится контекст
    return (
      <div onClick={this.handleClick}>
        <p>Количество кликов: {this.state.click}</p>
        <p>
          Откройте DevTools браузера, чтобы убедиться, что кнопка не является потомком блока
          div c обработчиком onClick.
        </p>
        <MyContext.Provider value="dark">
          <Modal>
            <Child />
          </Modal>
        </MyContext.Provider>
      </div>
    );
  }
}

function Child() {
  const context = useContext(MyContext);
  return (
    <div className="modal" data-class={context}>
      <button>Кликните</button>
    </div>
  );
}

export default Parent;
