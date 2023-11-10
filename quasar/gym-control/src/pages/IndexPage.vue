<template>
  <q-page class="q-pa-md q-gutter-md">
    <exercise-list
      :exercises="exercises"
      @done="onCompleteItem"
      @delete="onDeleteItem"
    />
    <q-separator />
    <exercise-logs :logs="logsOrderedByDate" />
    <q-btn
      rounded
      icon="add"
      class="add-btn fixed-bottom-right"
      @click="showDialog"
    />
    <q-dialog v-model="showAddExercise">
      <exercise-add @add="onAddExercise"></exercise-add>
    </q-dialog>
  </q-page>
</template>

<script setup lang="ts">
import { Ref, computed, ref } from 'vue';
import { Exercise, Log } from 'src/components/models';

import ExerciseList from 'components/ExerciseList.vue';
import ExerciseAdd from 'components/ExerciseAdd.vue';
import ExerciseLogs from 'components/ExerciseLogs.vue';
import { useCollection } from 'vuefire';
import { getFirestore, collection } from 'firebase/firestore';
import { app } from '../../firebase.conf';
import { doc, setDoc, addDoc } from 'firebase/firestore';

const db = getFirestore(app);
const exercisesRef = useCollection(collection(db, 'exercises'));

const showAddExercise = ref(false);
const exercises: Ref<Exercise[]> = ref([
  { id: 1, name: 'Bench Press' },
  { id: 2, name: 'Pull Ups' },
  { id: 3, name: 'Deadlift' },
  { id: 4, name: 'Tríceps' },
  { id: 5, name: 'Bíceps' },
  { id: 6, name: 'Ombro' },
  { id: 7, name: 'Cardio' },
  { id: 8, name: 'Perna' },
]);

const exerciseLogs: Ref<Log[]> = ref([
  { date: new Date('2019-05-11'), exercise: { name: 'Perna' } },
  { date: new Date('2022-01-05'), exercise: { name: 'Tríceps' } },
  { date: new Date('2021-03-23'), exercise: { name: 'Bíceps' } },
  { date: new Date('2022-01-05'), exercise: { name: 'Cardio' } },
  { date: new Date('2020-07-10'), exercise: { name: 'Ombro' } },
]);
const logsOrderedByDate = computed(() => {
  const arrangedLogs: { [key: string]: string[] } = {};
  exerciseLogs.value
    .map((log) => ({
      ...log,
      date: log.date.toISOString().slice(0, 10),
      exercise: log.exercise.name,
    }))
    .forEach((log) => {
      if (arrangedLogs[log.date]) arrangedLogs[log.date].push(log.exercise);
      else arrangedLogs[log.date] = [log.exercise];
    });

  return Object.entries(arrangedLogs)
    .map((log) => ({
      exercises: log[1],
      date: log[0].split('-').reverse().join('/'),
      dateObj: new Date(log[0]),
    }))
    .sort((a, b) => a.dateObj.getTime() - b.dateObj.getTime())
    .reverse();
});

function onCompleteItem(id: number) {
  const exercise = onDeleteItem(id);

  if (exercise) {
    exercises.value.push(exercise);
    exerciseLogs.value.push({
      date: new Date(),
      exercise,
    });
  }
}

function onDeleteItem(id: number) {
  const exercise = exercises.value.find((e) => e.id === id);

  if (exercise) {
    exercises.value.splice(exercises.value.indexOf(exercise), 1);
    return exercise;
  }
}

function showDialog() {
  showAddExercise.value = true;
}

async function onAddExercise(name: string) {
  if (!name) return;

  await addDoc(collection(db, 'exercises'), {
    name,
    dateObj: Date.now(),
    date: new Date().toISOString().slice(0, 10),
  });

  exercises.value.unshift({ id: Date.now(), name });
  showAddExercise.value = false;
}
</script>

<style scoped>
.add-btn {
  bottom: 20px;
  right: 20px;
}
</style>
