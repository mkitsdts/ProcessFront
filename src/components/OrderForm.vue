<template>
  <div class="order-form-container">
    <div class="order-form-box">
      <h2>创建订单</h2>
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
          <div>
            <label for="sellerId">卖方ID</label>
            <input type="text" id="sellerId" v-model="sellerId" required>
          </div>
          <div>
            <label for="middlemanId">中间人ID（选填）</label>
            <input type="text" id="middlemanId" v-model="middlemanId">
          </div>
        </div>
        <div v-if="role === 'seller'">
          <div>
            <label for="buyerId">买方ID</label>
            <input type="text" id="buyerId" v-model="buyerId" required>
          </div>
          <div>
            <label for="middlemanId">中间人ID（选填）</label>
            <input type="text" id="middlemanId" v-model="middlemanId">
          </div>
        </div>
        <div v-if="role === 'middleman'">
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
          <label for="shippingLocation">发货地</label>
          <select id="shippingLocation" v-model="shippingLocation" required>
            <option v-for="country in countries" :key="country" :value="country">{{ country }}</option>
          </select>
        </div>
        <div>
          <label for="receivingLocation">收货地</label>
          <select id="receivingLocation" v-model="receivingLocation" required>
            <option v-for="country in countries" :key="country" :value="country">{{ country }}</option>
          </select>
        </div>
        <div>
          <label for="itemType">物品种类</label>
          <select id="itemType" v-model="itemType" required @change="updateQuantityUnits">
            <option value="石油">石油</option>
            <option value="天然气">天然气</option>
          </select>
        </div>
        <div>
          <label for="unitPrice">单价</label>
          <input type="number" id="unitPrice" v-model="unitPrice" required min="0.00">
          <select v-model="unitPriceCurrency" required>
            <option value="美元">美元</option>
            <option value="欧元">欧元</option>
            <option value="人民币">人民币</option>
            <option value="港币">港币</option>
            <option value="比特币">比特币</option>
          </select>
        </div>
        <div>
          <label for="quantity">数量</label>
          <input type="number" id="quantity" v-model="quantity" required min="0.00">
          <select v-model="quantityUnit" required>
            <option v-for="unit in quantityUnits" :key="unit" :value="unit">{{ unit }}</option>
          </select>
        </div>
        <div>
          <label for="downPaymentRatio">首付比例</label>
          <input type="number" id="downPaymentRatio" v-model="downPaymentRatio" step="0.01" min="0" max="1" required @input="validatePaymentRatios">
        </div>
        <div>
          <label for="finalPaymentRatio">尾款比例</label>
          <input type="number" id="finalPaymentRatio" v-model="finalPaymentRatio" step="0.01" min="0" max="1" required @input="validatePaymentRatios">
        </div>
        <button type="submit" :disabled="!isPaymentRatioValid">下一步</button>
      </form>
    </div>
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
      shippingLocation: '',
      receivingLocation: '',
      itemType: '',
      unitPrice: '',
      unitPriceCurrency: '美元',
      quantity: '',
      quantityUnit: '',
      quantityUnits: [],
      downPaymentRatio: 0.2,
      finalPaymentRatio: 0.8,
      isPaymentRatioValid: true,
      countries: [
        'Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Antigua and Barbuda', 'Argentina', 'Armenia', 'Australia', 'Austria', 'Azerbaijan',
        'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bhutan', 'Bolivia', 'Bosnia and Herzegovina', 'Botswana', 'Brazil', 'Brunei', 'Bulgaria', 'Burkina Faso', 'Burundi',
        'Cabo Verde', 'Cambodia', 'Cameroon', 'Canada', 'Central African Republic', 'Chad', 'Chile', 'China', 'Colombia', 'Comoros', 'Congo, Democratic Republic of the', 'Congo, Republic of the', 'Costa Rica', 'Croatia', 'Cuba', 'Cyprus', 'Czech Republic',
        'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic',
        'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea', 'Eritrea', 'Estonia', 'Eswatini', 'Ethiopia',
        'Fiji', 'Finland', 'France',
        'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Greece', 'Grenada', 'Guatemala', 'Guinea', 'Guinea-Bissau', 'Guyana',
        'Haiti', 'Honduras', 'Hungary',
        'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Israel', 'Italy',
        'Jamaica', 'Japan', 'Jordan',
        'Kazakhstan', 'Kenya', 'Kiribati', 'Korea, North', 'Korea, South', 'Kosovo', 'Kuwait', 'Kyrgyzstan',
        'Laos', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg',
        'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Marshall Islands', 'Mauritania', 'Mauritius', 'Mexico', 'Micronesia', 'Moldova', 'Monaco', 'Mongolia', 'Montenegro', 'Morocco', 'Mozambique', 'Myanmar',
        'Namibia', 'Nauru', 'Nepal', 'Netherlands', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'North Macedonia', 'Norway',
        'Oman',
        'Pakistan', 'Palau', 'Palestine', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Poland', 'Portugal',
        'Qatar',
        'Romania', 'Russia', 'Rwanda',
        'Saint Kitts and Nevis', 'Saint Lucia', 'Saint Vincent and the Grenadines', 'Samoa', 'San Marino', 'Sao Tome and Principe', 'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore', 'Slovakia', 'Slovenia', 'Solomon Islands', 'Somalia', 'South Africa', 'South Sudan', 'Spain', 'Sri Lanka', 'Sudan', 'Suriname', 'Sweden', 'Switzerland', 'Syria',
        'Taiwan', 'Tajikistan', 'Tanzania', 'Thailand', 'Timor-Leste', 'Togo', 'Tonga', 'Trinidad and Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Tuvalu',
        'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States', 'Uruguay', 'Uzbekistan',
        'Vanuatu', 'Vatican City', 'Venezuela', 'Vietnam',
        'Yemen',
        'Zambia', 'Zimbabwe'
      ]
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
  justify-content: center;
  align-items: center;
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

.order-form-box label {
  display: block;
  margin-bottom: 5px;
}

.order-form-box input[type="text"],
.order-form-box input[type="number"],
.order-form-box select {
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.order-form-box .role-selection {
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
}

.order-form-box .role-selection button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.order-form-box .role-selection button.active {
  background-color: #0056b3;
}

.order-form-box button[type="submit"] {
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.order-form-box button[type="submit"]:hover {
  background-color: #0056b3;
}
</style>