<template>
  <div class="home-container">
    <div class="header">
      <h1 class="title">ESCROW</h1>
      <div class="back-button">
        <button @click="goToHome">⬅️</button>
      </div>
    </div>
    <div class="filter-buttons">
      <button @click="filterInfo('actionProcess')">操作流程</button>
      <button @click="filterInfo('smartTract')">智能合约</button>
      <button @click="filterInfo('logisticsInfo')">物流信息</button>
      <button @click="filterInfo('folder')">文件夹</button>
    </div>
    <div class="content">
      <div class="timeline">
        <div class="timeline-item" v-for="(node, index) in nodes" :key="index">
          <div class="circle-container">
            <div :class="['circle', { active: node.active }]"></div>
            <div v-if="index < nodes.length - 1" :class="['line', { active: nodes[index].active && nodes[index + 1].active }]"></div>
          </div>
          <div class="label">{{ node.label }}</div>
        </div>
      </div>
      <div v-if="selectedFilter === 'actionProcess'" class="operation-process">
        <h2>操作流程</h2>
        <table>
          <thead>
            <tr>
              <th>顺序</th>
              <th>流程</th>
              <th>操作内容</th>
              <th>操作方</th>
              <th>审核方</th>
              <th>操作时间</th>
              <th>审核时间</th>
              <th>状态</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(node, index) in nodes" :key="index" @click="goToOperation(index)">
              <td>{{ index + 1 }}</td>
              <td>{{ node.label }}</td>
              <td>{{ node.content }}</td>
              <td>{{ node.operation }}</td>
              <td>{{ node.audit }}</td>
              <td>{{ getTimeFromLog(index, 1) }}</td>
              <td>{{ getTimeFromLog(index, 2) }}</td>
              <td>{{ node.active ? '已确认' : '待确认' }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-if="selectedFilter === 'smartTract'" class="smart-contract">
        <h2>智能合约</h2>
        <div class="smart-contract-content">
          <div class="left-section">
            <div class="basic-info">
              <h3>基本信息</h3>
              <div class="info-row">
                <p><strong>产品种类:</strong> {{ order.product_category }}</p>
                <p><strong>交易币种:</strong> {{ getCurrencyType(order.currency_type) }}</p>
                <p><strong>是否匿名交易:</strong> {{ getAnonymity(order.is_anonymity)}}</p>
                <p><strong>贸易方式:</strong> {{ getOrderCategory() }}</p>
              </div>
                <p><strong>买方ID:</strong> {{ getBuyer() }}</p>
                <p><strong>卖方ID:</strong> {{ getSeller() }}</p>
                <p><strong>经纪人ID:</strong> {{ getTruster() }}</p>
            </div>
            <div class="transaction-terms">
              <strong><h3>交易条款</h3></strong>
              <div class="term-tables">
                <div class="term-table">
                  <h4>有效期</h4>
                  <p><strong>本次信托有效期（天）:</strong> {{ getExpiryDate() }}</p>
                  <p><strong>最迟装运日期:</strong> {{ order.delivery_date }}</p>
                  <p><strong>最迟到港日期:</strong> {{ getFinalArrivalTime() }}</p>
                  <p><strong>目的港检测期限（天）:</strong> {{ getCheckInPortPeriod() }}</p>
                </div>
                <div class="term-table">
                  <h4>允差值</h4>
                  <p><strong>允许交货数量误差范围:</strong> ±5%</p>
                  <p><strong>允许交货品质误差范围:</strong> ±5%</p>
                  <p><strong>允许结算单价上限:</strong> {{ getPriceUpperLimit() }}</p>
                  <p><strong>允许结算单价下限:</strong> {{ getPriceLowerLimit() }}</p>
                </div>
              </div>
              <div class="term-table">
                <h4>担保金</h4>
                <table>
                  <thead>
                    <tr>
                      <th>顺序</th>
                      <th>委托人</th>
                      <th>支付类型</th>
                      <th>支付比例</th>
                      <th>受益人</th>
                      <th>存入日期期限</th>
                      <th>触发条件</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>经纪人</td>
                      <td>履约金</td>
                      <td>0.05%</td>
                      <td>卖方</td>
                      <td>{{ getStartPaymentBrokerDepositDate() }}</td>
                      <td>买方未在支付期限内存入第三顺序的履约金</td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>卖方</td>
                      <td>履约金</td>
                      <td>1%</td>
                      <td>买方</td>
                      <td>{{ getGuaranteePaymentSellerDepositDate() }}</td>
                      <td>卖方未在有效期内完成装运、交付</td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>买方</td>
                      <td>定金</td>
                      <td>20%</td>
                      <td>卖方</td>
                      <td>{{ getDownPaymentBrokerDepositDate() }}</td>
                      <td>买方未在支付期限内存入完成定金存入</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="term-table">
                <h4>货款</h4>
                <table>
                  <thead>
                    <tr>
                      <th>顺序</th>
                      <th>委托人</th>
                      <th>支付类型</th>
                      <th>支付比例</th>
                      <th>受益人</th>
                      <th>存入节点期限</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>买方</td>
                      <td>货款</td>
                      <td>80%</td>
                      <td>卖方</td>
                      <td>船只到港发出NOR后3个银行工作日内</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="term-table">
                <h4>支付</h4>
                <table>
                  <thead>
                    <tr>
                      <th>顺序</th>
                      <th>委托人</th>
                      <th>支付类型</th>
                      <th>预计支付金额</th>
                      <th>受益人</th>
                      <th>实际结算金额</th>
                      <th>支付节点期限</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>买方</td>
                      <td>货款</td>
                      <td>{{ order.estimated_price * order.estimated_amount * order.final_payment_ratio }}</td>
                      <td>卖方</td>
                      <td>{{ order.actual_amount * order.actual_price * order.final_payment_ratio }}</td>
                      <td>目的港第三方机构检测报告发出后3个银行工作日内</td>
                    </tr>
                    <tr>
                      <td>1</td>
                      <td>卖方</td>
                      <td>佣金</td>
                      <td>{{ order.estimated_price * order.estimated_amount * order.truster_commission_ratio }}</td>
                      <td>经纪人</td>
                      <td>{{ order.actual_amount * order.actual_price * truster_commission_ratio }}</td>
                      <td>交易成功后5个银行工作日内</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div class="right-section">
            <div class="estimated-amount">
              <h3>交易预估数量与金额</h3>
                <div class="info-line">
                  <p><strong>交易预估单价:</strong> {{ order.estimated_price }}</p>
                  <p><strong>经纪人佣金:</strong> {{ order.estimated_amount }}</p>
                  <p><strong>交易预估数量:</strong> {{ order.estimated_amount }} 桶</p>
                  <p><strong>物流运输费:</strong> {{ order.estimated_price }}</p>
                  <p><strong>保险费:</strong> {{ order.currency_type }}</p>
                  <p><strong>其他杂费:</strong> {{ order.estimated_price }}</p>
                </div>
                <div>
                  <p><strong>总金额:</strong> {{ order.estimated_amount * order.estimated_price }}</p>
                </div>
            </div>
            <div class="guarantee-amount">
              <h3>担保金</h3>
                <div class="info-line">
                  <p><strong>经纪人已存入:</strong> {{ order.broker_deposit_amount }}</p>
                  <p><strong>卖方已存入:</strong> {{ order.seller_deposit_amount }}</p>
                  <p><strong>买方已存入:</strong> {{ order.buyer_deposit_amount }}</p>
                </div>
            </div>
            <div class="settlement-amount">
              <h3>结算金额</h3>
                <div class="info-line">
                  <p><strong>经纪人已存入:</strong> {{ order.broker_deposit_amount }}</p>
                  <p><strong>卖方已存入:</strong> {{ order.seller_deposit_amount }}</p>
                  <p><strong>买方已存入:</strong> {{ order.buyer_deposit_amount }}</p>
                </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="selectedFilter === 'logisticsInfo'" class="logistics-info">
        <h2>物流信息</h2>
        <!-- Add logistics information content here -->
      </div>
      <div v-if="selectedFilter === 'folder'" class="folder">
        <h2>文件夹</h2>
        <!-- Add folder content here -->
      </div>
    </div>
  </div>
</template>

<script>
import statusCodes from '../utils/statusCodes'; // Assuming statusCodes is a file with status code mappings
import typeCode from '../utils/typedef'; // Assuming constants is a file with order constants


export default {
  data() {
    return {
      selectedFilter: 'actionProcess', // Default filter
      timeLog: '',
      order: {},
      nodes: [
        { label: '发布交易', active: false , content: '设置订单条件并确认条件无误', 
          operation: '经纪人', audit: '买方卖方经纪人'},
        { label: '激活交易', active: false , content: '上传启动金转账凭证',
          operation: '经纪人', audit: '系统'},
        { label: '卖方存入担保金', active: false , content: '上传担保金转账凭证',
          operation: '卖方', audit: '系统'},
        { label: '买方存入定金', active: false , content: '上传定金转账凭证',
          operation: '买方', audit: '系统'},
        { label: '卖方完成装运发货', active: false , content: '上传提单等物流文件',
          operation: '卖方', audit: '买方'},
        { label: '发出抵达预计时间', active: false , content: '上传ETA文件',
          operation: '卖方', audit: '买方'},
        { label: '抵达目的港', active: false , content: '上传NOR和ATV文件',
          operation: '卖方', audit: '买方'},
        { label: '买方存入尾款', active: false , content: '上传尾款转账凭证',
          operation: '买方', audit: '系统'},
        { label: '卖方提交单证', active: false , content: '向信托地址邮寄单证',
          operation: '卖方', audit: '系统'},
        { label: '目的港第三方检测', active: false , content: '上传三方检测报告',
          operation: '买方', audit: '系统'},
        { label: '确认结算价格', active: false , content: '上传正式商业发票',
          operation: '卖方', audit: '买方'},
        { label: '完成支付结算', active: false , content: '上传结算转账凭证',
          operation: '系统', audit: '经纪人'},
      ]
    };
  },
  methods: {
    fetchOrderLog(order_id) {
      fetch('http://localhost:8080/order/log?id=' + order_id)
        .then(response => response.json())
        .then(data => {
          this.timeLog = data;
        })
        .catch(error => {
          console.error('Error fetching orders:', error);
        });
    },
    fetchOrderInfo(orderId){
      fetch('http://localhost:8080/order/detail?id=' + orderId)
        .then(response => response.json())
        .then(data => {
          this.order = data;
          this.updateNodes(data.status);
        })
        .catch(error => {
          console.error('Error fetching orders:', error);
        });
    },
    updateNodes(statusCode) {

      var currentStep = 0;
      
      if(statusCode === statusCodes.WaitForTrusterPayStartFund||
        statusCode === statusCodes.WaitForSysCheckStartFund){
        // 等待支付启动金或等待
        currentStep = 1;
      }else if(statusCode === statusCodes.WaitForSellerPayGuarantee ||
        statusCode === statusCodes.WaitForSysCheckGuarantee){
        // 等待存入担保金
        currentStep = 2;
      }else if(statusCode === statusCodes.WaitForBuyerDownPayment||
        statusCode === statusCodes.WaitForSysCheckDownPayment){
        // 等待存入订金
        currentStep = 3;
      }else if(statusCode === statusCodes.WaitForSellerDelivery||
      statusCode === statusCodes.WaitForSysCheckDelivery){
        // 等待装船发货
        currentStep = 4;
      }else if(statusCode === statusCodes.WaitForSellerUploadETA||
      statusCode === statusCodes.WaitForSysCheckETA){
        // 等待上传ETA
        currentStep = 5;
      }else if(statusCode === statusCodes.WaitForSellerUploadNORATV||
        statusCode === statusCodes.WaitForBuyerCheckNORATV){
        // 等待抵达目的港（发出NOR和ATV文件）
        currentStep = 6;
      }else if(statusCode === statusCodes.WaitForBuyerFinalPayment||
        statusCode === statusCodes.WaitForSysCheckFinalPayment){
        // 等待买方存入尾款
        currentStep = 7;
      }else if(statusCode === statusCodes.WaitForSellerUploadDocs||
        statusCode === statusCodes.WaitForSysCheckDocs){
        // 等待卖方提交单证
        currentStep = 8;
      }else if(statusCode === statusCodes.WaitForBuyerUploadThirdPartyReport||
        statusCode === statusCodes.WaitForSysCheckThirdPartyReport){
        // 等待目的港第三方检测
        currentStep = 9;
      }else if(statusCode === statusCodes.WaitForSellerConfirmFinalPrice||
        statusCode === statusCodes.WaitForBuyerConfirmFinalPrice){
        // 等待确认结算价格
        currentStep = 10;
      }else if(statusCode === statusCodes.WaitForSysUploadSettlementVoucher){
        // 等待完成支付结算
        currentStep = 11;
      }
      console.log('statusCode:', statusCode);
      console.log('currentStep:', currentStep);
      this.nodes.forEach((node, index) => {
        node.active = index <= currentStep;
      });
    },
    filterInfo(filter) {
      this.selectedFilter = filter;
    },
    goToHome() {
      this.$router.push('/home');
    },
    goToOperation(index) {
      const orderId = JSON.parse(this.$route.query.id);
      this.$router.push({ path: '/order/operation', query: { id: JSON.stringify(orderId), 
        index: JSON.stringify(index)} });
    },
    getTimeFromLog(index, order) {
      if(index === 0){
        // 发布交易
        if(order === 1){
          return this.timeLog.created_time;
        }else if(order === 2){
          return this.timeLog.confirm_created_time;
        }
      }else if(index === 1){
        // 等待支付启动金
        if(order === 1){
          return this.timeLog.startfund_payment_time;
        }else if(order === 2){
          return this.timeLog.startfund_confirm_time;
        }
      }else if(index === 2){
        // 等待存入担保金
        if(order === 1){
          return this.timeLog.guarantee_payment_time;
        }else if(order === 2){
          return this.timeLog.guarantee_confirm_time;
        }
      }else if(index === 3){
        // 等待存入订金
        if(order === 1){
          return this.timeLog.down_payment_time;
        }else if(order === 2){
          return this.timeLog.downpayment_confirm_time;
        }
      }else if(index === 4){
        // 等待装船发货
        if(order === 1){
          return this.timeLog.delivery_time;
        }else if(order === 2){
          return this.timeLog.delivery_confirm_time;
        }
      }else if(index === 5){
        // 等待上传ETA
        if(order === 1){
          return this.timeLog.estimated_arrived_time;
        }else if(order === 2){
          return this.timeLog.estimated_arrived_confirm_time;
        }
      }else if(index === 6){
        // 等待抵达目的港
        if(order === 1){
          return this.timeLog.actul_arrived_time;
        }else if(order === 2){
          return this.timeLog.actul_arrived_confirm_time;
        }
      }else if(index === 7){
        // 等待存入尾款
        if(order === 1){
          return this.timeLog.final_payment_time;
        }else if(order === 2){
          return this.timeLog.finalpayment_confirm_time;
        }
      }else if(index === 8){
        // 等待提交单证
        if(order === 1){
          return this.timeLog.delivery_voucher_time;
        }else if(order === 2){
          return this.timeLog.delivery_voucher_confirm_time;
        }
      }else if(index === 9){
        // 等待目的港第三方检测
        if(order === 1){
          return this.timeLog.third_party_inspection_time;
        }else if(order === 2){
          return this.timeLog.third_party_inspection_confirm_time;
        }
      }else if(index === 10){
        // 等待确认结算价格
        if(order === 1){
          return this.timeLog.confirm_actul_amount_time;
        }else if(order === 2){
          return this.timeLog.confirm_actul_amount_confirm_time;
        }
      }else if(index === 11){
        // 等待完成支付结算
        if(order === 1){
          return this.timeLog.order_complete_time;
        }else if(order === 2){
          return this.timeLog.order_complete_confirm_time;
        }
      }else{
        return '';
      }
    },
    getOrderCategory(){
      if(this.order.category === typeCode.OrderCategory.DES){
        return 'DES'
      }else{
        return '未知'
      }
    },
    getCurrencyType(currency){
      if(currency === typeCode.CurrencyType.USD){
        return '美元';
      }else if(currency === typeCode.CurrencyType.CNY){
        return '人民币';
      }else if(currency === typeCode.CurrencyType.HKD){
        return '港币';
      }else if(currency === typeCode.CurrencyType.EUR){
        return '欧元';
      }else if(currency === typeCode.CurrencyType.USDT){
        return 'USDT';
      }else if(currency === typeCode.CurrencyType.BTC){
        return 'BTC';
      }else{
        return '未知';
      }
    },
    getAnonymity(isAnonymity){
      if(isAnonymity === typeCode.OrderAnonymity.None){
        return '否';
      }else if(isAnonymity === typeCode.OrderAnonymity.All){
        return '是';
      }else{
        return '未知';
      }
    },
    getBuyer(){
      if(this.getAnonymity(this.order.is_anonymity) === '是'){
        return 'XX';
      }else{
        return this.order.buyer;
      }
    },
    getSeller(){
      if(this.getAnonymity(this.order.is_anonymity) === '是'){
        return 'XX';
      }else{
        return this.order.seller;
      }
    },
    getTruster(){
      if(this.getAnonymity(this.order.is_anonymity) === '是'){
        return 'XX';
      }else{
        return this.order.truster;
      }
    },
    getExpiryDate(){
      const beginDate = new Date(this.timeLog.created_time);
      console.log('begin date:', beginDate);
      const deliveryDate = new Date(this.order.delivery_date);
      const expiryDate = (deliveryDate.getTime() - beginDate.getTime()) / 24 * 60 * 60 * 1000 + typeCode.expiryDays;
      console.log('expiry date:', expiryDate);
      return expiryDate;
    },
    getFinalArrivalTime(){
      // 返回最迟到港日期
      const deliveryDate = new Date(this.order.delivery_date);
      const arrivalDate = new Date(deliveryDate.getTime() + typeCode.shipmentAndReceiptDays * 24 * 60 * 60 * 1000);
      console.log('arrival date:', arrivalDate);
      return arrivalDate;
    },
    getCheckInPortPeriod(){
      return typeCode.checkInPortPeriod;
    },
    getPriceUpperLimit(){
      return this.order.estimated_price * (1 + typeCode.productErrorRatio.UPPER);
    },
    getPriceLowerLimit(){
      return this.order.estimated_price * (1 + typeCode.productErrorRatio.LOWER);
    },
    getStartPaymentBrokerDepositDate(){
      const beginDate = new Date(this.timeLog.created_time);
      // 存入日期期限为订单创建后3天
      const endDate = new Date(beginDate.getTime() + typeCode.startPaymentBrokerDepositDays * 24 * 60 * 60 * 1000);
      return endDate;
    },
    getGuaranteePaymentSellerDepositDate(){
      const beginDate = new Date(this.timeLog.created_time);
      // 存入日期期限为订单创建后6天
      const endDate = new Date(beginDate.getTime() + typeCode.guaranteePaymentSellerDepositDays * 24 * 60 * 60 * 1000);
      return endDate;
    },
    getDownPaymentBrokerDepositDate(){
      const beginDate = new Date(this.timeLog.created_time);
      // 存入日期期限为订单创建后9天
      const endDate = new Date(beginDate.getTime() + typeCode.downPaymentBrokerDepositDays * 24 * 60 * 60 * 1000);
      return endDate;
    },
    getFinalPaymentBrokerDepositDate(){
      const beginDate = new Date(this.timeLog.created_time);
      // 存入日期期限为订单创建后3天
      const endDate = new Date(beginDate.getTime() + typeCode.finalPaymentBrokerDepositDays * 24 * 60 * 60 * 1000);
      return endDate;
    },
  },
  created() {
    const order_id = JSON.parse(this.$route.query.id); // Assuming the order ID is passed as a query parameter
    this.fetchOrderLog(order_id);
    this.fetchOrderInfo(order_id);
  }
};
</script>

<style>
.home-container {
  padding: 20px;
  background-image: url('@/assets/login_bg.jpg');
  background-size: cover;
  background-position: center;
  min-height: 100vh;
}

/* Header with back button positioned at top right */
.header {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}

.title {
  font-size: 24px;
  font-weight: bold;
}

.back-button {
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
}

.back-button button {
  border: none;
  background: none;
  font-size: 24px;
  cursor: pointer;
  color: #007bff;
}

.back-button button:hover {
  color: #0056b3;
}

.filter-buttons {
  display: flex;
  gap: 5px;
  margin-bottom: 10px;
}

.filter-buttons button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.filter-buttons button:hover {
  background-color: #0056b3;
}

.content {
  display: flex;
  justify-content: center;
}

.timeline {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 20px;
  width: 20%;
}

.timeline-item {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.circle-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 10px;
}

.circle {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid #007bff;
  background-color: white;
}

.circle.active {
  background-color: #007bff;
}

.line {
  width: 2px;
  height: 30px;
  background-color: #007bff;
}

.line.active {
  background-color: #007bff;
}

.line:not(.active) {
  border-left: 2px dashed #007bff;
}

.label {
  font-size: 16px;
}

.operation-process {
  width: 80%;
  margin-left: 20px;
}

.operation-process h2 {
  margin-bottom: 10px;
}

.operation-process table {
  width: 100%;
  border-collapse: collapse;
}

.operation-process th, .operation-process td {
  border: 1px solid #ccc;
  padding: 10px;
  text-align: left;
}

.operation-process th {
  background-color: #f4f4f4;
}

.smart-contract {
  width: 80%; /* Adjust the width of the smart contract content */
  margin-left: 20px;
}

.smart-contract-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.term-tables {
  display: flex;
  flex-wrap: wrap;
}
.term-table {
  flex: 1 1 50%;
  box-sizing: border-box;
  padding: 10px;
  border: 1px solid #ccc; /* 添加 1 像素宽的灰色边框 */
  padding: 10px; /* 给内容添加内边距，使内容与边框有一定间距 */
  margin-bottom: 10px; /* 给每个信息块添加底部外边距，使它们之间有间隔 */
  border-radius: 4px; /* 给边框添加圆角，使外观更美观 */
}

.left-section {
  flex: 0 0 70%;
  box-sizing: border-box;
  padding: 10px;
}

.right-section {
  flex: 0 0 30%;
  box-sizing: border-box;
  padding: 10px;
  /* 让 right-section 在交叉轴上靠上对齐 */
  align-self: flex-start; 
}

.basic-info, .transaction-terms, .estimated-amount, .guarantee-amount, .settlement-amount {
  border: 1px solid #ccc; /* 添加 1 像素宽的灰色边框 */
  padding: 10px; /* 给内容添加内边距，使内容与边框有一定间距 */
  margin-bottom: 10px; /* 给每个信息块添加底部外边距，使它们之间有间隔 */
  border-radius: 4px; /* 给边框添加圆角，使外观更美观 */
}

.basic-info h3, .transaction-terms h3, .estimated-amount h3, .guarantee-amount h3, .settlement-amount h3 {
  margin-bottom: 10px;
}

.info-row {
  display: flex;
  flex-wrap: wrap;
  gap: 25px;
}
.info-row p {
  margin: 10px;
}

.term-table {
  margin-bottom: 20px;
}

.term-table h4 {
  margin-bottom: 10px;
}

.smart-contract-content {
  display: grid;
  grid-template-columns: 70% 30%; 
  gap: 10px;  
}

.left-section, .right-section {
  box-sizing: border-box;
  padding: 10px;
}

</style>