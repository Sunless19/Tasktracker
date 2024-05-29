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
  styleUrls: ['./add-task.component.scss'],
  providers: [TaskService]
})
export class AddTaskComponent {
  taskName: string;
  taskDescription: string;
  taskStatus: Status = Status.Done;
  assignedTo: string;

  statusOptions = Object.values(Status);

  onSubmit(): void {
    const task: Task = {
      id: '',
      title: this.taskName,
      description: this.taskDescription,
      status: this.taskStatus,
      assignedTo: this.assignedTo,
    };

    this.taskService.addTask(task)
      .subscribe(task => {
        console.log('Task added successfully:', task);
        this.router.navigate(['/']);
      });
  }

  onCancel(): void {
    this.router.navigate(['/']);
  }

  constructor(
    private router: Router,
    private taskService: TaskService
  ) {}
}