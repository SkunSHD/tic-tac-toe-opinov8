import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import store from 'stores/store';
import 'stores/timeTravel';


store.fetchMoves(()=> {
    ReactDOM.render(<App store={store}/>, document.getElementById('root'));
});
