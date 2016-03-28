package cn.thinkjoy.zgk.market.util;

/**
 * Created by wpliu on 16/3/27.
 */

import java.util.UUID;

/**
 * ��ˮ�ţ����������ɹ�����
 */
public class NumberGenUtil {

    /**
     * ������ˮ�� 8-20λ
     * @return
     */
    public static String genStatementNo(){
            UUID  uuid=UUID.randomUUID();
        String uuidStr=uuid.toString();
        return uuidStr.substring(20);
    }


    /**
     * ���ɶ����� 1-32λ
     */
    public static String genOrderNo(){
        UUID uuid= UUID.randomUUID();
        String uuidStr=uuid.toString();
        return uuidStr.substring(0, 8) + uuidStr.substring(9, 13) + uuidStr.substring(14, 18) + uuidStr.substring(19, 23) + uuidStr.substring(24);
    }

    public static void main(String[] args){
       System.out.println(NumberGenUtil.genStatementNo());

    }
}
