var express = require('express');
var app = express();
var Day = [0, 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

function judge(year, month, day){
	if(!Number.isInteger(year) || !Number.isInteger(month) || !Number.isInteger(day))	// not integer
		return 1;
	if(year <= 0 || month <= 0 || day <= 0)
		return 1;
	if(month > 12)
		return 2;
	if(day > Day[month])
		return 2;
	if(month == 2 && year % 4 != 0 && day == 29)
		return 2;
	if(month == 2 && year % 100 == 0 && year % 400 != 0 && day == 29)
		return 2;
	return 0;
}

app.get('/events/:year/:month/:day', function (req, res) {
	res.setHeader('Content-Type', 'application/json', 'charset=utf-8');
	var year = Number(req.params.year);
	var month = Number(req.params.month);
	var day = Number(req.params.day);
	var err = [0, { "Failed": "Input Format must be three integer!" },{ "Failed": "Input date is irreasonable!" }];
	var json = {"body":["完成 Use router and create API 練習!!","在 repo 上寫好 project 項目"]}
	var ret = judge(year, month, day);
	if(ret){
		res.json(err[ret])
	}else{
		if(year == 2018 && month == 2 && day == 23){
			res.json(json);
		}
		else{
			res.send({"response":year + '/' + month + '/' + day});
		}
	}
})

app.listen(9487, function () {
	  console.log('Example app listening on port 9487!')
})
