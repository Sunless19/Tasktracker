import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };

  baseUrl = "https://localhost:7000/Task";

  // Subiect pentru a emite evenimentul de actualizare a listei
  private updateTaskListSubject = new Subject<Task[]>();

  constructor(private httpClient: HttpClient) {}

  // Metoda pentru a obține lista de task-uri
  getTasks(): Observable<Task[]> {
    return this.httpClient.get<Task[]>(this.baseUrl, this.httpOptions);
  }

  // Metoda pentru a adăuga un task nou
  addTask(newTask: Task): Observable<Task> {
    return this.httpClient.post<Task>(this.baseUrl, newTask, { headers: this.httpOptions.headers, responseType: 'text' as 'json' });
  }

  // Metoda pentru a edita un task
  editTask(task: Task): Observable<Task> {
    return this.httpClient.put<Task>(`${this.baseUrl}/${task.id}`, task, this.httpOptions);
  }

  // Metoda pentru a șterge un task
  deleteTask(id: string): Observable<string> {
    return this.httpClient.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

  // Metoda pentru a emite evenimentul de actualizare a listei
  updateTaskList(tasks: Task[]): void {
    this.updateTaskListSubject.next(tasks);
  }

  // Metodă pentru a subscrie la evenimentul de actualizare a listei
  onUpdateTaskList(): Observable<Task[]> {
    return this.updateTaskListSubject.asObservable();
  }
}