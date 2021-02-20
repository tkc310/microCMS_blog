import * as hljs from 'highlight.js';

[
  'css',
  'scss',
  'javascript',
  'typescript',
  'json',
  'ruby',
  'python',
  'go',
].forEach((lang: string) => {
  hljs.registerLanguage(lang, require(`highlight.js/lib/languages/${lang}`));
});

export default hljs;
