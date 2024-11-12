import { socket } from "../../main";
import { updateUser } from "../../redux/slices/userSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { ICandidate } from "../../types/candidates";

interface props {
  candidate: ICandidate;
}

export default function VoteCard({ candidate }: props) {
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const handleVote = async () => {
    if (!user) return;
    console.log(`${user?.username} vote fore ${candidate.name}`);
    const Authorization = localStorage.getItem("Authorization");
    try {
      const res = await fetch("http://localhost:2222/api/votes", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: Authorization!,
        },
        body: JSON.stringify({ candidateId: candidate._id, userId: user._id }),
      });
      if (!res.ok) throw new Error(`${(res as any).message}`);
      socket.emit(
        "newVote",
        localStorage.getItem("Authorization")!,
        (response: { status: string; user: any; message: any }) => {
          if (response.status === "success") {
            dispatch(updateUser(response.user));
          } else {
            console.error("Error:", response.message);
          }
        }
      );
    } catch (err: any) {
      console.log(err.message);
    }
  };

  return (
    <div className={`vote-card ${user?.votedFor == candidate._id}`}>
      <h1>{candidate.name}</h1>
      <button onClick={handleVote}>VOTE</button>
      <img src={`${candidate.image}`} alt={`${candidate.name} img`} />
    </div>
  );
}
