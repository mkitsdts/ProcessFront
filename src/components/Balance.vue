<!-- filepath: /c:/Users/mkitsdts/OneDrive/mkitsdts/code/Program/Web/ExchangeProcess/front/src/components/Balance.vue -->
<template>
  <div class="balance-container">
    <div class="balance-box">
      <h1>余额显示</h1>
      <div class="balance-type-buttons">
        <button @click="showFiat" :class="{ active: balanceType === 'fiat' }">法币</button>
        <button @click="showCrypto" :class="{ active: balanceType === 'crypto' }">虚拟币</button>
      </div>
      <table v-if="balanceType === 'fiat'">
        <thead>
          <tr>
            <th></th>
            <th>人民币</th>
            <th>港币</th>
            <th>美元</th>
            <th>欧元</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>总余额</td>
            <td>{{ balance.CNY_Total }}</td>
            <td>{{ balance.HKD_Total }}</td>
            <td>{{ balance.USD_Total }}</td>
            <td>{{ balance.EUR_Total }}</td>
          </tr>
          <tr>
            <td>可用余额</td>
            <td>{{ balance.CNY_Available }}</td>
            <td>{{ balance.HKD_Available }}</td>
            <td>{{ balance.USD_Available }}</td>
            <td>{{ balance.EUR_Available }}</td>
          </tr>
          <tr>
            <td>冻结余额</td>
            <td>{{ balance.CNY_Frozen }}</td>
            <td>{{ balance.HKD_Frozen }}</td>
            <td>{{ balance.USD_Frozen }}</td>
            <td>{{ balance.EUR_Frozen }}</td>
          </tr>
        </tbody>
      </table>
      <table v-else>
        <thead>
          <tr>
            <th></th>
            <th>比特币</th>
            <th>USDT</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>总余额</td>
            <td>{{ balance.BTC_Total }}</td>
            <td>{{ balance.USDT_Total }}</td>
          </tr>
          <tr>
            <td>可用余额</td>
            <td>{{ balance.BTC_Available }}</td>
            <td>{{ balance.USDT_Available }}</td>
          </tr>
          <tr>
            <td>冻结余额</td>
            <td>{{ balance.BTC_Frozen }}</td>
            <td>{{ balance.USDT_Frozen }}</td>
          </tr>
        </tbody>
      </table>
      <button @click="goBack">返回</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      balanceType: 'fiat',
      balance: {
        CNY_Total: 0,
        CNY_Available: 0,
        CNY_Frozen: 0,
        HKD_Total: 0,
        HKD_Available: 0,
        HKD_Frozen: 0,
        EUR_Total: 0,
        EUR_Available: 0,
        EUR_Frozen: 0,
        USD_Total: 0,
        USD_Available: 0,
        USD_Frozen: 0,
        BTC_Total: 0,
        BTC_Available: 0,
        BTC_Frozen: 0,
        USDT_Total: 0,
        USDT_Available: 0,
        USDT_Frozen: 0
      }
    };
  },
  created() {
    this.fetchBalance();
  },
  methods: {
    async fetchBalance() {
      try {
        const username = localStorage.getItem('username'); // 从路由参数中获取用户名
        console.log('username:', username);
        const response = await fetch(`http://localhost:8080/balance?username=${username}`);
        this.balance = await response.json();
      } catch (error) {
        console.error('Failed to fetch balance:', error);
      }
    },
    showFiat() {
      this.balanceType = 'fiat';
    },
    showCrypto() {
      this.balanceType = 'crypto';
    },
    goBack() {
      this.$router.push('/account');
    }
  }
};
</script>

<style scoped>
.balance-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: url('src/assets/login_bg.jpg') no-repeat center center;
  background-size: cover;
}

.balance-box {
  background: rgba(255, 255, 255, 0.8);
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 700px;
}

.balance-box h1 {
  margin-bottom: 20px;
}

.balance-type-buttons {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.balance-type-buttons button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  margin: 0 10px;
}

.balance-type-buttons button.active {
  background-color: #0056b3;
}

.balance-box table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

.balance-box th,
.balance-box td {
  border: 1px solid #ddd;
  padding: 10px;
  text-align: center;
}

.balance-box th {
  background-color: #f2f2f2;
}

.balance-box button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
}

.balance-box button:hover {
  background-color: #0056b3;
}
</style>