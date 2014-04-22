var Task = require('./task');
var util = require('util');
var request = require('request');
var cheerio = require('cheerio');

function WebTask (name, func, interval, times){
	Task.apply(this, arguments);
}
util.inherits(WebTask, Task)

WebTask.prototype.SetWebCondition = function(url, selector, expectedValue){

}

module.exports = WebTask;
