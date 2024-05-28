import { Injectable } from '@angular/core';
import { Status } from '../models/Status';
import { Task } from '../models/task';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})

export class TaskService {

  readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  };


  baseUrl="https://localhost:7000/Task" 
  headers: HttpHeaders | { [header: string]: string | string[]; };
  constructor(private httpClient:HttpClient) 
    { }

  getTasks() :Observable<Task[]>
  {
    return this.httpClient.get<Task[]>(this.baseUrl, this.httpOptions );
  }

  addTask(newTask: any) {
    
    
    
    return this.httpClient.post<Task>(this.baseUrl, newTask, { headers: this.headers, responseType: 'text' as 'json' });
  }

  editTask(task: Task) {
    return this.httpClient.put<Task>(`${this.baseUrl}/${task.id}`, task);
  }      

  deleteTask(id:string) : void{
    let i = this.tasks.findIndex((t) => t.id == id);
    this.tasks = this.tasks.splice(i, 1)
  }

  tasks: Task[];

}
