// src/app/app.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoInputComponent } from '../app/components/todo-input/todo-input';
import { TodoListComponent } from '../app/components/todo-list/todo-list';
import { Todo } from '../app/models/todo'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, TodoInputComponent, TodoListComponent],
  template: `
    <main class="min-h-screen py-12 px-4" style="background-color: #FEFACD;">
      <div class="max-w-md mx-auto">
        <h1 class="text-4xl font-black mb-8 text-center" style="color: #5F4A8B;">
          My Notes
        </h1>
        
        <app-todo-input (todoAdded)="handleNewTask($event)"></app-todo-input>

        <app-todo-list
          [todos]="todoArray"
          (remove)="deleteTask($event)"
          (toggle)="toggleStatus($event)">
        </app-todo-list>
      </div>
    </main>
  `
})
export class App {
  todoArray: Todo[] = [];

  handleNewTask(taskTitle: string) {
    this.todoArray.push({ id: Date.now(), task: taskTitle, completed: false });
  }

  deleteTask(id: number) {
    this.todoArray = this.todoArray.filter(t => t.id !== id);
  }

  toggleStatus(id: number) {
    const todo = this.todoArray.find(t => t.id === id);
    if (todo) todo.completed = !todo.completed;
  }
}