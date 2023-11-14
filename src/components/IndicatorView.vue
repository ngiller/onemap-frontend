<template>
  <div>
      <!--Desa test telah dilakukan penjajakan (assesment dan sosialiasi) terkait program 1000 desa bambu. 
      Desa ini telah melakukan sekolah lapang bambu. Terdapat 47 pembibitan keluarga dan/atau kebun semai yang terdiri dari 2 kelompok di desa ini. 
      Terdapat juga XX stakeholder/pemangku kepentingan yang ikut terlibat berkegiatan langsung.
      Terdapat XX Kebun kepompong di desa ini. -->
      {{data_indicator.desc}}
    
    <div class="hr-line"></div>
    <badger-accordion ref="myAccordion"
      :icons="{
        opened: '<i class=icon-arrow-up></i>',
        closed: '<i class=icon-arrow-down></i>',
      }"
      
    >
      <badger-accordion-item v-for="item in data_indicator.indicator">
        <template slot="header">{{item.name}}</template>
        <template slot="content">
          <div class="indicator-desc">{{item.desc}}</div>
          <ul class="check-list-tracking" v-if="item.type == 0">
            <li v-for="subitem in item.subitems">{{subitem.type_name}}</li>
          </ul>
          <div v-if="item.type != 0" v-for="subitemvalue in item.subitems"> 
            <div class="tracking-wrapper" v-if="subitemvalue.indicator_type == -1">         
                <div class="sub-title"><strong>{{subitemvalue.type_name}}</strong></div>
            </div>

            <div class="tracking-wrapper" v-if="subitemvalue.indicator_type != -1 && subitemvalue.value > 0">
                <div class="tracking-label">{{subitemvalue.type_name}}</div>
                <div class="tracking-value">{{subitemvalue.value | numberFormat}} {{subitemvalue.units}}</div>
            </div>
          </div>
          <div v-if="item.id == 4">
            <!---------------------------------DETAIL PEMBIBIT------------------------------------------------->
            <detail-pembibit :desa_id="id_desa" />
          </div>
          <div v-if="item.id == 5">
            <!---------------------------------DETAIL PENANAMAN------------------------------------------------->
            <detail-penanaman :desa_id="id_desa" />
          </div>
          <div v-if="item.id == 6" style="margin-top: 8px;">
            <!---------------------------------DETAIL KELOMPOK------------------------------------------------->
            <div class="tracking-table-wrap">
              <div class="tracking-table-label" ><strong>NAMA KELOMPOK</strong></div>
              <div class="tracking-table-value"><strong>ANGGOTA</strong></div>
            </div>
            <hr style="margin-top: -3px;">
            <div v-for="subitemvalue in item.subitems">
              <div v-if="subitemvalue.indicator_type == 94">
                <div v-for="itemsubvalue in subitemvalue.nama_kelompok">
                  <div class="tracking-table-label" >{{itemsubvalue.nama_kelompok}}</div>
                  <div class="tracking-table-value">{{itemsubvalue.jml_anggota}}</div>
                </div>
              </div>
            </div>            
          </div>
          <div v-if="item.id == 7" style="margin-top: 8px;">
            <!---------------------------------DETAIL KADER------------------------------------------------->
            <div v-for="(subitemkader, i) in item.subitems" :key="i">
              <div v-for="itemsubvalue in subitemkader.kader">
                <div v-if="subitemkader.indicator_type == 141">
                  <div><strong>DETAIL KADER</strong></div>
                  <hr />
                  <div class="boxdetailpembibit">
                    <div class="pembibit-image">
                      <img class="pembibit-img" :src="itemsubvalue.photo" height="70px" />
                    </div>
                    <div class="detail-text">
                      <b>{{ itemsubvalue.nama_peserta }}</b>
                      <div class="indicator-desc">{{ itemsubvalue.profile}}</div>
                    </div>
                  </div>
                </div>
                
              </div>
              
            </div>
          </div>
        </template>
      </badger-accordion-item>
    </badger-accordion>

    <badger-accordion :icons="{ opened: '<i class=icon-arrow-up></i>', closed: '<i class=icon-arrow-down></i>',}" v-if="data_news_desa">
      <badger-accordion-item>
        <template slot="header">Berita</template>
        <template slot="content">
          <div class="news-container" v-for="newsitem in data_news_desa" >
            <div class="title-news-desc">{{ newsitem.subject }}</div>
            <div class="news-date">{{ formatDate(newsitem.tanggal) }} | {{ newsitem.penulis }}</div>
            <div class="col-desc-text" v-html="newsitem.descriptions"></div>
            <div class="hr-line"></div>
          </div>
        </template>
      </badger-accordion-item>
    </badger-accordion>
    
  </div>
</template>

<script>

import apiAccess from '@/utils/apiAccess'
import {BadgerAccordion, BadgerAccordionItem} from 'vue-badger-accordion'
import DetailPembibit from '@/components/DetailPembibitView.vue'
import DetailPenanaman from '@/components/DetailPenanamanView.vue'
import yearPembibitanPanel from '@/components/YearPembibitanPanel.vue';
import yearKepompongPanel from '@/components/YearKepompongPanel.vue';
import yearPenanamanPanel from '@/components/YearPenanamanPanel.vue';

export default {
  name: "indicator-item",
  props: {
    id_desa: null,
  },
  components: {
    BadgerAccordion,
    BadgerAccordionItem, 
    'detail-pembibit': DetailPembibit,
    'detail-penanaman': DetailPenanaman,
    yearPembibitanPanel,
    yearKepompongPanel,
    yearPenanamanPanel,   
  },
  data: function () {
    return {
      data_news_desa: [],
      desa_id: null,
      data_indicator: [],
      data_indicator_type:[],
      name: null,
      
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
  created: async function() {
    
  },
  computed: {
  },
  methods: {
    put_id: async function(desa_id, name) { 
        this.id_desa = desa_id
        this.name = name

        let response = await apiAccess.read('indicator', {desa_id: this.id_desa, name: this.name})
        this.data_indicator = response.data
        console.log(this.data_indicator)

        response = await apiAccess.read('desabambu/getnewsdesa', {desa_id: this.id_desa})
        this.data_news_desa = response.data
        if (this.data_news_desa.length == 0) {
          this.data_news_desa = null;
        }
        this.$refs.myAccordion.init();
        this.$refs.myAccordion.openAll();
    },
    
    formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      return new Date(date).toLocaleDateString('en', options)
    },
  },
};
</script>

<style src="badger-accordion/dist/badger-accordion.css"></style>
