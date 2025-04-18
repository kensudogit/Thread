# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```

## Threadパッケージの生成手順

Threadパッケージを生成するには、以下の手順に従ってください：

1. 必要な依存関係をインストールします。
   ```bash
   pip install -r requirements.txt
   ```

2. 環境変数を設定します。以下の変数を設定する必要があります：
   - `THREADS_API_ACCESS_TOKEN`: Threads APIにアクセスするためのトークン。
   - `GOOGLE_CREDENTIALS_PATH`: Google Sheets APIの認証情報へのパス。
   - `FLASK_AUTH_TOKEN`: Flaskアプリケーションの認証に使用するトークン。

3. Flaskアプリケーションを起動します。
   ```bash
   python src/threads_api.py
   ```

4. アプリケーションが起動したら、`http://localhost:8080`でアクセスできます。

これで、Threadパッケージの生成が完了です。

## スプレッドシートコンポーネントの実装

このプロジェクトには、Reactを使用して実装されたスプレッドシートコンポーネントが含まれています。このコンポーネントは、ユーザーがアカウント情報や投稿内容を入力し、Threads APIを通じて投稿を行うことができます。

### 主な機能

- **行の追加**: ユーザーは新しい行を追加して、複数のアカウント情報や投稿内容を管理できます。
- **データの編集**: 各セルは編集可能で、ユーザーはアカウントや投稿内容を直接入力できます。
- **投稿機能**: 入力されたデータをThreads APIに送信し、指定されたアカウントに投稿します。
- **自動返信機能**: 投稿内容に特定のキーワードが含まれている場合、自動で返信を行います。

### 使用方法

1. **行の追加**: "Add Row"ボタンをクリックして新しい行を追加します。
2. **データの入力**: 各セルにアカウント情報や投稿内容を入力します。
3. **投稿**: "Post to Accounts"ボタンをクリックして、入力されたデータをThreads APIに送信します。
4. **自動返信**: "Auto Reply"ボタンをクリックして、投稿内容に基づいて自動返信を行います。

### 技術的詳細

- **UUID**: 各行には一意のIDが付与され、Reactのキーとして使用されます。
- **Axios**: HTTPリクエストを送信するために使用されます。
- **CSS**: コンポーネントのスタイリングには、`spread_sheet.css`が使用されています。

このコンポーネントは、ユーザーが簡単にデータを管理し、APIを通じて操作を行うための便利なツールです。
