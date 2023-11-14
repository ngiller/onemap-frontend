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
        <a href="https://bambuvillage.org"
          ><img src="../../public/img/logo-white.png"
        /></a>
      </div>
      <div class="search">
        <span class="p-input-icon-right">
          <input
            type="search"
            class="p-inputtext-sm input-search"
            placeholder="Search Desa Bambu"
            v-model.trim="searchText"
          />
          <i class="icon-magnifier" style="color: #ccc"></i>
        </span>
      </div>

      <div class="scroll-panel">
        <myScroll>
          <k-tabs class="left-menu">
            <k-tab name="LOKASI KERJA" :selected="true">
              <div
                class="scroll-content"
                v-for="(item, i) in treeDesaBambuFilter"
                :key="i"
              >
                <tree-item
                  :item="item"
                  @propinsi-click="menuPropPembibitanClick"
                ></tree-item>
              </div>
            </k-tab>

            <k-tab name="JENIS PEKERJAAN">
              <select
                name=""
                id=""
                v-model="jenis_pekerjaan_selected"
                class="jenis-pekerjaan"
              >
                <option v-for="(pekerjaan, i) in jenis_pekerjaan" :key="i">
                  {{ pekerjaan }}
                </option>
              </select>
              <div
                class="scroll-content"
                v-for="(item, i) in treeDataPekerjaan"
                :key="i"
              >
                <tree-item
                  :item="item"
                  @propinsi-click="menuPropPembibitanClick"
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
      <div
        class="page-content"
        :class="{ 'topbar-sidebar-enable': sidebar_show }"
      >
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

              <slider ref="slider" :options="optionSlide" class="img-desc">
                <slideritem v-for="(item, index) in image_desa" :key="index">
                  <img :src="item" />
                </slideritem>
                <!-- Customizable loading -->
                <div slot="loading">loading...</div>
              </slider>

              <div class="col-desc-close">
                <i
                  class="icon-close"
                  v-on:click="colDescShow = !colDescShow"
                  style="margin-top: 3px; font-size: 22px; cursor: pointer"
                ></i>
              </div>
              <div class="judul">{{ nama_desa }}</div>
              <div class="panel-right-content">
                <div class="col-desc-text" v-html="desa_desc"></div>
                <div class="hr-line"></div>

                <!-------- INDICATOR DESA VIEW -------------------------------------------->
                <indicator-item ref="indicatoritems" :id_desa="desa_id" />
              </div>
            </myScroll>
          </div>

          <div class="inner-content">
            <div id="mapContainer">
              <div class="map-layer" v-on:click="viewLayer = !viewLayer">
                <img
                  id="viewLayerImg"
                  :src="imageLayerSelected"
                  class="layer-icon"
                />
              </div>
            </div>
          </div>

          <!---------------S U M M A R Y -------------------------------------------------------------->
          <summary-item />

          <div class="layer-panel" v-if="viewLayer">
            <div style="height: 60px">
              <figure style="float: left; margin: 0; width: 80px">
                <label class="label-map">
                  <input
                    type="radio"
                    v-model="layerSelected"
                    value="0"
                    @change="googleLayerClick"
                    checked
                  />
                  <img
                    src="../../public/img/street-layer.jpg"
                    class="layer-img"
                  />
                  <figcaption class="item-label">Default</figcaption>
                </label>
              </figure>

              <figure style="float: left; margin: 0; width: 80px">
                <label class="label-map">
                  <input
                    type="radio"
                    v-model="layerSelected"
                    value="1"
                    @change="googleLayerClick"
                  />
                  <img
                    src="../../public/img/satellite-layer.jpg"
                    class="layer-img"
                  />
                  <figcaption class="item-label">Satelite</figcaption>
                </label>
              </figure>
            </div>
            <div class="additional-layer">
              <ul class="ks-cboxtags">
                <li>
                  <input
                    type="checkbox"
                    id="pembibitan"
                    value="pembibitan"
                    v-model="checkedArea"
                    @change="aditionalLayerClick"
                  /><label for="pembibitan">Pembibitan</label>
                </li>
                <li>
                  <input
                    type="checkbox"
                    id="kepompong"
                    value="kepompong"
                    v-model="checkedArea"
                    @change="aditionalLayerClick"
                  /><label for="kepompong">Kepompong</label>
                </li>
                <li>
                  <input
                    type="checkbox"
                    id="penanaman"
                    value="penanaman"
                    v-model="checkedArea"
                    @change="aditionalLayerClick"
                  /><label for="penanaman">Penanaman</label>
                </li>
                <li><hr /></li>
                <li>
                  <input
                    type="checkbox"
                    id="critical"
                    value="critical"
                    v-model="checkedArea"
                    @change="aditionalLayerClick"
                  /><label for="critical">Lahan Kritis</label>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="customModal" v-if="showPembibitPopup">
      <div class="customModalTitle">
        <button class="close" @click.prevent="showPembibitPopup = !showPembibitPopup">
          &times;
        </button>
        PEMBIBIT
      </div>
      <div class="customModalBody">
        
        <h3>{{modal_caption}}</h3>
        <div class="row-detail-pembibit">
            <div class="column-detail-pembibit">  
              - Bambu Aur
            </div>
            <div class="column-nilai-pembibit">  
              : 500
            </div>
            <div class="column-detail-pembibit">
              - Bambu Pering
            </div>
            <div class="column-nilai-pembibit">  
              : 500
            </div>
            <div class="column-detail-pembibit">
              - Bambu test
            </div>
            <div class="column-nilai-pembibit">  
              : 500
            </div>   
        </div>
        <hr />
          Total : 1.050 
      </div>
    </div>
  </div>
</template>

<script>
import store from "@/store";
import apiAccess from "@/utils/apiAccess";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Icon } from "leaflet";
import Topbar from "@/components/TopBar.vue";
import CONFIG from "@/utils/config.js";
import {
  FulfillingBouncingCircleSpinner,
  SelfBuildingSquareSpinner,
} from "epic-spinners";
import treeView from "@/components/TreeView.vue";
import indicator from "@/components/IndicatorView.vue";
import summary from "@/components/SummaryView.vue";
import { slider, slideritem } from "vue-concise-slider";

delete Icon.Default.prototype._getIconUrl;

Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

export default {
  name: "HomeView",
  data() {
    return {
      icon: L.icon({
        iconUrl: "img/marker-icon.png",
        iconSize: [15, 25],
        iconAnchor: [10, 22],
        popupAnchor: [-3, -76],
      }),
      iconPembibitan: L.icon({
        iconUrl: "img/marker-green.png",
        iconSize: [15, 25],
        iconAnchor: [10, 22],
        popupAnchor: [-3, -76],
      }),
      desa_bambu: [],
      desa_penanaman: [],
      layerMarkPropinsi: null,
      layerPolygonDesaBambu: null,
      layerPolygonKabupaten: null,
      markDesaBambu: [],
      markKabupaten: [],
      layerMarkDesaBambu: null,
      prevZoom: null,
      isLoading: true,
      isDesaLoading: false,
      colDescShow: false,
      desa_id: null,
      nama_desa: null,
      desa_desc: null,
      desa_image: [],
      image_desa: [],
      markPembibitan: [],
      layerPembibitan: null,
      layerKepompong: null,
      layerPenanaman: null,
      layerKritis: null,
      loader: null,
      googleStreets: null,
      googleSatelite: null,
      viewLayer: false,
      layerSelected: 0,
      imageLayerSelected: "../img/street-layer.jpg",
      checkedArea: ["pembibitan", "kepompong", "penanaman"],
      treeDataPembibitan: [],
      searchText: null,
      optionSlide: {
        currentPage: 0,
        thresholdDistance: 500,
        thresholdTime: 100,
        loop: true,
        autoplay: 2000,
        direction: "horizontal",
        loopedSlides: 1,
        slidesToScroll: 1,
        timingFunction: "ease",
        speed: 300,
      },
      jenis_pekerjaan: ["Pembibitan", "Kepompong", "Penanaman"],
      jenis_pekerjaan_selected: "Pembibitan",
      desaJson: [],
      layerDesaFocused: null,
      showPembibitPopup: false,
      modal_caption: null,
    };
  },
  filters: {
    numberFormat(value) {
      let num = parseInt(value);
      return `${num.toLocaleString("id-ID")}`;
    },
    floatFormat(value) {
      let num = parseFloat(value);
      return `${num.toLocaleString("id-ID")}`;
    },
  },
  components: {
    Topbar,
    FulfillingBouncingCircleSpinner,
    SelfBuildingSquareSpinner,
    "tree-item": treeView,
    "indicator-item": indicator,
    "summary-item": summary,
    slider,
    slideritem,
  },
  created: async function () {},
  computed: {
    sidebar_show() {
      return store.state.leftbar_show;
    },
    summary_show() {
      return store.state.summary_show;
    },
    treeDesaBambuFilter() {
      let searchString;

      if (this.searchText == "" || this.searchText == null) {
        return this.treeDataPembibitan;
      } else {
        searchString = this.searchText.toLowerCase();
        let data_desa = [];
        let search_array = this.treeDataPembibitan;

        for (const key in search_array) {
          data_desa.push(search_array[key]);
          search_kecamatan(search_array[key].children);
        }

        data_desa = data_desa.filter((item) => {
          if (item.name.toLowerCase().indexOf(searchString) !== -1) {
            return item;
          }
        });

        function search_kecamatan(sub_data) {
          for (const key in sub_data) {
            data_desa.push(sub_data[key]);
            search_kecamatan(sub_data[key].children);
          }

          return data_desa;
        }

        return data_desa;
      }
    },
    treeDataPekerjaan() {
      let searchString;
      let search_array = this.treeDataPembibitan;
      let lok_desa = [];

      for (const key in search_array) {
        search_pekerjaan(
          search_array[key].children,
          this.jenis_pekerjaan_selected
        );
      }

      if (this.searchText != "" && this.searchText != null) {
        searchString = this.searchText.toLowerCase();
        lok_desa = lok_desa.filter((item) => {
          if (item.name.toLowerCase().indexOf(searchString) !== -1) {
            return item;
          }
        });
      }

      function search_pekerjaan(sub_data, jenis_pek) {
        for (const key in sub_data) {
          if (sub_data[key].kecamatan) {
            let child = sub_data[key].children;
            for (const item in child) {
              if (jenis_pek == "Pembibitan" && child[item].pembibitan == 1) {
                lok_desa.push(child[item]);
              } else {
                if (jenis_pek == "Kepompong" && child[item].kepompong == 1) {
                  lok_desa.push(child[item]);
                } else {
                  if (jenis_pek == "Penanaman" && child[item].penanaman == 1) {
                    lok_desa.push(child[item]);
                  }
                }
              }
            }
          } else {
            search_pekerjaan(sub_data[key].children, jenis_pek);
          }
        }
      }
      return lok_desa;
    },
  },
  async mounted() {
    await this.getData();
    this.createMap();
  },
  methods: {
    createMap() {
      this.map = L.map("mapContainer").setView([-1.2109175, 119.0918159], 5);
      this.googleStreets = L.tileLayer(
        "https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}",
        {
          subdomains: ["mt0", "mt1", "mt2", "mt3"],
          maxZoom: 22,
          maxNativeZoom: 19,
        }
      ).addTo(this.map);
      this.layerMarkPropinsi.addTo(this.map);
      this.isLoading = false;

      this.prevZoom = this.map.getZoom();
      this.map.on("zoomend", this.onMapZoom);
    },
    onMapZoom: async function () {
      let currZoom = this.map.getZoom();
      if (currZoom >= 16) {
        if (this.map.hasLayer(this.layerPolygonDesaBambu)) {
          this.map.removeLayer(this.layerPolygonDesaBambu);
          this.map.removeLayer(this.layerMarkDesaBambu);
        }
      } else {
        if (currZoom >= 13 && currZoom < 16) {
          if (this.layerMarkDesaBambu) {
            if (this.map.hasLayer(this.layerMarkDesaBambu)) {
              this.map.removeLayer(this.layerMarkDesaBambu);
            }
          }

          if (this.layerPolygonDesaBambu) {
            if (!this.map.hasLayer(this.layerPolygonDesaBambu)) {
              this.layerPolygonDesaBambu.addTo(this.map);
            }
          } else {
            this.getDesaBambu(5);
          }

          if (this.layerPembibitan) {
            if (!this.map.hasLayer(this.layerPembibitan)) {
              this.layerPembibitan.addTo(this.map);
            }
          } else {
            this.getDesaBambu(1);
          }

          if (this.layerPenanaman) {
            if (!this.map.hasLayer(this.layerPenanaman)) {
              this.layerPenanaman.addTo(this.map);
            }
          } else {
            this.getDesaBambu(2);
          }

          if (this.layerKepompong) {
            if (!this.map.hasLayer(this.layerKepompong)) {
              this.layerKepompong.addTo(this.map);
            }
          } else {
            this.getDesaBambu(3);
          }

          if (this.map.hasLayer(this.layerPolygonKabupaten)) {
            this.map.removeLayer(this.layerPolygonKabupaten);
          }
        } else {
          if (currZoom >= 8 && currZoom < 13) {
            if (this.layerDesaFocused) {
              if (this.map.hasLayer(this.layerDesaFocused)) {
                this.map.removeLayer(this.layerDesaFocused);
              }
            }
            if (this.layerMarkPropinsi) {
              if (this.map.hasLayer(this.layerMarkPropinsi)) {
                this.map.removeLayer(this.layerMarkPropinsi);
              }
            }

            if (this.layerPolygonDesaBambu) {
              if (this.map.hasLayer(this.layerPolygonDesaBambu)) {
                this.map.removeLayer(this.layerPolygonDesaBambu);
              }
            }

            if (this.layerMarkDesaBambu) {
              if (!this.map.hasLayer(this.layerMarkDesaBambu)) {
                this.layerMarkDesaBambu.addTo(this.map);
              }
            } else {
              await this.getDesaBambu(5);
            }

            if (this.layerPembibitan) {
              if (this.map.hasLayer(this.layerPembibitan)) {
                this.map.removeLayer(this.layerPembibitan);
              }
            }

            if (this.layerPenanaman) {
              if (this.map.hasLayer(this.layerPenanaman)) {
                this.map.removeLayer(this.layerPenanaman);
              }
            }

            if (this.layerKepompong) {
              if (this.map.hasLayer(this.layerKepompong)) {
                this.map.removeLayer(this.layerKepompong);
              }
            }

            if (this.layerPolygonKabupaten) {
              if (!this.map.hasLayer(this.layerPolygonKabupaten)) {
                this.layerPolygonKabupaten.addTo(this.map);
              }
            }
          } else {
            if (this.layerMarkPropinsi) {
              if (!this.map.hasLayer(this.layerMarkPropinsi)) {
                this.layerMarkPropinsi.addTo(this.map);
              }
            }
            if (this.layerPolygonDesaBambu) {
              if (this.map.hasLayer(this.layerPolygonDesaBambu)) {
                this.map.removeLayer(this.layerPolygonDesaBambu);
              }
            }
            if (this.layerMarkDesaBambu) {
              if (this.map.hasLayer(this.layerMarkDesaBambu)) {
                this.map.removeLayer(this.layerMarkDesaBambu);
              }
            }
            if (this.layerPembibitan) {
              if (this.map.hasLayer(this.layerPembibitan)) {
                this.map.removeLayer(this.layerPembibitan);
              }
            }
            if (this.layerPolygonKabupaten) {
              if (this.map.hasLayer(this.layerPolygonKabupaten)) {
                this.map.removeLayer(this.layerPolygonKabupaten);
              }
            }
          }
        }
      }
      this.prevZoom = currZoom;
    },
    markPropinsiClick(l) {
      this.hideSummaryClick();
      this.map.setZoomAround([l.latlng.lat, l.latlng.lng], 8);
    },
    menuPropPembibitanClick(item) {
      if (store.state.ismobile) {
        store.commit("hideleftbar");
      }
      if (store.state.summary_show) {
        store.commit("hidesummary");
      }

      if (item.propinsi) {
        this.colDescShow = false;
        this.map.invalidateSize(true);

        if (item.lat && item.lng) {
          this.map.setView([item.lat, item.lng], 8);
          this.map.invalidateSize(true);
        }
      }
      if (item.kabupaten) {
        this.colDescShow = true;
        const kabupaten = this.searchKabupaten(item.kab_id);
        this.menuKabPembibitanClick(kabupaten, 10);
      }
      if (item.desa) {
        this.colDescShow = true;
        this.menuDesaPembibitanClick(item.des_id, 13);
      }
    },
    menuPropPenanamanClick(item) {
      if (store.state.ismobile) {
        store.commit("hideleftbar");
      }
      if (store.state.summary_show) {
        store.commit("hidesummary");
      }

      if (item.propinsi) {
        if (item.lat != "" && item.lng != "") {
          this.map.setView([item.lat, item.lng], 8);
        }
      }
      if (item.kabupaten) {
        const kabupaten = this.searchKabupaten(item.kab_id);
        this.menuKabPenanamanClick(kabupaten, 10);
      }
      if (item.desa) {
        this.menuDesaPenanamanClick(item, 13);
      }
    },
    menuKabPembibitanClick: async function (item, zoom) {
      if (store.state.ismobile) {
        store.commit("hideleftbar");
      }
      if (store.state.summary_show) {
        store.commit("hidesummary");
      }
      this.colDescShow = true;
      this.isDesaLoading = true;
      if (item) {
        if (item.kab_lat && item.kab_lng) {
          this.map.invalidateSize(true);
          this.map.setView([item.kab_lat, item.kab_lng], zoom);
        }

        this.areaSelect = "kabupaten";
        this.areaType = "bibit";
        this.desa_id = item.kab_id;
        this.nama_desa = item.kab_name;
        this.desa_desc = item.kab_desc;
        this.desa_image = await this.getDataAPI(
          "kabupaten/getimage",
          item.kab_id
        );
        if (this.desa_image.length > 0) {
          for (let i = 0; i < this.desa_image.length; i++) {
            this.image_desa[i] =
              CONFIG.KABUPATEN_IMAGE + this.desa_image[i]["file_name"];
          }
        } else {
          this.image_desa[0] = CONFIG.IMAGE + "no-image.jpg";
        }

        this.$refs.indicatoritems.put_id(item.kab_id, item.kab_name);
      }
      this.isDesaLoading = false;
    },
    menuKabPenanamanClick: async function (item, zoom) {
      if (store.state.ismobile) {
        store.commit("hideleftbar");
      }
      if (store.state.summary_show) {
        store.commit("hidesummary");
      }
      this.colDescShow = true;
      this.isDesaLoading = true;
      if (item) {
        if (item.kab_lat && item.kab_lng) {
          this.map.invalidateSize(true);
          this.map.setView([item.kab_lat, item.kab_lng], zoom);
        }

        this.areaSelect = "kabupaten";
        this.areaType = "tanam";
        this.desa_id = item.kab_id;
        this.nama_desa = item.kab_name;
        this.desa_desc = item.kab_desc;
        this.desa_image = await this.getDataAPI(
          "kabupaten/getimage",
          item.kab_id
        );
        if (this.desa_image.length > 0) {
          for (let i = 0; i < this.desa_image.length; i++) {
            this.image_desa[i] =
              CONFIG.KABUPATEN_IMAGE + this.desa_image[i]["file_name"];
          }
        } else {
          this.image_desa[0] = CONFIG.IMAGE + "no-image.jpg";
        }
      }
      this.isDesaLoading = false;
    },
    menuDesaPembibitanClick: async function (id, zoom) {
      if (store.state.ismobile) {
        store.commit("hideleftbar");
      }
      if (store.state.summary_show) {
        store.commit("hidesummary");
      }
      this.colDescShow = true;
      this.isDesaLoading = true;

      let data = this.searchDesa(id);
      if (data) {
        if (zoom) {
          if (data.lat && data.lng) {
            if (this.layerPolygonDesaBambu) {
              if (!this.map.hasLayer(this.layerPolygonDesaBambu)) {
                this.layerPolygonDesaBambu.addTo(this.map);
              }
            } else {
              await this.getDesaBambu(5);
            }

            this.map.invalidateSize(true);
            this.map.setView([data.lat, data.lng], zoom);
          }
        }

        this.desa_id = data.des_id;
        this.nama_desa = data.des_name;
        this.desa_desc = data.descriptions;
        this.image_desa = [];
        this.desa_image = await this.getDataAPI(
          "desabambu/getimagedesa",
          data.des_id
        );
        if (this.desa_image.length > 0) {
          for (let i = 0; i < this.desa_image.length; i++) {
            this.image_desa[i] =
              CONFIG.DESA_IMAGE + this.desa_image[i]["file_name"];
          }
        } else {
          this.image_desa[0] = CONFIG.IMAGE + "no-image.jpg";
        }

        if (this.layerDesaFocused) {
          if (this.map.hasLayer(this.layerDesaFocused)) {
            this.map.removeLayer(this.layerDesaFocused);
          }
        }
        this.highLightDesa(id);
        this.$refs.indicatoritems.put_id(data.des_id, data.des_name);
      }
      this.isDesaLoading = false;
    },
    menuDesaPenanamanClick: async function (item, zoom) {
      if (store.state.ismobile) {
        store.commit("hideleftbar");
      }
      if (store.state.summary_show) {
        store.commit("hidesummary");
      }
      this.colDescShow = true;
      this.isDesaLoading = true;

      let data = this.searchDesaPenanaman(item.des_id);
      if (data) {
        if (data.lat && data.lng) {
          this.map.invalidateSize(true);
          this.map.setView([data.lat, data.lng], zoom);
        }

        this.areaSelect = "desa";
        this.areaType = "tanam";
        this.desa_id = data.des_id;
        this.nama_desa = data.des_name;
        this.desa_desc = data.descriptions;
        this.desa_image = await this.getDataAPI(
          "desabambu/getimagedesa",
          data.des_id
        );
        if (this.desa_image.length > 0) {
          for (let i = 0; i < this.desa_image.length; i++) {
            this.image_desa[i] =
              CONFIG.DESA_IMAGE + this.desa_image[i]["file_name"];
          }
        } else {
          this.image_desa[0] = CONFIG.IMAGE + "no-image.jpg";
        }
      }
      this.isDesaLoading = false;
    },
    googleLayerClick() {
      if (this.layerSelected == 1) {
        this.map.removeLayer(this.googleStreets);
        this.googleSatelite = L.tileLayer(
          "https://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}",
          {
            subdomains: ["mt0", "mt1", "mt2", "mt3"],
            maxZoom: 22,
            maxNativeZoom: 19,
          }
        ).addTo(this.map);
        this.imageLayerSelected = "../img/satellite-layer.jpg";
        this.viewLayer = !this.viewLayer;
      } else {
        this.map.removeLayer(this.googleSatelite);
        this.googleStreets = L.tileLayer(
          "https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}",
          {
            subdomains: ["mt0", "mt1", "mt2", "mt3"],
            maxZoom: 22,
            maxNativeZoom: 19,
          }
        ).addTo(this.map);
        this.imageLayerSelected = "../img/street-layer.jpg";
        this.viewLayer = !this.viewLayer;
      }
    },
    findLayer: function (item) {
      for (let i = 0; i < this.checkedArea.length; i++) {
        if (this.checkedArea[i] == item) {
          return true;
        }
      }
      return false;
    },
    aditionalLayerClick() {
      if (this.findLayer("critical")) {
        if (this.layerKritis) {
          this.layerKritis.addTo(this.map);
        } else {
          this.getDesaBambu(7);
          this.layerKritis.addTo(this.map);
        }
      } else {
        if (this.layerKritis) {
          this.map.removeLayer(this.layerKritis);
        }
      }
      if (this.findLayer("penanaman")) {
        if (this.layerPenanaman) {
          this.layerPenanaman.addTo(this.map);
        }
      } else {
        if (this.layerPenanaman) {
          this.map.removeLayer(this.layerPenanaman);
        }
      }
      if (this.findLayer("kepompong")) {
        if (this.layerKepompong) {
          this.layerKepompong.addTo(this.map);
        }
      } else {
        if (this.layerKepompong) {
          this.map.removeLayer(this.layerKepompong);
        }
      }
      if (this.findLayer("pembibitan")) {
        if (this.layerPembibitan) {
          this.layerPembibitan.addTo(this.map);
        }
      } else {
        if (this.layerPembibitan) {
          this.map.removeLayer(this.layerPembibitan);
        }
      }
    },

    getDataAPI: async function (link, id) {
      let response = await apiAccess.read(link, { id: id });
      return response.data;
    },

    zoomDesaPolygon(id, koordinat, zoom) {
      if (store.state.ismobile) {
        store.commit("hideleftbar");
      }
      if (store.state.summary_show) {
        store.commit("hidesummary");
      }
      let data = this.searchDesa(id);
      this.nama_desa = data.des_name;
      this.colDescShow = true;
      this.map.setView([koordinat.lat, koordinat.lng], zoom);
    },
    getKabupaten: function (pid) {
      var result = [];
      let kab_id = null;
      for (var i = 0, l = this.desa_bambu.length; i < l; i++) {
        if (this.desa_bambu[i].propinsi_id == pid) {
          if (kab_id != this.desa_bambu[i].kab_id) {
            kab_id = this.desa_bambu[i].kab_id;
            result.push(this.desa_bambu[i]);
          }
        }
      }
      return result;
    },
    getKecamatan: function (pid) {
      var result = [];
      let kec_id = null;
      for (var i = 0, l = this.desa_bambu.length; i < l; i++) {
        if (this.desa_bambu[i].propinsi_id == pid) {
          if (kec_id != this.desa_bambu[i].kec_id) {
            kec_id = this.desa_bambu[i].kec_id;
            result.push(this.desa_bambu[i]);
          }
        }
      }
      return result;
    },
    getDesa: function (pid, kecid) {
      var result = [];
      let des_id = null;
      for (var i = 0, l = this.desa_bambu.length; i < l; i++) {
        if (
          this.desa_bambu[i].propinsi_id == pid &&
          this.desa_bambu[i].kec_id == kecid
        ) {
          if (des_id != this.desa_bambu[i].des_id) {
            des_id = this.desa_bambu[i].des_id;
            result.push(this.desa_bambu[i]);
          }
        }
      }
      return result;
    },
    searchDesa(desa_id) {
      for (var i = 0; i < this.desa_bambu.length; i++) {
        var data = this.desa_bambu[i];
        if (data.des_id == desa_id) {
          return data;
        }
      }
    },
    searchKabupaten(kab_id) {
      for (var i = 0; i < this.desa_bambu.length; i++) {
        var data = this.desa_bambu[i];
        if (data.kab_id == kab_id) {
          return data;
        }
      }
    },
    searchDesaPenanaman(des_id) {
      for (var i = 0; i < this.desa_penanaman.length; i++) {
        var data = this.desa_penanaman[i];
        if (data.des_id == des_id) {
          return data;
        }
      }
    },
    updateDesaLatLng(desa_id, lat, lng) {
      for (var i = 0; i < this.desa_bambu.length; i++) {
        var data = this.desa_bambu[i];
        if (data.des_id == desa_id) {
          this.desa_bambu[i]["lat"] = lat;
          this.desa_bambu[i]["lng"] = lng;
        }
      }
    },
    updateKabupatenLatLng(kab_id, lat, lng) {
      for (var i = 0; i < this.desa_bambu.length; i++) {
        var data = this.desa_bambu[i];
        if (data.kab_id == kab_id) {
          this.desa_bambu[i]["kab_lat"] = lat;
          this.desa_bambu[i]["kab_lng"] = lng;
        }
      }
    },
    getGeoJsonFile: async function (geoJSonName) {
      const response = await fetch("/storages/geojson/" + geoJSonName);
      let data = await response.json();
      return data;
    },
    getDesaBambu: async function (file_type) {
      let geojson = [];
      let geojsons = [];
      let layers = [];
      let kepompong_geojsons = [];
      let penanaman_geojsons = [];
      let kritis_geojsons = [];

      let response = await apiAccess.read("desabambu/getGeoJsonFile", {
        type: file_type,
      });
      const data = response.data;

      for (var i = 0; i < data.length; i++) {
        if (data[i].file_name) {
          geojson = await this.getGeoJsonFile(data[i].file_name);

          //--------- MARK & POLYGON ADMINISTRATIF DESA BAMBU----------------------------
          if (file_type == 5) {
            this.desaJson.push(geojson);
            layers = L.geoJSON(geojson, {
              onEachFeature: this.desaLabel.bind(this),
              style: function () {
                return {
                  fillColor: "green",
                  fillOpacity: 0.01,
                  opacity: 1,
                  color: "#76d48c",
                  weight: 2,
                };
              },
            });

            geojsons.push(layers);
          } else {
            //------------ MARK PEMBIBITAN ----------------------------------
            if (file_type == 1) {
              L.geoJSON(geojson, {
                onEachFeature: this.pembibitanLabel,
                style: function () {
                  return {
                    color: "Blue",
                    weight: 1,
                    opacity: 0.5,
                  };
                },
              });
            } else {
              //------------ MARK KEPOMPONG ----------------------------------
              if (file_type == 3) {
                layers = L.geoJSON(geojson, {
                  onEachFeature: this.kepompongLabel,
                  style: function () {
                    return {
                      fillColor: "blue",
                      fillOpacity: 0.1,
                      opacity: 1,
                      color: "blue",
                      weight: 2,
                    };
                  },
                });

                kepompong_geojsons.push(layers);
              } else {
                //------------ POLYGON PENANAMAN ----------------------------------
                if (file_type == 2) {
                  layers = L.geoJSON(geojson, {
                    onEachFeature: this.penanamanLabel,
                    style: function () {
                      return {
                        fillOpacity: 0,
                        opacity: 1,
                        color: "#58c3fa",
                        weight: 2,
                      };
                    },
                  });

                  penanaman_geojsons.push(layers);
                } else {
                  //------------ LAHAN KRITIS ----------------------------------
                  if (file_type == 7) {
                    layers = L.geoJSON(geojson, {
                      onEachFeature: this.kritisLabel,
                      style: function () {
                        return {
                          fillColor: "#fb6775",
                          fillOpacity: 0.2,
                          opacity: 1,
                          color: "#fb6775",
                          weight: 2,
                        };
                      },
                    });

                    kritis_geojsons.push(layers);
                  }
                }
              }
            }
          }
        }
      }

      if (file_type == 5) {
        this.layerPolygonDesaBambu = L.layerGroup(geojsons);
        this.layerMarkDesaBambu = L.layerGroup(this.markDesaBambu);
        this.layerMarkDesaBambu.addTo(this.map);
      } else {
        if (file_type == 1) {
          this.layerPembibitan = L.layerGroup(this.markPembibitan);
          this.layerPembibitan.addTo(this.map);
        } else {
          if (file_type == 3) {
            this.layerKepompong = L.layerGroup(kepompong_geojsons);
            this.layerKepompong.addTo(this.map);
          } else {
            if (file_type == 2) {
              this.layerPenanaman = L.layerGroup(penanaman_geojsons);
              this.layerPenanaman.addTo(this.map);
            } else {
              if (file_type == 7) {
                this.layerKritis = L.layerGroup(kritis_geojsons);
                this.layerKritis.addTo(this.map);
              }
            }
          }
        }
      }
    },
    highLightDesa: async function (desaID) {
      //============================================================================================================================
      let desaFocused = [];

      /*if (this.map.hasLayer(this.layerDesaFocused)) {
        this.map.removeLayer(this.layerDesaFocused)
      }*/

      for (var i = 0; i < this.desaJson.length; i++) {
        let temp = this.desaJson[i].features;
        for (var x = 0; x < temp.length; x++) {
          let features = temp[x];
          if (features.properties.id == desaID) {
            desaFocused = features;
            x = temp.length;
          }
        }
      }

      this.layerDesaFocused = L.geoJSON(desaFocused, {
        onEachFeature: this.desaLabel.bind(this),
        style: function () {
          return {
            fillColor: "#3fae59",
            fillOpacity: 0.01,
            opacity: 1,
            color: "#3fae59",
            weight: 2,
          };
        },
      });

      this.layerDesaFocused.addTo(this.map);

      //================================================================================================================================
    },
    getData: async function () {
      let response = await apiAccess.read("desabambu");

      this.desa_bambu = response.data; console.log(this.desa_bambu);
      let marker = null;
      let markers = [];
      let kab_geojson = null;
      let kab_geojsons = [];

      let propinsi_id = "";
      let kab_id = "";
      let prop_id = null;
      let prop_name = "";
      let kab_name = "";
      let kec_name = "";
      let kab_filename = "";
      let desa = [];
      let kec = [];
      let kab = [];
      let prop_lat = null;
      let prop_lng = null;
      let des_id = null;

      for (var i = 0; i < this.desa_bambu.length; i++) {
        if (propinsi_id != this.desa_bambu[i].prop_id) {
          propinsi_id = this.desa_bambu[i].prop_id;
          if (this.desa_bambu[i].prop_lat && this.desa_bambu[i].prop_lng) {
            marker = new L.Marker([
              this.desa_bambu[i].prop_lat,
              this.desa_bambu[i].prop_lng,
            ])
              .bindTooltip(this.desa_bambu[i].nama_pulau)
              .on("click", this.markPropinsiClick);
            markers.push(marker);

            if (this.desa_bambu[i].geojson_kabupaten) {
              kab_geojson = await this.getGeoJsonFile(
                this.desa_bambu[i].geojson_kabupaten
              );
              let layers = L.geoJSON(kab_geojson, {
                onEachFeature: this.kabuptenLabel.bind(this),
                style: function () {
                  return {
                    //fillColor: "white",
                    fillOpacity: 0,
                    opacity: 1,
                    color: "#00fd3b",
                    weight: 1,
                  };
                },
              });

              kab_geojsons.push(layers);
            }
          }
        }

        //-----------GEOJSON KABUPATEN ADMINSTRATIF-----------------------------------
        if (
          kab_filename != this.desa_bambu[i].geojson_kabupaten &&
          this.desa_bambu[i].geojson_kabupaten != ""
        ) {
          if (this.desa_bambu[i].geojson_kabupaten) {
            kab_filename = this.desa_bambu[i].geojson_kabupaten;
            kab_geojson = await this.getGeoJsonFile(
              this.desa_bambu[i].geojson_kabupaten
            );

            let layers = L.geoJSON(kab_geojson, {
              onEachFeature: this.kabuptenLabel.bind(this),
              style: function () {
                return {
                  //fillColor: "white",
                  fillOpacity: 0,
                  opacity: 1,
                  color: "#00fd3b",
                  weight: 1,
                };
              },
            });

            kab_geojsons.push(layers);
          }
        }

        //------------ARRAY TREE PEMBIBITAN DESA----------------------------
        des_id = this.desa_bambu[i].des_id;
        if (kec_name != this.desa_bambu[i].kec_name) {
          if (kec_name != "") {
            kec.push({
              name: "Kec. " + kec_name,
              propinsi: false,
              kabupaten: false,
              kab_id: 0,
              kecamatan: true,
              desa: false,
              des_id: this.desa_bambu[i].des_id,
              children: desa,
            });
            desa = [];
          }
          kec_name = this.desa_bambu[i].kec_name;
        }
        if (kab_name != this.desa_bambu[i].kab_name) {
          if (kab_name != "") {
            kab.push({
              name: kab_name,
              propinsi: false,
              kabupaten: true,
              kab_id: kab_id,
              kecamatan: false,
              desa: false,
              des_id: this.desa_bambu[i].des_id,
              children: kec,
            });
            kec = [];
          }
          kab_id = this.desa_bambu[i].kab_id;
          kab_name = this.desa_bambu[i].kab_name;
        }
        if (prop_name != this.desa_bambu[i].nama_pulau) {
          if (prop_name != "") {
            this.treeDataPembibitan.push({
              prop_id: prop_id,
              name: prop_name,
              propinsi: true,
              kabupaten: false,
              kab_id: 0,
              kecamatan: false,
              desa: false,
              lat: prop_lat,
              lng: prop_lng,
              des_id: this.desa_bambu[i].des_id,
              children: kab,
            });
            kab = [];
          }
          prop_name = this.desa_bambu[i].nama_pulau;
          prop_id = this.desa_bambu[i].prop_id;
          prop_lat = this.desa_bambu[i].prop_lat;
          prop_lng = this.desa_bambu[i].prop_lng;
        }
        desa.push({
          name: this.desa_bambu[i].des_name,
          propinsi: false,
          kabupaten: false,
          kab_id: 0,
          kecamatan: false,
          desa: true,
          lat: this.desa_bambu[i].lat,
          lng: this.desa_bambu[i].lng,
          des_id: this.desa_bambu[i].des_id,
          pembibitan: this.desa_bambu[i].pembibitan,
          kepompong: this.desa_bambu[i].kepompong,
          penanaman: this.desa_bambu[i].penanaman,
        });
      }

      kec.push({
        name: "Kec. " + kec_name,
        propinsi: false,
        kabupaten: false,
        kab_id: "0",
        kecamatan: true,
        desa: false,
        des_id: 0,
        children: desa,
      });
      kab.push({
        name: kab_name,
        propinsi: false,
        kabupaten: true,
        kab_id: kab_id,
        kecamatan: false,
        desa: false,
        des_id: 0,
        children: kec,
      });
      this.treeDataPembibitan.push({
        prop_id: prop_id,
        name: prop_name,
        propinsi: true,
        kabupaten: false,
        kab_id: "0",
        kecamatan: false,
        desa: false,
        lat: prop_lat,
        lng: prop_lng,
        des_id: des_id,
        children: kab,
      });

      this.layerMarkPropinsi = L.layerGroup(markers);
      this.layerPolygonKabupaten = L.layerGroup(kab_geojsons);
      this.layerMarkKabupaten = L.layerGroup(this.markKabupaten);
    },
    desaLabel(f, l) {
      if (f) {
        l.bindTooltip(f.properties.lls2020_de, {
          permanent: false,
          direction: "top",
        });
      }
      if (f.geometry) {
        const poly = L.polygon(l.feature.geometry.coordinates);
        const center = poly.getBounds().getCenter();
        let marker = new L.Marker([center.lng, center.lat], {
          title: f.properties.lls2020_de,
          icon: this.icon,
        });
        marker.bindTooltip(f.properties.lls2020_de, {
          permanent: false,
          direction: "left",
        });

        marker.on("click", L.bind(this.markDesaBambuClick, null, f, center));
        this.markDesaBambu.push(marker);
        this.updateDesaLatLng(f.properties.id, center.lng, center.lat);
      }
      l.on("click", L.bind(this.polygonDesaBambuClick, null, f));
    },
    kabuptenLabel(f, l) {
      if (f) {
        l.bindTooltip(f.properties.KABKOT, {
          permanent: false,
          direction: "left",
          backgroundColor: "red",
        });
      }
      if (f.geometry) {
        const poly = L.polygon(l.feature.geometry.coordinates);
        const center = poly.getBounds().getCenter();
        let marker = new L.Marker([center.lng, center.lat], {
          title: f.properties.KABKOT,
          icon: this.icon,
        });
        marker.bindTooltip(f.properties.KABKOT, {
          permanent: false,
          direction: "left",
        });

        //marker.on('click', L.bind(this.markKabupatenClick, null, f, center) );
        //this.markKabupaten.push(marker)
        this.updateKabupatenLatLng(
          f.properties.PROVNO + f.properties.KABKOTNO,
          center.lng,
          center.lat
        );
      }
      l.on("click", L.bind(this.polygonKabupatenClick, null, f));
    },
    pembibitanLabel(f, l) {
      /*if (f) {
            l.bindTooltip(f.properties.Name,{
                permanent: true,
                direction:"left",
            });
        }*/
      if (f.geometry) {
        let marker = new L.Marker(
          [f.geometry.coordinates[1], f.geometry.coordinates[0]],
          { icon: this.iconPembibitan }
        );
        marker.bindTooltip(f.properties.Name, {
          permanent: false,
          direction: "left",
        });

        marker.on("click", L.bind(this.pembibitPopup, null, f));
        this.markPembibitan.push(marker);
      }
      //l.on('click', L.bind(this.polygonDesaBambuClick, null, f));
    },
    kritisLabel(f, l) {
      if (f.geometry) {
        const poly = L.polygon(l.feature.geometry.coordinates);
        //const area = L.GeometryUtil.geodesicArea(poly.getLatLngs());
      }
    },
    kepompongLabel(f, l) {
      if (f) {
        l.bindTooltip(f.properties.NAME, {
          permanent: false,
          direction: "left",
        });
      }
      if (f.geometry) {
        L.polygon(l.feature.geometry.coordinates);
      }
      l.on("click", L.bind(this.polygonKepompongClick, null, f));
    },
    penanamanLabel(f, l) {
      if (f) {
        l.bindTooltip(f.properties.Name, {
          permanent: false,
          direction: "left",
        });
      }
      if (f.geometry) {
        L.polygon(l.feature.geometry.coordinates);
      }
      l.on("click", L.bind(this.polygonPenanamanClick, null, f));
    },
    markDesaBambuClick(f, l, center) {
      const desa = this.searchDesa(f.properties["id"]);
      if (desa) {
        this.menuDesaPembibitanClick(desa.des_id, 13);
      }
    },
    markKabupatenClick(f, l, center) {
      const kabupaten = this.searchKabupaten(f.properties["KABKOTNO"]);
      if (kabupaten) {
        this.menuKabPembibitanClick(kabupaten, 10);
      }
    },
    polygonDesaBambuClick(f, l) {
      const desa = this.searchDesa(f.properties["id"]);
      if (desa) {
        this.menuDesaPembibitanClick(desa.des_id, 13);
      }
    },
    polygonKabupatenClick(f, l) {
      const kabupaten = this.searchKabupaten(
        f.properties["PROVNO"] + f.properties["KABKOTNO"]
      );
      if (kabupaten) {
        this.menuKabPembibitanClick(kabupaten, 10);
      }
    },
    polygonKepompongClick(f, l) {
      const desa = this.searchDesa(f.properties["id"]);
      if (desa) {
        this.menuDesaPembibitanClick(desa.des_id, null);
      }
    },
    polygonPenanamanClick(f, l) {
      const desa = this.searchDesa(f.properties["id"]);
      if (desa) {
        this.menuDesaPenanamanClick(desa.des_id, null);
      }
    },
    hideSummaryClick() {
      store.commit("hidesummary");
    },
    pembibitPopup(f, l) {
      this.modal_caption = f.properties.Name
      this.showPembibitPopup = true
    },
  },
};
</script>



