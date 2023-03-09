// Компонент высшего порядка (Higher-Order Component, HOC) — это один из продвинутых способов для повторного использования логики
// HOC не являются частью API React

const { Component } = require('react');

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

class CommentList extends Component {
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

class BlogPost extends Component {
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
  return class extends Component {
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
  return class extends Component {
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
