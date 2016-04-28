package cn.thinkjoy.zgk.market.service.ex;

/**
 * Created by yangguorong on 16/4/28.
 */
public interface IPayExService {

    /**
     * 根据用户ID获取用户钱包剩余金额
     *
     * @param userId
     * @return
     */
    double getWalletBalance(long userId);
}
