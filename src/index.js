import React from 'react';
import ReactDOM, { createRoot } from 'react-dom/client';
import * as Availab from './contentAvailability';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <div>
    <Availab.CustomTextInput />
    <Availab.Parent />
    <Availab.OuterClickExample />
    <Availab.BlurExample />
  </div>
);
