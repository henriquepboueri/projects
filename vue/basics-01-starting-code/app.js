const app = Vue.createApp({
  data() {
    return {
      goals: [],
      enteredValue: '',
    };
  },
});

app.mount('#user-goal')
