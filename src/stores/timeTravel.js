import store from "stores/store"
import { applySnapshot, onSnapshot } from "mobx-state-tree"

const states = [];
let currentFrame = -1;


onSnapshot(store, snapshot => {
    if (currentFrame === states.length - 1) {
        currentFrame++;
        states.push(snapshot)
    }
});

const previousState = ()=> {
    if (currentFrame === 0) return;
    currentFrame--;
    applySnapshot(store, states[currentFrame])
};

const nextState = ()=> {
    if (currentFrame === states.length - 1) return;
    currentFrame++;
    applySnapshot(store, states[currentFrame])
};

export default { nextState, previousState };