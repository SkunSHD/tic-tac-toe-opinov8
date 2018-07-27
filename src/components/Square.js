import React from "react"
import {observer} from 'mobx-react';
import './Square.css';


const Square = ({id, store}) => {
    // test re-rendering
    // console.log("----|> cell rendered", id);
    return (
        <li className="square" onClick={() => store.toggle(id)}>
            {store.moves.get(id)}
        </li>
    )
};

export default observer(Square);
