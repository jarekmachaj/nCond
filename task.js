function Task(name, func, interval, times){
	if (name == null || name == undefined)
		throw "Name can't be empty";

	if (func == null || func == undefined)
		throw "Set function executing";

	this.Name = name;	
	this.Exec = func;

	if (times != null && times != undefined)
		this.MaxRuns = times;

	if (interval != null && interval != undefined)
		this.Interval = interval;

	console.log(this);
}

Task.prototype.CanDoNextRun = function(){
	if (this.Cancelled == true)
		return false;

	if (this.ConditionalTask == true 
		&& this.ConditionMet == true 
		&& this.CancelTaskWhenConditionMet == true){
		this.Stop();
		console.log('Conditions met - stopping');
		return false;
	}

	if (this.Cancelled)
		return false;

	//first run	
	if (this.TimesRun == 0) return true;
	if (this.TimesRun < this.MaxRuns) return true;
	if (this.Repeat == true && this.MaxRuns == 0 && this.Interval > 0) return true;

	return false;
}

Task.prototype.Start = function(){
	this.Started = true;
	if (this.CanDoNextRun() && this.Exec != undefined && this.Exec != null){
		this.IsRunning = true;		
		var task = this;
		this.RepeaterObj = setTimeout(function(){ task.RunTask(task); }, this.Interval);
		this.StopRepeater = function() { clearTimeout(this.RepeaterObj); }
	} else {
		Task.prototype.NextRun = null;
		IsRunning = false;
	}
}

Task.prototype.Stop = function(){
	this.CancelTask();
}

Task.prototype.SetCondition = function(condition){
	this.ConditionalTask = true;
	this.Condition = condition;
}

Task.prototype.CancelTask = function(){
	this.Cancelled = true;
	this.StopRepeater();
	this.NextRun = null;
	this.IsExecuting = false;
}

Task.prototype.CheckCondition = function(){	
	if (this.ConditionalTask == false)
		return true;		

	if (this.ConditionMet == true)
		return true;
	
	var conditionResult = this.Condition();
	console.log("chcecking condition for task '" + this.Name + "', result: " + conditionResult);
	if (conditionResult == true){
		this.ConditionMet = true;
		return true;
	}

	return false;
}

Task.prototype.RunTask = function(task){
	var date = Date.now();
	task.LastRun =  date;
	
	if (task.CheckCondition() == true)
	{
		if (task.TimesRun == 0)
			task.FirstRunDate = date; 
		task.TimesRun += 1;

		//----- Task Execution -----
		task.IsExecuting = true;
		//console.log(this.Exec);
		task.Exec();
		task.IsExecuting = false;
	    //----- Task Execution -----

	    if (task.CanDoNextRun())
	    	task.NextRun = Date.now() + task.Interval;
	}

	task.Start();
}

Task.prototype.Started = false;
Task.prototype.Name = "unnamed task";
Task.prototype.Interval = 0;
Task.prototype.IsExecuting = false;
Task.prototype.RepeaterObj = null;
Task.prototype.LastRun = null;
Task.prototype.NextRun = null;
Task.prototype.FirstRunDate = null;
Task.prototype.TimesRun = 0;
Task.prototype.MaxRuns = 0;
Task.prototype.Repeat = false;
Task.prototype.Cancelled = false;
Task.prototype.Exec = null;
Task.prototype.StopRepeater = null;
Task.prototype.IsRunning = false;
Task.prototype.Condition = null;
Task.prototype.ConditionalTask = false;
Task.prototype.ConditionMet = false;
Task.prototype.CancelTaskWhenConditionMet = true;

module.exports = Task;