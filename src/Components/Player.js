import React, { useEffect, useState } from "react";
import SpotifyPlayer from "react-spotify-web-playback";

const Player = ({ accessToken, url }) => {
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    setPlaying(true);
  }, [url]);

  if (!accessToken) return null;
    return (
      <div>
        <SpotifyPlayer
          token={accessToken}
          showSaveIcon={true}
          magnifySliderOnHover={true}
          initialVolume = {0.5}
          callback={state => {
            !state.isPlaying && setPlaying(false);
          }}
          play={playing}
          uris={url ? [url] : []}
        />
      </div>
    );
};

export default Player;
