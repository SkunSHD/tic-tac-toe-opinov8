import React from "react"
import { observer } from 'mobx-react';


const App = observer(
    props => <div>
        My awesome counter:
        <button onClick={() => props.store.decrement()}>-</button>
        {props.store.count}
        <button onClick={() => props.store.increment()}>+</button>
    </div>
);


export default App;
