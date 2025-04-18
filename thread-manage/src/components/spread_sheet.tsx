import React, { useState } from 'react';
import axios from 'axios';
import './spread_sheet.css';
import { v4 as uuidv4 } from 'uuid';

// Define a type for the spreadsheet row
interface SpreadsheetRow {
  id: string;
  account: string;
  label: string;
  postContentA: string;
  postContentB: string;
  postContentC: string;
}

// Update the API endpoint to point to the Flask server
const API_ENDPOINT = 'http://localhost:8080/post'; // Assuming the Flask server runs locally on port 8080
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
  const [rows, setRows] = useState<SpreadsheetRow[]>(
    Array.from({ length: 50 }, () => ({
      id: uuidv4(),
      account: '',
      label: '',
      postContentA: '',
      postContentB: '',
      postContentC: ''
    }))
  );

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

  // 新しい行を追加する関数
  const addRow = () => {
    setRows([...rows, { id: uuidv4(), account: '', label: '', postContentA: '', postContentB: '', postContentC: '' }]);
  };

  // 行のデータを更新する関数
  const updateRow = (id: string, field: keyof SpreadsheetRow, value: string) => {
    const newRows = [...rows];
    const index = newRows.findIndex(row => row.id === id);
    if (index !== -1) {
      newRows[index][field] = value;
    }
    setRows(newRows);
  };

  return (
    <div>
      
      <p>{statusMessage}</p>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Account</th>
              <th>Label</th>
              <th>Post Content A</th>
              <th>Post Content B</th>
              <th>Post Content C</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id}>
                <td><input value={row.account} onChange={(e) => updateRow(row.id, 'account', e.target.value)} /></td>
                <td><input value={row.label} onChange={(e) => updateRow(row.id, 'label', e.target.value)} /></td>
                <td><input value={row.postContentA} onChange={(e) => updateRow(row.id, 'postContentA', e.target.value)} /></td>
                <td><input value={row.postContentB} onChange={(e) => updateRow(row.id, 'postContentB', e.target.value)} /></td>
                <td><input value={row.postContentC} onChange={(e) => updateRow(row.id, 'postContentC', e.target.value)} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SpreadSheet;
