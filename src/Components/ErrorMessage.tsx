import { GreenHorn, GreenPeople, GreenPlay } from "./Icons/Icons";
import ReactLoading from "react-loading";

export function ErrorMessage({
  children,
  message,
  description,
  icon,
}: {
  children?: React.ReactNode;
  icon?: string;
  message: string;
  description?: string;
}) {
  const IconSelection = ({
    icon,
    className,
  }: {
    icon?: string;
    className: string;
  }) => {
    if (icon === "GreenHorn") {
      return <GreenHorn className={className} />;
    } else if (icon === "GreenPeople") {
      return <GreenPeople className={className} />;
    } else {
      return <GreenPlay className={className} />;
    }
  };

  return (
    <div className="relative mt-16 flex w-full  flex-col items-center justify-center gap-2 text-center">
      <IconSelection className="center items-center" icon={icon} />
      <h1 className="text-2xl font-semibold text-gray-900">{message}</h1>
      <p className="max-w-xs text-gray-600">{description}</p>
      {children}
    </div>
  );
}

export function LoadingMessage() {
  return (
    <div className="relative mt-16 flex w-full  flex-col items-center justify-center gap-2 text-center ">
      {/* <ReactLoading
        type={"spinningBubbles"}
        // color={"#11999E"}
        className=" text-primary"
        height={667}
        width={375}
      /> */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="50"
        height="50"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        className="lucide lucide-loader-2 animate-spin text-primary"
      >
        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
      </svg>
      <h1 className="text-2xl font-semibold text-secondary">Loading</h1>
    </div>
  );
}
