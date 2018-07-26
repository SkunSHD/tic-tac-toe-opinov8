import {types} from "mobx-state-tree";


const Root = types
    .model({
        0: '',
        1: '',
        2: '',
        3: '',
        4: '',
        5: '',
        6: '',
        7: '',
        8: '',
    })
    .actions(self => {
        let isX = false;

        function toggle(id) {
            if(self[id]) return;
            self[id] = isX ? 'o' : 'x';
            isX = !isX;
        }
        return { toggle };
    });


export default Root;