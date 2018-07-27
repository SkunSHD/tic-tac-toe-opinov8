import React from "react"
import {observer} from 'mobx-react';
import './Winner.css';


const Winner = ({store}) => (
    !!store.winnerName &&
        <React.Fragment>
            <h1 className="title">Winner is {store.winnerName}</h1>
            <div className="button-wrapper">
                <button onClick={store.resetGame}>Restart game</button>
            </div>
        </React.Fragment>
);

export default observer(Winner);
