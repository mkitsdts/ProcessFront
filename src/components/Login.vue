<!-- filepath: /c:/Users/mkitsdts/OneDrive/mkitsdts/code/Program/Web/ExchangeProcess/front/src/components/Login.vue -->
<template>
  <div class="login-container">
    <div class="login-box">
      <h2>登录</h2>
      <input type="text" v-model="username" placeholder="账号">
      <input type="password" v-model="password" placeholder="密码">
      <button @click="navigateToRegister">注册</button>
      <button @click="login">登录</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: ''
    };
  },
  methods: {
    navigateToRegister() {
      this.$router.push('/register');
    },
    login() {
      if (this.username && this.password) {
        fetch(`http://localhost:8080/login?username=${this.username}&password=${this.password}`, {
          method: 'POST'
        })
        .then(response => {
          console.log('状态码:', response.status); // 打印状态码
          if (response.status == 200) {
            localStorage.setItem('username', this.username);
            this.$router.push('/account');
          } else if (response.status == 401) {
            alert('账号或密码错误');
          } else {
            alert('发生错误');
          }
        })
        .catch(error => {
          console.error('Failed to login:', error);
          alert('未知错误!');
        });
      } else {
        alert('请输入账号和密码');
      }
    }
  }
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: url('src/assets/login_bg.jpg') no-repeat center center;
  background-size: cover;
}

.login-box {
  background: rgba(255, 255, 255, 0.8);
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 300px;
}

.login-box h2 {
  margin-bottom: 20px;
}

.login-box input {
  display: block;
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.login-box button {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
}

.login-box button:hover {
  background-color: #0056b3;
}
</style>