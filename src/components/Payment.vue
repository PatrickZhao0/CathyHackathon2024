<template>
    <div>
        <div>
            <div>
                <div>
                    <button @click="paymentMethod = '银行卡'">银行卡</button>
                    <button @click="paymentMethod = '支付宝'">支付宝</button>
                    <button @click="paymentMethod = '微信支付'">微信支付</button>
                </div>
            </div>
            <div v-if="paymentMethod === '银行卡'">
                <form>
                    <input type="number" v-model="bankCard.cardNumber" placeholder="银行卡号" />
                    <input type="text" v-model="bankCard.cardName" placeholder="持卡人姓名" />
                    <input type="text" v-model="bankCard.cardExpiry" placeholder="MM/YY" />
                    <input type="number" v-model="bankCard.cardCVV" placeholder="CVV" />  
                </form>
            </div>
            <div v-else-if="paymentMethod === '支付宝' || paymentMethod === '微信支付'">
               
                    <img 
                        src="https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg"
                        alt="QR code for mobile English Wikipedia"
                        class="qr-code"
                    />
                <button @click="confirmPayment">支付完成</button>
            </div>
            <div>
                <span>总计：{{ amount }}</span>
            </div>
            <div>
                <button @click="confirmPayment">确认支付</button>
                <button @click="resetPayment">重设</button>
            </div>

        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const props = defineProps({
    amount: {
        type: Number,
        default: 0
    }
})

const paymentMethod = ref("银行卡")

const bankCard = ref({
    cardNumber: '',
    cardName: '',
    cardExpiry: '',
    cardCVV: ''
})


const resetPayment = () => {
    paymentMethod.value = "银行卡"
    bankCard.value = {
        cardNumber: '',
        cardName: '',
        cardExpiry: '',
        cardCVV: ''
    }
}

const confirmPayment = () => {
    router.push('/paymentSuccess')
}

</script>