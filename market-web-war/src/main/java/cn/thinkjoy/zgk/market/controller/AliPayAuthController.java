package cn.thinkjoy.zgk.market.controller;

import cn.thinkjoy.zgk.market.alipay.AlipayConfig;
import cn.thinkjoy.zgk.market.alipay.AlipaySubmit;
import com.alipay.api.AlipayApiException;
import com.alipay.api.AlipayClient;
import com.alipay.api.DefaultAlipayClient;
import com.alipay.api.request.AlipaySystemOauthTokenRequest;
import com.alipay.api.response.AlipaySystemOauthTokenResponse;
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

    @RequestMapping(value = "/getAuthToken")
    @ResponseBody
    public void test(@RequestParam(value="app_auth_code",required=false) String authCode)
    {
        AlipayClient alipayClient =new DefaultAlipayClient("https://openapi.alipay.com/gateway.do",AlipayConfig.APP_ID,AlipayConfig.APP_PRIVATE_KEY,"json","GBK",AlipayConfig.ALIPAY_PUBLIC_KEY);
        AlipaySystemOauthTokenRequest request = new AlipaySystemOauthTokenRequest();
        request.setCode(authCode);
        request.setGrantType("authorization_code");
        try {
            AlipaySystemOauthTokenResponse oauthTokenResponse = alipayClient.execute(request);
            System.out.println(oauthTokenResponse.getAccessToken());
        } catch (AlipayApiException e) {
            //处理异常
            e.printStackTrace();
        }
    }
}
