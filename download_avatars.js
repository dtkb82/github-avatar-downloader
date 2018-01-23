var request = require('request');
var secrets = require('./secrets');
var fs = require('fs');

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, callback) {
  var options = {
  	url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
  	headers: {
  		'User-Agent': 'request',
  		'Authorization': 'token ' + secrets.GITHUB_TOKEN,
  	}
  };

  request(options, function(err, res, body) {
    var data = JSON.parse(body);
    console.log(data);
    data.forEach(function(user){
    	user.avatar_url;
    	var filePath = "avatars/" + user.login + ".jpg";
		downloadImageByURL(user.avatar_url, filePath);
    })
    callback(null, null);
  });
}

function downloadImageByURL(url, filePath) {
  request.get(url)               // Note 1
       .on('error', function (err) {                                   // Note 2
         throw err; 
       })
       .on('response', function (response) {                           // Note 3
         console.log('Response Status Code: ', response.statusCode);
       })
       .pipe(fs.createWriteStream(filePath));
}


getRepoContributors(process.argv[2], process.argv[3], function(err, result) {
	console.log("Errors:", err);
	console.log("Result:", result);
});