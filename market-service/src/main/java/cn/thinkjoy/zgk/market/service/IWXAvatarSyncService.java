package cn.thinkjoy.zgk.market.service;

import cn.thinkjoy.zgk.market.pojo.UploadFileReturn;

/**
 * Created by douzy on 16/5/12.
 */
public interface IWXAvatarSyncService  {
    /**
     * 微信远程图片处理
     * @param mediaId
     * @return
     */
    public UploadFileReturn remoteImgExec(String mediaId);
}
