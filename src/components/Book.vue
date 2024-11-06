<template>
    <div>
        <!-- bootstrap buttons -->
        <div>
            <button>预定行程</button>
            <button>管理行程</button>
            <button>预办登机</button>
            <button>查询航班状况</button>
        </div>

        <!-- Bootstrap button group -->
         <!-- 选择后 相应按钮需要高光 -->
        <div>
            <button>预定航班</button>
            <button>一票通</button>
            <button>兑换机票</button>
            <button>住宿</button>
            <button>套票</button>
        </div>

        <div>
            <div class="row">
                <div class="col">
                    <label for="departure">出发地点</label>
                    <select v-model="departure" class="form-select">
                        <option selected value="">请选择出发城市</option>
                        <option value="广州">广州</option>
                        <option value="深圳">深圳</option>
                        <option value="佛山">佛山</option>
                        <option value="东莞">东莞</option>
                        <option value="珠海">珠海</option>
                        <option value="中山">中山</option>
                        <option value="江门">江门</option>
                        <option value="惠州">惠州</option>
                        <option value="肇庆">肇庆</option>
                    </select>
                </div>
                <div class="col">
                    <label for="destination">目的地</label>
                    <select v-model="ticket.destination" class="form-select">
                        <option selected value="">请选择目的地</option>
                        <option value="日本成田机场">日本成田机场</option>
                        <option value="日本关西机场">日本关西机场</option>
                        <option value="日本中部机场">日本中部机场</option>
                        <option value="日本新千岁机场">日本新千岁机场</option>
                    </select>
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <label for="journeyType">旅程类别</label>
                    <select v-model="journeyType" class="form-select">
                        <option selected value="">往返</option>
                        <option value="单程">单程</option>
                    </select>
                </div>
                <div class="col">
                    <label for="date">客舱级别</label>
                    <select class="form-select">
                        <option selected value="">请选择客舱级别</option>
                        <option value="经济舱">经济舱</option>
                        <option value="公务舱">公务舱</option>
                        <option value="头等舱">头等舱</option>
                    </select>
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <label for="date">出发日期</label>
                    <input type="date" v-model="ticket.departureTime" class="form-control">
                </div>
                <div class="col">
                    <label for="date">返回日期</label>
                    <input type="date" class="form-control" :disabled="disableReturn">
                </div>
            </div>
        </div>
         <!-- 航班搜索 -->
        <button @click="searchFlight">搜寻航班</button>
    </div>
    
</template>

<script setup>
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const journeyType = ref('');
const departure = ref("");
const ticket = ref({
    destination: "",
    departureTime: "",
});
const disableReturn = ref(false);
const dateToString = (date) => {
    return date.toISOString().split('T')[0]
}
const searchFlight = () => {
    ticket.value.departureTime = dateToString(ticket.value.departureTime);
    router.push({
        path: '/flight',
        query: ticket.value
    })
}

watch(journeyType, (newValue) => {
    disableReturn.value = newValue === '单程';
});
</script>
