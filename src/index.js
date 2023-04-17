import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './hooks/hookDeferredValue';
import { FriendListItem } from './hooks/userHooks';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<FriendListItem friend={{ id: 3, name: 'Антон' }} />);
