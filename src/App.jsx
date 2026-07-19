import { useState } from "react";

const colors = {
  bg: "#f1f0ee",
  card: "#f7f6f4",
  border: "#dcdad6",
  gold: "#b8863b",
  goldSoft: "#c9a05e",
  text: "#1a1a1a",
  muted: "#8a8a86",
};

export default function TodoMain({ userName = "MITSUKI", onLogout }) {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

  const remaining = tasks.filter((t) => !t.done).length;
  const canAdd = input.trim().length > 0;

  const addTask = () => {
    if (!canAdd) return;
    setTasks([...tasks, { id: Date.now(), text: input.trim(), done: false }]);
    setInput("");
  };

  const toggleTask = (id) =>
    setTasks(tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));

  const deleteTask = (id) => setTasks(tasks.filter((t) => t.id !== id));

  const inputStyle = {
    flex: 1,
    boxSizing: "border-box",
    padding: "14px 16px",
    fontSize: 14,
    border: `1px solid ${colors.border}`,
    borderRadius: 6,
    background: "#fdfcfa",
    outline: "none",
    fontFamily: "inherit",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: colors.bg,
        padding: "32px 16px",
        fontFamily:
          '"Hiragino Kaku Gothic ProN", "Hiragino Sans", "Yu Gothic", "Meiryo", sans-serif',
        color: colors.text,
        boxSizing: "border-box",
      }}
    >
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        {/* ヘッダー */}
        <header
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            paddingBottom: 24,
            borderBottom: `1px solid ${colors.border}`,
          }}
        >
          {/* イニシャルロゴ */}
          <div
            style={{
              width: 52,
              height: 52,
              border: `1px solid ${colors.gold}`,
              borderRadius: 8,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: colors.card,
              flexShrink: 0,
            }}
          >
            <span
              style={{
                fontFamily: 'Georgia, "Times New Roman", serif',
                fontSize: 22,
                color: colors.gold,
              }}
            >
              {userName.charAt(0).toUpperCase()}
            </span>
          </div>

          <div style={{ flex: 1, minWidth: 0 }}>
            <div
              style={{
                fontFamily: 'Georgia, "Times New Roman", serif',
                fontSize: 20,
                letterSpacing: "0.04em",
              }}
            >
              {userName}
            </div>
            <div style={{ fontSize: 13, color: colors.muted, marginTop: 2 }}>
              さんのTodo
            </div>
          </div>

          <button
            onClick={onLogout}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "12px 18px",
              fontSize: 14,
              background: "#fdfcfa",
              border: `1px solid ${colors.border}`,
              borderRadius: 6,
              cursor: "pointer",
              color: colors.text,
              fontFamily: "inherit",
            }}
          >
            <span aria-hidden="true">[→</span>
            ログアウト
          </button>
        </header>

        {/* タスク入力 */}
        <div style={{ display: "flex", gap: 12, marginTop: 32 }}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTask()}
            placeholder="新しいタスクを入力..."
            style={inputStyle}
            onFocus={(e) => (e.target.style.borderColor = colors.gold)}
            onBlur={(e) => (e.target.style.borderColor = colors.border)}
          />
          <button
            onClick={addTask}
            disabled={!canAdd}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "0 22px",
              fontSize: 14,
              border: `1px solid ${canAdd ? colors.gold : colors.border}`,
              borderRadius: 6,
              background: canAdd ? colors.gold : "transparent",
              color: canAdd ? "#fff" : colors.goldSoft,
              cursor: canAdd ? "pointer" : "default",
              transition: "all 0.15s ease",
              fontFamily: "inherit",
              flexShrink: 0,
            }}
          >
            <span style={{ fontSize: 16 }}>+</span>
            追加
          </button>
        </div>

        {/* 残り件数 */}
        <div
          style={{
            textAlign: "right",
            fontSize: 13,
            color: colors.muted,
            margin: "16px 0",
          }}
        >
          残り <span style={{ color: colors.gold }}>{remaining}</span> 件
        </div>

        {/* タスクリスト / 空状態 */}
        <div
          style={{
            background: colors.card,
            border: `1px solid ${colors.border}`,
            borderRadius: 6,
            minHeight: 160,
          }}
        >
          {tasks.length === 0 ? (
            <div style={{ textAlign: "center", padding: "56px 24px" }}>
              <div style={{ fontSize: 16, fontWeight: 600 }}>
                タスクはまだありません
              </div>
              <div
                style={{ fontSize: 13, color: colors.muted, marginTop: 12 }}
              >
                上の入力欄から追加しましょう
              </div>
            </div>
          ) : (
            <ul style={{ listStyle: "none", margin: 0, padding: 8 }}>
              {tasks.map((task) => (
                <li
                  key={task.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: "12px 12px",
                    borderBottom: `1px solid ${colors.border}`,
                  }}
                >
                  <button
                    onClick={() => toggleTask(task.id)}
                    aria-label={task.done ? "未完了に戻す" : "完了にする"}
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: 4,
                      border: `1.5px solid ${
                        task.done ? colors.gold : colors.border
                      }`,
                      background: task.done ? colors.gold : "transparent",
                      color: "#fff",
                      fontSize: 12,
                      lineHeight: 1,
                      cursor: "pointer",
                      flexShrink: 0,
                    }}
                  >
                    {task.done ? "✓" : ""}
                  </button>
                  <span
                    style={{
                      flex: 1,
                      fontSize: 14,
                      color: task.done ? colors.muted : colors.text,
                      textDecoration: task.done ? "line-through" : "none",
                    }}
                  >
                    {task.text}
                  </span>
                  <button
                    onClick={() => deleteTask(task.id)}
                    aria-label="削除"
                    style={{
                      border: "none",
                      background: "transparent",
                      color: colors.muted,
                      fontSize: 16,
                      cursor: "pointer",
                      padding: 4,
                    }}
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* フッター */}
        <footer
          style={{
            marginTop: 40,
            paddingTop: 24,
            borderTop: `1px solid ${colors.border}`,
            textAlign: "center",
            fontSize: 12,
            color: colors.muted,
          }}
        >
          保存先:AWS RDS(このプロトタイプではブラウザに保存)
        </footer>
      </div>
    </div>
  );
}
