import React, { useEffect, useState } from "react";
import { ArrowUpCircleIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import Loader from "./Loader";
import toast from "react-hot-toast";

function CharacterDetail({
  selectedId,
  onAddFavourite,
  onRemoveFavourite,
  isFav,
}) {
  const [character, setCharacter] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [episodes, setEpisodes] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const { data } =
          await axios.get(`https://rickandmortyapi.com/api/character/${selectedId}
        `);
        setCharacter(data);


        const episodesId = data.episode.map((e) => e.split("/").at(-1));

        const { data: episodeData } =
          await axios.get(`https://rickandmortyapi.com/api/episode/${episodesId}
    `);

        setEpisodes([episodeData].flat().slice(0, 6));
        
      } catch (error) {
        toast.error(error.response.data.error);
      } finally {
        setIsLoading(false);
      }
    }

    if (selectedId) {
      fetchData();
    }
  }, [selectedId]);

  if (isLoading) {
    return (
      <div style={{ flex: 1, color: "var(--slate-300)" }}>
        <Loader />
      </div>
    );
  }

  if (!character || !selectedId) {
    return (
      <div style={{ flex: 1, color: "var(--slate-300)" }}>
        Please Select a character
      </div>
    );
  }

  return (
    <div style={{ flex: 1 }}>
      <div className="character-detail">
        <img
          src={character.image}
          alt={character.name}
          className="character-detail__img"
        />

        <div className="character-detail__info">
          <h3 className="name">
            &nbsp;
            <span
              className={`gender ${
                character.gender === "Male" ? "male" : "female"
              }`}
            >
              {character.gender === "Male" ? "M " : "F "}
            </span>
            <span>
              {"  "}
              {character.name}
            </span>
          </h3>
          <div className="info">
            <span
              className={`status  ${character.status === "Dead" ? "red" : ""}`}
            ></span>
            <span>
              &nbsp;
              {character.status}
            </span>
            <span> - {character.species}</span>
          </div>
          <din className="location">
            <p>Last Known Location:</p>
            <p>{character.location.name}</p>
          </din>
          <div className="actions">
            {!isFav ? (
              <button
                style={{ backgroundColor: "var(--green-600)" }}
                onClick={() => onAddFavourite(character)}
                className="btn btn--primary"
              >
                Add To Favorites
              </button>
            ) : (
              <button
                style={{ backgroundColor: "var(--rose-500)" }}
                onClick={() => onRemoveFavourite(character)}
                className="btn btn--primary"
              >
                Remove From Favourites
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="character-episodes">
        <div className="title">
          <h2>List of Episodes</h2>
          <button>
            <ArrowUpCircleIcon className="icon" />
          </button>
        </div>
        <ul>
          {episodes.map((item, index) => {
            return (
              <li key={item.id}>
                <div>
                  {String(index + 1).padStart(2, "0")} {item.episode} :{" "}
                  <strong>{item.name}</strong>
                </div>
                <div className="date">{item.air_date}</div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default CharacterDetail;
