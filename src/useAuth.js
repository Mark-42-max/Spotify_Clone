import { useEffect, useState } from "react";
import axios from "axios";

const useAuth = code => {
  const [accessToken, setAccessToken] = useState();
  const [refreshToken, setRefreshToken] = useState();
  const [expiresIn, setExpiresIn] = useState();

  useEffect(() => {
    axios({
      method: "post",
      url: "https://spotify-backend2001.herokuapp.com/login",
      data: {
        code: code
      }
    })
      .then(res => {
        setAccessToken(res.data.accessToken);
        setRefreshToken(res.data.refreshToken);
        setExpiresIn(res.data.expiresIn);
        window.history.pushState({}, null, "/");
      })
      .catch((err) => {
        //window.location.href = "/";
        console.error(err);
      });
  }, [code]);

  useEffect(() => {
    if (!refreshToken || !expiresIn ) return;
    const interval = setInterval(() => {
      axios
        .post("https://spotify-backend2001.herokuapp.com/refresh", {
          refreshToken,
        })
        .then(res => {
          setAccessToken(res.data.accessToken)
          setExpiresIn(res.data.expiresIn)
        })
        .catch((err) => {
          //window.location = "/"
          console.error(err);
        })
    }, (expiresIn - 60) * 1000)

    return () => clearInterval(interval)
  }, [expiresIn, refreshToken]);


  return accessToken;
};

export default useAuth;
