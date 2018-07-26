import {types} from "mobx-state-tree";
import Square from './Square';

const Root = types.model({
    moves: types.map(Square)
});


export default Root;