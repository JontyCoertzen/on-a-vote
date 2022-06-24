import { trpc } from "@utils/trpc";

import React from "react";
import { useFieldArray, useForm } from "react-hook-form";

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
    control,
  } = useForm<CreateQuestionValidatorType>({
    resolver: zodResolver(CreateQuestionValidtor),
    defaultValues: {
      options: [{ text: "" }],
    },
  });

  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      name: "options",
      control,
    }
  );

  if (isLoading || data) return <div>Loading...</div>;

  return (
    <div className="antialiased text-gray-100 px-6">
      <div className="max-w-xl mx-auto py-12 md:max-w-4xl">
        <h2 className="text-2xl font-bold">Create A New Poll</h2>
        <form onSubmit={handleSubmit((data) => mutate(data))}>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            <div className="grid grid-cols-1 gap-6 col-span-2">
              <label className="block">
                <span className="text-gray-100">Question</span>
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
                <span className="text-gray-100">Options</span>
                {fields.map((field, index) => {
                  return (
                    <div key={field.id} className="flex gap-2">
                      <input
                        placeholder="Option"
                        {...register(`options.${index}.text`, {
                          required: true,
                        })}
                        className="form-input mt-1 block w-full text-gray-800"
                      />
                      <button
                        type="button"
                        className="bg-red-500 text-white p-4"
                        onClick={() => remove(index)}
                      >
                        DELETE
                      </button>
                    </div>
                  );
                })}
                {errors.options && (
                  <p className="text-red-400">{errors.options.message}</p>
                )}
                <div>
                  <button
                    type="button"
                    className=" text-white py-4"
                    onClick={() => append({ text: "" })}
                  >
                    + Add Option
                  </button>
                </div>
              </label>
            </div>
            <div className="grid grid-cols-1 gap-6 col-span-2">
              <label className="block">
                <button type="submit" className="bg-gray-200 text-gray-900 p-4">
                  Create Question
                </button>
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
