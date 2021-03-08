import * as hljs from 'highlight.js/lib/core';

import xml from 'highlight.js/lib/languages/xml';
import css from 'highlight.js/lib/languages/css';
import scss from 'highlight.js/lib/languages/scss';
import javascript from 'highlight.js/lib/languages/javascript';
import typescript from 'highlight.js/lib/languages/typescript';
import json from 'highlight.js/lib/languages/json';
import ruby from 'highlight.js/lib/languages/ruby';
import python from 'highlight.js/lib/languages/python';
import go from 'highlight.js/lib/languages/go';

hljs.registerLanguage('xml', xml);
hljs.registerLanguage('css', css);
hljs.registerLanguage('scss', scss);
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('json', json);
hljs.registerLanguage('ruby', ruby);
hljs.registerLanguage('python', python);
hljs.registerLanguage('go', go);

export default hljs;
