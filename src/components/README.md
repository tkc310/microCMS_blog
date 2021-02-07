# atomic design

templateは利用しない

## atoms

これ以上分割することができない、UIを構築するための最小単位

## molecules

`atom` の組み合わせによって構成される。

## organisms

`atom/modulecule/organism` の組み合わせによって構成される。

## layouts



## pages

Next.jsのルーティングはpages配下のファイルシステムを利用している。

Containerコンポーネント層として利用して、reduxなどglobal-stateはここからのみ流し込むようにする。

逆にこのディレクトリ以外はPresentationalコンポーネント層という事になる。

このアプリはSSGのため、pages配下のコンポーネントのみでAPIを叩いてデータを取得している。
(`getStaticProps, getStaticPaths`)

### getStaticProps
APIを叩いて取得した動的な値を返す。
返り値は同じファイルに定義されたContainerコンポーネントのpropsとして取得できる。

### getStaticPaths
`[id].tsx` のように複数ページ生成させるタイプの画面で利用する。
APIを叩いて取得した動的な値によって、複数のパスとページを生成する。
