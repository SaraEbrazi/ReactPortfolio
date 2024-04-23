import { Toaster } from "react-hot-toast";
import "./App.css";
import CharacterDetail from "./Components/CharacterDetail";
import CharacterList from "./Components/CharacterList";
import Navbar, { Favorites, SearchResult } from "./Components/Navbar";
import { Search } from "./Components/Navbar";
import { useEffect, useState } from "react";
import useCharacter from "./hooks/useCharacter";
import useLocalStorage from "./hooks/useLocalStorage";

function App() {
  const [query, setQuery] = useState("");
  const { isLoading, characters } = useCharacter("https://rickandmortyapi.com/api/character/?name",query);
  const [selectedId, setSelectedId] = useState(null);
  // const [favorite, setFavorite] = useState(
  //   () => JSON.parse(localStorage.getItem("FAVORITE")) || []
  // );

  const [favorite, setFavorite] = useLocalStorage("FAVOURITES");



  const handleSelectCharacter = (id) => {
    setSelectedId((prevId) => (prevId === id ? null : id));
  };

  const handleAddFavourite = (char) => {
    setFavorite([...favorite, char]);
  };

  const handleRemoveFavourite = (id) => {
    setFavorite((preFav) => preFav.filter((fav) => fav.id !== selectedId));
  };

  const isFav = favorite.map((fav) => fav.id).includes(selectedId);

  return (
    <div className="app">
      <Toaster />

      <Navbar>
        <Search
          query={query}
          setQuery={setQuery}
        />
        <SearchResult numOfResult={characters.length} />
        <Favorites
          favorite={favorite}
          onRemoveFavourite={handleRemoveFavourite}
        />
      </Navbar>
      <Main>
        <CharacterList
          selectedId={selectedId}
          characters={characters}
          isLoading={isLoading}
          onSelectCharacter={handleSelectCharacter}
        />
        <CharacterDetail
          selectedId={selectedId}
          isFav={isFav}
          onAddFavourite={handleAddFavourite}
          onRemoveFavourite={handleRemoveFavourite}
        />
      </Main>
    </div>
  );
}
export default App;

function Main({ children }) {
  return <div className="main">{children}</div>;
}