import React, { useEffect, useState } from "react";
import babyNamesData from "./babyNamesData.json";

const BabyNamesList = () => {
  const [babyNames, setBabyNames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const sortedNames = babyNamesData.sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    setBabyNames(sortedNames);
    setLoading(false);
  }, []);

  const handleSearchChange = (event) => {
    const { value } = event.target;
    setSearchQuery(value);
  };

  const filterBabyNames = () => {
    return babyNames.filter((name) =>
      name.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const addToFavorites = (name) => {
    const updatedBabyNames = babyNames.filter((n) => n.id !== name.id);
    const updatedFavorites = [...favorites, name];
    setBabyNames(updatedBabyNames);
    setFavorites(updatedFavorites);
  };

  const removeFromFavorites = (name) => {
    const updatedFavorites = favorites.filter((n) => n.id !== name.id);
    const updatedBabyNames = [...babyNames, name];
    setFavorites(updatedFavorites);
    setBabyNames(updatedBabyNames);
  };

  const renderBabyNames = () => {
    const filteredNames = filterBabyNames();
    const namesList = filteredNames.map((name) => (
      <span
        key={name.id}
        style={{ color: name.sex === "f" ? "green" : "orange" }}
        onClick={() => addToFavorites(name)}
      >
        {name.name}{" "}
      </span>
    ));

    return <div>{namesList}</div>;
  };

  const renderFavorites = () => {
    const favoritesList = favorites.map((name) => (
      <span
        key={name.id}
        style={{ color: name.sex === "f" ? "green" : "orange" }}
        onClick={() => removeFromFavorites(name)}
      >
        {name.name}{" "}
      </span>
    ));

    return <div>{favoritesList}</div>;
  };

  return (
    <div>
      <h1>Baby Names List</h1>
      <input
        type="text"
        placeholder="Search baby names"
        value={searchQuery}
        onChange={handleSearchChange}
      />
      <h2>Main List</h2>
      {loading ? <p>Loading...</p> : renderBabyNames()}
      <h2>Favorites</h2>
      {renderFavorites()}
    </div>
  );
};

export default BabyNamesList;
