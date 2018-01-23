var request = require('request');

// console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, callback) {
  var url = "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors";
  request(url, function(err, res, body) {
    callback(err, body);
  });
}

getRepoContributors("jquery", "jquery", function(err, result) {
	console.log("Errors:", err);
	console.log("Result:", result);
});