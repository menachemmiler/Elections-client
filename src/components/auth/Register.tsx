import { useState } from "react";
import { useAppDispatch } from "../../redux/store";
import { fetchRegister } from "../../redux/slices/userSlice";

export default function Register() {
  const dispatch = useAppDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);


  return (
    <div>
      <input
        type="text"
        placeholder="User Name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input type="checkbox" onClick={() => setIsAdmin(!isAdmin)} />
      <button
        onClick={() => {
          dispatch(fetchRegister({ username, password, isAdmin }));
        }}
      >
        Register
      </button>
    </div>
  );
}
