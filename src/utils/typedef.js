const typeCode = {
    shipmentAndReceiptDays : 45,
    expiryDays : 90,
    checkInPortPeriod : 5,
    startPaymentBrokerDepositDays : 3,
    startPaymentBrokerDepositRatio : 0.0005,
    guaranteePaymentSellerDepositDays : 6,
    guaranteeBrokerDepositRatio : 0.01,
    downPaymentBrokerDepositDays : 9,
    finalPaymentBrokerDepositDays : 3,
    productErrorRatio : {
        UPPER: 0.05,
        LOWER: -0.05,
    },
    OrderCategory : {
        DES : 0,
    },
    CurrencyType : {
        USD : 1,
        CNY : 2,
        HKD : 3,
        EUR : 4,
        USDT : 5,
        BTC : 6,
    },
    OrderAnonymity : {
        None : 0,
        All : 1,
    },
}

export default typeCode;