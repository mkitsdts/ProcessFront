<!-- filepath: /c:/Users/mkitsdts/OneDrive/mkitsdts/code/Program/Web/ExchangeProcess/front/src/components/Register.vue -->
<template>
  <div class="register-container">
    <div class="register-box">
      <h2>注册</h2>
      <input type="text" v-model="username" placeholder="账号">
      <input type="password" v-model="password" placeholder="密码">
      <div class="verification-code-container">
        <input v-model="verificationCode" placeholder="验证码" />
        <button @click="getVerificationCode" :disabled="isButtonDisabled">
          {{ isButtonDisabled ? countdown + 's' : '获取验证码' }}
        </button>
      </div>
      <button @click="register">注册</button>
      <button @click="navigateToLogin">返回</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      verificationCode: '',
      countdown: 60,
      isButtonDisabled: false
    };
  },
  methods: {
    navigateToLogin() {
      this.$router.push('/login');
    },
    getVerificationCode() {
      this.isButtonDisabled = true;
      this.countdown = 60;
      const countdownInterval = setInterval(() => {
        if (this.countdown > 0) {
          this.countdown--;
        } else {
          clearInterval(countdownInterval);
          this.isButtonDisabled = false;
        }
      }, 1000);

      fetch(`http://localhost:8080/getVerificationCode`, {
        method: 'GET'
      })
      .then(response => response.json())
      .then(data => {
        console.log('Verification code:', data.code);
      })
      .catch(error => {
        console.error('Error fetching verification code:', error);
      });
    },
    register() {
      if (this.username && this.password && this.verificationCode) {
        fetch(`http://localhost:8080/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: this.username,
            password: this.password,
            verificationCode: this.verificationCode
          })
        })
        .then(response => response.json())
        .then(data => {
          console.log('Registration successful:', data);
        })
        .catch(error => {
          console.error('Error registering:', error);
        });
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

.verification-code-container {
  display: flex;
  align-items: center;
}
.verification-code-container input {
  flex: 4;
}
.verification-code-container button {
  flex: 1;
  margin-left: 10px;
  padding: 5px 10px;
}
</style>