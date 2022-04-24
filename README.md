# DeskTravel

![top](https://user-images.githubusercontent.com/87213148/164877885-64ad31a5-8e40-4ab6-ab07-099d304cf848.png)


## アプリ概要

URL ▶ 


### あなただけのこだわりのデスクをシェアすることができるサービスです。

他の人のデスクを参考にして、自分の理想のデスクを作成することができます。

アイコン・プロフィールを作成することも可能なため、SNSのように使用することができます。

## サービスを作った背景

プログラミング学習をきっかけに、以下のような悩みがありました。

- デスクワークに不慣れなことから、体が痛くなってしまう
- どの程度のスペックのマシンを準備したらよいのかわからない
- 周囲のデスクワーカーのデスク環境を参考にしたい

「このような悩みを解決するべく」といった思いでサービスを開発しました。

## 各種機能について
### 1. 新規ユーザー登録 & ログインページ

  - メールアドレスでの登録以外にもSNS認証も可能
  - 試使用としてゲストログイン機能も可能

![ログイン画面](https://user-images.githubusercontent.com/87213148/164878795-fdbb7355-7d39-41b6-8c49-32e0eecc965a.png)
<br>
<br>


### 2. プロフィール登録　& 変更ページ

  - 登録した内容は他のユーザーから閲覧

![プロフィール登録画像](https://user-images.githubusercontent.com/87213148/164879069-6cd694e2-e7c3-4c5f-9fba-f22f93942885.png)
<br>
<br>


### 3. 新着投稿　& お気に入りページ

  - 最新の投稿を閲覧可能
  - 人気の投稿がランキング形式で表示

![ホーム画面](https://user-images.githubusercontent.com/87213148/164952240-3915968e-49c3-4c0e-8815-b8ce2a3c31e9.png)
<br>
<br>


### 4. MYページ

  - プロフィールや自分の投稿を表示
  - お気に入り登録した投稿を表示

![mypage画面](https://user-images.githubusercontent.com/87213148/164952933-6f0916c8-704d-4462-9af6-8cb2e857dce5.png)
<br>
<br>


### 5. 投稿一覧　& 投稿検索ページ

  - 全ての投稿を一覧表示
  - ユーザー名で検索することが可能

![投稿リスト画面](https://user-images.githubusercontent.com/87213148/164952440-e466937d-0fb3-40e7-a0a4-57c2b1060dac.png)
<br>
<br>


### 6. デスク投稿　＆　編集ページ

  - 各アイテムまで詳細に投稿することが可能

![投稿画面](https://user-images.githubusercontent.com/87213148/164952701-76e73fe2-259f-478b-ba37-11fcaad0a040.png)
<br>
<br>


### 7. 投稿詳細ページ

  - 投稿に紐づいたアイテムを表示
  - 「いいね」や「コメント」を表示

![投稿詳細画面](https://user-images.githubusercontent.com/87213148/164953012-1b3be8e5-1e8e-49e8-8f41-6eff151e182a.png)
<br>
<br>


## 使用技術について

### フロントエンド
  - 言語: JavaScript/TypeScript
  - フレームワーク: React.js(ReduxToolKit)
  - UIライブラリ: TailwindCSS

### バックエンド
  - 言語: Python
  - フレームワーク: django rest framework
  - DB: MySQL

### インフラ
  - Docker/Docker-Compose
  - AWS


## ER図

<img width="638" alt="ER図" src="https://user-images.githubusercontent.com/87213148/164953776-275d5c8b-a2f0-4423-aaa3-5a10f1516727.png">