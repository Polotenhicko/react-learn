import React from 'react';
import jQuery from 'jquery';

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
