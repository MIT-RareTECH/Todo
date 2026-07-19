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

export default function TodoAuth() {
  const [mode, setMode] = useState("login"); // "login" | "register"
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const canSubmit = name.trim().length > 0 && password.length >= 4;
  const submitLabel = mode === "login" ? "ログイン" : "新規登録";

  const handleSubmit = () => {
    if (!canSubmit) return;
    // ここに認証処理を実装
    console.log({ mode, name, password });
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: colors.bg,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "48px 16px",
        fontFamily:
          '"Hiragino Kaku Gothic ProN", "Hiragino Sans", "Yu Gothic", "Meiryo", sans-serif',
        color: colors.text,
      }}
    >
      {/* ロゴ */}
      <div
        style={{
          width: 64,
          height: 64,
          border: `1px solid ${colors.gold}`,
          borderRadius: 8,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: colors.card,
        }}
      >
        <span
          style={{
            fontFamily: 'Georgia, "Times New Roman", serif',
            fontSize: 28,
            color: colors.gold,
          }}
        >
          T
        </span>
      </div>

      {/* タイトル */}
      <h1
        style={{
          fontFamily: 'Georgia, "Times New Roman", serif',
          fontSize: 44,
          fontWeight: 400,
          margin: "24px 0 8px",
          letterSpacing: "0.02em",
        }}
      >
        Todo
      </h1>
      <p style={{ margin: 0, fontSize: 14, color: colors.muted }}>
        ログインして始めましょう
      </p>

      {/* カード */}
      <div
        style={{
          width: "100%",
          maxWidth: 500,
          marginTop: 40,
          padding: 24,
          background: colors.card,
          border: `1px solid ${colors.border}`,
          borderRadius: 6,
          boxSizing: "border-box",
        }}
      >
        {/* タブ切り替え */}
        <div
          style={{
            display: "flex",
            border: `1px solid ${colors.border}`,
            borderRadius: 6,
            overflow: "hidden",
            marginBottom: 24,
          }}
        >
          {[
            { key: "login", label: "ログイン" },
            { key: "register", label: "新規登録" },
          ].map((tab) => {
            const active = mode === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setMode(tab.key)}
                style={{
                  flex: 1,
                  padding: "12px 0",
                  fontSize: 14,
                  cursor: "pointer",
                  background: active ? "#fdfcfa" : "transparent",
                  color: active ? colors.gold : colors.text,
                  border: "none",
                  boxShadow: active
                    ? `inset 0 0 0 1.5px ${colors.gold}`
                    : "none",
                  borderRadius: active ? 5 : 0,
                  fontFamily: "inherit",
                }}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* お名前 */}
        <label
          style={{
            display: "block",
            fontSize: 12,
            marginBottom: 8,
            color: colors.text,
          }}
        >
          お名前
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="例:田中 太郎"
          style={{
            width: "100%",
            boxSizing: "border-box",
            padding: "14px 16px",
            fontSize: 14,
            border: `1px solid ${colors.border}`,
            borderRadius: 6,
            background: "#fdfcfa",
            outline: "none",
            marginBottom: 20,
            fontFamily: "inherit",
          }}
          onFocus={(e) => (e.target.style.borderColor = colors.gold)}
          onBlur={(e) => (e.target.style.borderColor = colors.border)}
        />

        {/* パスワード */}
        <label
          style={{
            display: "block",
            fontSize: 12,
            marginBottom: 8,
            color: colors.text,
          }}
        >
          パスワード
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="4文字以上"
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          style={{
            width: "100%",
            boxSizing: "border-box",
            padding: "14px 16px",
            fontSize: 14,
            border: `1px solid ${colors.border}`,
            borderRadius: 6,
            background: "#fdfcfa",
            outline: "none",
            marginBottom: 24,
            fontFamily: "inherit",
          }}
          onFocus={(e) => (e.target.style.borderColor = colors.gold)}
          onBlur={(e) => (e.target.style.borderColor = colors.border)}
        />

        {/* 送信ボタン */}
        <button
          onClick={handleSubmit}
          disabled={!canSubmit}
          style={{
            width: "100%",
            padding: "14px 0",
            fontSize: 14,
            borderRadius: 6,
            border: `1px solid ${canSubmit ? colors.gold : colors.border}`,
            background: canSubmit ? colors.gold : "transparent",
            color: canSubmit ? "#fff" : colors.goldSoft,
            cursor: canSubmit ? "pointer" : "default",
            transition: "all 0.15s ease",
            fontFamily: "inherit",
          }}
        >
          {submitLabel}
        </button>
      </div>

      {/* フッター */}
      <p style={{ marginTop: 28, fontSize: 12, color: colors.muted }}>
        アカウントごとにTodoが保存されます
      </p>
    </div>
  );
}
