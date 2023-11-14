<template>
    <div v-if="jml_kepompong > 0">
        <div class="content-area" style="margin-top: 10px;">
            <div class="label-content"><b>Kepompong Tahun</b></div>
            <div class="answer-content" style="padding-top:8px"><hr class="yearSelectLine"/></div>
        </div>
        <div class="content-area" style="margin-top:10px;">
            <label class="label-content" style="padding-top:10px">Pilih Tahun</label>
            <div class="answer-content">
                <multiselect v-model="yearSelect" :options="yearList" :multiple="true" placeholder="Pilih tahun" :openDirection="openDirection"
                    label="tahun" track-by="tahun" @remove="removeTag" @close="selectYear" :taggable="true" @tag="addTag">
                </multiselect>
            </div>
        </div>
        <div style="margin-top:10px;" v-if="yearKepompong">
            <div  v-if="jml_kepompong > 0">
                <div v-for="item in data_year_kepompong"  :key="item.name">
                <div class="content-area">
                    <div class="label-content" v-if="item.tahun" style="margin-top:10px">
                    <b>Tahun {{item.tahun}}</b>
                    </div>
                    <br>
                    <div class="label-content" v-if="item.total_hidup > 0"> <i class="icon-arrow-right"
                        style="margin-right:3px;font-size: 10px;"></i>{{ item.nama_jenis_bambu }} :</div>
                    <div class="answer-content" v-if="item.total_hidup > 0"> {{ item.total_hidup | numberFormat }} bibit</div>
                </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import apiAccess from '@/utils/apiAccess'
import Multiselect from 'vue-multiselect'

export default ({
    name: 'yearKepompongPanel',
    props: {
        desa_id: null,
        jml_kepompong: null,
        areaSelect: null,
        areaType: null,
    },
    components: {
        Multiselect,
    },
    data() {
        return {
            data_year_kepompong: [],
            yearSelect: [],
            yearList: [],
            yearKepompong: false,
            old_kab_id: null,
            openDirection: "top",
        }
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
    computed: {
        kab_id_change() {
            if (this.kab_id != this.old_kab_id) {
                this.old_kab_id = this.desa_id
                this.loadYearList()
            }
        }
    },
    created: async function () {
        await this.loadYearList()
    },
    methods: {
        loadYearList: async function() {
            this.yearList = []
            this.yearSelect = []
            let yearData = []
            let link = null
            if (this.areaSelect == 'desa') {
                link = 'desabambu/getyearkepompong'
            } else {
                link = 'kabupaten/getyearkepompong'
            }
            yearData = await apiAccess.read(link, {id: this.desa_id})
            this.yearList = yearData.data
            this.old_kab_id = this.kab_id
            this.yearKepompong = false
        },
        selectYear: async function () {
            let link = null
            if (this.yearSelect.length > 0) {
                this.yearKepompong = true
                if (this.desa_id) {
                    if (this.areaSelect == 'desa') {
                        link = 'desabambu/getkepompongyear'
                    } else {
                        link = 'kabupaten/getkepompongyear'
                    }
                    this.data_year_kepompong = await this.getYearData(link, this.desa_id, this.yearSelect)
                }
            } else {
                this.yearKepompong = false
            }
        },
        removeTag(id) {
            let data = []
            for (var i = 0; i < this.yearSelect.length; i++) {
                if (this.yearSelect[i].tahun != id.tahun) {
                    data.push({ tahun: this.yearSelect[i].tahun })
                }
            }
            this.yearSelect = data
            this.selectYear()
        },
        addTag(newTag) {
            const tag = {
                tahun: newTag
            }
            this.yearList.push(tag)
            this.yearSelect.push(tag)
        },
        getYearData: async function (link, id, year) {
            let response = await apiAccess.read(link, {id: id, year: year})
            return response.data
        },
    },
})
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
