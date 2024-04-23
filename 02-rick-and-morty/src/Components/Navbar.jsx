import React, { useState } from "react";
import { BoltIcon, HeartIcon, TrashIcon } from "@heroicons/react/24/outline"; 
import Modal from "./Modal";
import { Character } from "./CharacterList";

function Navbar({ children }) {
  return (
    <nav className="navbar ">
      <Logo />
      {children}
    </nav>
  );
}

export default Navbar;

function Logo() {
  return (
    <div className="navbar__logo">
      <BoltIcon className="icon" />
    </div>
  );
}

export function Search({ query, setQuery }) {
  return (
    <input
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      type="text"
      className="text-field"
      placeholder="Search..."
    />
  );
}

export function SearchResult({ numOfResult }) {
  return <div className="navb ar__result">Found {numOfResult} Characters</div>;
}

export function Favorites({ favorite, onRemoveFavourite }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Modal
        onOpen={setIsOpen}
        open={isOpen}
        title="List of Favourites"
      >
        {favorite.map((item) => (
          <Character
            item={item}
            key={item.id}
          >
            <button
              className="icon red"
              onClick={() => onRemoveFavourite(item.id)}
            >
              <TrashIcon />
            </button>
          </Character>
        ))}
      </Modal>

      <button
        className="heart"
        onClick={() => setIsOpen((is) => !is)}
      >
        <HeartIcon className="icon" />
        <span className="badge">{favorite.length}</span>
      </button>
    </>
  );
}
