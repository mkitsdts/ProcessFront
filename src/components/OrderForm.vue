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
            <button type="button" :class="{ active: role === 'middleman' }" @click="role = 'middleman'">中间人</button>
          </div>
        </div>
        <div v-if="role === 'buyer'">
          <div class="input-grid">
          <div>
            <label for="sellerId">卖方ID</label>
            <input type="text" id="sellerId" v-model="sellerId" required>
          </div>
          <div>
        <label for="middlemanId">中间人ID</label>
            <input type="text" id="middlemanId" v-model="middlemanId">
          </div>
        </div>
</div>
        <div v-if="role === 'seller'">
          <div class="input-grid">
          <div>
            <label for="buyerId">买方ID</label>
            <input type="text" id="buyerId" v-model="buyerId" required>
          </div>
          <div>
            <label for="middlemanId">中间人ID</label>
            <input type="text" id="middlemanId" v-model="middlemanId">
          </div>
        </div>
</div>
        <div v-if="role === 'middleman'">
          <div class="input-grid">
          <div>
            <label for="buyerId">买方ID</label>
            <input type="text" id="buyerId" v-model="buyerId" required>
          </div>
          <div>
            <label for="sellerId">卖方ID</label>
            <input type="text" id="sellerId" v-model="sellerId" required>
          </div>
  </div>
<div>
          <label for="tradeMethod">贸易方式</label>
          <select id="tradeMethod" v-model="tradeMethod" required>
            <option value="DES">DES</option>
          </select>
      </div>
</div>
<div>
          <label for="tradeMethod">贸易方式</label>
          <select id="tradeMethod" v-model="tradeMethod" required>
            <option value="DES">DES</option>
          </select>
        </div>
        <div>
          <label for="itemType">物品种类</label>
          <select id="itemType" v-model="itemType" required @change="updateQuantityUnits">
            <option value="石油">石油</option>
            <option value="天然气">天然气</option>
          </select>
        </div>
<div class="input-grid">
        <div>
          <label for="unitPrice">单价</label>
          <input type="number" id="unitPrice" v-model="unitPrice" required min="0.00">
</div>
        <div>
          <label for="unitPriceCurrency">单位</label>
          <select v-model="unitPriceCurrency" required>
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
          <label for="quantity">数量</label>
          <input type="number" id="quantity" v-model="quantity" required min="0.00">
</div>
        <div>
          <label for="quantityUnit">单位</label>
          <select v-model="quantityUnit" required>
            <option v-for="unit in quantityUnits" :key="unit" :value="unit">{{ unit }}</option>
          </select>
        </div>
</div>
      <div class="input-grid">
        <div>
          <label for="downPaymentRatio">首付比例</label>
          <input type="number" id="downPaymentRatio" v-model="downPaymentRatio" step="0.01" min="0" max="1" required @input="validatePaymentRatios">
        </div>
        <div>
          <label for="finalPaymentRatio">尾款比例</label>
          <input type="number" id="finalPaymentRatio" v-model="finalPaymentRatio" step="0.01" min="0" max="1" required @input="validatePaymentRatios">
        </div>
</div>
        <div>
          <label for="shipmentDate">装船日期</label>
          <input type="date" id="shipmentDate" v-model="shipmentDate" required>
        </div>
<div class="button-group">
        <button type="submit" :disabled="!isPaymentRatioValid">下一步</button>
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
      buyerId: '',
      sellerId: '',
      middlemanId: '',
      itemType: '',
      unitPrice: '',
      unitPriceCurrency: '美元',
      quantity: '',
      quantityUnit: '',
      quantityUnits: [],
      downPaymentRatio: 0.2,
      finalPaymentRatio: 0.8,
      isPaymentRatioValid: true,
      tradeMethod: 'DES',
      shipmentDate: ''
    };
  },
  methods: {
    nextStep() {
      // Handle the next step logic here
      console.log('Next step');
    },
    updateQuantityUnits() {
      if (this.itemType === '石油') {
        this.quantityUnits = ['吨', '桶'];
      } else if (this.itemType === '天然气') {
        this.quantityUnits = ['千立方米', '百万英热'];
      }
    },
    validatePaymentRatios() {
      this.isPaymentRatioValid = (parseFloat(this.downPaymentRatio) + parseFloat(this.finalPaymentRatio)) === 1;
},
    goToHome() {
      this.$router.push('/');
    }
  },
  watch: {
    itemType() {
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