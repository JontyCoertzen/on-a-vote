import { trpc } from "@utils/trpc";
import Link from "next/link";
import React from "react";

export default function Home() {
  const { data, isLoading } = trpc.useQuery(["questions.get-all-my-questions"]);

  if (isLoading || !data) return <div>Loading</div>;

  return (
    <div className="p-6 flex flex-col">
      <div className="flex flex-col">
        <div className="text-2xl font-bold">Your Questions</div>
        {data?.map((question) => (
          <div className="flex flex-col my-2" key={question.id}>
            <Link href={`/question/${question.id}`}>
              <a>
                <div className="my-2">{question.question}</div>
              </a>
            </Link>
            <span>Created on {question.createdAt.toDateString()}</span>
          </div>
        ))}
        <Link href="/create">
          <a>Create New Question</a>
        </Link>
      </div>
    </div>
  );
}
