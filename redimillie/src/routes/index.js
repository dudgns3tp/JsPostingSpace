const express = require('express');
const request = require('request');
const dotenv = require('dotenv');

const router = express.Router();
const naverAPI = require('../modules/naverBookApi');

dotenv.config()

router.get('/', function (req, res, next) {
	res.render('index', {
		title: 'Express'
	});
});

router.get('/naver', async (req, res) => {
	const api_url = 'https://openapi.naver.com/v1/search/book.json?query=' + encodeURI(req.query.query); // json 결과
	const options = {
		url: api_url,
		headers: {
			'X-Naver-Client-Id': process.env.NAVER_CLIENT_ID,
			'X-Naver-Client-Secret': process.env.NAVER_CLIENT_SECRET
		}
	};
	
	request.get(options, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			res.writeHead(200, {
				'Content-Type': 'text/json;charset=utf-8'
			});
			JSON.parse(body).items 
			res.end(body)
 		} else {
			res.status(response.statusCode).end();
			console.log('error = ' + response.statusCode);
		}
	});
});

router.get('/apis', async (req,res) => {
	const books = await naverAPI.callBookApi(req.query.query);
	const titles = books.map(book => {
		let bookTitle = JSON.stringify(book.title)
			.replace(/(<b>)|(<\/b>)/gi,'')
			.replace(/ *\([^)]*\) */g, "");
		let bookDescription = JSON.stringify(book.description)
			.replace(/(<b>)|(<\/b>)/gi,'')
		return {
			title: JSON.parse(bookTitle),
			link: book.link,
			image: book.image,
			author: book.author,
			isbn: book.isbn,
			description: JSON.parse(bookDescription)
		}
	})
	console.log(titles)
	res.send(books)
})


module.exports = router;
