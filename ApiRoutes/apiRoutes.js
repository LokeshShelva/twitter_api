const express = require('express');
const axios = require('axios');
const router = express.Router();

const sendError = (error, res) => {
    if (error.responce) {
        res.status(error.responce.status)
        res.json(error.toJSON())
    } else {
        res.json(error)
    }
}

router.get('/user/:username', (req, res) => {

})

router.get('/tweets/:username', async (req, res) => {
    axios.get(`https://api.twitter.com/2/users/by/username/${req.params.username}`).then(
        (val) => {
            axios.get(`https://api.twitter.com/2/users/${val.data.data.id}/tweets?max_results=10`).then(
                (val) => {
                    let tweetsIds = val.data.data.map((tweet) => tweet.id).join(",");
                    axios.get(`https://api.twitter.com/2/tweets?ids=${tweetsIds}&tweet.fields=author_id,public_metrics,entities&&expansions=attachments.media_keys&media.fields=duration_ms,height,media_key,preview_image_url,public_metrics,type,url,width,alt_text`).then(
                        (result) => {
                            res.json(result.data)
                        }
                    )
                }
            ).catch((error) => {
                sendError(error, res)
            })
        }
    ).catch((error) => {
        sendError(error, res)
    })


})

module.exports = router;