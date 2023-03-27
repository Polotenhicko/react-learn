import React from 'react';

// JSX — синтаксический сахар для функции React.createElement(component, props, ...children)

function MyButton(props) {
  console.log(props);
  return <button {...props}>Нажми меня</button>;
}
export { MyButton as myButton };
React.createElement(MyButton, { color: 'blue', shadowSize: 2 }, 'Нажми меня');

// Самозакрывающий элемент:
<div className="sidebar" />;
React.createElement('div', { className: 'sidebar' });
// В обычном html div вроде не может быть самозакрывающим

// babel компилирует jsx в React.createElement

// Первый аргумент определяет тип React-элемента
// Типы, написанные с большой буквы, указывают, что JSX-тег ссылается на React-компонент
// Эти теги компилируются в прямую ссылку на именованную переменную, поэтому, если вы используете JSX-выражение <Foo />,
// то Foo должен быть в области видимости.

let div = React.createElement(
  'mybutton', // Ссылка на компонент, либо пишем наш тэг, можно кастомный, но будет ругаться
  {
    // здесь все пропсы
    style: {
      color: 'blue',
    },
  }, // дальше список чилдов
  'hello',
  React.createElement('aaaaa', [], 'aaa')
);

// т.к. jsx компилируется в React.createElement, то реакт должен быть импортирован
// но на практике я не увидел что он нужен

// Вы также можете ссылаться на React-компонент, используя запись через точку.
// Это удобно, если у вас есть модуль, который экспортирует много React - компонентов.
// К примеру, если MyComponents.DatePicker является компонентом, то вы можете обратиться к нему напрямую,
// используя запись через точку:

const MyComponent = {
  DatePicker: function DatePicker(props) {
    return <div>Выбор цвета для дата пикера</div>;
  },
};

// Если есть точка, то будет искать как у объекта свойство
// Нельзя сделать MyComponent['DatePicker'] - будет ошибка
// Можно присвоить в переменную, а потом использовать

// Типы, начинающиеся с заглавной буквы, такие как <Foo />, компилируются в React.createElement(Foo)
// и соответствуют компоненту, который был объявлен или импортирован в вашем JavaScript - файле.
// С маленькой - будут компилироваться в React.createElement('MyComponent')

export default MyComponent;

// Существует несколько разных способов передачи пропсов в JSX.

// JavaScript-выражения как пропсы:
// Вы можете передавать любые JavaScript-выражения как пропсы, обернув их в {}.

<MyButton
  foo={
    // js выражение
    1 + 2 + 3
    // будет 6
  }
/>;

// Оператор if и цикл for не являются выражениями в JavaScript, поэтому их нельзя непосредственно использовать в JSX.
// Вместо этого, вы можете окружить ими JSX - код.К примеру:

function FooComponent(props) {
  let desc;
  if (props.number % 2 == 0) {
    desc = <strong>чётным</strong>;
  } else {
    desc = <i>нечётным</i>;
  }
  console.log(props);
  return (
    <div>
      {props.number} является {desc} числом
      {props.message} {props.message2}
    </div>
  );
  // могу ещё так
  // {props.number % 2 == 0 ? <strong>чётным</strong> : <i>нечётным</i>} числом
}

// Вы можете передать строковый литерал как проп. Эти два выражения эквивалентны:

<FooComponent message={'строка1'} message2="строка2" />;

// Когда вы передаёте строковый литерал, все его возможные символы будут преобразованы в соответствующие HTML-сущности.
// Поэтому эти два JSX-выражения будут эквивалентны:

<FooComponent message="&lt;3" message2={'<3'} />;
// но эти 2 пропа не эквивалентны
<FooComponent message={'&lt;3'} message2={'<3'} />;
// на чём основано - я хз, но допустим
export { FooComponent };

// Если вы не передаёте значение в проп, то по умолчанию оно будет true. Эти два JSX выражения эквивалентны:
<FooComponent auto />;
<FooComponent auto={true} />;

// но дока не рекомендует это делать, т.к. это может быть воспринято как сокращённая запись свойства объекта
// кем воспринято - не написали, но похоже разработчками которые не знает об этом
// я чекал, не получилось добиться работы как сокращённой записи свойств объектов
const foo = 3;
React.createElement(FooComponent, {
  foo, // типа такого
});

// можно использовать оператор расширения

// Если у вас уже есть пропсы внутри объекта props и вы хотите передать их в JSX, вы можете использовать оператор расширения ...,
// чтобы передать весь объект с пропсами.Эти два компонента эквивалентны:

function App1() {
  return <FooComponent firstName="A" lastName="B" />;
}

function App2() {
  const obj = {
    firstName: 'A',
    lastName: 'B',
  };
  return <FooComponent {...obj} />;
}

// Вы также можете выбрать конкретные пропсы, которые ваш компонент будет использовать

function Button(props) {
  const { kind, ...other } = props;
  const className = kind === 'primary' ? 'PrimaryButton' : 'SecondaryButton';
  // проп kind не передаётся
  return <button className={className} {...other} />;
}

function UseButton() {
  return (
    <div>
      <Button kind="primary" onClick={() => console.log('Нажали кнопку!')} />
    </div>
  );
}

// Атрибуты расширения могут быть полезны, однако, также они позволяют передать
// ненужные пропсы в компоненты или невалидные HTML - атрибуты в DOM.

// Дочерние компоненты в JSX
// Существует несколько способов передать дочерние компоненты:

// Строковые литералы
// Если вы поместите строку между открывающим и закрывающим тегом, то props.children будет равно этой строке

<FooComponent>
  fff<div>123</div>
</FooComponent>;

// children: ['fff',{$$typeof: Symbol(react.element), type: 'div', key: null, ref: null, props: {…}, …}]

// JSx удаляет пустые строки и пробелы в начале и конце строки
// Новые строки между строковых литералов сжимаются в один пробел

// Остаются 2 строки в начале и в конце
let a = ' a '; // типо так

// Чтобы отобразить вложенные компоненты, можно указать несколько JSX-элементов в качестве дочерних.

<FooComponent>
  <Button />
  <UseButton />
</FooComponent>;

// Можно смешивать разные типы потомков

<FooComponent>
  text
  <ul>
    <li>1</li>
    <li>2</li>
    <li>3</li>
  </ul>
</FooComponent>;

// Вы можете передать любое JavaScript-выражение как дочерний компонент, обернув его в {}

<FooComponent>
  {'Пример'}
  {2 + 2 + 3 + 'aaa'}
</FooComponent>;

// props.children - свойство, которое содержит чилдов
// это может быть строка
<FooComponent>Пример</FooComponent>;
// массив из чилдов если несколько элементов
<FooComponent>
  {'Пример'}
  {2 + 2 + 3 + 'aaa'}
</FooComponent>;
// или
<FooComponent>
  text
  <ul>
    <li>1</li>
    <li>2</li>
    <li>3</li>
  </ul>
</FooComponent>;
// так будет Object, т.к. ul преобразуется в React.createElement
<FooComponent>
  <ul>
    <li>1</li>
    <li>2</li>
    <li>3</li>
  </ul>
</FooComponent>;
// или что передадим
// тут строка
<FooComponent>{'aaa'}</FooComponent>;
// тут функция
<FooComponent>{() => {}}</FooComponent>;

// Значения false, null, undefined и true — валидные дочерние компоненты. Просто они не рендерятся
// Эти JSX-выражения будут рендерить одно и то же:

<div />;

<div></div>;

<div>{false}</div>;

<div>{null}</div>;

<div>{undefined}</div>;

<div>{true}</div>;

// Этот подход может быть полезным для рендера по условию.
// Вот пример, где JSX рендерит <Header />, если showHeader равняется true:
const showHeader = true;
<div>
  {showHeader && <header></header>}
  <p>asdasd</p>
</div>;

// Есть один нюанс в том, что React будет рендерить «ложные» (falsy) значения, такие как число 0
const props = {
  messages: [],
};

function MessageList(props) {
  return <div>{props.messages}</div>;
}

<div>{props.messages.length && <MessageList messages={props.messages} />}</div>;

// Чтобы исправить это, убедитесь что выражение перед оператором && всегда является boolean:

<div>{props.messages.length > 0 && <MessageList messages={props.messages} />}</div>;

// И наоборот, если вы хотите, чтобы такие значения как false, true, null или undefined отрисовались,
// то сначала вы должны преобразовать их в строку:

const variable = false;
<div>Моя переменная JavaScript - {String(variable)}.</div>;
