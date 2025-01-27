<!-- filepath: /c:/Users/mkitsdts/OneDrive/mkitsdts/code/Program/Web/ExchangeProcess/front/src/components/Register.vue -->
<template>
  <div class="register-container">
    <div class="register-box">
      <h2>注册</h2>
      <input type="text" v-model="username" placeholder="账号">
      <input type="password" v-model="password" placeholder="密码">
      <button @click="navigateToLogin">返回</button>
      <button @click="register">注册</button>
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
    navigateToLogin() {
      this.$router.push('/login');
    },
    register() {
      if (this.username && this.password) {
        fetch(`http://localhost:8080/register?username=${this.username}&password=${this.password}`, {
          method: 'POST'
        })
        .then(response => {
          console.log('状态码:', response.status); // 打印状态码
          if (response.ok) {
            alert('注册成功');
            this.$router.push('/login');
          } else {
            alert('注册失败');
          }
        })
        .catch(error => {
          console.error('Failed to register:', error);
          alert('注册失败');
        });
      } else {
        alert('请输入账号和密码');
      }
    }
  }
};
</script>

<style scoped>
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: url('src/assets/login_bg.jpg') no-repeat center center;
  background-size: cover;
}

.register-box {
  background: rgba(255, 255, 255, 0.8);
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 300px;
}

.register-box h2 {
  margin-bottom: 20px;
}

.register-box input {
  display: block;
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.register-box button {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
}

.register-box button:hover {
  background-color: #0056b3;
}
</style>