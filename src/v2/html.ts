import { createSignal } from './index';

var Counter = () => {
  var count = 0;

  var countSignal = createSignal();

  var container = document.createElement('div');

  var incrementButton = document.createElement('button');
  incrementButton.type = 'button';
  incrementButton.textContent = 'increment';
  incrementButton.addEventListener('click', () => {
    countSignal.trigger(() => {
      count++;
    });
  });

  var decrementButton = document.createElement('button');
  decrementButton.type = 'button';
  decrementButton.textContent = 'increment';
  decrementButton.addEventListener('click', () => {
    countSignal.trigger(() => {
      count--;
    });
  });

  var countText = document.createTextNode('');
  var countContainer = document.createElement('div');
  countContainer.appendChild(countText);

  countSignal.track(() => {
    countText.textContent = `count: ${count}`;
  });

  container.appendChild(countContainer);
  container.appendChild(incrementButton);
  container.appendChild(decrementButton);

  return container;
};

var sharedCount = 2;
var sharedCountSignal = createSignal();
var SharedCounter = () => {
  var container = document.createElement('div');

  var sharedCountText = document.createTextNode('');
  var countContainer = document.createElement('div');
  countContainer.appendChild(sharedCountText);

  sharedCountSignal.track(() => {
    sharedCountText.textContent = `count: ${sharedCount}`;
  });

  var incrementButton = document.createElement('button');
  incrementButton.type = 'button';
  incrementButton.textContent = 'increment';
  incrementButton.addEventListener('click', () => {
    sharedCountSignal.trigger(() => {
      sharedCount++;
    });
  });

  var decrementButton = document.createElement('button');
  decrementButton.type = 'button';
  decrementButton.textContent = 'increment';
  decrementButton.addEventListener('click', () => {
    sharedCountSignal.trigger(() => {
      sharedCount--;
    });
  });

  container.appendChild(countContainer);
  container.appendChild(incrementButton);
  container.appendChild(decrementButton);

  return container;
};

export var html = document.createElement('div');

var counter1_div = document.createElement('div');
var counter1_h1 = document.createElement('h1');
counter1_h1.textContent = 'Counter: "1"';
counter1_div.appendChild(counter1_h1);
counter1_div.appendChild(Counter());
html.appendChild(counter1_div);

var counter2_div = document.createElement('div');
var counter2_h1 = document.createElement('h1');
counter2_h1.textContent = 'Counter: "2"';
counter2_div.appendChild(counter2_h1);
counter2_div.appendChild(Counter());
html.appendChild(counter2_div);

// ----------------------------------------------------------------

var sharedCounter1_div = document.createElement('div');
var sharedCounter1_h1 = document.createElement('h1');
sharedCounter1_h1.textContent = 'Shared counter: "1"';
sharedCounter1_div.appendChild(sharedCounter1_h1);
sharedCounter1_div.appendChild(SharedCounter());
html.appendChild(sharedCounter1_div);

var sharedCounter2_div = document.createElement('div');
var sharedCounter2_h1 = document.createElement('h1');
sharedCounter2_h1.textContent = 'Shared counter: "2"';
sharedCounter2_div.appendChild(sharedCounter2_h1);
sharedCounter2_div.appendChild(SharedCounter());
html.appendChild(sharedCounter2_div);

import { TodoApp } from './todo-app/todo-app.component';

html.appendChild(TodoApp());
