<template>
    <div>
        <div class="propinsi" :class="{ 'propinsi-no-click': item.kecamatan }">
            <span v-if="isFolder && item.propinsi" style="margin-right:5px;">&#9673;</span>
            <span v-if="isFolder && item.kabupaten" style="margin-right:5px;">&#9679;</span>
            <i v-if="!isFolder" class="icon-location-pin" style="margin-right:3px; margin-left: 8px;"></i>
            <span  v-if="item.desa || item.kabupaten || item.propinsi" style="cursor: pointer;" @click="itemClick">{{ item.name }}</span>
            <span  v-if="item.kecamatan">{{ item.name }}</span>
            <span v-if="isFolder && !item.kecamatan" style="cursor: pointer; float: right; font-size: 10px;" @click="toggle">
                <i :class="{ 'icon-arrow-up': isOpen, 'icon-arrow-down': !isOpen, }" style="margin-right:3px;"></i>
            </span>
        </div>
        <ul class="kecamatan" v-show="isOpen" v-if="isFolder">
            <tree-item class="item" v-for="(child, index) in item.children" :key="index" :item="child" @propinsi-click="$emit('propinsi-click', $event)"></tree-item>
        </ul>
    </div>
</template>

<script>

export default ({
    name: "tree-item",
    props: {
        item: []
    },
    data: function () {
        return {
            isOpen: false
        };
    },
    created: async function() {
        if (this.item.kecamatan) {
            this.isOpen = true
        }
    },
    computed: {
        isFolder: function () {
            return this.item.children && this.item.children.length;
        }
    },
    methods: {
        toggle: function () {
            
            if (this.isFolder && !this.item.kecamatan) {
                this.isOpen = !this.isOpen;
            }
            //this.$emit("propinsi-click", this.item);
        },
        itemClick: function() {
            this.$emit("propinsi-click", this.item);
        }
    }
})

</script>
