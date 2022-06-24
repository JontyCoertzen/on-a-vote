import { trpc } from "@utils/trpc";
import { useRouter } from "next/router";

const QuestionsPageContent: React.FC<{ id: string }> = ({ id }) => {
  const { data, isLoading, error } = trpc.useQuery([
    "questions.get-by-id",
    { id },
  ]);

  if (!isLoading && !data) return <div>Question not found</div>;

  return (
    <div className="p-8 flex flex-col">
      <div className="text-2xl font-bold">{data?.question?.question}</div>
      <div>
        {(data?.question?.options as { text: string }[])?.map((option) => (
          <div>{option.text}</div>
        ))}
      </div>
    </div>
  );
};

const QuestionPage = () => {
  const { query } = useRouter();
  const { id } = query;

  if (!id || typeof id !== "string") return <div>No ID</div>;

  return <QuestionsPageContent id={id} />;
};

export default QuestionPage;
