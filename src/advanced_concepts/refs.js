import React, { useRef } from 'react';
// вот я и дошёл до рефов
// Рефы дают возможность получить доступ к DOM-узлам или React-элементам, созданным в рендер-методе.

// Ситуации, в которых использование рефов является оправданным:
// 1. Управление фокусом, выделение текста или воспроизведение медиа.
// 2. Императивный вызов анимаций.
// 3. Интеграция со сторонними DOM-библиотеками.

// Избегайте использования рефов в ситуациях, когда задачу можно решить декларативным способом.

// Рефы создаются с помощью React.createRef() и прикрепляются к React-элементам через ref атрибут
// Обычно рефы присваиваются свойству экземпляра класса в конструкторе, чтобы на них можно было ссылаться из любой части компонента.

class MyComponent extends React.Component {
  ref = React.createRef();

  componentDidMount() {
    // Когда реф передаётся элементу в методе render, ссылка на данный узел доступна через свойство рефа current.
    console.log(this.ref.current);
  }

  render() {
    return <div ref={this.ref} />;
  }
}

export { MyComponent };

// Значение рефа отличается в зависимости от типа узла:

// 1. Когда атрибут ref используется с HTML-элементом, свойство current созданного рефа в конструкторе с помощью React.createRef()
// получает соответствующий DOM-элемент.
// 2. Когда атрибут ref используется с классовым компонентом, свойство current объекта-рефа получает экземпляр смонтированного компонента.
// 3. Нельзя использовать ref атрибут с функциональными компонентами, потому что для них не создаётся экземпляров.

class CustomTextInput extends React.Component {
  state = { aboba: 123 };
  // создадим реф в поле `textInput` для хранения DOM-элемента
  textInput = React.createRef();

  focusTextInput = () => {
    // Установим фокус на текстовое поле с помощью чистого DOM API
    // Примечание: обращаемся к "current", чтобы получить DOM-узел
    this.textInput.current.focus();
  };

  render() {
    // описываем, что мы хотим связать реф <input>
    // с `textInput` созданным в конструкторе
    return (
      <div>
        <input type="text" ref={this.textInput} />
        <input type="button" value="Фокус на текстовом поле" onClick={this.focusTextInput} />
      </div>
    );
  }
}

// Для того чтобы произвести имитацию клика по CustomTextInput из прошлого примера сразу же после монтирования,
// можно использовать реф, чтобы получить доступ к пользовательскому <input> и явно вызвать его метод focusTextInput:
export class AutoFocusClass extends React.Component {
  textInput = React.createRef();

  componentDidMount() {
    console.log(this.textInput);
    this.textInput.current.focusTextInput();
  }

  render() {
    // это сработает только в том случае, если CustomTextInput объявлен как классовый компонент:
    return <CustomTextInput ref={this.textInput} a={3} />;
  }
}

// По умолчанию нельзя использовать атрибут ref с функциональными компонентами, потому что для них не создаётся экземпляров:
// Данный код *не будет* работать!
function MyFunctionComponent() {
  return <input />;
}

class Parent extends React.Component {
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
  }
  render() {
    // Данный код *не будет* работать!
    return <MyFunctionComponent ref={this.textInput} />;
  }
}

// Если вам нужен реф на функциональный компонент, можете воспользоваться forwardRef (возможно вместе с useImperativeHandle),
// либо превратить его в классовый компонент.

// Тем не менее, можно использовать атрибут ref внутри функционального компонента при условии,
// что он ссылается на DOM-элемент или классовый компонент:

function TextInput(props) {
  // textInput должна быть объявлена здесь, чтобы реф мог иметь к ней доступ
  const textInput = useRef(null);

  function handleClick() {
    textInput.current.focus();
  }

  return (
    <div>
      <input type="text" ref={textInput} />
      <input type="button" value="Фокус на поле для ввода текста" onClick={handleClick} />
    </div>
  );
}

// Кроме того, React поддерживает другой способ определения рефов, который называется «колбэк-рефы» и
// предоставляет более полный контроль над их присвоением и сбросом.

// Данная функция получит экземпляр React-компонента или HTML DOM-элемент в качестве аргумента,
// которые потом могут быть сохранены или доступны в любом другом месте.

export class CustomRef extends React.Component {
  state = {
    count: 0,
  };
  textInput;

  focusTextInput = () => {
    if (this.textInput) this.textInput.focus();
  };

  componentDidMount() {
    // устанавливаем фокус на input при монтировании
    this.focusTextInput();
  }

  callback = (ref) => {
    console.log(ref);
  };

  handleClick = () => {
    console.log('click');
    this.setState((prev) => ({ count: prev.count + 1 }));
  };

  render() {
    // если определить как встроенную функцию, то будет вызываться при обновлении дважды: null, а потом дом элемент
    function callback(ref) {
      console.log(ref);
    }
    // Используем колбэк в `ref`, чтобы сохранить ссылку на DOM-элемент
    // поля текстового ввода в поле экземпляра (например, this.textInput).
    return (
      <div onClick={this.handleClick}>
        <input type="text" ref={this.callback} />
        <input type="button" value="Focus the text input" onClick={this.focusTextInput} />
      </div>
    );
  }
}
