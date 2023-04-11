import React from 'react';
import ReactDOM from 'react-dom/client';
import { HelloMessage } from './advanced_concepts/web-components';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<HelloMessage name={'Антон'} />);
