<!-- filepath: /c:/Users/mkitsdts/OneDrive/mkitsdts/code/Program/Web/ExchangeProcess/front/src/components/OrderForm.vue -->
<template>
  <div class="order-form-container">
    <div class="order-form-box">
      <h2 v-if="step === 1">创建订单</h2>
      <h2 v-else>填写订单详情</h2>
      <form @submit.prevent="nextStep">
        <div v-if="step === 1">
          <div>
            <label for="buyerId">买方ID</label>
            <input type="text" id="buyerId" v-model="buyerId" required>
          </div>
          <div>
            <label for="sellerId">卖方ID</label>
            <input type="text" id="sellerId" v-model="sellerId" required>
          </div>
          <div>
            <label for="middlemanId">中间人ID（选填）</label>
            <input type="text" id="middlemanId" v-model="middlemanId">
          </div>
        </div>
        <div v-else-if="step === 2">
          <div>
            <label for="productType">产品类型</label>
            <select id="productType" v-model="productType" required>
              <option value="oil">石油</option>
              <option value="gas">天然气</option>
            </select>
          </div>
          <div>
            <label for="estimatedPrice">预估单价</label>
            <div class="input-group">
              <input type="number" id="estimatedPrice" v-model="estimatedPrice" required>
              <select v-model="priceUnit">
                <option value="USD">美元</option>
                <option value="HKD">港币</option>
                <option value="EUR">欧元</option>
                <option value="CNY">人民币</option>
                <option value="BTC">比特币</option>
              </select>
            </div>
          </div>
          <div>
            <label for="quantity">数量</label>
            <div class="input-group">
              <input type="number" id="quantity" v-model="quantity" required>
              <select v-if="productType === 'oil'" v-model="unit">
                <option value="barrel">桶</option>
                <option value="ton">吨</option>
              </select>
              <select v-else-if="productType === 'gas'" v-model="unit">
                <option value="cubicMeter">千立方米</option>
              </select>
            </div>
          </div>
        </div>
        <div v-else-if="step === 3">
          <div>
            <label for="inspectionDays">验货天数</label>
            <input type="number" id="inspectionDays" v-model="inspectionDays" required>
          </div>
          <div>
            <label>比例</label>
            <div class="input-group">
              <label for="downPaymentRatio">首付比例</label>
              <input type="number" id="downPaymentRatio" v-model.number="ratios[0]" step="0.01" min="0" max="1" required>
            </div>
            <div class="input-group">
              <label for="finalPaymentRatio">尾款比例</label>
              <input type="number" id="finalPaymentRatio" v-model.number="ratios[1]" step="0.01" min="0" max="1" required>
            </div>
          </div>
        </div>
        <div class="buttons">
          <button type="button" @click="goBack">返回</button>
          <button type="submit">{{ step === 3 ? '提交' : '下一步' }}</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      step: 1,
      buyerId: '',
      sellerId: '',
      middlemanId: '',
      productType: 'oil',
      estimatedPrice: '',
      priceUnit: 'USD',
      quantity: '',
      unit: 'barrel',
      inspectionDays: '',
      ratios: [0.2, 0.8]
    };
  },
  methods: {
    goBack() {
      if (this.step > 1) {
        this.step--;
      } else {
        this.$router.push('/orders');
      }
    },
    nextStep() {
      if (this.step === 3) {
        if (this.validateRatios()) {
          this.submitOrder();
        } else {
          alert('比例总和必须为1，且每项比例需大于0且小于或等于1');
        }
      } else {
        this.step++;
      }
    },
    addRatio() {
      this.ratios.push(0);
    },
    removeRatio(index) {
      if (this.ratios.length > 2) {
        this.ratios.splice(index, 1);
      }
    },
    validateRatios() {
      const total = this.ratios.reduce((sum, ratio) => sum + ratio, 0);
      return total === 1 && this.ratios.every(ratio => ratio > 0 && ratio <= 1);
    },
    async submitOrder() {
      const orderData = {
        buyer: this.buyerId,
        seller: this.sellerId,
        truster: this.middlemanId,
        product_category: this.productType,
        estimated_price: this.estimatedPrice,
        currency_type: this.priceUnit,
        estimated_amount: this.quantity,
        unit: this.unit,
        inspection_period: this.inspectionDays,
        down_payment_ratio: this.ratios[0],
        final_payment_ratio: this.ratios[1]
      };
      try {
        const response = await fetch('http://localhost:8080/create-order', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(orderData)
        });
        this.$router.push('/orders');
        if (response.ok) {
          alert('订单已提交');
          this.$router.push('/orders');
        } else {
          alert('提交失败');
        }
      } catch (error) {
        console.error('Failed to submit order:', error);
        alert('提交成功');
        this.$router.push('/orders');
      }
    }
  }
};
</script>

<style scoped>
.order-form-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: url('src/assets/login_bg.jpg') no-repeat center center;
  background-size: cover;
}

.order-form-box {
  background: rgba(255, 255, 255, 0.8);
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 300px;
}

.order-form-box h2 {
  margin-bottom: 20px;
}

.order-form-box form {
  display: flex;
  flex-direction: column;
}

.order-form-box form div {
  margin-bottom: 10px;
}

.order-form-box form label {
  margin-bottom: 5px;
  font-weight: bold;
}

.order-form-box form input,
.order-form-box form select {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.order-form-box .buttons {
  display: flex;
  justify-content: space-between;
}

.order-form-box .buttons button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.order-form-box .buttons button[type="button"] {
  background-color: #ccc;
}

.order-form-box .buttons button[type="submit"] {
  background-color: #007bff;
  color: white;
}

.order-form-box .buttons button[type="submit"]:hover {
  background-color: #0056b3;
}
</style>