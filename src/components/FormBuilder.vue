<template>
  <form
    @submit.prevent="handleSubmit"
    class="min-w-[30rem] w-full shadow-sm shadow-white rounded-md box-content p-5">
    <div
      class="space-y-4 flex-1"
      v-for="(step, _i) in steps"
      :key="_i"
      v-show="currentStep === step.step">
      <h2 class="text-3xl font-medium">{{ step.title }}</h2>
      <p class="text-sm italic">{{ step.description }}</p>
      <template v-for="(field, _i) in step.fields" :key="_i">
        <div
          v-if="field.type === 'textfield'"
          class="flex gap-3 justify-between items-center">
          <label :for="field.label">{{ field.label }}</label>
          <input
            type="text"
            :id="field.label"
            :required="field.required"
            :placeholder="field.placeholder"
            v-model="formData[field.label.toLowerCase()]"
            class="flex h-9 w-4/5 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium" />
        </div>
        <div v-if="field.type === 'radio'" class="flex gap-3 justify-between">
          <label>{{ field.label }}</label>
          <ul class="w-4/5 flex flex-col gap-2">
            <li v-for="option in field.options" :key="option.value" class="flex gap-2">
              <input
                type="radio"
                :id="option.value"
                :name="field.label"
                :value="option.value"
                :required="field.required"
                v-model="formData[field.label.toLowerCase()]" />
              <label :for="option.value">{{ option.label }}</label>
            </li>
          </ul>
        </div>
        <div v-if="field.type === 'textarea'" class="flex gap-3 justify-between">
          <label :for="field.label">{{ field.label }}</label>
          <textarea
            :id="field.label"
            :placeholder="field.placeholder"
            v-model="formData[field.label.toLowerCase()]"
            :required="field.required"
            class="flex min-h-[88px] rounded-md w-4/5 border border-input bg-transparent px-3 py-2 text-sm shadow-sm hide-scrollbar"></textarea>
        </div>
        <div
          v-if="field.type === 'autocomplete'"
          class="flex gap-3 justify-between items-center">
          <label :for="field.label">{{ field.label }}</label>
          <input
            type="text"
            list="autocomplete"
            :placeholder="field.placeholder"
            :required="field.required"
            v-model="formData[field.label.toLowerCase()]"
            class="flex h-9 w-4/5 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium" />
          <datalist id="autocomplete">
            <option v-for="option in field.options" :key="option">
              {{ option }}
            </option>
          </datalist>
        </div>
      </template>
      <div class="flex justify-between">
        <button
          type="button"
          @click="prevStep"
          :disabled="currentStep === 1"
          :class="currentStep === 1 ? 'invisible' : 'visible'">
          Previous
        </button>
        <button
          type="button"
          @click="nextStep"
          v-if="currentStep < steps.length"
          :disabled="!isCurrentStepValid">
          Next
        </button>
        <button type="submit" v-if="currentStep === steps.length">Submit</button>
      </div>
    </div>
  </form>
</template>

<script lang="ts" setup>
import { computed, reactive, ref, toRefs } from "vue";
import { FormStep } from "../types";

const props = defineProps<{ steps: FormStep[] }>();
const formData = reactive<Record<string, any>>({});
const currentStep = ref(1);

const { steps } = toRefs(props);

const isCurrentStepValid = computed(() => {
  const currentFields =
    steps.value.find(({ step }) => step === currentStep.value)?.fields || [];
  return currentFields.every((field) => {
    return !field.required || (field.required && formData[field.label.toLowerCase()]);
  });
});

function nextStep() {
  if (currentStep.value < steps.value.length) {
    currentStep.value++;
  }
}
function prevStep() {
  if (currentStep.value > 1) {
    currentStep.value--;
  }
}
function handleSubmit() {
  console.log(formData);
  // currentStep.value = 1;
  for (const key in formData) {
    delete formData[key];
  }
}
</script>
