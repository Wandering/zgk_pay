package cn.thinkjoy.zgk.market.interceptor;
import cn.thinkjoy.common.exception.BizException;
import cn.thinkjoy.zgk.market.constant.ServletPathConst;
import cn.thinkjoy.zgk.market.constant.UserRedisConst;
import cn.thinkjoy.zgk.market.util.CookieUtil;
import cn.thinkjoy.zgk.market.util.RedisUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.util.StringUtils;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;


import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class LoginInterceptor extends HandlerInterceptorAdapter {

	private static final Logger LOGGER= LoggerFactory.getLogger(LoginInterceptor.class);

	public LoginInterceptor() { }


    @Override
	public boolean preHandle(HttpServletRequest request,HttpServletResponse response, Object handler) throws Exception {
		String url = request.getServletPath();
		String value = request.getParameter("token");
		String key = UserRedisConst.USER_KEY+value;
		boolean redisFlag = RedisUtil.getInstance().exists(key);
		if ((StringUtils.isEmpty(value) ||!redisFlag)&& ServletPathConst.MAPPING_URLS.contains(url)) {
			throw new BizException("0000001","请在登陆后访问!");
		}
		return true;
	}

	@Override
	public void postHandle(HttpServletRequest request,HttpServletResponse response, Object handler,ModelAndView modelAndView) throws Exception {
//		System.out.println("===========HandlerInterceptor1 postHandle");

	}

	@Override
	public void afterCompletion(HttpServletRequest request,HttpServletResponse response, Object handler, Exception ex)
			throws Exception {
//		System.out.println("===========HandlerInterceptor1 afterCompletion");
	}

}
