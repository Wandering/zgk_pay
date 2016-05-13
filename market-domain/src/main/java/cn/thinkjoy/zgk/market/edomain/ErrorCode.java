package cn.thinkjoy.zgk.market.edomain;

/**
 * Created by yangguorong on 16/4/28.
 */
public enum ErrorCode {

    ERROR_PARAM("0200001","提现金额不能大于钱包余额"),
    UPLOAD_FAIL("0200002","上传失败");

    /** The code. */
    private final String code;

    /** The message. */
    private final String message;

    /**
     * Instantiates a new error type.
     *
     * @param code
     *            the code
     * @param message
     *            the message
     */
    private ErrorCode(String code, String message) {
        this.code = code;
        this.message = message;
    }

    /**
     * Gets the code.
     *
     * @return the code
     */
    public String getCode() {
        return code;
    }

    /**
     * Gets the message.
     *
     * @return the message
     */
    public String getMessage() {
        return message;
    }
}
