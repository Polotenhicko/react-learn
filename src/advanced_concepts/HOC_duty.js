import React from 'react';

function MyComponent(props) {
  // компонент принимает и выводит 3 числа
  return (
    <ul>
      <li>{props.first}</li>
      <li>{props.second}</li>
      <li>{props.third}</li>
    </ul>
  );
}

function HOK(WComponent) {
  // хок принимает компонент и увеличивает его числа
  class HOK extends React.Component {
    render() {
      const { first, second, third, ...otherProps } = this.props;
      return (
        <WComponent first={first + 1} second={second + 2} third={third + 3} {...otherProps} />
      );
    }
  }
  return HOK;
}

const IncreaseNumber = HOK(MyComponent);

export function App(props) {
  // убеждаюсь что результат увеличен (реально увеличен)
  return <IncreaseNumber first={0} second={0} third={0} />;
}
