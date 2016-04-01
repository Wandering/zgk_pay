package cn.thinkjoy.zgk.market.controller;

import cn.thinkjoy.zgk.market.common.BaseCommonController;
import cn.thinkjoy.zgk.market.pojo.UserAccountPojo;
import cn.thinkjoy.zgk.market.service.IUserAccountExService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * Created by yhwang on 16/4/1.
 */
@Controller
@RequestMapping("/user")
public class UserController extends BaseCommonController {
    @Autowired
    private IUserAccountExService userAccountExService;
    @RequestMapping(value = "/getUserProfile")
    @ResponseBody
    public UserAccountPojo registerAccount(@RequestParam(value="account",required = false) String account){
        UserAccountPojo userAccountBean = userAccountExService.findUserAccountPojoByPhone(account);
        return userAccountBean;
    }
}
