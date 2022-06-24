import { trpc } from "@utils/trpc";
import Link from "next/link";
import React from "react";

const QuestionCreator: React.FC = () => {
  const inputRef = React.useRef<HTMLInputElement>(null);

  const client = trpc.useContext();
  const { mutate, isLoading, error } = trpc.useMutation("questions.create", {
    onSuccess: () => {
      client.invalidateQueries(["questions.get-all-my-questions"]);
      if (!inputRef.current) return;
      inputRef.current.value = "";
    },
  });

  return (
    <input
      ref={inputRef}
      type="text"
      disabled={isLoading}
      onKeyDown={(event) => {
        if (event.key == "Enter") {
          mutate({
            question: event.currentTarget.value,
          });
        }
      }}
    />
  );
};

export default function Home() {
  const { data, isLoading } = trpc.useQuery(["questions.get-all-my-questions"]);

  if (isLoading || !data) return <div>Loading</div>;

  return (
    <div className="p-6 flex flex-col">
      <div className="flex flex-col">
        <div className="text-2xl font-bold">Questions</div>
        {data?.map((question) => (
          <Link key={question.id} href={`/question/${question.id}`}>
            <a>
              <div className="my-2">{question.question}</div>
            </a>
          </Link>
        ))}
        <QuestionCreator />
      </div>
    </div>
  );
}
