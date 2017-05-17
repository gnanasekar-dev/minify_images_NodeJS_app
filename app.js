/*
Original images will backed up.

This will minify images inside images_to_minify/ folder and move the original images to original_images/ folder.
Minified images will be saved in images/ folder.

$ npm install --save imagemin

$ npm install --save imagemin-mozjpeg

$ npm install --save imagemin-pngquant

$ npm install --save imagemin-svgo
*/

var fs = require("fs");
const path = require('path');


const imagemin = require('imagemin');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminPngquant = require('imagemin-pngquant');
const imageminSvgo = require('imagemin-svgo');
 
imagemin(['images_to_minify/*.{jpg,png,svg}'], 'images', {
    plugins: [
		imageminMozjpeg(),
        imageminPngquant({quality: '65-80'}),
		imageminSvgo({
            plugins: [
                {removeViewBox: false}
            ]
        })
    ]
}).then(files => {
    
	//Move images_to_minify to original_images folder after minify
	const directory = 'images_to_minify';
	
	fs.readdir(directory, (err, files) => {
	  if (err) throw error;

	  for (const file of files) {
		 fs.rename(directory+"/"+file, "original_images/"+file, function(err) {
		   if (err) {
				console.log(err);
			} else {
				// console.log("Images backed up");
			}
		 });
	   }
	 });
	
});
