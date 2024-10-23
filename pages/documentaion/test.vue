<template>
  <div class="container">
    <div class="row">
      <BaseButton class="button button--lg"> Large Button! </BaseButton>
      <br />
      <BaseButton class="button button--md p-3"> Med Button! </BaseButton>
      <br />
      <BaseButton class="button button--sm"> Small Button! </BaseButton>
      <br />
      <div class="col-4">
        <BaseButton class="button button--xs"> tiny Button! </BaseButton>
      </div>

      <br />
      <BaseInput
        :title="'Title'"
        type="text"
        :icon="'iconSearchIcon'"
      />
      <br />
      <BaseInput :title="'Title'" type="date" />
      <br />
      <BaseTextarea :title="'Title'" />
      <br />
      <inputs-select :options="selectOptions" />
      <br />
      <BaseCard />
    </div>

    <BaseTable :data="testData" :headings="tableHead" />
    <br />
  </div>
</template>

<script>
import InputsSelect from "../../components/base/BaseSelect.vue";
export default {
  components: { InputsSelect },
  name: "Test",
  data() {
    return {
      name: "nn",
      tableHead: [
        { id: 1, name: "head1" },
        { id: 2, name: "head2" },
        { id: 3, name: "head3" },
      ],
      testData: [
        { id: 40, values: ["Dickerson", "dkkdk", "kkkss"] },
        { id: 21, values: ["Larsen", "uus", "fsffd"] },
        { id: 89, values: ["Geneva", "wudh", "hwdrds"] },
        { id: 38, values: ["Jami", "jshsh", "hdgg"] },
      ],
      selectOptions: [
        {
          label: "Home",
          value: "home",
        },
        {
          label: "Work",
          value: "work",
        },
        {
          label: "Mobile",
          value: "mobile",
        },
        {
          label: "Fax",
          value: "fax",
        },
      ],
    };
  },
};
</script>

<style>
</style>