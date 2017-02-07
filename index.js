#!/usr/bin/env node
let e = require('./e');
let config = require('./config');
require('./monitor');
module.exports.start = (cc) => {
    if(!cc.name){
        throw new Error('name cannot be empty')
    }
    let port = config.port || process.env.PORT;
    let c = config;
    c.port = port;
    c.name = cc.name;
    c.backend = cc.backend || c.backend;
    e.emit('start', c);
    return port;
}

if (require.main === module) {
    let argv = process.argv

    let name = argv[2]
    let port = argv[3]
    let backend = argv[4]

    if(!name){
        throw new Error('name cannot be empty')
    }
    let c = config;
    c.port = port;
    c.name = name;
    c.backend = backend || c.backend;
    e.emit('start', c);
} 