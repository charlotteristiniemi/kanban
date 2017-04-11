var connection = require('../connection');

connection.connect(); //connect to database

/*
 * GET Home Page
 */

exports.home = function(req, res) {

	connection.query( 'SELECT * FROM Notes WHERE Category_id = 1', function(err1, row1, field1) {
		if (err1) console.log(err1);

		connection.query( 'SELECT * FROM Notes WHERE Category_id = 2', function(err2, row2, field2) {
			if (err2) console.log(err2);

			connection.query( 'SELECT * FROM Notes WHERE Category_id = 3', function(err3, row3, field3) {
				if (err3) console.log(err3);

				connection.query( 'SELECT * FROM Categories', function(err4, row4, field5) {
					if (err4) console.log(err4);
					res.render('index', { todo_notes: row1, doing_notes: row2 , done_notes: row3, categories: row4});
				});
			});
		});
	});
};


/*
 * POST New Note
 */

exports.add = function(req, res) {
	var input = req.body;

 	var data = {
 		note 		: input.note,
 		categoryid: input.categoryid,
 	};

 	connection.query( "INSERT INTO Notes (Category_id, Note)" +
 		"VALUES ('" + data.categoryid + "', '" + data.note + "')", function(err, row, field) {
 			if (err) console.log(err);
 			res.sendStatus(200);
 	});
};


/*
 * GET Delete Note
 */

exports.delete = function(req, res) {
	var noteid = req.params.id;

 	connection.query( 'DELETE FROM Notes WHERE Note_id = ?',  [noteid], function (err, row, field) {
		if (err) console.log(err);
		res.redirect('/');
	});
};


/*
 * GET Move Note To Right
 */

exports.moveToRight = function(req, res) {
	var id = parseInt(req.params.id);
	var category_id = parseInt(req.params.category_id);
	category_id += 1;

	connection.query( "UPDATE Notes SET Category_id=" + category_id + " WHERE Note_id=" + id + ";", function (err, row, field) {
 		if (err) console.log(err);
 		res.redirect('/');
  });
};


/*
 * GET Move Note To Left
 */

exports.moveToLeft = function(req, res) {
	var id = parseInt(req.params.id);
	var category_id = parseInt(req.params.category_id);
	category_id -= 1;

	connection.query( "UPDATE Notes SET Category_id=" + category_id + " WHERE Note_id=" + id + ";", function (err, row, field) {
 		if (err) console.log(err);
 		res.redirect('/');
  });
};