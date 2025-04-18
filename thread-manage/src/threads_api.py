# threads_api.py
# このファイルはFlaskアプリケーションを定義し、Threads APIとGoogle Sheets APIを使用してデータを処理します。

import requests
from flask import Flask, request, jsonify
import gspread
from oauth2client.service_account import ServiceAccountCredentials
import os
import logging

app = Flask(__name__)

# ロギングの設定
# INFOレベルでログを記録します。
logging.basicConfig(level=logging.INFO)

# 環境変数からアクセストークンを安全にロード
# THREADS_API_ACCESS_TOKENは環境変数から取得されます。
ACCESS_TOKEN = os.getenv('THREADS_API_ACCESS_TOKEN')

# Google Sheets APIの認証
# Google SheetsとDrive APIのスコープを設定
scope = ["https://spreadsheets.google.com/feeds", "https://www.googleapis.com/auth/drive"]

# 認証情報のパスを環境変数からロード
# GOOGLE_CREDENTIALS_PATHは環境変数から取得されます。
creds_path = os.getenv('GOOGLE_CREDENTIALS_PATH', 'path/to/credentials.json')
creds = ServiceAccountCredentials.from_json_keyfile_name(creds_path, scope)
client = gspread.authorize(creds)

@app.route('/post', methods=['POST'])
def post():
    # POSTリクエストからJSONデータを取得
    data = request.get_json()
    post_content = data.get('postContent', 'default value or handle error')
    
    # postContentが存在しない場合のエラーハンドリング
    if not post_content:
        return jsonify({"status": "error", "message": "postContent is required"}), 400
    
    # アカウントを使用せずにロジックを実装
    # 例: post_to_threads(post_content)
    
    return jsonify({"status": "success", "message": "Post and reply processed"})

# Threads APIに投稿する関数
def post_to_threads(account, post_content):
    # 投稿用のURLを構築
    url = f"https://api.threads.com/{account}/posts"
    headers = {
        "Authorization": "Bearer YOUR_ACCESS_TOKEN",
        "Content-Type": "application/json"
    }
    payload = {
        "content": post_content
    }
    
    # post_to_threadsのエラーハンドリングとロギング
    try:
        response = requests.post(url, json=payload, headers=headers)
        response.raise_for_status()
        logging.info(f"Post successful: {response.json()}")
        return response.json()
    except requests.exceptions.RequestException as e:
        logging.error(f"Error posting to threads: {e}")
        return {"status": "error", "message": str(e)}

# Threads APIに返信する関数
def reply_to_threads(account, reply_content):
    # 返信用のURLを構築
    url = f"https://api.threads.com/{account}/replies"
    headers = {
        "Authorization": "Bearer YOUR_ACCESS_TOKEN",
        "Content-Type": "application/json"
    }
    payload = {
        "content": reply_content
    }
    
    # replyContentが存在しない場合のエラーハンドリング
    if not reply_content:
        return jsonify({"status": "error", "message": "replyContent is required"}), 400
    
    # reply_to_threadsのエラーハンドリングとロギング
    try:
        response = requests.post(url, json=payload, headers=headers)
        response.raise_for_status()
        logging.info(f"Reply successful: {response.json()}")
        return response.json()
    except requests.exceptions.RequestException as e:
        logging.error(f"Error replying to threads: {e}")
        return {"status": "error", "message": str(e)}

# Flaskエンドポイントに認証を追加（シンプルトークンを使用した例）
@app.before_request
def authenticate():
    # リクエストヘッダーからトークンを取得
    token = request.headers.get('Authorization')
    if token != f"Bearer {os.getenv('FLASK_AUTH_TOKEN')}":
        return jsonify({"status": "error", "message": "Unauthorized"}), 401

# 開発環境でFlaskをデバッグモードで実行
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080, debug=os.getenv('FLASK_DEBUG', 'false').lower() == 'true')

