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
    <aside className="top-0 sticky flex flex-col gap-2 bg-surface ml-5 px-4 py-6 rounded-2xl h-fit">
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
