<template>
  <FormBuilder :steps="formSteps" />
</template>

<script lang="ts" setup>
import FormBuilder from "./components/FormBuilder.vue";
import Dummy from "./lib/response.json";
import { FormStep } from "./types";

const formSteps = Dummy as FormStep[];
</script>
