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
    <div className="flex flex-col gap-4 justify-between p-4 bg-gray-950 rounded-lg">
      <div className="flex justify-center">
        <p className="text-2xl text-white font-bold tracking-wider text-center">{quiz.title}</p>
      </div>

      <div className="flex flex-col items-center p-4 gap-4 #edd69b contrast-200	">
        <div className="flex flex-wrap justify-center gap-2">
          <TagsList
            tags={quiz.tags}
            classes="text-xs border rounded-lg p-2 bg-red-100 font-bold"
          />
        </div>
        <div className="flex gap-2">
          <Ratting
            max={5}
            rating={quiz.difficult}
            fillIcon={<BsMortarboardFill className="text-red-700" />}
            icon={<BsMortarboard className="text-white"/>}
          />
        </div>
      </div>
    </div>
  );
}
