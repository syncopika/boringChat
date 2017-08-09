// user model 

// required tools 
var mongoose = 	require('mongoose');
var bcrypt 	 = 	require('bcrypt-nodejs');

// define schema for user model.
// only handling local authentication
var userSchema = mongoose.Schema({
	
	local: {
		username: String,
		password: String,
		ascii_emoticons: {
			// assign a default set of ascii faces to each new user 
			type: mongoose.Schema.Types.Mixed,
			default: 
			{
				"happy": ["^_^", ":)", ":D"],
				"sad": [":<"], 
				"angry": ["（　ﾟДﾟ）", ">:|"], 
				"funny": ["¯\\_(ツ)_/¯"],
				"other": ["ʕ•ᴥ•ʔ"]
			}
		}
	}

});


// some important methods! --------------------------

// generate a hash with a given password.
userSchema.methods.generateHash = function(password){
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}

// check if a password is valid (i.e. don't allow certain characters)
userSchema.methods.validPassword = function(password){
	return bcrypt.compareSync(password, this.local.password);
}

// create the user model and expose it to the application
// this mongoose.model looks for the collection 'userData', since I supplied it as an argument
// it will use this collection to insert new users 
// https://stackoverflow.com/questions/7486528/mongoose-force-collection-name/7722490#7722490
module.exports = mongoose.model('User', userSchema, 'userData'); 