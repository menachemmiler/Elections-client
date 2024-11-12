import Nav from "./components/Nav";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Votes from "./components/pages/Votes";
import Statistics from "./components/pages/Statistics";
import { useEffect } from "react";
import { socket } from "./main";
import { useAppDispatch } from "./redux/store";
import { updateCandidates } from "./redux/slices/candidatesSlice";






export default function App() {
  const dispatch = useAppDispatch();

    useEffect(() => {
    socket.on("updateCandidate", (newCandidate) => {
      // console.log("New candidate list received:", newCandidate);
      dispatch(updateCandidates(newCandidate)); 
    });
  }, []);


  return (
    <div>
      <Nav />
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="votes" element={<Votes />} />
        <Route path="statistics" element={<Statistics />} />
        <Route path="/" element={<Navigate to={"/login"} />} />
      </Routes>
     
    </div>
  );
}
