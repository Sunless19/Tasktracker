import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../models/task'; // Adjust the path as necessary
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { TaskService } from '../service/task.service';
import { EditTaskComponent } from '../edit-task/edit-task.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [MatCardModule, MatIconModule],
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss'],
})
export class TaskCardComponent {
  @Input() task: Task;
  @Output() deleteTaskEvent = new EventEmitter<Task>();

  constructor(private dialog: MatDialog, private taskService: TaskService) {}

  editTask(task: Task) {
    const dialogRef = this.dialog.open(EditTaskComponent, {
      data: task,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.taskService.editTask(result).subscribe(updatedTask => {
          console.log('Task updated successfully', updatedTask);
        });
      }
    });
  }

  deleteTask(task: Task): void {
    this.taskService.deleteTask(task.id).subscribe({
      next: () => {
        console.log('Task deleted successfully');
          this.deleteTaskEvent.emit(task);
      },
      error: err => {
        console.error('Error deleting task:', err);
      }
    });
  }
  
}