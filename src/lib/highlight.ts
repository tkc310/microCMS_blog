import * as hljs from 'highlight.js';

const settingHljs = () => {
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
    hljs.registerLanguage(lang, import(`highlight.js/lib/languages/${lang}`));
  });
  return hljs;
};

export default settingHljs;
