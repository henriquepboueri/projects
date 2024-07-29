<template>
  <q-card class="">
    <div class="text-center">
      <span class="text-h6">History</span>
    </div>
    <div
      v-for="(exercisesPerDay, index) in props.logs"
      :key="index"
      class="text-center text-bold q-pa-sm"
    >
      {{ exercisesPerDay.date }}
      <div
        v-for="(exercise, index) in exercisesPerDay.exercises"
        :key="index"
        class="text-left text-weight-regular"
      >
        <span v-if="exercise.info">
          {{ +index + 1 }} - {{ exercise.name }}({{ exercise.info }})
        </span>
        <span v-else> {{ +index + 1 }} - {{ exercise.name }} </span>
      </div>
      <q-separator inset class="separator" v-if="index < logLength - 1" />
    </div>
  </q-card>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Exercise } from './models';

const props = defineProps({
  logs: {
    type: Object as () => {
      exercises: Exercise[];
      date: string;
      dateObj: Date;
    }[],
    required: true,
  },
});
const logLength = computed(() => Object.keys(props.logs).length);
</script>

<style lang="scss" scoped>
.separator {
  margin-top: 5px;
  margin-bottom: 5px;
}
</style>
