import React from "react"
import { observer } from 'mobx-react';
import './Square.css';


const Square = observer(
    ({ id, store }) => {
        return (
            <li className="square" onClick={()=> store.toggle(id)}>
                {store.moves[id]}
            </li>
        )
    }
);

export default Square;
