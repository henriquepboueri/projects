const setTimer = (duration) => {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('Test');
    }, duration);
  });
  return promise;
};

setTimer().then((value) => console.log(`Resolved: ${value}`));
