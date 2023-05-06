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

  /**

@class
@classdesc Represents a component that handles the display of todo data.
@param {TodoService} todoService - An instance of the TodoService class used to manage todo data.
/
constructor(todoService: TodoService) {
**/

  constructor(private todoService: TodoService) {
    this.status = [
      { value: '', placeholder: 'all' },
      {
        value: 'active',
        placeholder: 'active',
      },
      { value: 'completed', placeholder: 'completed' },
    ];

    /**

@function ngOnInit
@memberof TodoComponent
@description Angular lifecycle hook that initializes the component and retrieves a list of todo items.
@returns {void}
**/
  }
  ngOnInit(): void {
    this.todoService.getTodos().subscribe((todos) => {
      this.todos = todos;
    });
  }

  /**
   * Deletes a todo item and removes it from the component's list of todos.
   *
   * @param {TodoTypes} todo - The todo item to be deleted.
   *
   * @returns {void}
   */

  deleteTodo(todo: TodoTypes) {
    this.todoService
      .deleteTodo(todo)
      .subscribe(
        () => (this.todos = this.todos.filter((t) => t.id !== todo.id))
      );
  }

  /**
   * Adds a new todo item to the component's list of todos.
   *
   * @param {TodoTypes} todo - The new todo item to be added.
   *
   * @returns {void}
   */

  addTodo(todo: TodoTypes) {
    this.todoService.addTodo(todo).subscribe((todo) => this.todos.push(todo));
  }

  todos: TodoTypes[] = [];

  /**
   * Sorts the component's list of items based on the specified header name.
   *
   * @param {string} headerName - The name of the header to sort by.
   *
   * @returns {void}
   */

  sort(headerName: string) {
    this.isNotReverseOrder = !this.isNotReverseOrder;
    this.orderHeader = headerName;
  }

  /**
   * Resets the search filter on the component's list of items.
   *
   * @returns {void}
   */

  resetFilter() {
    this.searchInput.status = '';
    this.searchInput.date = '';
  }
}
