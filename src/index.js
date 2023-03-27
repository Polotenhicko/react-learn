import React from 'react';
import ReactDOM from 'react-dom/client';
import div, { myButton, FooComponent } from './advanced_concepts/jsx_details';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <FooComponent>
    {'Пример'}
    {2 + 2 + 3 + 'aaa'}
  </FooComponent>
);
