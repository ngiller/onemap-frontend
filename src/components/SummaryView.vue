<template>
  <div>
    
      <div
        class="panel-top"
        :class="{ 'summary-sidebar-enable': sidebar_show }"
        v-if="summary_show"
      >
        <div class="panel-top-content">
          <myScroll>
            <h2>Yayasan Bambu Lingkungan Lestari</h2>
            <div class="row" v-if="summaryData.desc != ''">
              <span class="desc" v-html="summaryData.desc"></span>
            </div>
            <div class="row">
              <div class="col-1">
                  <h2 style="text-align:center; margin-top: 60px;">Bekerja di</h2>
                  <h1 style="text-align:center; font-size: 40px;">
                    {{ summaryData.count_desa }}
                  </h1>
                  <h2 style="text-align:center">desa </h2>
              </div>

              <div class="col-2">
                <div id="chartPembibitan">
                  <apexchart type="bar" height="300" :options="chartOptionsProp" :series="seriesProp"></apexchart>
                </div>
              </div>

              <div class="col-3">
                <H3 style="text-align: center">Bekerja dengan {{ summaryData.jml_pembibit | numberFormat }} benefciaries</H3>
                <div id="chartKelamin">
                  <apexchart
                    type="donut"
                    width="300"
                    :options="optionKelamin"
                    :series="seriesKelamin"
                  >
                  </apexchart>
                </div>
              </div>
            </div>

            <div class="columns">
              <div class="column">
                <h3>Seluas : {{ parseFloat(summaryData.luas_desa).toFixed(2) | floatFormat  }} ha</h3>
              </div>
              <div class="column">
                  <h3>Telah memetakan: {{ summaryData.jml_rumpun | numberFormat }} rumpun bambu</h3>
              </div>
            </div>
              
            <h3 style="margin-top: 3px;">Mengelola budidaya bambu sebanyak {{ summaryData.jml_bibit | numberFormat }} bibit</h3>
            <br>
            <h3>PROGRESS PER INDIKATOR</h3>

            <div class="row-indicator" style="margin-top: 25px">
              <div class="col-1-indicator">
                <table style="width: 100%;" >
                    <tr v-for="item in indicatorData" v-if="item.value == -9999 && item.id < 5" style="background-color: #07422d; color: white">
                      <th colspan="2">{{ item.name }}</th>
                    </tr>
                    <tr v-else-if="item.id < 5">
                      <td style="width: 70%;">{{ item.type_name }}</td>
                      <td style="text-align: right;">{{ item.value | numberFormat }} {{ item.unit }}</td>
                    </tr>
                </table>
              </div>
              <div class="col-2-indicator">
                <table>
                  <tr v-for="item in indicatorData" v-if="item.value == -9999 && item.id >= 5" style="background-color: #07422d; color: white">
                      <th colspan="2">{{ item.name }}</th>
                    </tr>
                    <tr v-else-if="item.id >= 5">
                      <td style="width: 70%;">{{ item.type_name }}</td>
                      <td style="text-align: right;">{{ item.value | numberFormat }} {{ item.unit }}</td>
                    </tr>
                </table>
              </div>
            </div>

            <br>
            <h3>PROGRESS PER PROPINSI</h3>
            <div style="margin-top: 25px">
              <table>
                <tr>
                  <th>Propinsi</th>
                  <th class="table-content">Jml. Desa</th>
                  <th class="table-content">Luas Lahan</th>
                  <th class="table-content">Disemai</th>
                  <th class="table-content">Kepompong</th>
                  <th class="table-content">Ditanam</th>
                  <th class="table-content">Perempuan</th>
                  <th class="table-content">Laki-laki</th>
                </tr>
                <tr v-for="item in summaryData.propinsi_bibit">
                  <td>{{ item.nama }}</td>
                  <td class="table-content">{{ item.jml_desa | numberFormat }}</td>
                  <td class="table-content">{{ item.luas | numberFormat }}</td>
                  <td class="table-content">{{ item.disemai | numberFormat }}</td>
                  <td class="table-content">{{ item.dikepompong | numberFormat }}</td>
                  <td class="table-content">{{ item.ditanam | numberFormat }}</td>
                  <td class="table-content">{{ item.perempuan | numberFormat }}</td>
                  <td class="table-content">{{ item.laki_laki | numberFormat }}</td>
                </tr>
              </table>
          </div>

          </myScroll>
        </div>
      </div>
    
  </div>
</template>

<script>

import store from '@/store'
import apiAccess from "@/utils/apiAccess";
import VueApexCharts from 'vue-apexcharts';
import ProgressBar from 'vue-simple-progress';

export default {
  name: "summary-item",
  props: {
    item: [],
  },
  components: {
    apexchart: VueApexCharts,
    ProgressBar,
  },
  data: function () {
    return {
      summaryData: [],
      indicatorData: [],
      seriesProp: [],
      chartOptionsProp: {
        chart: {
          type: 'bar',
          height: 300,
          toolbar: { show: false },
        },
        plotOptions: {
          bar: {
            borderRadius: 4,
            horizontal: true,
          }
        },
        dataLabels: {
          enabled: false
        },
        xaxis: {
          categories: [],
        }    
      },

      seriesKelamin: [5.2000, 4.8000],
      optionKelamin: {
        chart: {
          width: 300,
          type: "pie",
        },
        labels: ["Laki-laki", "Perempuan"],
        legend: {
                show: true,
                position: "bottom",
              },
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 250,
              },
              
            },
          },
        ],
      },
      

    };
  },
  created: async function () {
    await this.getData();
  },
  async mounted() {
    
  },
  filters: {
        numberFormat (value) {
          if (value) { 
            let num = parseInt(value)
            return `${num.toLocaleString('id-ID')}`
          } else {
            return ''
          }
        },
        floatFormat (value) {
          let num = parseFloat(value)
          return `${num.toLocaleString('id-ID')}`
        }
    },
  computed: {
    sidebar_show() {
        return store.state.leftbar_show;
    },
    summary_show() {
        return store.state.summary_show;
    },
  },
  methods: {
    hideSummaryClick() {
      store.commit('hidesummary')
    },
    getPropSeries: function () {
      let i = 0;
      let data = []
      while (i < this.summaryData.propinsi_bambu.length) {
          data.push(this.summaryData.propinsi_bambu[i].jml_desa)
          i++;
      }
      return data
    },
    getPropLabel: function () {
      let i = 0;
      let label = []
      while (i < this.summaryData.propinsi_bambu.length) {
          label.push(this.summaryData.propinsi_bambu[i].nama)
          i++;
      }
      return label
    },
    getSeriesKelamin: function () {
      let i = 0;
      let data = []
      data.push(parseFloat(this.summaryData.jenis_kelamin.L))
      data.push(parseFloat(this.summaryData.jenis_kelamin.P))
      return data
    },
    getData: async function () {
      let response = await apiAccess.read("summary");
      this.summaryData = response.data

      this.indicatorData = this.summaryData.indicator

      let data = this.getPropSeries()
      this.seriesProp = [{
          name: 'Jumlah desa: ',
          data: data
        }]

      data = this.getPropLabel()
      this.chartOptionsProp = {
        xaxis: {
          categories: data,
        }
      }

      this.seriesKelamin = this.getSeriesKelamin()
      

    }
  },
};
</script>
