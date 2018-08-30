import { TodoService } from './shared/todo.service';
import { Component, OnInit } from '@angular/core';
import { element } from '@angular/core/src/render3/instructions';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
  providers : [TodoService]
})
export class TodoComponent implements OnInit {
toDoList : any[];
  constructor(private todoService : TodoService) { }

  ngOnInit() {
    this.todoService.getToDoList().snapshotChanges()
    .subscribe(
      item => {
        this.toDoList =[];
        item.forEach(element => {
          var x = element.payload.toJSON();
          x["$key"] = element.key;
          this.toDoList.push(x); 
        })

        //sort array 
        this.toDoList.sort((a,b) => {
          return a.isChecked - b.isChecked;
        })
      });
    }
  
    onAddItem(itemTitle){
      this.todoService.addTitle(itemTitle.value);
      itemTitle.value = null;
    }

    alterCheck($key: string,isChecked){
      this.todoService.checkOrUncheckTitle($key, !isChecked);
    }

    onDelete($key : string){
      this.todoService.removeTitle($key);
    }

}
