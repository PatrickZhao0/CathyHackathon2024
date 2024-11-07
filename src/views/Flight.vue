<template>
    <Nav />
    <main class="content">
        <div v-if="isLoading">
            <h1>loading...</h1>
        </div>
        <div v-else>
            <div class="flow">
                <span v-if="step === 2 || step === 3">① 选择航班</span>
                <span v-if="step === 1" style="color: #2985ad;font-weight: bolder;">① 选择航班</span>
                <span v-if="step === 1 || step === 3">② 跨境交通</span>
                <span v-if="step === 2" style="color: #2985ad;font-weight: bolder;">② 跨境交通</span>
                <span v-if="step === 1 || step === 2">③ 确认付款</span>
                <span v-if="step === 3" style="color: #2985ad;font-weight: bolder;">③ 确认付款</span>
                <span style="position: relative;right: -700px;">香港 ---- {{ props.destination.substring(0, 2) }}</span>
            </div>

            <div v-if="step === 1">
                <div clas="card">
                    <span class="card-title">选择出发</span>
                    <div class="card-body">
                        <svg t="1730927829620" class="icon" viewBox="0 0 1024 1024" version="1.1"
                            xmlns="http://www.w3.org/2000/svg" p-id="7666" width="200" height="200">
                            <path
                                d="M778.6 436.8l-47.9-3.4-279.5-327.3C429.2 78 407.9 64 387.4 64h-38.7l177 378.3-245.6 18.2-96-107.4h-74.4l98.4 150.5-98.2 165.3h74.3l95.9-107.4 245.6 18.2-177 380.3h38.7c20.5 0 41.8-14.1 63.8-42.1l279.4-327.1 47.9-3.4c11.4-1.5 21.9-2.9 31.4-3.9 9.5-1.2 21.9-3.6 37-7.5 15.2-3.7 30.2-11.7 45-23.9s22.3-25.5 22.3-39.9c0.1-42.8-45.2-67.8-135.6-75.4z"
                                p-id="7667" fill="#016b6c"></path>
                        </svg>
                        <span> 香港 往 {{ props.destination }} &nbsp;{{ (props.departureTime).split('-')[0] }}年{{
                            (props.departureTime).split('-')[1] }}月{{ (props.departureTime).split('-')[2] }}日</span>
                    </div>
                </div>
                <div class="header-box">
                    <span>排列方式：推荐</span> <a href="#">出发时间</a> <a href="#">抵达时间</a> <a href="#">航行时间</a> <a
                        href="#">票价</a>
                    <div style="margin-top: 10px;">
                        <span>找到{{ flightInfo.length }}个结果</span>
                    </div>
                </div>
                <div class="card" v-for="flight in flightInfo" :key="flight.flightNumber">
                    <div class="card-body">
                        <div class="row" id="step1">
                            <div class="col">
                                <div>
                                    <span style="font-weight: bolder;">{{ (flight.departureTime).split(',')[1]
                                        }}</span><br>
                                    <span style="color: black; font-weight: bolder;">{{ flight.departureCode }}</span>
                                </div>
                            </div>
                            <div class="col">
                                <div>
                                    <svg t="1730927829620" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                        xmlns="http://www.w3.org/2000/svg" p-id="7666" width="200" height="200">
                                        <path
                                            d="M778.6 436.8l-47.9-3.4-279.5-327.3C429.2 78 407.9 64 387.4 64h-38.7l177 378.3-245.6 18.2-96-107.4h-74.4l98.4 150.5-98.2 165.3h74.3l95.9-107.4 245.6 18.2-177 380.3h38.7c20.5 0 41.8-14.1 63.8-42.1l279.4-327.1 47.9-3.4c11.4-1.5 21.9-2.9 31.4-3.9 9.5-1.2 21.9-3.6 37-7.5 15.2-3.7 30.2-11.7 45-23.9s22.3-25.5 22.3-39.9c0.1-42.8-45.2-67.8-135.6-75.4z"
                                            p-id="7667" fill="#016b6c"></path>
                                    </svg>
                                    <span> 耗时 {{ flight.flightDuration }}m</span>
                                </div>
                            </div>
                            <div class="col">
                                <div>
                                    <span style="font-weight: bolder;">{{ (flight.destinationTime).split(',')[1]
                                        }}</span><br>
                                    <span style="color: black; font-weight: bolder;">{{ flight.destinationCode }}</span>
                                </div>
                            </div>
                            <div class="col">
                                <div>
                                    <span style="color: black;">{{ flight.flightNumber }}</span>
                                </div>
                            </div>
                            <div class="col">
                                <div @click="selectFlight(flight)">
                                    <span style="color: #2985ad;font-weight: bolder;">HKD {{ flight.price }} 起</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div v-if="step === 2">
                <div class="card">
                    <div class="card-body">
                        <div class="row">
                            <div class="col">
                                <div>
                                    <span>{{ (selectedFlight.departureTime).split(',')[1] }}</span><br>
                                    <span>{{ selectedFlight.departureCode }}</span>
                                </div>
                            </div>
                            <div class="col">
                                <div>
                                    <span>{{ selectedFlight.flightDuration }}</span>
                                </div>
                            </div>
                            <div class="col">
                                <div>
                                    <span>{{ (selectedFlight.destinationTime).split(',')[1] }}</span><br>
                                    <span>{{ selectedFlight.destinationCode }}</span>
                                </div>
                            </div>
                            <div class="col">
                                <div>
                                    <span>{{ selectedFlight.flightNumber }}</span>
                                </div>
                            </div>
                            <div class="col">
                                <div>
                                    <span>经济</span> <span>{{ selectedFlight.price }}</span>
                                </div>
                            </div>
                            <div class="col">
                                <button @click="step = 1">选择其他航班</button>
                            </div>
                            <div class="col">
                                <button @click="goToPayment">组合订购</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <span>排列方式：推荐</span> <a href="#">出发时间</a> <a href="#">抵达时间</a> <a href="#">航行时间</a> <a
                        href="#">票价</a>
                </div>

                <div class="card" @click="totalAmount = ferry.discountedPrice + selectedFlight.price"
                    v-for="(ferry, index) in ferryInfo" :key="index" v-show="index === 0 || !callapsed">
                    <div class="row">
                        <div class="col">
                            <div>
                                <span v-show="index === 0">{{ (ferry.departureTime).split(',')[0].split('-')[0] }} 年 {{
                                    (ferry.departureTime).split(',')[0].split('-')[1] }} 月 {{
                                        (ferry.departureTime).split(',')[0].split('-')[2] }} 日</span><br>
                                <span>{{ (ferry.departureTime).split(',')[1] }}</span><br>
                                <span v-show="index === 0">{{ ferry.departureCode }}</span><br>
                                <span v-show="index === 0">{{ ferry.departurePort }}</span>
                            </div>
                        </div>
                        <div class="col">
                            <div>
                                <span>{{ ferry.duration }}</span>
                            </div>
                        </div>
                        <div class="col">
                            <div>
                                <span v-show="index === 0">{{ (ferry.arrivalTime).split(',')[0].split('-')[0] }} 年 {{
                                    (ferry.arrivalTime).split(',')[0].split('-')[1] }} 月 {{
                                        (ferry.arrivalTime).split(',')[0].split('-')[2] }} 日</span><br>
                                <span>{{ (ferry.arrivalTime).split(',')[1] }}</span><br>
                                <span v-show="index === 0">{{ ferry.destinationCode }}</span><br>
                                <span v-show="index === 0">{{ ferry.arrivalPort }}</span>
                            </div>
                        </div>
                        <div class="col">
                            <div>
                                <span>{{ ferry.planId }}</span><br>
                                <a v-show="index === 0" @click="callapsed = !callapsed">{{ callapsed ? '选择其他班次' : '收起'
                                    }}</a>
                            </div>
                        </div>
                        <div class="col">
                            <div>
                                <span v-show="index === 0">特惠价格</span><br>
                                <span>HKD{{ ferry.discountedPrice }}</span><br>
                                <span v-show="index === 0">HKD<del>{{ ferry.originalPrice }}</del></span>
                            </div>
                        </div>
                        <div class="col">
                            <div>
                                <span v-show="index === 0">一票通价格</span><br>
                                <span>HKD{{ ferry.discountedPrice + selectedFlight.price }}</span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <div v-if="step === 3">
                <Payment :amount="totalAmount" />
            </div>
        </div>
    </main>

</template>

<script setup>
import { onMounted } from 'vue';
import { requestGet } from '@/request/axios';
import { ref } from 'vue';
import Payment from '../components/Payment.vue';
import Nav from '../components/Nav.vue';

const props = defineProps(['destination', 'departureTime']);
const flightInfo = ref([]);
const isLoading = ref(true);
const step = ref(1);
const selectedFlight = ref(null);
const totalAmount = ref(0);
onMounted(async () => {
    await searchFlight()
})
async function searchFlight() {
    isLoading.value = true;
    // flightInfo.value = await requestGet({ url: "/api/getFlightInfo?" + "destination=" + props.destination + "&departureTime=" + props.departureTime })

    //mock
    flightInfo.value = [{ "flightId": 1, "flightNumber": "CX524", "departure": "香港国际机场", "destination": "东京成田机场", "departureTime": "2024-11-16,01:25", "destinationTime": "2024-11-16,06:30", "price": 5551.00, "flightClass": "含餐经济", "flightDuration": "5h05", "departureCode": "HKG", "destinationCode": "NRT" }, { "flightId": 2, "flightNumber": "CX526", "departure": "香港国际机场", "destination": "东京成田机场", "departureTime": "2024-11-16,08:15", "destinationTime": "2024-11-16,13:10", "price": 4721.00, "flightClass": "含餐经济", "flightDuration": "4h55", "departureCode": "HKG", "destinationCode": "NRT" }, { "flightId": 3, "flightNumber": "CX504", "departure": "香港国际机场", "destination": "东京成田机场", "departureTime": "2024-11-16,09:05", "destinationTime": "2024-11-16,14:10", "price": 4721.00, "flightClass": "含餐经济", "flightDuration": "5h05", "departureCode": "HKG", "destinationCode": "NRT" }, { "flightId": 4, "flightNumber": "CX520", "departure": "香港国际机场", "destination": "东京成田机场", "departureTime": "2024-11-16,10:30", "destinationTime": "2024-11-16,15:35", "price": 4721.00, "flightClass": "含餐经济", "flightDuration": "5h05", "departureCode": "HKG", "destinationCode": "NRT" }, { "flightId": 5, "flightNumber": "CX500", "departure": "香港国际机场", "destination": "东京成田机场", "departureTime": "2024-11-16,15:25", "destinationTime": "2024-11-16,20:20", "price": 4721.00, "flightClass": "含餐经济", "flightDuration": "4h55", "departureCode": "HKG", "destinationCode": "NRT" }, { "flightId": 6, "flightNumber": "CX450", "departure": "香港国际机场", "destination": "东京成田机场", "departureTime": "2024-11-16,10:00", "destinationTime": "2024-11-16,16:50", "price": 4833.00, "flightClass": "含餐经济", "flightDuration": "6h50", "departureCode": "HKG", "destinationCode": "NRT" }, { "flightId": 1, "flightNumber": "CX524", "departure": "香港国际机场", "destination": "东京成田机场", "departureTime": "2024-11-16,01:25", "destinationTime": "2024-11-16,06:30", "price": 5551.00, "flightClass": "含餐经济", "flightDuration": "5h05", "departureCode": "HKG", "destinationCode": "NRT" }, { "flightId": 2, "flightNumber": "CX526", "departure": "香港国际机场", "destination": "东京成田机场", "departureTime": "2024-11-16,08:15", "destinationTime": "2024-11-16,13:10", "price": 4721.00, "flightClass": "含餐经济", "flightDuration": "4h55", "departureCode": "HKG", "destinationCode": "NRT" }, { "flightId": 3, "flightNumber": "CX504", "departure": "香港国际机场", "destination": "东京成田机场", "departureTime": "2024-11-16,09:05", "destinationTime": "2024-11-16,14:10", "price": 4721.00, "flightClass": "含餐经济", "flightDuration": "5h05", "departureCode": "HKG", "destinationCode": "NRT" }, { "flightId": 4, "flightNumber": "CX520", "departure": "香港国际机场", "destination": "东京成田机场", "departureTime": "2024-11-16,10:30", "destinationTime": "2024-11-16,15:35", "price": 4721.00, "flightClass": "含餐经济", "flightDuration": "5h05", "departureCode": "HKG", "destinationCode": "NRT" }, { "flightId": 5, "flightNumber": "CX500", "departure": "香港国际机场", "destination": "东京成田机场", "departureTime": "2024-11-16,15:25", "destinationTime": "2024-11-16,20:20", "price": 4721.00, "flightClass": "含餐经济", "flightDuration": "4h55", "departureCode": "HKG", "destinationCode": "NRT" }, { "flightId": 6, "flightNumber": "CX450", "departure": "香港国际机场", "destination": "东京成田机场", "departureTime": "2024-11-16,10:00", "destinationTime": "2024-11-16,16:50", "price": 4833.00, "flightClass": "含餐经济", "flightDuration": "6h50", "departureCode": "HKG", "destinationCode": "NRT" }]


    isLoading.value = false;
}
const ferryInfo = ref([]);
const selectFlight = async (flight) => {
    isLoading.value = true;
    selectedFlight.value = flight;
    step.value = 2;
    // ferryInfo.value = await requestGet({ url: "/api/getFerryTicket?" + "departureTime=" + props.departureTime + "," + selectedFlight.value.departureTime })

    //mock
    ferryInfo.value = [{ "id": 0, "planId": "CX9816", "departureTime": "2024-11-16,13:00", "arrivalTime": "2024-11-16,13:30", "departurePort": "蛇口邮轮母港", "arrivalPort": "香港国际机场客运大楼1", "originalPrice": 310.00, "discountedPrice": 170.00, "departureCode": "ZYK", "destinationCode": "HKG", "duration": "30min" }, { "id": 0, "planId": "CX9808", "departureTime": "2024-11-16,12:00", "arrivalTime": "2024-11-16,12:30", "departurePort": "蛇口邮轮母港", "arrivalPort": "香港国际机场客运大楼1", "originalPrice": 310.00, "discountedPrice": 170.00, "departureCode": "ZYK", "destinationCode": "HKG", "duration": "30min" }, { "id": 0, "planId": "CX9806", "departureTime": "2024-11-16,11:00", "arrivalTime": "2024-11-16,11:30", "departurePort": "蛇口邮轮母港", "arrivalPort": "香港国际机场客运大楼1", "originalPrice": 310.00, "discountedPrice": 170.00, "departureCode": "ZYK", "destinationCode": "HKG", "duration": "30min" }, { "id": 0, "planId": "CX9804", "departureTime": "2024-11-16,10:00", "arrivalTime": "2024-11-16,10:30", "departurePort": "蛇口邮轮母港", "arrivalPort": "香港国际机场客运大楼1", "originalPrice": 310.00, "discountedPrice": 170.00, "departureCode": "ZYK", "destinationCode": "HKG", "duration": "30min" }, { "id": 0, "planId": "CX9802", "departureTime": "2024-11-16,08:45", "arrivalTime": "2024-11-16,09:15", "departurePort": "蛇口邮轮母港", "arrivalPort": "香港国际机场客运大楼1", "originalPrice": 310.00, "discountedPrice": 170.00, "departureCode": "ZYK", "destinationCode": "HKG", "duration": "30min" }, { "id": 0, "planId": "CX9800", "departureTime": "2024-11-16,07:15", "arrivalTime": "2024-11-16,07:45", "departurePort": "蛇口邮轮母港", "arrivalPort": "香港国际机场客运大楼1", "originalPrice": 310.00, "discountedPrice": 170.00, "departureCode": "ZYK", "destinationCode": "HKG", "duration": "30min" }, { "id": 0, "planId": "B015", "departureTime": "2024-11-16,12:00", "arrivalTime": "2024-11-16,13:40", "departurePort": "皇岗汽车站", "arrivalPort": "香港国际机场", "originalPrice": 80, "discountedPrice": 0, "departureCode": null, "destinationCode": "HKG", "duration": "1h40min" }, { "id": 0, "planId": "G5643", "departureTime": "2024-11-16,12:08", "arrivalTime": "2024-11-16,12:26", "departurePort": "深圳北站", "arrivalPort": "香港西九龙", "originalPrice": null, "discountedPrice": 75, "departureCode": null, "destinationCode": null, "duration": "18min" }, { "id": 0, "planId": "商务车", "departureTime": "2024-11-16,12:35", "arrivalTime": "2024-11-16,13:35", "departurePort": "南方科技大学", "arrivalPort": "香港国际机场", "originalPrice": null, "discountedPrice": 750, "departureCode": null, "destinationCode": null, "duration": "1h" }]

    isLoading.value = false;
}
const goToPayment = () => {
    if (totalAmount.value > 0) {
        step.value = 3;
    }
}

const callapsed = ref(true);

</script>

<style scoped>
.flow {
    padding: 10px;
    border-bottom: 1px solid #e0e0e0;
}

.flow span {
    margin: 40px;
}

.content {
    padding-top: 10vh;
    /* 留出头部空间 */
}

.card-title {
    color: #016b6c;
    font-size: 1.5em;
    padding-left: 10px;
}

.header-box {
    background-color: #f6f6f2;
    padding: 10px;
}

.header-box a {
    margin-left: 50px;
}

svg {
    height: 15px;
    width: 15px;
}

a {
    color: #2985ad;
    text-decoration: none;
}

#step1 .col {
    border: 0;
    color: #016b6c;
}
</style>