var request = require('request');
var require = require('./secrets');

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, callback) {
  var options = {
  	url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
  	headers: {
  		'User-Agent': 'request',
  		'Authorization': 'token ' + require.GITHUB_TOKEN,
  	}
  };

  request(options, function(err, res, body) {
    callback(err, body);
  });
}

getRepoContributors("jquery", "jquery", function(err, result) {
	console.log("Errors:", err);
	console.log("Result:", result);
});