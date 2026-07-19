import { useEffect, useState } from "react";
import { getCurrentUser } from "aws-amplify/auth";
import TodoAuth from "./TodoAuth";
import TodoMain from "./TodoMain";

export default function App() {
  const [authed, setAuthed] = useState(null); // null=確認中, false=未ログイン, true=ログイン済

  useEffect(() => {
    getCurrentUser()
      .then(() => setAuthed(true))
      .catch(() => setAuthed(false));
  }, []);

  if (authed === null) return null; // 認証確認中は何も表示しない
  
  return authed ? (
    <TodoMain onLogout={() => setAuthed(false)} />
  ) : (
    <TodoAuth onLogin={() => setAuthed(true)} />
  );
}