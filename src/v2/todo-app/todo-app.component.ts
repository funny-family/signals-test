import './todo-app.styles.css';
import { createSignal } from '../index';

export var TodoApp = () => {
  var todoListSignal = createSignal();
  window.todoListSignal = todoListSignal;

  var todosMap = new Set<{
    id: number;
    title: string;
    completed: boolean;
  }>();
  window.todosMap = todosMap;

  var globalId = 0;

  var container = document.createElement('div');
  container.classList.add('todo-container');

  var input = document.createElement('input');
  input.type = 'text';

  var addTodoButton = document.createElement('button');
  addTodoButton.type = 'button';
  addTodoButton.textContent = 'add todo';
  addTodoButton.addEventListener('click', () => {
    if (input.value === '') {
      return;
    }

    todoListSignal.trigger(() => {
      const id = globalId++;
      const title = input.value;
      const completed = false;

      todosMap.add({
        id,
        title,
        completed,
      });
    });

    input.value = '';
  });

  var todoList = document.createElement('ul');
  todoList.classList.add('list');

  container.appendChild(input);
  container.appendChild(addTodoButton);
  container.appendChild(todoList);

  todoListSignal.track(() => {
    var newChildren = Array.from(todosMap, (todo) => {
      var todoNode = document.createElement('li');

      const title = document.createElement('div');
      title.appendChild(document.createTextNode(todo.title));

      todo.completed
        ? (title.style.textDecoration = 'line-through')
        : (title.style.textDecoration = 'none');

      const stateTodoButton = document.createElement('button');
      stateTodoButton.type = 'button';
      stateTodoButton.textContent = todo.completed ? '❌' : '✅';
      stateTodoButton.addEventListener('click', () => {
        todoListSignal.trigger(() => {
          todo.completed = !todo.completed;
        });
      });

      const deleteTodoButton = document.createElement('button');
      deleteTodoButton.type = 'button';
      deleteTodoButton.textContent = '🗑️';
      deleteTodoButton.addEventListener('click', () => {
        todoListSignal.trigger(() => {
          todosMap.delete(todo);
        });
      });

      todoNode.appendChild(title);
      todoNode.appendChild(stateTodoButton);
      todoNode.appendChild(deleteTodoButton);

      return todoNode;
    });

    todoList.replaceChildren(...newChildren);
  });

  return container;
};
