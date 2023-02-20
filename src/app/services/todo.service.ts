import { Injectable } from '@angular/core';
import { TodoTypes } from '../../interfaces/TodoInterfaces';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

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

  constructor(private http: HttpClient) {}

  getTodos(): Observable<TodoTypes[]> {
    return this.http.get<TodoTypes[]>(this.apiUrl);
  }

  deleteTodo(todo: TodoTypes) {
    const url = `${this.apiUrl}/${todo.id}`;
    return this.http.delete<TodoTypes>(url);
  }

  addTodo(todo: TodoTypes): Observable<TodoTypes> {
    return this.http.post<TodoTypes>(this.apiUrl, todo, httpOptions);
  }

  getCurrentTodo(id: number) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  updateTodo(id: number, data: any) {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }
}
