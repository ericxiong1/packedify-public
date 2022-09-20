import React, {useEffect, useState} from 'react'
import { addPlaylistItems, createPlaylist } from '../fetch/fetchUserData';
import styles from './Display.module.css'
const Display = (props) =>{
    const [playlistCreated,setPlaylistCreated] = useState(false);

    const createPlaylistHandler = async () => {
        try {
            const { data:playlist } = await createPlaylist(props.accessToken,props.userID);
            setPlaylistCreated(true)
            await addPlaylistItems(props.accessToken,playlist.id,props.tracksLong)
          } catch(e) {
            console.error(e);
          }
    }
    return(
        <React.Fragment>
            <div className={styles.top}>
                <div className={styles.dividerArtist}>
                    <div className={styles.title}>{'Top Artists (6 months)'}</div>
                    {props.artists.map(
                        (artist,index)=>{
                            return(
                                <div key={index} className={styles.text}><img alt='artist' className={styles.img} src={artist.images[2].url}/>{`${index+1}. ${artist.name}`}</div>
                            )
                        }
                    )}
                </div>
                <div className={styles.divider}>
                    <div className={styles.title}>{'Top Tracks (6 months)'}</div>
                    {props.tracks.map(
                        (track,index)=>{
                            return(
                                <div key={index} className={styles.track}>{`${index+1}. ${track.name}`}</div>
                            )
                        }
                    )}
                </div>
            </div>
        {!playlistCreated ? <button className={styles.button} onClick={createPlaylistHandler}>Put it into a playlist!</button>
        : <button className={styles.button}>Playlist Created!</button>}
        <button className={styles.button} onClick={props.logout}>Logout</button>
        </React.Fragment>
    )
}
export default Display;