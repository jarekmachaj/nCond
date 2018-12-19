var Task = require('./task')

class TaskScheduler {
	constructor(){
		this.Tasks = [];
	}	

	AddTask(task) {
		if (this.Tasks.filter(function(item){ item.Name == task.name}).length > 0)
			throw 'Task with such name already exists';
	
		this.Tasks.push(task);
	}

	GetRunningTasks() {
		return this.Tasks.filter(function(task){
			return task.IsRunning == true;
		});
	}

	GetTask(criterion){
		return this.Tasks.filter(criterion);
	}

	StartTasks(){
		for (var i = 0; i < this.Tasks.length; i++) {
			var task = this.Tasks[i]; 
			if (task.Started == false) 
				task.Start();
		}
	}
}

module.exports = TaskScheduler;