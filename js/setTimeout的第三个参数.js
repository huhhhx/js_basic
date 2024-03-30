for (var i = 0; i < 5; i++) {
  setTimeout(
    (j) => {
      console.log(j);
    },
    1000,
    i
  );
}
