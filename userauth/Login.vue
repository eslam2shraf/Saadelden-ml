<template>
  <div class="Login">
    <img src="@/assets/images/logo.png" class="Login__logo" />
    <ul class="navegation__list Login__lang">
      <LangDropdown :isMobile="isMobile" />
    </ul>

    <h4 class="Login__title">
      {{ $t("welcom_royal") }}
    </h4>
    <BaseCard class="Login__card">
      <h4 class="mt-5">
        {{ $t("login") }}
      </h4>
      <form class="Login__card__form">
        <BaseInput
          :title="`${$t('email')}`"
          type="email"
          :icon="'iconEmail'"
          v-model="userInfo.email"
          class="Login__card__form__inpt"
          required
          
        />

        <BaseInput
          :title="`${$t('password')}`"
          type="password"
          :icon="'iconLock'"
          v-model="userInfo.password"
          class="Login__card__form__inpt"
          required
        />

        <BaseButton
          class="button button--md Login__card__form__btn mb-3"
          @click="loginUser"
          :disabled="userInfo.email === '' || userInfo.password === ''"
        >
          {{ $t("login") }}
        </BaseButton>
      </form>
    
      <ErrorMsg
        :errorMsg="error ? error.message : ''"
        class="Login__card__errMsg"
      />
    </BaseCard>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import LangDropdown from "../layouts/LangDropdown.vue";
import ErrorMsg from "../layouts/ErrorMsg.vue";
export default {
  components: { LangDropdown, ErrorMsg },
  name: "LoginComponent",
  data() {
    return {
      vaild: false,
      emailError: "",
      passwordError: "",
      susbendError: "",
      windowWidth: 0,
      userInfo: {
        email: "",
        password: "",
      },
    };
  },
  computed: {
    ...mapGetters("auth", [
      "loading",
      "success",
      "error",
      "isAuthenticated",
      "token",
    ]),
    isMobile() {
      return this.windowWidth <= 992;
    },
   
  },
  methods: {
    loginUser() {
      this.$store.dispatch("auth/logIn", this.userInfo).then(() => {
        if (this.token) {
          this.$router.push(this.localePath("/dashboard"));
        }
        // if (this.error && this.error.errors) {
        //   this.susbendError = this.error.message;
        //   if (this.error.errors.hasOwnProperty("email")) {
        //     this.emailError = this.error.errors.email[0];
        //   } else this.emailError = "";
        //   if (this.error.errors.hasOwnProperty("password")) {
        //     this.passwordError = this.error.errors.password[0];
        //   } else this.passwordError = "";
        // } else if (this.error && !this.error.errors && !this.token) {
        //   this.susbendError = "";
        //   this.emailError = "";
        //   this.passwordError = "";
        //   this.susbendError = this.error;
        // }
      });
    },
    handleResize() {
      this.windowWidth = window.innerWidth;
    },
  },

  mounted() {
    this.handleResize();
    window.addEventListener("resize", this.handleResize);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.handleResize);
  },
};
</script>

