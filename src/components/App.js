import React from "react"
import { observer } from 'mobx-react';
import Board from './Board';

const App = observer(
    props => <React.Fragment>
        <Board {...props} />
    </React.Fragment>

);


export default App;
