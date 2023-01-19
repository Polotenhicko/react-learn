import React, { Fragment } from 'react';

// Доступность контента — это специальные технические и архитектурные решения,
// которые помогают людям с ограниченными возможностями использовать сайты.

// Термин «доступность контента» также может обозначаться аббревиатурой a11y.

// все HTML-атрибуты aria-* полностью поддерживаются в JSX
// атрибуты aria-* должны быть написаны с разделением дефисами

const input = <input type="text" aria-label="labelText" aria-required="true" />;

// Бывают случаи, когда семантическая вёрстка нарушается.
// Например, при добавлении элемента < div > в JSX для обеспечения работоспособности кода на React.
// Особенно часто это случается при работе со списками(<ol>, <ul>, <dl>) или таблицами (<table>).
//   В такой ситуации рекомендуется использовать фрагменты, чтобы сгруппировать элементы,
//   как это показано в примере:

let ListItem = function ListItem({ item }) {
  return (
    <Fragment>
      <dt>{item.term}</dt>
      <dd>{item.description}</dd>
    </Fragment>
  );
};

let Glossary = function Glossary(props) {
  return (
    <dl>
      {props.items.map((item) => (
        <ListItem item={item} key={item.id} />
      ))}
    </dl>
  );
};

// или

Glossary = function Glossary(props) {
  return (
    <dl>
      {props.items.map((item) => (
        // При отображении коллекций фрагменты обязательно должны иметь атрибут `key`
        <Fragment key={item.id}>
          <dt>{item.term}</dt>
          <dd>{item.description}</dd>
        </Fragment>
      ))}
    </dl>
  );
};

// Если нет необходимости использовать пропсы, то можно применять сокращённую запись фрагментов:

ListItem = function ListItem({ item }) {
  return (
    <>
      <dt>{item.term}</dt>
      <dd>{item.description}</dd>
    </>
  );
};

// Каждый элемент управления, например, <input> или <textarea>,
// должен иметь подпись, обеспечивающую доступность контента.

// атрибут for в JSX записывается как htmlFor:
const lab = <label htmlFor="namedInput">Имя:</label>;
const input2 = <input id="namedInput" type="text" name="name" />;

// Приложение с доступным контентом должно функционировать при использовании только клавиатуры
// Фокус клавиатуры указывает на тот элемент в структуре DOM,
//  который в данный момент готов принимать ввод с клавиатуры.Обычно такой элемент выделяется контуром

// Также на сайте нужно реализовать механизмы, которые помогают пользователям быстро
// переходить к нужному контенту с помощью клавиатуры.

// Ссылки для быстрого перехода — это скрытые навигационные ссылки, которые становятся видимыми,
// когда пользователи взаимодействуют со страницей с помощью клавиатуры.Такие ссылки очень легко сделать,
//  используя внутренние якоря страницы и CSS

// Элементы семантической вёрстки, например, <main> или <aside>, нужно использовать в качестве секционной
// разметки, предназначенной для быстрого перехода между логическими частями сайта.

// React-приложения во время своей работы постоянно изменяют структуру DOM.
// Иногда из - за этого фокус клавиатуры может быть потерян или может перейти на неправильный элемент

// Чтобы исправить такую ситуацию, нужно запрограммировать перевод фокуса клавиатуры на нужный элемент.
// Например, после закрытия модального окна перевести фокус клавиатуры на кнопку, которая его открыла.

// Чтобы управлять фокусом в React, можно использовать рефы на DOM-элементы.
// При таком подходе мы сначала создаём в классе компонента реф на элемент в JSX:

export let CustomTextInput = class CustomTextInput extends React.Component {
  constructor(props) {
    super(props);
    // Создаём реф для сохранения textInput-элемента
    this.textInput = React.createRef();
  }

  // Теперь при необходимости можно установить фокус на этот элемент из любого места компонента:
  focus = (e) => {
    // Устанавливаем фокус на текстовое поле, используя вызов низкоуровневого API DOM
    // Внимание: мы обращаемся к свойству «current», чтобы получить DOM-элемент
    this.textInput.current.focus();
  };

  render() {
    // Используем колбэк-реф для связи DOM-элемента
    // с конкретным экземпляром поля.
    return (
      <div>
        <input type="text" ref={this.textInput} />{' '}
        <button type="button" onClick={this.focus}>
          Фокус
        </button>
      </div>
    );
  }
};

// Иногда родительскому компоненту нужно установить фокус на элемент дочернего компонента.
// Мы можем сделать это с помощью рефа на родительский компонент,
// который присваивается специальному свойству дочернего компонента и используется
// для ссылки из родительского компонента на DOM - элемент дочернего.

let CustomTextInput2 = function CustomTextInput(props) {
  return (
    <div>
      <input ref={props.inputRef} />
    </div>
  );
};

export class Parent extends React.Component {
  constructor(props) {
    super(props);
    this.inputElement = React.createRef();
  }
  focus = (e) => {
    this.inputElement.current.focus();
  };
  render() {
    return (
      <div>
        <CustomTextInput2 inputRef={this.inputElement} />
        <button type="button" onClick={this.focus}>
          Фокус
        </button>
      </div>
    );
  }
}

// Если для расширения функциональности компонент оборачивается компонентом высшего порядка,
//  то рекомендуется перенаправлять рефы обёрнутого компонента с помощью React - функции forwardRef

// Если приложение сильно зависит от действий мыши, многие пользователи,
// которые используют только клавиатуру, не смогут работать с ним.

// показан паттерн закрытия всплывающего списка при щелчке мышью за пределами этого элемента.
// Обычно такая функциональность реализуется событием click объекта window,
// обработчик которого закрывает выпадающий список:

export class OuterClickExample extends React.Component {
  constructor(props) {
    super(props);

    this.state = { isOpen: false };
    this.toggleContainer = React.createRef();

    this.onClickHandler = this.onClickHandler.bind(this);
    this.onClickOutsideHandler = this.onClickOutsideHandler.bind(this);
  }

  componentDidMount() {
    window.addEventListener('click', this.onClickOutsideHandler);
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.onClickOutsideHandler);
  }

  onClickHandler() {
    this.setState((currentState) => ({
      isOpen: !currentState.isOpen,
    }));
  }

  onClickOutsideHandler(event) {
    if (this.state.isOpen && !this.toggleContainer.current.contains(event.target)) {
      this.setState({ isOpen: false });
    }
  }

  render() {
    return (
      <div ref={this.toggleContainer}>
        <button onClick={this.onClickHandler}>Select an option</button>
        {this.state.isOpen && (
          <ul>
            <li>Option 1</li>
            <li>Option 2</li>
            <li>Option 3</li>
          </ul>
        )}
      </div>
    );
  }
}

// Такой подход хорош для тех, кто использует мыши, тачпады или другие координатные устройства,
//  однако для пользователей, работающих только с клавиатурой, это не пойдёт
// Хотя у меня с клавы всё ок

// пример с onBlur onFocus
// чё-то код не пойму
export class BlurExample extends React.Component {
  constructor(props) {
    super(props);

    this.state = { isOpen: false };
    this.timeOutId = null;

    this.onClickHandler = this.onClickHandler.bind(this);
    this.onBlurHandler = this.onBlurHandler.bind(this);
    this.onFocusHandler = this.onFocusHandler.bind(this);
  }

  onClickHandler() {
    this.setState((currentState) => ({
      isOpen: !currentState.isOpen,
    }));
  }

  // Мы закрываем выпадающий список по таймеру setTimeout.
  // Это нужно чтобы для дочерних элементов событие выделения
  // происходило перед событием получения фокуса.
  onBlurHandler() {
    this.timeOutId = setTimeout(() => {
      this.setState({
        isOpen: false,
      });
    });
  }
  // Не закрывать выпадающий список при получении фокуса дочерним элементом.
  onFocusHandler() {
    clearTimeout(this.timeOutId);
  }
  render() {
    // React помогает нам благодаря всплытию потери фокуса и
    // фокусировке событий на родителе.
    return (
      <div onBlur={this.onBlurHandler} onFocus={this.onFocusHandler}>
        <button
          onClick={this.onClickHandler}
          aria-haspopup="true"
          aria-expanded={this.state.isOpen}
        >
          Select an option
        </button>
        {this.state.isOpen && (
          <ul>
            <li>Option 1</li>
            <li>Option 2</li>
            <li>Option 3</li>
          </ul>
        )}
      </div>
    );
  }
}

// Обязательно указывайте язык текста на странице. Это необходимо для корректной установки опций
//  экранных считывающих устройств:

// Всегда устанавливайте заголовок <title> для правильного описания контента текущей страницы.
// Это позволит пользователю постоянно быть в курсе контекста страницы:
// Реализовать эти требования в React можно с помощью компонента DocumentTitle.

// Самый простой и одновременно наиболее важный вид проверки — это тестирование клавиатуры
// Чтобы протестировать клавиатуру, выполните следующие действия:
// Отключите мышь.
// Используйте Tab и Shift+Tab для перемещения по странице.
// Используйте Enter для активации элементов.
// Там, где необходимо, используйте клавиши со стрелками, например,
// для работы с меню или выпадающими списками.

// Плагин eslint-plugin-jsx-a11y для ESLint выполняет проверку абстрактного синтаксического
// дерева JSX на предмет поиска проблем, связанных с доступностью контента
// В Create React App этот плагин используется с заранее установленным набором правил.

// Существуют инструменты для аудита доступности контента веб-страниц в браузере.
// Используйте их совместно с теми инструментами для проверки HTML, которые были описаны выше.

// aXe, aXe-core и react-axe
// Компания Deque Systems предлагает модуль aXe-core для автоматизированного и
// сквозного тестирования веб - приложений.Этот модуль имеет интеграцию с Selenium.
// Это расширение для браузеров, предназначенное для комплексного тестирования доступности контента сайтов.

// Также вы можете использовать модуль @axe-core/react для вывода сообщений от aXe в консоль
// в процессе программирования или отладки.

// Web Accessibility Evaluation Tool ещё одно расширение для браузера,
// которое используется для улучшения доступности контента веб - сайтов.

// Дерево доступности — это подмножество DOM-дерева. В нём содержатся объекты, которые
//  нужны для работы технологий поддержки доступности контента, например, для экранных считывающих устройств.

// Проверка работы экранных считывающих устройств должна быть частью
// комплексного тестирования доступности контента.
