<template>
  <div class="order-form-container">
    <h1 class="main-title">ESCROW</h1>
    <h2 class="sub-title">创建订单</h2>
    <form @submit.prevent="nextStep">
      <div>
        <label>选择角色</label>
        <div class="role-selection">
          <button type="button" :class="{ active: role === 'buyer' }" @click="role = 'buyer'">买家</button>
          <button type="button" :class="{ active: role === 'seller' }" @click="role = 'seller'">卖家</button>
          <button type="button" :class="{ active: role === 'truster' }" @click="role = 'truster'">中间人</button>
        </div>
      </div>
      <div v-if="role === 'buyer'">
        <div class="input-grid">
          <div>
            <label for="seller">卖方ID</label>
            <input type="text" id="seller" v-model="seller" required>
          </div>
          <div>
            <label for="truster">中间人ID</label>
            <input type="text" id="truster" v-model="truster">
          </div>
        </div>
      </div>
      <div v-if="role === 'seller'">
        <div class="input-grid">
          <div>
            <label for="buyer">买方ID</label>
            <input type="text" id="buyer" v-model="buyer" required>
          </div>
          <div>
            <label for="truster">中间人ID</label>
            <input type="text" id="truster" v-model="truster">
          </div>
        </div>
      </div>
      <div v-if="role === 'truster'">
        <div class="input-grid">
          <div>
            <label for="buyerId">买方ID</label>
            <input type="text" id="buyerId" v-model="buyer" required>
          </div>
          <div>
            <label for="sellerId">卖方ID</label>
            <input type="text" id="sellerId" v-model="seller" required>
          </div>
        </div>
      </div>
      <div>
        <label for="category">贸易方式</label>
        <select id="category" v-model="category" required>
          <option value="DES">DES</option>
        </select>
      </div>
      <div>
        <label for="product_category">物品种类</label>
        <select id="product_category" v-model="product_category" required @change="updateQuantityUnits">
          <option value="石油">石油</option>
          <option value="天然气">天然气</option>
        </select>
      </div>
      <div class="input-grid">
        <div>
          <label for="estimated_price">单价</label>
          <input type="number" id="estimated_price" v-model="estimated_price" required min="0.00">
        </div>
        <div>
          <label for="currency_type">单位</label>
          <select v-model="currency_type" required>
            <option value="美元">美元</option>
            <option value="欧元">欧元</option>
            <option value="人民币">人民币</option>
            <option value="港币">港币</option>
            <option value="比特币">比特币</option>
          </select>
        </div>
      </div>
      <div class="input-grid">
        <div>
          <label for="estimated_amount">数量</label>
          <input type="number" id="estimated_amount" v-model="estimated_amount" required min="0.00">
        </div>
        <div>
          <label for="product_unit">单位</label>
          <select v-model="product_unit" required>
            <option v-for="unit in quantityUnits" :key="unit" :value="unit">{{ unit }}</option>
          </select>
        </div>
      </div>
      <div class="input-grid">
        <div>
          <label for="down_payment_ratio">首付比例</label>
          <input type="number" id="down_payment_ratio" v-model="down_payment_ratio" step="0.01" min="0" max="1" required @input="validatePaymentRatios">
        </div>
        <div>
          <label for="final_payment_ratio">尾款比例</label>
          <input type="number" id="final_payment_ratio" v-model="final_payment_ratio" step="0.01" min="0" max="1" required @input="validatePaymentRatios">
        </div>
      </div>
      <div>
        <label for="truster_commission_ratio">佣金比例</label>
        <input type="number" id="truster_commission_ratio" v-model="truster_commission_ratio" step="0.01" min="0" max="1">
      </div>
      <div>
        <label for="delivery_date">装船日期</label>
        <input type="date" id="delivery_date" v-model="delivery_date" required>
      </div>
      <div class="button-group">
        <button type="submit" :disabled="!isPaymentRatioValid">提交</button>
        <button type="button" @click="goToHome">返回首页</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      role: 'buyer',
      buyer: '',
      seller: '',
      truster: '',
      product_category: '',
      estimated_price: '',
      currency_type: '美元',
      estimated_amount: '',
      product_unit: '',
      quantityUnits: [],
      down_payment_ratio: 0.2,
      final_payment_ratio: 0.8,
      isPaymentRatioValid: true,
      category: 'DES',
      delivery_date: '',
      truster_commission_ratio: ''
    };
  },
  methods: {
    nextStep() {
      // Handle the next step logic here
      alert('提交成功');
      var content;
      if (this.role === 'buyer') {
        content = JSON.stringify({
          buyer: this.buyer,
          seller: this.seller,
          truster: this.truster,
          product_category: this.product_category,
          estimated_price: this.estimated_price,
          currency_type: this.currency_type,
          estimated_amount: this.estimated_amount,
          product_unit: this.product_unit,
          down_payment_ratio: this.down_payment_ratio,
          final_payment_ratio: this.final_payment_ratio,
          category: this.category,
          delivery_date: this.delivery_date,
          truster_commission_ratio: this.truster_commission_ratio
        });
      } else if (this.role === 'seller') {
        content = JSON.stringify({
          buyer: this.buyer,
          seller: this.seller,
          truster: this.truster,
          product_category: this.product_category,
          estimated_price: this.estimated_price,
          currency_type: this.currency_type,
          estimated_amount: this.estimated_amount,
          product_unit: this.product_unit,
          down_payment_ratio: this.down_payment_ratio,
          final_payment_ratio: this.final_payment_ratio,
          category: this.category,
          delivery_date: this.delivery_date,
          truster_commission_ratio: this.truster_commission_ratio
        });
      } else if (this.role === 'truster') {
        content = JSON.stringify({
          buyer: this.buyer,
          seller: this.seller,
          truster: this.truster,
          product_category: this.product_category,
          estimated_price: this.estimated_price,
          currency_type: this.currency_type,
          estimated_amount: this.estimated_amount,
          product_unit: this.product_unit,
          down_payment_ratio: this.down_payment_ratio,
          final_payment_ratio: this.final_payment_ratio,
          category: this.category,
          delivery_date: this.delivery_date,
          truster_commission_ratio: this.truster_commission_ratio
        });
      }
      fetch('http://localhost:8080/order/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: content
      });
    },
    updateQuantityUnits() {
      if (this.product_category === '石油') {
        this.quantityUnits = ['吨', '桶'];
      } else if (this.product_category === '天然气') {
        this.quantityUnits = ['千立方米', '百万英热'];
      }
    },
    validatePaymentRatios() {
      this.isPaymentRatioValid = (parseFloat(this.down_payment_ratio) + parseFloat(this.final_payment_ratio)) === 1;
    },
    goToHome() {
      this.$router.push('/');
    }
  },
  watch: {
    product_category() {
      this.updateQuantityUnits();
    }
  },
  created() {
    this.updateQuantityUnits();
  }
};
</script>

<style>
.order-form-container {
  padding: 20px;
  background-image: url('@/assets/login_bg.jpg');
  background-size: cover;
  background-position: center;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.main-title {
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 10px;
}

.sub-title {
  font-size: 24px;
  margin-bottom: 20px;
}

.order-form-container form {
  display: flex;
  flex-direction: column;
  width: 38.2%;
}

.order-form-container label {
  display: block;
  margin-bottom: 5px;
}

.order-form-container input[type="text"],
.order-form-container input[type="number"],
.order-form-container input[type="date"],
.order-form-container select {
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 80%;
}

.order-form-container .input-group {
  display: flex;
  justify-content: space-between;
  gap: 20px;
}

.order-form-container .role-selection {
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
}

.order-form-container .role-selection button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.order-form-container .role-selection button.active {
  background-color: #0056b3;
}

.order-form-container .button-group {
  display: flex;
  justify-content: space-between;
  gap: 20px;
}

.order-form-container button[type="submit"],
.order-form-container button[type="button"] {
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.order-form-container button[type="submit"]:hover,
.order-form-container button[type="button"]:hover {
  background-color: #0056b3;
}

.input-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.input-grid input {
  padding: 8px;
  font-size: 16px;
}
</style>