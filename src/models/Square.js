import {types} from "mobx-state-tree";

const Square = types.model({
    id: types.identifierNumber,
    move: types.string
});

export default Square;