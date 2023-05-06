import { Injectable } from '@angular/core';
import { TodoTypes } from '../../interfaces/TodoInterfaces';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

/**
 * HTTP options to be used for sending JSON data.
 *
 * @type {Object}
 * @property {Object} headers - The headers to include in the request.
 * @property {string} headers.Content-Type - The content type of the request body.
 */

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private apiUrl = 'http://localhost:5000/todos';

  /**
   * Creates an instance of the service and injects dependencies.
   *
   * @constructor
   * @param {HttpClient} http - The Angular HTTP client service for making requests.
   */

  constructor(private http: HttpClient) {}

  /**
   * Fetches all todo items from the API.
   *
   * @returns {Observable<TodoTypes[]>} An observable of an array of todo items.
   */

  getTodos(): Observable<TodoTypes[]> {
    return this.http.get<TodoTypes[]>(this.apiUrl);
  }

  /**
   * Deletes a todo item from the API.
   *
   * @param {TodoTypes} todo - The todo item to delete.
   * @returns {Observable<TodoTypes>} An observable of the deleted todo item.
   */

  deleteTodo(todo: TodoTypes) {
    const url = `${this.apiUrl}/${todo.id}`;
    return this.http.delete<TodoTypes>(url);
  }

  /**
   * Adds a new todo item to the API.
   *
   * @param {TodoTypes} todo - The todo item to add.
   * @returns {Observable<TodoTypes>} An observable of the added todo item.
   */

  addTodo(todo: TodoTypes): Observable<TodoTypes> {
    return this.http.post<TodoTypes>(this.apiUrl, todo, httpOptions);
  }

  /**
   * Retrieves a single todo item from the API based on its ID.
   *
   * @param {number} id - The ID of the todo item to retrieve.
   * @returns {Observable<any>} An observable of the retrieved todo item.
   */

  getCurrentTodo(id: number) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  /**
   * Updates a todo item in the API based on its ID.
   *
   * @param {number} id - The ID of the todo item to update.
   * @param {any} data - The updated data to use for the todo item.
   * @returns {Observable<any>} An observable of the updated todo item.
   */

  updateTodo(id: number, data: any) {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }
}
