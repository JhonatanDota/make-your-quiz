import { QuizModel } from "../models/QuizModel";
import Ratting from "./Ratting";
import { BsMortarboardFill, BsMortarboard } from "react-icons/bs";
import TagsList from "./TagsList";

interface QuizPreviewProps {
  quiz: QuizModel;
}

export default function QuizPreviewCard(props: QuizPreviewProps) {
  const { quiz } = props;

  return (
    <div className="flex flex-col justify-between gap-2 bg-slate-400 py-4 px-6 rounded-lg">
      <div>
        <p className="text-2xl font-bold tracking-wider">{quiz.title}</p>
        <p className="text-md">{quiz.description}</p>
        <TagsList tags={quiz.tags}/>
      </div>

      <div className="flex">
        <Ratting
          max={5}
          rating={quiz.difficult}
          fillIcon={<BsMortarboardFill className="text-red-700" />}
          icon={<BsMortarboard />}
        />
      </div>
    </div>
  );
}
