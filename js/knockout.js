function todoModel(todoText){
    var self=this;
    self.todoText=todoText;
    self.isActive = ko.observable(true);
    self.isComplete = ko.observable(false);
    self.isVisible= ko.observable(false);
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
            self.todoList.push(new todoModel(inputTodoText.value));
            inputTodoText.value='';
        }
    }
    self.inputVisible=ko.observable(true);
    self.goToMenu = function(menu){
        
        self.chosenMenuId(menu); 
        if(menu=='All'){
            self.todoList().forEach(function (todo) {
                todo.isVisible(true);
        })
        }
        if(menu=='Active'){
            self.inputVisible(false);
            console.log("Active")
            self.todoList().forEach(function (todo) {
                todo.isVisible(todo.isActive(true));
            });
        }
        if(menu=='Completed'){
            self.inputVisible(false);
            self.todoList().forEach(function (todo) {
                todo.isVisible(todo.isComplete(true));
            });
        }
    }
    self.goToMenu('All');
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