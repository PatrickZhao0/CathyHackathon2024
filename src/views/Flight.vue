<template>
    <div v-if="isLoading">
        <h1>loading...</h1>
    </div>
    <div v-else>
        
        <div v-if="step === 1">
            <div clas="card">
                <span class="card-title">选择出发</span>
                <div class="card-body">
                    <span>香港往{{ props.destination }}&nbsp;{{ (props.departureTime).split('-')[0] }}年{{ (props.departureTime).split('-')[1] }}月{{ (props.departureTime).split('-')[2] }}日</span>
                </div>
            </div>
            <div>
                <span>排列方式：推荐</span>  <a href="#">出发时间</a>  <a href="#">抵达时间</a>  <a href="#">航行时间</a>  <a href="#">票价</a>
            </div>
            <div>
                <span>找到{{ flightInfo.length }}个结果</span>
            </div>
            <div class="card" v-for="flight in flightInfo" :key="flight.flightNumber">
                <div class="card-body">
                    <div class="row">
                        <div class="col">
                            <div>
                                <span>{{ (flight.departureTime).split(',')[1] }}</span><br>
                                <span>{{ flight.departureCode }}</span>
                            </div>
                        </div>
                        <div class="col">
                            <div>
                                <span>{{ flight.flightDuration }}</span>
                            </div>
                        </div>
                        <div class="col">
                            <div>
                                <span>{{ (flight.destinationTime).split(',')[1] }}</span><br>
                                <span>{{ flight.destinationCode }}</span>
                            </div>
                        </div>
                        <div class="col">
                            <div>
                                <span>{{ flight.flightNumber }}</span>
                            </div>
                        </div>
                        <div class="col">
                            <div @click="selectFlight(flight)">
                                <span>{{ flight.price }}</span>
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
                            <button @click="step = 3">组合订购</button>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <span>排列方式：推荐</span>  <a href="#">出发时间</a>  <a href="#">抵达时间</a>  <a href="#">航行时间</a>  <a href="#">票价</a>
            </div>

            <div class="card" v-for="(ferry, index) in ferryInfo" :key="index" :v-show="index === 0 || !callapsed">
                <div class="row">
                    <div class="col">
                        <div>
                            <span v-show="index === 0">{{ (ferry.departureTime).split(',')[0].split('-')[0] }} 年 {{ (ferry.departureTime).split(',')[0].split('-')[1] }} 月 {{ (ferry.departureTime).split(',')[0].split('-')[2] }} 日</span><br>
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
                            <span v-show="index === 0">{{ (ferry.arrivalTime).split(',')[0].split('-')[0] }} 年 {{ (ferry.arrivalTime).split(',')[0].split('-')[1] }} 月 {{ (ferry.arrivalTime).split(',')[0].split('-')[2] }} 日</span><br>
                            <span>{{ (ferry.arrivalTime).split(',')[1] }}</span><br>
                            <span v-show="index === 0">{{ ferry.destinationCode }}</span><br>
                            <span v-show="index === 0">{{ ferry.arrivalPort }}</span>
                        </div>
                    </div>
                    <div class="col">
                        <div>
                            <span>{{ selectedFlight.flightNumber }}</span>
                        </div>
                    </div>
                    <div class="col">
                        <div>
                            <span>{{ ferry.planId }}</span><br>
                            <a @click="callapsed = !callapsed">{{ callapsed ? '选择其他班次' : '收起' }}</a>
                        </div>
                    </div>
                    <div class="col">
                        <div>
                            <span>特惠价格</span>
                            <span>{{ ferry.discountPrice }}</span>
                        </div>
                    </div>
                    <div class="col">
                        <div>
                            <span>特惠价格</span>
                            <span>{{ ferry.discountPrice }}</span>
                            <span><del>{{ ferry.originalPrice }}</del></span>
                        </div>
                    </div>
                    <div class="col">
                        <div>
                            <span>一票通价格</span>
                            <span>{{ ferry.discountPrice + selectedFlight.price }}</span>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>

        <div v-if="step === 3">
            
        </div>
    </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { requestGet } from '@/request/axios';
import { ref } from 'vue';

const props = defineProps(['destination', 'departureTime']);
const flightInfo = ref([]);
const isLoading = ref(true);
const step = ref(1);
const selectedFlight = ref(null);
onMounted(async () => {
    await searchFlight()
})
async function searchFlight() {
    isLoading.value = true;
    flightInfo.value = await requestGet({url: "/api/getFlightInfo?" + "destination=" + props.destination + "&departureTime=" + props.departureTime})
    isLoading.value = false;
}
const ferryInfo = ref([]);
const selectFlight = async(flight) => {
    isLoading.value = true;
    selectedFlight.value = flight;
    step.value = 2;
    ferryInfo.value = await requestGet({url: "/api/getFerryTicket?" + "departureTime=" + props.departureTime + "," + selectedFlight.value.departureTime})
    isLoading.value = false;
}

const callapsed = ref(true);

</script>