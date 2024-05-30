import React, { useContext, useEffect, useState } from "react";
import NavBar from "../components/NavBar.jsx";
import { AuthContext } from "../components/AuthContext.jsx";
import axios from "axios";
import SearchBar from "../components/SearchBar.jsx";
import "./library.css";

const Library = () => {
    const userID = "heSbXlYFOjsIL9XYO6ty";
    const [userData, setUserData] = useState("");
    const [savedSongs, setSavedSongs] = useState([]);
    const [topArtstists, setTopArtists] = useState([]);
    const [topAlbums, setTopAlbums] = useState([]);
    const headerStyle = { margin: "30px 30px 30px 0px", color: "#FFFFFF" };
    const [activeTab, setActiveTab] = React.useState("artists");
    const divStyle = { display: "flex" };
    //const { userID } = useContext(AuthContext);

    const fetchUser = async () => {
        const response = await axios.get(
            `http://localhost:8000/users/${userID}`
        );
        setUserData(response.data);
        setSavedSongs(response.data.allsongs);
        setTopArtists(response.data.topartists);
    };

    useEffect(() => {
        fetchUser();
    }, []);
    return (
        <>
            <NavBar />
            <div className="page-container">
                <h1>Your library</h1>
                <div>
                    <SearchBar placeholder="Search your library..." />
                    <div style={divStyle}>
                        <h2
                            onClick={() => setActiveTab("artists")}
                            className="header-filter"
                            style={headerStyle}
                        >
                            Artists
                        </h2>
                        <h2
                            onClick={() => setActiveTab("albums")}
                            className="header-filter"
                            style={headerStyle}
                        >
                            Albums
                        </h2>
                        <h2
                            onClick={() => setActiveTab("songs")}
                            className="header-filter"
                            style={headerStyle}
                        >
                            Songs
                        </h2>
                    </div>
                </div>
                {activeTab === "songs" &&
                    savedSongs.map((item, index) => (
                        <div className="song-container" key={index}>
                            <img src="" alt="Album cover" />
                            <p>
                                <strong></strong> {item.title}
                            </p>
                            <p>
                                <strong></strong> {item.artist}
                            </p>
                        </div>
                    ))}

                {activeTab === "albums" &&
                    topAlbums.map((item, index) => (
                        <div className="album-container" key={index}>
                            <img src="" alt="Album cover" />
                            <p>
                                <strong></strong> {item.title}
                            </p>
                            <p>
                                <strong></strong> {item.artist}
                            </p>
                        </div>
                    ))}

                {activeTab === "artists" &&
                    topArtstists.map((item, index) => (
                        <div className="artist-container" key={index}>
                            <img src="" alt="Artist photo" />
                            <p>
                                <strong></strong> {item.name}
                            </p>
                            <p>
                                <strong></strong> {item.photo}
                            </p>
                        </div>
                    ))}
            </div>
        </>
    );
};

export default Library;
