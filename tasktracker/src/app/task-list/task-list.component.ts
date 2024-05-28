import { Component, Input, OnInit } from '@angular/core';
import { Task } from '../models/task';
import { FilterComponent } from '../filter-component/filter-component.component';
import { CommonModule } from '@angular/common';
import { Status } from '../models/Status';
import { MatIcon } from '@angular/material/icon';
import { TaskService } from '../service/task.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { EditTaskComponent } from '../edit-task/edit-task.component';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [FilterComponent, CommonModule, MatIcon, MatDialogModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
  providers:[TaskService]
})


export class TaskListComponent implements OnInit {
  filtredTasks:Task[];
  tasks:Task[];
  
  ngOnInit(): void {

    this.taskService.getTasks().subscribe(tasks => this.tasks = tasks);
    this.taskService.getTasks().subscribe(tasks => this.filtredTasks = tasks);
  }

deleteTask(_t5: Task) {
  this.taskService.deleteTask(_t5.id);
}

editTask(_t5: Task) : void {
  const dialogRef = this.dialog.open(EditTaskComponent, {
    data: _t5,
  });

  dialogRef.afterClosed().subscribe((result) => {
    console.log('The dialog was closed');
    this.taskService.editTask(_t5);
  });

}

handleStatusSelected(status) {
  this.filtredTasks = this.tasks.filter((task) => task.status === status);
}
  

  constructor
  (
    private taskService:TaskService,
    private dialog: MatDialog,

  )
  {}
}
