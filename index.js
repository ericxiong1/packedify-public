const querystring = require('query-string');
const express = require('express');
const axios = require('axios')
const path = require('path');

const CLIENT_ID = 'XXXX';
const CLIENT_SECRET = 'XXXX';
const REDIRECT_URI = 'XXXX';

const app = express();

app.use(express.static(path.resolve(__dirname, './client/build')));

function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
}

app.get('/login', (req,res) =>{
    const state = makeid(16)
    res.cookie('spotify_auth_state', state)
    const scope = 'user-read-private user-read-email ugc-image-upload user-read-playback-state playlist-read-private playlist-read-collaborative user-follow-read user-top-read user-read-recently-played user-library-read playlist-modify-public';
    const queryParams = querystring.stringify({
        client_id: CLIENT_ID,
        response_type: 'code',
        state: state,
        scope: scope,
    })
    res.redirect(`https://accounts.spotify.com/authorize?${queryParams}&redirect_uri=` + REDIRECT_URI)
})

app.get('/callback', (req, res) => {
  const code = req.query.code || null;

  axios({
    method: 'post',
    url: 'https://accounts.spotify.com/api/token',
    data: querystring.stringify({
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: REDIRECT_URI
    }),
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${new Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`,
    },
  })
    .then(response => {
      if (response.status === 200) {
        const { access_token, refresh_token, expires_in } = response.data;

        const queryParams = querystring.stringify({
          access_token,
          refresh_token,
          expires_in,
        });

        res.redirect(`https://packedify.herokuapp.com/?${queryParams}`);

      } else {
        res.redirect(`/?${querystring.stringify({ error: 'invalid_token' })}`);
      }
    })
    .catch(error => {
      res.send(error);
    });
});

app.get('/refresh_token', (req, res) => {
    const { refresh_token } = req.query;
    
    axios({
        method: 'post',
        url: 'https://accounts.spotify.com/api/token',
        data: querystring.stringify({
        grant_type: 'refresh_token',
        refresh_token: refresh_token
        }),
        headers: {
        'content-type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${new Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`,
        },
    })
        .then(response => {
        res.send(response.data);
        })
        .catch(error => {
        res.send(error);
        });
    });

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './client/build', 'index.html'));
});

app.listen(process.env.PORT || 3001);