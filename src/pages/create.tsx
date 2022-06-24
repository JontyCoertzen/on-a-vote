import { trpc } from "@utils/trpc";

import React from "react";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  CreateQuestionValidtor,
  CreateQuestionValidatorType,
} from "@shared/CreateQuestionValidator";
import { useRouter } from "next/router";

const CreateQuestionForm = () => {
  const router = useRouter();

  const { mutate, data, isLoading } = trpc.useMutation("questions.create", {
    onSuccess: (res) => {
      router.push(`/question/${res.id}`);
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateQuestionValidatorType>({
    resolver: zodResolver(CreateQuestionValidtor),
  });

  if (isLoading || data) return <div>Loading...</div>;

  return (
    <div className="antialiased text-gray-100 px-6">
      <div className="max-w-xl mx-auto py-12 md:max-w-4xl">
        <h2 className="text-2xl font-bold">Reset styles</h2>
        <p className="mt-2 text-lg text-gray-200">
          These are form elements this plugin styles by default.
        </p>
        <form onSubmit={handleSubmit((data) => mutate(data))}>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            <div className="grid grid-cols-1 gap-6 col-span-2">
              <label className="block">
                <span className="text-gray-700">Question</span>
                <input
                  {...register("question")}
                  type="text"
                  className="form-input mt-1 block w-full text-gray-800"
                  placeholder="How do magnets work?"
                />
                {errors.question && (
                  <p className="text-red-400">
                    {errors.question.message?.toString()}
                  </p>
                )}
              </label>
            </div>
            <div className="grid grid-cols-1 gap-6 col-span-2">
              <label className="block">
                <input
                  type="submit"
                  className="form-input text-gray-900"
                  value="Create Question"
                />
              </label>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

const QuestionCreator: React.FC = () => {
  return <CreateQuestionForm />;
};

export default QuestionCreator;
