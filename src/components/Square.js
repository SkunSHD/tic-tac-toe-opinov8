import React from "react"
import { observer } from 'mobx-react';
import store from '../store';

const Square = observer(
    props => (
        <li className="square" onClick={()=> store.toggle(props.id)}>
            {store[props.id]}
        </li>
    )
);


export default Square;
