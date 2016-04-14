package cn.thinkjoy.zgk.market.controller;

import cn.thinkjoy.common.exception.BizException;
import cn.thinkjoy.zgk.market.common.ERRORCODE;
import cn.thinkjoy.zgk.market.constant.UserRedisConst;
import cn.thinkjoy.zgk.market.domain.Order;
import cn.thinkjoy.zgk.market.domain.OrderStatements;
import cn.thinkjoy.zgk.market.enumerate.PAYCHANNEL;
import cn.thinkjoy.zgk.market.service.IOrderService;
import cn.thinkjoy.zgk.market.service.IOrderStatementsService;
import cn.thinkjoy.zgk.market.service.IUserAccountExService;
import cn.thinkjoy.zgk.market.util.IPUtil;
import cn.thinkjoy.zgk.market.util.NumberGenUtil;
import cn.thinkjoy.zgk.market.util.RedisUtil;
import cn.thinkjoy.zgk.market.util.StaticSource;
import cn.thinkjoy.zgk.zgksystem.AgentService;
import cn.thinkjoy.zgk.zgksystem.pojo.SplitPricePojo;
import com.alibaba.dubbo.common.logger.Logger;
import com.alibaba.dubbo.common.logger.LoggerFactory;
import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.pingplusplus.Pingpp;
import com.pingplusplus.model.Charge;
import com.pingplusplus.util.WxpubOAuth;
import org.apache.http.HttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.util.EntityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.io.UnsupportedEncodingException;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.TimeUnit;


/**
 * Created by wpliu on 16/3/26.
 */
@Controller
@RequestMapping("/pay")
public class PayController {

    private Logger logger= LoggerFactory.getLogger(PayController.class);
    @Autowired
    private IOrderService orderService;

    @Autowired
    private IOrderStatementsService orderStatementService;

    @Autowired
    private AgentService agentService;

    @Autowired
    private IUserAccountExService userAccountExService;


    public static final String  CURRENCY ="cny";

    private static final String queryAccessTokenUrl = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=%s&secret=%s";

    private static final String queryJsapiUrl = "https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=%s&type=jsapi";

    /**
     * ��ȡaccessToken��jsapi_ticket
     * @return
     */
    @RequestMapping(value = "/getAccessToken",method = RequestMethod.GET)
    @ResponseBody
    public Map getAccessToken() throws Exception {
        String appSecret=StaticSource.getSource("appSecret");
        String wxAppId=StaticSource.getSource("wxAppId");
        Map<String,Object> map=new HashMap<>();
        String accessToken ;
        String ticket;
        boolean isAccessTokenExist = RedisUtil.getInstance().exists("accessToken");
        boolean isTicketTokenExist = RedisUtil.getInstance().exists("ticket");
        if(isAccessTokenExist && isTicketTokenExist)
        {
            accessToken = RedisUtil.getInstance().get("accessToken").toString();
            ticket = RedisUtil.getInstance().get("accessToken").toString();
            map.put("accessToken",accessToken);
            map.put("ticket", ticket);
            return map;
        }
        try {
            String queryUrl = String.format(queryAccessTokenUrl,wxAppId, appSecret);
            DefaultHttpClient client = new DefaultHttpClient();
            HttpGet httpGetToken = new HttpGet(queryUrl);
            httpGetToken.addHeader("Content-type" , "text/html;charset=utf-8");
            HttpResponse httpResponse = client.execute(httpGetToken);
            if (httpResponse.getStatusLine().getStatusCode() == 200) {
                accessToken = EntityUtils.toString(httpResponse.getEntity(), "UTF-8");
                Map<String, String> tokenMap = JSON.parseObject(accessToken, Map.class);
                map.put("accessToken",tokenMap.get("access_token"));
                RedisUtil.getInstance().set("accessToken",tokenMap.get("access_token"),
                        UserRedisConst.ACCESS_TOKEN_EXPIRE_TIME, TimeUnit.SECONDS);
                String queryJsapiUrl2 = String.format(queryJsapiUrl,tokenMap.get("access_token"));
                HttpGet httpGetJsapi = new HttpGet(queryJsapiUrl2);
                httpGetJsapi.addHeader("Content-type" , "text/html;charset=utf-8");
                HttpResponse httpResponseJsapi = client.execute(httpGetJsapi);
                if (httpResponseJsapi.getStatusLine().getStatusCode() == 200) {
                    ticket = EntityUtils.toString(httpResponseJsapi.getEntity(), "UTF-8");
                    Map<String, String> ticketMap = JSON.parseObject(ticket, Map.class);
                    map.put("ticket", ticketMap.get("ticket"));
                    RedisUtil.getInstance().set("ticket", ticketMap.get("ticket"),
                            UserRedisConst.TICKET_EXPIRE_TIME, TimeUnit.SECONDS);
                }
            }

        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
            logger.error("��ȡaccessToken�쳣:" + e);
        }
        return map;
    }

    /**
     * ��ȡopenId
     * @param code
     * @return
     */
    @RequestMapping(value = "/getOpenId",method = RequestMethod.GET)
    @ResponseBody
    public Map getOpenId(@RequestParam(value = "code")String code){
         String appSecret=StaticSource.getSource("appSecret");
        String wxAppId=StaticSource.getSource("wxAppId");
        Map<String,Object> map=new HashMap<>();
        String openId= null;
        try {
            openId = WxpubOAuth.getOpenId(wxAppId, appSecret, code);
            map.put("openId",openId);
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
            logger.error("��ȡopenId�쳣:" + e);
        }
        return map;
    }

    /**
     * ֧������
     * @return
     */
    @RequestMapping(value = "/payOrder",method = RequestMethod.POST)
    @ResponseBody
    public Charge payOrder(@RequestParam(value = "orderNo",required = true) String orderNo,
                           @RequestParam(value = "amount",required = true)String amount,
                           @RequestParam(value = "userId",required = true)long userId,
                           @RequestParam(value = "channel",required = true)String channel ,
                           @RequestParam(value = "openId",required = true)String openId,
                           HttpServletRequest request){
        Map<String,Object> resultMap=new HashMap<>();
        BigDecimal decimal=new BigDecimal(amount);
        String token = request.getParameter("token");
        //��������
        if("".equals(orderNo)||orderNo==null||"".equals(amount)||amount==null||userId==0){
            throw  new BizException(ERRORCODE.PARAM_ERROR.getCode(),ERRORCODE.PARAM_ERROR.getMessage());
        }
        try{
            Pingpp.apiKey=StaticSource.getSource("apiKey");
            String appId=StaticSource.getSource("appId");
            String alipayCallBack=StaticSource.getSource("alipayCallBack")+"?token="+token;
            String statemenstNo=NumberGenUtil.genStatementNo();
            OrderStatements orderstatement=new OrderStatements();
            orderstatement.setAmount(Double.valueOf(amount)*100);
            orderstatement.setCreateDate(System.currentTimeMillis());
            orderstatement.setOrderNo(orderNo);
            //0:���׽�����  1�����׳ɹ�  2������ʧ��
            orderstatement.setStatus(0);
            orderstatement.setStatementNo(statemenstNo);
            orderstatement.setState("N");
            Map<String,Object> chargeParams=new HashMap<>();
            Map<String,String> app=new HashMap<>();
            app.put("id", appId);
            chargeParams.put("order_no",orderNo);
            chargeParams.put("amount",decimal.doubleValue()*100);
            chargeParams.put("app",app);
            chargeParams.put("channel",channel);
            chargeParams.put("client_ip", IPUtil.getRemortIP(request));
            chargeParams.put("subject","�Ǹ߿�");
            chargeParams.put("body","�Ǹ߿�VIP��Ա");
            chargeParams.put("currency",CURRENCY);
            if(channel.equals(PAYCHANNEL.WXPUB.getCode())){
                Map<String,Object> extraMap=new HashMap<>();
                extraMap.put("open_id",openId);
                chargeParams.put("extra",extraMap);
            }else  if(channel.equals(PAYCHANNEL.ALIPAYWAP.getCode())){
                Map<String,Object> extraMap=new HashMap<>();

                extraMap.put("success_url",alipayCallBack);
                chargeParams.put("extra",extraMap);
            }

            orderstatement.setPayJson(JSONObject.toJSONString(chargeParams));
            orderStatementService.insert(orderstatement);
            Charge charge=Charge.create(chargeParams);
            return charge;
        }catch (Exception e){
            logger.error("�û�"+userId+":"+"֧��ʧ��,����:"+e);
            throw new BizException(ERRORCODE.FAIL.getCode(),ERRORCODE.FAIL.getMessage());
        }

    }

    /**
     * �����ص�����
     * @return
     */
    @RequestMapping(value = "/callBack",method = RequestMethod.POST)
    @ResponseBody
    public String callBack(HttpServletRequest request){
        String orderNo="";
        try {

            int contentLength = request.getContentLength();
            if(contentLength<0){
                logger.error("�ص�����Ϊ��");
            }
            byte buffer[] = new byte[contentLength];
            for (int i = 0; i < contentLength;) {
                int readlen = request.getInputStream().read(buffer, i,
                        contentLength - i);
                if (readlen == -1) {
                    break;
                }
                i += readlen;
            }
            String requestJson=new String(buffer,"UTF-8");
            JSONObject object=   JSONObject.parseObject(requestJson);

            Map<String,Object> callBackMap= (Map) ((Map)object.get("data")).get("object");
            orderNo = callBackMap.get("order_no").toString();
            Order order = new Order();
            order.setOrderNo(orderNo);
            order.setStatus(1);
            orderService.updateByOrderNo(order);
            OrderStatements orderStatements = new OrderStatements();
            orderStatements.setOrderNo(orderNo);
            orderStatements.setCallBackJson(requestJson);
            orderStatementService.updateByOrderNo(orderStatements);
            Map<String, Object> orderMap = orderService.queryOrderByNo(orderNo);
            String userId= orderMap.get("user_id").toString();

            List<Map<String,Object>> userRelLs= userAccountExService.getUserRelListByUserId(Long.valueOf(userId));

            if(userRelLs==null ||userRelLs.size()==0 ){
                logger.error("��ȡ�û���ϵ��Ϊ��,�û�:"+userId);
                return "fail";
            }
            List<SplitPricePojo> splitPricePojos=new ArrayList<>();

            for(Map<String,Object> map:userRelLs){
                SplitPricePojo splitPricePojo=new SplitPricePojo();
                splitPricePojo.setAccountId(Integer.valueOf(map.get("accountId").toString()));
                splitPricePojo.setAgentLevel(Integer.valueOf(map.get("agentLevel").toString()));
                splitPricePojo.setAccountPhone(map.get("account").toString());
                splitPricePojos.add(splitPricePojo);
            }
            boolean result = agentService.SplitPriceExec(splitPricePojos, Integer.valueOf(callBackMap.get("amount").toString()), orderNo);
            if(!result)
            {
                logger.error("����"+orderNo+":�ֳ�ʧ��.");
                throw new BizException(ERRORCODE.FAIL.getCode(),ERRORCODE.FAIL.getMessage());
            }
            return "success";
        }catch (Exception e){
            logger.error("����"+orderNo+":�ص�����"+e);
            throw new BizException(ERRORCODE.FAIL.getCode(),ERRORCODE.FAIL.getMessage());
        }

    }

    /**
     * ��ȡ�û�������ˮ
     * @param pageNo
     * @param pageSize
     * @return
     */
    @RequestMapping(value = "getTradeInfo",method = RequestMethod.GET)
    @ResponseBody
    public List<Map<String,Object>> getPayList(@RequestParam("userId")long userId,
                                               @RequestParam("pageNo")int pageNo,
                                               @RequestParam("pageSize")int pageSize){

        List<Map<String,Object>> resultMap=new ArrayList<>();
//        resultMap=orderStatementService.queryPage();
        return  resultMap;
    }



    /**
     * �˿��
     * @return
     */
    @RequestMapping(value = "/refunds",method = RequestMethod.POST)
    @ResponseBody
    public Map<String,Object> refunds(@RequestParam("orderNo") String orderNo,
                                      @RequestParam("amount")String amount,
                                      @RequestParam("userId")long userId,
                                      @RequestParam("channel")String channel ){

        //TO DO
        return  null;
    }




}