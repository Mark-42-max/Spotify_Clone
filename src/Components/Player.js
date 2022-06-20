import React, { useEffect, useState } from 'react'
import SpotifyPlayer from 'react-spotify-web-playback';

const Player = ({accessToken, url}) => {

    const [playing, setPlaying] = useState(false);

    useEffect(() => {
        setPlaying(true);
    }, [url])
  return (
    <div>
        <SpotifyPlayer
            token={accessToken}
            showSaveIcon
            callback={(state) => {
                !state.isPlaying && setPlaying(false);
            }}
            play={playing}
            uris={url ? [url] : []}
        />
    </div>
  )
}

export default Player