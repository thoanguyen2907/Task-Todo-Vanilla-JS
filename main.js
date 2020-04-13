//DEFINE UI VARS 
let form = document.querySelector('#task-form')
let taskList = document.querySelector('.collection'); 
let clearBtn = document.querySelector('.clear-tasks');
let filter = document.querySelector('#filter')
let taskInput = document.querySelector('#task')
//load all evetns listeners; 
loadEventListeners();
//load all evetns listeners; 
function loadEventListeners(){
    //DOM load event
    document.addEventListener('DOMContentLoaded',getTasks); 
    form.addEventListener('submit',addTask);
    //remove task event 
    taskList.addEventListener('click',removeTask);
    //clear tasks eventt 
    clearBtn.addEventListener('click',clearTasks)
    //Filter tasks 
    filter.addEventListener('keyup',filterTask)
}
 //Get Tasks from LS
 function getTasks(){
    let tasks; 
    if(localStorage.getItem('tasks')===null){
        tasks = []
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }
    tasks.forEach((task)=>{
         //create li el
         let li = document.createElement('li')
         li.className='collection-item';
         //create text 
         li.innerText = task; 
         //create new link element 
         const link = document.createElement('a');
         link.className = 'delete-item secondary-content';
         //add icon html
         link.innerHTML = '<i class="fa fa-remove"></i>';
         //append the link to li 
         li.appendChild(link)
         //append li to ul
      taskList.appendChild(li)
    })
 }   
//Add Task
function addTask(e){
    if(taskInput.value === ''){
        alert('add a task')
    }else {
        //create li el
        let li = document.createElement('li')
        li.className='collection-item';
        //create text 
        li.innerText = taskInput.value; 
        //create new link element 
        const link = document.createElement('a');
        link.className = 'delete-item secondary-content';
        //add icon html
        link.innerHTML = '<i class="fa fa-remove"></i>';
        //append the link to li 
        li.appendChild(link)
        //append li to ul
        taskList.appendChild(li)
        //store in LS
        storeTaskInLocalStorage(taskInput.value); 
        //clear input
        taskInput.value = ''
        }
        e.preventDefault();
}
//Store task
function storeTaskInLocalStorage(task){
    let tasks; 
    if(localStorage.getItem('tasks')===null){
        tasks = []
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }
    tasks.push(task)
    localStorage.setItem('tasks',JSON.stringify(tasks))
}

//remove task
function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item')){
        if(confirm('are you sure')){
            e.target.parentElement.parentElement.remove();
            //remove from LS 
            removeTaskFromLocalStorage(e.target.parentElement.parentElement)
        }
    }
}
//remove from LS
function removeTaskFromLocalStorage(taskItem){
    let tasks; 
    if(localStorage.getItem('tasks')===null){
        tasks = []
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }
    tasks.forEach((task,index)=>{
        if(taskItem.textContent === task){
            tasks.splice(index,1)
        }
    })
    localStorage.setItem('tasks',JSON.stringify(tasks))
}


//clear tasks
function clearTasks(){
   while(taskList.firstChild){
     taskList.removeChild(taskList.firstChild)
   }
   //Clear From LS 
   clearTasksFromLocalStorage(); 
}
//Clear Tasks from LS 
function clearTasksFromLocalStorage(){
    localStorage.clear();
}
//filter tasks 
function filterTask(e){
let filter_text = e.target.value.toLowerCase();
let liTask = document.querySelectorAll('.collection-item')
liTask.forEach((liElement)=>{
let item = liElement.firstChild.textContent;
if(item.toLowerCase().indexOf(filter_text)!==-1){
    liElement.style.display = 'block'
} else {
    liElement.style.display = 'none'
}
})
}
let filter_text = e.target.value.toLowerCase(); 
let liTask = document.querySelectorAll('.collection-item'); 
liTask.forEach((liElement)=>{
    let item = liElement.firstChild.textContent;
    if(item.toLowerCase().indexOf(filter_text)!==-1){
        liElement.style.display='block'
    } else {
        liElement.style.display = 'none'
    }

})
