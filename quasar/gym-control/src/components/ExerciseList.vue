<template>
  <div class="col q-gutter-sm">
    <exercise-item
      v-for="exercise in props.exercises"
      :exercise="exercise"
      :key="exercise.id"
      @delete="emits('delete', $event)"
      @done="emits('done', $event)"
    />
  </div>
</template>

<script setup lang="ts">
import ExerciseItem from 'components/ExerciseItem.vue';
import { Exercise } from './models';

const props = defineProps({
  exercises: {
    type: Array as () => Exercise[],
    required: true,
  },
});

const emits = defineEmits(['delete', 'done']);
</script>
