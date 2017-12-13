// these are all the functions that handle routes (i.e. POST, GET, DELETE)
// all of these routes will be controlled by passport for ensuring proper access for users
// super helpful! https://scotch.io/tutorials/easy-node-authentication-setup-and-local

// load user model
var User = require('../models/user.js');

module.exports = function(app, passport){

	// this will serve the login page to the user first!
	// if login is successful, then the server can serve the chat page
	app.get('/', function(req, res){
		res.render('login.ejs', { message: "" });
	});
	
	// show the login page 
	app.get('/login', function(req, res){
		res.render('login.ejs', { message: req.flash('loginMessage') });
	});
	
	// when server receives a POST request to /login, need to check form input 
	// and authenticate 
	app.post('/login', passport.authenticate('local-login', {
		failureRedirect: '/login',
		failureFlash: true
	}), function(req, res){
		// go to mainChat via 'get /mainChat'
		res.redirect('/mainChat/');
	});
	
	// show the register page 
	app.get('/register', function(req, res){
		res.render('register.ejs', { message: req.flash('registerMessage') });	
	});
	
	// take care of registering user after form input has been submitted 
	app.post('/register', passport.authenticate('local-register', {
		successRedirect: '/mainChat', //'/index', // go to chat page 
		failureRedirect: '/register',
		failureFlash: true
	}));
	
	// direct to chatroom, with mainChat in the url
	app.get('/mainChat', function(req, res){
		res.render('index.ejs', {
			user: req.user 	// get user name from session and pass to template
		});
	});
	
	// show logout page 
	// https://stackoverflow.com/questions/13758207/why-is-passportjs-in-node-not-removing-session-on-logout
	app.get('/logout', function(req, res){
		// remove username from current users list 
		req.logout(); 			// this is a passport function
		res.redirect('/');  	// go back to home page 
	});
	
	// middleware function to make sure user is logged in
	function isLoggedIn(req, res, next){
		
		// if user is authenticated, then ok
		if(req.isAuthenticated()){
			return next();
		}

		// if not authenticated, take them back to the home page 
		res.redirect('/');
	}
	
	
/****

	this covers the chat functionality of the application

****/
	
	// when user loads page, client page should automatically send a getJSON request to this server
	// the request will ask for a url, which the below will respond to. simply connect to the database
	// and send back the default ascii faces info as the response. 
	app.get('/default', function(req, res){
	});

	// this is for when user wants to add a new emoticon 
	app.post('/post_ascii', function(req, res){
		
		// keep in mind that some characters, when not properly escaped, will be ignored in the query, i.e
		// chars like '%' and '#' will result in a blank when trying to get the 'selectedFace'. so '#_#' is invalid right now. 
		// SHOULD DO MORE TESTING FOR THIS! 
		var regex = /[%$#]/g;
		var category = req.query.category.trim();
		var selectedFace = req.query.face.trim();
		
		// check for invalid input (at least make sure that an empty string is not submitted! that will throw a MongoError about empty field name)
		// if invalid input found, just exit 
		if(category === " " || category === "" || selectedFace === " " || selectedFace === ""){
			return;
		}
		
		if(selectedFace.match(regex) !== null){
			return;
		}
		
		// update database with the new info
		var key = "local.ascii_emoticons" + "." + category;
		var addAscii = {};
		addAscii[key] = selectedFace;

		User.findOneAndUpdate(
		                    {'local.username': req.user.local.username }, 
							{"$addToSet": addAscii}, 
							{new: true, upsert: true},
							function(err, user){
								if(err){
									throw err;
								}
								res.send(user);
							});
	});

	// this is for when the user deletes an ascii face 
	// btw, an interesting thing about using variable names for keys in objects:
	// https://stackoverflow.com/questions/2274242/using-a-variable-for-a-key-in-a-javascript-object-literal
	// https://stackoverflow.com/questions/17039018/how-to-use-a-variable-as-a-field-name-in-mongodb-native-findone
	app.delete('/delete_asciiface', function(req, res){
		
		// get the queries' values so we know which ascii face user wants to delete 
		var category = req.query.category.trim();
		var selectedFace = req.query.face.trim();
		
		// this is the key that matches the array with the face to remove 
		var key = "local.ascii_emoticons" + "." + category;
		var removeAscii = {};
		removeAscii[key] = selectedFace;
		
		// delete the selected emoticon from the database 
		User.findOneAndUpdate({'local.username': req.user.local.username },
							  {"$pull": removeAscii},
							  {new: true, upsert: true},
							  function(err, user){
								if(err){
									throw err;
								}
								res.send(user);
							 });
		
	});
}
