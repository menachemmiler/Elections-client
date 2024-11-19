import Nav from "./components/Nav";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Votes from "./components/pages/Votes";
import Statistics from "./components/pages/Statistics";
import { useEffect } from "react";
import { socket } from "./main";
import { useAppDispatch, useAppSelector } from "./redux/store";
import { updateCandidates } from "./redux/slices/candidatesSlice";
import SettingsPage from "./components/pages/SettingsPage";

export default function App() {
  const dispatch = useAppDispatch();
  const { theme } = useAppSelector((state) => state.settings);

  useEffect(() => {
    socket.on("updateCandidate", (newCandidate) => {
      dispatch(updateCandidates(newCandidate));
    });
    console.log({ theme });
  }, []);

  return (
    <div className={`${theme}`}>
      <Nav />
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="setting" element={<SettingsPage />} />
        <Route path="votes" element={<Votes />} />
        <Route path="statistics" element={<Statistics />} />
        <Route path="/" element={<Navigate to={"/login"} />} />
      </Routes>
    </div>
  );
}
