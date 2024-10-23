<template>
  <table v-bind="$attrs" v-on="$listeners" class="table">
    <thead v-if="headings">
      <th v-for="head in headings" :key="head.id">
        {{ head.name }}
      </th>
    </thead>

    
    <tbody v-if="filterData && filterData.length !== 0">
     
      <tr
        v-for="(row, index) in filterData"
        :key="index"
        @click="URL ? direction(row.id) : null"
      >
        <td v-for="(item, key, i) in row" :key="i">
          <span v-if="item && item.hasOwnProperty('en')">
            {{ item.en }}
          </span>
          <span v-else>
            {{ item }}
          </span>

          <p v-if="amount && i == 1" class="table_subtitle text-black--50">
            <span v-if="item <= 10">
              {{ $t("items") }}
            </span>
            <span v-if="item > 10 || item === 0">
              {{ $t("item") }}
            </span>
          </p>
        </td>
        <slot name="options" :item="row" />
      </tr>
    </tbody>
    <tbody v-if="orderedArray">
      <tr
        v-for="(row, index) in data"
        :key="index"
        @click="URL ? direction(row.id) : null"
      >
        <td v-for="(item, j) in orderedArray" :key="j">
          <div class="d-flex flex-column">
            <p
              v-if="orderedArray[j] === 'target_rate'"
              class="m-0 d-flex justify-content-space-around align-items-flex-start"
            >
              <span
                v-if="checkPercentage(row[item], 100)"
                class="text_status--green"
                ><UpArrow /> {{ firstTwoDigit(row[item]) }} %
              </span>
              <span v-else class="text_status--red"
                ><DownArrow /> {{ firstTwoDigit(row[item]) }} %
              </span>
            </p>
            <p
              v-else-if="orderedArray[j] === 'collection_rate'"
              class="m-0 d-flex justify-content-space-around align-items-flex-start"
            >
              <span
                v-if="checkPercentage(row[item], 50)"
                class="text_status--green"
                ><UpArrow /> {{ firstTwoDigit(row[item]) }} %
              </span>

              <span v-else class="text_status--red"
                ><DownArrow /> {{ firstTwoDigit(row[item]) }} %
              </span>
            </p>
            <p
              v-else-if="orderedArray[j] === 'profit'"
              class="m-0 d-flex justify-content-space-around align-items-flex-start"
            >
              <span v-if="row[item] >= 0" class="text_status--green"
                ><UpArrow
              /></span>
              <span v-else class="text_status--red"><DownArrow /></span>
              <span v-if="row[item] >= 0" class="text_status--green"
                >{{ firstTwoDigit(row[item]) }} %</span
              >
              <span v-else class="text_status--red"
                >{{ firstTwoDigit(row[item]) }} %</span
              >
            </p>

            <p v-else class="m-0">
              <span v-if="item === 'id' && isIndex">
                    {{  index+1 }}
              </span>
              <span v-if="item === 'Status'">
                <slot name="Status" :item="row" />
                <!-- <slot name="Status" :row="row" /> -->
              </span>
              <span v-else>{{ firstTwoDigit(row[item]) }}</span>
            </p>

            <span
              v-if="labels && labels[j]"
              class="table_subtitle text-black--50"
              >{{ $t(labels[j]) }}
            </span>
          </div>
        </td>
        <slot name="options" :item="row" />
      </tr>
    </tbody>
  </table>
</template>

<script>
import UpArrow from "../icon/UpArrow.vue";
import DownArrow from "../icon/DownArrow.vue";
export default {
  name: "BaseTable",
  data() {
    return {
      filterdData: [],
    };
  },
  components: {
    UpArrow,
    DownArrow,
  },
  props: {
    headings: {
      type: Array,
    },
    data: {
      type: Array,
    },
    amount: {
      type: Boolean,
    },
    prevents: {
      type: Array,
      require: false,
    },
    linkable: {
      type: Boolean,
      require: false,
    },
    URL: {
      type: String,
      require: false,
    },
    orderedArray: {
      type: Array,
      require: false,
    },
    labels: {
      type: Array,
      require: false,
    },
    isIndex: {
      type: Boolean,
      require: false,
    },
  },
  computed: {
    filterData() {
      if (this.prevents && this.prevents.length !== 0) {

        this.filterdData = this.data;
        for (let index = 0; index < this.filterdData.length; index++) {
          Object.entries(this.filterdData[index]).forEach(([key, value]) => {
            for (let i = 0; i < this.prevents.length; i++) {
              if (this.prevents[i] === key) {
                delete this.filterdData[index][this.prevents[i]];
              }
            }
          });
        }
      }
      return this.filterdData;
    },
  },
  methods: {
    statusColors(status) {
      return this.$statusColors.statusColor(status);
    },
    direction(id) {
      this.$router.push(this.localePath(`${this.URL}/${id}`));
    },
    getIndex(Array, key) {
      return Array.indexOf(key);
    },
    firstTwoDigit(value) {
      if (
        typeof value == "number" &&
        !Number.isNaN(value) &&
        !Number.isInteger(value)
      ) {
        return value.toFixed(2);
      } else return value;
    },
    checkPercentage(value, percentage) {
      if (value >= percentage) {
        return true;
      } else return false;
    },
  },
  created() {
    // this.filterData()
  },
};
</script>

<style></style>
