const { STATUS_CODES } = require("http");

const VALID_STATUSES = ["todo", "in-progress", "done"];

function getNextId(tasks) {
  let maxId = 0;
  for (let task of tasks) {
    if (task.id > maxId) {
      maxId = task.id;
    }
  }
  return maxId + 1;
}

function findTaskById(tasks, id) {
  for (let task of tasks) {
    if (task.id === id) {
      return task;
    }
  }
  return null;
}

function touch(task) {
  task.updatedAt = new Date().toISOString();
}

function createTask(tasks, description) {
  const task = {
    id: getNextId(tasks),
    description,
    status: "todo",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  tasks.push(task);
}

function updateTask(tasks, id, newDescription) {
  const task = findTaskById(tasks, id);
  if (!task) return false;

  task.description = newDescription;
  touch(task);
  return true;
}

function markTask(tasks, id, status) {
  if(!VALID_STATUSES.includes(status)){
    return false;
  }
  const task = findTaskById(tasks, id);
  if (!task) return false;

  task.status = status;
  touch(task);
  return true;
}

function deleteTask(tasks, id) {
  const index = tasks.findIndex(t => t.id === id);
  if (index === -1) return false;

  tasks.splice(index, 1);
  return true;
}
function requireArg(value, message) {
  if (!value) {
    console.error(message);
    process.exit(1);
  }
}

module.exports = {
  createTask,
  updateTask,
  markTask,
  deleteTask,
  requireArg
};
