package cn.thinkjoy.zgk.market.common;

/**
 * Created by xgfan on 14-12-4.
 */
public enum ERRORCODE {

	PARAM_ERROR("0100001", "��������"), FAIL("0100002", "ʧ��"), PHONE_FORMAT_ERROR("0100003", "�绰�����ʽ����"), ACCOUNT_NO_EXIST("0100004", "�˻�������"), TEACHER_NO_EXIST("0100005", "��ʦ������"), PARENT_NO_EXIST("0100006", "�ҳ�������"), CHILD_NO_EXIST("0100007", "���Ӳ�����"), STUDENT_NO_EXIST("0100008", "ѧ��������"), CLASS_NO_EXIST("0100009", "�༶������"), GROUP_NO_EXIST("0100010", "Ⱥ�鲻����"),
	SCHOOL_NO_EXIST("0100011", "ѧУ������"),
	USER_NO_EXIST("0100012", "�û�������"),

	AUTHENTICATION_FAIL("0100020", "��Ȩʧ��"),

	/**
	 * ��¼
	 */

	LOGIN_PHONE_FORMAT_ERROR("0200001", "�绰�����ʽ����"), LOGIN_ACCOUNT_NO_EXIST("0200002", "�˻�������"), LOGIN_PASSWORD_ERROR("0200003", "�������"), LOGIN_ERROR("0200004", "��¼ʧ��"),

	/**
	 * ��֤���������
	 */

	UPDATE_PASSWORD_ERROR("0300001", "��������ʧ��"),

	/**
	 * ��֤��
	 */

	CHECK_SMSCODE_ERROR("0400001", "��֤���������"), CHECK_SMSCODE_EXPIRE("0400002", "��֤��ʧЧ"),
	/**
	 * ������֤��ʧ��
	 */

	SEND_SMSCODE_ERROR("0500001", "������֤��ʧ��"), SEND_SMSCODE_MORE("0500002", "��ȡ��֤��̫Ƶ��,���Ժ�����"),
	ORDER_VIP_REPEAT("0600001", "�ظ�����"),
	PARAM_ISNULL("0700001","��������Ϊ��"),
	NO_RECORD("0800001","�޼�¼"),
	VIP_EXIST("0900001","���û��Ѿ���VIP�ˣ������ظ�����"),
	VIP_CARD_NOT_INVALID("0900002","�ÿ���Ч"),
	RESTFUL_INTERFACE_ISNULL("1000001","���������ݽӿڷ�������Ϊ��"),
	RESTFUL_INTERFACE_ISERROR("1000002","���������ݽӿ��쳣"),
	CREATE_VERIFY_CODE_ERROR("1000003","������֤�뷢������!"),
	NO_LOGIN("1000004","���ȵ�¼���ٽ��в���"),
	VERIFY_CODE_ERROR("0100005", "��֤�����!"),
	NOT_IS_VIP_ERROR("0100006", "������VIP�û��ſ�ʹ�øù��ܣ��������VIP�û�ȥ�ɣ�"),


	UPLOAD_ERROR_0("1100001", "�Ƿ��ϴ�!"),

	UPLOAD_ERROR_405("1100002", "���ϴ��ļ�!"),

	UPLOAD_ERROR_400("1100003", "�ļ�������С����!"),

	UPLOAD_ERROR_401("1100004", "���ֽڵ��ļ�!"),

	UPLOAD_ERROR_402("1100005", "��Ч���ļ�����!"),

	UPLOAD_ERROR_500("1100006", "����˷�������!");










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
	private ERRORCODE(String code, String message) {
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