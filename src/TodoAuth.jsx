import { useState } from "react";
import { signIn, signUp, confirmSignUp } from "aws-amplify/auth";

const colors = {
  bg: "#f1f0ee",
  card: "#f7f6f4",
  border: "#dcdad6",
  gold: "#b8863b",
  goldSoft: "#c9a05e",
  text: "#1a1a1a",
  muted: "#8a8a86",
  error: "#b0413e",
};

const inputStyle = {
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
};

const labelStyle = {
  display: "block",
  fontSize: 12,
  marginBottom: 8,
  color: colors.text,
};

export default function TodoAuth({ onLogin = () => {} }) {
  const [mode, setMode] = useState("login"); // "login" | "register" | "confirm"
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const canSubmit =
    mode === "confirm"
      ? code.trim().length > 0
      : email.trim().length > 0 &&
        password.length >= 8 &&
        (mode === "login" || name.trim().length > 0);

  const submitLabel =
    mode === "login" ? "ログイン" : mode === "register" ? "新規登録" : "確認";

  const handleSubmit = async () => {
    if (!canSubmit || loading) return;
    setError("");
    setLoading(true);
    try {
      if (mode === "login") {
        await signIn({ username: email.trim(), password });
        onLogin();
      } else if (mode === "register") {
        await signUp({
          username: email.trim(),
          password,
          options: {
            userAttributes: {
              email: email.trim(),
              name: name.trim(),
            },
          },
        });
        setMode("confirm"); // メールに届いた確認コードの入力へ
      } else if (mode === "confirm") {
        await confirmSignUp({
          username: email.trim(),
          confirmationCode: code.trim(),
        });
        await signIn({ username: email.trim(), password });
        onLogin();
      }
    } catch (e) {
      const messages = {
        UserNotFoundException: "このメールアドレスは登録されていません",
        NotAuthorizedException: "メールアドレスまたはパスワードが違います",
        UsernameExistsException: "このメールアドレスは既に登録されています",
        CodeMismatchException: "確認コードが正しくありません",
        InvalidPasswordException:
          "パスワードの要件を満たしていません(8文字以上)",
        UserNotConfirmedException: "メールの確認が完了していません",
      };
      if (e.name === "UserNotConfirmedException") setMode("confirm");
      setError(messages[e.name] || e.message || "エラーが発生しました");
    } finally {
      setLoading(false);
    }
  };

  const focusGold = (e) => (e.target.style.borderColor = colors.gold);
  const blurGray = (e) => (e.target.style.borderColor = colors.border);
  const onEnter = (e) => e.key === "Enter" && handleSubmit();

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
        boxSizing: "border-box",
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
        {mode === "confirm"
          ? "メールに届いた確認コードを入力してください"
          : "ログインして始めましょう"}
      </p>

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
        {mode !== "confirm" && (
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
                  onClick={() => {
                    setMode(tab.key);
                    setError("");
                  }}
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
        )}

        {mode === "register" && (
          <>
            <label style={labelStyle}>お名前</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="例:田中 太郎"
              style={inputStyle}
              onFocus={focusGold}
              onBlur={blurGray}
            />
          </>
        )}

        {mode !== "confirm" ? (
          <>
            <label style={labelStyle}>メールアドレス</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="例:mitsuki@example.com"
              style={inputStyle}
              onFocus={focusGold}
              onBlur={blurGray}
            />

            <label style={labelStyle}>パスワード</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="8文字以上"
              onKeyDown={onEnter}
              style={inputStyle}
              onFocus={focusGold}
              onBlur={blurGray}
            />
          </>
        ) : (
          <>
            <label style={labelStyle}>確認コード</label>
            <input
              type="text"
              inputMode="numeric"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="例:123456"
              onKeyDown={onEnter}
              style={inputStyle}
              onFocus={focusGold}
              onBlur={blurGray}
            />
          </>
        )}

        {error && (
          <p
            style={{
              margin: "0 0 16px",
              fontSize: 13,
              color: colors.error,
            }}
          >
            {error}
          </p>
        )}

        <button
          onClick={handleSubmit}
          disabled={!canSubmit || loading}
          style={{
            width: "100%",
            padding: "14px 0",
            fontSize: 14,
            borderRadius: 6,
            border: `1px solid ${
              canSubmit && !loading ? colors.gold : colors.border
            }`,
            background: canSubmit && !loading ? colors.gold : "transparent",
            color: canSubmit && !loading ? "#fff" : colors.goldSoft,
            cursor: canSubmit && !loading ? "pointer" : "default",
            transition: "all 0.15s ease",
            fontFamily: "inherit",
          }}
        >
          {loading ? "処理中..." : submitLabel}
        </button>
      </div>

      <p style={{ marginTop: 28, fontSize: 12, color: colors.muted }}>
        アカウントごとにTodoが保存されます
      </p>
    </div>
  );
}