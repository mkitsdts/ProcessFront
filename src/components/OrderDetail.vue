<!-- filepath: /c:/Users/mkitsdts/OneDrive/mkitsdts/code/Program/Web/ExchangeProcess/front/src/components/OrderDetail.vue -->
<template>
  <div class="order-detail-container">
    <div class="order-detail-box">
      <h1>订单详情</h1>
      <div v-if="order">
        <p>订单号: {{ order.id }}</p>
        <p>买方: {{ order.buyer }}</p>
        <p>卖方: {{ order.seller }}</p>
        <p>中间人: {{ order.truster }}</p>
        <p>产品类别: {{ order.product_category }}</p>
        <p>预估数量: {{ order.estimated_amount }} {{ order.unit }}</p>
        <p>预估价格: {{ order.estimated_price }} {{ order.currency_type }}</p>
        <p>检验期: {{ order.inspection_period }} 天</p>
        <p>首付比例: {{ order.down_payment_ratio }}</p>
        <p>尾款比例: {{ order.final_payment_ratio }}</p>
        <p>订单状态: {{ status }}</p>
      </div>
      <div class="buttons">
        <button @click="goBack">返回</button>
        <button v-if="order && order.status === -1" @click="confirmOrder">确认订单</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      order: null
    };
  },
  created() {
    this.fetchOrderDetail();
  },
  methods: {
    async fetchOrderDetail() {
      const orderId = this.$route.params.id;
      try {
        const response = await fetch(`http://localhost:8080/order?id=${orderId}`);
        this.order = await response.json();
        this.status = this.order.status === -1 ? '待确认' : '已确认';
      } catch (error) {
        console.error('Failed to fetch order detail:', error);
      }
    },
    goBack() {
      this.$router.push('/orders');
    },
    async confirmOrder() {
      // 这里可以添加发送请求到后端的逻辑
      try {
        const response = await fetch(`http://localhost:8080/order_confirm?id=${this.$route.params.id}`,{
          method: 'POST'
        });
        
        if (response.ok) {
          this.status = '已确认';
          alert('订单已确认');
          this.$router.push('/orders');
        } else {
          alert('确认失败');
        }
      } catch (error) {
        console.error('Failed to confirm the order:', error);
      }
    }
  }
};
</script>

<style scoped>
.order-detail-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: url('src/assets/login_bg.jpg') no-repeat center center;
  background-size: cover;
}

.order-detail-box {
  background: rgba(255, 255, 255, 0.8);
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 400px;
}

.order-detail-box h1 {
  margin-bottom: 20px;
}

.order-detail-box p {
  margin: 10px 0;
}

.buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.buttons button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
}

.buttons button:hover {
  background-color: #0056b3;
}
</style>