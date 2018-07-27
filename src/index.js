import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import store from 'stores/store';
import 'stores/timeTravel';
import App from 'components/App';


store.fetchMoves();

ReactDOM.render(<App store={store}/>, document.getElementById('root'));
