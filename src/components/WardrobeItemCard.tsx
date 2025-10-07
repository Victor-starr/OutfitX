import Button, { LinkButton } from "./Button";

interface WardrobeItem {
  itemId: string;
  userId: string;
  name: string;
  color: string;
  type: string;
  tags: string[];
  imageURL: string;
  onClick?: () => void;
}

interface WardrobeItemCardDetailProps {
  item: WardrobeItem;
  onDelete: () => void;
}
type WardrobeItemCardProp = {
  item: WardrobeItem;
  onClick: () => void;
};

export const ItemCardDetail = ({
  item,
  onDelete,
}: WardrobeItemCardDetailProps) => {
  return (
    <article className="flex flex-col bg-card shadow-lg p-8 rounded-xl w-full max-w-xl h-fit">
      <img
        src={item.imageURL}
        alt={item.name}
        className="bg-surface mb-6 rounded-lg w-full h-72 object-center object-contain cursor-pointer"
      />
      <div className="flex flex-col gap-2">
        <h2 className="font-semibold text-title text-2xl">{item.name}</h2>
        <p className="text-muted text-base">Type: {item.type}</p>
        <p className="text-muted text-base">Color: {item.color}</p>
        {item.tags.length > 0 ? (
          <div className="flex flex-wrap gap-2 mt-3">
            {item.tags.map((tag: string) => (
              <span
                key={tag}
                className="bg-secondary px-3 py-1 rounded text-title text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        ) : (
          <p className="mt-2 text-gray-500">No tags</p>
        )}
      </div>
      <div className="flex flex-row justify-end gap-4 mt-8">
        <LinkButton
          version="v2"
          textColor="primary"
          size="xl"
          to={`/wardrobe/${item.itemId}/edit`}
          className="px-6 py-2 rounded"
        >
          Edit
        </LinkButton>
        <Button
          bgColor="secondary"
          textColor="title"
          version="v1"
          size="lg"
          type="button"
          onClick={() => onDelete()}
          className="px-6 py-2 rounded"
        >
          Delete
        </Button>
      </div>
    </article>
  );
};

export const ItemCard = ({ item, onClick }: WardrobeItemCardProp) => {
  return (
    <article
      key={item.itemId}
      className="flex flex-col bg-card shadow p-4 rounded h-full"
    >
      <img
        src={item.imageURL}
        alt={item.name}
        className="bg-surface mb-3 rounded w-full h-48 object-center object-contain hover:scale-105 transition-transform duration-300 ease-in-out cursor-pointer"
        onClick={onClick}
      />
      <div className="flex flex-col gap-1">
        <h2 className="font-semibold text-title text-xl">{item.name}</h2>
        <p className="text-muted text-sm">Type: {item.type}</p>
        <p className="text-muted text-sm">Color: {item.color}</p>
        {item.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {item.tags.map((tag: string) => (
              <span
                key={tag}
                className="bg-secondary px-2 py-1 rounded text-title text-xs"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  );
};

export const LoadingItemCard = () => {
  return (
    <article className="flex flex-col bg-card shadow p-4 rounded h-full animate-pulse">
      <div className="bg-surface mb-3 rounded w-full h-48 object-center object-contain hover:scale-105 transition-transform animate-pulse duration-300 ease-in-out cursor-pointer"></div>
      <div className="flex flex-col gap-2">
        <span className="bg-muted w-[50%] h-7 animate-pulse"></span>
        <span className="bg-muted w-[40%] h-4 animate-pulse"></span>
        <span className="bg-muted w-[40%] h-4 animate-pulse"></span>
        <div className="flex flex-wrap gap-2 mt-2">
          {Array.from({ length: 5 }).map((_, index) => (
            <span
              key={index}
              className="bg-secondary px-5 py-2 rounded animate-pulse"
            ></span>
          ))}
        </div>
      </div>
    </article>
  );
};

export const LoadingItemCardDetail = () => {
  return (
    <article className="flex flex-col bg-card shadow-lg p-8 rounded-xl w-full max-w-xl h-fit animate-pulse">
      <div className="bg-surface mb-6 rounded-lg w-full h-72 object-center object-contain animate-pulse cursor-pointer" />
      <div className="flex flex-col gap-3">
        <span className="bg-muted w-[55%] h-10 animate-pulse"></span>
        <span className="bg-muted w-[45%] h-6 animate-pulse"></span>
        <span className="bg-muted w-[45%] h-6 animate-pulse"></span>
        <div className="flex flex-wrap gap-3 mt-3">
          {Array.from({ length: 5 }).map((_, index) => (
            <span
              key={index}
              className="bg-secondary px-6 py-3 rounded animate-pulse"
            ></span>
          ))}
        </div>
      </div>
      <div className="flex flex-row justify-end gap-4 mt-8">
        <div className="bg-surface px-5 py-2 rounded-xl w-25 h-10 animate-pulse"></div>
        <div className="bg-surface px-5 py-2 rounded-xl w-25 h-10 animate-pulse"></div>
      </div>
    </article>
  );
};
