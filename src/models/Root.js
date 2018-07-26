import {types} from "mobx-state-tree";


const Root = types.model({
    count: types.optional(types.number, 0)
}).actions(self => ({
    increment(){
        self.count++
    },
    decrement() {
        self.count--
    }
}));


export default Root;