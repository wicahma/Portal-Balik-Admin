import { wrapper } from "@/redux/store";
import "@/styles/globals.css";
import { ThemeProvider } from "@material-tailwind/react";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import NextNProgress from "nextjs-progressbar";
import { Provider } from "react-redux";

export default function App({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);
  const {
    pageProps: { session, ...pageProps },
  } = props;
  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <ThemeProvider>
          <NextNProgress
            color="#2563eb"
            startPosition={0.1}
            showOnShallow
            options={{
              easing: "ease",
              speed: 1000,
            }}
          />
          <Component {...pageProps} />
        </ThemeProvider>
      </Provider>
    </SessionProvider>
  );
}
