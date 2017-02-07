let request = require('request');
class Probe {
    constructor(name, configs){
        this.name = name;
        this.value = null;
        this.configs = configs;
    }

    set(value){
        this.value = value;
        this.notify();
    }

    onStart(cb){
        this.startL = cb;
    }

     onClose(cb){
        this.closeL = cb;
    }

    start(conf){
        this.configs = conf;
        this.startL();
    }

    stop(){
        this.closeL()
    }
    

    notify(){
        let data = {
            createdAt: Date.now(),
            port: this.configs.port,
            name: this.configs.name,
        }
        data[this.name] = this.value;
        request({
            uri: this.configs.backend,
            json: data
        })

    }
}

module.exports = Probe;
