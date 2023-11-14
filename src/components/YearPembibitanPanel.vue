<template>
    <div  v-if="jml_bibit > 0">
        <span>
            {{ desa_id_change }}
        </span>
        <div class="content-area" style="margin-top: 10px">
            <div class="label-content"><b>Pembibitan Tahun</b></div>
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
        <div style="margin-top:10px;" v-if="yearPembibitan">
            <div v-if="jml_bibit > 0">
                <div v-for="(item, x) in data_year_pembibitan" :key="x">
                    <div class="content-area">
                        <div class="label-content" v-if="item.tahun" style="margin-top:10px">
                            <b>Tahun {{item.tahun}}</b>
                        </div>
                        <br>
                        <div class="label-content" v-if="!item.tahun"> <i class="icon-arrow-right"
                                style="margin-right:3px;font-size: 10px;"></i>{{ item.nama}} :</div>
                        <div class="answer-content" v-if="item.jml_bibit > 0"> {{ item.jml_bibit | numberFormat }} bibit
                        </div>
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
    name: 'YearPembibitanPanel',
    props: {
        desa_id: null,
        jml_bibit: null,
        areaSelect: null,
        areaType: null,
    },
    components: {
        Multiselect,
    },
    data() {
        return {
            data_year_pembibitan: [],
            yearSelect: [],
            yearList: [],
            yearPembibitan: false,
            old_desa_id: null,
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
            let yearData = []
            let link = null
            if (this.areaSelect == 'desa') {
                link = 'desabambu/getyearpembibitan'
            } else {
                link = 'kabupaten/getyearpembibitan'
            }

            yearData = await apiAccess.read(link, {id: this.desa_id})
            this.yearList = yearData.data
            this.old_desa_id = this.desa_id
            this.yearPembibitan = false
            
        },
        selectYear: async function () {
            let link = null
            if (this.yearSelect.length > 0) {
                this.yearPembibitan = true
                if (this.desa_id) {
                    if (this.areaSelect == 'desa') {
                        link = 'desabambu/getpembibitanyear'
                    } else {
                        link = 'kabupaten/getpembibitanyear'
                    }
                    
                    this.data_year_pembibitan = await this.getYearData(link, this.desa_id, this.yearSelect)
                }
            } else {
                this.yearPembibitan = false
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
