import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './hooks/hookDeferredValue';
import { Search } from './hooks/hookTransition';
import { Sus } from './main_concepts/suspense';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Sus />);
