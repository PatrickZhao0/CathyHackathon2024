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
            <div class="card" v-for="flight in flightInfo" :key="flight.id">
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
                        <div class="col">
                            <button @click="step = 1">选择其他航班</button>
                        </div>
                        <div class="col">
                            <button @click="step = 3">组合订购</button>
                        </div>
                    </div>
                </div>
            </div>


        </div>

        <div v-if="step === 3">
            <h1>step 3</h1>
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
const selectFlight = async(flight) => {
    isLoading.value = true;
    selectedFlight.value = flight;
    step.value = 2;
    isLoading.value = false;
}

</script>