import React from "react"
import { observer } from 'mobx-react';
import './Board.css';
import Square from 'components/Square';


const Board = ({store}) => (
    <div className="game">
        <ul className="board">
            {[...store.moves.keys()].map((val, ind) => <Square key={ind} id={ind} store={store}/>)}
        </ul>

        {store.winnerName &&
        <React.Fragment>
            <h1 className="title">Winner is {store.winnerName}</h1>
            <div className="button-wrapper">
                <button onClick={store.resetGame}>Restart game</button>
            </div>
        </React.Fragment>
        }
    </div>
);

export default observer(Board);
