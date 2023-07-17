import { reduxState } from "@/interfaces/reduxInterface";
import loadingStyle from "@/styles/Loading.module.css";
import { useSelector } from "react-redux";

const Loading = () => {
  const isLoading = useSelector((state: reduxState) => state.main.isLoading);
  return (
    <div
      className={`${
        isLoading
          ? "opacity-100 w-screen z-[10000] h-screen"
          : "opacity-0 -z-[100] w-0 h-0"
      } fixed flex top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 justify-center items-center bg-transparent transition-all duration-200 aspect-square`}
    >
      <div className="bg-white/5 shadow-lg backdrop-blur-lg rounded-xl p-3">
        <svg className={loadingStyle.svg} viewBox="0 0 50 50">
          <circle className={loadingStyle.ring} cx="25" cy="25" r="20" />
          <circle className={loadingStyle.ball} cx="25" cy="5" r="4.5" />
        </svg>
      </div>
    </div>
  );
};

export default Loading;
