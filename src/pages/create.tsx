import { trpc } from "@utils/trpc";
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

export default QuestionCreator;
