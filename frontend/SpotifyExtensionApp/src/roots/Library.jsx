import React, { useContext, useEffect, useState } from "react";
import NavBar from "../components/NavBar.jsx";
import { AuthContext } from "../components/AuthContext.jsx";
import axios from "axios";
import SearchBar from "../components/SearchBar.jsx";
import "./library.css";
import { Select } from "@chakra-ui/react";

const Library = () => {
   // const userID = "heSbXlYFOjsIL9XYO6ty";
    const [userData, setUserData] = useState("");
    const [savedSongs, setSavedSongs] = useState([]);
    const [artists, setArtists] = useState([]);
    const [albums, setAlbums] = useState([]);
    const headerStyle = { margin: "30px 30px 30px 0px", color: "#FFFFFF" };
    const [activeTab, setActiveTab] = React.useState("artists");
    const divStyle = { display: "flex" };
    const [searchResults, setSearchResults] = useState([]);
    const { userID } = useContext(AuthContext);

    const fetchUser = async () => {
        const response = await axios.get(
            `http://localhost:8000/users/${userID}`
        );
        setUserData(response.data);
        setSavedSongs(response.data.allsongs);
        setArtists(response.data.allFollowedArtists);
        console.log(savedSongs)
    };

    function search(category, input) {
        if (catergory == "songs") {
            const results = [];
            savedSongs.forEach();
            results.push(
                savedSongs.artistname.filter((str) => str.includes(input))
            );
            results.push(
                savedSongs.songname.filter((str) => str.includes(input))
            );
            results.push(
                savedSongs.albumname.filter((str) => str.includes(input))
            );
            setSearchResults(results);
        }

        if (catergory == "artist") {
            const results = [];
            results.push(
                savedSongs.artistname.filter((str) => str.includes(input))
            );
            setSearchResults(results);
        }

        if (catergory == "albums") {
            const results = [];
            results.push(albums.albumname.filter((str) => str.includes(input)));
            results.push(
                albums.artistname.filter((str) => str.includes(input))
            );
            setSearchResults(results);
        }
    }

    useEffect(() => {
        fetchUser();
    }, []);
    return (
        <>
            <NavBar />
            <div className="page-container">
                <h1>Your library</h1>
                <div>
                    <SearchBar
                        placeholder={"Search your " + activeTab + "..."}
                        //onSubmit={search(activeTab,input)}
                    />

                    <div style={divStyle}>
                        <h2
                            className={`header-filter ${
                                activeTab === "artists" ? "active" : ""
                            }`}
                            onClick={() => setActiveTab("artists")}
                            style={headerStyle}
                        >
                            Artists
                        </h2>
                        <h2
                            onClick={() => setActiveTab("albums")}
                            className={`header-filter ${
                                activeTab === "albums" ? "active" : ""
                            }`}
                            style={headerStyle}
                        >
                            Albums
                        </h2>
                        <h2
                            onClick={() => setActiveTab("songs")}
                            className={`header-filter ${
                                activeTab === "songs" ? "active" : ""
                            }`}
                            style={headerStyle}
                        >
                            Songs
                        </h2>
                        {(activeTab === "songs" || activeTab === "artists") && (
                        <Select
                            bg="#f9bc60"
                            placeholder={"View top " + activeTab}
                            className="select"
                            style={{ paddingInlineEnd: "0px" }}
                            icon=""
                        >
                            {activeTab === "songs" && (
                                <>
                                    <option value="option3">
                                        Top songs for last year
                                    </option>
                                    <option value="option1">
                                        Top songs for last 6 months
                                    </option>
                                    <option value="option2">
                                        Top songs for last month
                                    </option>
                                </>
                            )}
                            {activeTab === "artists" && (
                                <>
                                    <option value="option3">
                                        Top artists for last year
                                    </option>
                                    <option value="option1">
                                        Top artists for last 6 months
                                    </option>
                                    <option value="option2">
                                        Top artists for last month
                                    </option>
                                </>
                            )}
                        </Select>
)}
                    </div>
                </div>
                {activeTab === "songs" &&
                    savedSongs.map((item, index) => (
                        <div className="song-container" key={index}>
                            <img
                                src={item.albumimage}
                                width="55"
                                height="55"
                                alt="Album cover"
                            />
                            <div className="text">
                                <h4>{item.songname}</h4>
                                <p>{item.artistname}</p>
                            </div>
                        </div>
                    ))}

                {activeTab === "albums" &&
                    albums.map((item, index) => (
                        <div className="album-container" key={index}>
                            <img
                                width="55"
                                height="55"
                                src={item.image}
                                alt="Album cover"
                            />
                            <div className="text">
                                <h4>{item.title}</h4>
                                <p>{item.artist}</p>
                            </div>
                        </div>
                    ))}

                {activeTab === "artists" &&
                    artists.map((item, index) => (
                        <div className="artist-container" key={index}>
                            <img
                                width="55"
                                height="55"
                                src={item.image}
                                alt="Artist photo"
                            />
                            <h3>{item.artistname}</h3>
                        </div>
                    ))}
            </div>
        </>
    );
};

export default Library;
