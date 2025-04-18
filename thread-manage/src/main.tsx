// main.tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
function onEdit(e) {
    let sheet = e.source.getActiveSheet();
    let range = e.range;
    let row = range.getRow();
    let column = range.getColumn();
    
    // Assuming the "Status" column is the 4th column
    if (column == 4 && sheet.getName() == "Sheet1") {
      let status = sheet.getRange(row, column).getValue();
      if (status == "Pending") {
        let account = sheet.getRange(row, 1).getValue();
        let postContent = sheet.getRange(row, 2).getValue();
        let replyContent = sheet.getRange(row, 3).getValue();
        
        // Send HTTP request to Python backend
        let url = "YOUR_PYTHON_BACKEND_URL";
        let payload = {
          "account": account,
          "postContent": postContent,
          "replyContent": replyContent
        };
        
        fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(payload)
        })
        .then(response => response.json())
        .then(data => {
          console.log('Success:', data);
          // Update status to "Posted"
          sheet.getRange(row, column).setValue("Posted");
        })
        .catch((error) => {
          console.error('Error:', error);
        });
      }
    }
  }