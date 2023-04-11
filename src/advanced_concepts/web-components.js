import { Component } from 'react';
import ReactDOM from 'react-dom';
// веб-компоненты это здорово

export function HelloMessage(props) {
  return (
    <div>
      Привет, <x-search>{props.name}</x-search>!
    </div>
  );
}

// Веб-компоненты часто предоставляют императивный API. Например, веб-компонент video может предоставлять функции play() и pause()
// Чтобы получить доступ к необходимому API веб-компонентов, необходимо использовать реф для взаимодействия с DOM-узлом напрямую
// Если вы используете сторонние веб-компоненты, лучшим решением будет создать React-компонент и использовать его как обёртку для веб-компонента.

// Веб-компоненты используют «class» вместо «className»
export function BrickFlipbox() {
  return (
    <brick-flipbox class="demo">
      <div>Передняя сторона</div>
      <div>Обратная сторона</div>
    </brick-flipbox>
  );
}

// Использование React в веб-компонентах
class XSearch extends HTMLElement {
  connectedCallback() {
    const mountPoint = document.createElement('span');
    this.attachShadow({ mode: 'open' }).appendChild(mountPoint);

    const name = this.getAttribute('name');
    const url = 'https://www.google.com/search?q=' + encodeURIComponent(name);
    const root = ReactDOM.createRoot(mountPoint);
    root.render(<a href={url}>{name}</a>);
  }
}

customElements.define('x-search', XSearch);
