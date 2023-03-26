import React from 'react';
import ReactDOM from 'react-dom/client';
import div, { myButton, FooComponent } from './advanced_concepts/jsx_details';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<FooComponent message="&lt;3" message2={'<3'} auto />);
