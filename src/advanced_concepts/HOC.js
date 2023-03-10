import React from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';

// Компонент высшего порядка (Higher-Order Component, HOC) — это один из продвинутых способов для повторного использования логики
// HOC не являются частью API React

// компонент высшего порядка — это функция, которая принимает компонент и возвращает новый компонент
// Традиционные компоненты подразумевают многократное использование, но не позволяют с лёгкостью решить некоторые проблемы.

// Пример

const DataSource = {
  comments: [
    {
      id: 1,
      text: 'aboba',
    },
    {
      id: 2,
      text: 'zopa',
    },
  ],
  getComments() {
    return this.comments;
  },
  addChangeListener() {},
};

class CommentList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: DataSource.getComments(),
    };
  }

  componentDidMount() {
    // подписываемся на уведомление
    DataSource.addChangeListener(this.handleChange);
  }

  componentWillUnmount() {
    // отписываемся
    DataSource.removeChangeListener(this.handleChange);
  }

  handleChange = () => {
    // сохраняем комменты из внешнего источника во внешний
    this.setState({
      comments: DataSource.getComments(),
    });
  };

  render() {
    return (
      <div>
        {this.state.comments.map((comment) => (
          <div key={comment.id}>{comment.text}</div>
        ))}
      </div>
    );
  }
}

// и есть ещё компонент с похожей реализацией

class BlogPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      blogPost: DataSource.getBlogPost(props.id),
    };
  }

  componentDidMount() {
    // подписываемся на уведомление
    DataSource.addChangeListener(this.handleChange);
  }

  componentWillUnmount() {
    // отписываемся
    DataSource.removeChangeListener(this.handleChange);
  }

  handleChange = () => {
    // сохраняем комменты из внешнего источника во внешний
    this.setState({
      blogPost: DataSource.getBlogPost(),
    });
  };

  render() {
    return <div>{this.state.blogPost}</div>;
  }
}

// разница лишь в вызываемых методах, в остальном они одинаковы

// Оба компонента подписываются на оповещения от DataSource при монтировании.
// Оба меняют внутреннее состояние при изменении DataSource.
// Оба отписываются от DataSource при размонтировании.

// мы хотим абстрагировать эту функциональность и использоваь в других компонентах

// создадим функцию withSubscription - будет создавать компоненты и подписывать их на обновленеи DataSource
// и через пропсы будет передавать новые данные

const CommentListWithSubscription = withSubscription(CommentList, (DataSource) =>
  DataSource.getComments()
);

const BlogPostWithSubscription = withSubscription(BlogPost, (DataSource, props) =>
  DataSource.getBlogPost(props.id)
);

// первый параметр - оборачиваемый компонент
// второй параметр - коллбэк, которая извлекает нужные нам данные, получает DataSource и текущие пропсы

function withSubscription(WrappedComponent, selectData) {
  // возвращает новый компонент
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        data: selectData(DataSource, props),
      };
    }

    componentDidMount() {
      DataSource.addChangeListener(this.handleChange);
    }

    componentWillUnmount() {
      DataSource.removeChangeListener(this.handleChange);
    }

    handleChange = () => {
      this.setState({
        data: selectData(DataSource, this.props),
      });
    };

    render() {
      return <WrappedComponent data={this.state.data} {...this.props} />;
    }
  };
}

// HOC ничего не меняет и не меняет поведение оборачиваемого компонента
// HOC является чистой функцией без побочных эффектов

// не нужно мутировать оборачиваемый компонент!!

function logProps(InputComponent) {
  InputComponent.prototype.componentDidUpdate = function (prevProps) {
    console.log(`Текущие пропсы: ${this.props}`);
    console.log(`Предыдущие пропсы: ${prevProps}`);
  };
  return InputComponent;
}

// // EnhancedComponent будет печатать в консоль при каждом изменении пропсов
// const EnhancedComponent = logProps(InputComponent);

// но теперь мы не можем отдельно использовать InputComponent от EnchancedComponent
// и наш EnchancedComponent не работает с функциональными компонентами

// лучше вместо этого применять композицию

function logProps2(InputComponent) {
  return class extends React.Component {
    componentDidUpdate(prevProps) {
      console.log(`Текущие пропсы: ${this.props}`);
      console.log(`Предыдущие пропсы: ${prevProps}`);
    }

    render() {
      return <InputComponent {...this.props} />;
    }
  };
}
const WrappedTest = logProps2(CommentList);
export { WrappedTest };

// Соглашение: передавайте посторонние пропсы оборачиваемому компоненту
// HOC добавляют компонентам функциональность, но они не должны менять их оригинальное предназначение

// Пропсы, которые напрямую не связаны с функциональностью HOC, должны передаваться без изменений оборачиваемому компоненту.

function render1(props) {
  // отфильтровываем пропсы
  const { extraProp, ...otherProps } = props;

  const injectedProp = 'some prop' + extraProp;
  return <InputComponent injectedProp={injectedProp} {...otherProps} />;
}

// Соглашение: Максимизируем композитивность

// Не все HOC выглядят одинаково. Некоторые принимают всего лишь один аргумент — оборачиваемый компонент:

function withRouter(WComponent) {
  return (
    <div>
      <WComponent />
    </div>
  );
}

function Navbar() {
  return <nav>123</nav>;
}

const config = {
  aboba: 2,
};

const NavbarWithRouter = withRouter(Navbar);
const NavbarWithRouter2 = withRouter(Navbar, config);
// Может быть и несколько параметров

// Самый распространённый способ вызвать HOC:
// `connect` из React Redux
function connect() {
  return function () {};
}
const ConnectedComment = connect('commentSelector', 'commentAction')(CommentList);

// Другими словами, connect — это функция высшего порядка, которая возвращает компонент высшего порядка!

// Вместо этого...
let EnhancedComponent = withRouter(connect(commentSelector)(WrappedComponent));

// вот тут максимально не понятно
// ... вы можете воспользоваться вспомогательной совмещающей функцией
// compose(f, g, h) идентичен (...args) => f(g(h(...args)))
const enhance = compose(
  // Оба параметра являются HOC и принимают один единственный аргумент
  withRouter,
  connect(commentSelector)
);
EnhancedComponent = enhance(WrappedComponent);

// Соглашение: добавьте отображаемое имя для лёгкой отладки
// Созданные HOC компоненты-контейнеры отображаются в консоли инструментов разработки React наряду с другими компонентами

// Самый распространённый способ — это обернуть имя оборачиваемого компонента. Например, если вы назвали компонент
// высшего порядка withSubscription, а имя оборачиваемого компонента было CommentList,
// то отображаемое имя будет WithSubscription(CommentList):

function withSubscription2(WComponent) {
  class WithSubscription extends React.Component {
    render() {
      return <div></div>;
    }
  }
  WithSubscription.displayName = `WithSubscription(${getDisplayName(WComponent)})`;
  return WithSubscription;
}

function getDisplayName(WComponent) {
  return WComponent.displayName || WComponent.name || 'Component';
}

// Предостережения
// Не используйте HOC внутри рендер-метода

// Всё из-за сравнения перед рендером, если мы в рендере создадим заново HOC, то будет новый рендер

function Test(props) {
  const HOC = logProps2(CommentList);
  // будет всегда перерендеривать, т.к. ссылка поменялась
  return <HOC {...props} />;
}
// проблема также в том, что будет обновляться его стейт, а также дочерних компонентов
// но вроде бы в редких случаях можно применить хок в жизненных циклах компонента

// Копируйте статические методы
// Иногда бывает полезно определить статические методы компонента

// Когда мы применяем HOC, то заворачиваем оригинальный компонент в контейнер.
// Поэтому у нового компонента не будет статических методов оригинального компонента.

CommentList.staticMethod = function () {
  console.log('статический метод');
};

const HOC = logProps2(CommentList);
typeof HOC.staticMethod == 'undefined'; // true

// будем копировать

function logProps3(WComponent) {
  class LogProps extends React.Component {}
  // и тут только знать какие именно метода копировать
  LogProps.staticMethod = WComponent.staticMethod;
  return LogProps;
}

// можно воспользоваться hoist-non-react-statics, копирует не связанные с реакт статические методы

function logProps4(WComponent) {
  class LogProps extends React.Component {}
  hoistNonReactStatics(LogProps, WComponent);
  return LogProps;
}

// Другое возможное решение — экспортировать статические методы отдельно от компонента.

function staticMethod() {
  console.log('статический метод');
}

CommentList.staticMethod = staticMethod;

// отдельно экспортируем метод
export { staticMethod };

// Рефы не передаются
// По соглашению компоненты высшего порядка передают оборачиваемому компоненту все пропсы,
// кроме рефов.ref на самом деле не проп, как, например, key, и поэтому иначе обрабатывается React.

function logProps5(WComponent) {
  class LogProps extends React.Component {
    componentDidUpdate(prevProps) {
      console.log('old props:', prevProps);
      console.log('new props:', this.props);
    }

    render() {
      const { forwardedRef, ...rest } = this.props;

      // Передаём в качестве рефа проп "forwardedRef"
      return <WComponent ref={forwardedRef} {...rest} />;
    }
  }

  return React.forwardRef((props, ref) => {
    return <WComponent {...props} forwardedRef={ref} />;
  });
}
