<template>
  <div class="body-content vld-parent">
    <div class="overlay" v-if="isLoading"></div>
    <fulfilling-bouncing-circle-spinner
      :animation-duration="2000"
      :size="65"
      color="#5cac2a"
       v-if="isLoading" 
    />

    <div class="leftbar" :class="{ 'sidebar-enable': sidebar_show }">
      <div class="logo">
        <a href="https://bambuvillage.org"><img src="../../public/img/logo-white.png"></a>
      </div>
      <!--<div class="search">
        <span class="p-input-icon-right">
          <input type="search" class="p-inputtext-sm input-search" placeholder="Search" />
          <i class="icon-magnifier" style="color:#ccc"></i>
        </span>
      </div>-->

      <div class="scroll-panel">
        <myScroll>

          <k-tabs  class="left-menu">
            <k-tab name="PEMBIBITAN" :selected="true">
              
              <div class="scroll-content" v-for="(item,i) in treeDataPembibitan" :key="i">
                <tree-item
                  :item="item"
                  @propinsi-click="menuPropPembibitanClick"
                ></tree-item>
              </div>
            </k-tab>

            <k-tab name="PENANAMAN">
              <div class="scroll-content" v-for="(item,i) in treeDataPenanaman" :key="i">
                <tree-item
                  :item="item"
                  @propinsi-click="menuPropPenanamanClick"
                ></tree-item>
              </div>
            </k-tab>

          </k-tabs>
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
              <div class="overlay-desa" v-if="isDesaLoading"></div>
              <self-building-square-spinner
                :animation-duration="6000"
                :size="40"
                color="#395b24"
                v-if="isDesaLoading"
              />

              <img class="img-desc" :src="image_desa">
              <div class="col-desc-close">
                <i class="icon-close" v-on:click="colDescShow = !colDescShow" style="margin-top: 3px;font-size: 22px; cursor:pointer"></i>
              </div>
              <div class="judul">{{ nama_desa }}</div>
              <div class="panel-right-content">
                <div class="col-desc-text" v-html="desa_desc">
                  <!--<hr style="margin-top: 15px">-->
                </div>
                <div class="hr-line"></div>
                <div>
                  Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet.
                </div>
                
                <div class="hr-line"></div>
                <k-tabs>
                  <k-tab name="PROGRESS" :selected="true">
                    <div class="content-area" v-if="jml_bibit > 0 || luas_lahan > 0 ">
                      <div class="label-content"><strong>PEMBIBITAN</strong></div>
                      <div class="answer-content"></div>
                    </div>
                    <div  v-if="jml_bibit > 0">
                      <div v-for="(item, x) in data_pembibitan"  :key="x">
                        <div class="content-area">
                          <div class="label-content"> <i class="icon-arrow-right"
                              style="margin-right:3px;font-size: 10px;"></i>{{ item.nama}} :</div>
                          <div class="answer-content" v-if="item.jml_bibit > 0"> {{ item.jml_bibit | numberFormat }} bibit</div>
                        </div>
                      </div>
                    </div>
                    <div class="content-area" style="margin-top:10px;" v-if="jml_bibit > 0">
                      <div class="label-content"><b>Total Bibit :</b></div>
                      <div class="answer-content" v-if="jml_bibit > 0"> <b>{{jml_bibit | numberFormat}} bibit</b></div>
                    </div>
                    <div class="content-area" v-if="luas_lahan > 0">
                      <div class="label-content"> <b>Total Luas Lahan :</b></div>
                      <div class="answer-content"> <b>{{ luas_lahan | floatFormat }} m2</b></div>
                    </div>

                    <yearPembibitanPanel :desa_id="desa_id" :jml_bibit="jml_bibit" :areaSelect="areaSelect" :type="areaType"/>

                    <div class="hr-line" v-if="jml_kepompong > 0 || luas_kepompong > 0"></div>

                    <div class="content-area" v-if="jml_kepompong > 0 || luas_kepompong > 0">
                      <div class="label-content"><strong>KEPOMPONG</strong></div>
                      <div class="answer-content"></div>
                    </div>
                    <div  v-if="jml_kepompong > 0">
                      <div v-for="item in data_kepompong"  :key="item.name">
                        <div class="content-area">
                          <div class="label-content" v-if="item.total_hidup > 0"> <i class="icon-arrow-right"
                              style="margin-right:3px;font-size: 10px;"></i>{{ item.nama_jenis_bambu }} :</div>
                          <div class="answer-content" v-if="item.total_hidup > 0"> {{ item.total_hidup | numberFormat }} bibit</div>
                        </div>
                      </div>
                    </div>
                    <div class="content-area" style="margin-top:5px;" v-if="jml_kepompong > 0">
                      <div class="label-content"><b>Total Kepompong :</b></div>
                      <div class="answer-content"> <b>{{jml_kepompong | numberFormat}} bibit</b></div>
                    </div>
                    <div class="content-area" v-if="luas_kepompong > 0">
                      <div class="label-content"> <b>Total Luas Lahan :</b></div>
                      <div class="answer-content"> <b>{{ luas_kepompong | floatFormat }} Ha</b></div>
                    </div>

                    <yearKepompongPanel :desa_id="desa_id" :jml_kepompong="jml_kepompong" :areaSelect="areaSelect" :areaType="areaType"/>

                    <div class="hr-line" v-if="jml_penanaman > 0 && ((jml_kepompong > 0 || luas_kepompong > 0) || (jml_bibit > 0 || luas_lahan > 0))"></div>

                    <div class="content-area" v-if="jml_penanaman > 0">
                      <div class="label-content"><strong>PENANAMAN</strong></div>
                      <div class="answer-content"></div>
                    </div>
                    <div  v-if="jml_penanaman > 0">
                      <div v-for="item in data_penanaman"  :key="item.name">
                        <div class="content-area">
                          <div class="label-content" v-if="item.nama"> <i class="icon-arrow-right"
                              style="margin-right:3px;font-size: 10px;"></i><b>Desa {{ item.nama }} </b>
                          </div>
                          <div class="label-content" v-if="item.ditanam > 0" style="margin-left:25px;">
                            <span style="margin-right:5px;">&#9679;</span> {{ item.jenis_bambu }} :
                          </div>
                          <div class="answer-content" v-if="item.ditanam > 0"> {{ item.ditanam | numberFormat }} bibit</div>
                        </div>
                      </div>
                    </div>
                    <div class="content-area" style="margin-top:5px;" v-if="jml_penanaman > 0">
                      <div class="label-content"><b>Total penanaman :</b></div>
                      <div class="answer-content"> <b>{{jml_penanaman | numberFormat}} bibit</b></div>
                    </div>
                    <div class="content-area" v-if="luas_penanaman > 0">
                      <div class="label-content"> <b>Total Luas Lahan :</b></div>
                      <div class="answer-content"> <b>{{ luas_penanaman | floatFormat}} Ha</b></div>
                    </div>

                    <yearPenanamanPanel :desa_id="desa_id" :jml_penanaman="jml_penanaman" :areaSelect="areaSelect" :areaType="areaType"/>

                    <div class="hr-line" v-if="jml_asal_bibit > 0"></div>

                    <div class="content-area" v-if="jml_asal_bibit > 0">
                      <div class="label-content"><strong>ASAL BIBIT</strong></div>
                      <div class="answer-content"></div>
                    </div>
                    <div  v-if="jml_asal_bibit > 0">
                      <div v-for="item in asal_bibit"  :key="item.name">
                        <div class="content-area">
                          <div class="label-content" v-if="item.tahun" style="margin-top:10px">
                            <b>Tahun {{item.tahun}}</b>
                          </div>
                          <br>
                          <div class="label-content" v-if="item.nama"> <i class="icon-arrow-right"
                              style="margin-right:3px;font-size: 10px;"></i><b>Desa {{ item.nama }} </b>
                          </div>
                          <div class="label-content" v-if="item.ditanam > 0" style="margin-left:25px;">
                            <span style="margin-right:5px;">&#9679;</span> {{ item.jenis_bambu }} :
                          </div>
                          <div class="answer-content" v-if="item.ditanam > 0"> {{ item.ditanam | numberFormat }} bibit</div>
                        </div>
                      </div>
                    </div>
                    <div class="content-area" style="margin-top:5px;" v-if="jml_asal_bibit > 0">
                      <div class="label-content"><b>Total Bibit :</b></div>
                      <div class="answer-content"> <b>{{jml_asal_bibit | numberFormat}} bibit</b></div>
                    </div>
                  </k-tab>

                  <k-tab name="DETAIL PEMBIBIT">
                    <div class="title-news-desc" v-if="total_pembibit > 0"> Total {{ total_pembibit | numberFormat }} pembibit <span style="float: right" v-if="jml_bibit_pembibit > 0">Total {{jml_bibit_pembibit | numberFormat}} bibit</span></div>
                    
                    <div class="hr-line" v-if="total_pembibit > 0 || jml_bibit_pembibit > 0"></div>
                    
                    <div class="boxdetailpembibit" v-for="(item,i) in data_pembibit" :key="i">
                      <div class="pembibit-image" >
                        <img class="pembibit-img" :src="item.foto" height="70px">
                        <div class="nama-pembibit"><b>{{ item.nama_peserta }}</b></div>
                      </div>
                      
                      <div class="detail-text">
                          <div v-for="(subitem, x) in getDetailBibitPembibit(item.nama_peserta)" :key="x" class="detail-bibit">
                            {{ subitem.nama }} : <span style="float: right;">{{ subitem.jml_bibit | numberFormat }} bibit</span>
                          </div>
                          <div class="sub-total-bibit">Total Bibit : <span style="float: right;">{{ sumBibit(item.nama_peserta) | numberFormat }} bibit</span></div>
                      </div>
                    </div>
                  </k-tab>

                  <k-tab name="NEWS">
                    <div class="news-container" v-for="(item,x) in data_news_desa" :key="x">
                      <div class="title-news-desc">{{item.subject}}</div>
                      <div class="news-date">{{formatDate(item.tanggal)}}</div>
                      <div class="col-desc-text" v-html="item.descriptions"></div>
                      <div class="hr-line"></div>
                    </div>
                  </k-tab>
                </k-tabs>

              </div>
            </myScroll>
          </div>
          
          <div class="inner-content">

            <div id="mapContainer">
              <div class="map-layer" v-on:click="viewLayer = !viewLayer"><img id="viewLayerImg" :src="imageLayerSelected" class="layer-icon"/></div>
            </div>

          </div>
          <!---------------S U M M A R Y -------------------------------------------------------------->
          <Transition name="slide">
            <div class="panel-top" :class="{ 'summary-sidebar-enable': sidebar_show }" v-if="summary_show">
              <div class="panel-top-content">
                <myScroll>
                  <div class="row">
                    <div class="col-1">
                      <div class="content-area">
                        <strong>PEMBIBITAN</strong>
                      </div>
                      <div id="chartPembibitan">
                        <apexchart type="bar" height="250" :options="chartOptionsPembibitan" :series="seriesPembibitan">
                        </apexchart>
                      </div>
                      <div class="content-area" style="display:block; margin-bottom: 25px; margin-top: -30px;">
                        <progress-bar bar-transition="all 0.9s ease" size="large" text-position="top" bg-color="#fff"
                          val="60" text="Progress Pembibitan 40%"></progress-bar>
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
                        <progress-bar bar-transition="all 0.9s ease" size="large" text-position="top" bg-color="#fff"
                          val="60" text="Progress Penanaman 60%"></progress-bar>
                      </div>
                    </div>

                    <div class="col-3">
                      <div id="chartPenanaman">
                        <apexchart type="pie" width="380" :options="chartOptionsPenanaman" :series="seriesPenanaman">
                        </apexchart>
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

                <button class="button-4" style="margin-top: 15px;" role="button"
                  v-on:click="hideSummaryClick">Hide</button>
              </div>
            </div>
          </Transition>
          
          <div class="layer-panel" v-if="viewLayer">
            <div style="height: 60px">
              <figure style="float:left; margin:0; width:80px;">
                  <label class="label-map">
                      <input type="radio"  v-model="layerSelected" value="0" @change="googleLayerClick" checked>
                      <img src="../../public/img/street-layer.jpg" class="layer-img" />
                      <figcaption class="item-label">Default</figcaption>
                  </label>
              </figure>

              <figure style="float:left; margin:0; width:80px;">
                  <label class="label-map">
                      <input type="radio" v-model="layerSelected" value="1" @change="googleLayerClick">
                      <img src="../../public/img/satellite-layer.jpg"  class="layer-img" />
                      <figcaption class="item-label">Satelite</figcaption>
                  </label>
              </figure>
            </div>
            <div class="additional-layer">
              
              <ul class="ks-cboxtags">
                <li><input type="checkbox" id="pembibitan" value="pembibitan" v-model="checkedArea" @change="aditionalLayerClick"><label for="pembibitan">Pembibitan</label></li>
                <li><input type="checkbox" id="kepompong" value="kepompong" v-model="checkedArea" @change="aditionalLayerClick"><label for="kepompong">Kepompong</label></li>
                <li><input type="checkbox" id="penanaman" value="penanaman" v-model="checkedArea" @change="aditionalLayerClick"><label for="penanaman">Penanaman</label></li>
                <li><input type="checkbox" id="critical" value="critical" v-model="checkedArea" @change="aditionalLayerClick"><label for="critical">Lahan Kritis</label></li>
              </ul>
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
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Icon }  from 'leaflet' 
import Topbar from '@/components/TopBar.vue';;
import VueApexCharts from 'vue-apexcharts';
import ProgressBar from 'vue-simple-progress';
import CONFIG from '@/utils/config.js';
import {FulfillingBouncingCircleSpinner, SelfBuildingSquareSpinner } from 'epic-spinners';
import treeView from '@/components/TreeView.vue';
import yearPembibitanPanel from '@/components/YearPembibitanPanel.vue';
import yearKepompongPanel from '@/components/YearKepompongPanel.vue';
import yearPenanamanPanel from '@/components/YearPenanamanPanel.vue';

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
      desa_penanaman: [],
      layerMarkPropinsi: null,
      layerPolygonDesaBambu: null,
      layerPolygonKabupaten: null,
      markDesaBambu: [],
      markKabupaten: [],
      layerMarkDesaBambu: null,
      prevZoom: null,
      nama_kecamatan: null,
      luas_lahan: null,
      jml_bibit: null,
      jml_bibit_pembibit: null,
      jml_kepompong: null,
      luas_kepompong: null,
      data_penanaman: [],
      jml_penanaman: null,
      luas_penanaman: null,
      asal_bibit: [],
      jml_asal_bibit: null,
      status: null,
      isLoading: true,
      isDesaLoading: false,
      colDescShow: false,
      subPropinsiShow: false,
      subKabupatenShow: false,
      subKecamatanShow: false,
      desa_id: null,
      nama_desa: null,
      desa_desc: null,
      desa_image: [],
      image_desa: null,
      data_pembibitan: [],
      data_pembibit: [],
      data_asal_pembibit: [],
      detail_pembibit: [],
      detail_asal_pembibit: [],
      total_pembibit: null,
      total_asal_pembibit: null,
      data_news_desa: [],
      data_kepompong: [],
      markPembibitan: [],
      layerPembibitan: null,
      layerKepompong: null,
      layerPenanaman: null,
      layerKritis: null,
      loader:null,
      googleStreets: null,
      googleSatelite: null,
      viewLayer: false,
      layerSelected: 0,
      imageLayerSelected: '../img/street-layer.jpg',
      checkedArea: ['pembibitan', 'kepompong', 'penanaman'],

      areaSelect: null,
      areaType: null,
      yearList: [],

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
        treeDataPembibitan: [],
        treeDataPenanaman: [],
    };
  },
  filters: {
    numberFormat (value) {
      let num = parseInt(value)
      return `${num.toLocaleString('id-ID')}`
    },
    floatFormat (value) {
      let num = parseFloat(value)
      return `${num.toLocaleString('id-ID')}`
    }
  },
  components: {
    Topbar,
    apexchart: VueApexCharts,
    ProgressBar,
    FulfillingBouncingCircleSpinner,
    SelfBuildingSquareSpinner,
    'tree-item': treeView,
    yearPembibitanPanel,
    yearKepompongPanel,
    yearPenanamanPanel
},
  created: async function() {
   
  },
  computed: {
      sidebar_show() {
        return store.state.leftbar_show;
      },
      summary_show() {
        return store.state.summary_show;
      },
      
  },
  async mounted() { 
    await this.getData()
    this.createMap()
    
  },
  methods: {
    createMap() {
      this.map = L.map("mapContainer").setView([-1.2109175, 119.0918159], 5);
      this.googleStreets = L.tileLayer("https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}", {
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
        maxZoom: 22,
        maxNativeZoom: 19
      }).addTo(this.map);
      this.layerMarkPropinsi.addTo(this.map)
      this.layerPenanaman.addTo(this.map)
      this.layerKepompong.addTo(this.map)
      this.isLoading = false

      this.prevZoom = this.map.getZoom()    
      this.map.on('zoomend', this.onMapZoom);
    },
    onMapZoom(){
      let currZoom = this.map.getZoom();
      if (currZoom >= 16) {
        if (this.map.hasLayer(this.layerPolygonDesaBambu)) {
          this.map.removeLayer(this.layerPolygonDesaBambu)
          this.map.removeLayer(this.layerMarkDesaBambu)
        }
      } else {
        if (currZoom >= 13 && currZoom < 16) {
          if (this.map.hasLayer(this.layerMarkDesaBambu)) {
            this.map.removeLayer(this.layerMarkDesaBambu)
          }
          if (!this.map.hasLayer(this.layerPolygonDesaBambu)) {
            this.layerPolygonDesaBambu.addTo(this.map)
          }
          if (!this.map.hasLayer(this.layerPembibitan)) {
            if (this.findLayer('pembibitan')) {
              this.layerPembibitan.addTo(this.map)
            }
          }
          if (this.map.hasLayer(this.layerPolygonKabupaten)) {
            this.map.removeLayer(this.layerPolygonKabupaten)
          }
        } else {
          if (currZoom >= 8 && currZoom < 13) {
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
            if (!this.map.hasLayer(this.layerPolygonKabupaten)) {
              this.layerPolygonKabupaten.addTo(this.map)
            }
          } else {
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
            if (this.map.hasLayer(this.layerPolygonKabupaten)) {
              this.map.removeLayer(this.layerPolygonKabupaten)
            }
          }
        }
      }
      this.prevZoom = currZoom;
    },
    markPropinsiClick(l) {
      this.hideSummaryClick()
      this.map.setZoomAround([l.latlng.lat, l.latlng.lng], 8)
    },
    menuPropPembibitanClick(item) {
      if (store.state.ismobile) {
        store.commit('hideleftbar')
      }
      if (store.state.summary_show) {
        store.commit('hidesummary')
      }
      
      if (item.propinsi) {
        this.map.invalidateSize(true);
        this.map.setView([item.lat, item.lng], 8)
        this.map.invalidateSize(true);
      }
      if (item.kabupaten) {
        this.colDescShow = true
        const kabupaten = this.searchKabupaten(item.kab_id)
        this.menuKabPembibitanClick(kabupaten, 10)
      }
      if (item.desa) {
        this.colDescShow = true
        this.menuDesaPembibitanClick(item.des_id, 13)
      }
    },
    menuPropPenanamanClick(item) {
      if (store.state.ismobile) {
        store.commit('hideleftbar')
      }
      if (store.state.summary_show) {
        store.commit('hidesummary')
      }
      
      if (item.propinsi) {
        if (item.lat != '' && item.lng != '') {
          this.map.setView([item.lat, item.lng], 8)
        }
      }
      if (item.kabupaten) {
        const kabupaten = this.searchKabupaten(item.kab_id)
        this.menuKabPenanamanClick(kabupaten, 10)
      }
      if (item.desa) {
        this.menuDesaPenanamanClick(item, 13)
      }
    },
    menuKabPembibitanClick: async function (item, zoom) {
      if (store.state.ismobile) {
        store.commit('hideleftbar')
      }
      if (store.state.summary_show) {
        store.commit('hidesummary')
      }
      this.colDescShow = true
      this.isDesaLoading = true
      if (item) {
        if ((item.kab_lat) && (item.kab_lng)) {
          this.map.invalidateSize(true);
          this.map.setView([item.kab_lat, item.kab_lng], zoom)
        }

        this.areaSelect = 'kabupaten'
        this.areaType = 'bibit'
        this.desa_id = item.kab_id
        this.nama_desa = item.kab_name
        this.desa_desc = item.kab_desc
        this.desa_image = await this.getPenanaman('kabupaten/getimage', item.kab_id)
        if (this.desa_image.length > 0) {
        this.image_desa = CONFIG.KABUPATEN_IMAGE + this.desa_image[0]['file_name']
        } else {
          this.image_desa = CONFIG.IMAGE + 'no-image.jpg'
        }

        this.data_pembibitan = await this.getPenanaman('kabupaten/getpembibitan', item.kab_id)
        this.jml_bibit = await this.getJumlahBibit()
        this.luas_lahan = await this.getPenanaman('kabupaten/getluaslahan', item.kab_id)

        this.detail_pembibit = await this.getPenanaman('kabupaten/getdetailpembibit', item.kab_id)
        this.data_pembibit = await this.getDataPembibit(this.detail_pembibit)
        this.total_pembibit = this.data_pembibit.length
        this.jml_bibit_pembibit = this.jml_bibit

        this.data_kepompong = await this.getPenanaman('kabupaten/getkepompong', item.kab_id)
        this.jml_kepompong = await this.getJumlahKepompong()
        this.luas_kepompong = await this.getPenanaman('kabupaten/getluaskepompong', item.kab_id)

        this.data_penanaman = await this.getPenanaman('kabupaten/getlokasipenanaman', item.kab_id)
        this.jml_penanaman = await this.getJumlahPenanaman()
        this.luas_penanaman = await this.getPenanaman('kabupaten/getluaslokasipenanaman', item.kab_id)

        this.asal_bibit = []
        this.jml_asal_bibit = 0

        this.data_news_desa = await this.getPenanaman('kabupaten/getnews', item.kab_id)
      }
      this.isDesaLoading = false
    },
    menuKabPenanamanClick: async function (item, zoom) {
      if (store.state.ismobile) {
        store.commit('hideleftbar')
      }
      if (store.state.summary_show) {
        store.commit('hidesummary')
      }
      this.colDescShow = true
      this.isDesaLoading = true
      if (item) {
        if ((item.kab_lat) && (item.kab_lng)) {
          this.map.invalidateSize(true);
          this.map.setView([item.kab_lat, item.kab_lng], zoom)
        }

        this.areaSelect = 'kabupaten'
        this.areaType = 'tanam'
        this.desa_id = item.kab_id
        this.nama_desa = item.kab_name
        this.desa_desc = item.kab_desc
        this.desa_image = await this.getPenanaman('kabupaten/getimage', item.kab_id)
        if (this.desa_image.length > 0) {
        this.image_desa = CONFIG.KABUPATEN_IMAGE + this.desa_image[0]['file_name']
        } else {
          this.image_desa = CONFIG.IMAGE + 'no-image.jpg'
        }

        this.data_pembibitan = []
        this.jml_bibit = 0
        this.luas_lahan = 0
        this.data_kepompong = []
        this.jml_kepompong = 0
        this.luas_kepompong = 0

        this.data_penanaman = await this.getPenanaman('kabupaten/getlokasipenanaman', item.kab_id)
        this.jml_penanaman = await this.getJumlahPenanaman()
        this.luas_penanaman = await this.getLuasPenanaman('kabupaten/getluaslokasipenanaman', item.kab_id)
        this.asal_bibit = await this.getPenanaman('kabupaten/getasalbibit', item.kab_id)
        this.jml_asal_bibit = await this.getJumlahAsalBibit()

        this.detail_pembibit = await this.getPenanaman('kabupaten/getdetailasalpembibit', item.kab_id)
        this.data_pembibit = await this.getDataPembibit(this.detail_pembibit)
        this.total_pembibit = this.data_pembibit.length
        this.jml_bibit_pembibit = this.jml_penanaman

        this.data_news_desa = await this.getPenanaman('kabupaten/getnews', item.kab_id)
      }
      this.isDesaLoading = false
    },
    menuDesaPembibitanClick: async function (id, zoom) {
      if (store.state.ismobile) {
        store.commit('hideleftbar')
      }
      if (store.state.summary_show) {
        store.commit('hidesummary')
      }
      this.colDescShow = true
      this.isDesaLoading = true

      let data = this.searchDesa(id)
      if (data) {
        if (zoom) {
          if (data.lat && data.lng) {
            this.map.invalidateSize(true);
            this.map.setView([data.lat, data.lng], zoom)
          }
        }

        this.areaSelect = 'desa'
        this.areaType = 'bibit'
        this.desa_id = data.des_id
        this.nama_desa = data.des_name
        this.desa_desc = data.descriptions
        this.desa_image = await this.getPenanaman('desabambu/getimagedesa', data.des_id)
        if (this.desa_image.length > 0) {
        this.image_desa = CONFIG.DESA_IMAGE + this.desa_image[0]['file_name']
        } else {
          this.image_desa = CONFIG.IMAGE + 'no-image.jpg'
        }

        this.data_pembibitan = await this.getPenanaman('desabambu/getpembibitan', data.des_id)
        this.jml_bibit = await this.getJumlahBibit()
        this.luas_lahan = await this.getLuasPenanaman('desabambu/getluaslahan', data.des_id)
        this.detail_pembibit = await this.getPenanaman('desabambu/getdetailpembibit', data.des_id)
        this.data_pembibit = await this.getDataPembibit(this.detail_pembibit)
        this.total_pembibit = this.data_pembibit.length
        this.jml_bibit_pembibit = this.jml_bibit

        this.data_kepompong = await this.getPenanaman('desabambu/getkepompong', data.des_id)
        this.jml_kepompong = await this.getJumlahKepompong()
        this.luas_kepompong = await this.getLuasPenanaman('desabambu/getluaskepompong', data.des_id)

        this.data_penanaman = await this.getPenanaman('desabambu/getasalpenanaman', data.des_id)
        this.jml_penanaman = await this.getJumlahPenanaman()
        this.luas_penanaman = await this.getLuasPenanaman('desabambu/getluasasalpenanaman', data.des_id)
        
        this.asal_bibit = []
        this.jml_asal_bibit = 0

        this.data_news_desa = await this.getPenanaman('desabambu/getnewsdesa', data.des_id)

        //let yearData = await apiAccess.read('desabambu/getyearpembibitan', {id: data.des_id})
        //this.yearList = yearData.data
      }
      this.isDesaLoading = false
    },
    menuDesaPenanamanClick: async function (item, zoom) {
      if (store.state.ismobile) {
        store.commit('hideleftbar')
      }
      if (store.state.summary_show) {
        store.commit('hidesummary')
      }
      this.colDescShow = true
      this.isDesaLoading = true

      let data = this.searchDesaPenanaman(item.des_id)
      if (data) {
        if (data.lat && data.lng) {
          this.map.invalidateSize(true);
          this.map.setView([data.lat, data.lng], zoom)
        }

        this.areaSelect = 'desa'
        this.areaType = 'tanam'
        this.desa_id = data.des_id
        this.nama_desa = data.des_name
        this.desa_desc = data.descriptions
        this.desa_image = await this.getPenanaman('desabambu/getimagedesa', data.des_id)
        if (this.desa_image.length > 0) {
        this.image_desa = CONFIG.DESA_IMAGE + this.desa_image[0]['file_name']
        } else {
          this.image_desa = CONFIG.IMAGE + 'no-image.jpg'
        }

        this.data_pembibitan = []
        this.jml_bibit = 0
        this.luas_lahan = 0
        this.data_kepompong = []
        this.jml_kepompong = 0
        this.luas_kepompong = 0

        this.data_penanaman = await this.getPenanaman('desabambu/getlokasipenanaman', data.des_id)
        this.jml_penanaman = await this.getJumlahPenanaman()
        this.luas_penanaman = await this.getPenanaman('desabambu/getluaslokasipenanaman', data.des_id)
        this.asal_bibit = await this.getPenanaman('desabambu/getasalbibit', data.des_id)
        this.jml_asal_bibit = await this.getJumlahAsalBibit()

        this.detail_pembibit = await this.getPenanaman('kabupaten/getdetailasalpembibit', data.kab_id)
        this.data_pembibit = await this.getDataPembibit(this.detail_pembibit)
        this.total_pembibit = this.data_pembibit.length
        this.jml_bibit_pembibit = this.jml_penanaman

        this.data_news_desa = await this.getPenanaman('kabupaten/getnews', data.kab_id)
      }
      this.isDesaLoading = false
    },
    googleLayerClick() {
      if (this.layerSelected == 1) {
        this.map.removeLayer(this.googleStreets)
        this.googleSatelite = L.tileLayer("https://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}", {
          subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
          maxZoom: 22,
          maxNativeZoom: 19,
        }).addTo(this.map);
        this.imageLayerSelected = '../img/satellite-layer.jpg'
        this.viewLayer = !this.viewLayer
      } else {
        this.map.removeLayer(this.googleSatelite)
        this.googleStreets = L.tileLayer("https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}", {
          subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
          maxZoom: 22,
          maxNativeZoom: 19,
        }).addTo(this.map);
        this.imageLayerSelected = '../img/street-layer.jpg'
        this.viewLayer = !this.viewLayer
      }
    },
    findLayer: function(item) {
      for (let i = 0; i < this.checkedArea.length; i++){
        if (this.checkedArea[i] == item) {
          return true
        } 
      }
      return false
    },
    aditionalLayerClick() {
      if (this.findLayer('critical')) {
         this.layerKritis.addTo(this.map)
      } else {
        this.map.removeLayer(this.layerKritis)
      }
      if (this.findLayer('penanaman')) {
         this.layerPenanaman.addTo(this.map)
      } else {
        this.map.removeLayer(this.layerPenanaman)
      }
      if (this.findLayer('kepompong')) {
         this.layerKepompong.addTo(this.map)
      } else {
        this.map.removeLayer(this.layerKepompong)
      }
      if (this.findLayer('pembibitan')) {
         this.layerPembibitan.addTo(this.map)
      } else {
        this.map.removeLayer(this.layerPembibitan)
      }

    },
    getJumlahBibit() {
      let total_bibit = 0
      if (this.data_pembibitan.length > 0) {
        for(let i = 0; i < this.data_pembibitan.length; i++){
          if (this.data_pembibitan[i].jml_bibit > 0) { 
            total_bibit = total_bibit + parseInt(this.data_pembibitan[i].jml_bibit)
          }
        }
      }
      return total_bibit
    },
    getJumlahKepompong() {
      let total = 0
      if (this.data_kepompong.length > 0) {
        for(let i = 0; i < this.data_kepompong.length; i++){ 
          if (this.data_kepompong[i].total_hidup > 0) {
            total = total + parseInt(this.data_kepompong[i].total_hidup)
          }
        }
      }
      return total
    },
    getDataPembibit: async function (detail_pembibit) {
      let nama_pembibit = ''
      let dataPembibit = []
      if (detail_pembibit.length > 0) {
        for(let i = 0; i < detail_pembibit.length; i++){ 
          if (detail_pembibit[i]['nama_peserta'] != nama_pembibit) {
            nama_pembibit = detail_pembibit[i]['nama_peserta']
            let foto = null
            if (detail_pembibit[i]['foto']) {
              foto = CONFIG.PEMBIBIT_IMAGE + detail_pembibit[i]['foto']
            } else {
              foto = CONFIG.PEMBIBIT_IMAGE + 'user-default.png'
            }
            dataPembibit.push({nama_peserta: detail_pembibit[i]['nama_peserta'], foto: foto})
          }
        }
      }
      return dataPembibit
    },
    getDetailBibitPembibit(nama_peserta) {
      let detailBibit = []
      if (this.detail_pembibit.length > 0) {
        for(let i = 0; i < this.detail_pembibit.length; i++){ 
          if (this.detail_pembibit[i]['nama_peserta'] == nama_peserta) {
            detailBibit.push(this.detail_pembibit[i])
          }
        }
      }
      return detailBibit
    }, 
    sumBibit(item) {
      let sum = 0
      if (this.detail_pembibit.length > 0) {
        for(let i = 0; i < this.detail_pembibit.length; i++){ 
          if (this.detail_pembibit[i]['nama_peserta'] == item) {
            sum += parseInt(this.detail_pembibit[i]['jml_bibit'])
          }
        }
      }
      return sum;
    },
    getJumlahPenanaman() {
      let total = 0
      if (this.data_penanaman.length > 0) {
        for(let i = 0; i < this.data_penanaman.length; i++){ 
          if (parseInt(this.data_penanaman[i].ditanam) > 0) {
            total = total + parseInt(this.data_penanaman[i].ditanam)
          }
        }
      }
      return total
    },
    getPenanaman: async function (link, id) {
      let response = await apiAccess.read(link, {id: id})
      return response.data
    },
    getLuasPenanaman: async function (link, id) {
      let response = await apiAccess.read(link, {id: id})
      return response.data['luas_lahan']
    },
    getJumlahAsalBibit() {
      let total = 0
      if (this.asal_bibit.length > 0) {
        for(let i = 0; i < this.asal_bibit.length; i++){ 
          if (parseInt(this.asal_bibit[i].ditanam) > 0) {
            total = total + parseInt(this.asal_bibit[i].ditanam)
          }
        }
      }
      return total
    },
    getDataAsalPembibit: async function (detail_asal_pembibit) {
      let nama_pembibit = ''
      let dataPembibit = []
      if (detail_asal_pembibit.length > 0) {
        for(let i = 0; i < detail_asal_pembibit.length; i++){ 
          if (detail_asal_pembibit[i]['nama_peserta'] != nama_pembibit) {
            nama_pembibit = detail_asal_pembibit[i]['nama_peserta']
            let foto = null
            if (detail_asal_pembibit[i]['foto']) {
              foto = CONFIG.PEMBIBIT_IMAGE + detail_asal_pembibit[i]['foto']
            } else {
              foto = CONFIG.PEMBIBIT_IMAGE + 'user-default.png'
            }
            dataPembibit.push({nama_peserta: detail_asal_pembibit[i]['nama_peserta'], foto: foto})
          }
        }
      }
      return dataPembibit
    },
    /*getYearData: async function (link, id, year) {
      let response = await apiAccess.read(link, {id: id, year: year})
      return response.data
    },*/
    zoomDesaPolygon(id, koordinat, zoom) {
      if (store.state.ismobile) {
        store.commit('hideleftbar')
      }
      if (store.state.summary_show) {
        store.commit('hidesummary')
      }
      let data = this.searchDesa(id) 
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
    searchDesa(desa_id) {
      for(var i=0; i< this.desa_bambu.length; i++){
        var data = this.desa_bambu[i];
        if(data.des_id==desa_id){
          return data;
        }
      }
    },
    searchKabupaten(kab_id) {
      for(var i=0; i< this.desa_bambu.length; i++){
        var data = this.desa_bambu[i];
        if(data.kab_id==kab_id){
          return data;
        }
      }
    },
    searchDesaPenanaman(des_id) {
      for(var i=0; i< this.desa_penanaman.length; i++){
        var data = this.desa_penanaman[i];
        if(data.des_id==des_id){
          return data;
        }
      }
    },
    updateDesaLatLng(desa_id, lat, lng) {
      for(var i=0; i< this.desa_bambu.length; i++){
        var data = this.desa_bambu[i];
        if(data.des_id==desa_id){
          this.desa_bambu[i]['lat'] = lat
          this.desa_bambu[i]['lng'] = lng
        }
      }
    },
    updateKabupatenLatLng(kab_id, lat, lng) {
      for(var i=0; i< this.desa_bambu.length; i++){
        var data = this.desa_bambu[i];
        if(data.kab_id==kab_id){
          this.desa_bambu[i]['kab_lat'] = lat
          this.desa_bambu[i]['kab_lng'] = lng
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
        let marker = null
        let markers = []
        let geojson = null
        let geojsons = []
        let kab_geojson = null
        let kab_geojsons = []
        let kepompong_geojsons = []
        let penanaman_geojsons = []
        let kritis_geojsons = []
        let propinsi_id = ''
        let kab_id = ''
        let prop_name = ''
        let kab_name = ''
        let kec_name = ''
        let filename = ''
        let kab_filename = ''
        let desa = []
        let kec = []
        let kab = []
        let lat = null
        let lng = null
        let des_id = null
        for(var i=0; i< this.desa_bambu.length; i++){
          if (propinsi_id != this.desa_bambu[i].id) {
            propinsi_id = this.desa_bambu[i].id
            this.propinsi.push(this.desa_bambu[i])
            marker = new L.Marker([this.desa_bambu[i].lat, this.desa_bambu[i].lng]).bindTooltip(this.desa_bambu[i].nama_pulau).on("click", this.markPropinsiClick); 
            markers.push(marker)
            lat = this.desa_bambu[i].lat
            lng = this.desa_bambu[i].lng
          }
          
          //--------------GEOJSON DESA ADMINISTRATIF-----------------------------------
          if ((filename != this.desa_bambu[i].file_name) && this.desa_bambu[i].file_name != '') {
              filename = this.desa_bambu[i].file_name
              if (filename) { 
                geojson = await this.getGeoJsonFile(this.desa_bambu[i].file_name)
                let layers = L.geoJSON(geojson,
                  {
                    onEachFeature: this.desaLabel.bind(this),
                    style: function(){
                      return {
                        fillColor: "green",
                        fillOpacity: 0.01,
                        opacity: 1,
                        color: "#3fae59",
                        weight: 2,
                      }
                    },
                  })
              
                geojsons.push(layers)
              }
          }

          //-----------GEOJSON KABUPATEN ADMINSTRATIF-----------------------------------
          if ((kab_filename != this.desa_bambu[i].geojson_kabupaten) && this.desa_bambu[i].geojson_kabupaten != '') {
              if (this.desa_bambu[i].geojson_kabupaten) { 
                kab_geojson = await this.getGeoJsonFile(this.desa_bambu[i].geojson_kabupaten)
                let layers = L.geoJSON(kab_geojson,
                  {
                    onEachFeature: this.kabuptenLabel.bind(this),
                    style: function(){
                      return {
                        //fillColor: "white",
                        fillOpacity: 0,
                        opacity: 1,
                        color: "#00fd3b",
                        weight: 2,
                      }
                    },
                  })
              
                kab_geojsons.push(layers)
              }
           
          }

          //------------ARRAY TREE PEMBIBITAN DESA----------------------------
          des_id = this.desa_bambu[i].des_id
          if (kec_name != this.desa_bambu[i].kec_name) {
            if (kec_name != '') {
              kec.push({name: 'Kec. '+kec_name, propinsi: false, kabupaten: false, kab_id: 0, kecamatan: true, desa: false, des_id: this.desa_bambu[i].des_id, children: desa})
              desa = []
            }
            kec_name = this.desa_bambu[i].kec_name
          }
          if (kab_name != this.desa_bambu[i].kab_name) {
            if (kab_name != '') {
              kab.push({name: kab_name, propinsi: false, kabupaten: true, kab_id: kab_id, kecamatan: false, desa: false, des_id: this.desa_bambu[i].des_id, children: kec})
              kec = []
            }
            kab_id = this.desa_bambu[i].kab_id
            kab_name = this.desa_bambu[i].kab_name
          }
          if (prop_name != this.desa_bambu[i].nama_pulau) {
            if (prop_name != '') {
              this.treeDataPembibitan.push({name: prop_name, propinsi: true, kabupaten: false, kab_id: 0, kecamatan: false, desa: false, lat: lat, lng: lng, des_id: this.desa_bambu[i].des_id, children: kab})
              kab = []
            }
            prop_name = this.desa_bambu[i].nama_pulau
          }
          desa.push({name: this.desa_bambu[i].des_name, propinsi: false, kabupaten: false, kab_id: 0, kecamatan: false, desa: true, des_id: this.desa_bambu[i].des_id})
        }

        kec.push({name: 'Kec. '+kec_name, propinsi: false, kabupaten: false, kab_id: '0', kecamatan: true, desa: false, des_id: 0, children: desa})
        kab.push({name: kab_name, propinsi: false, kabupaten: true, kab_id: kab_id, kecamatan: false, desa: false, des_id: 0, children: kec})
        this.treeDataPembibitan.push({name: prop_name, propinsi: true, kabupaten: false, kab_id: '0', kecamatan: false, desa: false, lat: lat, lng: lng, des_id: des_id, children: kab})

        //-------------- LOAD GEOJSON MARK PEMBIBITAN -------------------------------
        geojson = await this.getGeoJsonFile('desa-modo.geojson')
        L.geoJSON(geojson,
          {
            onEachFeature: this.pembibitanLabel,
            style: function(){
              return {
                "color": "Blue",
                "weight": 1,
                "opacity": 0.5
              }
            },
          })

        this.layerPembibitan = L.layerGroup(this.markPembibitan)

        //-------------- LOAD GEOJSON PENANAMAN -------------------------------
        geojson = await this.getGeoJsonFile('flores.geojson')
        let layer = L.geoJSON(geojson,
          {
            onEachFeature: this.penanamanLabel,
            style: function(){
              return {
                //fillColor: "white",
                fillOpacity: 0,
                opacity: 1,
                color: "#58c3fa",
                weight: 2,
              }
            },
          })
        penanaman_geojsons.push(layer)
        this.layerPenanaman = L.layerGroup(penanaman_geojsons)

        //-------------- LOAD GEOJSON KRITIS -------------------------------
        geojson = await this.getGeoJsonFile('kritis.geojson')
        layer = L.geoJSON(geojson,
          {
            onEachFeature: this.kritisLabel,
            style: function(){
              return {
                fillColor: "#fb6775",
                fillOpacity: 0.2,
                opacity: 1,
                color: "#fb6775",
                weight: 2,
              }
            },
          })
        kritis_geojsons.push(layer)
        this.layerKritis = L.layerGroup(kritis_geojsons)
        

        //-------------- LOAD GEOJSON KEPOMPONG -------------------------------
        geojson = await this.getGeoJsonFile('kepompong.geojson')
        layer = L.geoJSON(geojson,
          {
            onEachFeature: this.kepompongLabel,
            style: function(){
              return {
                fillColor: "blue",
                fillOpacity: 0.1,
                opacity: 1,
                color: "blue",
                weight: 2,
              }
            },
          })
        kepompong_geojsons.push(layer)
        this.layerKepompong = L.layerGroup(kepompong_geojsons)
        
        this.layerMarkPropinsi = L.layerGroup(markers)
        this.layerPolygonKabupaten = L.layerGroup(kab_geojsons)
        this.layerMarkKabupaten = L.layerGroup(this.markKabupaten)
        this.layerPolygonDesaBambu = L.layerGroup(geojsons)
        this.layerMarkDesaBambu = L.layerGroup(this.markDesaBambu)

        //------------ARRAY TREE PENANAMAN DESA----------------------------
        response = await apiAccess.read('desabambu/gettreedesapenanaman')
        this.desa_penanaman = response.data
        desa = []
        kec = []
        kab = []
        kec_name = ''
        kab_name = ''
        prop_name = ''
        for(var i=0; i< this.desa_penanaman.length; i++){
          des_id = this.desa_penanaman[i].des_id
          if (kec_name != this.desa_penanaman[i].kec_name) {
            if (kec_name != '') {
              kec.push({ name: 'Kec. ' + kec_name, propinsi: false, kabupaten: false, kab_id: 0, kecamatan: true, desa: false, des_id: this.desa_penanaman[i].des_id, children: desa })
              desa = []
            }
            kec_name = this.desa_penanaman[i].kec_name
          }
          if (kab_name != this.desa_penanaman[i].kab_name) {
            if (kab_name != '') {
              kab.push({ name: kab_name, propinsi: false, kabupaten: true, kab_id: kab_id, kecamatan: false, desa: false, des_id: this.desa_penanaman[i].des_id, children: kec })
              kec = []
            }
            kab_id = this.desa_penanaman[i].kab_id
            kab_name = this.desa_penanaman[i].kab_name
          }
          if (prop_name != this.desa_penanaman[i].nama_pulau) {
            if (prop_name != '') {
              this.treeDataPenanaman.push({ name: prop_name, propinsi: true, kabupaten: false, kab_id: 0, kecamatan: false, desa: false, lat: lat, lng: lng, des_id: this.desa_penanaman[i].des_id, children: kab })
              kab = []
            }
            prop_name = this.desa_penanaman[i].nama_pulau
          }
          desa.push({ name: this.desa_penanaman[i].des_name, propinsi: false, kabupaten: false, kab_id: 0, kecamatan: false, desa: true, des_id: this.desa_penanaman[i].des_id })
        }
        kec.push({name: 'Kec. ' + kec_name, propinsi: false, kabupaten: false, kab_id: '0', kecamatan: true, desa: false, des_id: 0, children: desa})
        kab.push({name: kab_name, propinsi: false, kabupaten: true, kab_id: kab_id, kecamatan: false, desa: false, des_id: 0, children: kec})
        this.treeDataPenanaman.push({name: prop_name, propinsi: true, kabupaten: false, kab_id: '0', kecamatan: false, desa: false, lat: lat, lng: lng, des_id: des_id, children: kab})
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
            this.updateDesaLatLng(f.properties.id, center.lng, center.lat)

        }
        l.on('click', L.bind(this.polygonDesaBambuClick, null, f));
      
    },
    kabuptenLabel(f, l) {
        if (f) {
            l.bindTooltip(f.properties.name,{
                permanent: false,
                direction:"left",
            });
        }
        if (f.geometry) {
            const poly = L.polygon(l.feature.geometry.coordinates)
            const center = poly.getBounds().getCenter()          
            let marker = new L.Marker([center.lng, center.lat], {title:f.properties.name, icon: this.icon});
            marker.bindTooltip(f.properties.name, {
                permanent: false, 
                direction: 'left'
            });
            
            //marker.on('click', L.bind(this.markKabupatenClick, null, f, center) );
            //this.markKabupaten.push(marker)
            this.updateKabupatenLatLng(f.properties.kab_id, center.lng, center.lat)

        }
        //l.on('click', L.bind(this.polygonDesaClick, null, f));
      
    },
    pembibitanLabel(f, l) {
        /*if (f) {
            l.bindTooltip(f.properties.Name,{
                permanent: true,
                direction:"left",
            });
        }*/
        if (f.geometry) {
            let marker = new L.Marker([f.geometry.coordinates[1], f.geometry.coordinates[0]], {title:f.properties.Name, icon: this.icon});
            marker.bindTooltip(f.properties.Name, {
                permanent: false, 
                direction: 'left'
            });
            
            //marker.on('click', L.bind(this.markDesaBambuClick, null, f, center) );
            this.markPembibitan.push(marker)
        }
        //l.on('click', L.bind(this.polygonDesaBambuClick, null, f));
    },
    kritisLabel(f, l) {
      if (f.geometry) {
        const poly = L.polygon(l.feature.geometry.coordinates)
        //const area = L.GeometryUtil.geodesicArea(poly.getLatLngs());
        //console.log('area is: '+L.GeometryUtil.geodesicArea(poly.getLatLngs()));
      }
    },
    kepompongLabel(f, l) {
      if (f) {
          l.bindTooltip(f.properties.NAME,{
              permanent: false,
              direction:"left",
          });
      }
      if (f.geometry) {
        L.polygon(l.feature.geometry.coordinates)
      }
      l.on('click', L.bind(this.polygonKepompongClick, null, f));
    
    },
    penanamanLabel(f, l) {
        if (f) {
            l.bindTooltip(f.properties.name,{
                permanent: false,
                direction:"left",
            });
        }
        if (f.geometry) {
            L.polygon(l.feature.geometry.coordinates)
        }
        l.on('click', L.bind(this.polygonPenanamanClick, null, f));
      
    },
    markDesaBambuClick(f, l, center) {
      const desa = this.searchDesa(f.properties['id'])
      if (desa) {
        this.menuDesaPembibitanClick(desa.des_id, 13)
      }
    },
    markKabupatenClick(f, l, center) {
      const kabupaten = this.searchKabupaten(f.properties['kab_id'])
      if (kabupaten) {
        this.menuKabPenanamanClick(kabupaten, 10)
      }
    },
    polygonDesaBambuClick(f, l,) {
      const desa = this.searchDesa(f.properties['id'])
      if (desa) {
        this.menuDesaPembibitanClick(desa.des_id, 13)
      }
    },
    polygonKabupatenClick(f, l,) {
      const kabupaten = this.searchKabupaten(f.properties['kab_id'])
      if (kabupaten) {
        this.menuKabPenanamanClick(kabupaten, 10)
      }
    },
    polygonKepompongClick(f, l,) {
      const desa = this.searchDesa(f.properties['id'])
      if (desa) {
        this.menuDesaPembibitanClick(desa.des_id, null)
      }
    },
    polygonPenanamanClick(f, l,) {
      const desa = this.searchDesa(f.properties['id'])
      if (desa) {
        this.menuDesaPenanamanClick(desa.des_id, null)
      }
    },
    hideSummaryClick() {
      store.commit('hidesummary')
    },
    formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      return new Date(date).toLocaleDateString('en', options)
    },
    /*selectYear: async function (des_id) {
      if (this.yearSelect.length > 0) {
        this.yearPembibitan = true
        if (this.desa_id) {
          this.data_year_pembibitan = await this.getYearData('desabambu/getpembibitanyear', this.desa_id, this.yearSelect)
          console.log(this.data_year_pembibitan)
        }
      } else {
        this.yearPembibitan = false
      }
    },
    removeTag(id) {
      let data = []
      for(var i=0; i< this.yearSelect.length; i++){
        if (this.yearSelect[i].tahun != id.tahun) {
          data.push({tahun: this.yearSelect[i].tahun})
        }
      }
      this.yearSelect = data
      this.selectYear()
    },
    addTag (newTag) {
      const tag = {
        tahun: newTag
      }
      this.yearList.push(tag)
      this.yearSelect.push(tag)
    }*/
  
  }
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>


