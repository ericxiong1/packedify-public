import { useEffect, useState } from 'react';
import getAccessToken, {logout} from './store/localStorage';
import getTopTracksShort, {getTopArtists, getTopTracksLong, getUserInfo} from './fetch/fetchUserData';
import background from './assets/background.jpg'
import styles from './App.module.css'
import Login from './components/Login'
import Display from './components/Display';

function App() {
    const accessToken = getAccessToken();
    const [authToken, setAuthToken] = useState(null);
    const [userID, setUserID] = useState(null);
    const [trackList, setTrackList] = useState(null);
    const [trackListLong, setTrackListLong] = useState(null);
    const [artistList, setArtistList] = useState(null);
    const [fetchDataDone,setFetchDataDone] = useState(false);

    useEffect(() => {
      setAuthToken(accessToken);
      const fetchData = async () => {
        try {
          const { data:userInfo } = await getUserInfo(accessToken);
          const { data:tracks } = await getTopTracksShort(accessToken);
          const { data:artists } = await getTopArtists(accessToken);
          const { data:tracksLong } = await getTopTracksLong(accessToken);
          let trackListArray = []
          setUserID(userInfo.id);
          setTrackList(tracks.items);
          for (let i = 0; i<50;i++){
            trackListArray[i] = tracksLong.items[i].uri;
          }
          setTrackListLong(trackListArray)
          setArtistList(artists.items);
          setFetchDataDone(true);
        } catch(e) {
          console.error(e);
        }
      };
      fetchData();
      
    }, [accessToken]);

  return (
    <div className={styles.App}>
      <img alt='background' className={styles.image}src={background}/>
      {!authToken && <Login/>}
      {authToken && fetchDataDone && <Display tracksLong = {trackListLong} accessToken={accessToken} userID={userID} artists={artistList} tracks={trackList} logout={logout}/>}
    </div>
  );
}

export default App;
