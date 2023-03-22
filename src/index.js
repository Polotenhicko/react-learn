import React from 'react';
import ReactDOM, { createRoot } from 'react-dom/client';
import { App } from './advanced_concepts/coop_library';
window.$ = window.jQuery = require('jquery');

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
