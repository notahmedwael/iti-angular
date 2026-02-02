import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Todo } from '../../models/todo';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <ul class="space-y-3">
      <li *ngFor="let item of todos"
          class="flex items-center justify-between p-4 bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-[#5F4A8B]/10">
        
        <div class="flex items-center gap-3 cursor-pointer" (click)="toggle.emit(item.id)">
            <div [style.border-color]="'#5F4A8B'"
                [style.background-color]="item.completed ? '#5F4A8B' : 'transparent'"
                class="w-6 h-6 border-2 rounded-lg flex items-center justify-center transition-all">
            <span *ngIf="item.completed" class="text-[#FEFACD] text-xs font-bold">✓</span>
          </div>

          <span [class.line-through]="item.completed"
                class="font-medium transition-all"
                [style.color]="item.completed ? '#5F4A8B88' : '#5F4A8B'">
            {{ item.task }}
          </span>
        </div>

        <button (click)="remove.emit(item.id)" class="hover:scale-125 transition-transform" style="color: #5F4A8B;">
          ✕
        </button>
      </li>
    </ul>
  `
})
export class TodoListComponent {
  @Input() todos: Todo[] = [];
  @Output() remove = new EventEmitter<number>();
  @Output() toggle = new EventEmitter<number>();
}