import React from 'react';
import ReactDOM, { createRoot } from 'react-dom/client';
import * as Availab from './contentAvailability';
import * as Divide from './divideCode';
import { App as Context } from './context';
import { FancyButton } from './refs';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <FancyButton>
    <div>123</div>
  </FancyButton>
);
