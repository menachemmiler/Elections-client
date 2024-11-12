import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { fetchCandidates, updateCandidates } from "../../redux/slices/candidatesSlice";
import { ICandidate } from "../../types/candidates";
import { socket } from "../../main";

export default function Statistics() {
  const { user } = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  const { candidates } = useAppSelector((state) => state.candidates);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user?._id && !user?.isAdmin) navigate("/votes");
    if (!user?._id) navigate("/login");
    dispatch(fetchCandidates());
  }, [user]);


  return (
    <div className={`vote-list`}>
      {candidates.length &&
        candidates.map((candidate: ICandidate) => (
          <div key={candidate._id}>
            {candidate.name} = {candidate.votes}
          </div>
        ))}
    </div>
  );
}
