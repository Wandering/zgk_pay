package cn.thinkjoy.zgk.market.service.ex.impl;

import cn.thinkjoy.zgk.market.dao.ex.IPayExDAO;
import cn.thinkjoy.zgk.market.service.ex.IPayExService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

/**
 * Created by yangguorong on 16/4/28.
 */
@Service("payExService")
public class PayExServiceImpl implements IPayExService{

    @Autowired
    private IPayExDAO payExDAO;

    @Override
    public double getWalletBalance(long userId) {

        // TODO 分成的金额单位是分
        Double totalIncome = payExDAO.getAllIncomeByUserId(userId);
        Double totalWithdrawals = payExDAO.getTotalWithdrawalsByUserId(userId);

        if(totalIncome == null){
            return 0;
        }
        if(totalWithdrawals == null){
            return totalIncome/100;
        }
        return totalIncome/100 - totalWithdrawals;
    }

    @Override
    public List<Map<String, Object>> queryUserIncomeDetailByUserId(long userId, int pageNo, int pageSize) {
        return payExDAO.queryUserIncomeDetailByUserId(
                userId,
                (pageNo-1)*pageSize,
                pageSize);
    }

    @Override
    public List<Map<String, Object>> getSplitPriceList(Map<String, String> map) {
        return payExDAO.selectSplitPriceList(map);
    }
}
