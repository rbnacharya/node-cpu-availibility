let e = require('./e');
let config = require('./config');
require('./monitor');
module.exports.start = (config) => {
    if(!config.name){
        throw new Error('name cannot be empty')
    }
    let port = config.port || process.env.PORT;
    let c = config;
    c.port = port;
    c.name = config.name;
    e.emit('start', c);
    return port;
}

if (require.main === module) {
    let argv = process.argv

    let name = argv[2]
    let port = argv[3]

    if(!name){
        throw new Error('name cannot be empty')
    }
    let c = config;
    c.port = port;
    c.name = name;
    e.emit('start', c);
} 