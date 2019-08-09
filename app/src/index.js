import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import './css/app.css';
import {} from 'dotenv/config';

import Layout from './layout';

ReactDOM.render(<Layout />, document.getElementById('root'));
registerServiceWorker();
