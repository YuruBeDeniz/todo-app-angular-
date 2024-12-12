import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { calculatorReducer } from './components/calculator/calculator.reducer';
import { provideEffects } from '@ngrx/effects';
import { todoListReducer } from './components/todo-list/todo-list-reducer';
import { TodoListEffects } from './components/todo-list/todo-list.effects';
import { TokenInterceptor } from './token.interceptors';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(),
    provideStore({ calculate: calculatorReducer, todos: todoListReducer }),
    provideEffects([TodoListEffects]),
    provideHttpClient(
      // DI-based interceptors must be explicitly enabled.
      withInterceptorsFromDi(),
    ),
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true}
]
};
