<script setup lang="ts">
import { computed, ref } from "vue";

const props = defineProps<{ source: Array<string>; modelValue: string }>();

const emit = defineEmits(["update:modelValue"]);

const search = ref("");

const searcRes = computed(() => {
  if (search.value === "") {
    return props.source;
  }

  return props.source.filter((item) => {
    if (item.toLowerCase().includes(search.value.toLowerCase())) return item;
  });
});

const isOpen = ref(false);

const setSelected = (item: string) => {
  isOpen.value = false;
  search.value = item;
  emit("update:modelValue", search.value);
};

const handleInput = (e: Event) => {
  isOpen.value = true;
  search.value = (e.target as HTMLInputElement).value;
  emit("update:modelValue", search.value);
};

const handleFocus = () => {
  isOpen.value = true;
};

const handleBlur = () => {
  isOpen.value = false;
};
</script>

<template>
  <div class="w-full relative">
    <input
      type="text"
      :value="modelValue"
      @input="handleInput"
      @focus="handleFocus"
      @blur="handleBlur" />
    <ul
      v-show="searcRes.length && isOpen"
      class="absolute w-full flex items-center flex-col">
      <li v-for="res in searcRes" :key="res" @click="setSelected(res)">
        {{ res }}
      </li>
    </ul>
  </div>
</template>
