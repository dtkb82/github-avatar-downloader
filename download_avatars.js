var request = require('request');
var secrets = require('./secrets');
var fs = require('fs');

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, callback) {
	if (repoOwner == null || repoName == null){
		callback("repoOwner and repoName are required");
	} else {
		var options = {
			url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
			headers: {
				'User-Agent': 'request',
				'Authorization': 'token ' + secrets.GITHUB_TOKEN,
			}
		};

		request(options, function(err, res, body) {
				
			if (err){
				callback(err, body);
			} else {
				//parsing through the body with JSON
				var data = JSON.parse(body);
				//for each user grab their avatar with key name
				data.forEach(function(user){
					user.avatar_url;
					//place in the avatars folder. Grabbing the login key to tiltle the image 
					//including appropriate .jpg file type.
					var filePath = "avatars/" + user.login + ".jpg";
					//call dwnld image by url and pass in url and filepath parameters
					downloadImageByURL(user.avatar_url, filePath);
				})
				callback(null, "completed");
			}
		});
	}
}

function downloadImageByURL(url, filePath) {
  	//url get request 
  	request.get(url)               
   	.on('error', function (err) {                                   
   		throw err; 
   	})
   	.on('response', function (response) {                           
   		console.log('Response Status Code: ', response.statusCode);
   	}) //requires file system(fs) pipe the create and write operations to filePath
   	.pipe(fs.createWriteStream(filePath));
}


getRepoContributors(process.argv[2], process.argv[3], function(err, result) {
	console.log("Errors:", err);
   	console.log("Result:", result);
});