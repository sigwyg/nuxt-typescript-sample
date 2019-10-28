せっかくなので、なるべくフルスクラッチで作っている。
Nuxt.js初めてなので勉強しつつ。

# 学び

- test
    - 公式通りのAVA設定
    - 動いてるけど、nuxt.configのtry/catchでエラー吐いてるような…
- Lint
    - @nuxtjs/eslint-config-typescriptが必要
    - @nuxtjs/eslint-configと競合するので、あるなら消しておくこと
    - plugin:prettier/recommendedにはplogins: ['prettier']とか諸々含まれている
    - 出たばっかなので見合わせたけど、落ち着いたらこの辺試すのも良いかも
        - https://www.robertcooper.me/using-eslint-and-prettier-in-a-typescript-project
    - vue SFCのLint対応はめんどくさい(tsserver, prettier)
        - インデントscriptが2で、template/styleは4にしたいんだが… vueファイルだと難しい
        - エディタ対応は上手いことできるんだけど、ランタイムで落ちる。ぐぬぬ
        - 話題としてはこの辺も近いが -> https://github.com/prettier/prettier/issues/3888
- Nuxt Typescript
    - https://typescript.nuxtjs.org/guide/
    - @nuxt/types
        - @nuxt/typescript-buildに含まれているので、installの必要はない
    - @nuxt/typescript-build
        - @nuxt/typescriptが含まれている
    - @nuxt/typescript-runtime
        - production環境でも使うので、dependencyで入れる必要がある
        - Webpackを通さずにTypeScriptを実行する… つまりnuxt.configをTS化するために必要
        - nuxt-tsコマンドが使えるようになる
- Nuxt.js & Typescriptには、Componentsの書き方に３つの形式がある
    1. Options API
        - 旧Object API
    2. Composition API
        - 旧Functions API
    3. Class API
    - https://typescript.nuxtjs.org/cookbook/components/#script
    - [Class APIの提案は棄却されたとのこと](https://github.com/vuejs/rfcs/pull/17#issuecomment-494242121)
    - Classベースの書き方は実績があるが、JSと変わりすぎて違和感あり
    - Composition APIは動作したし、良さげであるが3.xで採用されるまでは、まだまだ変わりそう
    - ひとまず慣れもあるので速度優先でOptions APIにする
