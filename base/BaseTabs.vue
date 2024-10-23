<template>
  <div class="tabs">
  
    <div class="tabs__nav">
        <span class="tabs__nav_title" v-if="sideTitle">
          {{ $t('interms_Of') }}:
        </span>
      <div
        class="tabs__nav_tab"
        v-for="(item, index) in tabList"
        :key="index"
        :class="[index === activeTab ? 'tabs__nav_tab--active' : '']"
        @click="activate(index)"
      >
      <!-- <Nuxt-Link :to="href">
        {{ item }}   
      </Nuxt-Link> -->
      {{ item }} 
      </div>
    </div>
    
    <template   v-for="(tab, index) in tabList">
      <div
     
        :key="index"
        v-if="index === IDdd || index === activeTab"
        class="tabs__content"
      >
        <slot :name="`${tabName}-${index}`"  :id="`${index}`"/>
      </div>
    </template>
 
  </div>
</template>

<script>
export default {
  name: "BaseTabs",
  props: {
    tabList: { 
        type: Array,
        required: true 
    },
    sideTitle:{
      type: Boolean,
      required: true 
    },
    tabName:{
      type: String,
      default: ''
    }
  },
  data() {
    return {
      tabId: '#0',
      activeTab: 0,
      href:''
    };
  },

  computed:{
      IDdd(){
        if(this.$route.hash.match(/\d+/) && this.$route.hash.match(/\d+/).length !== 0){
          this.tabId = this.$route.hash.match(/\d+/)[0]
        
        }
        return this.tabId;
      }
  },
  methods: {
    activate(index) {
      this.activeTab = index;
      // this.tabId =index;
      // this.$router.push({ path: '/productions/Anomaly/', hash:`#${index}` })
      
    }
  },
};
</script>

<style></style>