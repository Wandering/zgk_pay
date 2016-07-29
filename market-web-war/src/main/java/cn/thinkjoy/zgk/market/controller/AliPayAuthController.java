package cn.thinkjoy.zgk.market.controller;

import cn.thinkjoy.common.exception.BizException;
import cn.thinkjoy.zgk.market.alipay.AlipayConfig;
import cn.thinkjoy.zgk.market.alipay.AlipaySubmit;
import cn.thinkjoy.zgk.market.common.TimeUtil;
import com.alipay.api.AlipayApiException;
import com.alipay.api.AlipayClient;
import com.alipay.api.DefaultAlipayClient;
import com.alipay.api.internal.util.AlipaySignature;
import com.alipay.api.request.AlipaySystemOauthTokenRequest;
import com.alipay.api.request.AlipayUserUserinfoShareRequest;
import com.alipay.api.response.AlipaySystemOauthTokenResponse;
import com.alipay.api.response.AlipayUserUserinfoShareResponse;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by liusven on 16/7/28.
 */
@Controller
@RequestMapping("/alipayAuth")
@Scope("prototype")
public class AliPayAuthController
{
    private String userInfoUrl = "https://openapi.alipay.com/gateway.do";
    private AlipayClient alipayClient =new DefaultAlipayClient(userInfoUrl,
                                        AlipayConfig.APP_ID,AlipayConfig.APP_PRIVATE_KEY,"json","GBK",AlipayConfig.ALIPAY_PUBLIC_KEY);

    @RequestMapping(value = "/getAuthPage")
    @ResponseBody
    public String getForm()
        throws Exception
    {
       Map<String, String> paramMap = new HashMap<>();
       paramMap.put("service", AlipayConfig.service);
       paramMap.put("partner", AlipayConfig.partner);
       paramMap.put("_input_charset", AlipayConfig.input_charset);
       paramMap.put("return_url", AlipayConfig.return_url);
       paramMap.put("target_service", AlipayConfig.target_service);
       return AlipaySubmit.buildRequest(paramMap,"POST","submitButton");
    }

    @RequestMapping(value = "/getAuthToken", produces = "application/json; charset=utf-8")
    @ResponseBody
    public String getAuthToken(@RequestParam(value="auth_code",required=false) String authCode)
    {
        String accessToken = getAccessToken(authCode);
        return getResult(accessToken);
    }


    @RequestMapping(value = "/getUserInfo", produces = "application/json; charset=utf-8")
    @ResponseBody
    public String getUserInfo(@RequestParam(value="auth_code",required=false) String authCode)
        throws Exception
    {
        Map<String, String> paramMap = new HashMap<>();
        paramMap.put("app_id", AlipayConfig.APP_ID);
        paramMap.put("method", "alipay.user.userinfo.share");
//        paramMap.put("format", "JSON");
        paramMap.put("charset", "utf-8");
        paramMap.put("sign_type", "RSA");
        paramMap.put("timestamp", TimeUtil.getTimeStamp("yyyy-MM-dd HH:mm:ss"));
        paramMap.put("version", "1.0");
        paramMap.put("auth_token", getAccessToken(authCode));
//        paramMap.put("app_auth_token", AlipayConfig.APP_AUTH_TOKEN);
        paramMap.put("sign", AlipaySignature.rsaSign(paramMap, AlipayConfig.APP_PRIVATE_KEY, AlipayConfig.input_charset));
        return AlipaySubmit.buildRequest("","", paramMap);
    }

    private String getResult(String accessToken)
    {
        String result = "";
        AlipayUserUserinfoShareRequest request = new AlipayUserUserinfoShareRequest();
        try {
            AlipayUserUserinfoShareResponse userinfoShareResponse = alipayClient.execute(request, accessToken);
            result = userinfoShareResponse.getBody();
        } catch (AlipayApiException e) {
            e.printStackTrace();
        }
        return result;
    }

    private String getAccessToken(String authCode)
    {
        String accessToken;
        AlipaySystemOauthTokenRequest request = new AlipaySystemOauthTokenRequest();
        request.setCode(authCode);
        request.setGrantType("authorization_code");
        try {
            AlipaySystemOauthTokenResponse oauthTokenResponse = alipayClient.execute(request);
            accessToken = oauthTokenResponse.getAccessToken();
        } catch (AlipayApiException e) {
            throw new BizException(e.getErrCode(), e.getMessage());
        }
        return accessToken;
    }

}
