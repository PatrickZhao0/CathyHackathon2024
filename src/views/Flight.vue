<template>
    <div v-if="isLoading">
        <h1>loading...</h1>
    </div>
    <div v-else>
        <div v-for="flight in flightInfo" :key="flight.id">
            <p>{{ flight.number }}</p>
            <p>{{ flight.departure }}</p>
            <p>{{ flight.destination }}</p>
            <p>{{ flight.departureTime }}</p>
            <p>{{ flight.destinationTime }}</p>
            <p>{{ flight.price }}</p>
            <p>{{ flight.flightClass }}</p>
            <p>{{ flight.flightDuration }}</p>
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