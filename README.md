# JAMstack blog

## 技術スタック

- Next.js
- TypeScript
- microCMS
- vercel
- Chakra UI
- next-mdx-remote

## Usage

```
$ npm i
// .git/hook追加・更新
$ npx husky install
$ npm run dev
```

記事の更新を microCMS で行うと自動的に vercel に SSG された記事がデプロイされる。

## 構築時の Memo

```
# microcms next.jsのボイラープレート
# @see https://blog.microcms.io/microcms-next-jamstack-blog/
$ npx create-react-app microcms-next-jamstack-blog
$ cd microcms-next-jamstack-blog

# typescript導入
$ npm i -D typescript @types/react @types/react-dom @types/node
# 各js,jsxファイルをts,tsxファイルに書き換えてから実行
$ npm run dev
# => tsconfig.jsonが生成される

# eslint, prettier導入
# @see https://knote.dev/post/2020-08-29/duprecated-eslint-plugin-prettier/
# package install後に.eslintrc.json, .prettierrc, .vscode/settings.jsonの設定を行う
$ npm i -D eslint eslint-config-airbnb eslint-config-prettier eslint-import-resolver-typescript eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-react eslint-plugin-react-hooks

# precommit時にprettierを実行
# package install後にpackage.jsonにhusckyの設定を追加
$ npm i -D husky prettier-quick
```
