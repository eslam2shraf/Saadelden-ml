export default ($axios) => ({
  async billsPrice() {
    try {
      const response = await $axios.$get("/anomaly/odd-bills-price");

      return response;
    } catch (error) {
      return error;
    }
  },
  async billsTime() {
    try {
      const response = await $axios.$get("/anomaly/odd-bills-time");

      return response;
    } catch (error) {
      return error;
    }
  },
  async peakTime() {
    try {
      const response = await $axios.$get("/anomaly/peak-time");

      return response;
    } catch (error) {
      return error;
    }
  },
  async offHoursInvoices({ page, per_page }) {
    try {
      const response = await $axios.$post(
        `/anomaly/invoices-not-within-work-time?page=${page}&per_page=${per_page}`
      );

      return response;
    } catch (error) {
      return error;
    }
  },
  async offHoursCheckIn(data) {
    try {
      var params;
      if(data.store_id  !== ''){
        params = data;
      }else{
        delete data.store_id;
        params = data;
      }

      const response = await $axios.$get("/anomaly/attendance", {
        params,
      });

      return response;
    } catch (error) {
      return error;
    }
  },
  async refundLastDayInvoice(data) {
    try {
      let  params = data;
      if (data.from !== "" && data.to !== "") {
         params = data;
      }else{
        delete params.to;
        delete params.from;
      }
      const response = await $axios.$get("/anomaly/Invoices/last", {
        params,
      });

      return response;
    } catch (error) {
      return error;
    }
  },
  async moreWeekRefundedInvoices(data) {
    try {
      let params=data;

      if (data.from !== "" && data.to !== "") {
         params.from = data.from;
         params.to = data.to;
      }else{
        delete params.to;
        delete params.from;
      }
      const response = await $axios.$get("/anomaly/Invoices/week", {
        params,
      });

      return response;
    } catch (error) {
      return error;
    }
  },
  async invoicesWeekUser({ page, per_page }) {
    try {
      const response = await $axios.$post(
        `/anomaly/invoices-in-the-same-week-to-same-user?page=${page}&per_page=${per_page}`
      );

      return response;
    } catch (error) {
      return error;
    }
  },
  async invoicesWeekUserDetails({ page, per_page, user_id }) {
    try {
      const response = await $axios.$post(
        `/anomaly/invoices_in_the_same_week_to_same_user_data?page=${page}&per_page=${per_page}`,
        {
          user_id: user_id,
        }
      );

      return response;
    } catch (error) {
      return error;
    }
  },
  async invoicesWithoutCheckIn({ page, per_page }) {
    try {
      const response = await $axios.$post(
        `/anomaly/invoices_without_checkIn?page=${page}&per_page=${per_page}`
      );
      return response;
    } catch (error) {
      return error;
    }
  },
  async stores(data) {
    try {
      const response = await $axios.$get('sellers/allStores', data
      );
      return response;
    } catch (error) {
      return error;
    }
  },
});
