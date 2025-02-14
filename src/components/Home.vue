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
    </div>
    <div class="start-transaction-container">
      <button class="start-transaction-button" @click="startTransaction">发起交易</button>
    </div>
    <table class="order-table">
      <thead>
        <tr>
          <th>序号</th>
          <th>信托合约编号</th>
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
        <tr 
          v-for="(order, index) in filteredOrders" 
          :key="order.id"
          @click="goToDetail(order)"
          style="cursor: pointer;"
        >
          <td>{{ index + 1 }}</td>
          <td>{{ order.id }}</td>
          <td>{{ getProductCategory(order.product_category) }}</td>
          <td>{{ order.estimated_amount }}</td>
          <td>{{ getUnit(order.unit) }}</td>
          <td>{{ order.estimated_price }}</td>
          <td>{{ getCurrencyType(order.currency_type) }}</td>
          <td>{{ order.estimated_amount * order.estimated_price }}</td>
          <td>{{ roles[order.id] }}</td>
          <td>{{ getProgressText(roles[order.id], order.status) }}</td>
          <td>{{ getStatusText(roles[order.id], order.status) }}</td>
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
  computed: {
    roles() {
      const roles = {};
      const username = localStorage.getItem('username');
      console.log(username);
      this.orders.forEach(order => {
        if (order.buyer === username) {
          roles[order.id] = 'buyer';
        } else if (order.seller === username) {
          roles[order.id] = 'seller';
        } else if (order.truster === username) {
          roles[order.id] = 'truster';
        }
      });
      return roles;
    }
  },
  methods: {
    fetchOrders() {
      fetch('http://localhost:8080/home')
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
      if (filter === 'all'){
        this.filteredOrders = this.orders;
      }else if (filter === 'ended'){
        this.filteredOrders = this.orders.filter(order => this.getProgressText(this.roles[order.id], order.status) === '已结束');
      }else if(filter === 'inProgress'){
        this.filteredOrders = this.orders.filter(order => this.getProgressText(this.roles[order.id], order.status) === '进行中');
      }else if(filter === 'actionNeeded'){
        this.filteredOrders = this.orders.filter(order => this.getProgressText(this.roles[order.id], order.status) === '需要采取行动');
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
    getStatusText(role, status) {
      if (role === 'buyer') {
        if (status > 0 && status <= 1000) {
          return '等待支付启动金';
        }
      } else if (role === 'seller') {
        // Add seller status text logic here
      } else if (role === 'truster') {
        // Add truster status text logic here
      } else {
        return '未知';
      }
    },
    getProgressText(role, progress) {
      if (role === 'buyer') {
        if ((progress > 0 && progress <= 3000) || (progress > 4000 && progress <= 5000)) {
          return '需要采取行动';
        } else if (progress > 0) {
          return '进行中';
        }
      } else if (role === 'seller') {
        if (progress > 0 && progress <= 2000 || progress > 3000 && progress <= 4000 || 
        progress > 5000 && progress <= 6000) {
          return '需要采取行动';
        } else if (progress > 0) {
          return '进行中';
        }
      } else if (role === 'truster') {
        if (progress > 0 && progress <= 1000 || progress > 2000 && progress <= 4000 || 
        progress > 6000 && progress <= 7000) {
          return '需要采取行动';
        } else if (progress > 0) {
          return '进行中';
        }
      } else {
        return '未知';
      }
    },
    getProductCategory(category){
      if(category === 1){
        return '石油';
      }else if(category === 2){
        return '天然气';
      }else{
        return '未知';
      }
    },
    getCurrencyType(currency){
      if(currency === 1){
        return '美元';
      }else if(currency === 2){
        return '人民币';
      }else if(currency === 3){
        return '港币';
      }else if(currency === 4){
        return '欧元';
      }else if(currency === 5){
        return 'USDT';
      }else if(currency === 6){
        return 'BTC';
      }else{
        return '未知';
      }
    },
    getUnit(unit){
      if(unit === 1){
        return '吨';
      }else if(unit === 2){
        return '桶';
      }else if(unit === 3){
        return '千立方米';
      }else if(unit === 4){
        return '百万英热';
      }else{
        return '未知';
      }
    },
    goToDetail(order) {
      this.$router.push({ path: '/order/detail', query: { id: JSON.stringify(order.id) }});
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
  position: relative;
  text-align: left;  /* Title will be aligned to the left */
  margin-bottom: 20px;
}

.title {
  display: inline-block;
  font-size: 24px;
  font-weight: bold;
}

.circle-buttons {
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
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