import Root from '../models/Root';
import {addMiddleware} from "mobx-state-tree";
import db from 'utils/db';
import logger from 'utils/logger';


const store = Root.create({}, {
    db,
    winnerCases: [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ]
});

addMiddleware(store, logger);

export default store;