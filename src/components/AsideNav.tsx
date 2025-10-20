import { Button } from "@/components/Button";
import { HiOutlineSwatch } from "react-icons/hi2";
import { FiWatch } from "react-icons/fi";
import { RiGraduationCapLine } from "react-icons/ri";
import { TbJacket, TbShoe } from "react-icons/tb";
import { IoShirtOutline } from "react-icons/io5";
import { PiPants } from "react-icons/pi";

interface AsideNavProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const AsideNav = ({ activeCategory, onCategoryChange }: AsideNavProps) => {
  const tabsMap = [
    {
      label: "All",
      icon: <HiOutlineSwatch />,
    },
    {
      label: "Accessories",
      icon: <FiWatch />,
    },
    {
      label: "Head",
      icon: <RiGraduationCapLine />,
    },
    {
      label: "Outerwear",
      icon: <TbJacket />,
    },
    {
      label: "Tops",
      icon: <IoShirtOutline />,
    },
    {
      label: "Bottoms",
      icon: <PiPants />,
    },
    {
      label: "Feet",
      icon: <TbShoe />,
    },
  ];

  const handleActiveTab = (tableLabel: string) => {
    onCategoryChange(tableLabel);
  };

  return (
    <aside className="top-0 lg:top-10 sticky flex lg:flex-col flex-wrap justify-center gap-2 bg-surface shadow-2xl shadow-black/70 mx-4 px-4 py-6 rounded-2xl h-fit">
      {tabsMap.map((tab, index) => {
        return (
          <Button
            key={index}
            version="v1"
            type="button"
            bgColor="card"
            size="3xl"
            onClick={() => handleActiveTab(tab.label)}
            className={`p-3 ${
              tab.label === "All" ? "w-full" : "lg:w-full w-1/4"
            } flex justify-center items-center ${
              activeCategory === tab.label ? "bg-[var(--color-card-hover)]" : ""
            }`}
          >
            {tab.icon}
          </Button>
        );
      })}
    </aside>
  );
};

export default AsideNav;
