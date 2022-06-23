import Head from "next/head";

import { prisma } from "../db/client";
import { trpc } from "../utils/trpc";

export default function Home(props: any) {
  const { data, isLoading } = trpc.useQuery(["getAllQuestions"]);

  if (isLoading || !data) return <div>Loading</div>;

  return <div>{data[0]?.question}</div>;
}
