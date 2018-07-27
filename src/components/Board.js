import React from "react"
import { observer } from 'mobx-react';
import './Board.css';
import Square from 'components/Square';
import Winner from 'components/Winner';


const Board = ({store}) => (
    <div className="game">
        <ul className="board">
            {[...store.moves.keys()].map((val, ind) => <Square key={ind} id={ind} store={store}/>)}
        </ul>

        <Winner store={store}/>
    </div>
);

export default observer(Board);
