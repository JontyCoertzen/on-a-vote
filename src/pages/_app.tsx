import { withTRPC } from "@trpc/next";
import { AppType } from "next/dist/shared/lib/utils";
import superjson from "superjson";

import type { AppRouter } from "@backend/router";

import "@styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

export default withTRPC<AppRouter>({
  config({ ctx }) {
    const url = `/api/trpc`;

    return {
      url,
      transformer: superjson,
    };
  },

  ssr: false,
})(MyApp);
