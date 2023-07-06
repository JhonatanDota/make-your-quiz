import { useEffect, useState } from "react"
import QuizModel from "../models/QuizModel";
import { getAllQuizes } from "../requests/quiz";

export default function QuizList(){
    const [quizList, setQuizList] = useState<QuizModel[] | []>([]);

    async function fetchQuizes() {
        try {
          const quizesResponse = await getAllQuizes();

          setQuizList(quizesResponse.data.data);
        } catch {}
      }

    useEffect(() => {
      fetchQuizes();
    }, [])
    

    return (
        <div className="flex flex-col p-6 gap-y-6">
            {
                quizList.map((quiz: QuizModel) => (
                    <div className="bg-white p-4 rounded-lg">
                        <p>{quiz.title}</p>
                        <p>{quiz.description}</p>
                    </div>
                ))
            }
        </div>
    )
}