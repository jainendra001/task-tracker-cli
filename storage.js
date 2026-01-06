const fs=require("fs")

const FILE_NAME='tasks.json'

function loadTasks(){
  try{
    if(!fs.existsSync(FILE_NAME)){
      return [];
    }
    const data=fs.readFileSync(FILE_NAME,"utf-8")
    return JSON.parse(data);
  }catch(err){
    console.error("Failed to load tasks file. It may be corrupted.")
    process.exit(1);
  }
  
}

function saveTasks(tasks){
  const tempFile=FILE_NAME+".tmp";
  fs.writeFileSync(tempFile,JSON.stringify(tasks,null,2));
  fs.renameSync(tempFile, FILE_NAME);
}

module.exports={
  loadTasks,
  saveTasks
}