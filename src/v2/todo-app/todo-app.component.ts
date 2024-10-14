import './todo-app.styles.css';
import { createSignal } from '../index';

class IndexedSet<T> extends Set<T> {
  at(index: number) {
    if (Math.abs(index) > this.size) {
      return null;
    }

    var idx = index;
    if (idx < 0) {
      idx = this.size + index;
    }

    var counter = 0;
    for (const elem of this) {
      if (counter == idx) {
        return elem;
      }

      counter += 1;
    }
  }
}

export var TodoApp = () => {
  var todoSignal = createSignal();

  var todosMap = new IndexedSet<{
    id: number;
    title: string;
    completed: boolean;
  }>();
  var globalId = 0;

  var container = document.createElement('div');
  container.classList.add('todo-container');

  var input = document.createElement('input');
  input.type = 'text';

  var addTodoButton = document.createElement('button');
  addTodoButton.type = 'button';
  addTodoButton.textContent = 'add todo';
  addTodoButton.addEventListener('click', (event) => {
    todoSignal.trigger(() => {
      const target = event.target as HTMLInputElement;
      const id = globalId++;
      const title = target.value;
      const completed = true;

      todosMap.add({
        id,
        title,
        completed,
      });
      console.log({ todosMap });
    });

    input.value = '';
  });

  var todoList = document.createElement('ul');
  todoList.classList.add('list');

  container.appendChild(input);
  container.appendChild(addTodoButton);
  container.appendChild(todoList);

  var todoElement = document.createElement('li');

  todoSignal.track(() => {
    var newChildren = Array.from({ length: todosMap.size }, (_, i) => {
      const node = todoElement.cloneNode(true);
      const value = todosMap.at(i);

      node.textContent = value?.title || '';

      return node;
    });

    todoList.replaceChildren(...newChildren);
  });

  return container;
};
