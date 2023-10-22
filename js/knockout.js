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
            inputTodoText.value='';
        }
        for (let i = 0; i < (this.todoList()).length; i++) {
            addToLocalStorageArray(this.todoList()[i].todoText,this.todoList()[i].isComplete())
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
                localStorage.setItem(todo.todoText,todo.isComplete())
            };
        });
    }
    self.Reload =document.addEventListener('DOMContentLoaded', function(e){
        e.preventDefault();
        let tasks=[];
        for (i = 0; i < localStorage.length; i++) {
            let task=localStorage.getItem(localStorage.key(i));
            tasks.push(localStorage.key(i),task);
            self.todoList.push(new todoModel(localStorage.key(i),JSON.parse(tasks[1])))
            tasks.pop(localStorage.key(i))
            tasks.pop(task)
        }
    })
    self.uploadfunction=function(){
        localStorage.clear();
        const request = new XMLHttpRequest();
        request.open('GET', 'file/data.json');
        request.send();
        request.onload = function () {
            var items = JSON.parse(request.response)
            console.log(items.length)
            for(let i=0;i<items.length;i++){
                localStorage.setItem(items[i].todo,items[i].completed)
                self.todoList.push(new todoModel(localStorage.key(i),localStorage.getItem(localStorage.key(i))))
            }
        }

    }
    self.downloadfunction=function(){
        
    }
};

ko.applyBindings(new todoappViewModel());

var addToLocalStorageArray = function (todo, value) {
    
    var tasks;
	
    if(localStorage.getItem('tasks')=== null){
        tasks=[];
    }
    else{
        tasks=localStorage.getItem('tasks').split(',');
    }
	tasks.push(todo,value);

	localStorage.setItem(todo,value);
    
};


