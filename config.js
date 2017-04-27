var mod = {
	webSiteAddress : 'http://127.0.0.1:33333',
	webSiteName : 'vue-admin 管理系统',
	// 项目的端口
	port : 33333,

	// 使用 mongodb 存储 session 信息的设置
	sessionSettings : {
		url : 'mongodb://localhost/sessions',
		ttl : 30 * 60 
	},
	
	// mongodb 数据库地址
	db : 'mongodb://localhost/admin_test',

	// log4 日志的基本设置
	log4Settings : {
		appenders : [
			{
				type : 'console',
				category : 'console'
			},{
				type : 'dateFile',
				filename : __dirname + '/logs/',
				pattern : 'info/yyyy-MM-dd-hh.log',
				absolute : true,
				alwaysIncludePattern : true,
				category : 'info',
				maxLogSize : 1024
			},{
				type : 'dateFile',
				filename : __dirname + '/logs/',
				pattern : 'normal/yyyy-MM-dd-hh.log',
				absolute : true,
				alwaysIncludePattern : true,
				category : 'normal',
				maxLogSize : 1024
			}
		],
		replaceConsole : true,
		levels : {
			default : 'DEBUG',
			info : 'INFO',
			normal : 'INFO'
		}
	},

	mailSettings : {
		service : 'QQ',
		port : 465,
		secureConnection : true,
		auth : {
			user : '1147518609@qq.com',
			pass : 'uyyaoiwpvzpnjjbg'
		}
	}
};

module.exports = mod;