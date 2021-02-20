import * as hljs from 'highlight.js';
import css from 'highlight.js/lib/languages/css';
import scss from 'highlight.js/lib/languages/scss';
import javascript from 'highlight.js/lib/languages/javascript';
import typescript from 'highlight.js/lib/languages/typescript';
import json from 'highlight.js/lib/languages/json';
import ruby from 'highlight.js/lib/languages/ruby';
import python from 'highlight.js/lib/languages/python';
import go from 'highlight.js/lib/languages/go';

[css, scss, javascript, typescript, json, ruby, python, go].forEach(
  (lang: string) => {
    hljs.registerLanguage(`${lang}`, lang);
  }
);

export default hljs;
