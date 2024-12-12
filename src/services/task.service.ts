import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable, NgZone, inject } from "@angular/core";
import { Observable } from "rxjs";
import type { Task } from "../app/models/task.model";

@Injectable({ providedIn: 'root' })
export class TaskService {
  private apiUrl = 'http://localhost:8000/tasks';
  private ngZone = inject(NgZone);

  constructor(private http: HttpClient) {}

addTask(task: Task, token: string): Observable<Task> {
  const headers = new HttpHeaders({
    Authorization: `Token ${token}`,
  });

  return this.http.post<Task>(`${this.apiUrl}/create/`, task, { headers });
}


  getTasks(): Observable<Task[]> {
    return new Observable<Task[]>((observer) => {
        this.http.get<Task[]>(this.apiUrl).subscribe({
          next: (response) => observer.next(response),
          error: (error) => observer.error(error),
          complete: () => observer.complete()
        });
    });
  }

  updateTask(task: Task): Observable<Task> {
    return new Observable<Task>((observer) => {
        this.http.put<Task>(`${this.apiUrl}/update/${task.id}`, task).subscribe({
          next: (response) => observer.next(response),
          error: (error) => observer.error(error),
          complete: () => observer.complete()
        });
    });
  }

  getTaskDetails(taskId: string): Observable<Task> {
    return new Observable<Task>((observer) => {
        this.http.get<Task>(`${this.apiUrl}/read/${taskId}`).subscribe({
          next: (response) => observer.next(response),
          error: (error) => observer.error(error),
          complete: () => observer.complete()
      });
    });
  }

  deleteTask(taskId: string): Observable<void> {
    return new Observable<void>((observer) => {
      this.ngZone.runOutsideAngular(() => {
        this.http.delete<void>(`${this.apiUrl}/delete/${taskId}`).subscribe({
          next: () => observer.next(),
          error: (error) => observer.error(error),
          complete: () => observer.complete()
        });
      });
    });
  }
}
