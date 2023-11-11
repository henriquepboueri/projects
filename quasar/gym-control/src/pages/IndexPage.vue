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
import { Ref, computed, onBeforeMount, ref } from 'vue';
import { Exercise, Log } from 'src/components/models';

import ExerciseList from 'components/ExerciseList.vue';
import ExerciseAdd from 'components/ExerciseAdd.vue';
import ExerciseLogs from 'components/ExerciseLogs.vue';
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
} from 'firebase/firestore';
import { app } from '../../firebase.conf';

onBeforeMount(async () => {
  const exercisesSnapshot = await getDocs(collection(db, 'exercises'));
  exercisesSnapshot.forEach((doc) => {
    exercises.value.push({ id: doc.id, name: doc.data().name });
  });

  const historySnapshot = await getDocs(collection(db, 'history'));
  historySnapshot.forEach((doc) => {
    exerciseLogs.value.push({
      date: doc.data().date,
      exercise: doc.data().name,
    });
  });
});

const db = getFirestore(app);
const historyRef = collection(db, 'history');
const exercisesRef = collection(db, 'exercises');

const showAddExercise = ref(false);
const exercises: Ref<Exercise[]> = ref([]);

const exerciseLogs: Ref<Log[]> = ref([]);
const logsOrderedByDate = computed(() => {
  const arrangedLogs: { [key: string]: string[] } = {};
  exerciseLogs.value
    .map((log) => ({
      ...log,
      date: new Date(log.date).toLocaleDateString().slice(0, 10),
      exercise: log.exercise,
    }))
    .forEach((log) => {
      if (arrangedLogs[log.date]) arrangedLogs[log.date].push(log.exercise);
      else arrangedLogs[log.date] = [log.exercise];
    });

  return Object.entries(arrangedLogs)
    .map((log) => {
      const [mes, dia, ano] = log[0].split('/');
      return {
        exercises: log[1],
        date: `${dia}/${mes}/${ano}`,
        dateObj: new Date(log[0]),
      };
    })
    .sort((a, b) => a.dateObj.getTime() - b.dateObj.getTime())
    .reverse();
});

async function onCompleteItem(id: string) {
  const exercise = onDeleteItem(id);

  if (exercise) {
    await addDoc(historyRef, {
      name: exercise.name,
      date: Date.now(),
    });
    exerciseLogs.value.push({
      date: Date.now(),
      exercise: exercise.name,
    });
    await addDoc(exercisesRef, {
      name: exercise.name,
    });
    exercises.value.push(exercise);
  }
}

function onDeleteItem(id: string) {
  const exercise = exercises.value.find((e) => e.id === id);

  if (exercise) {
    exercises.value.splice(exercises.value.indexOf(exercise), 1);
    deleteDoc(doc(db, 'exercises', id));
    return exercise;
  }
}

function showDialog() {
  showAddExercise.value = true;
}

async function onAddExercise(name: string) {
  if (!name) return;

  await addDoc(exercisesRef, {
    name,
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
