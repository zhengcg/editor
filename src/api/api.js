export default {
	// 图片上传
	fileup:'/pro/fileup',
	// 注册
	register:'/pro/register/doRegister',
	// 发送短信验证
	sendCode:'/pro/register/sendMobileCode',
	// 找回密码发送短信验证
	sendCodeF:'/pro/user/resetPsd/sendMobileCode',
	// 登录
	login:'/pro/login',
	// 退出
	logout:'/pro/logout',
	// 修改密码
	updatePassword:'/pro/user/modifyPsd',
	// 重置密码（忘记密码）
	resetPas:'/pro/user/resetPsd/doReset',
	// 获取图形验证码
	getCode:'/pro/validateCode',
	// 获取用户信息及认证状态
	getUserStatus:'/pro/user/index',
	// 提交认证信息（昵称）
	sendRZ:'/pro/user/reSubmit',
	// 获取文章列表
	getArticleList:'/pro/article/list',
	// 删除文章
	deleteArticle:'pro/article/delete',
	// 添加文章
	addArticle:'/pro/article/save',
	// 预览文章
	viewArticle:'/pro/article/view',
	// 查看文章（已发布）
	checkArticle:'/pro/article/info',
	// 查看文章（已发布统计信息）
	checkArticleStat:'/pro/article/articleStatInfo',
	// 查看文章（已发布分页评论）
	checkArticleList:'/pro/article/commentList',
	// 发布文章
	publish:'/pro/article/publish',
	// 加精置顶
	toTop:'/pro/article/toTop',
	// 取消置顶
	cancelTop:'/pro/article/cancelTop',
	// 屏蔽
	hiddenComment:'/pro/article/hiddenComment',
	// 提交认证信息
	submitRZ:'/pro/user/submit',
	// 查询认证信息
	validInfo:'/pro/user/validInfo',
	// 我的收益
	asset:'/pro/ipeFlow/assetbList',
	// 查看证书
	getBlockChainFile:'/pro/blockChainFile/getBlockChainFile'
}
