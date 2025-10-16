import { useNavigate } from "react-router";
import { Button } from "@/components/Button";
import { IoArrowBack } from "react-icons/io5";

const NavigateBack = ({ url }: { url: string | number }) => {
  const navigate = useNavigate();
  return (
    <Button
      version="v1"
      type="button"
      bgColor="secondary"
      textColor="title"
      size="xl"
      className="hidden top-15 left-15 absolute lg:flex flex-row justify-center items-center gap-2 px-3 py-2 rounded-xl"
      onClick={() => (typeof url === "number" ? navigate(url) : navigate(url))}
    >
      <IoArrowBack /> Back
    </Button>
  );
};

export default NavigateBack;
