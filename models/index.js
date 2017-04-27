var mod = {

};

var mongoose = require('mongoose');
var config = require('../config');

mongoose.connect(config.db, {}, function(err){
	if(err){
		console.log(err);
		return;
	}
});

// models



module.exports = mod;