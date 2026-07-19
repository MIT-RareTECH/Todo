import { useState } from "react";
import TodoAuth from "./TodoAuth";
import TodoMain from "./TodoMain";

export default function App() {
  const [user, setUser] = useState(null);

  return user ? (
    <TodoMain userName={user} onLogout={() => setUser(null)} />
  ) : (
    <TodoAuth onLogin={(name) => setUser(name)} />
  );
}
