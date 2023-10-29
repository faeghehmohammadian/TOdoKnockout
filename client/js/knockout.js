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
        //localStorage.removeItem(todo.todoText);
        self.todoList.remove(todo);
        const tasks = JSON.parse(localStorage.getItem("todo"));
        const Objindex = tasks.findIndex(obj =>(obj.todo == todo.todoText));
        tasks.splice(Objindex, 1);
        localStorage.setItem("todo",JSON.stringify(tasks));
        console.log(JSON.parse(localStorage.getItem('todo')).length)
    }
    self.editable=function(todo){
        this.isActive(false);
        // localStorage.removeItem(todo.todoText);
    }
    self.saveItem=function(todo){
        this.isActive(true);
        //localStorage.setItem(todo.todoText,todo.isComplete())
        console.log(todo)
        const tasks = JSON.parse(localStorage.getItem("todo"));
        const objIndex = tasks.findIndex(obj =>(obj.todo == todo.todoText));
        console.log(typeof(todo.todoText))
        console.log(tasks[objIndex].todo)
        tasks[objIndex].todo = JSON.stringify("chengr");
        localStorage.setItem("todo",JSON.stringify(tasks));
    }
    self.makeComplete=function(){
        this.isComplete(true);
        self.todoList().forEach(function (todo) {
            if(todo.isComplete()==true){
                const tasks = JSON.parse(localStorage.getItem("todo"));
                tasks.forEach((task)=>{
                    if(task.todo == todo.todoText){
                        objIndex = tasks.findIndex(obj =>(obj.todo == todo.todoText));
                        tasks[objIndex].completed = true;
                        localStorage.setItem("todo",JSON.stringify(tasks));

                    }
                })
            };
        });
    }
    self.Reloadevent =document.addEventListener('DOMContentLoaded', function(e){
        e.preventDefault();
        const tasks=JSON.parse(localStorage.getItem('todo') || '[]');
        if(localStorage.getItem('todo') == '{}'){
            console.log("az inja")
        } else{
        tasks.forEach((el)=>{
            self.todoList.push(new todoModel(el.todo,el.completed))

        })       
    } 
    })
    self.downloadfunction=function(){
        const response=fetch("http://localhost:3000/download")
        .then(res => res.json())
        .then((json) => json.forEach((el)=>{
            self.todoList.push(new todoModel(el.todo,el.completed))
            localStorage.setItem("todo",JSON.stringify(json));
        })  
        )
        .catch(err=>console.warn(err))
        
    }
        //localStorage.setItem("todo",JSON.stringify(response));
    self.uploadfunction=function(){
        const data=JSON.parse(localStorage.getItem('todo') || '[]')
        const response= fetch("http://localhost:3000/upload",{
        method:"POST",
        body:JSON.stringify(data),
        headers:{
            "content-type":"application/json; charset=UTF-8",
        },
        })
        .then(res=>res.json())
        .then(err=>console.warn(err));
        console.log(response);
    }
}
ko.applyBindings(new todoappViewModel());

var addToLocalStorageArray = function (todo, value) {
    var id;
    var tasks;
    if(localStorage.getItem('todo')=== null || localStorage.getItem('todo') == '{}'){
        id=1;
        tasks='[]';
    }
    else{
        id=(JSON.parse(localStorage.getItem('todo'))).length;
        tasks=localStorage.getItem('todo');
    }
        const todos=JSON.parse(tasks)
        todos.push(
            {
                id:id,
                todo:todo,
                completed:value
            }
        );
        localStorage.setItem("todo",JSON.stringify(todos));
    // }
};


