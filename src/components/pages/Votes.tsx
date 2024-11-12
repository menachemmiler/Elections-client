import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import VoteCard from "./VoteCard";
import { ICandidate } from "../../types/candidates";
import { fetchCandidates } from "../../redux/slices/candidatesSlice";
import { DataStatus } from "../../types/redux";

export default function Votes() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);
  const { candidates, status: candidateStatus } = useAppSelector(
    (state) => state.candidates
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?._id) {
      navigate("/login");
    }
    dispatch(fetchCandidates());
  }, []);

  if (candidateStatus == DataStatus.LOADING) {
    return <div>loading...</div>;
  }

  return (
    <div className={`vote-list`}>
      {candidates.length &&
        candidates.map((candidate: ICandidate) => (
          <VoteCard key={candidate._id} candidate={candidate} />
        ))}
    </div>
  );
}
