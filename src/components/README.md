# components

components 配下は Presentational コンポーネント層として利用する。

components 配下は atomic design のディレクトリ構成を参考にしている。

なお、template は利用していない。

molecules と organisms の境界は「単体で(ポータブルに)利用できるか否か」で判断する。

## atoms

これ以上分割することができない、UI を構築するための最小単位のコンポーネント

## molecules

2 つ以上の `atom` もしくは、 `atom/molecule` の組み合わせによって構成される。

単体で(ポータブルに)利用できない粒度のコンポーネント。

## organisms

`atom/modulecule/organism` の組み合わせによって構成される。

単体で(ポータブルに)利用できる粒度のコンポーネント。

## layouts

`atom/modulecule/organism` の組み合わせによって構成される。

ドメインやリソース毎に共通する部品や振る舞いを定義したコンポーネント。

pages から children を与えて高階コンポーネントとして利用する。

## pages (src/配下)

Next.js のルーティングは pages 配下のファイルシステムを利用している。

Container コンポーネント層として利用して、redux など global-state はここからのみ流し込むようにする。

このアプリは SSG のため、pages 配下のコンポーネントのみで API を叩いてデータを取得している。
(`getStaticProps, getStaticPaths`)

### getStaticProps

API を叩いて取得した動的な値を返す。

返り値は同じファイルに定義された Container コンポーネントの props として取得できる。

### getStaticPaths

`[id].tsx` のように複数ページ生成させるタイプの画面で利用する。

API を叩いて取得した動的な値によって、複数のパスとページを生成する。

### CSR を SSG と併用する

記事などは前述の関数でデプロイ・ビルド時に prerendering する。

対して下記のケースでは CSR で非同期に処理したくなると思う。

- リアルタイム更新
- SEO 対策が不要
- SSG における認証処理 (SSR しないケースの認証)

その場合 Next.js では `useSWR` という hooks を利用したデータの取得が推奨されている。

よしなにキャッシュなどの処理を行ってくれる。オプションでポーリングして更新なども可能。

https://nextjs.org/docs/basic-features/data-fetching#swr
https://panda-program.com/posts/useswr

```js
import useSWR from 'swr';

const fetcher = async (args) => await fetch('api/hoge');

function PageComponent() {
  const { data, error } = useSWR('cacheKeyName', fetcher);

  return error ? (
    <div>failed to load</div>
  ) : !data ? (
    <div>loading...</div>
  ) : (
    <div>{data}</div>
  );
}
```

SSG との併用も可能なため、事前に(ビルド時点で)必要なデータは前述の `getStaticProps` で取得しておいて、 CSR 時点で必要なデータは `pages` コンポーネント内で `useSWR` を利用して取得する。
