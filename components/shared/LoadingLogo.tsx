import Image from "next/image";
type Props = {
  size?: number;
};

const LoadingLogo = ({ size = 100 }: Props) => {
  return (
    <div className="h-full w-full flex justify-center items-center">
      <Image
        src={"/loading.svg"}
        alt="loading"
        width={size}
        height={size}
        className="animate-pulse duration-700"
      />
    </div>
  );
};

export default LoadingLogo;