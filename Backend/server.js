import express from 'express'
import fetch from 'node-fetch'
import redis from 'redis'
import rateLimit from 'express-rate-limit'

const PORT = process.env.PORT || 5000
const REDIS_PORT = process.env.PORT || 6379

const client = redis.createClient(REDIS_PORT)
await client.connect()

const app = express()

const limiter = rateLimit({
  max: 5,
  windowMs: 10000,
  message: "You can't make any more requests at the moment. Try again later"
})

function setResponse(username, repos) {
    return `<h2>${username} has ${repos} Github Repos`
}

async function getRepos(req, res, next) {
    try {
      console.log('Fetching Data...');
  
      const { username } = req.params;
  
      const response = await fetch(`https://api.github.com/users/${username}`);
  
      const data = await response.json();
  
      const repos = data.public_repos;
  
      // Set data to Redis
      client.set(username, repos)
      // Set expiration time
      client.expire(username, 30)

      res.send(setResponse(username, repos));
    } catch (err) {
      console.error(err);
      res.status(500);
    }
  }


async function cache(req, res, next) {
    const { username } = req.params;
    const val = await client.get(username)
    if (val !== null) {
        res.send(setResponse(username, val))
    } else {
        next()
    }
  }

app.get('/repos/:username', limiter, cache, getRepos);

app.listen(5000, () => {
    console.log(`App is listening on ${PORT}`);
})

