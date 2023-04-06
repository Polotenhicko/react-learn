import React from 'react';
import ReactDOM from 'react-dom/client';
import { CustomRef } from './advanced_concepts/refs';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<CustomRef />);

// setTimeout(() => {
//   root.render(<div />);
// }, 2e3);
