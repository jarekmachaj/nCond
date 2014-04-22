var Task = require('./task')
var WebTask = require('./web-task')
var TaskScheduler = require('./task-scheduler')

var t1 = new Task("task1", function() {
	console.log("task1 running :)" + ", times run:" + t1.TimesRun + ", max runs: " + t1.MaxRuns);
}, 5000, 5);

var t2 = new Task("task2", function() {
	console.log("task2 running :)" + ", times run:" + t2.TimesRun + ", max runs: " + t2.MaxRuns);
}, 5000, 5);
t2.SetCondition(function(){return t1.TimesRun > 2;});
t2.CancelTaskWhenConditionMet = false;

var t3 = new WebTask("web-task", function() {
	console.log("task3 is running :)" + ", times run:" + t1.TimesRun + ", max runs: " + t1.MaxRuns);
}, 5000, 5);

var ts = new TaskScheduler();
ts.AddTask(t1);
ts.AddTask(t2);
ts.AddTask(t3);
ts.StartTasks();