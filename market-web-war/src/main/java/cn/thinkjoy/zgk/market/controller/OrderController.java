package cn.thinkjoy.zgk.market.controller;

import cn.thinkjoy.common.exception.BizException;
import cn.thinkjoy.zgk.market.common.BaseCommonController;
import cn.thinkjoy.zgk.market.common.ERRORCODE;
import cn.thinkjoy.zgk.market.domain.Order;
import cn.thinkjoy.zgk.market.service.IOrderService;
import cn.thinkjoy.zgk.market.util.NumberGenUtil;
import cn.thinkjoy.zgk.zgksystem.AgentService;
import cn.thinkjoy.zgk.zgksystem.domain.Department;
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
public class OrderController extends BaseCommonController {
    private Logger logger= LoggerFactory.getLogger(OrderController.class);
    @Autowired
    private IOrderService orderService;
    @Autowired
    private AgentService agentService;


    /**
     * 获取购买信息
     * @return
     */
    @RequestMapping(value = "/getBuyInfo",method = RequestMethod.POST)
    @ResponseBody
    public Department getBuyInfo(@RequestParam("userId") String userId){

        Map<String,Object> map=new HashMap<>();

        //参数错误
        if(userId==null){
            throw new BizException(ERRORCODE.PARAM_ERROR.getCode(),ERRORCODE.PARAM_ERROR.getMessage());
        }
        try{

            Department  department= agentService.getAgentInfo(userId);

            return  department;
        }catch (Exception e){
            logger.error("用户" + userId + ",获取购买信息异常:" + e);
            throw new BizException(ERRORCODE.FAIL.getCode(),ERRORCODE.FAIL.getMessage());
        }
    }

    /**
     * 提交订单
     * @return
     */
    @RequestMapping(value = "/commitOrder",method = RequestMethod.POST)
    @ResponseBody
    public Map<String,Object> commitOrder(@RequestParam("userId") String userId,@RequestParam("price")String price){

        Map<String,Object> map=new HashMap<>();

        //参数错误
        if(userId==null||price==null){
            throw new BizException(ERRORCODE.PARAM_ERROR.getCode(),ERRORCODE.PARAM_ERROR.getMessage());
        }
        try{
            String orderNo= NumberGenUtil.genOrderNo();
            Order order=new Order();

            Department  department= agentService.getAgentInfo(userId);
            if(! department.getSalePrice().equals(price)){

                logger.error("用户" + order.getUserId() + ",提交的价格不匹配" );
                throw new BizException(ERRORCODE.FAIL.getCode(),ERRORCODE.FAIL.getMessage());
            }
            order.setCreateDate(System.currentTimeMillis());
            order.setOrderNo(orderNo);
            order.setDepartmentName(department.getDepartmentName());
            order.setDepartmentPhone(department.getDepartmentPhone());
            order.setGoodsAddress(department.getGoodsAddress());
            order.setProductPrice(department.getSalePrice());
            order.setUserId(Long.valueOf(userId));
            order.setStatus(0);
            orderService.insert(order);
            map.put("orderNo",orderNo);
            map.put("department",department);
            return  map;
        }catch (Exception e){
            logger.error("用户" +userId + ",提交订单异常:" + e);
            throw new BizException(ERRORCODE.FAIL.getCode(),ERRORCODE.FAIL.getMessage());
        }
    }

    /**
     *获取用户订单数据
     * @param userId
     * @param pageNo
     * @param pageSize
     * @return
     */
    @RequestMapping(value = "/getUserOrderList",method = RequestMethod.GET)
    @ResponseBody
    public List<Map<String,Object>> getUserOrderList(@RequestParam("userId")long userId,
                                                     @RequestParam("pageNo")int pageNo,
                                                     @RequestParam("pageSize")int pageSize){
        List<Map<String,Object>> result=new ArrayList<>();
        result=orderService.queryOrderListByUserId(userId, pageNo, pageSize);
        return  result;
    }


    /**
     * 获取订单详情
     * @param orderNo
     * @return
     */
    public Map<String,Object> getOrderInfo(@RequestParam("orderNo")String orderNo){

        Map<String,Object> resultMap=new HashMap<>();
        resultMap=orderService.queryOrderByNo(orderNo);
        return  resultMap;
    }

}