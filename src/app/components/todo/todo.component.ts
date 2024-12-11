import { Component, EventEmitter, Input, Output } from '@angular/core';
import type { Todo } from '../../models/todo.model';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [NgClass],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css'
})

export class TodoComponent {
  @Input() todo!: Todo;
  @Output() completedChanged = new EventEmitter<Todo>();

  toggleComplete(): void {
    const updatedTodo = { ...this.todo, completed: !this.todo.completed }; 
    this.completedChanged.emit(updatedTodo);
  }
}
