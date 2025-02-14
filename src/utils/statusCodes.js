const statusCodes = {
    // 确认订单
    WaitForBuyerSellerTrusterConfirm: 1,
    WaitForBuyerSellerConfirm: 1001,
    WaitForBuyerTrusterConfirm: 2001,
    WaitForSellerTrusterConfirm: 3001,
    WaitForBuyerConfirm: 4001,
    WaitForSellerConfirm: 5001,
    WaitForTrusterConfirm: 6001,
    BuyerCancelOrder: -4001,
    SellerCancelOrder: -5001,
    TrusterCancelOrder: -6001,

    // 缴纳订金
    WaitForTrusterPayStartFund: 6010,
    WaitForSysCheckStartFund: 16010,
    TrusterNonPayStartFund: -6010,
    TrusterSecondNonPayStartFund: -6011,

    // 缴纳担保金
    WaitForSellerPayGuarantee: 5010,
    WaitForSysCheckGuarantee: 15010,
    SellerNonPayGuarantee: -5010,
    SellerSecondNonPayGuarantee: -5011,

    // 支付首付
    WaitForBuyerDownPayment: 4010,
    WaitForSysCheckDownPayment: 14010,
    BuyerNonDownPayment: -4010,
    BuyerSecondNonDownPayment: -4011,

    // 装船发货
    WaitForSellerDelivery: 5020,
    WaitForSysCheckDelivery: 15020,
    SellerNonDelivery: -5020,
    SellerSecondNonDelivery: -5021,

    // 预计抵达时间
    WaitForSellerUploadETA: 5030,
    WaitForSysCheckETA: 15030,
    SellerNonUploadETA: -5030,
    SellerSecondNonUploadETA: -5031,

    // 抵达目的港凭证
    WaitForSellerUploadNORATV: 5040,
    WaitForBuyerCheckNORATV: 4015,
    SellerNonUploadNORATV: -5040,
    SellerSecondNonUploadNORATV: -5041,

    // 付款尾款
    WaitForBuyerFinalPayment: 4020,
    WaitForSysCheckFinalPayment: 14030,
    BuyerNonFinalPayment: -4030,
    BuyerSecondNonFinalPayment: -4031,

    // 上传提单
    WaitForSellerUploadDocs: 5050,
    WaitForSysCheckDocs: 15050,
    SellerNonUploadDocs: -5050,
    SellerSecondNonUploadDocs: -5051,

    // 上传第三方检测报告
    WaitForBuyerUploadThirdPartyReport: 4030,
    WaitForSysCheckThirdPartyReport: 14030,
    BuyerNonUploadThirdPartyReport: -4030,
    BuyerSecondNonUploadThirdPartyReport: -4031,

    // 确认核算价格
    WaitForSellerConfirmFinalPrice: 5060,
    WaitForBuyerConfirmFinalPrice: 4040,
    SellerNonConfirmFinalPrice: -5060,
    SellerSecondNonConfirmFinalPrice: -5061,
    BuyerNonConfirmFinalPrice: -4040,
    BuyerSecondNonConfirmFinalPrice: -4041,
    
    // 上传结算凭证
    WaitForSysUploadSettlementVoucher: 20000
}

export default statusCodes;