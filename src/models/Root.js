import {types, flow, getEnv} from "mobx-state-tree";


const Root = types
    .model({
        moves: types.map(types.string)
    })
    .actions(self => {
        const { db } = getEnv(self);

        const fetchMoves = flow(function * (callback) {
            const dbSnapshot = yield db.ref('moves').once('value');
            const dbState = dbSnapshot.val();

            if(dbState) {
                for(let id in Object.keys(dbState)) {
                    self.moves.set(id, dbState[id]);
                }
            }
            else yield resetGame();
            callback();
        });

        const toggle = flow(function * (id) {
            if(self.moves.get(id)) return;
            if(self.isWinner || self.isAllFilled) return;

            const newMoves = self.newMoves(id);
            const error = yield postMoves(newMoves);

            if(error) alert('Bad connection! Try again.');
            else {
                self.moves.set(id, self.nextMove);
            }
        });

        const resetGame = flow(function * () {
            const clearMoveState = Array(9).fill('');
            const error = yield postMoves(clearMoveState);
            if(error) alert('Bad connection! Try again.');
            else {
                for(let id in Object.keys(clearMoveState)) {
                    self.moves.set(id, clearMoveState[id]);
                }
            }
        });

        const postMoves = (newMoves) => {
            // for server error mock:
            // return new Promise(resolve => setTimeout(()=> resolve('some error'), 1000));
            return db.ref('moves').set(newMoves)
        };



        return { toggle, fetchMoves, resetGame };
    })
    .views(self => ({
        get nextMove() {
            const xCount = [...self.moves.values()].filter(move => move === 'x').length;
            const oCount = [...self.moves.values()].filter(move => move === 'o').length;
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
            return [...self.moves.values()].filter(move => move).length === 9;
        },
        get winnerName() {
            if(self.isWinner && !self.isAllFilled) {
                const looser = self.nextMove;
                return looser === 'x' ? 'NOUGHT' : 'CROSS';
            }
            if(self.isAllFilled) return 'EVEN';
        },
        newMoves(id) {
            const curMoves = [...self.moves.values()];
            curMoves[id] = self.nextMove;
            const newMoves = curMoves;
            return newMoves;
        }
    }));

export default Root;