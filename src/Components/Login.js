import React from 'react'
import {Container} from 'reactstrap'

const Login = () => {

    const AUTH_URL = "https://accounts.spotify.com/authorize?client_id=831d4897ac7646da97fecad41eb430ef&response_type=code&redirect_uri=https://mark-42-max.github.io/Spotify_Clone/&scope=streaming%20user-read-private%20user-read-email%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state%20";

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{minHeight:"100vh"}}>
            <a className="btn btn-success btn-lg" href={AUTH_URL}>Login With Spotify</a>
        </Container>
    )
}

export default Login