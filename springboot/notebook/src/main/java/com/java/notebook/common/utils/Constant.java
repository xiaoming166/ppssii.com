package com.java.notebook.common.utils;

/**
 * 常量
 *
 * @author Mark sunlightcs@gmail.com
 */
public class Constant {
	/** 超级管理员ID */
	public static final int SUPER_ADMIN = 1;

	public static final String COLLECTION= "c";

	public static final String tokenprefis="Bearer";

	public static final String DOWNED= "d";

    public static final String NODOWN= "nd";
    /**
     * 当前页码
     */
    public static final String PAGE = "page";
    /**
     * 每页显示记录数
     */
    public static final String LIMIT = "limit";
    /**
     * 排序字段
     */
    public static final String ORDER_FIELD = "sidx";
    /**
     * 排序方式
     */
    public static final String ORDER = "order";
    /**
     *  升序
     */
    public static final String ASC = "asc";

    public static final String DESC = "desc";
    public static final String PHONENUM_IS_FALL = "手机校验失败";
    public static final String PLEASE_TRY_LATER = "两分钟之后再试";
    public static final int VALIDATENUM_LENGTH = 4;
    public static final Integer NOTCOMPLETE = 0;
    public static final Integer ALREADYCOMPLETE = 1;
    public static final Integer NOTVIPLEVELID = 0;
    public static String VALIDATE_IS_FALL = "验证码校验失败";
    public static String PASSWORD_IS_FALL = "密码过长或为空";
    public static Integer alreadylogin = 1;
    public static Integer logout = 0;
    public static Integer alreadyBlack = 1;
    public static Integer notBlack = 1;
    public static Integer youke = 0;
    public static Integer yonghu = 1;

    /**
	 * 菜单类型
	 * 
	 * @author chenshun
	 * @email sunlightcs@gmail.com
	 * @date 2016年11月15日 下午1:24:29
	 */
    public enum MenuType {
        /**
         * 目录
         */
    	CATALOG(0),
        /**
         * 菜单
         */
        MENU(1),
        /**
         * 按钮
         */
        BUTTON(2);

        private int value;

        MenuType(int value) {
            this.value = value;
        }

        public int getValue() {
            return value;
        }
    }
    
    /**
     * 定时任务状态
     * 
     * @author chenshun
     * @email sunlightcs@gmail.com
     * @date 2016年12月3日 上午12:07:22
     */
    public enum ScheduleStatus {
        /**
         * 正常
         */
    	NORMAL(0),
        /**
         * 暂停
         */
    	PAUSE(1);

        private int value;

        ScheduleStatus(int value) {
            this.value = value;
        }
        
        public int getValue() {
            return value;
        }
    }

    /**
     * 云服务商
     */
    public enum CloudService {
        /**
         * 七牛云
         */
        QINIU(1),
        /**
         * 阿里云
         */
        ALIYUN(2),
        /**
         * 腾讯云
         */
        QCLOUD(3);

        private int value;

        CloudService(int value) {
            this.value = value;
        }

        public int getValue() {
            return value;
        }
    }

}
