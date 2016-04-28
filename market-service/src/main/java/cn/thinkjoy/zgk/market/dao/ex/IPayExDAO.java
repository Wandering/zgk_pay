package cn.thinkjoy.zgk.market.dao.ex;

import org.apache.ibatis.annotations.Param;

/**
 * Created by yangguorong on 16/4/28.
 */
public interface IPayExDAO {

    /**
     * 根据用户ID获取用户总收益
     *
     * @param userId
     * @return
     */
    Double getAllIncomeByUserId(@Param("userId") long userId);

    /**
     * 根据用户ID获取用户提现总额
     *
     * @param userId
     * @return
     */
    Double getTotalWithdrawalsByUserId(@Param("userId") long userId);
}
