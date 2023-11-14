<template>
    <div class="leftbar" :class="{ 'sidebar-enable': sidebar_show }">
        <div class="logo" >
            <a :href="bambuvillage.org" target="_blank"><img src="../../public/img/logo-white.png"></a>
        </div>
        
        <div class="search">
            <span class="p-input-icon-right">
                <input type="search" class="p-inputtext-sm input-search" placeholder="Search" />
                <i class="icon-magnifier" style="color:#ccc"></i>
            </span>
        </div>
        <div class="scroll-panel">
            <router-link :to="{ name: 'geojson', params: { id: item.id_kecamatan }}" v-for="(item,i) in data" :key="i" >
            <div class="scroll-content" >
                <!--<a href="#" v-on:click="sideMenuClick(item.id_kecamatan)"> {{item.nm_kecamatan}}</a>-->
                <i class="icon-location-pin" style="margin-right:3px"></i> {{item.nm_kecamatan}}
            </div>
            </router-link>
        </div>
    </div>
</template>

<script>

import store from '@/store'
import apiAccess from '@/utils/apiAccess'

export default ({
    name: 'LeftBar',
    components: {

    },
    data() {
        return {
            data: [],
        }
    },
    created: async function () {
        const response = await apiAccess.read('kecamatan')
        this.data = response.data
    },
    computed: {
        sidebar_show() {
            return store.state.leftbar_show;
        },
    },
})
</script>
