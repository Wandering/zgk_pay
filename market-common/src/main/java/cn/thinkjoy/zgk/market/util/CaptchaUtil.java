package cn.thinkjoy.zgk.market.util;


import cn.thinkjoy.zgk.market.constant.CaptchaConst;

import java.awt.*;
import java.awt.image.BufferedImage;
import java.util.Random;

public class CaptchaUtil {
    /**
     * �����ַ���
     */
    public static String getRandomString(BufferedImage image){
        Random random = new Random();
        //����Image�����Graphics����,�Ķ��������ͼ���Ͻ��и��ֻ��Ʋ���
        Graphics g = image.getGraphics();
        g.fillRect(0, 0, image.getWidth(),image.getHeight());
//        g.setFont(CaptchaConst.FIXEDSYS);
        g.setFont(CaptchaConst.BASE_FONTS[random.nextInt(4)]);
//        g.setFont(CaptchaConst.FONT_NEWROMAN);

        g.setColor(CaptchaConst.PURPLE_COLOR);

        // ���߿�
		g.drawRect(0, 0, CaptchaConst.PIC_WIDTH- 1, CaptchaConst.PIC_HEIGHT - 1);
        int red = 0, green = 0, blue = 0;
        //��������ַ�
        StringBuffer randomString = new StringBuffer("");
        String rand = null;
//        int stringPoint = CaptchaConst.TRANSLATE_START*random.nextInt(3);
        for(int i=1;i<=CaptchaConst.RANDOM_STRING_NUM;i++){
            rand = String.valueOf(CaptchaConst.RAND_STRING.charAt(random.nextInt(CaptchaConst.RAND_STRING.length()-1)));
            randomString.append(rand);
            // �����������ɫ������������ɫֵ�����������ÿλ���ֵ���ɫֵ������ͬ��
            red = random.nextInt(255);
            green = random.nextInt(255);
            blue = random.nextInt(255);
            g.translate(0, 0);
            g.setColor(new Color(red, green, blue));
//            g.drawString(rand,CaptchaConst.FONT_SPACING , 16);
            if(i==1){
                g.drawString(rand, CaptchaConst.FONT_SPACING, CaptchaConst.TRANSLATE_START);
            }else {
                g.drawString(rand, i* CaptchaConst.FONT_SPACING, CaptchaConst.TRANSLATE_START);
            }
        }
        g.dispose();
        g=null;
        return randomString.toString();
    }
    /**
     * ��������ַ���
     */
    public static String getRandomString(){
        Random random = new Random();
        StringBuffer randomString = new StringBuffer("");
        String rand = null;
        for(int i=1;i<=CaptchaConst.RANDOM_STRING_NUM;i++){
            rand = String.valueOf(CaptchaConst.RAND_STRING.charAt(random.nextInt(CaptchaConst.RAND_STRING.length()-1)));
            randomString.append(rand);
        }
        return randomString.toString();
    }

    /**
     * ��������ַ���
     */
    public static String getRandomString(int randomLength){
        Random random = new Random();
        StringBuffer randomString = new StringBuffer("");
        String rand = null;
        for(int i=1;i<=randomLength;i++){
            rand = String.valueOf(CaptchaConst.RAND_STRING.charAt(random.nextInt(CaptchaConst.RAND_STRING.length()-1)));
            randomString.append(rand);
        }
        return randomString.toString();
    }

    /**
     * ������������ַ���
     */
    public static String getRandomNumString(int randomLength){
        Random random = new Random();
        StringBuffer randomString = new StringBuffer("");
        String rand = null;
        for(int i=1;i<=randomLength;i++){
            rand = String.valueOf(CaptchaConst.RAND_NUM_STRING.charAt(random.nextInt(CaptchaConst.RAND_NUM_STRING.length()-1)));
            randomString.append(rand);
        }
        return randomString.toString();
    }
}