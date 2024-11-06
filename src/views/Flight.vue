<template>
    <div v-if="isLoading">
        <h1>loading...</h1>
    </div>
    <div v-else>
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
                        <div>
                            <span>{{ flight.price }}</span>
                        </div>
                    </div>
                </div>
            </div>
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
onMounted(async () => {
    await searchFlight()
})
async function searchFlight() {
    console.log(props.destination, props.departureTime);
    flightInfo.value = await requestGet({url: "/api/getFlightInfo?" + "destination=" + props.destination + "&departureTime=" + props.departureTime})
    isLoading.value = false;
}
</script>