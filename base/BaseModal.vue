<template>
 <transition name="modal">
    <div class="modal-mask"  v-show="show">
     
        <div class="modal-container" >
            <span @click="close" class="modal_close">
                <Close />
            </span>
            <slot name="modal_body">
            </slot>
        </div>
    </div>
</transition>
</template>

<script>
import Close from '../icon/Close.vue';

export default {
    name: 'BaseModal',
    props: {
        show: {
            type: Boolean,
        },
    },
    mounted: function () {
        document.addEventListener("keydown", (e) => {
            if (this.show && e.keyCode == 27) {
                this.close();
            }
        });
    },
    methods: {
        close: function () {
            this.$emit('close');
        }
    },
    components: { Close }
}
</script>

<style>

</style>