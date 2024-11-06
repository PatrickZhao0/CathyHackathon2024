<template>
    <div>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/other">航班</RouterLink>
        <RouterLink to="#">旅游</RouterLink>
        <RouterLink to="#">购物</RouterLink>
        <RouterLink to="#">保险</RouterLink>
        <RouterLink to="#">餐饮</RouterLink>
        <RouterLink to="#">支付</RouterLink>
        <RouterLink to="#">会籍</RouterLink>
    </div>

</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>