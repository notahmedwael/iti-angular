import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo-input',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="flex gap-2 mb-6">
      <input
        [(ngModel)]="todoText"
        (keyup.enter)="addTask()"
        placeholder="What's on your mind?"
        class="flex-1 p-4 rounded-2xl border-none shadow-sm outline-none focus:ring-2"
        style="--tw-ring-color: #5F4A8B;"
      />
      <button
        (click)="addTask()"
        class="text-white px-6 py-4 rounded-2xl font-bold transition-transform active:scale-95 shadow-md"
        style="background-color: #5F4A8B;"
      >
        Add
      </button>
    </div>
  `
})

export class TodoInputComponent {
  todoText = '';
  @Output() todoAdded = new EventEmitter<string>();

  addTask() {
    if (this.todoText.trim()) {
      this.todoAdded.emit(this.todoText);
      this.todoText = ''; // Clear input
    }
  }
}