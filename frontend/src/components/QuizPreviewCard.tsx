import { QuizModel } from "../models/QuizModel";

interface QuizPreviewProps {
  quiz: QuizModel;
}

export default function QuizPreviewCard(props: QuizPreviewProps) {
  const { quiz } = props;

  return (
    <div className="bg-white p-4 rounded-lg">
      <p className="text-2xl font-bold tracking-wider">{quiz.title}</p>
      <p className="text-md">{quiz.description}</p>
    </div>
  );
}
