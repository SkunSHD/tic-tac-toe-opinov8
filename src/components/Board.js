import React from "react"
import { observer } from 'mobx-react';
import Square from './Square';


const Board = observer(
    props => <ul className="list">
        { Array(9).fill('x/o').map((item, i) => <Square key={i} id={i} />) }
    </ul>
);


export default Board;
