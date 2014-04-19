var Task = require('./task')

function TaskScheduler(){
	this.Tasks = [];
}

TaskScheduler.prototype.AddTask = function(task){
	if (this.Tasks.filter(function(item){ item.Name == task.name}).length > 0)
		throw 'Task with such name already exists';

	this.Tasks.push(task);
}

TaskScheduler.prototype.GetRunningTasks = function(){
	return this.Tasks.filter(function(task){
		return task.IsRunning == true;
	});
}

TaskScheduler.prototype.GetTask = function(criterion){
	return this.Tasks.filter(criterion);
}

TaskScheduler.prototype.StartTasks = function(){
	//console.log(this.Tasks.length);
	for (var i = 0; i < this.Tasks.length; i++) {
		var task = this.Tasks[i]; 
		if (task.Started == false) 
			task.Start();
	}
}

module.exports = TaskScheduler;