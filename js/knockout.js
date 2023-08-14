function todoModel(todoText){
    var self=this;
    self.todoText=todoText;
    self.isActive = ko.observable(true);
    self.isComplete = ko.observable(false);
    
}
const inputTodoText=document.querySelector('.inputTodoText');

function todoappViewModel(){
    var self=this;
    self.menus=['All','Active','Completed'];
    self.chosenMenuId = ko.observable();
    self.chosenMenuData = ko.observable();
    self.goToFolder = function(menu){
        self.chosenMenuId(menu); 
    }
    self.goToFolder('All');
    console.log(this)
    self.todoList=ko.observableArray([]);
    self.addFunction=function(){
        if(inputTodoText.value){
            self.todoList.push(new todoModel(inputTodoText.value));
            inputTodoText.value='';
        }
    }
    self.deleteTodo=function(todo){
        self.todoList.remove(todo);
    }
    self.editable=function(){
        this.isActive(false);
    }
    self.saveItem=function(){
        this.isActive(true);
    }
    self.makeComplete=function(){
        this.isComplete(true);
    }
    
};

ko.applyBindings(new todoappViewModel());