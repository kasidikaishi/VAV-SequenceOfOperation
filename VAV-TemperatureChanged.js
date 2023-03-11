var temperatureChange = function(T, Ts, SA, A) {
  while (T - Ts < 0) {
    // increase temperature -> decrease airflow -> decrease SA
    // every second
    {
      SA = SA - 10;
      T = T + 0.1;
      // print SA and T
    }
  }
  while (T - Ts > 0) {
    // decrease temperature -> increase airflow -> increase SA
    // every second
    {
      SA = SA + 10;
      T = T - 0.1;
      // print SA and T
    }
  }
}
