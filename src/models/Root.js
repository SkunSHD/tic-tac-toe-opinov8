import {types, flow, getEnv} from "mobx-state-tree";


const Root = types
    .model({
        moves: types.array(types.string)
    })
    .actions(self => {
        const { db } = getEnv(self);

        const toggle = flow(function * (id) {
            if(self.moves[id]) return;
            if(self.isWinner || self.isAllFilled) return;

            const newMoves = self.newMoves(id);
            const error = yield postMoves(newMoves);

            if(error) alert('Bad connection! Try again.');
            else self.moves[id] = self.nextMove;
        });

        const fetchMoves = flow(function * (callback) {
            const dbSnapshot = yield db.ref('moves').once('value');
            const dbState = dbSnapshot.val();
            if(dbState) self.moves = dbState;
            else yield resetGame();
            callback();
        });

        const resetGame = flow(function * () {
            const error = yield postMoves(Array(9).fill(''));
            if(error) alert('Bad connection! Try again.');
            else self.moves = Array(9).fill('');
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
            const xCount = self.moves.filter(move => move === 'x').length;
            const oCount = self.moves.filter(move => move === 'o').length;
            return xCount > oCount ? 'o' : 'x';
        },
        get isWinner() {
            return getEnv(self).winnerCases.some(winCase => {
                const [first, second, third] = winCase;
                return self.moves[first] &&
                    self.moves[first] === self.moves[second] &&
                    self.moves[first] === self.moves[third];
            });
        },
        get isAllFilled() {
            return self.moves.filter(move => move).length === 9;
        },
        get winnerName() {
            if(self.isWinner && !self.isAllFilled) {
                const looser = self.nextMove;
                return looser === 'x' ? 'NOUGHT' : 'CROSS';
            }
            if(self.isAllFilled) return 'EVEN';
        },
        newMoves(id) {
            const curMoves = [...self.moves];
            curMoves[id] = self.nextMove;
            const newMoves = curMoves;
            return newMoves;
        }
    }));

export default Root;