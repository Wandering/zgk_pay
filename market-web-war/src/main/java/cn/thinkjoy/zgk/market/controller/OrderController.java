package cn.thinkjoy.zgk.market.controller;

import cn.thinkjoy.common.exception.BizException;
import cn.thinkjoy.zgk.market.common.ERRORCODE;
import cn.thinkjoy.zgk.market.domain.Order;
import cn.thinkjoy.zgk.market.service.IOrderService;
import cn.thinkjoy.zgk.market.util.NumberGenUtil;
import com.alibaba.dubbo.common.logger.Logger;
import com.alibaba.dubbo.common.logger.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by wpliu on 16/3/27.
 */
@Controller
@RequestMapping("/order")
public class OrderController {
    private Logger logger= LoggerFactory.getLogger(OrderController.class);
    @Autowired
    private IOrderService orderService;
    /**
     * �ύ����
     * @return
     */
    @RequestMapping(value = "/commitOrder",method = RequestMethod.POST)
    @ResponseBody
    public Map<String,Object> commitOrder(@RequestBody Order order){
        Map<String,Object> resultMap=new HashMap<>();

        //��������
        if(order==null){
            throw new BizException(ERRORCODE.PARAM_ERROR.getCode(),ERRORCODE.PARAM_ERROR.getMessage());
        }
        try{
            order.setOrderNo(NumberGenUtil.genOrderNo());
            orderService.insert(order);
            resultMap.put("code",200);
            resultMap.put("msg","�µ��ɹ�");
        }catch (Exception e){
            logger.info("�û�"+order.getUserId()+",�ύ�����쳣:"+e);
            throw new BizException(ERRORCODE.FAIL.getCode(),ERRORCODE.FAIL.getMessage());
        }finally {
            return resultMap;
        }
    }

    /**
     *��ȡ�û���������
     * @param userId
     * @param pageNo
     * @param pageSize
     * @return
     */
    @RequestMapping(value = "/getUserOrderList",method = RequestMethod.GET)
    @ResponseBody
    public List<Map<String,Object>> getUserOrderList(@RequestParam("userId")long userId,@RequestParam("pageNo")int pageNo,@RequestParam("pageSize")int pageSize){
        List<Map<String,Object>> result=new ArrayList<>();


        return  result;
    }


    /**
     * ��ȡ��������
     * @param orderNo
     * @return
     */
    public Map<String,Object> getOrderInfo(@RequestParam("orderNo")String orderNo){

        Map<String,Object> resultMap=new HashMap<>();

        return  resultMap;
    }

}
