import { useContext } from "react";
import { GlobalContext } from "../../context";
import RecipeItem from "../../components/Recipe-Item";

export default function Favotites() {
  const { favList } = useContext(GlobalContext);
  return (
    <div className="py-8 container mx-auto flex flex-wrap justify-center gap-10">
      {favList && favList.length > 0 ? (
        favList.map((item, index) => <RecipeItem key={index} item={item} />)
      ) : (
        <div>
          <p className="lg:text-4xl text-xl text-center text-black font-extrabold">
            Nothing is added in Favorites.
          </p>
        </div>
      )}
    </div>
  );
}
