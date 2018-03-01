var http = require("http");
var cheerio = require("cheerio");
var url="http://sports.sina.com.cn/nba/1.shtml";

function fn(callback) {
    http.get(url,function (res) {
        var html="";
        res.setEncoding("utf-8");
        res.on("data",function (chunk) {
            html = html+chunk;
        });

        res.on("end",function () {
            var $ = cheerio.load(html);
            var urlArr=[];
            $("#right a").each(function(){
                urlArr.push($(this).attr("href"));
            });
            callback(urlArr);
        });
    });
}

module.exports = fn;