const fs = require('fs');
const Url = require('url-parse')
const https = require('https');

const url = new Url(process.argv[2]);
const videoId = url.query.split('=')[1];

const imageUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`



const download = function(fileUrl, dest, cb) {
  const file = fs.createWriteStream(dest);

  https.get(fileUrl, function(response) {
    response.pipe(file);
    file.on('finish', function() {
      file.close(cb);
    });
  }).on('error', function(err) { // Handle errors
    fs.unlink(dest);
    if (cb) cb(err.message);
  });
};

download(imageUrl, `./images/bg-${videoId}.jpg`, () => {
  console.log('bg downloaded');
})