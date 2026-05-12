const noteArea = document.getElementById('note');
const saveStatus = document.getElementById('save-status');

// 页面加载时读取之前保存的内容
window.addEventListener('DOMContentLoaded', () => {
  const savedNote = localStorage.getItem('my-note');
  if (savedNote) {
    noteArea.value = savedNote;
  }
});

// 输入内容时自动保存（防抖，避免高频写入）
let timeout;
noteArea.addEventListener('input', () => {
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    localStorage.setItem('my-note', noteArea.value);
    saveStatus.textContent = '✅ 已自动保存';
    setTimeout(() => saveStatus.textContent = '', 1500);
  }, 300);
});
// 在 app.js 末尾追加
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js')
      .then(registration => {
        console.log('Service Worker 注册成功:', registration.scope);
      })
      .catch(error => {
        console.log('Service Worker 注册失败:', error);
      });
  });
}
