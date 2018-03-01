var http = require("http");
var data = require("./getNewLink");
var cheerio = require("cheerio");
var fs = require("fs");

function fn(callback) {
    data(function (dataArr) {
        dataArr.forEach (function (url,index) {
            http.get(url,function (res) {
                var html="";
                res.setEncoding("utf-8");
                res.on("data",function (chunk) {
                    html = html+chunk;
                });

                res.on("end",function () {
                    var $ = cheerio.load(html);
                    if($("#artibody")[0]){
                        var content = $("#artibody").html();
                        fs.writeFile(`./public/news/${index}.html`,content,{flag:"a"},function(err){
                            if(err){
                                throw err
                            };
                        });
                    }
                });
            }).on("error",function(e){
                console.log('错误：'+e.message);
            });
        });
        callback(true);
    });
}
module.exports = fn;