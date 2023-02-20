import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { TodosComponent } from './components/todos/todos.component';
import { AddTodoComponent } from './components/add-todo/add-todo.component';
import { EditTodoComponent } from './pages/edit-todo/edit-todo.component';
import { OrderModule } from 'ngx-order-pipe';
import { FilterPipeModule } from 'ngx-filter-pipe';

const appRoutes: Routes = [
  { path: '', component: TodosComponent },
  { path: 'update/:id', component: EditTodoComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    TodosComponent,
    AddTodoComponent,
    EditTodoComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    OrderModule,
    FilterPipeModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
