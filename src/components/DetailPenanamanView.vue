<template>
  <div>
    <span>
      {{ desa_id_change }}
    </span>

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
      <div class="label-content">
        <strong>PENANAMAN<br />Asal Bibit :</strong>
      </div>
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
            ><b>{{ item.nama }} </b>
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
    <div class="content-area" style="margin-top: 5px" v-if="jml_penanaman > 0">
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
          <div class="label-content" v-if="item.tahun" style="margin-top: 10px">
            <b>Tahun {{ item.tahun }}</b>
          </div>
          <br />
          <div class="label-content" v-if="item.nama">
            <i
              class="icon-arrow-right"
              style="margin-right: 3px; font-size: 10px"
            ></i
            ><b>{{ item.nama }} </b>
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
    <div class="content-area" style="margin-top: 5px" v-if="jml_asal_bibit > 0">
      <div class="label-content"><b>Total Bibit :</b></div>
      <div class="answer-content">
        <b>{{ jml_asal_bibit | numberFormat }} bibit</b>
      </div>
    </div>
  </div>
</template>

<script>
import apiAccess from "@/utils/apiAccess";
import CONFIG from "@/utils/config.js";
import yearPenanamanPanel from "@/components/YearPenanamanPanel.vue";

export default {
  name: "detail-pembibit",
  props: {
    desa_id: null,
  },
  components: {
    yearPenanamanPanel,
  },
  data: function () {
    return {
      old_desa_id: null,
      jml_asal_bibit: null,
      areaType: null,
      areaSelect: null,
      jml_penanaman: null,
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
  computed: {
    desa_id_change() {
      if (this.desa_id != this.old_desa_id) {
        this.old_desa_id = this.desa_id;
        this.updateData(this.desa_id);
      }
    },
  },
  methods: {
    getJumlahBibit() {
      let total_bibit = 0;
      if (this.data_pembibitan.length > 0) {
        for (let i = 0; i < this.data_pembibitan.length; i++) {
          if (this.data_pembibitan[i].jml_bibit > 0) {
            total_bibit =
              total_bibit + parseInt(this.data_pembibitan[i].jml_bibit);
          }
        }
      }
      return total_bibit;
    },
    getJumlahKepompong() {
      let total = 0;
      if (this.data_kepompong.length > 0) {
        for (let i = 0; i < this.data_kepompong.length; i++) {
          if (this.data_kepompong[i].total_hidup > 0) {
            total = total + parseInt(this.data_kepompong[i].total_hidup);
          }
        }
      }
      return total;
    },
    getDataPembibit: async function (detail_pembibit) {
      let nama_pembibit = "";
      let dataPembibit = [];
      if (detail_pembibit.length > 0) {
        for (let i = 0; i < detail_pembibit.length; i++) {
          if (detail_pembibit[i]["nama_peserta"] != nama_pembibit) {
            nama_pembibit = detail_pembibit[i]["nama_peserta"];
            let foto = null;
            if (detail_pembibit[i]["foto"]) {
              foto = CONFIG.PEMBIBIT_IMAGE + detail_pembibit[i]["foto"];
            } else {
              foto = CONFIG.PEMBIBIT_IMAGE + "user-default.png";
            }
            dataPembibit.push({
              nama_peserta: detail_pembibit[i]["nama_peserta"],
              foto: foto,
            });
          }
        }
      }
      return dataPembibit;
    },
    getDetailBibitPembibit(nama_peserta) {
      let detailBibit = [];
      if (this.detail_pembibit.length > 0) {
        for (let i = 0; i < this.detail_pembibit.length; i++) {
          if (this.detail_pembibit[i]["nama_peserta"] == nama_peserta) {
            detailBibit.push(this.detail_pembibit[i]);
          }
        }
      }
      return detailBibit;
    },
    sumBibit(item) {
      let sum = 0;
      if (this.detail_pembibit.length > 0) {
        for (let i = 0; i < this.detail_pembibit.length; i++) {
          if (this.detail_pembibit[i]["nama_peserta"] == item) {
            sum += parseInt(this.detail_pembibit[i]["jml_bibit"]);
          }
        }
      }
      return sum;
    },
    getJumlahPenanaman() {
      let total = 0;
      if (this.data_penanaman.length > 0) {
        for (let i = 0; i < this.data_penanaman.length; i++) {
          if (parseInt(this.data_penanaman[i].ditanam) > 0) {
            total = total + parseInt(this.data_penanaman[i].ditanam);
          }
        }
      }
      return total;
    },
    getDataAPI: async function (link, id) {
      let response = await apiAccess.read(link, { id: id });
      return response.data;
    },
    getLuasPenanaman: async function (link, id) {
      let response = await apiAccess.read(link, { id: id });
      return response.data["luas_lahan"];
    },
    getJumlahAsalBibit() {
      let total = 0;
      if (this.asal_bibit.length > 0) {
        for (let i = 0; i < this.asal_bibit.length; i++) {
          if (parseInt(this.asal_bibit[i].ditanam) > 0) {
            total = total + parseInt(this.asal_bibit[i].ditanam);
          }
        }
      }
      return total;
    },
    getDataAsalPembibit: async function (detail_asal_pembibit) {
      let nama_pembibit = "";
      let dataPembibit = [];
      if (detail_asal_pembibit.length > 0) {
        for (let i = 0; i < detail_asal_pembibit.length; i++) {
          if (detail_asal_pembibit[i]["nama_peserta"] != nama_pembibit) {
            nama_pembibit = detail_asal_pembibit[i]["nama_peserta"];
            let foto = null;
            if (detail_asal_pembibit[i]["foto"]) {
              foto = CONFIG.PEMBIBIT_IMAGE + detail_asal_pembibit[i]["foto"];
            } else {
              foto = CONFIG.PEMBIBIT_IMAGE + "user-default.png";
            }
            dataPembibit.push({
              nama_peserta: detail_asal_pembibit[i]["nama_peserta"],
              foto: foto,
            });
          }
        }
      }
      return dataPembibit;
    },
    updateData: async function (desa_id) {
      this.areaSelect = "desa";
      this.areaType = "bibit";
      this.desa_id = desa_id;
      this.data_pembibitan = await this.getDataAPI(
        "desabambu/getpembibitan",
        desa_id
      );
      this.jml_bibit = await this.getJumlahBibit();
      this.luas_lahan = await this.getLuasPenanaman(
        "desabambu/getluaslahan",
        desa_id
      );
      this.detail_pembibit = await this.getDataAPI(
        "desabambu/getdetailpembibit",
        desa_id
      );
      this.data_pembibit = await this.getDataPembibit(this.detail_pembibit);
      this.total_pembibit = this.data_pembibit.length;
      this.jml_bibit_pembibit = this.jml_bibit;

      this.data_kepompong = await this.getDataAPI(
        "desabambu/getkepompong",
        desa_id
      );
      this.jml_kepompong = await this.getJumlahKepompong();
      this.luas_kepompong = await this.getLuasPenanaman(
        "desabambu/getluaskepompong",
        desa_id
      );

      this.data_penanaman = await this.getDataAPI(
        "desabambu/getasalpenanaman",
        desa_id
      );
      this.jml_penanaman = await this.getJumlahPenanaman();
      this.luas_penanaman = await this.getLuasPenanaman(
        "desabambu/getluasasalpenanaman",
        desa_id
      );

      this.asal_bibit = [];
      this.jml_asal_bibit = 0;
    },
  },
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
