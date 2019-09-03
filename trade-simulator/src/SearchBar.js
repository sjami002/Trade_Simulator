import React, { Component } from "react";
import ConfettiGenerator from "confetti-js";

function SearchBar(props) {
  // React.useEffect(() => {
  //   const confettiSettings = { target: "my-canvas" };
  //   const confetti = new ConfettiGenerator(confettiSettings);
  //   confetti.render();
  //
  //   return () => confetti.clear();
  // }, []);

  // new way

  // const confettiSettings = { target: "my-canvas" };
  // var confetti = new ConfettiGenerator(confettiSettings);
  // confetti.render();
  // //
  // confetti.clear();

  return (
    <div className="search-bar">
      <form className="search-form">
        <input
          type="text"
          className="search-input"
          name="searchTerm"
          value={props.searchTerm}
          onChange={props.handleSearchChange}
        />
        <input type="button" className="submit" value="Submit" id="my-canvas" />
      </form>
    </div>
  );
}

export default SearchBar;
