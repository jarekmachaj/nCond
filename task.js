class Task {
	constructor(name, func, interval, times){

		this.Started = false;
		this.Name = "unnamed task";
		this.Interval = 0;
		this.IsExecuting = false;
		this.RepeaterObj = null;
		this.LastRun = null;
		this.NextRun = null;
		this.FirstRunDate = null;
		this.TimesRun = 0;
		this.MaxRuns = 0;
		this.Repeat = false;
		this.Cancelled = false;
		this.Exec = null;
		this.StopRepeater = null;
		this.IsRunning = false;
		this.Condition = null;
		this.ConditionalTask = false;
		this.ConditionMet = false;
		this.CancelTaskWhenConditionMet = true;

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

	CanDoNextRun() {
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

	Start() {
		this.Started = true;
		if (this.CanDoNextRun() && this.Exec != undefined && this.Exec != null){
			this.IsRunning = true;		
			var task = this;
			this.RepeaterObj = setTimeout(function(){ task.RunTask(task); }, this.Interval);
			this.StopRepeater = function() { clearTimeout(this.RepeaterObj); }
		} else {
			this.NextRun = null;
			this.IsRunning = false;
		}
	}

	Stop(){
		this.CancelTask();
	}
	
	SetCondition(condition) {
		this.ConditionalTask = true;
		this.Condition = condition;
	}

	CancelTask() {
		this.Cancelled = true;
		this.StopRepeater();
		this.NextRun = null;
		this.IsExecuting = false;
	}

	CheckCondition (){	
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

	RunTask(task) {
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
}

module.exports = Task;