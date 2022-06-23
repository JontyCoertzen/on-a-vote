import { trpc } from "@utils/trpc";

export default function Home() {
  const { data, error, isLoading } = trpc.useQuery(["questions.get-all"]);

  console.log(data, error, isLoading);
  if (error) {
    console.log(error);
    return <div>ERROR</div>;
  }

  if (isLoading) return <div>Loading</div>;

  return <div>{data?.[0]?.question}</div>;
}
