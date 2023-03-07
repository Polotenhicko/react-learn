// хук эффекта
// даёт возможность выполнять побочные эффекты в функциональном компоненте
import React, { useState, useEffect } from 'react';

let Example = function Example(props) {
  const [count, setCount] = useState(0);

  // аналогичен componentDidMount и componentDidUpdate
  useEffect(() => {
    // обновляем заголовок документа с помощью api браузера
    document.title = `Вы нажали ${count} раз`;
  });

  return (
    <div>
      <p>Вы нажали {count} раз!</p>
      <button onClick={() => setCount(count + 1)}>Нажми на меня</button>
    </div>
  );
};

// хук useEffect представляет собой совокупность методов componentDidMount, componentDidUpdate, и componentWillUnmount.
// Существует два распространённых вида побочных эффектов в компонентах React: компоненты, которые требуют и не требуют сброса

// Какие-то сбросы

// Иногда мы хотим выполнить дополнительный код после того, как React обновил DOM
// Сетевые запросы, изменения DOM вручную, логирование — всё это примеры эффектов, которые не требуют сброса
// После того, как мы запустили их, можно сразу забыть о них, ведь больше никаких дополнительных действий не требуется

// пример на классовых компонентах
let Example2 = class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
  }

  componentDidMount() {
    document.title = `Вы нажали ${this.state.count} раз`;
  }
  componentDidUpdate() {
    document.title = `Вы нажали ${this.state.count} раз`;
  }

  render() {
    return (
      <div>
        <p>Вы нажали {this.state.count} раз</p>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          Нажми на меня
        </button>
      </div>
    );
  }
};

// пришлось дублировать код между методами жизненного цикла
// Это всё потому, что во многих случаях, мы хотим выполнять одни и те же побочные эффекты вне зависимости от того,
//  был ли компонент только что смонтирован или обновлён
// Мы могли бы вынести этот метод отдельно, но нам бы всё равно пришлось бы вызывать его в двух местах.

// Что же делает useEffect?
// Используя этот хук, вы говорите React сделать что-то после рендера

// React запомнит функцию (то есть «эффект»), которую вы передали и вызовет её после того, как внесёт все изменения в DOM
// Пока что выполняет каждый раз после рендера, позже попробуем настроить это

// useEffect принимает функцию, которая и будет эффектом

// В отличие от componentDidMount или componentDidUpdate, эффекты, запланированные с помощью useEffect,
//  не блокируют браузер при попытке обновить экран

// Впервые такую проблему вижу

// Теперь эффекты со сбросом
// Например, нам может потребоваться установить подписку на какой-нибудь внешний источник данных
// В этом случае очень важно выполнять сброс, чтобы не случилось утечек памяти

// Пример с классами
// В React-классе, вы, как правило, оформили бы подписку в componentDidMount и отменили бы её в componentWillUnmount
//  Например, предположим, что у нас есть некий модуль ChatAPI, с помощью которого мы можем подписаться на статус друга в сети.
//  Вот как бы мы подписались и отобразили статус, используя класс:

let FriendStatus = class FriendStatus extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOnline: null,
    };
  }

  // componentDidMount и componentWillUnmount по сути содержат идентичный код
  componentDidMount() {
    ChatAPI.subscribeToFriendStatus(this.props.friend.id, this.handleStatusChange);
  }

  componentWillUnmount() {
    ChatAPI.unsubscribeFromFriendStatus(this.props.friend.id, this.handleStatusChange);
  }

  handleStatusChange = (status) => {
    this.setState({
      isOnline: status.isOnline,
    });
  };

  render() {
    if (this.state.isOnline === null) {
      return 'Загрузка...';
    }
    return this.state.isOnline ? 'В сети' : 'Не в сети';
  }
};

// перепишем на хуки
// если useEffect возвращает функцию, то она будет выполнена при размонтировании
// но кажется эта функция будет ещё и при обновлении
FriendStatus = function FriendStatus(props) {
  const [isOnline, setIsOnline] = useState(null);
  useEffect(() => {
    function handleStatusChange(status) {
      setIsOnline(status.isOnline);
    }
    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    return function cleanup() {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });

  if (isOnline === null) {
    return 'Загрузка...';
  }
  return isOnline ? 'В сети' : 'Не в сети';
};

// лучше использовать несколько хуков для разных задач
// пример на классе

let FriendStatusWithCounter = class FriendStatusWithCounter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0, isOnline: null };
  }

  componentDidMount() {
    document.title = `Вы нажали ${this.state.count} раз`;
    ChatAPI.subscribeToFriendStatus(this.props.friend.id, this.handleStatusChange);
  }

  componentDidUpdate() {
    document.title = `Вы нажали ${this.state.count} раз`;
  }

  componentWillUnmount() {
    ChatAPI.unsubscribeFromFriendStatus(this.props.friend.id, this.handleStatusChange);
  }

  handleStatusChange = (status) => {
    this.setState({
      isOnline: status.isOnline,
    });
  };

  render() {
    // тут код
    return;
  }
};

// теперь на хуках
// буду использовать несколько хуков чтобы логику разделить

FriendStatusWithCounter = function FriendStatusWithCounter(props) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    document.title = `Вы нажали ${count} раз`;
  });

  const [isOnline, setIsOnline] = useState(null);
  useEffect(() => {
    function handleStatusChange(status) {
      setIsOnline(status.isOnline);
    }

    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });

  return <div>....</div>;
};

// С помощью хуков, мы можем разделить наш код основываясь на том, что он делает, а не по принципам методов жизненного цикла
// React будет выполнять каждый используемый эффект в компоненте, согласно порядку их объявления.

// Почему же этап сброса выполняется каждый раз при обновлении? А не только после размонтирования?
// КОроче меньше багов
// Если не сделать, то может быть баг, что придут новые пропсы, а мы не подписались заново
// В классовом нужно будет добавить componentDidUpdate чтобы отписаться от предыдущего друга

// В useEffect мы по умолчанию возвращаем функцию со сбросом

// оптимизация производительности за счёт пропуска эффектов:
// в классовых компонентах можно проверять предыдущие пропсы и стейт
// componentDidUpdate(prevProps, prevState)

// Эта логика есть и в useEffect]
// Вы можете сделать так, чтобы React пропускал вызов эффекта после рендера, если определённые значения остались
//  без изменений между последующими рендерами.
// Чтобы сделать это, передайте массив в useEffect вторым необязательным аргументом.
const useEffect = () => {};
useEffect(() => {
  document.title = `Вы нажали ${count} раз`;
}, [count]); // Перезапускать эффект только если count поменялся
// Идёт сравнение

FriendStatusWithCounter = function FriendStatusWithCounter(props) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    document.title = `Вы нажали ${count} раз`;
  });

  const [isOnline, setIsOnline] = useState(null);
  useEffect(() => {
    function handleStatusChange(status) {
      setIsOnline(status.isOnline);
    }

    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  }, [props.friend.id]); // сравнение по id

  return <div>....</div>;
};

// важно пихать туда все значения из пропсов и стейта которые могут меняться с течением времени
// но только из области видимости компонента

// если нужно выполнить код только при монтировании и размонтировании, то нужно передать пустой массив []
export { Example };
