<!-- eslint-disable vue/no-mutating-props -->
<template>
  <q-card class="row full-width justify-between">
    <q-card-section class="q-pa-sm">
      <div class="text-h6">{{ props.exercise.name }}</div>
    </q-card-section>
    <q-card-actions class="q-pa-sm">
      <q-btn flat icon="check" @click="emits('done', exercise)" />
      <q-btn flat icon="delete" @click="emits('delete', exercise)" />
      <q-btn flat icon="add" @click="onAddExerciseInfo" />
    </q-card-actions>
  </q-card>
  <q-dialog v-model="showAddInfo">
    <!-- <exercise-add @add="onAddExercise"></exercise-add> -->
    <q-card>
      <q-card-section>
        <div class="text-h6 text-center">Info</div>
      </q-card-section>
      <q-card-section>
        <q-input v-model="exercise.info" type="text"></q-input>
      </q-card-section>
      <q-card-actions>
        <q-btn flat label="OK" color="primary" @click="onAddExerciseLog" />
        <q-btn flat label="Cancel" color="red" @click="showAddInfo = false" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Exercise } from './models';

const showAddInfo = ref(false);
const props = defineProps({
  exercise: {
    type: Object as () => Exercise,
    required: true,
  },
});
const exercise = ref(props.exercise);

const emits = defineEmits(['delete', 'done']);

const onAddExerciseLog = () => {
  showAddInfo.value = false;
  emits('done', exercise.value);
};

const onAddExerciseInfo = () => {
  showAddInfo.value = true;
  exercise.value.info = '';
};
</script>
