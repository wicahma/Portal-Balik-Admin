import { wrapper } from "@/redux/store";
import "@/styles/globals.css";
import { ThemeProvider } from "@material-tailwind/react";
import type { AppProps } from "next/app";
import NextNProgress from "nextjs-progressbar";
import { Provider } from "react-redux";

export default function App({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);
  const { pageProps } = props;
  return (
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
  );
}
