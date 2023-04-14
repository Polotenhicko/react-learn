import React, { useState, useEffect } from 'react';
const ChatAPI = {
  subscribeToFriendStatus(friendId, callback) {},
  unsubscribeFromFriendStatus(friendId, callback) {},
};
// пользовательские хуки

// Создание пользовательских хуков позволяет вам перенести логику компонентов в функции, которые можно повторно использовать.

function FriendStatus(props) {
  const [isOnline, setIsOnline] = useState(null);
  useEffect(() => {
    function handleStatusChange({ isOnline }) {
      setIsOnline(isOnline);
    }
    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });
  if (isOnline === null) {
    return 'Загрузка...';
  }
  return isOnline ? 'В сети' : 'Не в сети';
}

// Теперь предположим, что в приложении чата также есть список контактов, и мы хотим отображать зелёным цветом имена пользователей,
// которые сейчас в сети. Мы могли бы просто скопировать и вставить приведённую выше логику в наш компонент FriendListItem,
// но это не самый лучший вариант:

function FriendListItem(props) {
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

  return <li style={{ color: isOnline ? 'green' : 'black' }}>{props.friend.name}</li>;
}

// Вместо этого, мы бы хотели, чтобы FriendStatus и FriendListItem разделяли эту логику.
// Когда одинаковую логику состояния нужно повторно использовать в нескольких компонентах,
// в React традиционно применялись рендер - пропсы и компоненты высшего порядка.

// Пользовательский хук — это JavaScript-функция, имя которой начинается с «use», и которая может вызывать другие хуки

function useFriendStatus(friendID) {
  const [isOnline, setIsOnline] = useState(null);

  useEffect(() => {
    function handleStatusChange(status) {
      setIsOnline(status.isOnline);
    }

    ChatAPI.subscribeToFriendStatus(friendID, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(friendID, handleStatusChange);
    };
  });

  return isOnline;
}
