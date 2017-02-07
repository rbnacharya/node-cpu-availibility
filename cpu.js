let os = require("os");

module.exports = (metric, conf) => {

    var metrics = {};
    let to 

    function refreshMetrics(interval) {

        function cpuAverage() {

            var totalIdle = 0, totalTick = 0;
            var cpus = os.cpus();

            for(var i = 0, len = cpus.length; i < len; i++) {
            var cpu = cpus[i];
            for(type in cpu.times) {
                totalTick += cpu.times[type];
            }
            totalIdle += cpu.times.idle;
            }

            return {idle: totalIdle / cpus.length,  total: totalTick / cpus.length};
        }

        var startMeasure = cpuAverage();

        setTimeout(function() {

            var endMeasure = cpuAverage();

            var idleDifference = endMeasure.idle - startMeasure.idle;
            var totalDifference = endMeasure.total - startMeasure.total;

            var percentageCPU = (10000 - Math.round(10000 * idleDifference / totalDifference)) / 100;

            metric.set(percentageCPU);
            to = setTimeout(function() { refreshMetrics(interval); }, interval * 1000);
        }, 100);
    }
    metric.onStart(() => {
        refreshMetrics(conf.interval);
    })

    metric.onClose(() => {
        clearTimeout(to)
    })

}