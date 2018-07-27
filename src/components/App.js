import React from "react"
import {observer} from 'mobx-react';
import Board from 'components/Board';
import TimeTravel from 'components/TimeTravel';


const App = (props) => (
    <React.Fragment>
        <Board {...props}/>
        <TimeTravel/>
    </React.Fragment>
);

export default observer(App);
