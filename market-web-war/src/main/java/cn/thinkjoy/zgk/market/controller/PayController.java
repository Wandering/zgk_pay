package cn.thinkjoy.zgk.market.controller;

import cn.thinkjoy.common.exception.BizException;
import cn.thinkjoy.zgk.market.common.ERRORCODE;
import cn.thinkjoy.zgk.market.domain.Order;
import cn.thinkjoy.zgk.market.domain.OrderStatements;
import cn.thinkjoy.zgk.market.enumerate.PAYCHANNEL;
import cn.thinkjoy.zgk.market.service.IOrderService;
import cn.thinkjoy.zgk.market.service.IOrderStatementsService;
import cn.thinkjoy.zgk.market.service.IUserAccountExService;
import cn.thinkjoy.zgk.market.util.IPUtil;
import cn.thinkjoy.zgk.market.util.NumberGenUtil;
import cn.thinkjoy.zgk.market.util.StaticSource;
import cn.thinkjoy.zgk.zgksystem.AgentService;
import cn.thinkjoy.zgk.zgksystem.domain.SplitPricePojo;
import com.alibaba.dubbo.common.logger.Logger;
import com.alibaba.dubbo.common.logger.LoggerFactory;
import com.alibaba.fastjson.JSONObject;
import com.pingplusplus.Pingpp;
import com.pingplusplus.model.Charge;
import com.pingplusplus.util.WxpubOAuth;
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


    /**
     * 获取openId
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
            logger.error("获取openId异常:" + e);
        }
        return map;
    }

    /**
     * 支付订单
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
        //参数错误
        if("".equals(orderNo)||orderNo==null||"".equals(amount)||amount==null||userId==0){
            throw  new BizException(ERRORCODE.PARAM_ERROR.getCode(),ERRORCODE.PARAM_ERROR.getMessage());
        }
        try{
            Pingpp.apiKey=StaticSource.getSource("apiKey");
            String appId=StaticSource.getSource("appId");
            String statemenstNo=NumberGenUtil.genStatementNo();
            OrderStatements orderstatement=new OrderStatements();
            orderstatement.setAmount(Double.valueOf(amount)*100);
            orderstatement.setCreateDate(System.currentTimeMillis());
            orderstatement.setOrderNo(orderNo);
            //0:交易进行中  1：交易成功  2：交易失败
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
            chargeParams.put("subject","智高考");
            chargeParams.put("body","智高考");
            chargeParams.put("currency",CURRENCY);
            if(channel.equals(PAYCHANNEL.WXPUB.getCode())){
                Map<String,Object> extraMap=new HashMap<>();
                extraMap.put("open_id",openId);
                chargeParams.put("extra",extraMap);
            }else  if(channel.equals(PAYCHANNEL.ALIPAYWAP.getCode())){
                Map<String,Object> extraMap=new HashMap<>();
                extraMap.put("success_url","http://m.zhigaokao.cn/order");
                chargeParams.put("extra",extraMap);
            }

            orderstatement.setPayJson(JSONObject.toJSONString(chargeParams));
            orderStatementService.insert(orderstatement);
            Charge charge=Charge.create(chargeParams);
            return charge;
        }catch (Exception e){
            logger.error("用户"+userId+":"+"支付失败,错误:"+e);
            throw new BizException(ERRORCODE.FAIL.getCode(),ERRORCODE.FAIL.getMessage());
        }

    }

    /**
     * 订单回调函数
     * @return
     */
    @RequestMapping(value = "/callBack",method = RequestMethod.POST)
    @ResponseBody
    public String callBack(HttpServletRequest request){
        try {

            int contentLength = request.getContentLength();
            if(contentLength<0){
                logger.error("回调参数为空");
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
            String orderNo = callBackMap.get("order_no").toString();
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
                logger.error("获取用户关系链为空,用户:"+userId);
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
                logger.error(orderNo+":分成失败");
                throw new BizException(ERRORCODE.FAIL.getCode(),ERRORCODE.FAIL.getMessage());
            }
            return "success";
        }catch (Exception e){
            logger.error("回调错误"+e);
            throw new BizException(ERRORCODE.FAIL.getCode(),ERRORCODE.FAIL.getMessage());
        }

    }

    /**
     * 获取用户交易流水
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
     * 退款函数
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