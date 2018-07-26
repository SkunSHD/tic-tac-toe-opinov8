import Root from './models/Root';

// firebase request
const dataForInit = Array(9).fill('').map((item, i) => ({
    id: i,
    move: item
}));

const store = Root.create({
    moves: {
        ...dataForInit
    }
});

export default store;