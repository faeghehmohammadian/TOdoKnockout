
function todoModel(todoText,CompleteStatus){
    var self=this;
    self.todoText=todoText;
    self.isActive = ko.observable(true);
    self.isComplete = ko.observable(CompleteStatus);
    self.isVisible= ko.observable(true);
}
const inputTodoText=document.querySelector('.inputTodoText');
function todoappViewModel(){
    var self=this;
    self.menus=['All','Active','Completed'];
    self.chosenMenuId = ko.observable();
    self.chosenMenuData = ko.observable();
    self.todoList=ko.observableArray([]);
    self.addFunction=function(){
        if(inputTodoText.value){
            self.todoList.push(new todoModel(inputTodoText.value,false));
            addToLocalStorageArray(inputTodoText.value,false)
            inputTodoText.value='';
            
        }

    }
    
    self.inputVisible=ko.observable(true);
    self.goToMenu = function(menu){
        
        self.chosenMenuId(menu); 
        if(menu=='All'){
            self.inputVisible(true);
            self.todoList().forEach(function (todo) {
                todo.isVisible(true);
        })
        }
        if(menu=='Active'){
            self.inputVisible(false);
            self.todoList().forEach(function (todo) {
                todo.isVisible(todo.isComplete()==false);
            });
        }
        if(menu=='Completed'){
            self.inputVisible(false);
            self.todoList().forEach(function (todo) {
                todo.isVisible(todo.isComplete()==true);
            });
        }
    }
    self.goToMenu('All');

    self.deleteTodo=function(todo){
        localStorage.removeItem(todo.todoText);
        self.todoList.remove(todo);
    }
    self.editable=function(todo){
        this.isActive(false);
        localStorage.removeItem(todo.todoText);
    }
    self.saveItem=function(todo){
        this.isActive(true);
        localStorage.setItem(todo.todoText,todo.isComplete())
    }
    self.makeComplete=function(){
        this.isComplete(true);
        self.todoList().forEach(function (todo) {
            if(todo.isComplete()==true){
                const tasks = JSON.parse(localStorage.getItem(taskKey)) || [];
                // const found = tasks.find((task) => {
                //     return task. == elemntId;
                // });
                localStorage.setItem("o",todo.isComplete())
            };
        });
    }
    self.Reloadevent =document.addEventListener('DOMContentLoaded', function(e){
        e.preventDefault();
        let tasks=[];
        console.log("reload event")
            // let task=localStorage.getItem("todo");
            // tasks.push("todo",task);
            // console.log(tasks)
            // self.todoList.push(new todoModel(localStorage.key(i),JSON.parse(tasks[1])))
            // tasks.pop(localStorage.key(i))
            // tasks.pop(task)
        
        
    })
    self.downloadfunction=function(){
        const response=fetch("http://localhost:3000/download")
        .then(res=>res.json())
        .catch(err=>console.warn(err))
        console.log(response.name)
    } 
    self.uploadfunction=function(){
        const data={name:"reza"};
        const response= fetch("http://localhost:3000/upload",{
        method:"POST",
        body:JSON.stringify(data),
        headers:{
            "content-type":"application/json; charset=UTF-8",
        },
        })
        .then(res=>res.json())
        .then(err=>console.log(err));
        console.log(response);
    }
}
ko.applyBindings(new todoappViewModel());

var addToLocalStorageArray = function (todo, value) {
    var id;
    var tasks;
    if(localStorage.getItem('todo')=== null){
        id=1;
        tasks='[]';
        console.log("miad if")
    }
    else{
        id=(JSON.parse(localStorage.getItem('todo'))).length;
        tasks=localStorage.getItem('todo');
        console.log("miad else")
    }
        const todos=JSON.parse(tasks)
        console.log(todos)
        todos.push(
            {
                id:id,
                todo:todo,
                completed:value
            }
        );
        console.log(todos)
        localStorage.setItem("todo",JSON.stringify(todos));
        console.log(tasks)
    // }
};


