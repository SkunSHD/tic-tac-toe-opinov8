import React from "react"
import { observer } from 'mobx-react';
import Board from './Board';
import TimeTravel from './TimeTravel';


const App = (props) => (
    <React.Fragment>
        <Board/>
        <TimeTravel/>
    </React.Fragment>
);

export default observer(App);
