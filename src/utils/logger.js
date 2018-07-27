const logger = (call, next, abort) => {
    switch (call.type) {
        case 'action':
            console.log(`%c ${call.type}`, 'background: green; color: white', call.name);
            break;
        default:
            console.log(`%c ${call.type}`, 'background: black; color: white', call.name);
            break;
    }
    return next(call)
};

export default logger;