import { TodoTypes } from '../../../interfaces/TodoInterfaces';
import { Component } from '@angular/core';
import { TodoService } from 'src/app/services/todo.service';

interface SearchInputTypes {
  date: string;
  status: string;
}

interface StatusTypes {
  value: string;
  placeholder: string;
}

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css'],
})
export class TodosComponent {
  orderHeader: string = '';
  isNotReverseOrder: boolean = true;
  searchInput: SearchInputTypes = {
    date: '',
    status: '',
  };

  status: StatusTypes[];

  constructor(private todoService: TodoService) {
    this.status = [
      { value: '', placeholder: 'all' },
      {
        value: 'active',
        placeholder: 'active',
      },
      { value: 'completed', placeholder: 'completed' },
    ];
  }
  ngOnInit(): void {
    this.todoService.getTodos().subscribe((todos) => {
      this.todos = todos;
    });
  }

  deleteTodo(todo: TodoTypes) {
    this.todoService
      .deleteTodo(todo)
      .subscribe(
        () => (this.todos = this.todos.filter((t) => t.id !== todo.id))
      );
  }

  addTodo(todo: TodoTypes) {
    this.todoService.addTodo(todo).subscribe((todo) => this.todos.push(todo));
  }

  todos: TodoTypes[] = [];

  sort(headerName: string) {
    this.isNotReverseOrder = !this.isNotReverseOrder;
    this.orderHeader = headerName;
  }

  resetFilter() {
    this.searchInput.status = '';
    this.searchInput.date = '';
  }
}
