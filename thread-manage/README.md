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

## 詳細設計

### 概要

このプロジェクトは、React、TypeScript、Viteを使用したアプリケーションで、スプレッドシートのようなインターフェースを通じてデータを管理し、投稿することができます。バックエンドAPIと連携してデータ操作を行います。

### コンポーネント

#### スプレッドシートコンポーネント

- **目的**: アカウントと投稿内容のユーザー入力を管理し、APIとのやり取りを可能にします。
- **状態管理**: Reactの`useState`を使用してデータの行を管理します。
- **データ構造**: 各行は、アカウント詳細と投稿内容のプロパティを持つオブジェクトです。

#### ボタン

- **PDF/CSVに出力**: テーブルの左上に配置され、データのエクスポートを可能にします。他のUI要素とデザインを統一しています。

### スタイリング

- **CSS**: アプリケーションは、統一感のある外観を確保するために、中央集約されたCSSファイル（`spread_sheet.css`）を使用しています。
- **デザインの一貫性**: ボタンとテーブル要素は、アプリケーション全体で統一された外観を維持するようにスタイリングされています。

### API統合

- **Axios**: バックエンドAPIへのHTTPリクエストを行うために使用されます。
- **エンドポイント**: 
  - `/post`: アカウントへのデータ投稿を処理します。
  - `/reply`: 自動返信機能を管理します。

### 主な機能

- **行の追加**: ユーザーは動的に行を追加して、複数のアカウントと投稿を入力できます。
- **データの編集**: すべてのセルでインライン編集がサポートされています。
- **データの投稿**: APIにデータを送信します。
- **自動返信**: 投稿内容に特定のキーワードが含まれている場合、自動で返信します。
- **データのエクスポート**:
  - **CSVエクスポート**: 「CSV」ボタンをクリックすると、スプレッドシートのデータがCSV形式でエクスポートされ、ダウンロードが開始されます。
  - **PDFエクスポート**: 「PDF」ボタンをクリックすると、スプレッドシートのデータがPDF形式でエクスポートされ、ダウンロードが開始されます。

### ソート機能

- **アカウントとビジ垢のソート**: テーブルの「アカウント」および「ビジ垢」列のヘッダーをクリックすると、データが昇順または降順にソートされます。ソートの方向は、ヘッダーに表示される矢印（▲または▼）で示されます。

#### 使用方法

1. **ソートの実行**: 「アカウント」または「ビジ垢」列のヘッダーをクリックします。これにより、該当する列のデータがソートされます。
2. **ソート方向の確認**: ヘッダーに表示される矢印で現在のソート方向を確認できます。▲は昇順、▼は降順を示します。

この機能により、ユーザーはデータを簡単に整理し、必要な情報を迅速に見つけることができます。

### 技術的詳細

- **UUID**: 各行に一意の識別子が割り当てられ、効率的なReactレンダリングを実現します。
- **レスポンシブデザイン**: テーブルとボタンは、異なる画面サイズに適応するように設計されています。

### 使用方法

1. **行の追加**: 「Add Row」ボタンをクリックして新しい行を追加します。
2. **データの入力**: セルに直接アカウントと投稿の詳細を入力します。
3. **投稿**: 「Post to Accounts」ボタンを使用してデータをAPIに送信します。
4. **自動返信**: 「Auto Reply」ボタンをクリックして、内容に基づく自動返信をトリガーします。
5. **CSVエクスポート**: テーブルの左上にある「CSV」ボタンをクリックします。これにより、現在のスプレッドシートデータがCSVファイルとしてダウンロードされます。
6. **PDFエクスポート**: テーブルの左上にある「PDF」ボタンをクリックします。これにより、現在のスプレッドシートデータがPDFファイルとしてダウンロードされます。

この詳細設計により、アプリケーションは機能的でユーザーフレンドリーなデータ管理と投稿の体験を提供します。
