import {types} from "mobx-state-tree";

const winnerCases = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

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
        8: ''
    })
    .actions(self => {
        let isX = false;

        function toggle(id) {
            if(self[id]) return;
            if(self.isWinner) return;
            self[id] = isX ? 'o' : 'x';
            isX = !isX;
        }
        return { toggle };
    })
    .views(self => ({
        get isWinner() {
            let result = false;
            Object.values(winnerCases)
                .some(winCase => {
                    const [first, second, third] = winCase;
                    const isWinner = self[first] === self[second] && self[second] === self[third];
                    if(isWinner) result = self[third];
                    return isWinner;
            });
            return result;
        }
    }));


export default Root;