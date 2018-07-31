import store from "stores/store"
import { applySnapshot, onSnapshot } from "mobx-state-tree"


const snapshots = [];
let step = -1;


onSnapshot(store, snapshot => {
    if(step === snapshots.length - 1) {
        step++;
        snapshots.push(snapshot);
    }
});

const previousState = ()=> {
    if(step === 0) return;
    step--;
    applySnapshot(store, snapshots[step])
};


const nextState = ()=> {
    if(step === snapshots.length - 1) return;
    applySnapshot(store, snapshots[step + 1]);
    step++
};


export default { nextState, previousState };