import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, exhaustMap, catchError, switchMap } from 'rxjs/operators';
import { TodoService } from '../../../services/todo.service';
import { addTodo, getTodos, todoAdded, todosFetched, todoUpdated, updateTodo } from './todo-list.actions';

@Injectable()
export class TodoListEffects {
  getTodos$;
  addTodo$;
  updateTodo$;

  constructor(
    private actions$: Actions,
    private todoService: TodoService
  ) {
    this.getTodos$ = createEffect(() =>
      this.actions$.pipe(
        ofType(getTodos),
        exhaustMap(() =>
          this.todoService.getTodos().pipe(
            map(todos => todosFetched({ todos })),
            catchError(() => EMPTY)
          )
        )
      )
    );

    this.addTodo$ = createEffect(() =>
      this.actions$.pipe(
        ofType(addTodo),
        switchMap(({ todo }) => // <--- Here, we access the payload `todo`
          this.todoService.addTodo(todo).pipe(
            map(addedTodo => todoAdded({ todo: addedTodo })),
            catchError(() => EMPTY)
          )
        )
      )
    );

  this.updateTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateTodo),
      switchMap(({ todo }) =>
        this.todoService.updateTodo(todo).pipe(
          map(updatedTodo => todoUpdated({ todo: updatedTodo })),
          catchError(() => EMPTY)
        )
      )
    )
  );
  console.log("ACTIONS$: ",this.actions$)
  }
}

/* 
exhaustMap(): Used for fetching data to avoid overlapping HTTP calls.
switchMap(): Used for adding and updating data. It cancels any ongoing requests if a new one comes in.
*/


/* 
Cannot read properties of undefined (reading "pipe")
compiler error was solved with the below ticket
https://github.com/ngrx/platform/issues/3654
*/