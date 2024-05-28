import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Status } from '../models/Status';
import { Task } from '../models/task';
import { TaskService } from '../service/task.service';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.scss',
  providers: [TaskService]
})
export class AddTaskComponent {
taskName: any;
taskDescription: any;
taskStatus: Status.Done;
assignedTo: any;

statusOptions = Object.values(Status); // Presupunând că Status este un enum


onSubmit(){

const task = {
  
  name: this.taskName,
  description: this.taskDescription,
  status: Status.Done,
  assignedTo: this.assignedTo,
}


this.taskService.addTask(task)
      .subscribe(task => {
        console.log('Task added successfully:', task);
        this.router.navigate(['/']);
      });

console.log(this.taskName + this.taskDescription)  
this.router.navigate(['/']);
}

onCancel(){
  this.router.navigate(['/']);
}


constructor
(
  private router:Router,
  private taskService:TaskService,
)
{}

}
