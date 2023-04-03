import React from 'react';
import createReactClass from 'create-react-class';
// Обычно компонент React определяется как простой JavaScript-класс:
class Foo extends React.Component {
  render() {
    return <h1>Привет, {this.props.name}</h1>;
  }
}

// Чтобы делать это без ES6:
const Greeting = createReactClass({
  render() {
    return <h1>Привет, {this.props.name}</h1>;
  },
});

export { Greeting };

// API ES6-классов похож на createReactClass() за некоторыми исключениями.
// С помощью функций и классов ES6 defaultProps определяется как свойство самого компонента:

class Foo2 extends React.Component {
  // если пропса не будет, то будет брать от сюда
  static defaultProps = {
    name: 'Абоба',
  };
  render() {
    return <h1>Привет, {this.props.name}</h1>;
  }
}

export { Foo2 };

// При использовании createReactClass() вам нужно определить метод getDefaultProps() в переданном объекте:
export const Foo3 = createReactClass({
  getDefaultProps() {
    return {
      name: 'Абобус',
    };
  },
  render() {
    return <h1>Привет, {this.props.name}</h1>;
  },
});

// В ES6-классах вы можете определять начальное состояние через this.state в конструкторе:
class Component extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: props.initialCount ? props.initialCount : 0,
    };
  }

  render() {
    return <h1>Привет, {this.state.count}</h1>;
  }
}

// При использовании createReactClass() вам придётся отдельно реализовать метод getInitialState,
// который возвращает начальное состояние:

export const MyComponent = createReactClass({
  getInitialState() {
    return { count: this.props.initialCount ? this.props.initialCount : 0 };
  },
  render() {
    return <h1>Привет, {this.state.count}</h1>;
  },
});

// В компонентах React, объявленных как классы ES6, методы следуют той же семантике, что и обычные классы ES6.
// Это означает, что они сами по себе не связывают this с экземпляром.
// Вам придётся явно использовать.bind(this) в конструкторе или использовать стрелочную функцию:

export class SayHello extends React.Component {
  constructor(props) {
    super(props);
    this.state = { message: 'Привет' };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    console.log('клик', this.state.message);
  }

  handleDoubleClick = () => {
    console.log('дабл клик', this.state.message);
  };

  render() {
    return (
      <button onClick={this.handleClick} onDoubleClick={this.handleDoubleClick}>
        Поздороваться
      </button>
    );
  }
}

export const Hello = createReactClass({
  getInitialState() {
    return { message: 'Привет!' };
  },
  handleClick() {
    console.log('клик', this.state.message);
  },
  handleDoubleClick() {
    console.log('дабл клик', this.state.message);
  },
  render() {
    return (
      <button onClick={this.handleClick} onDoubleClick={this.handleDoubleClick}>
        Поздороваться
      </button>
    );
  },
});

// ES6 запущен без поддержки примесей. Поэтому React не поддерживает примеси с классами ES6.

// Иногда очень разные компоненты могут иметь общую функциональность. Иногда это называют сквозной функциональностью.
// createReactClass позволяет использовать для этого устаревшую систему mixins.

// Одним из распространённых вариантов использования — когда вы собираетесь обновлять компонент через какой-то промежуток времени.
// Можно просто использовать setInterval(), но важно отменить процесс, когда он больше не нужен, чтобы сэкономить память.React
// предоставляет методы жизненного цикла, которые позволяют узнать, когда компонент будет создан или уничтожен.
// Давайте применим эти методы и создадим небольшую примесь, которая предоставляет функцию setInterval()
// и автоматически очищает мусор, когда компонент уничтожается.

const SetIntervalMixin = {
  componentWillMount() {
    this.intervals = [];
  },
  setInterval() {
    this.intervals.push(setInterval.apply({}, arguments));
  },
  componentWillUnmount() {
    this.intervals.forEach(clearInterval);
  },
};

export const Tick = createReactClass({
  mixins: [SetIntervalMixin],
  getInitialState() {
    return { seconds: 0 };
  },
  componentDidMount() {
    this.setInterval(this.tick, 1000); // Вызвать метод на примеси
  },
  tick() {
    console.log(this);
    // в createReactClass методы всегда привязаны к объекту
    this.setState({ seconds: this.state.seconds + 1 });
  },
  render() {
    return <p>React был выполнен за {this.state.seconds} секунд.</p>;
  },
});
