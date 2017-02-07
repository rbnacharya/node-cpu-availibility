# node-cpu-monitor
Cpu availability of any server using nodejs 

## Usage

### For express application 
````javascript 
let cpuMonitor = require('cpu-monitor')('backend-url');
server.listen(cpuMonitor.start({ port: 8080, name: 'my-test-server'}))
````

### For non-node applications
```sh
$ npm install -g cpu-monitor
$ cpu-monitor [name] [backend-url]
```
