import Axios from './resources'

export default {
  /**
   * 1.4.6上传图片接口
   * @param  {objece} file
   * @param  {string} type 1:任务2：头像；3：工程师认证
   * @return {json}
   * success
     {"msg":"1","msgCondition":"上传成功","picUrl2":"/cloud/orderImage/1461653838917.jpeg","picUrl":"http://localhost:8011/cloud/orderImage/1461653838917.jpeg"}
   * error
      {"msg":"0","msgCondition":"上传失败"}
   */
  getUploadFile: params => Axios.post('webI!getUploadFile.do', params),
  /**
   * 1.4.8发布\修改任务接口
   * @param  {object} jsonResult 表单数据
   * @return {json}
   */
  saveOrder: params => Axios.post('webI!saveOrder.do', JSON.stringify(params)),
    /**
   * 1.4.10 获取工单详情
   * @param {tring} oid 工单id
   */
  getOrder: id => Axios.get('webI!getOrder.do', { params : { id }}),
    /**
   * 1.4.12 获取工单详情
   * @param {tring} oid 工单id
   */
  getOrderDetail: id => Axios.get('webI!getOrderDetail.do', { params : { id }}),
  /**
   * 1.4.9获取企业发布的任务列表-分页
   * - 全部任务 type = a
    - 待抢单 type = f
    - 执行中 type = j
    - 待付款 type = t
    - 待评价 type = c
   */
  getOrderPList: params => Axios.get('webI!getOrderPList.do', { params }),
  /**
   * 1.4.15获取任务分类接口-分页
   * @param  {string} type 0：获取全部；1：分页获取（必须
   * @param  {string} pageSize 每页显示条数（如果type=1必须
   * @param  {string} col_type 类型；1：企业；2：个人（必须）
   * @return {json}
   */
  getColumnPList: params => Axios.get('webI!getColumnPList.do', { params }),
  /**
   * 1.4.16获取菜单接口
   * @param  {[string]} colId 任务分类id
   * @return {json}  [{"id":"16f4f368-fbc1-43cf-92ff-7b45f5687501","labelName":"标签二"},{"id":"66f756fa-15c5-4307-97c8-04c6be6eef60","labelName":"标签一"}]
   */
  getLabelList: colId => Axios.get('webI!getLabelList.do', { params: { colId } }),
  /**
   * 1.4.18获取区域列表
   */
  getArea: params => Axios.get('webI!listArea.do', { params }),
  /**
   * 1.4.19获取工程师列表接口-分页
   * @param  {string} offset 页码，从1开始（必须）
   * @param  {string} pageSize 每页显示条数（必须）
   * @return {json} [{"authMobile":"13671574203","id":10,"isAuth":"n","nickName":"ServiceID357","uid":"fd302def-05a9-4511-acec-f424bedc2528","userType":"2"}]
   * @return 返回字段说明
       uid;//用户唯一表示uid
       username;//前端登录用户名
       userType;//企业：1；个人：2
       status;//禁用n:启用：y
       authMobile;//手机认证号码
       wallet;//钱包
       trueName;//真实姓名
       sex;//1:男；2:女;3:其他
       birthday;//2014-12-18
       nickName;//昵称
       mobile;//手机
       email;//邮箱
       cardPic;//身份证图片
       interestedTypeName;//感兴趣的类别，逗号隔开
       headUrl;//头像
      isAuth;//是否已认证y:是；n:否
   */
  getUserList: () => Axios.get('webI!getUserList.do', { params: { offset:1, pageSize: 100 } }),
  /**
   * 1.4.20手机号获取个人用户信息接口
   * @param  {string} authMobile 注册时的手机号
   * @return {json}
   */
  getUserBy: authMobile => Axios.get('webI!getUserBy.do', { params: { authMobile } }),

  /**
   * 1.4.24 获取区域模板左边菜单数据
   * @param  {string} tempId 模板id
   * @return {json}
   */
  getAreaLeft: tempId => Axios.get('webI!getAreaLeft.do', { params: { tempId }}),

  /**
   * 1.4.25 新建模板接口
   * @param  {json} jsonResult
   * @return {json}
   */
  saveTemp: params => Axios.post('webI!saveTemp.do', params),

  /**
   * 1.4.26 修改模板接口
   * @param  {json} jsonResult
   * @return {json}
   */
  updateTemp: params => Axios.post('webI!updateTemp.do', params),

  /**
   * 1.4.27 删除模板接口
   * @param  {string} id 模板id
   * @return {json}
   */
  deleteTemp: id => Axios.get('webI!deleteTemp.do', { params: { id }}),

  /**
   * 1.4.28 获取模板列表接口
   * @return {json}
   */
  getTempList: () => Axios.get('webI!getTempList.do', { params: { offset:1, pageSize: 100 } }),


  /**
   * 1.4.36 获取模板列表接口
   * @return {json}
   */
  getTempRuleList: tempId => Axios.get('webI!getTempRuleList.do', { params: { offset:1, pageSize: 100, tempId } }),

  /**
   * 1.4.37 保存模板区域
   * @param  {obj} jsonResult
   * @return {json}
   */
  saveAreaRule: params => Axios.post('webI!saveAreaRule.do', params),

  /**
   * 1.4.38 删除模板区域
   * @param  {string} id
   * @return {json}
   */
  deleteAreaRule: id => Axios.get('webI!deleteAreaRule.do', { params: { ids: id }}),

  /**
   * 1.4.39 重新发布任务
   * @param  {string} id：任务id
   * @return {json}
   */
  reloadSaveOrder: id => Axios.get('webI!reloadSaveOrder.do',  { params: { id }}),

  /**
   * 1.4.40 获取接单人列表
   * @param  {string} id：任务id
   * @return {json}
   */
  getOrderDetailUserPList: id => Axios.get('webI!getOrderDetailUserPList.do',  { params: { offset: 1, pageSize: 1000, id }}),

  /**
   * 1.4.41 确认接单人
   * @param  {string} id：任务id
   * @return {json}
   */
  getAssignOrderDetailUser: id => Axios.get('webI!getAssignOrderDetailUser.do', { params: { id }}),

  /**
   * 1.4.42 任务取消
   * @param  {string} id：任务id
   * @return {json}
   */
  getDeleteOrder: id => Axios.get('webI!getDeleteOrder.do', { params: { id }}),

  /**
   * 1.4.43 发送消息
   * @param  {string} id：任务id
   * @return {json}
   */
  sendMessage: params => Axios.post('http://10.9.200.11:8080/cloud/clientI!sendMessage.do', params),


  /**
   * 1.4.47 提交任务评价
   * @param  {object} json 评价内容和评分
   * @return {json}
   */
  saveComment: params => Axios.post('webI!saveComment.do', params),

  /**
   * 1.4.50 获取任务进度
   * @param  {object} json 任务进度内容列表
   * @return {json}
   */
  getOrderLog: odtId => Axios.get('webI!getOrderLog.do', { params: { offset: 1, pageSize: 1000, serviceType: 1, odtId }}),

  /**
   * 1.4.51 工单微信扫码支付
   * @param  {string} odtId 工单id
   * @param  {string} doType 工单类型
   * @return {json} json.filePath 二维码链接
   */
  wxpayQRCode: (odtId, doType) => Axios.get('webI!wxpayQRCode.do', { params: { odtId, doType } })
}
