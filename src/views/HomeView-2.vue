<template>
  <div class="body-content vld-parent">
    <loading :active.sync="isLoading"
                 :is-full-page="true"/>

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
          <myScroll>
              <div class="scroll-content" v-for="(item,i) in propinsi" :key="i">
                <div class="propinsi">
                  <span style="font-size: 10px;"><i v-on:click="subPropinsiClick" :class="{ 'icon-arrow-up': subPropinsiShow, 'icon-arrow-down': !subPropinsiShow, }" style="margin-right:3px;"></i></span>
                  <span v-on:click="menuPropinsiClick(item.lat, item.lng, 8)"> {{item.nama_pulau}}</span>
                </div>

                <div v-if="subPropinsiShow">

                      <div class="kecamatan" v-for="(kecitem, x) in getKecamatan(item.propinsi_id)" :key="x">
                        <div>
                          &#8226;&nbsp; Kec. {{kecitem.kec_name}}
                        </div>

                        <div class="desa" v-for="(desitem, x) in getDesa(item.propinsi_id, kecitem.kec_id)" :key="x">
                          <div v-on:click="menuDesaClick(desitem.line, 13)">
                            <i class="icon-location-pin" style="margin-right:3px;"></i>{{desitem.des_name}}
                          </div>
                        </div>  
                      </div>

                </div>
              </div>
          </myScroll>
        </div>
        
    </div>
    <div class="right-col">
      <Topbar />
      <!-- CONTENT -->
      <div class="page-content" :class="{ 'topbar-sidebar-enable': sidebar_show }">
        <div class="container">
          <div class="col-desc" v-if="colDescShow">
            <myScroll>
              <img class="img-desc" :src="image_desa">
              <div class="col-desc-close">
                <i class="icon-close" v-on:click="colDescShow = !colDescShow" style="margin-top: 3px;font-size: 22px; cursor:pointer"></i>
              </div>
              <div class="judul"> Desa {{ nama_desa }}</div>
              <div class="panel-right-content">
                <div class="col-desc-text" v-html="desa_desc">
                <!--<hr style="margin-top: 15px">-->
                </div>
                <hr>
                <div class="news-title" v-on:click="showProgrees = !showProgrees">
                  PROGRESS DETAIL <span class="icon-down-news-title"><i :class="{ 'icon-arrow-up': showProgrees, 'icon-arrow-down': !showProgrees, }" style="margin-right:3px;cursor: pointer;"></i></span>
                </div>
                <div class="news-desc" v-if="showProgrees">
                  <div class="content-area" style="margin-top:10px;">
                    <div class="label-content"><strong>PEMBIBITAN</strong></div><div class="answer-content"></div>
                  </div>
                  <div class="content-area">
                    <div class="label-content">Jumlah Bibit :</div><div class="answer-content"> {{jml_bibit}}</div>
                  </div>
                  <div v-for="item in data_pembibitan">
                    <div class="content-area">
                      <div class="label-content"> <i class="icon-arrow-right" style="margin-right:3px;font-size: 10px;"></i>{{ item.nama}} :</div><div class="answer-content"> {{  item.jml_bibit }}</div>
                    </div>
                  </div>
                  <div class="content-area">
                    <div class="label-content"> Total Luas Lahan :</div><div class="answer-content"> {{ luas_lahan }} m2</div>
                  </div>

                  <br>

                  <div class="content-area">
                    <div class="label-content"><strong>PENANAMAN</strong></div><div class="answer-content"></div>
                  </div>
                  <div class="content-area">
                    <div class="label-content"> <i class="icon-arrow-right" style="margin-right:3px;font-size: 10px;"></i>Bambu Petung :</div><div class="answer-content"> 200</div>
                  </div>
                  <div class="content-area">
                    <div class="label-content"> <i class="icon-arrow-right" style="margin-right:3px;font-size: 10px;"></i>Bambu Aur :</div><div class="answer-content"> 500</div>
                  </div>
                  <div class="content-area">
                    <div class="label-content"> <i class="icon-arrow-right" style="margin-right:3px;font-size: 10px;"></i>Bambu Pering :</div><div class="answer-content"> 1500</div>
                  </div>
                  <div class="content-area">
                    <div class="label-content"> Total Luas Lahan :</div><div class="answer-content"> 5.3 Ha</div>
                  </div>

                  <!----- DETAIL PEMBIBIT ----------------------------------------------------------->
                  <span  style="margin-left: 15px;">
                    <button v-on:click="showPembibit = !showPembibit" class="button-4" style="margin-top: 15px;margin-left: -15px;" role="button">Detail Pembibit <span style="font-size: 10px;"><i :class="{ 'icon-arrow-up': showPembibit, 'icon-arrow-down': !showPembibit, }" style="margin-left:5px;"></i></span></button>
                  </span>
                  <div class="news-desc" v-if="showPembibit">
                    <hr>
                    <div class="title-news-desc">Pembibit</div>
                    <ul>
                      <li>Maria Filomena Panik</li>
                      <li>Kamelia Vabiola Karunia</li>
                      <li>Yustina Erna</li>
                      <li>Meltiana Nduet</li>
                      <li>Yuliana Dahus</li>
                      <li>Monika Amah</li>
                      <li>Helmina Gius</li>
                      <li>Anastasia Mbai</li>
                    </ul>
                    <div>Total pembibit : 8 peserta</div>
                    <button v-on:click="showModal = !showModal" class="button-4" style="margin-top: 15px;" role="button">Show Detail</button>
                    <hr style="margin-top: 15px">
                  </div>

                  <hr style="margin-top: 15px">
                </div>

                <div class="news-title" v-on:click="showNews = !showNews">
                  NEWS <span class="icon-down-news-title"><i :class="{ 'icon-arrow-up': showNews, 'icon-arrow-down': !showNews, }" style="margin-right:3px;cursor: pointer;"></i></span>
                </div>
                <div class="news-desc" v-if="showNews">
                  <div class="title-news-desc">News Title</div>
                  <div class="news-date">26 January 2022</div>
                  Nusa Tenggara Timur (disingkat NTT) adalah sebuah provinsi di Indonesia yang meliputi bagian timur Kepulauan Nusa Tenggara. Provinsi ini memiliki ibu kota di Kota Kupang dan memiliki 22 kabupaten/kota. Provinsi ini berada di Sunda Kecil.[7][8] Tahun 2020, penduduk provinsi ini berjumlah 5.325.566 jiwa, dengan kepadatan 111 jiwa/km2.[2]
                  <hr style="margin-top: 15px">
                </div>

              </div>
            </myScroll>
          </div>
          <div class="inner-content">        

            <div id="mapContainer"></div>

          </div>

          <Transition name="slide">
            <div class="panel-top" v-if="summary_show">
                <div class="panel-top-content">
                  <myScroll>
                    <div class="row">
                      <div class="col-1">
                        <div class="content-area">
                          <strong>PEMBIBITAN</strong>
                        </div>
                        <div id="chartPembibitan">
                          <apexchart type="bar" height="250" :options="chartOptionsPembibitan" :series="seriesPembibitan"></apexchart>
                        </div>
                        <div class="content-area" style="display:block; margin-bottom: 25px; margin-top: -30px;">
                          <progress-bar bar-transition="all 0.9s ease" size="large" text-position="top" bg-color="#fff" val="60" text="Progress Pembibitan 40%"></progress-bar>
                        </div>
                      </div>

                      <div class="col-2">
                        <div class="content-area">
                          <strong>TOTAL DITANAM : 2.506.045 BAMBU</strong>
                        </div>
                        <div class="content-area">
                          <ul>
                            <li>149.160 Bambu Petung</li>
                            <li>2.155.713 Bambu Aur</li>
                            <li>36.738 Bambu Pering</li>
                          </ul>
                        </div>
                        <div class="content-area" style="display:block">
                          <progress-bar bar-transition="all 0.9s ease" size="large" text-position="top" bg-color="#fff" val="60" text="Progress Penanaman 60%"></progress-bar>
                        </div>
                      </div>

                      <div class="col-3">
                        <div id="chartPenanaman">
                          <apexchart type="pie" width="380" :options="chartOptionsPenanaman" :series="seriesPenanaman"></apexchart>
                        </div>
                      </div>
                    </div>

                    <div class="row">
                        <div class="col-1">
                          <div class="content-area">
                            <div><strong>TOTAL LUAS : 273 ha</strong></div>
                          </div>
                          <div class="content-area">
                            <ul>
                              <li>7 Kabupaten</li>
                              <li>15 Kecamatan</li>
                              <li>19 Desa/Kelurahan</li>
                            </ul>
                          </div>
                        </div>

                        <div class="col-2">
                          <div class="content-area">
                            <div><strong>JUMLAH PEMBIBIT: 388 ORANG</strong></div>
                          </div>
                        </div>
                    </div>
                  </myScroll>
                  
                  <button class="button-4" style="margin-top: 15px;" role="button" v-on:click="hideSummaryClick">Hide</button>
                </div>
            </div>
          </Transition>

          <Transition name="slide-fade">
            <div class="panel-right" v-if="isShowDesc">
              <div class="panel-right-header">
                <span class="right-panel-title"><div style="float:left; width:15px"><i class="icon-location-pin" style="margin-right:3px"></i></div><div style="float:left;width: 125px;padding-left: 10px;"> {{ nama_kecamatan }}</div></span>
                <div style="float:right; width:15px"><i class="icon-close" v-on:click="isShowDesc = !isShowDesc" style="margin-top: 3px;float:right;font-size: 16px;"></i></div>
              </div>
              <div class="panel-right-content">
                <div class="content-area">
                  <div class="label-content">Status :</div><div class="answer-content"> {{status}}</div>
                </div>
                <div class="content-area">
                  <div class="label-content">Luas (ha) :</div><div class="answer-content"> {{luas}}</div>
                </div>
                <br>
                <div class="content-area">
                  <div class="label-content"><strong>PEMBIBITAN</strong></div><div class="answer-content"></div>
                </div>
                <div class="content-area">
                  <div class="label-content">Jumlah Bibit :</div><div class="answer-content"> {{jml_bibit}}</div>
                </div>
                <div class="content-area">
                  <div class="label-content"> <i class="icon-arrow-right" style="margin-right:3px;font-size: 10px;"></i>Bambu Petung :</div><div class="answer-content"> 200</div>
                </div>
                <div class="content-area">
                  <div class="label-content"> <i class="icon-arrow-right" style="margin-right:3px;font-size: 10px;"></i>Bambu Aur :</div><div class="answer-content"> 500</div>
                </div>
                <div class="content-area">
                  <div class="label-content"> <i class="icon-arrow-right" style="margin-right:3px;font-size: 10px;"></i>Bambu Pering :</div><div class="answer-content"> 1500</div>
                </div>
                <div class="content-area">
                  <div class="label-content">Jumlah Pembibit :</div><div class="answer-content"> 30 orang</div>
                </div>
                <br>
                <div class="content-area">
                  <div class="label-content"><strong>PENANAMAN</strong></div><div class="answer-content"></div>
                </div>
                <div class="content-area">
                  <div class="label-content"> <i class="icon-arrow-right" style="margin-right:3px;font-size: 10px;"></i>Bambu Petung :</div><div class="answer-content"> 200</div>
                </div>
                <div class="content-area">
                  <div class="label-content"> <i class="icon-arrow-right" style="margin-right:3px;font-size: 10px;"></i>Bambu Aur :</div><div class="answer-content"> 500</div>
                </div>
                <div class="content-area">
                  <div class="label-content"> <i class="icon-arrow-right" style="margin-right:3px;font-size: 10px;"></i>Bambu Pering :</div><div class="answer-content"> 1500</div>
                </div>
                <button class="button-4" style="margin-top: 15px;" role="button" v-on:click="isShowDesc = !isShowDesc">Close</button>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </div>

    <transition name="modal" v-if="showModal">
      <div class="modal-mask">
        <div class="modal-wrapper">
          <div class="modal-container">
            <div class="modal-header">
                <div class="title-news-desc">Pembibit</div>
            </div>

            <div class="modal-body">
              <myScroll>
                <ul>
                  <li>Maria Filomena Panik</li>
                  <ul>
                    <li>Bambu Pering 25 bibit</li>
                    <li>Bambu Aur 15 bibit</li>
                  </ul>
                  <li>Kamelia Vabiola Karunia</li>
                  <ul>
                    <li>Bambu Pering 25 bibit</li>
                    <li>Bambu Aur 15 bibit</li>
                  </ul>
                  <li>Yustina Erna</li>
                  <ul>
                    <li>Bambu Pering 25 bibit</li>
                    <li>Bambu Aur 15 bibit</li>
                  </ul>
                  <li>Meltiana Nduet</li>
                  <ul>
                    <li>Bambu Pering 25 bibit</li>
                    <li>Bambu Aur 15 bibit</li>
                  </ul>
                  <li>Yuliana Dahus</li>
                  <ul>
                    <li>Bambu Pering 25 bibit</li>
                    <li>Bambu Aur 15 bibit</li>
                  </ul>
                  <li>Monika Amah</li>
                  <ul>
                    <li>Bambu Pering 25 bibit</li>
                    <li>Bambu Aur 15 bibit</li>
                  </ul>
                  <li>Helmina Gius</li>
                  <ul>
                    <li>Bambu Pering 25 bibit</li>
                    <li>Bambu Aur 15 bibit</li>
                  </ul>
                  <li>Anastasia Mbai</li>
                  <ul>
                    <li>Bambu Pering 25 bibit</li>
                    <li>Bambu Aur 15 bibit</li>
                  </ul>
                </ul>
                <div>Total pembibit : 8 peserta</div>
              </myScroll>
            </div>

            <div class="modal-footer">
                <button class="modal-default-button" @click="showModal = !showModal">Close</button>
            </div>
          </div>
        </div>
      </div>
    </transition>


  </div>
</template>

<script>
import config from '../utils/config'
import store from '@/store'
import apiAccess from '@/utils/apiAccess'
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Icon }  from 'leaflet' 
import Topbar from '@/components/TopBar.vue';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import VueApexCharts from 'vue-apexcharts';
import ProgressBar from 'vue-simple-progress';
import CONFIG from '@/utils/config.js';

delete Icon.Default.prototype._getIconUrl;

Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

export default {
  name: 'HomeView',
  data() {
    return {
      icon: L.icon({
        iconUrl: 'img/marker-icon.png',
        iconSize: [15, 25],
        iconAnchor: [10, 22],
        popupAnchor: [-3, -76],
      }),
      propinsi: [],
      desa_bambu: [],
      layerMarkPropinsi: null,
      layerPolygonDesaBambu: null,
      markDesaBambu: [],
      layerMarkDesaBambu: null,
      prevZoom: null,
      isShowDesc: false,
      nama_kecamatan: null,
      luas_lahan: null,
      jml_bibit: null,
      status: null,
      isLoading: true,
      colDescShow: false,
      subPropinsiShow: true,
      nama_desa: null,
      desa_desc: null,
      desa_image: [],
      image_desa: null,
      data_pembibitan: [],
      showNews: false,
      showProgrees: false,
      showPembibit: false,
      markPembibitan: [],
      layerPembibitan: null,
      showModal: false,

      seriesPenanaman: [149160, 2155713, 36738],
      chartOptionsPenanaman: {
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

      seriesPembibitan: [{
            name: 'Bertunas = 329.282',
            data: [19391, 273113, 36378]
          }, {
            name: 'Berdaun > 25 = 2.080.592',
            data: [118381, 1803053, 46678]
          }],
          chartOptionsPembibitan: {
            chart: {
              type: 'bar',
              height: 250,
              with: 300,
              stacked: true,
              toolbar: {
                show: false,
              },
            },
            plotOptions: {
              bar: {
                horizontal: true,
              },
            },
            colors: ['#89c77d','#f0a569'],
            stroke: {
              width: 1,
              colors: ['#fff']
            },
            xaxis: {
              categories: ['Petung', 'Aur', 'Pering'],
              labels: {
                formatter: function (val) {
                  return null
                }
              }
            },
            yaxis: {
              title: {
                text: undefined
              },
            },
            tooltip: {
              y: {
                formatter: function (val) {
                  return val + "K"
                }
              }
            },
            fill: {
              opacity: 1
            },
            legend: {
              position: 'top',
              horizontalAlign: 'left',
              offsetX: 40
            }
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
        store.commit('hidesummary');
        return store.state.summary_show;
      }
  },
  async mounted() { 
    await this.getData()
    this.createMap()
    
  },
  methods: {
    createMap() {
      this.map = L.map("mapContainer").setView([-1.2109175, 119.0918159], 5);
      L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(this.map);
      this.layerMarkPropinsi.addTo(this.map)
      this.isLoading = false

      this.prevZoom = this.map.getZoom()    
      this.map.on('zoomend', this.onMapZoom);
    },
    onMapZoom(){
      let currZoom = this.map.getZoom();
      if (currZoom >= 13) {
        if (this.map.hasLayer(this.layerMarkDesaBambu)) {
          this.map.removeLayer(this.layerMarkDesaBambu)
        }
        if (!this.map.hasLayer(this.layerPolygonDesaBambu)) {
          this.layerPolygonDesaBambu.addTo(this.map)
        }
        if (!this.map.hasLayer(this.layerPembibitan)) {
          this.layerPembibitan.addTo(this.map)
        }
      } else {
        if (currZoom >= 8) {
          this.isShowDesc = false
          if (this.map.hasLayer(this.layerMarkPropinsi)) {
            this.map.removeLayer(this.layerMarkPropinsi)
          }
          if (this.map.hasLayer(this.layerPolygonDesaBambu)) {
            this.map.removeLayer(this.layerPolygonDesaBambu)
          }
          if (!this.map.hasLayer(this.layerMarkDesaBambu)) {
            this.layerMarkDesaBambu.addTo(this.map)
          }
          if (this.map.hasLayer(this.layerPembibitan)) {
            this.map.removeLayer(this.layerPembibitan)
          }
        } else {
          this.isShowDesc = false
          if (!this.map.hasLayer(this.layerMarkPropinsi)) {
            this.layerMarkPropinsi.addTo(this.map)
          }
          if (this.map.hasLayer(this.layerPolygonDesaBambu)) {
            this.map.removeLayer(this.layerPolygonDesaBambu)
          }
          if (this.map.hasLayer(this.layerMarkDesaBambu)) {
            this.map.removeLayer(this.layerMarkDesaBambu)
          }
          if (this.map.hasLayer(this.layerPembibitan)) {
            this.map.removeLayer(this.layerPembibitan)
          }
        }
      }
      this.prevZoom = currZoom;
    },
    markPropinsiClick(l) {
      this.hideSummaryClick()
      this.map.setZoomAround([l.latlng.lat, l.latlng.lng], 8)
    },
    menuPropinsiClick(lat, lng, zoom) {
      if (store.state.ismobile) {
        store.commit('hideleftbar')
      }
      if (store.state.summary_show) {
        store.commit('hidesummary')
      }
      this.isShowDesc = false
      this.colDescShow = false
      this.map.setView([lat, lng], zoom)
    },
    menuDesaClick: async function (id, zoom) {
      if (store.state.ismobile) {
        store.commit('hideleftbar')
      }
      if (store.state.summary_show) {
        store.commit('hidesummary')
      }
      this.isShowDesc = false
      let data = this.searchLatLng(id)
      this.nama_desa = data.des_name
      this.desa_desc = data.descriptions
      this.desa_image = await this.getImageDesa(data.line)
      if (this.desa_image.length > 0) {
      this.image_desa = CONFIG.DESA_IMAGE + this.desa_image[0]['file_name']
      } else {
        this.image_desa = CONFIG.DESA_IMAGE + 'no-image.jpg'
      }

      this.data_pembibitan = await this.getPembibitanDesa(data.des_id)
      this.jml_bibit = this.getJumlahBibit()
      this.luas_lahan = await this.getLuasLahan(data.des_id)
      console.log(this.luas_lahan)

      this.colDescShow = true
      this.map.setView([data.lat, data.lng], zoom)
      
    },
    getImageDesa: async function (id) {
      let response = await apiAccess.read('desabambu/getimagedesa', {id: id})
      return response.data
    },
    getPembibitanDesa: async function (desa_id) {
      let response = await apiAccess.read('desabambu/getpembibitan', {desa_id: desa_id})
      return response.data
    },
    getJumlahBibit() {
      let total_bibit = 0
      if (this.data_pembibitan.length > 0) {
        for(let i = 0; i < this.data_pembibitan.length; i++){ 
          total_bibit = total_bibit + parseInt(this.data_pembibitan[i].jml_bibit)
        }
      }
      return total_bibit
    },
    getLuasLahan: async function (desa_id) {
      let response = await apiAccess.read('desabambu/getluaslahan', {desa_id: desa_id})
      return response.data['luas_lahan']
    },
    zoomDesaPolygon(id, koordinat, zoom) {
      if (store.state.ismobile) {
        store.commit('hideleftbar')
      }
      if (store.state.summary_show) {
        store.commit('hidesummary')
      }
      this.isShowDesc = false
      let data = this.searchLineID(id) 
      this.nama_desa = data.des_name
      this.colDescShow = true
      this.map.setView([koordinat.lat, koordinat.lng], zoom)
    },
    getKabupaten: function(pid) {
        var result = [];
        let kab_id = null
        for(var i = 0, l = this.desa_bambu.length; i < l; i++) {
          if (this.desa_bambu[i].propinsi_id == pid) {
            if (kab_id != this.desa_bambu[i].kab_id) {
              kab_id = this.desa_bambu[i].kab_id
              result.push(this.desa_bambu[i])
            }
          }
        }
        return result;
    },
    getKecamatan: function(pid) {
        var result = [];
        let kec_id = null
        for(var i = 0, l = this.desa_bambu.length; i < l; i++) {
          if (this.desa_bambu[i].propinsi_id == pid) {
            if (kec_id != this.desa_bambu[i].kec_id) {
              kec_id = this.desa_bambu[i].kec_id
              result.push(this.desa_bambu[i])
            }
          }
        }
        return result;
    },
    getDesa: function(pid, kecid) {
        var result = [];
        let des_id = null
        for(var i = 0, l = this.desa_bambu.length; i < l; i++) {
          if (this.desa_bambu[i].propinsi_id == pid && this.desa_bambu[i].kec_id == kecid) {
            if (des_id != this.desa_bambu[i].des_id) {
              des_id = this.desa_bambu[i].des_id
              result.push(this.desa_bambu[i])
            }
          }
        }
        return result;
    },
    subPropinsiClick() {
      this.subPropinsiShow = !this.subPropinsiShow
    },
    searchLatLng(kode) {
      for(var i=0; i< this.desa_bambu.length; i++){
        var data = this.desa_bambu[i];
        if(data.line==kode){
          return data;
        }
      }
    },
    searchLineID(desa_id) {
      for(var i=0; i< this.desa_bambu.length; i++){
        var data = this.desa_bambu[i];
        if(data.des_id==desa_id){
          return data;
        }
      }
    },
    getGeoJsonFile: async function(geoJSonName) {
      const response = await fetch("/storages/geojson/" + geoJSonName);
      let data = await response.json();
      return data;
    },
    getData: async function () {
        let response = await apiAccess.read('desabambu')
        this.desa_bambu = response.data
        console.log(this.desa_bambu)

        let marker = null
        let markers = []
        let geojson = null
        let geojsons = []
        let propinsi_id = ''
        let filename = ''
        for(var i=0; i< this.desa_bambu.length; i++){
          if (propinsi_id != this.desa_bambu[i].id) {
            propinsi_id = this.desa_bambu[i].id
            this.propinsi.push(this.desa_bambu[i])
            marker = new L.Marker([this.desa_bambu[i].lat, this.desa_bambu[i].lng]).bindTooltip(this.desa_bambu[i].nama_pulau).on("click", this.markPropinsiClick); 
            markers.push(marker)
          }
          
          if ((filename != this.desa_bambu[i].file_name) && this.desa_bambu[i].file_name != '') {
              filename = this.desa_bambu[i].file_name 
              geojson = await this.getGeoJsonFile(this.desa_bambu[i].file_name)
              let layers = L.geoJSON(geojson,
                {
                  onEachFeature: this.desaLabel,
                  style: function(){
                    return {
                      "color": "green",
                      "weight": 1,
                      "opacity": 1
                    }
                  },
                })
              
              geojsons.push(layers)
           
          }
        }

        geojson = await this.getGeoJsonFile('desa-modo.geojson')
        L.geoJSON(geojson,
          {
            onEachFeature: this.pembibitanLabel,
            style: function(){
              return {
                "color": "Blue",
                "weight": 1,
                "opacity": 1
              }
            },
          })

        this.layerPembibitan = L.layerGroup(this.markPembibitan)
        

        this.layerMarkPropinsi = L.layerGroup(markers)
        this.layerPolygonDesaBambu = L.layerGroup(geojsons)
        this.layerMarkDesaBambu = L.layerGroup(this.markDesaBambu)
    },
    desaLabel(f, l) {
        if (f) {
            l.bindTooltip(f.properties.lls2020_de,{
                permanent: true,
                direction:"left",
            });
        }
        if (f.geometry) {
            const poly = L.polygon(l.feature.geometry.coordinates)
            const center = poly.getBounds().getCenter()          
            let marker = new L.Marker([center.lng, center.lat], {title:f.properties.lls2020_de, icon: this.icon});
            marker.bindTooltip(f.properties.lls2020_de, {
                permanent: false, 
                direction: 'left'
            });
            
            marker.on('click', L.bind(this.markDesaBambuClick, null, f, center) );
            this.markDesaBambu.push(marker)
        }
        l.on('click', L.bind(this.polygonDesaBambuClick, null, f));
    },
    pembibitanLabel(f, l) {
        if (f) {
            l.bindTooltip(f.properties.PopupInfo,{
                permanent: true,
                direction:"left",
            });
        }
        if (f.geometry) {
            let marker = new L.Marker([f.geometry.coordinates[1], f.geometry.coordinates[0]], {title:f.properties.PopupInfo, icon: this.icon});
            marker.bindTooltip(f.properties.PopupInfo, {
                permanent: false, 
                direction: 'left'
            });
            
            //marker.on('click', L.bind(this.markDesaBambuClick, null, f, center) );
            this.markPembibitan.push(marker)
        }
        //l.on('click', L.bind(this.polygonDesaBambuClick, null, f));
    },
    markDesaBambuClick(f, l, center) {
      const data = this.searchLineID(f.properties['id'])
      this.zoomDesaPolygon(data.des_id, center.latlng, 13)
    },
    polygonDesaBambuClick(f, l,) {
      if (!store.state.ismobile) {
        this.map.setZoomAround([l.latlng.lat, l.latlng.lng], 14)
      }
      this.isShowDesc = false
      this.nama_kecamatan = f.properties['Name']
      //this.status = f.properties['Status']
      //this.luas_lahan = f.properties['Luas_ha']
      //this.jml_bibit = f.properties['JmlhBibit']
      this.isShowDesc = true

      const desa = this.searchLineID(f.properties['id'])
      const data = this.searchLatLng(desa.line)
      this.nama_desa = data.des_name
      this.colDescShow = true
    },
    hideSummaryClick() {
      store.commit('hidesummary')
    }
  }
}
</script>


