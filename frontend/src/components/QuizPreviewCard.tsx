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
    <div className="flex flex-col md:flex-row gap-4 md:gap-8 justify-between p-4 md:p-10 bg-gray-950 rounded-lg">
      <div className="flex flex-col gap-2 md:gap-4 justify-center text-center md:text-start">
        <p className="text-2xl md:text-4xl lg:text-5xl text-yellow-400 font-bold tracking-wider">{quiz.title}</p>
        <p className="ml-4 text-md md:text-xl lg:text-3xl text-white font-bold tracking-wider">{quiz.description}</p>
      </div>

      <div className="flex flex-col items-center md:items-end p-4 gap-4">
        <div className="flex flex-wrap justify-center gap-2">
          <TagsList
            tags={quiz.tags}
            classes="text-xs md:text-lg lg:text-2xl border rounded-lg p-2 bg-white font-bold"
          />
        </div>
        <div className="flex gap-2">
          <Ratting
            max={5}
            rating={quiz.difficult}
            fillIcon={<BsMortarboardFill className="text-red-500" />}
            icon={<BsMortarboard className="text-white"/>}
          />
        </div>
      </div>
    </div>
  );
}
