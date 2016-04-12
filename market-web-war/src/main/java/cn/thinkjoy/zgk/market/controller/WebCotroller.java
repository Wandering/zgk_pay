package cn.thinkjoy.zgk.market.controller;

import cn.thinkjoy.zgk.zgksystem.AgentService;
import cn.thinkjoy.zgk.zgksystem.domain.Department;
import cn.thinkjoy.zgk.zgksystem.domain.SplitPrice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import java.math.BigDecimal;
import java.util.*;

@Controller
@RequestMapping("/")
public class WebCotroller {

    @Autowired
    private AgentService agentService;

    @RequestMapping("/getAgentInfo")
    @ResponseBody
    public Department getAgentInfo(@RequestParam(value = "accountId")String accountId)
    {
        return agentService.getAgentInfo(accountId);
    }

    @RequestMapping("/getSplitPriceInfo")
    @ResponseBody
    public Map<String,List<SplitPrice>> getSplitPriceInfo(@RequestParam(value = "accountId")String accountId)
    {
        List<SplitPrice> list = agentService.getSplitPriceInfo(accountId);
        Map<String,List<SplitPrice>> priceMap = new LinkedHashMap<>();
        if(null != list && list.size()>0)
        {
            for (SplitPrice price: list) {
                BigDecimal realPrice = new BigDecimal(price.getPrice()).
                        divide(new BigDecimal(100), 2, BigDecimal.ROUND_HALF_DOWN);
                price.setPrice(realPrice.doubleValue());
                Calendar cal = Calendar.getInstance();
                cal.setTimeInMillis(price.getCreateTime());
                int year = cal.get(Calendar.YEAR);
                int month = cal.get(Calendar.MONTH) + 1;
                String key = year + "-" + month;
                List<SplitPrice> pList = priceMap.get(key);
                if(null == pList)
                {
                    pList = new ArrayList<>();
                    priceMap.put(key, pList);
                }
                pList.add(price);
            }
        }
        return priceMap;
    }
    /**
     * login
     *
     * @return
     */
    @RequestMapping("/login")
    public ModelAndView test() {
        return new ModelAndView("/register/register");
    }
    /**
     * index
     *
     * @return
     */
    @RequestMapping("/index")
    public ModelAndView index() {
        return new ModelAndView("/index");
    }

    /**
     * user-detail
     *
     * @return
     */
    @RequestMapping("/user-detail")
    public ModelAndView userDetail() {
        return new ModelAndView("/user-detail/user-detail");
    }

    /**
     * vip
     *
     * @return
     */
    @RequestMapping("/vipLogin")
    public ModelAndView vipLogin() {
        return new ModelAndView("/vip/vip-login");
    }

    /**
     * vip
     *
     * @return
     */
    @RequestMapping("/vip")
    public ModelAndView vip() {
        return new ModelAndView("/vip/vip");
    }

    /**
     * vip-check
     *
     * @return
     */
    @RequestMapping("/vip-check")
    public ModelAndView vipCheck() {
        return new ModelAndView("/vip-check/vip-check");
    }
    /**
     * vip-buy
     *
     * @return
     */
    @RequestMapping("/vip-buy")
    public ModelAndView vipBuy() {
        return new ModelAndView("/vip-buy/vip-buy");
    }

    /**
     * order
     *
     * @return
     */

    @RequestMapping("/order")
    public ModelAndView order() {
        return new ModelAndView("/order/order");
    }

    /**
     * modify-user-detail
     *
     * @return
     */
    @RequestMapping("/modify-user-detail")
    public ModelAndView modifyUserDetail() {
        return new ModelAndView("/modify-user-detail/modify-user-detail");
    }

    /**
     * find-password
     *
     * @return
     */
    @RequestMapping("/find-password")
    public ModelAndView findPassword() {
        return new ModelAndView("/register/find-password");
    }

    /**
     * policy
     *
     * @return
     */
    @RequestMapping("/policy")
    public ModelAndView policy() {
        return new ModelAndView("/policy/policy");
    }

    /**
     * policy-detail
     *
     * @return
     */
    @RequestMapping("/policy-detail")
    public ModelAndView policyDetail() {
        return new ModelAndView("/policy/policy-detail");
    }

    /**
     * school-detail
     *
     * @return
     */
    @RequestMapping("/school-info")
    public ModelAndView schoolInfo() {
        return new ModelAndView("/school-info/school-info");
    }

    /**
     * code
     *
     * @return
     */
    @RequestMapping("/code")
    public ModelAndView code() {
        return new ModelAndView("/code/code");
    }
    /**
     * inventory
     *
     * @return
     */
    @RequestMapping("/consumer-list")
    public ModelAndView inventory() {
        return new ModelAndView("/consumer-list/consumer-list");
    }
    /**
     * inventory
     *
     * @return
     */
    @RequestMapping("/intro")
    public ModelAndView intro() {
        return new ModelAndView("/consumer-list/intro");
    }
    /**
     * schedule
     *
     * @return
     */
    @RequestMapping("/schedule")
    public ModelAndView schedule() {
        return new ModelAndView("/schedule/schedule");
    }


}
