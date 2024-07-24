<template>
  <FormBuilder :steps="dummyData" />
</template>

<script lang="ts">
import FormBuilder from "./components/FormBuilder.vue";
import Dummy from "./lib/response.json";
import { FormStep } from "./types";

export default {
  components: {
    FormBuilder,
  },
  data() {
    return {
      dummyData: Dummy as FormStep[],
    };
  },
};
</script>
