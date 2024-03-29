import cheerio from 'cheerio';

export const addHeadingId = (body: string, id: string) => {
  const $ = cheerio.load(body);
  const svgSize = 16;
  const svg = `<svg class="octicon octicon-link" viewBox="0 0 ${svgSize} ${svgSize}" version="1.1" width="${svgSize}" height="${svgSize}" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>`;

  ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].forEach((heading) => {
    $(heading).each((_, elm) => {
      const $elm = $(elm);
      const text = $elm.text();
      const uuid = `${id}_${text}`;
      $elm.html('');
      $(`<a href="#${uuid}">${svg}<span>${text}</span></a>`).prependTo($elm);
      $(
        `<div style="height: 32px;" id="${uuid}" name="${uuid}"></div>`
      ).insertBefore($elm);
      $elm.attr('id', uuid);
    });
  });

  return $.html();
};

export default addHeadingId;
