import React from "react"
import { observer } from 'mobx-react';
import Square from './Square';
import store from "../store";


const Board = observer(
    props => {
        return (
            <ul className="board">
                { store.isWinner &&
                    <h1>Winner is {store.isWinner === 'x' ? 'CROSS!' : 'NOUGHT!'}</h1>
                }
                {Object.keys(props.store).map(id => <Square key={id} id={id} />)}
            </ul>
        )
    }
);


export default Board;
