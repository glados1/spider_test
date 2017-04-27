var mod = {};
var tool = require('../util/tool');


/**
*	为 model 进行功能性拓展
* 	http://mongoosejs.com/docs/plugins.html
*/
mod = function(schema){
	schema.methods.createTimeFix = function(){
		return tool.formatDate(this.create_time, true);
	};

	schema.methods.updateTimeFix = function(){
		return tool.formatDate(this.update_time, true);
	};
};


module.exports = mod;