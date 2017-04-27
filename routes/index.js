var express = require('express');
var router = express.Router();

/**
*	引入控制器和中间件对象
*/
var controller = require('../controllers/index');
var middleware = require('../middlewares/index');



/**
*	controllers
*/


var site = controller.site;







/**
*	具体路由模块
*/

router.get('/', site.showIndex);


module.exports = router;
