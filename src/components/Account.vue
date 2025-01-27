<!-- filepath: /c:/Users/mkitsdts/OneDrive/mkitsdts/code/Program/Web/ExchangeProcess/front/src/components/Account.vue -->
<template>
    <div class="account-container">
      <h1>个人账户</h1>
      <div class="buttons-box">
        <div class="buttons">
          <button @click="viewBalance">余额</button>
          <button @click="viewOrders">订单</button>
          <button @click="logout">退出登录</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    methods: {
      viewBalance() {
        this.$router.push('/balance');
      },
      viewOrders() {
        this.$router.push('/orders');
      },
      logout() {
        this.$router.push('/login');
      }
    }
  };
  </script>
  
  <style scoped>
  .account-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background: url('src/assets/login_bg.jpg') no-repeat center center;
    background-size: cover;
  }
  
  .buttons-box {
    background: rgba(255, 255, 255, 0.8);
    padding: 60px;
    border-radius: 20px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  
  .buttons {
    display: flex;
    flex-direction: column;
    gap: 20px;
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
  
  .buttons button:last-child {
    background-color: #ff4d4d;
  }
  
  .buttons button:last-child:hover {
    background-color: #cc0000;
  }
  </style>