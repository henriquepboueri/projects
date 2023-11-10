<template>
  <q-card class="row full-width justify-between">
    <q-card-section class="">
      <div class="text-h6">{{ props.exercise.name }}</div>
    </q-card-section>
    <q-card-actions class="">
      <q-btn flat icon="check" @click="emits('done', props.exercise.id)" />
      <q-btn flat icon="delete" @click="emits('delete', props.exercise.id)" />
    </q-card-actions>
  </q-card>
</template>

<script setup lang="ts">
const props = defineProps({
  exercise: {
    type: Object as () => Exercise,
    required: true,
  },
});

const emits = defineEmits(['delete', 'done']);

import { Exercise } from './models';
</script>
