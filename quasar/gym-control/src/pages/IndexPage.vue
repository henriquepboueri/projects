<template>
  <q-page class="q-pa-md q-gutter-md">
    <div id="firebaseui-auth-container" />
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
import { Ref, computed, ref, onUnmounted, onMounted } from 'vue';

import * as firebaseui from 'firebaseui';

import { Exercise, Log } from 'src/components/models';
import ExerciseList from 'components/ExerciseList.vue';
import ExerciseAdd from 'components/ExerciseAdd.vue';
import ExerciseLogs from 'components/ExerciseLogs.vue';
import {
  getFirestore,
  collection,
  addDoc,
  deleteDoc,
  doc,
  getDoc,
  setDoc,
  orderBy,
  query,
  onSnapshot,
} from 'firebase/firestore';
import { app } from '../../firebase.conf';

onUnmounted(() => {
  exercisesUnsub();
  historyUnsub();
});

onMounted(() => {
  const ui = firebaseui.auth.AuthUI.getInstance();
  ui?.start('#firebaseui-auth-container', {
    signInOptions: [firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID],
    popupMode: true,
  });
});

const exercises: Ref<Exercise[]> = ref([]);
const showAddExercise = ref(false);
const exerciseLogs: Ref<Log[]> = ref([]);

const db = getFirestore(app);

const historyRef = collection(db, 'history');
const historyQuery = query(historyRef, orderBy('date', 'asc'));
const historyUnsub = onSnapshot(historyQuery, (snapshot) => {
  exerciseLogs.value = [];
  snapshot.forEach((doc) => {
    exerciseLogs.value.push({
      id: doc.id,
      exercise: doc.data().name,
      date: doc.data().date,
      info: doc.data().info,
    });
  });
});

const exercisesRef = collection(db, 'exercises');
const exercisesQuery = query(exercisesRef, orderBy('date', 'asc'));
const exercisesUnsub = onSnapshot(exercisesQuery, (snapshot) => {
  exercises.value = [];
  snapshot.forEach((doc) => {
    exercises.value.push({
      id: doc.id,
      name: doc.data().name,
      date: doc.data().date,
      info: doc.data().info,
    });
  });
});

const logsOrderedByDate = computed(() => {
  const arrangedLogs: { [key: string]: Exercise[] } = {};
  exerciseLogs.value
    .map((log) => ({
      ...log,
      date: log.date
        ? new Date(log.date).toLocaleDateString().slice(0, 10)
        : '',
      exercise: log.exercise,
    }))
    .forEach((log) => {
      if (arrangedLogs[log.date])
        arrangedLogs[log.date].push({ name: log.exercise, info: log.info });
      else arrangedLogs[log.date] = [{ name: log.exercise, info: log.info }];
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

async function onCompleteItem(exerciseParam: Exercise) {
  const id = exerciseParam.id as string;
  const exerciseRef = await getDoc(doc(db, 'exercises', id));
  const exercise = exerciseRef.data() as Exercise;
  console.log(exercise);

  if (!exercise) return;

  const date = Date.now();

  // adds exercise to history
  await addDoc(historyRef, {
    name: exercise.name,
    date,
    info: exerciseParam.info || '',
  });

  // updates exercise's last done date
  await setDoc(doc(db, 'exercises', id), {
    name: exercise.name,
    date,
    info: exerciseParam.info || '',
  });
}

async function onDeleteItem(exerciseParam: Exercise) {
  const id = exerciseParam.id as string;
  await deleteDoc(doc(db, 'exercises', id));
}

function showDialog() {
  showAddExercise.value = true;
}

async function onAddExercise(name: string) {
  if (!name) return;

  await addDoc(exercisesRef, {
    name,
    date: 0,
  });

  showAddExercise.value = false;
}
</script>

<style scoped>
.add-btn {
  bottom: 20px;
  right: 20px;
}
</style>
