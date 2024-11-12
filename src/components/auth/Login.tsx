import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { fetchLogin } from "../../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";
// import { io } from "../../../../server/src/app.ts"; // ייבוא ה-io מהשרת
// import { io } from "socket.io-client"; // ייבוא Socket.IO ללקוח


// const socket = io("http://localhost:3000"); // התחברות לשרת


export default function Login() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (!user?._id) {
      // io.emit("connection");
      return;
    }
    navigate("/votes");
  }, [user]);

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
      <button onClick={() => dispatch(fetchLogin({ username, password }))}>
        Login
      </button>
    </div>
  );
}
