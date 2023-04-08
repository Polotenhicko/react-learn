import React, { Component, PureComponent } from 'react';

// Термин «рендер-проп» относится к возможности компонентов React разделять код между собой с помощью пропа,
// значение которого является функцией.

// Компонент с рендер-пропом берёт функцию, которая возвращает React-элемент, и вызывает её вместо реализации собственного рендера.
function DataProvider() {
  return null;
}
<DataProvider render={(data) => <h1>Привет, {data.target}</h1>} />;

// Использование рендер-пропа для сквозных задач

// бывает неочевидно, как сделать, чтобы одни компоненты разделяли своё инкапсулированное состояние или поведение с другими
// компонентами, заинтересованными в таком же состоянии или поведении.

// Например, следующий компонент отслеживает положение мыши в приложении:

export class MouseTracker extends React.Component {
  state = { x: 0, y: 0 };

  handleMouseMove = (event) => {
    this.setState({
      x: event.clientX,
      y: event.clientY,
    });
  };

  render() {
    return (
      <div style={{ height: '100vh' }} onMouseMove={this.handleMouseMove}>
        <h1>Перемещайте курсор мыши!</h1>
        <p>
          Текущее положение курсора мыши: ({this.state.x}, {this.state.y})
        </p>
      </div>
    );
  }
}

class Mouse extends React.Component {
  state = { x: 0, y: 0 };

  handleMouseMove = (event) => {
    this.setState({
      x: event.clientX,
      y: event.clientY,
    });
  };

  render() {
    return (
      <div style={{ height: '100vh' }} onMouseMove={this.handleMouseMove}>
        <p>
          Текущее положение курсора мыши: ({this.state.x}, {this.state.y})
        </p>
      </div>
    );
  }
}

export class MouseTracker2 extends React.Component {
  render() {
    return (
      <>
        <h1>Перемещайте курсор мыши!</h1>
        <Mouse />
      </>
    );
  }
}

// Теперь компонент <Mouse> инкапсулирует всё поведение, связанное с обработкой событий mousemove
// и хранением позиций курсора(x, y), но пока не обеспечивает повторного использования.

// Например, допустим у нас есть компонент <Cat>, который рендерит изображение кошки, преследующей мышь по экрану.
// Мы можем использовать проп < Cat mouse = {{ x, y }}>, чтобы сообщить компоненту координаты мыши, и он знал,
// где расположить изображение на экране.

// Для начала вы можете отрендерить <Cat> внутри метода render компонента <Mouse> следующим образом:

class Cat extends Component {
  render() {
    const mouse = this.props.mouse;
    return (
      <img
        src="https://art.pixilart.com/sr2d12e7b44c659.png"
        style={{
          position: 'absolute',
          left: mouse.x,
          top: mouse.y,
          width: '240px',
        }}
      />
    );
  }
}

class MouseWithCat extends Component {
  state = { x: 0, y: 0 };

  handleMouseMove = (e) => {
    this.setState({ x: e.clientX, y: e.clientY });
  };

  render() {
    return (
      <div style={{ height: '100vh' }} onMouseMove={this.handleMouseMove}>
        {/*
          Мы могли бы просто поменять <p> на <Cat>... но тогда
          нам нужно создать отдельный компонент <MouseWithSomethingElse>
          каждый раз, когда он нужен нам, поэтому <MouseWithCat>
          пока что нельзя повторно использовать.
        */}
        <Cat mouse={this.state} />
      </div>
    );
  }
}

export class MouseTracker3 extends Component {
  render() {
    return (
      <div>
        <h1>Перемещайте курсор мыши!</h1>
        <MouseWithCat />
      </div>
    );
  }
}

// Этот подход будет работать для конкретного случая, но мы не достигли основной цели — инкапсулировать поведение
// с возможностью повторного использования
// Теперь, каждый раз когда мы хотим получить позицию мыши для разных случаев,
// нам требуется создавать новый компонент (т. е. другой экземпляр <MouseWithCat>)

// Вот здесь рендер-проп нам и понадобится: вместо явного указания <Cat> внутри <Mouse> компонента

class Mouse2 extends Component {
  state = { x: 0, y: 0 };

  handleMouseMove = (event) => {
    this.setState({
      x: event.pageX,
      y: event.pageY,
    });
  };

  render() {
    return (
      <div style={{ height: '100vh' }} onMouseMove={this.handleMouseMove}>
        {/*
          Вместо статического представления того, что рендерит <Mouse>,
          используем рендер-проп для динамического определения, что надо отрендерить.
        */}
        <p>
          Текущее положение курсора мыши: ({this.state.x}, {this.state.y})
        </p>
        {this.props.render(this.state)}
      </div>
    );
  }
}

export class MouseTracker4 extends Component {
  // рендер-проп — функция, которая сообщает компоненту что необходимо рендерить.
  render() {
    return (
      <div>
        <h1>Перемещайте курсор мыши!</h1>
        <Mouse2 render={(coords) => <Cat mouse={coords} />} />
      </div>
    );
  }
}

// можно сделать это с хоком
function withMouse(WComponent) {
  return class extends Component {
    render() {
      return <Mouse2 render={(coords) => <WComponent {...this.props} mouse={coords} />} />;
    }
  };
}

export const CatWithCoords = withMouse(Cat);

// Использование пропсов, отличных от render (как название передаваемого свойства)
// Важно запомнить, что из названия паттерна «рендер-проп» вовсе не следует, что для его использования вы должны обязательно называть проп render

// Несмотря на то, что в вышеприведённых примерах мы используем render, мы можем также легко использовать проп children!

<Mouse2
  children={(mouse) => (
    <p>
      Текущее положение курсора мыши: {mouse.x}, {mouse.y}
    </p>
  )}
/>;

// Можно и просто передать функцию как чилд
<Mouse2>
  {(mouse) => (
    <p>
      Текущее положение курсора мыши: {mouse.x}, {mouse.y}
    </p>
  )}
</Mouse2>;

// Предостережения

// Использование рендер-пропа может свести на нет преимущество, которое даёт React.PureComponent
// будет всегда false из-за того, что функция заново создаётся
// каждый render будет генерировать новое значение для рендер-пропа.
class PureMouse extends PureComponent {
  state = { x: 0, y: 0 };

  handleMouseMove = (event) => {
    this.setState({
      x: event.pageX,
      y: event.pageY,
    });
  };

  render() {
    // будет всегда вызываться, несмотря что у нас PureComponent
    console.log('render mouse');
    return (
      <div style={{ height: '100vh' }} onMouseMove={this.handleMouseMove}>
        <p>
          Текущее положение курсора мыши: ({this.state.x}, {this.state.y})
        </p>
        {this.props.render(this.state)}
      </div>
    );
  }
}

export class PureMouseTracker extends Component {
  render() {
    return (
      <div>
        <h1>Перемещайте курсор мыши!</h1>

        {/*
          Это плохо! Значение рендер-пропа будет
          разным при каждом рендере.
        */}
        <PureMouse render={(mouse) => <Cat mouse={mouse} />} />
      </div>
    );
  }
}

// Решение этой проблемы:

export class PureMouseTrackerFixed extends Component {
  // Определяем как метод экземпляра, `this.renderTheCat` всегда
  // ссылается на *ту же самую* функцию, когда мы используем её в рендере
  renderTheCat = (mouse) => {
    return <Cat mouse={mouse} />;
  };

  componentDidMount() {
    // будет рендер только трекера, mouse не будет
    setInterval(() => {
      this.setState({ a: Math.random() });
    }, 1e3);
  }

  render() {
    console.log('render Tracker');
    return (
      <div>
        <h1>Перемещайте курсор мыши!</h1>
        <PureMouse render={this.renderTheCat} />
      </div>
    );
  }
}
