import React from 'react';
import { Component } from 'react';
// Если вы испытываете проблемы с производительностью в React-приложении, убедитесь в том, что вы проводите тесты с настройками минифицированной продакшен-сборки.

// По умолчанию в React есть много вспомогательных предупреждений, очень полезных при разработке
// Тем не менее, они делают React больше и медленнее, поэтому вам обязательно следует использовать продакшен-версию при деплое приложения.

// есть готовые версии для продакшена в виде отдельных файлов
// должно быть .min.js

// список полезных пакетов:

// Brunch - для создания более эффективной сборки
// Browserify - для использования моддульной системы commonJS
// Rollup - позволяет использовать модульную систему ES6 и Tree-shaking для организации и сборки JavaScript-кода.
// webpack - Webpack 4.0 и выше по умолчанию минифицирует код в продакшен-режиме.

// Если ваше приложение рендерит длинные списки данных (сотни или тысячи строк), мы рекомендуем использовать метод известный как
// «оконный доступ». Этот метод рендерит только небольшое подмножество строк в данный момент времени и может значительно сократить
// время, необходимое для повторного рендера компонентов, а также количество создаваемых DOM - узлов.

// react-window и react-virtualized — это популярные библиотеки для оконного доступа.

// React создаёт и поддерживает внутреннее представление отображаемого пользовательского интерфейса
// Это представление позволяет React избегать создания DOM-узлов и не обращаться к текущим без необходимости,
// поскольку эти операции могут быть медленнее, чем операции с JavaScript-объектами. Иногда его называют «виртуальный DOM»,
// но в React Native это работает точно так же.

// Когда изменяются пропсы или состояние компонента, React решает нужно ли обновление DOM,
// сравнивая возвращённый элемент с ранее отрендеренным.Если они не равны, React обновит DOM.

// В большинстве случаев это не проблема, но если замедление заметно, то вы можете всё ускорить,
// переопределив метод жизненного цикла shouldComponentUpdate, который вызывается перед началом процесса ререндеринга

// типо так
const test = function shouldComponentUpdate(nextProps, nextState) {
  return true;
};
// Можно использовать PureComponent
// Это эквивалентно реализации shouldComponentUpdate() с поверхностным сравнением текущих и предыдущих пропсов и состояния.
// но толькоповерхностно

class ListOfWords extends React.PureComponent {
  // PureComponent сравнит лишь ссылку,ссылка будет равна, компонент никогда не обновится
  render() {
    return <div>{this.props.words.join(',')}</div>;
  }
}

class WordAdder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      words: ['слово'],
    };
  }

  handleClick = () => {
    // код хуета и приводит к багам
    // нельзя работать напрямую со стейтом
    const words = this.state.words;
    words.push('слово');
    this.setState({ words });
  };

  render() {
    return (
      <div>
        <button onClick={this.handleClick} />
        <ListOfWords words={this.state.words} />
      </div>
    );
  }
}
