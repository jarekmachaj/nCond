var Task = require('./task');
var util = require('util');
var request = require('request');
var cheerio = require('cheerio');

class WebTask extends Task {
   constructor(name, func, interval, times){
	   super(name, func, interval, times);
	}

	SetWebCondition(url, selector, expectedValue){ }
}
module.exports = WebTask;
