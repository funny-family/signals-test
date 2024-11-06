import './todo-app.styles.css';
import { createSignal } from '../index';

type TodoRecord = {
  id: number;
  title: string;
  completed: boolean;
};

export var TodoApp = () => {
  var todoListSignal = createSignal();
  window.todoListSignalV2 = todoListSignal;

  var todosMap = new Set<TodoRecord>();
  window.todosMapV2 = todosMap;

  var globalId = 0;

  var container = document.createElement('div');
  container.classList.add('todo-container');

  const title = document.createElement('div');
  title.textContent = 'Todo App V2';
  container.appendChild(title);

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

  var Todo = (props: { todo: TodoRecord }) => {
    const todoElement = document.createElement('li');

    const title = document.createElement('div');
    title.appendChild(document.createTextNode(props.todo.title));

    props.todo.completed
      ? (title.style.textDecoration = 'line-through')
      : (title.style.textDecoration = 'none');

    const stateTodoButton = document.createElement('button');
    stateTodoButton.type = 'button';
    stateTodoButton.textContent = props.todo.completed ? '❌' : '✅';
    stateTodoButton.addEventListener('click', () => {
      todoListSignal.trigger(() => {
        props.todo.completed = !props.todo.completed;
      });
    });

    const deleteTodoButton = document.createElement('button');
    deleteTodoButton.type = 'button';
    deleteTodoButton.textContent = '🗑️';
    deleteTodoButton.addEventListener('click', () => {
      todoListSignal.trigger(() => {
        todosMap.delete(props.todo);
      });
    });

    todoElement.appendChild(title);
    todoElement.appendChild(stateTodoButton);
    todoElement.appendChild(deleteTodoButton);

    return todoElement;
  };

  todoListSignal.track(() => {
    var newChildren = Array.from(todosMap, (todo) => {
      return Todo({ todo });
    });

    todoList.replaceChildren(...newChildren);
  });

  return container;
};
