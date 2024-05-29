import React from 'react'
import { IoIosSearch } from "react-icons/io";

// Search Bar taking in Placeholder Text Prop
// e.g. Search for Spotify Users...
const SearchBar = ({placeholder}) => {

  const styles = {
    container: {
      display: "flex",
      backgroundColor: "#3A6160",
      borderRadius: "20px",
      width: "450px",
      height: "60px",
      verticalAlign: "middle"
    },
    searchIcon: {
      margin: "5px 0px 0px 5px",
      color: "white"
    },
    input: {
      background: "transparent",
      border: "none",
      fontSize: "22px",
      color: "white",

      "&:focus": {
        outline: "none"
      }
    }
  };

  return (
    <div className="container" style={styles.container}>
      <IoIosSearch className="search-icon" style={styles.searchIcon} size={50} />
      <input type="text" placeholder={placeholder} style={styles.input}></input>
    </div>
  )
}

export default SearchBar
