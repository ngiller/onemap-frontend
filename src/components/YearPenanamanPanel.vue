<template>
    <div  v-if="jml_penanaman > 0">
        <span>
            {{ desa_id_change }}
        </span>
        <div class="content-area" style="margin-top: 10px">
            <div class="label-content"><b>Penanaman Tahun</b></div>
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
        <div style="margin-top:10px;" v-if="yearPenanaman">
            <div  v-if="jml_penanaman > 0">
                <div v-for="item in data_year_penanaman"  :key="item.name">
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
        </div>
    </div>
</template>

<script>
import apiAccess from '@/utils/apiAccess'
import Multiselect from 'vue-multiselect'

export default ({
    name: 'yearPenanamanPanel',
    props: {
        desa_id: null,
        jml_penanaman: null,
        areaSelect: null,
        areaType: null,
        openDirection: "top",
    },
    components: {
        Multiselect,
    },
    data() {
        return {
            data_year_penanaman: [],
            yearSelect: [],
            yearList: [],
            yearPenanaman: false,
            old_desa_id: null,
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
        desa_id_change() {
            if (this.desa_id != this.old_desa_id) {
                this.old_desa_id = this.desa_id
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
            let link = null
            if (this.areaType == 'bibit') {
                if (this.areaSelect == 'desa') {
                    link = 'desabambu/getyearpenanaman'
                } else {
                    link = 'kabupaten/getyearpenanaman'
                }
            } else {
                if (this.areaSelect == 'desa') {
                    link = 'desabambu/getyearlokasipenanaman'
                } else {
                    link = 'kabupaten/getyearlokasipenanaman'
                }
            }
            const yearData = await apiAccess.read(link, {id: this.desa_id})
            this.yearList = yearData.data
            this.old_desa_id = this.desa_id
            this.yearPenanaman = false
        },
        selectYear: async function () {
            let link = null
            if (this.yearSelect.length > 0) {
                this.yearPenanaman = true
                if (this.desa_id) {
                    if (this.areaType == 'bibit') {
                        if (this.areaSelect == 'desa') {
                            link = 'desabambu/getasalpenanamanyear'
                        } else {
                            link = 'kabupaten/getasalpenanamanyear'
                        }
                    } else {
                        if (this.areaSelect == 'desa') {
                            link = 'desabambu/getlokasipenanamanyear'
                        } else {
                            link = 'kabupaten/getlokasipenanamanyear'
                        }
                    }
                    this.data_year_penanaman = await this.getYearData(link, this.desa_id, this.yearSelect)
                }
            } else {
                this.yearPenanaman = false
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
