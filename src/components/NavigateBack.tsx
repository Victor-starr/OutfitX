import { useNavigate } from "react-router";
import Button from "./Button";
import { IoArrowBack } from "react-icons/io5";

const NavigateBack = ({ url }: { url: string }) => {
  const navigate = useNavigate();
  return (
    <Button
      version="v1"
      type="button"
      bgColor="secondary"
      textColor="title"
      size="xl"
      className="top-15 left-15 absolute flex flex-row justify-center items-center gap-2 px-3 py-2 rounded-xl"
      onClick={() => navigate(url)}
    >
      <IoArrowBack /> Back
    </Button>
  );
};

export default NavigateBack;
