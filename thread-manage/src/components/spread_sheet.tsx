import React, { useState } from 'react';
import axios from 'axios';

// Define a type for the spreadsheet row
interface SpreadsheetRow {
  account: string;
  label: string;
  postContentA: string;
  postContentB: string;
  postContentC: string;
  linkLabel: string;
}

// Example API endpoint and token
const API_ENDPOINT = 'https://api.example.com/post';
const API_TOKEN = 'your_api_token_here';

// Function to post content to an account
const postToAccount = async (account: string, content: string) => {
  try {
    const response = await axios.post(API_ENDPOINT, {
      account,
      content,
    }, {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
    });
    console.log(`Posted to ${account}: ${response.data}`);
  } catch (error: any) {
    console.error(`Error posting to ${account}:`, error.response ? error.response.data : error.message);
  }
};

// Function to send an auto-reply
const autoReply = async (content: string) => {
  try {
    const response = await axios.post(`${API_ENDPOINT}/reply`, {
      content,
    }, {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
    });
    console.log(`Auto-replied: ${response.data}`);
  } catch (error: any) {
    console.error('Error sending auto-reply:', error.response ? error.response.data : error.message);
  }
};

// スプレッドシートのデータを管理し、投稿や自動返信を行うコンポーネント
const SpreadSheet = () => {
  const [rows, setRows] = useState<SpreadsheetRow[]>([
    // 初期データとしてのスプレッドシートの行
    { account: 'user1', label: 'label1', postContentA: 'Hello A', postContentB: 'Hello B', postContentC: 'Hello C', linkLabel: 'link1' },
    { account: 'user2', label: 'label2', postContentA: 'Hi A', postContentB: 'Hi B', postContentC: 'Hi C', linkLabel: 'link2' },
  ]);

  const [statusMessage, setStatusMessage] = useState('');

  // 各アカウントに対して投稿を行う関数
  const handlePost = async () => {
    try {
      await Promise.all(rows.map(row => {
        // 各投稿内容をアカウントに投稿
        return Promise.all([
          postToAccount(row.account, row.postContentA),
          postToAccount(row.account, row.postContentB),
          postToAccount(row.account, row.postContentC),
        ]);
      }));
      setStatusMessage('All posts were successful!'); // 成功メッセージを設定
    } catch (error: any) {
      console.error('Error during posting:', error);
      setStatusMessage('Some posts failed. Check the console for details.'); // エラーメッセージを設定
    }
  };

  // リプレイを検出し、自動返信を行う関数
  const handleAutoReply = () => {
    rows.forEach(row => {
      // 投稿内容Aに'reply'が含まれているかをチェック
      if (row.postContentA.includes('reply')) {
        autoReply('Thank you for your reply!'); // 定型文で返信
      }
    });
  };

  return (
    <div>
      <h1>Spreadsheet Operations</h1>
      <button onClick={handlePost}>Post to Accounts</button>
      <button onClick={handleAutoReply}>Auto Reply</button>
      <p>{statusMessage}</p>
    </div>
  );
};

export default SpreadSheet;
