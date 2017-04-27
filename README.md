1、启动项目：
	输入 gulp 命令即可

2、项目的文件结构
	
	{
		proxy : 数据访问层,
		models : mongodb和mongoose 的数据对象,
		controllers : 控制器,用于处理不同路由的具体逻辑,
		routes : 仅有一个index文件,用于根据路由选择不同的控制器,
		logs : 用于存放日志文件,以时间格式命名,
		middlewares : 中间件,用于身份认证等处理,
		views : 各部分的页面
	}
