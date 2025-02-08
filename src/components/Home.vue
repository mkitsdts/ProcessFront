<template>
  <div class="home-container">
    <div class="header">
      <h1 class="title">ESCROW</h1>
      <div class="circle-buttons">
        <button class="circle-button" @click="goToWallet">💰</button>
        <button class="circle-button" @click="goToProfile">👤</button>
        <button class="circle-button" @click="goToSettings">⚙️</button>
        <button class="circle-button" @click="logout">🚪</button>
      </div>
    </div>
    <div class="filter-buttons">
      <button @click="filterOrders('ended')">已结束</button>
      <button @click="filterOrders('all')">全部交易</button>
      <button @click="filterOrders('inProgress')">进行中</button>
      <button @click="filterOrders('actionNeeded')">需要采取行动</button>
      <button @click="filterOrders('participate')">可参与</button>
    </div>
    <div class="start-transaction-container">
      <button class="start-transaction-button" @click="startTransaction">发起交易</button>
    </div>
    <table class="order-table">
      <thead>
        <tr>
          <th>序号</th>
          <th>信托合约编号</th>
          <th>创建人</th>
          <th>交易产品</th>
          <th>交易数量</th>
          <th>数量单位</th>
          <th>预估交易单价</th>
          <th>金额单位</th>
          <th>预估交易总金额</th>
          <th>我的角色</th>
          <th>进展</th>
          <th>状态</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(order, index) in filteredOrders" :key="order.id">
          <td>{{ index + 1 }}</td>
          <td>{{ order.id }}</td>
          <td>{{ order.creator }}</td>
          <td>{{ order.product_category }}</td>
          <td>{{ order.estimated_amount }}</td>
          <td>{{ order.unit }}</td>
          <td>{{ order.estimated_price }}</td>
          <td>{{ order.currency_type }}</td>
          <td>{{ order.estimated_amount * order.estimated_price }}</td>
          <td>{{ 'buyer' }}</td>
          <td>{{ order.progress }}</td>
          <td>{{ getStatusText(order.status) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      orders: [],
      filteredOrders: []
    };
  },
  methods: {
    fetchOrders() {
      fetch('http://localhost:8080/home?id=test')
        .then(response => response.json())
        .then(data => {
          this.orders = data;
          this.filteredOrders = data;
        })
        .catch(error => {
          console.error('Error fetching orders:', error);
        });
    },
    filterOrders(filter) {
      switch (filter) {
        case 'ended':
          this.filteredOrders = this.orders.filter(order => order.status === 'ended');
          break;
        case 'all':
          this.filteredOrders = this.orders;
          break;
        case 'inProgress':
          this.filteredOrders = this.orders.filter(order => order.status === 'inProgress');
          break;
        case 'actionNeeded':
          this.filteredOrders = this.orders.filter(order => order.status === 'actionNeeded');
          break;
        case 'participate':
          this.filteredOrders = this.orders.filter(order => order.status === 'participate');
          break;
        default:
          this.filteredOrders = this.orders;
      }
    },
    startTransaction() {
      this.$router.push('/order/create');
    },
    goToWallet() {
      this.$router.push('/wallet');
    },
    goToProfile() {
      this.$router.push('/profile');
    },
    goToSettings() {
      this.$router.push('/setting');
    },
    logout() {
      this.$router.push('/login');
    },
    getStatusText(status) {
      switch (status) {
        case 0:
          return '可参与';
        case 1:
          return '进行中';
        case 2:
          return '需要买方采取行动';
        case 3:
          return '需要卖方采取行动';
        default:
          return '状态异常';
      }
    }
  },
  created() {
    this.fetchOrders();
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

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.title {
  font-size: 24px;
  font-weight: bold;
}

.circle-buttons {
  display: flex;
  gap: 10px;
}

.circle-button {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #007bff;
  border: none;
  cursor: pointer;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
}

.circle-button:hover {
  background-color: #0056b3;
}

.filter-buttons {
  display: flex;
  gap: 10px;
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

.start-transaction-container {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
}

.start-transaction-button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.start-transaction-button:hover {
  background-color: #0056b3;
}

.order-table {
  width: 100%;
  border-collapse: collapse;
}

.order-table th, .order-table td {
  border: 1px solid #ccc;
  padding: 10px;
  text-align: left;
}

.order-table th {
  background-color: #f4f4f4;
}
</style>