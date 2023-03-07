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
          <Comment comment={comment} key={comment.id} />
        ))}
      </div>
    );
  }
}
