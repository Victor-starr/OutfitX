import { LinkButton } from "@/components/Button";
import useOutfits from "@/hook/useOutfit";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";

function OutfitDetails() {
  const navigate = useNavigate();
  const { outfitId } = useParams<{ outfitId: string }>();
  const { result, loading, fetchOutfitById } = useOutfits();

  useEffect(() => {
    if (outfitId) {
      fetchOutfitById(outfitId);
    }
  }, [outfitId]);

  return (
    <main className="relative flex flex-col items-center bg-bg py-8 h-[85vh] overflow-y-auto">
      <h1 className="mb-6 font-bold text-title text-2xl md:text-3xl lg:text-4xl text-center">
        Outfit Details
      </h1>
      {loading ? (
        <p className="top-1/2 absolute flex justify-center items-center col-span-3 w-auto text-muted text-xl lg:text-3xl text-center">
          Loading...
        </p>
      ) : result.data === null || result.status !== 200 ? (
        <p className="top-1/2 absolute flex justify-center items-center col-span-3 w-auto text-muted text-xl lg:text-3xl text-center">
          No outfit found.
        </p>
      ) : (
        <div className="flex flex-col bg-card shadow mx-auto p-4 rounded w-full max-w-md">
          {/* DO NOT TOUCH THIS DIV */}
          <div
            className="relative flex flex-row gap-2 bg-surface mx-auto p-2 rounded-2xl h-[180px] hover:scale-105 transition-transform duration-300 ease-in-out cursor-pointer"
            onClick={() => navigate(`/outfits/${result.data[0].outfitId}`)}
          >
            <div className="flex flex-row flex-3 gap-1">
              <img
                className="flex-1 rounded w-[50%] h-full object-cover"
                src={result.data[0].clothes.Tops?.imageURL}
                alt={result.data[0].clothes.Tops?.name}
              />
              <img
                className="flex-1 rounded w-[50%] h-full object-cover"
                src={result.data[0].clothes.Outerwear?.imageURL}
                alt={result.data[0].clothes.Outerwear?.name}
              />
            </div>
            <div className="flex flex-col flex-1 gap-1">
              <img
                className="rounded w-full h-[65%] object-cover"
                src={result.data[0].clothes.Bottoms?.imageURL}
                alt={result.data[0].clothes.Bottoms?.name}
              />
              <img
                className="flex-1 rounded w-full h-[35%] object-cover"
                src={result.data[0].clothes.Feet?.imageURL}
                alt={result.data[0].clothes.Feet?.name}
              />
            </div>
            <div className="bottom-0 left-0 absolute flex flex-row gap-2 p-1 w-1/2 h-20">
              <img
                className="rounded w-[45%] h-full object-cover"
                src={result.data[0].clothes.Head?.imageURL}
                alt={result.data[0].clothes.Head?.name}
              />
              <img
                className="rounded w-[45%] h-full object-cover"
                src={result.data[0].clothes.Accessories?.imageURL}
                alt={result.data[0].clothes.Accessories?.name}
              />
            </div>
          </div>
          {/* DO NOT TOUCH THIS DIV */}

          <h2 className="mb-4 font-semibold text-title text-xl text-center">
            {result.data[0].name}
          </h2>
          <ul>
            {Object.values(result.data[0].clothes).map((item) => {
              return (
                <li
                  key={item.itemId}
                  className="flex flex-row items-center gap-4 mb-4 pb-4 border-b border-border"
                >
                  <LinkButton
                    to={`/wardrobe/${item.itemId}`}
                    version="v3"
                    size="lg"
                    textColor="primary"
                    className="hover:underline"
                  >
                    {item.name} - {item.type}
                  </LinkButton>
                  {item.tags.length === 0 ? (
                    <p className="mt-2 text-muted">No tags</p>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {item.tags.map((tag: string) => (
                        <span
                          key={tag}
                          className="bg-secondary mr-2 px-2.5 py-0.5 rounded font-medium text-title text-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </main>
  );
}
export default OutfitDetails;
