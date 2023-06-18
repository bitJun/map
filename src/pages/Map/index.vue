<template>
  <Mobile v-if="state.target == 'mobile_plate'"/>
  <PC v-if="state.target == 'pc_plate'" />
</template>
<script setup>
import Mobile from './mobile.vue';
import PC from './pc.vue';
import { onMounted, reactive } from 'vue'
const state = reactive({
  target: ''
})

onMounted(()=>{
  if (/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i.test(navigator.userAgent)) {
    state.target = 'mobile_plate'
  } else {
    if (document.body.clientWidth < 750) {
      state.target = 'mobile_plate'
    } else {
      state.target = 'pc_plate'
    }
  }
  window.onresize = function () {
    if (/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i.test(navigator.userAgent)) {
      state.target = 'mobile_plate'
    } else {
      if (document.body.clientWidth < 750) {
        state.target = 'mobile_plate'
      } else {
        state.target = 'pc_plate'
      }
    }
  }
})
</script>