import React from 'react';
import ReactDOM from 'react-dom';

import './index.scss';
import App from './app';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(<App />, document.getElementById('app'));

if (module.hot) {
  module.hot.accept();
}
