import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import type { Todo } from "../app/models/todo.model";


@Injectable({ providedIn: 'root' })

export class TodoService {
  apiUrl = 'http://localhost:5005/api/todos';

  constructor(private http: HttpClient) {}

  addTodo(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(this.apiUrl, todo);
  }

  getTodos(): Observable<Todo[]> { 
    return this.http.get<Todo[]>(this.apiUrl);
  }

  updateTodo(todo: Todo): Observable<Todo> {
    return this.http.put<Todo>(`${this.apiUrl}/${todo._id}`, todo);
  }
}