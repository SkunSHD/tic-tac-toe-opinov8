import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import store from 'stores/store';
import 'stores/timeTravel';
import App from 'components/App';


ReactDOM.render(<App store={store}/>, document.getElementById('root'));
