import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const GlobalContext = createContext(null);

export default function GlobalState({ children }) {
  const [searchParam, setSearchParam] = useState("");
  const [loading, setLoading] = useState(false);
  const [recipeList, setRecipeList] = useState([]);
  const [recipeDetails, setRecipeDetails] = useState(null);
  const [favList, setFavList] = useState([]);

  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(
        `https://forkify-api.herokuapp.com/api/v2/recipes?search=${searchParam}`
      );
      const data = await response.json();

      if (data?.data?.recipes) {
        setRecipeList(data?.data?.recipes);
        setLoading(false);
        setSearchParam("");
        navigate("/");
      }
    } catch (e) {
      console.log(e);
      setLoading(false);
      setSearchParam("");
    }
  };
  console.log(loading, recipeList);

  const handleFavSubmit = (getFavCurrent) => {
    console.log(getFavCurrent);

    let copyFavList = [...favList];
    const index = copyFavList.findIndex((item) => item.id === getFavCurrent.id);
    if (index === -1) {
      copyFavList.push(getFavCurrent);
    } else {
      copyFavList.splice(index);
    }

    setFavList(copyFavList);
  };

  console.log(favList, "favList");

  return (
    <GlobalContext.Provider
      value={{
        searchParam,
        loading,
        recipeList,
        setSearchParam,
        handleSubmit,
        recipeDetails,
        setRecipeDetails,
        handleFavSubmit,
        favList,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
