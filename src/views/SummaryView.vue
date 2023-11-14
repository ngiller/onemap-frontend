<template>
  <div class="body-content vld-parent">

    <div class="leftbar" :class="{ 'sidebar-enable': sidebar_show }">
        <div class="logo" >
            <a href="/"><img src="../../public/img/logo-white.png"></a>
        </div>
        <div class="search">
            <span class="p-input-icon-right">
                <input type="search" class="p-inputtext-sm input-search" placeholder="Search" />
                <i class="icon-magnifier" style="color:#ccc"></i>
            </span>
        </div>
        <div class="scroll-panel">
            <div class="scroll-content" v-for="(item,i) in data_kecamatan" :key="i">
              <div v-on:click="areaClick(item.id_kecamatan)">
                <i class="icon-location-pin" style="margin-right:3px;"></i> {{item.nm_kecamatan}}
              </div>
            </div>
        </div>
    </div>
    <div class="right-col">
      <Topbar />
      <!-- CONTENT -->
      <div class="page-content" :class="{ 'topbar-sidebar-enable': sidebar_show }">

        <div class="inner-content">        
            <div class="panel-top" v-if="summary_show">
                <div class="content-summary">
                  <div class="row">
                    <div class="col-1">
                      <div class="content-area">
                        Total ditanam : 2.506.045 bambu
                      </div>
                      <div class="content-area">
                        <ul>
                          <li>149.160 Bambu Petung</li>
                          <li>2.155.713 Bambu Aur</li>
                          <li>36.738 Bambu Pering</li>
                        </ul>
                      </div>
                      <div class="content-area" style="display:block">
                        <progress-bar bar-transition="all 0.9s ease" size="large" text-position="top" bg-color="#fff" val="60" text="Progress 60%"></progress-bar>
                      </div>
                    </div>
                    <div class="col-2">
                      <div id="chart">
                        <apexchart type="pie" width="380" :options="chartOptions" :series="series"></apexchart>
                      </div>
                    </div>
                    <div class="col-3">
                      <div class="content-area">
                        <div>Total Luas : 273 ha</div>
                      </div>
                      <div class="content-area">
                        <ul>
                          <li>7 Kabupaten</li>
                          <li>15 Kecamatan</li>
                          <li>19 Desa/Kelurahan</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-1">
                      <div class="content-area">
                        <div>Jumlah Peserta : 388 orang</div>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from '@/store'
import apiAccess from '@/utils/apiAccess'
import Topbar from '@/components/TopBar.vue';
import Loading from 'vue-loading-overlay';
import VueApexCharts from 'vue-apexcharts';
import ProgressBar from 'vue-simple-progress';

export default {
  name: 'SummaryView',
  data() {
    return {
      series: [149160, 2155713, 36738],
      chartOptions: {
        chart: {
          width: 380,
          type: 'pie',
        },
        labels: ['Bambu Petung', 'Bambu Aur', 'Bambu Pering'],
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: 300
            },
            legend: {
              position: 'bottom'
            }
          }
        }]
      },
          
    };
  },
  components: {
    Topbar,
    Loading,
    apexchart: VueApexCharts,
    ProgressBar,
},
  created: async function() {
  },
  computed: {
      sidebar_show() {
        return store.state.leftbar_show;
      },
      summary_show() {
        return store.state.summary_show;
      }
  },
  async mounted() {
    
  },
  methods: {
    showleftbar() {
        if (store.state.leftbar_show) {
            store.commit('hideleftbar')
        } else {
            store.commit('showleftbar');
        }
    },
    resizeBrowserHandler (e) {
        if (e.target.innerWidth < 530) {
            store.commit('hideleftbar')
        } else {
            store.commit('showleftbar');
        }
    },
    hideSummaryClick() {
      store.commit('hidesummary')
    }
  }
}
</script>


