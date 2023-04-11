import React, { Component, useImperativeHandle, useRef } from 'react';

// обычно нельзя передавать реф на функциональный компонент
class Input extends React.Component {
  render() {
    return <input />;
  }
}

function FInput() {
  return <input />;
}

// только если через forwardRef
const FInputCurrent = React.forwardRef((props, ref) => <input ref={ref} />);

export class Hello extends React.Component {
  refClass = React.createRef();
  refFunc = React.createRef();

  componentDidMount() {
    console.log(this.refClass);
    console.log(this.refFunc);
  }

  render() {
    return (
      <div>
        <Input ref={this.refClass} />
        <FInput ref={this.refFunc} />
      </div>
    );
  }
}

// useImperativeHandle(ref, createHandle, [deps])
// useImperativeHandle настраивает значение экземпляра, которое предоставляется родительским компонентам при использовании ref
// в большинстве случаев следует избегать императивного кода, использующего ссылки.
// useImperativeHandle должен использоваться с forwardRef:

function FancyInput(props, ref) {
  const inputRef = useRef();
  const ran = Math.random();
  useImperativeHandle(
    ref,
    () => {
      // передаём callback, который должен что-то вернуть, вообще что угодно
      // потом это будет результатом рефа на компоненте
      return {
        focus() {
          console.log('focus');
          inputRef.current.focus();
        },
      };
      // 3 аргумент - депсы
    },
    [ran]
  );
  return <input ref={inputRef} />;
}

FancyInput = React.forwardRef(FancyInput);

export class ForInput extends Component {
  ref = React.createRef();

  componentDidMount() {
    console.log(this.ref.current);
    // this.ref.current.focus();
  }

  render() {
    return <FancyInput ref={this.ref} />;
  }
}
