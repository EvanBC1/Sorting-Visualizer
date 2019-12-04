function selectionSort(arr) {
  console.log(arr);

  for (let i = 0; i < arr.length - 1; i++) {
    let sorted = false;
    for (let j = i + 1; j < arr.length; j++) {
      console.log(`p of i = ${i}`,`v of i = ${arr[i]}`, `p of j = ${j}`, `v of j = ${arr[j]}`);
      if (arr[i] > arr[j]) {
        let temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
        console.log(arr);
        sorted = true;
      }
    }
    if (sorted === false) {
      return;
    }
  }
}

console.log(selectionSort([3,9,6,1,2]));