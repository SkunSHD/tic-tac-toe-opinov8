import React from "react"
import { observer } from 'mobx-react';
import Square from './Square';


const Board = observer(
    props => {
        return (
            <ul className="board">
                { Object.keys(props.store).map(id => <Square key={id} id={id} />)}
            </ul>
        )
    }
);


export default Board;
