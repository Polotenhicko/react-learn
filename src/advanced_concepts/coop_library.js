import React from 'react';
import $ from 'jquery';

// Взаимодействие со сторонними библиотеками

// React не знает про изменения DOM, которые сделаны вне React. Он определяет обновления на основе своего внутреннего представления,
// и если одни и те же DOM - узлы управляются другими библиотеками, то это нарушает работу React без возможности её восстановления.

// Для демонстрации давайте набросаем обёртку вокруг обобщённого jQuery-плагина.

class SomePlugin extends React.Component {
  componentDidMount() {
    this.$el = $(this.el);
  }

  render() {
    <div ref={(el) => (this.el = el)}></div>;
  }
}
