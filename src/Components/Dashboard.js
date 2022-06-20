import React, {useEffect, useState} from "react";
import useAuth from "../useAuth";
import { Container, Input } from "reactstrap";
import SpotifyWebApi from "spotify-web-api-node"
import PopulateSongs from "./PopulateSongs";
import Player from "./Player";

const Dashboard = ({ code }) => {
  const accessToken = useAuth(code);

  const [search, setSearch] = useState("");
  const [playingSong, setPlayingSong] = useState();
  const [searchResult, setSearchResult] = useState([]);

  const spotifyApi = new SpotifyWebApi({
    clientId: "831d4897ac7646da97fecad41eb430ef",
  });

  // useEffect(() => {
  //   if (!accessToken) {console.log("No access token"); return};

  //   spotifyApi.setAccessToken(accessToken);
  //   console.log(spotifyApi.getAccessToken());
  //   console.log("Token Changed");
  // }, [accessToken]);

  useEffect(() => {
    if (!accessToken) return;

    spotifyApi.setAccessToken(accessToken);
    if(search){
      let cancel = false;
      spotifyApi.searchTracks(search)
      .then(data => {
        if(cancel) return;
        setSearchResult(data.body.tracks.items.map(item => {

          const smallest = item.album.images.reduce((prevImg, currentImg) => {
            if(currentImg.height < prevImg.height) return currentImg;
            return prevImg;
          }, item.album.images[0]);

          return {
            artist: item.artists[0],
            name: item.name,
            uri: item.uri,
            image: smallest.url, 
            height: smallest.height
          }
        }))
      }).catch(err => console.log(err));

      console.log(searchResult);
      return () => cancel = true;
    }

  }, [accessToken, search])

  const getUri = (result)=> {
    setPlayingSong(result);
    setSearch("");
  }

  return (
    <Container className="d-flex flex-column py-2" style={{height: "100vh"}}>
      
      <Input type="search" 
      placeholder="Search Songs/Artists" 
      bsSize="lg"
      value={search} 
      onChange={(e) => {setSearch(e.target.value)} }
      />

      <div className="flex-grow-1 my-2 container">

        {search ? 
        searchResult.length > 0 ? searchResult.map(item => {
          return <PopulateSongs result={item} key={item.uri} sendUri={getUri}/>
        }) : <div>Loading...</div> 
        : null}
        
      </div>
      <div><Player accessToken={accessToken && accessToken} url={playingSong && playingSong.uri}/></div>

    </Container>
  )
};

export default Dashboard;
