const setting = require('./config');

let Probe = require('./probe');
let e = require('./e');
let register = (name, options) => {
    let metric = new Probe(name);
    options.gen(metric, { interval: setting.interval } );

    e.on('start', (conf) => {
        metric.start(conf);
    })

    e.on('stop', () => {
        metric.stop();
    })
}

module.exports.register = register;