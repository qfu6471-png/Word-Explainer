// ==================== 配置 ====================
const API_KEY = "Bearer abcd1234567890"; // abcd1234567890替换为你的真实Key
const API_URL = "https://api.deepseek.com/v1/chat/completions";
const MODEL = "deepseek-chat";

// ==================== 状态 ====================
let isRequesting = false;
let selectedText = "";
let isTextSelected = false;
let panel = null;

// ==================== 创建面板 ====================
function createPanel() {
  if (panel) return panel;

  panel = document.createElement("div");
  panel.id = "word-explain-panel";
  panel.style.cssText = `
    position: fixed !important;
    top: 20px !important;
    right: 20px !important;
    width: 320px !important;
    background: #fff !important;
    border: 1px solid #ccc !important;
    border-radius: 8px !important;
    padding: 12px !important;
    box-shadow: 0 2px 10px rgba(0,0,0,0.2) !important;
    z-index: 99999999 !important;
    font-size: 14px !important;
    line-height: 1.5 !important;
    display: none !important;
    color: #333 !important;
  `;

  const title = document.createElement("div");
  title.innerText = "划词解释";
  title.style.marginBottom = "8px";
  title.style.fontWeight = "bold";

  const content = document.createElement("div");
  content.id = "word-explain-content";
  content.style.minHeight = "60px";

  panel.append(title, content);
  document.body.appendChild(panel);
  return panel;
}

// ==================== 关闭弹窗 ====================
function closePanel() {
  if (panel) panel.style.display = "none";
}

// ==================== 查询解释（带详细日志） ====================
async function doExplain(text) {
  if (isRequesting || !text) return;
  isRequesting = true;

  const p = createPanel();
  const c = document.getElementById("word-explain-content");
  p.style.display = "block";
  c.innerText = "正在查询...";

  try {
    console.log("【日志1】准备调用API，文本：", text);
    console.log("【日志2】API Key（前10位）：", API_KEY.substring(0, 10) + "...");
    
    // 发起请求
    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": API_KEY
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          { role: "system", content: "简洁解释，150字内，通俗易懂" },
          { role: "user", content: `解释：${text}` }
        ],
        temperature: 0.3,
        max_tokens: 150
      })
    });

    console.log("【日志3】响应状态码：", res.status);
    console.log("【日志4】响应头部：", Object.fromEntries(res.headers.entries()));
    
    // 解析响应
    const data = await res.json();
    console.log("【日志5】API返回完整数据：", data);

    // 处理结果
    if (res.status === 200) {
      c.innerText = data.choices?.[0]?.message?.content || "暂无解释（无返回内容）";
    } else {
      c.innerText = `请求失败：${res.status} - ${data.error?.message || "未知错误"}`;
    }
  } catch (e) {
    console.error("【日志6】请求异常：", e);
    c.innerText = `请求异常：${e.message}`;
  } finally {
    isRequesting = false;
  }
}

// ==================== 记录选中的文字 ====================
document.addEventListener("mouseup", () => {
  setTimeout(() => {
    selectedText = window.getSelection().toString().trim();
    isTextSelected = selectedText.length >= 2;
    console.log("【日志0】选中文本：", selectedText);
  }, 50);
}, true);

// ==================== 右键触发解释 ====================
document.addEventListener("contextmenu", e => {
  if (isTextSelected) {
    e.preventDefault();
    doExplain(selectedText);
    window.getSelection().removeAllRanges();
    selectedText = "";
    isTextSelected = false;
  }
}, true);

// ==================== 点击任意位置关闭弹窗 ====================
document.addEventListener("click", e => {
  if (panel && panel.style.display === "block" && !panel.contains(e.target)) {
    closePanel();
  }
}, true);

// ==================== 初始化 ====================
window.addEventListener("load", createPanel);

console.log("✅ 带日志版划词解释已加载，按F12查看控制台日志");
