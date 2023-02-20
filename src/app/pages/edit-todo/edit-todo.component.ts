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
  constructor(
    private router: ActivatedRoute,
    private todoService: TodoService
  ) {}

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

  editTodoHandler() {
    this.todoService
      .updateTodo(this.router.snapshot.params.id, this.editTodo.value)
      .subscribe();

    this.alert = true;
  }

  closeAlert() {
    this.alert = false;
  }
}
