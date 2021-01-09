const express = require('express');
const request = require('request');
const dotenv = require('dotenv');

const router = express.Router();

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
	let books;
		request.get(options, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			res.writeHead(200, {
				'Content-Type': 'text/json;charset=utf-8'
			});
			books = JSON.parse(body).items

			res.end(body);
		} else {
			res.status(response.statusCode).end();
			console.log('error = ' + response.statusCode);
		}
	const titles = books.map(book => book.title)
	console.log(titles)
	});
});


module.exports = router;
