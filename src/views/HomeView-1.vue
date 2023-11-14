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

          <div id="mapContainer"></div>

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
                <div style="float:right; width:15px"><i class="icon-close" v-on:click="showDescCloseClick" style="margin-top: 3px;float:right;font-size: 16px;"></i></div>
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
                <button class="button-4" style="margin-top: 15px;" role="button" v-on:click="showDescCloseClick">Back</button>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
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
      data_kecamatan: [],
      layer_marks: null,
      layer_geojsons: null,
      geo_marks: [],
      layer_geo_marks: null,
      prevZoom: null,
      isShowDesc: false,
      nama_kecamatan: null,
      luas: null,
      jml_bibit: null,
      status: null,
      isLoading: true,

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
      this.layer_marks.addTo(this.map)
      this.isLoading = false

      this.prevZoom = this.map.getZoom()    
      this.map.on('zoomend', this.onMapZoom);
    },
    onMapZoom(){
      let currZoom = this.map.getZoom();
      if (currZoom >= 14) {
        if (this.map.hasLayer(this.layer_geo_marks)) {
          this.map.removeLayer(this.layer_geo_marks)
        }
        if (!this.map.hasLayer(this.layer_geojsons)) {
          this.layer_geojsons.addTo(this.map)
        }
      } else {
        if (currZoom >= 8) {
          this.isShowDesc = false
          if (this.map.hasLayer(this.layer_marks)) {
            this.map.removeLayer(this.layer_marks)
          }
          if (this.map.hasLayer(this.layer_geojsons)) {
            this.map.removeLayer(this.layer_geojsons)
          }
          if (!this.map.hasLayer(this.layer_geo_marks)) {
            this.layer_geo_marks.addTo(this.map)
          }
        } else {
          this.isShowDesc = false
          if (!this.map.hasLayer(this.layer_marks)) {
            this.layer_marks.addTo(this.map)
          }
          if (this.map.hasLayer(this.layer_geojsons)) {
            this.map.removeLayer(this.layer_geojsons)
          }
          if (this.map.hasLayer(this.layer_geo_marks)) {
            this.map.removeLayer(this.layer_geo_marks)
          }
        }
      }
      this.prevZoom = currZoom;
    },
    markClick(l) {
      this.map.setZoomAround([l.latlng.lat, l.latlng.lng], 8)
    },
    areaClick(id) {
      if (store.state.ismobile) {
        store.commit('hideleftbar')
      }
      if (store.state.summary_show) {
        store.commit('hidesummary')
      }
      let latLng = this.searchLatLng(id)
      this.map.setView(latLng, 8)
    },
    showDescCloseClick() {
      this.isShowDesc = false
      if (!store.state.ismobile) {
        this.map.zoomOut(8);
      }
    },
    searchID(lat, lng) {
      for(var i=0; i< this.data_kecamatan.length; i++){
        var data = this.data_kecamatan[i];
        if(data.lat==lat && data.lng==lng){
          return data.id_kecamatan;
        }
      }
    },
    searchLatLng(kode) {
      for(var i=0; i< this.data_kecamatan.length; i++){
        var data = this.data_kecamatan[i];
        if(data.id_kecamatan==kode){
          return [data.lat, data.lng];
        }
      }
    },
    getGeoJSon: async function(geoJSonName) {
      const response = await fetch("/storages/geojson/" + geoJSonName);
      let data = await response.json();
      return data;
    },
    getData: async function () {
        let response = await apiAccess.read('kecamatan')
        this.data_kecamatan = response.data

        let marker = null
        let markers = []
        let geojson = null
        let geojsons = []
        for(var i=0; i< this.data_kecamatan.length; i++){
          marker = new L.Marker([this.data_kecamatan[i].lat, this.data_kecamatan[i].lng]).bindTooltip(this.data_kecamatan[i].nm_kecamatan).on("click", this.markClick); 
          markers.push(marker)
          
          if (this.data_kecamatan[i].geojson_kecamatan != '') {
            geojson = await this.getGeoJSon(this.data_kecamatan[i].geojson_kecamatan)
            this.data_kecamatan[i].geojson = geojson
            let layers = L.geoJSON(geojson,
              {
                onEachFeature: this.geoLabel,
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
        this.layer_marks = L.layerGroup(markers)
        this.layer_geojsons = L.layerGroup(geojsons)
        this.layer_geo_marks = L.layerGroup(this.geo_marks)
    },
    geoLabel(f, l) {
      if (f.properties) {
          l.bindTooltip(f.properties['Name'],{
              permanent: true,
              direction:"left",
          });
      }
      if (f.geometry) {
          let marker = new L.Marker([f.geometry.coordinates[0][0][0][1], f.geometry.coordinates[0][0][0][0]], {title:f.properties['Name'], icon: this.icon});
          marker.bindTooltip(f.properties['Name'], {
              permanent: false, 
              direction: 'left'
          });
          marker.on('click', L.bind(this.geoMarkClick, null, f) );
          this.geo_marks.push(marker)
      }
      l.on('click', L.bind(this.geoMarkClick, null, f));
    },
    geoMarkClick(f, l) {
      if (!store.state.ismobile) {
        this.map.setZoomAround([l.latlng.lat, l.latlng.lng], 16)
      }
      this.isShowDesc = false
      this.nama_kecamatan = f.properties['Name']
      this.status = f.properties['Status']
      this.luas = f.properties['Luas_ha']
      this.jml_bibit = f.properties['JmlhBibit']
      this.isShowDesc = true
    },
    showleftbar() {
        if (store.state.leftbar_show) {
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


