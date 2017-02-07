const bus = require('./bus');

bus.register('cpu', {
    gen: require('./cpu'),
})