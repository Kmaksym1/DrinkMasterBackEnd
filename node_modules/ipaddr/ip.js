var http = require("http");
var got = require("got");
var exec = require('child_process').exec;

exports.getCurrentIp = function(){
    /**
     * 系统模块
     * @type {Object}
     */
    var os = require('os');
    /**
     * 获得系统的网卡列表
     * @type {Object}
     */
    var ipObj = os.networkInterfaces();
    var result = [];

    for(var i in ipObj) {
        // 获得某个网卡下面的ip列表
        var ipList = ipObj[i];
        for(var j = 0; j < ipList.length; j += 1) {
            // 某个网卡的某个ip
            var ip = ipList[j];
            if(ip.family === 'IPv4') {
                result.push(ip.address);
            }
        }
    }
    return result;
};

async function getAddress(ip, callback) {
    try {
        const data = await got(`http://ip.taobao.com/outGetIpInfo?ip=${ip}&accessKey=alibaba-inc`).json();
        if (data.data) {
            return data.data.country + ' ' + data.data.region + ' ' + data.data.isp;
        } else {
            console.warn('Got error:', data.msg);
            return data.msg;
        }
    } catch (err) {
        console.warn('Got error:', err);
        return 'Unknow';
    }
};

exports.getAddress = getAddress;


var IP_REG = /((?:\d+\.){3}\d+)\s+\(\1\)/;
exports.traceRoute = function (domain) {
    var trace = exec('traceroute ' + domain);

    var seq = Promise.resolve();

    trace.stdout.on('data', function (data) {
        // 220.181.17.90 (220.181.17.90)
        if (IP_REG.test(data)) {
            seq = seq.then(() => {
                return getAddress(RegExp.$1).then((addr) => {
                    data = data.replace(IP_REG, '$1 (' + addr + ')');
                    process.stdout.write(data);
                });
            });
        } else {
            seq = seq.then(() => process.stdout.write(data));
        }
    });
    trace.stderr.on('data', function (data) {
        process.stdout.write(data);
    });
};