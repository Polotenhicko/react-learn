import React from 'react';
import ReactDOM, { createRoot } from 'react-dom/client';
import * as Availab from './contentAvailability';
import * as Divide from './divideCode';
import { App as Context } from './context';
import { FancyButton } from './refs';
import { Table, Glossary } from './fragments';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <div>
    <Table />
    <Glossary
      items={[
        { id: 0, term: 'Lol', description: 'Mem' },
        { id: 1, term: 'kek', description: 'Tozhe Mem' },
      ]}
    />
  </div>
);
