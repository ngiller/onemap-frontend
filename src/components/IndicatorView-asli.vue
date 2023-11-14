<template>
  <div>
    <badger-accordion
      :icons="{
        opened: '<i class=icon-arrow-up></i>',
        closed: '<i class=icon-arrow-down></i>',
      }"
    >
      <badger-accordion-item v-for="item in data_indicator" @open="onOpenItem(item.id)">
        <template slot="header">{{item.name}}</template>
        <template slot="content">

          <ul class="check-list-tracking">
            <li v-for="subitem in data_indicator_type">{{subitem.name}}</li>
            <!--<li>Penjajakan (assessment) dan sosialisasi</li>
            <li>Sekolah Lapang Bambu</li>
            <li>Pembibitan berbasis keluarga & kebun semai</li>
            <li>Kebun Kepompong</li>
            <li>Penanaman permanen di lokasi PS dan lahan kritis</li>
            <li>Rangkaian kegiatan HHutan Bambu Lestari</li>
            <li>Sistem Pengawetan</li>
            <li>
              Pabrik berbasis masyarakat di lokasi intervensi budi daya bambu
            </li>
            <li>Penyusunan Business Plan</li>-->
          </ul>
        </template>
      </badger-accordion-item>
<!--
      <badger-accordion-item>
        <template slot="header">Jumlah / Luasan Lahan</template>
        <template slot="content" style="max-width=100% !important">
          <div class="tracking-wrapper">
            <div class="tracking-label">Kebun bibit keluarga</div>
            <div class="tracking-value">3.5 hektar</div>
            <div class="tracking-label">Kebun Semai</div>
            <div class="tracking-value">4 hektar</div>
            <div class="tracking-label">Kebun Kepompong</div>
            <div class="tracking-value">0.25 hektar</div>
            <div class="tracking-label">Lahan Pemerintah</div>
            <div class="tracking-value">68.37 hektar</div>
            <div class="tracking-label">Lahan Swasta / Perorangan</div>
            <div class="tracking-value">2 hektar</div>
          </div>
        </template>
      </badger-accordion-item>

      <badger-accordion-item>
        <template slot="header">Jumlah Rumpun / Tegakan</template>
        <template slot="content" style="max-width=100% !important">
          <strong> Jumlah Rumpun / Tegakan</strong>
          <div class="tracking-wrapper">
            <div class="tracking-label">Lahan Pemerintah</div>
            <div class="tracking-value">68.37 hektar</div>
            <div class="tracking-label">Lahan Swasta / Perorangan</div>
            <div class="tracking-value">3 hektar</div>
          </div>
          <br />
          <strong> Lonjor</strong>
          <div class="tracking-wrapper">
            <div class="tracking-label">Lahan Pemerintah</div>
            <div class="tracking-value">68.37 hektar</div>
            <div class="tracking-label">Lahan Swasta / Perorangan</div>
            <div class="tracking-value">3 hektar</div>
          </div>
        </template>
      </badger-accordion-item>

      <badger-accordion-item>
        <template slot="header"
          >Jumlah Bibit, Kepompong dan Detail Pembibit</template
        >
        <template slot="content" style="max-width=100% !important">
          <div class="tracking-wrapper">
            <div class="tracking-label">Total Target</div>
            <div class="tracking-value">20.000</div>
            <div class="tracking-label">Total Komitmen</div>
            <div class="tracking-value">25.000</div>
            <div class="tracking-label">Total Cabang yang ditanam</div>
            <div class="tracking-value">25.000</div>
            <div class="tracking-label">Kebun Bibit Keluarga</div>
            <div class="tracking-value">18.000</div>
            <div class="tracking-label">Kebun Semai</div>
            <div class="tracking-value">10.000</div>
            <div class="tracking-label">Persemaian</div>
            <div class="tracking-value">10.000</div>
          </div>
          <br /><br />
          <k-tabs>
            <k-tab name="PROGRESS" :selected="true" class="ktab">
              <div class="content-area" v-if="jml_bibit > 0 || luas_lahan > 0">
                <div class="label-content"><strong>PEMBIBITAN</strong></div>
                <div class="answer-content"></div>
              </div>
              <div v-if="jml_bibit > 0">
                <div v-for="(item, x) in data_pembibitan" :key="x">
                  <div class="content-area">
                    <div class="label-content">
                      <i
                        class="icon-arrow-right"
                        style="margin-right: 3px; font-size: 10px"
                      ></i
                      >{{ item.nama }} :
                    </div>
                    <div class="answer-content" v-if="item.jml_bibit > 0">
                      {{ item.jml_bibit | numberFormat }} bibit
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="content-area"
                style="margin-top: 10px"
                v-if="jml_bibit > 0"
              >
                <div class="label-content"><b>Total Bibit :</b></div>
                <div class="answer-content" v-if="jml_bibit > 0">
                  <b>{{ jml_bibit | numberFormat }} bibit</b>
                </div>
              </div>
              <div class="content-area" v-if="luas_lahan > 0">
                <div class="label-content"><b>Total Luas Lahan :</b></div>
                <div class="answer-content">
                  <b>{{ luas_lahan | floatFormat }} m2</b>
                </div>
              </div>

              <yearPembibitanPanel
                :desa_id="desa_id"
                :jml_bibit="jml_bibit"
                :areaSelect="areaSelect"
                :type="areaType"
              />

              <div
                class="hr-line"
                v-if="jml_kepompong > 0 || luas_kepompong > 0"
              ></div>

              <div
                class="content-area"
                v-if="jml_kepompong > 0 || luas_kepompong > 0"
              >
                <div class="label-content"><strong>KEPOMPONG</strong></div>
                <div class="answer-content"></div>
              </div>
              <div v-if="jml_kepompong > 0">
                <div v-for="item in data_kepompong" :key="item.name">
                  <div class="content-area">
                    <div class="label-content" v-if="item.total_hidup > 0">
                      <i
                        class="icon-arrow-right"
                        style="margin-right: 3px; font-size: 10px"
                      ></i
                      >{{ item.nama_jenis_bambu }} :
                    </div>
                    <div class="answer-content" v-if="item.total_hidup > 0">
                      {{ item.total_hidup | numberFormat }} bibit
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="content-area"
                style="margin-top: 5px"
                v-if="jml_kepompong > 0"
              >
                <div class="label-content"><b>Total Kepompong :</b></div>
                <div class="answer-content">
                  <b>{{ jml_kepompong | numberFormat }} bibit</b>
                </div>
              </div>
              <div class="content-area" v-if="luas_kepompong > 0">
                <div class="label-content"><b>Total Luas Lahan :</b></div>
                <div class="answer-content">
                  <b>{{ luas_kepompong | floatFormat }} Ha</b>
                </div>
              </div>

              <yearKepompongPanel
                :desa_id="desa_id"
                :jml_kepompong="jml_kepompong"
                :areaSelect="areaSelect"
                :areaType="areaType"
              />

              <div
                class="hr-line"
                v-if="
                  jml_penanaman > 0 &&
                  (jml_kepompong > 0 ||
                    luas_kepompong > 0 ||
                    jml_bibit > 0 ||
                    luas_lahan > 0)
                "
              ></div>

              <div class="content-area" v-if="jml_penanaman > 0">
                <div class="label-content"><strong>PENANAMAN</strong></div>
                <div class="answer-content"></div>
              </div>
              <div v-if="jml_penanaman > 0">
                <div v-for="item in data_penanaman" :key="item.name">
                  <div class="content-area">
                    <div class="label-content" v-if="item.nama">
                      <i
                        class="icon-arrow-right"
                        style="margin-right: 3px; font-size: 10px"
                      ></i
                      ><b>Desa {{ item.nama }} </b>
                    </div>
                    <div
                      class="label-content"
                      v-if="item.ditanam > 0"
                      style="margin-left: 25px"
                    >
                      <span style="margin-right: 5px">&#9679;</span>
                      {{ item.jenis_bambu }} :
                    </div>
                    <div class="answer-content" v-if="item.ditanam > 0">
                      {{ item.ditanam | numberFormat }} bibit
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="content-area"
                style="margin-top: 5px"
                v-if="jml_penanaman > 0"
              >
                <div class="label-content"><b>Total penanaman :</b></div>
                <div class="answer-content">
                  <b>{{ jml_penanaman | numberFormat }} bibit</b>
                </div>
              </div>
              <div class="content-area" v-if="luas_penanaman > 0">
                <div class="label-content"><b>Total Luas Lahan :</b></div>
                <div class="answer-content">
                  <b>{{ luas_penanaman | floatFormat }} Ha</b>
                </div>
              </div>

              <yearPenanamanPanel
                :desa_id="desa_id"
                :jml_penanaman="jml_penanaman"
                :areaSelect="areaSelect"
                :areaType="areaType"
              />

              <div class="hr-line" v-if="jml_asal_bibit > 0"></div>

              <div class="content-area" v-if="jml_asal_bibit > 0">
                <div class="label-content"><strong>ASAL BIBIT</strong></div>
                <div class="answer-content"></div>
              </div>
              <div v-if="jml_asal_bibit > 0">
                <div v-for="item in asal_bibit" :key="item.name">
                  <div class="content-area">
                    <div
                      class="label-content"
                      v-if="item.tahun"
                      style="margin-top: 10px"
                    >
                      <b>Tahun {{ item.tahun }}</b>
                    </div>
                    <br />
                    <div class="label-content" v-if="item.nama">
                      <i
                        class="icon-arrow-right"
                        style="margin-right: 3px; font-size: 10px"
                      ></i
                      ><b>Desa {{ item.nama }} </b>
                    </div>
                    <div
                      class="label-content"
                      v-if="item.ditanam > 0"
                      style="margin-left: 25px"
                    >
                      <span style="margin-right: 5px">&#9679;</span>
                      {{ item.jenis_bambu }} :
                    </div>
                    <div class="answer-content" v-if="item.ditanam > 0">
                      {{ item.ditanam | numberFormat }} bibit
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="content-area"
                style="margin-top: 5px"
                v-if="jml_asal_bibit > 0"
              >
                <div class="label-content"><b>Total Bibit :</b></div>
                <div class="answer-content">
                  <b>{{ jml_asal_bibit | numberFormat }} bibit</b>
                </div>
              </div>
            </k-tab>

            <k-tab name="DETAIL PEMBIBIT">
              <div class="title-news-desc" v-if="total_pembibit > 0">
                Total {{ total_pembibit | numberFormat }} pembibit
                <span style="float: right" v-if="jml_bibit_pembibit > 0"
                  >Total {{ jml_bibit_pembibit | numberFormat }} bibit</span
                >
              </div>

              <div
                class="hr-line"
                v-if="total_pembibit > 0 || jml_bibit_pembibit > 0"
              ></div>

              <div
                class="boxdetailpembibit"
                v-for="(item, i) in data_pembibit"
                :key="i"
              >
                <div class="pembibit-image">
                  <img class="pembibit-img" :src="item.foto" height="70px" />
                  <div class="nama-pembibit">
                    <b>{{ item.nama_peserta }}</b>
                  </div>
                </div>

                <div class="detail-text">
                  <div
                    v-for="(subitem, x) in getDetailBibitPembibit(
                      item.nama_peserta
                    )"
                    :key="x"
                    class="detail-bibit"
                  >
                    {{ subitem.nama }} :
                    <span style="float: right"
                      >{{ subitem.jml_bibit | numberFormat }} bibit</span
                    >
                  </div>
                  <div class="sub-total-bibit">
                    Total Bibit :
                    <span style="float: right"
                      >{{
                        sumBibit(item.nama_peserta) | numberFormat
                      }}
                      bibit</span
                    >
                  </div>
                </div>
              </div>
            </k-tab>
          </k-tabs>
        </template>
      </badger-accordion-item>

      <badger-accordion-item>
        <template slot="header">Jumlah Bibit Bambu di Lahan Permanen</template>
        <template slot="content" style="max-width=100% !important">
          <div class="tracking-wrapper">
            <div class="tracking-label">Kebun bibit keluarga</div>
            <div class="tracking-value">20.000</div>
            <div class="tracking-label">Kebun Semai</div>
            <div class="tracking-value">25.000</div>
            <div class="tracking-label">Kebun Kepompong</div>
            <div class="tracking-value">25.000</div>
            <div class="tracking-label">Lahan Pemerintah</div>
            <div class="tracking-value">18.000</div>
            <div class="tracking-label">Lahan Swasta</div>
            <div class="tracking-value">10.000</div>
          </div>
          <div><hr /></div>
          <div class="tracking-wrapper">
            <div class="tracking-label">Total Bibit</div>
            <div class="tracking-value">10.000</div>
          </div>
          <br /><br />
          <div
            v-if="
              jml_penanaman > 0 &&
              (jml_kepompong > 0 ||
                luas_kepompong > 0 ||
                jml_bibit > 0 ||
                luas_lahan > 0)
            "
          ></div>

          <div class="content-area" v-if="jml_penanaman > 0">
            <div class="label-content"><strong>PENANAMAN</strong></div>
            <div class="answer-content"></div>
          </div>
          <div v-if="jml_penanaman > 0">
            <div v-for="item in data_penanaman" :key="item.name">
              <div class="content-area">
                <div class="label-content" v-if="item.nama">
                  <i
                    class="icon-arrow-right"
                    style="margin-right: 3px; font-size: 10px"
                  ></i
                  ><b>Desa {{ item.nama }} </b>
                </div>
                <div
                  class="label-content"
                  v-if="item.ditanam > 0"
                  style="margin-left: 25px"
                >
                  <span style="margin-right: 5px">&#9679;</span>
                  {{ item.jenis_bambu }} :
                </div>
                <div class="answer-content" v-if="item.ditanam > 0">
                  {{ item.ditanam | numberFormat }} bibit
                </div>
              </div>
            </div>
          </div>
          <div
            class="content-area"
            style="margin-top: 5px"
            v-if="jml_penanaman > 0"
          >
            <div class="label-content"><b>Total penanaman :</b></div>
            <div class="answer-content">
              <b>{{ jml_penanaman | numberFormat }} bibit</b>
            </div>
          </div>
          <div class="content-area" v-if="luas_penanaman > 0">
            <div class="label-content"><b>Total Luas Lahan :</b></div>
            <div class="answer-content">
              <b>{{ luas_penanaman | floatFormat }} Ha</b>
            </div>
          </div>

          <yearPenanamanPanel
            :desa_id="desa_id"
            :jml_penanaman="jml_penanaman"
            :areaSelect="areaSelect"
            :areaType="areaType"
          />

          <div class="hr-line" v-if="jml_asal_bibit > 0"></div>

          <div class="content-area" v-if="jml_asal_bibit > 0">
            <div class="label-content"><strong>ASAL BIBIT</strong></div>
            <div class="answer-content"></div>
          </div>
          <div v-if="jml_asal_bibit > 0">
            <div v-for="item in asal_bibit" :key="item.name">
              <div class="content-area">
                <div
                  class="label-content"
                  v-if="item.tahun"
                  style="margin-top: 10px"
                >
                  <b>Tahun {{ item.tahun }}</b>
                </div>
                <br />
                <div class="label-content" v-if="item.nama">
                  <i
                    class="icon-arrow-right"
                    style="margin-right: 3px; font-size: 10px"
                  ></i
                  ><b>Desa {{ item.nama }} </b>
                </div>
                <div
                  class="label-content"
                  v-if="item.ditanam > 0"
                  style="margin-left: 25px"
                >
                  <span style="margin-right: 5px">&#9679;</span>
                  {{ item.jenis_bambu }} :
                </div>
                <div class="answer-content" v-if="item.ditanam > 0">
                  {{ item.ditanam | numberFormat }} bibit
                </div>
              </div>
            </div>
          </div>
          <div
            class="content-area"
            style="margin-top: 5px"
            v-if="jml_asal_bibit > 0"
          >
            <div class="label-content"><b>Total Bibit :</b></div>
            <div class="answer-content">
              <b>{{ jml_asal_bibit | numberFormat }} bibit</b>
            </div>
          </div>
        </template>
      </badger-accordion-item>

      <badger-accordion-item>
        <template slot="header"
          >Jumlah Beneficiaries ( Individu / KTH )</template
        >
        <template slot="content" style="max-width=100% !important">
          <div class="tracking-wrapper">
            <div class="tracking-label">Kebun bibit keluarga</div>
            <div class="tracking-value">20.000</div>
            <div class="tracking-label">Kebun Semai</div>
            <div class="tracking-value">25.000</div>
            <div class="tracking-label">Kebun Kepompong</div>
            <div class="tracking-value">25.000</div>
            <div class="tracking-label">Lahan Pemerintah</div>
            <div class="tracking-value">18.000</div>
            <div class="tracking-label">Lahan Swasta</div>
            <div class="tracking-value">10.000</div>
            <hr />
            <div class="tracking-label">Total Bibit</div>
            <div class="tracking-value">10.000</div>
          </div>
        </template>
      </badger-accordion-item>

      <badger-accordion-item>
        <template slot="header">Jumlah Kader HBL</template>
        <template slot="content" style="max-width=100% !important">
          <div class="tracking-wrapper">
            <div class="tracking-label">Individu</div>
            <div class="tracking-value">355</div>
            <div class="tracking-label">Kelompok</div>
            <div class="tracking-value">25.000</div>
            <div class="tracking-label">Stakeholder</div>
            <div class="tracking-value">5</div>
          </div>
        </template>
      </badger-accordion-item>

      <badger-accordion-item>
        <template slot="header"
          >Jumlah dan Kualitas Tanaman Sela Lokal</template
        >
        <template slot="content">
          <ul class="check-list-tracking">
            <li>Tanaman sela sudah dipetakan</li>
            <li>Tanaman sela sudah direalisasikan</li>
          </ul>
        </template>
      </badger-accordion-item>

      <badger-accordion-item>
        <template slot="header"
          >Peningkatan Kontribusi Penyerapan Karbon</template
        >
        <template slot="content">
          <div class="tracking-wrapper">
            <div class="tracking-label">Estimasi potensi kandungan karbon</div>
            <div class="tracking-value">0,35</div>
            <div class="tracking-label">
              Persentase karbon di dalam biomassa
            </div>
            <div class="tracking-value">45,.63</div>
            <div class="tracking-label">
              Model persamaan alometrik yang efektif
            </div>
            <div class="tracking-value">AGB= 0.055 ×D^2.584</div>
          </div>
        </template>
      </badger-accordion-item>

      <badger-accordion-item>
        <template slot="header">Jumlah Kebijakan Terkait Desa Bambu</template>
        <template slot="content">
          <ul class="check-list-tracking">
            <li>Kebijakan desa yakni formal dan informal (aturan adat).</li>
            <li>
              Kebijakan supra desa; kecamatan, kabupaten, provinsi dan nasional
              yang bersifat formal.
            </li>
            <li>
              Tata kelola hutan,lahan dan lingkungan terkait bambu; 1. kebijakan
              mekanisme perhutanan sosial yang memasukkan bambu; sk perhutanan
              sosial.
            </li>
            <li>
              Kebijakan anggaran publik; kebijakan dana desa, kebijakan fiskal
              (EFT), kebijakan dana reboisasi dan kebijakan lain terkait
              anggaran publik untuk desa bambu.
            </li>
            <li>
              Kebijakan perencanaan pembangunan; kebijakan perencanaan desa,
              kabupaten, provinsi dan nasional.
            </li>
          </ul>
        </template>
      </badger-accordion-item>

      <badger-accordion-item>
        <template slot="header">Berita</template>
        <template slot="content">
          <div
            class="news-container"
            v-for="(item, x) in data_news_desa"
            :key="x"
          >
            <div class="title-news-desc">{{ item.subject }}</div>
            <div class="news-date">{{ formatDate(item.tanggal) }}</div>
            <div class="col-desc-text" v-html="item.descriptions"></div>
            <div class="hr-line"></div>
          </div>
        </template>
      </badger-accordion-item> -->
    </badger-accordion>
  </div>
</template>

<script>

import apiAccess from '@/utils/apiAccess'
import {BadgerAccordion, BadgerAccordionItem} from 'vue-badger-accordion'
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
    yearPembibitanPanel,
    yearKepompongPanel,
    yearPenanamanPanel,
    
  },
  data: function () {
    return {
      data_news_desa: [],
      jml_asal_bibit: null,
      areaType: null,
      areaSelect: null,
      jml_penanaman: null,
      desa_id: null,
      luas_penanaman: null,
      jml_penanaman: null,
      data_pembibit: [],
      jml_bibit_pembibit: null,
      total_pembibit: null,
      jml_asal_bibit: null,
      luas_penanaman: null,
      jml_kepompong: null,
      luas_kepompong: null,
      jml_bibit: null,
      luas_lahan: null,
      data_indicator: [],
      data_indicator_type:[],
    };
  },
  created: async function() {
    let response = await apiAccess.read('indicator')
    this.data_indicator = response.data
  },
  computed: {
  },
  methods: {
    show_id: async function(desa_id) {
        this.id_desa = desa_id
        let response = await apiAccess.read('indicator')
        this.data_indicator = response.data
    },
    get_indicator_type: async function(indicator_id) {
        let response = await apiAccess.read('indicator/typelist', {indicator_id: indicator_id})
        console.log(response.data)
        return response.data
    },
    onOpenItem: async function(indicator_id) {
        let response = await apiAccess.read('indicator/typelist', {indicator_id: indicator_id})
        this.data_indicator_type = response.data
    },
  },
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style src="badger-accordion/dist/badger-accordion.css"></style>
