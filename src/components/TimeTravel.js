import React from "react"
import { observer } from 'mobx-react';
import timeTravel from 'stores/timeTravel';


const TimeTravel = props => (
    <React.Fragment>
        <button onClick={timeTravel.previousState}>back</button>
        <button onClick={timeTravel.nextState}>forward</button>
    </React.Fragment>
);

export default observer(TimeTravel);


