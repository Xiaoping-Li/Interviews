const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fetch = require('node-fetch');

const PORT = process.env.PORT || 5000;

const server = express();


// Setup middlewares
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(cors({
    origin: true,
    credentials: true,
}));

// Route 1: /api/ping GET
server.get('/api/ping', (req, res) => {
  res.status(200).json({success: true});
});



// Route 2: /api/posts GET
server.get('/api/posts', (req, res) => {
  // Array lists for sortBy and Direction values
  const sortByList = ['id', 'reads', 'likes', 'popularity'];
  const directionList = ['desc', 'asc'];

  // Get values from req.query
  const { tags, sortBy, direction } = req.query;

  // Send back errors if query parameters missing or invalid 
  if (!tags) return res.status(400).json({ error: "Tags parameter is required" });
  if (sortBy && !sortByList.includes(sortBy)) return res.status(400).json({ error: "sortBy parameter is invalid" });
  if (direction && !directionList.includes(direction)) return res.status(400).json({ error: "direction parameter is invalid" });

  // Pack all the tags query together
  const tagsList = tags.split(',');
  const tagsPromises = tagsList.map(tag => {
    return fetch(`https://hatchways.io/api/assessment/blog/posts?tag=${tag}`)
      .then(res => res.json());
  });

  // Return result after all the tags values are resolved
  Promise.all(tagsPromises)
    .then(result => {
      // Init posts by using the first tag's result list
      const posts = result[0].posts;

      // Check duplicate result from the rest tags' result
      // Update posts list and idsList the same time
      for (let j = 1; j < result.length; j++) {
        let temp = result[j].posts;
        for (let k = 0; k < temp.length; k++) {
          let findOne = posts.find(post => post.id === temp[k].id);
          if (!findOne) {
            posts.push(temp[k]);
          }
        }
      }
    
      // Sort the posts list by queries provided, default condition is: sortBy === 'id' && direction === 'asc'
      let sorted;
      if (sortBy === 'reads') {
        if (direction === 'desc') {
          sorted = posts.sort((a, b) => b.reads - a.reads);
        } else {
          sorted = posts.sort((a, b) => a.reads - b.reads);
        }
      } else if (sortBy === 'likes') {
        if (direction === 'desc') {
          sorted = posts.sort((a, b) => b.likes - a.likes);
        } else {
          sorted = posts.sort((a, b) => a.likes - b.likes);
        }
      } else if (sortBy === 'popularity') {
        if (direction === 'desc') {
          sorted = posts.sort((a, b) => b.popularity - a.popularity);
        } else {
          sorted = posts.sort((a, b) => a.popularity - b.popularity);
        }
      } else {
        if (direction === 'desc') {
          sorted = posts.sort((a, b) => b.id - a.id);
        } else {
          sorted = posts.sort((a, b) => a.id - b.id);
        }
      }
      
      res.status(200).json({ posts: sorted })
    })
    .catch(err => res.json(err)); 
});


server.listen(PORT, () => console.log(`server listen on ${PORT}`));

// export server for testing 
module.exports = server;