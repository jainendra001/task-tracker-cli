const { loadTasks, saveTasks } = require("./storage");
const {
  createTask,
  updateTask,
  markTask,
  deleteTask,
  requireArg
} = require("./taskService");

const command = process.argv[2];
const arg1 = process.argv[3];
const arg2 = process.argv[4];

let tasks = loadTasks();

if (command === "add") {
  requireArg(arg1,"Description is needed!!")
  createTask(tasks, arg1);
  saveTasks(tasks);
  console.log("Task added");
}

if (command === "update") {
  const success = updateTask(tasks, parseInt(arg1), arg2);
  if (!success) {
    console.log("Task not found");
  }
  saveTasks(tasks);
}

if (command === "mark-done") {
  markTask(tasks, parseInt(arg1), "done");
  saveTasks(tasks);
}

if (command === "mark-in-progress") {
  markTask(tasks, parseInt(arg1), "in-progress");
  saveTasks(tasks);
}

if (command === "delete") {
  deleteTask(tasks, parseInt(arg1));
  saveTasks(tasks);
}

if (command === "list") {
  const filter = arg1;
  const filteredTasks = filter
    ? tasks.filter(t => t.status === filter)
    : tasks;

  for (let task of filteredTasks) {
    console.log(
      `${task.id}. ${task.description} [${task.status}]`
    );
  }
}

else{

}
