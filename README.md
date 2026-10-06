# Threads Content Manager — React / Flask / Google Sheets

> **Social Publishing Automation** — React / TypeScript UIとFlask APIを組み合わせ、Threads向け投稿・返信処理とGoogle Sheets連携を管理するソーシャルコンテンツ運用ツールです。
>
> **Stack:** React 19 · TypeScript · Vite · Python · Flask · Google Sheets API · Threads API

## Architecture

```text
React / TypeScript UI
        │
        ▼
      Flask API
   ├── authentication
   ├── post workflow
   └── reply workflow
        │
   ┌────┴─────────┐
   ▼              ▼
Threads API   Google Sheets
```

## Core Capabilities

- Threads向け投稿・返信ワークフロー
- React / TypeScriptによる管理UI
- Flask REST API
- Google Sheetsを利用したデータ連携
- 環境変数によるアクセストークン・認証情報管理
- APIエラー処理とログ出力
- Bearer tokenによるFlask API保護

## Engineering Focus

- Social APIと業務UIの統合
- Python / FlaskとReactのフルスタック構成
- 外部API認証情報の環境変数管理
- Google Sheetsを簡易データソースとして利用する運用設計
- 投稿・返信処理のAPI化
- ソーシャル運用自動化への拡張性

## Project Structure

```text
Thread/
├── thread-manage/
│   ├── src/
│   │   ├── App.tsx
│   │   ├── components/
│   │   └── threads_api.py
│   ├── package.json
│   └── ...
└── README.md
```

## Frontend

```bash
cd thread-manage
npm install
npm run dev
```

The frontend also provides `build`, `lint` and `preview` scripts through Vite.

## Backend

The Flask backend is implemented in `thread-manage/src/threads_api.py`.

Configure credentials through environment variables rather than committing secrets to the repository.

```text
THREADS_API_ACCESS_TOKEN
GOOGLE_CREDENTIALS_PATH
FLASK_AUTH_TOKEN
FLASK_DEBUG
```

## Repository Hygiene

Python virtual environments and generated frontend artifacts should remain local and must not be committed. The root `.gitignore` protects future commits from common Python, Node.js, IDE and secret files.

> Note: files already tracked by Git are not removed merely by adding a `.gitignore`. Existing tracked virtual-environment files should be removed from Git tracking in a dedicated cleanup commit.

## Portfolio Context

This repository represents the **Social Publishing / API Integration** track of my portfolio. It demonstrates a lightweight automation architecture that combines a modern frontend, a Python API and external SaaS APIs.

## Security Notes

- Do not commit access tokens or Google service-account credentials.
- Keep secrets in environment variables or an appropriate secret-management service.
- Review external API endpoint and authentication requirements against the current provider documentation before production use.
