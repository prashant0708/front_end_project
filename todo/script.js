const todoInput = document.getElementById("todo-input");
const addTaskButton = document.getElementById("add-task-btn");
const todoList = document.getElementById("todo-list");

let tasks =  JSON.parse(localStorage.getItem("tasks"))|| []; // Load saved tasks

// Load Saved Tasks on Page Load
tasks.forEach(RenderTask);

 

addTaskButton.addEventListener("click", () => {
    const taskText = todoInput.value.trim()
    if (taskText === "") {
        return
        
    }
    else {
        const newTask = {
            id : Date.now(),
            text: taskText,
            completed:false,
        };
        tasks.push(newTask)
        saveTask()
        RenderTask(newTask)
        todoInput.value = ""; //clearing input
        console.log(tasks);
    };
});

// what ever the task , I am passing it must be set to the local storage

function saveTask(){
    localStorage.setItem("tasks",JSON.stringify(tasks));
}

// render the task to the html page

function RenderTask(task){
    const li = document.createElement("li");
    li.setAttribute('data-id',task.id);
    if (task.completed) 
        li.classList.add("completed") // this will execute when if condition is true
        li.innerHTML = ` <span>${task.text}</span>
        <button>Delete</button>`;
        

        // below code to add strike on the task
    li.addEventListener("click",(e) => {

        if(e.target.tagName === "BUTTON") return; // when click on delete do nothing
        task.completed = ! task.completed; // when task is mark completed marks as not completed and vice versa for toggling
        // fist click mark as complete , second click mark as not complete.
        li.classList.toggle("completed");
        saveTask();
    })


    li.querySelector("button").addEventListener("click",(e) => {
        e.stopPropagation(); // Prevents the click from affecting the parent <li>
        tasks = tasks.filter((t)=> t.id !== task.id); // t.id is all the task id from the array and task.id which is comming from respective delete 
        li.remove();
        saveTask();})
        

    todoList.appendChild(li);
}