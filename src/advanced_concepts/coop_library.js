import React from 'react';
import jQuery from 'jquery';
import Backbone from 'backbone';
import ReactDOM from 'react-dom/client';

// не скачался chose, вот жопа вместо него
const $ = function (...args) {
  const zopa = jQuery(...args);
  if (!zopa.chosen) {
    zopa.chosen = function () {
      console.log('zopa', ...arguments);
    };
  }
  return zopa;
};

// Взаимодействие со сторонними библиотеками

// React не знает про изменения DOM, которые сделаны вне React. Он определяет обновления на основе своего внутреннего представления,
// и если одни и те же DOM - узлы управляются другими библиотеками, то это нарушает работу React без возможности её восстановления.

// Для демонстрации давайте набросаем обёртку вокруг обобщённого jQuery-плагина.

class SomePlugin extends React.Component {
  componentDidMount() {
    // работает через JQuery с DOM
    this.$el = $(this.el);
  }

  componentWillUnmount() {
    // Многие JQuery плагины добавляют обработчики DOM
    // и нам нужно их убрать
    // Если плагин не может это сделать, то мы должны делать это сами
    // иначе будет утечка памяти
  }

  render() {
    // не имеет свойств, не имеет дочерних компонентов
    // для реакта нет смысла обновлять этот компонент
    return <div ref={(el) => (this.el = el)}></div>;
  }
}

// Давайте напишем минимальную обёртку для плагина Chosen, который работает с элементами <select>.
// Мы хотим предоставить следующий API для нашего компонента-обёртки над <Chosen>:

class Choosen extends React.Component {
  handleChange = (e) => {
    this.props.onChange(e.target.value);
  };

  componentDidMount() {
    this.$el = $(this.el);
    this.$el.chosen();
    // хочу получать уведомления об изменений значений
    // подпишимся на событие change jQuery

    // не передаём в пропсах обработчик, объявляем свой метод
    this.$el.on('change', this.handleChange);
  }

  componentWillUnmount() {
    this.$el.chosen('destroy');
    // убираем подписку на событие
    this.$el.off('change', this.handleChange);
  }

  // В завершение осталось сделать ещё кое-что. В React пропсы могут изменяться со временем
  // Документация Chosen предлагает использовать jQuery-метод trigger(), чтобы сообщить об изменениях в оригинальном DOM-элементе.
  // Мы поручим React заниматься обновлением this.props.children внутри <select>, но нужно добавить метод жизненного цикла
  // componentDidUpdate(), чтобы уведомлять Chosen про обновление списка дочерних элементов:

  componentDidUpdate(prevProps) {
    if (prevProps.children !== this.props.children) {
      this.$el.trigger('chosen:updated');
    }
    // Таким способом Chosen узнает, что нужно обновить его DOM-элемент, когда дочерние элементы <select> были обновлены React.
  }

  render() {
    // обернули в div, вдруг захотим добавить не один select
    return (
      <div>
        <select className="Choosen-select" ref={(el) => (this.el = el)}>
          {this.props.children}
        </select>
      </div>
    );
  }
}

export function App() {
  return (
    <Choosen onChange={(value) => console.log(value)}>
      <option>Ваниль</option>
      <option>Шоколад</option>
      <option>Клубника</option>
    </Choosen>
  );
}

// Интеграция с другими визуальными библиотеками
// Благодаря гибкости createRoot() React может встраиваться в другие приложения.

// Хотя обычно React используют для загрузки в DOM одного корневого компонента, createRoot() может быть вызван несколько раз
// для независимых частей UI.Это могут быть как отдельные кнопки, так и большие приложения.

// Замена строковых шаблонов с помощью React

// Распространённый подход в старых веб-приложениях — описание частей DOM c помощью строк (вроде ${el.html(htmlString)})
// Просто переписываем рендеринг на основе строк в React-компонент.

// Итак, есть текущая реализация на jQuery…

// $('#root').html('<button id="btn">Сказать «Привет»</button>');
// $('#btn').click(function () {
//   console.log('Привет!');
// });

// Перепишем на React-компонент

let Button = function Button() {
  return <button id="btn">Сказать «Привет»</button>;
};
// $('#btn').click(function () {
//   console.log('Привет!');
// });

// А дальше вы можете начать переносить логику внутрь компонента и использовать остальные React-подходы
// Например, в компонентах лучше не полагаться на идентификаторы, потому что один и тот же компонент может быть отрендерен несколько раз

Button = function Button(props) {
  return <button onClick={props.onClick}>Сказать «Привет»</button>;
};

let HelloButton = function HelloButton() {
  const handleClick = () => console.log('Привет!!');
  return <Button onClick={handleClick} />;
};

// И рендерим на нашем контейнере через createRoot
export { HelloButton };

// Встраиваем React в представления Backbone

// Представления в Backbone обычно используют HTML-строки или функции, создающие строковые шаблоны для создания DOM-элементов.
// Этот механизм также может быть заменён рендерингом React - компонентов.

// Ниже мы создадим Backbone-представление ParagraphView
// Оно переопределит метод render() (из Backbone.View) для рендеринга React-компонента <Paragraph> в DOM-элемент,
// предоставляемый Backbone (this.el). Также мы воспользуемся ReactDOM.createRoot():

function Paragraph(props) {
  return <p>{props.text}</p>;
}

const ParagraphView = Backbone.View.extend({
  initialize(options) {
    this.reactRoot = ReactDOM.createRoot(this.el);
  },
  render() {
    const text = this.model.get('text');
    this.reactRoot.render(<Paragraph text={text} />);
    return this;
  },
  remove() {
    this.reactRoot.unmount();
    Backbone.View.prototype.remove.call(this);
  },
});

// Стоит отметить важность вызова root.unmount() в методе remove.
// Он нужен для того, чтобы React отключил обработчики событий и другие ресурсы, связанные с деревом компонентов при удалении.

// Использование моделей Backbone в React-компонентах
// Самый простой способ использовать модели и коллекции Backbone из React-компонентов — это обработка различных событий и
// ручное обновление компонентов.

// Компоненты, отвечающие за рендеринг моделей, будут обрабатывать событие 'change', а компоненты, отвечающие за рендеринг коллекций,
// будут обрабатывать события 'add' и 'remove'.В обоих случаях для отображения новых данных нужно вызвать this.forceUpdate().

// В следующем примере компонент list рендерит Backbone-коллекцию, используя компонент Item для рендеринга отдельных элементов.

class Item extends React.Component {
  handleChange = () => {
    this.forceUpdate();
  };

  componentDidMount() {
    this.props.model.on('change', this.handleChange);
  }

  componentWillUnmount() {
    this.props.model.off('change');
  }

  render() {
    return <li>{this.props.model.get('text')}</li>;
  }
}

class List extends React.Component {
  handleChange() {
    this.forceUpdate();
  }

  componentDidMount() {
    this.props.collection.on('add', 'remove', this.handleChange);
  }

  componentWillUnmount() {
    this.props.collection.off('add', 'remove', this.handleChange);
  }

  render() {
    return (
      <ul>
        {this.props.collection.map((model) => (
          <Item key={model.cid} model={model} />
        ))}
      </ul>
    );
  }
}

// Вынос данных из моделей Backbone

// Один из подходов — когда при каждом изменении модели, вы извлекаете её атрибуты в виде простых данных и храните всю логику
// в одном месте.Следующий компонент высшего порядка извлекает все атрибуты Backbone - модели в state, передавая данные
// в оборачиваемый компонент.

// При этом подходе только компоненты высшего порядка будут знать о Backbone-моделях,
// а большая часть компонентов в приложении не будет завязана на Backbone.

function conectToBackboneModel(WComponent) {
  return class BackBoneComponent extends React.Component {
    constructor(props) {
      super(props);
      this.state = Object.assign({}, props.model.attributes);
    }

    componentDidMount() {
      this.props.model.on('change', this.handleChange);
    }

    componentWillReceiveProps(nextProps) {
      this.setState(Object.assign({}, nextProps.model.attributes));
      if (nextProps.model !== this.props.model) {
        this.props.model.off('change', this.handleChange);
        nextProps.model.on('change', this.handleChange);
      }
    }

    componentWillUnmount() {
      this.props.model.off('change', this.handleChange);
    }

    handleChange = (model) => {
      this.setState(model.changedAttributes());
    };

    render() {
      const propsExceptModel = Object.assign({}, this.props);
      delete propsExceptModel.model;
      return <WComponent {...propsExceptModel} {...this.state} />;
    }
  };
}

// Для демонстрации использования мы соединим React-компонент NameInput и Backbone-модель и будем обновлять её атрибут firstName
// при каждом изменении поля ввода:

function NameInput(props) {
  return (
    <p>
      <input value={props.firstName} onChange={props.handleChange} />
      <br />
      Моё имя - {props.firstName}
    </p>
  );
}

const BackBoneNameInput = conectToBackboneModel(NameInput);

function Example(props) {
  const handleChange = (e) => props.model.set('firstName', e.target.value);

  return <BackBoneNameInput model={props.model} handleChange={handleChange} />;
}

const model = new Backbone.Model({ firstName: 'Фродо' });
// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(<Example model={model} />);
