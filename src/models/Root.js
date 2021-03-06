import {types, flow, getEnv} from "mobx-state-tree";


const Root = types
    .model({
        moves: types.map(types.string)
    })
    .actions(self => {
        const { db } = getEnv(self);

        const afterCreate = ()=> {
            self.initStateFetch();
        };

        const initStateFetch = flow(function * () {
            const dbSnapshot = yield db.ref('moves').once('value');
            const dbState = dbSnapshot.val();
            self.moves = dbState && dbState.length === 9 ?
                {...dbState}
                :
                {...Array(9).fill('')};
        });

        const toggle = flow(function * (id) {
            if(self.moves.get(id)) return;
            if(self.isWinner || self.isAllFilled) return;

            const newMove = self.newMove;
            const newMovesState = self.getNewMoveState(id, newMove);

            const error = yield postMoves(newMovesState);

            if(error) alert('Sending Error! Your game is offline now!');
            self.moves.set(id, newMove)
        });

        const resetGame = flow(function * () {
            const cleanMoveState = Array(9).fill('');
            const error = yield postMoves(cleanMoveState);
            if(error) alert('Sending Error! Your game is offline now!');
            self.moves.forEach((val, key)=> self.moves.set(key, ''));
        });

        const postMoves = (newMovesState) => {
            // mock server error
            // return new Promise(resolve => setTimeout(()=> resolve('some error'), 1000));
            return db.ref('moves').set(newMovesState)
        };

        return { toggle, initStateFetch, resetGame, afterCreate };
    })
    .views(self => ({
        get movesStateJson() {
            return [...self.moves.values()];
        },
        get newMove() {
            const xCount = self.movesStateJson.filter(move => move === 'x').length;
            const oCount = self.movesStateJson.filter(move => move === 'o').length;
            return xCount > oCount ? 'o' : 'x';
        },
        get isWinner() {
            return getEnv(self).winnerCases.some(winCase => {
                const [first, second, third] = winCase;
                return self.moves.get(first) &&
                    self.moves.get(first) === self.moves.get(second) &&
                    self.moves.get(first) === self.moves.get(third);
            });
        },
        get isAllFilled() {
            return self.movesStateJson.filter(move => move).length === 9;
        },
        get winnerName() {
            if(self.isWinner && !self.isAllFilled) {
                const looser = self.newMove;
                return looser === 'x' ? 'NOUGHT' : 'CROSS';
            }
            if(self.isAllFilled) return 'EVEN';
        },
        getNewMoveState(id, newMove) {
            const curState = self.movesStateJson;
            curState[id] = newMove;
            return curState;
        }
    }));

export default Root;