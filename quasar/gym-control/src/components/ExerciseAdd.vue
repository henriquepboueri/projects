<template>
  <q-card>
    <q-card-section class="col items-center">
      <div class="text-h6">Novo exercício</div>
      <q-input v-model="name" type="text" />
    </q-card-section>
    <q-card-actions align="right">
      <q-btn flat label="Salvar" color="primary" @click="emits('add', name)" />
    </q-card-actions>
  </q-card>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const emits = defineEmits(['add']);

const name = ref('');
</script>
