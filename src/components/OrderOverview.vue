<!-- filepath: /c:/Users/mkitsdts/OneDrive/mkitsdts/code/Program/Web/ExchangeProcess/front/src/components/OrderOverview.vue -->
<template>
  <div class="order-overview-container">
    <div class="order-overview-box">
      <div class="header">
        <h1>订单总览</h1>
        <button class="back-button" @click="goBack">返回账户界面</button>
      </div>
      <div class="order-list">
        <div
          v-for="(order, index) in orders"
          :key="index"
          class="order-item"
        >
          <p>订单号码: {{ order.id }}</p>
          <p>产品类别: {{ order.product_category }}</p>
          <p>预估价格: {{ order.estimated_price }} {{ order.currency_type }}</p>
          <p>预估数量: {{ order.estimated_amount }} {{ order.unit }}</p>
          <button @click="viewOrderDetail(order.id)">订单详情</button>
        </div>
      </div>
      <button class="add-order-button" @click="createOrder">+</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      orders: []
    };
  },
  created() {
    this.fetchOrders();
  },
  methods: {
    async fetchOrders() {
      try {
        const username = localStorage.getItem('username');
        console.log("username: ",username);
        const response = await fetch(`http://localhost:8080/orders?username=${username}`);
        this.orders = await response.json();
      } catch (error) {
        console.error('Failed to fetch orders:', error);
      }
    },
    viewOrderDetail(index) {
      this.$router.push(`/order/${index}`);
    },
    createOrder() {
      this.$router.push('/create-order');
    },
    goBack() {
      this.$router.push('/account');
    }
  }
};
</script>

<style scoped>
.order-overview-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: url('src/assets/login_bg.jpg') no-repeat center center;
  background-size: cover;
}

.order-overview-box {
  background: rgba(255, 255, 255, 0.8);
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 80%;
  max-width: 1200px;
  text-align: center;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.back-button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
}

.back-button:hover {
  background-color: #0056b3;
}

.order-list {
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  height: 400px;
  padding: 10px 0;
}

.order-item {
  background: #f9f9f9;
  border: 1px solid #ddd;
  padding: 10px;
  margin: 10px 0;
  cursor: pointer;
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.order-item button {
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
}

.order-item button:hover {
  background-color: #0056b3;
}

.add-order-button {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  font-size: 24px;
  cursor: pointer;
}

.add-order-button:hover {
  background-color: #0056b3;
}
</style>