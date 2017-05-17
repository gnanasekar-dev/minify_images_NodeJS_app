/*
npm install chokidar --save
*/

var chokidar = require('chokidar');

var watcher = chokidar.watch('images_to_minify/', {ignored: /^\./, persistent: true});

watcher
	.on('add', function(path) {
		
		const exec = require('child_process').exec;
		exec('node app.js', (err, stdout, stderr) => {
		  if (err) {
			console.error(err);
			return;
		  }
		  // console.log(stdout);
		  console.log('Image Minified');
		});
		
	});