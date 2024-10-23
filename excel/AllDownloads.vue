<template>
  <div class="container-fluid p-2">
    <div class="d-flex justify-content-space-between flex_gap">
      <h3>Downloads</h3>
      <base-bread-crumbs :Links="Links" />
    </div>
    <BaseCard>
      <div class="card-body mt-2" v-if="allExcels && allExcels.length !== 0">
        <table>
          <thead>
            <th v-for="head in dowmloadsHead" :key="head.id">
              {{ head.name }}
            </th>
          </thead>
          <tbody>
            <template v-for="(item, prop) in allExcels">
              <tr v-if="prop" class="mb-1" :key="prop">
                <td>
                  <h4 class="mb-0">{{ prop }}</h4>
                </td>
              </tr>
              <tr v-for="link in item" :key="link.id">
                <td class="word-break">
                  <a
                    class="font-weight-normal text-black download-link d-flex flex_gap justify-content-center"
                    :href="link.file_name"
                    download
                    v-if="
                      link.file_name &&
                      link.file_name !== 'Server error' &&
                      link.file_name !== 'Under processing'
                    "
                  >
                    <img
                      src="@/assets/images/icons/excel.png"
                      alt="excel"
                      class="verify-icon"
                    />
                    {{ link.file_name }}
                  </a>
                  <span
                    v-if="
                      link.file_name == 'Server error' ||
                      link.file_name == 'Under processing'
                    "
                  >
                    {{ link.file_name }}
                  </span>
                </td>
                <td>{{ link.created_at }}</td>
                <td>{{ link.from }}</td>
                <td>{{ link.to }}</td>
                <td>
                  <span
                    v-if="link.status === 'ready_to_download'"
                    class="d-flex flex_gap"
                  >
                    <img
                      src="@/assets/images/icons/verify.png"
                      alt="Success"
                      class="verify-icon"
                    />
                    {{ link.status }}
                  </span>
                  <span v-else>
                    {{ link.status }}
                  </span>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
    </BaseCard>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "AllDownloadsComponent",
  data() {
    return {
      Links: [
        {
          name: "Reports",
          url: "",
        },
        {
          name: " Downloads",
          url: "/excels/AllDownloads",
        },
      ],
      dowmloadsHead: [
        { id: 1, name: "File name" },
        { id: 2, name: "Creation Date" },
        { id: 3, name: "From" },
        { id: 4, name: "To" },
        { id: 5, name: "Status" },
      ],
    };
  },
  computed: {
    ...mapGetters("excels", ["loading", "success", "error", "allExcels"]),
  },
  mounted() {
    this.$store.dispatch("excels/fetchallExcels");
  },
};
</script>

<style>
</style>