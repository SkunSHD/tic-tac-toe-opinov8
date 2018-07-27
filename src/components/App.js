import React from "react"
import {observer} from 'mobx-react';
import Board from 'components/Board';
import TimeTravel from 'components/TimeTravel';


const App = (props) => (
    props.store.moves.size ?
        <React.Fragment>
            <Board {...props}/>
            <TimeTravel/>
        </React.Fragment>
        :
        <p>Loading...</p>
);

export default observer(App);
