const fs = require("fs")
const glob = require("glob")
const { createCanvas, loadImage } = require('canvas')
const sz = 512
var files = glob.sync("../imagesHiRes/*.*")
let n = files.length;
for (let f of files) {
	loadImage(f).then ((img) => {
		let scale = sz / Math.max(img.width,img.height)
		let [w,h] = [img.width*scale,img.height*scale]		
		const canvas = createCanvas(w,h)
		const ctx = canvas.getContext('2d')
		ctx.drawImage (img,0,0,img.width*scale,img.height*scale);		
		const buffer = canvas.toBuffer('image/png')
		let filename = `../images/${f.split("/")[2]}`;
		fs.writeFileSync(filename, buffer)
	})
}

