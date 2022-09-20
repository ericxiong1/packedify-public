import axios from 'axios';
const getTopTracksShort = (accessToken) => axios({
    method: 'get',
    url: 'https://api.spotify.com/v1/me/top/tracks?limit=10&time_range=medium_term',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
  });
export const getTopTracksLong = (accessToken) => axios({
    method: 'get',
    url: 'https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=medium_term',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
    },
});

export const getTopArtists = (accessToken) => axios({
    method: 'get',
    url: 'https://api.spotify.com/v1/me/top/artists?limit=5&time_range=medium_term',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
  });

export const getUserInfo = (accessToken) => axios({
    method: 'get',
    url: 'https://api.spotify.com/v1/me',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
})
export const createPlaylist = (accessToken,userID) => axios({
    method: 'post',
    url: `https://api.spotify.com/v1/users/${userID}/playlists`,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
    data: JSON.stringify({
        name: "Your 6 Month Packedify",
        description: "Your past 6 months, all packed up."
    })
  });
  export const addPlaylistItems = (accessToken,playlistID,playlistItems) => axios({
    method: 'post',
    url: `https://api.spotify.com/v1/playlists/${playlistID}/tracks`,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
    data: JSON.stringify({
        uris: playlistItems
    })
  });

export default getTopTracksShort;