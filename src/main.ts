import './style.css';
import { html as htmlV1 } from './v1/html';
import { html as htmlV2 } from './v2/html';

var app = document.querySelector<HTMLDivElement>('#app')!;

document.addEventListener('DOMContentLoaded', () => {
  app.appendChild(
    (() => {
      var el = document.createElement('h1');
      el.textContent = 'v1';

      return el;
    })()
  );
  app.appendChild(htmlV1);
  app.appendChild(document.createElement('hr'));
  app.appendChild(
    (() => {
      var el = document.createElement('h1');
      el.textContent = 'v2';

      return el;
    })()
  );
  app.appendChild(htmlV2);
  app.appendChild(document.createElement('hr'));
});
