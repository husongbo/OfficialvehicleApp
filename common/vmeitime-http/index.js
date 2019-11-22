import http from './interface'
export const test = (data) => {
	//设置base地址
	http.config.baseUrl = "http://192.168.1.6:8001"
	//设置请求前拦截器
	http.interceptor.request = (config) => {
		config.header = {
			"token": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
		}
	}
	//设置请求结束后拦截器
	http.interceptor.response = (response) => {
		console.log('个性化response....')
		//判断返回状态 执行相应操作
		return response;
	}
    return http.request({
		baseUrl: 'https://unidemo.dcloud.net.cn/',
        url: 'ajax/echo/text?name=uni-app',
		dataType: 'text',
        data,
    })
}
//判断登录密码
export const CheckUserPwd = (data) => {
    return http.request({
        url: '/public/CheckUserPwd',
        method: 'GET', 
        data,
		// handle:true
    })
}
//获取验证码
export const SendSmsCode = (data) => {
    return http.request({
        url: '/public/SendSmsCode',
        method: 'GET', 
        data,
    })
}
//检查验证码
export const CheckSmsValidateCode = (data) => {
    return http.request({
        url: '/public/CheckSmsValidateCode',
        method: 'GET', 
        data,
    })
}
//设置登录密码
export const Register = (data) => {
    return http.request({
        url: '/public/Register',
        method: 'GET', 
        data,
    })
}
//手机号密码登录
export const Login = (data) => {
    return http.request({
        url: '/public/Login',
        method: 'GET', 
        data,
    })
}
//用户基本信息
export const UpdateUserInfo = (data) => {
    return http.request({
        url: '/public/UpdateUserInfo',
        method: 'GET', 
        data,
    })
}
//用车余额申请记录
export const ReserveApplyList = (data) => {
    return http.request({
        url: '/public/ReserveApplyList',
        method: 'GET', 
        data,
    })
}
//用车余额信息管理
export const SubMitApplyInfo = (data) => {
    return http.request({
        url: '/public/SubMitApplyInfo',
        method: 'GET', 
        data,
    })
}
//验证码登录
export const LoginFromAValidateCode = (data) => {
    return http.request({
        url: '/public/LoginFromAValidateCode',
        method: 'GET', 
        data,
    })
}
//检查密码是否一致pwd_type 为1标识登录密码验证 pwd_type 为2表示交易密码验证
export const CheckPassWordIn = (data) => {
    return http.request({
        url: '/public/CheckPassWordIn',
        method: 'GET', 
        data,
    })
}
//申请电子券
export const ApplyCouponInfo = (data) => {
    return http.request({
        url: '/public/ApplyCouponInfo',
        method: 'GET', 
        data,
    })
}
//车辆额度
export const GetCarBalance = (data) => {
    return http.request({
        url: '/public/GetCarBalance',
        method: 'GET', 
        data,
    })
}
//创建预支付订单
export const CreateOrderInfo = (data) => {
    return http.request({
        url: '/public/CreateOrderInfo',
        method: 'GET', 
        data,
    })
}
//修改密码、交易密码
export const ChangeUserPwd = (data) => {
    return http.request({
        url: '/public/ChangeUserPwd',
        method: 'GET', 
        data,
    })
}
//检查支付密码
export const CheckUserTradePwd = (data) => {
    return http.request({
        url: '/public/CheckUserTradePwd',
        method: 'GET', 
        data,
    })
}
//设置支付密码
export const SetTraderPwd = (data) => {
    return http.request({
        url: '/public/SetTraderPwd',
        method: 'GET', 
        data,
    })
}
//审核权限
export const AuthPowerInfo = (data) => {
    return http.request({
        url: '/public/AuthPowerInfo',
        method: 'GET', 
        data,
    })
}
//审核列表
export const AuthInfoList = (data) => {
    return http.request({
        url: '/public/AuthInfoList',
        method: 'GET', 
        data,
    })
}
//用车额度审核
export const ApplyInfoAuth = (data) => {
    return http.request({
        url: '/public/ApplyInfoAuth',
        method: 'GET', 
        data,
    })
}
//退出登录
export const ExitCompany = (data) => {
    return http.request({
        url: '/public/ExitCompany',
        method: 'GET', 
        data,
    })
}
//登录唯一性验证
export const ChekcToken = (data) => {
    return http.request({
        url: '/public/ChekcToken',
        method: 'GET', 
        data,
    })
}
// 默认全部导出  import api from '@/common/vmeitime-http/'
export default {
	CheckUserPwd,
	SendSmsCode,
	CheckSmsValidateCode,
	Register,
	Login,
	UpdateUserInfo,
	ReserveApplyList,
	SubMitApplyInfo,
	LoginFromAValidateCode,
	CheckPassWordIn,
	ApplyCouponInfo,
	GetCarBalance,
	CreateOrderInfo,
	ChangeUserPwd,
	CheckUserTradePwd,
	SetTraderPwd,
	AuthPowerInfo,
	AuthInfoList,
	ApplyInfoAuth,
	ExitCompany,
	ChekcToken
}