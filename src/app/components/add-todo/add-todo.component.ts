import { Component, Output, EventEmitter, NgModule } from '@angular/core';
import { TodoTypes } from 'src/interfaces/TodoInterfaces';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css'],
})
export class AddTodoComponent {
  @Output() onAddTodo: EventEmitter<TodoTypes> = new EventEmitter();

  name: string;
  date: string;
  status: string = 'active';

  saveButtonDisabled = false;

  submitHandler() {
    if (!this.name || !this.date || !this.status) {
      alert('Please fill the form bellow.');
      return;
    } else {
      alert('Thank you for submiting your data.');
    }

    const newTodo = {
      name: this.name,
      date: this.date,
      status: this.status,
    };

    this.onAddTodo.emit(newTodo);

    this.name = '';
    this.date = '';
    this.status = 'active';
  }
}
