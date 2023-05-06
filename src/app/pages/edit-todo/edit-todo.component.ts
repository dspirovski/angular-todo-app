import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-edit-todo',
  templateUrl: './edit-todo.component.html',
  styleUrls: ['./edit-todo.component.css'],
})
export class EditTodoComponent {
  alert: boolean = false;

  editTodo: any = new FormGroup({
    name: new FormControl(''),
    date: new FormControl(''),
    status: new FormControl('active'),
  });

  /**
   * Creates an instance of the component and injects dependencies.
   *
   * @constructor
   * @param {ActivatedRoute} router - The Angular router service for the component.
   * @param {TodoService} todoService - The custom service for handling todo data.
   */

  constructor(
    private router: ActivatedRoute,
    private todoService: TodoService
  ) {}

  /**
   * Initializes the component with the current todo item from the service.
   *
   * @returns {void}
   */

  ngOnInit(): void {
    this.todoService
      .getCurrentTodo(this.router.snapshot.params.id)
      .subscribe((res: any) => {
        this.editTodo = new FormGroup({
          name: new FormControl(res['name']),
          date: new FormControl(res['date']),
          status: new FormControl(res['status']),
        });
      });
  }

  /**
   * Submits the edited todo item to the service for updating.
   *
   * @returns {void}
   */

  editTodoHandler() {
    this.todoService
      .updateTodo(this.router.snapshot.params.id, this.editTodo.value)
      .subscribe();

    this.alert = true;
  }

  /**
   * Closes the alert box displayed by the component.
   *
   * @returns {void}
   */

  closeAlert() {
    this.alert = false;
  }
}
