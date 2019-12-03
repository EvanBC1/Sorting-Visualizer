export default function bubbleSort(arr, savedArray) {
  let sorted = false;
  let sorts = 0;
  savedArray = [];

  while(!sorted) {
    sorts = 0;
    for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i] > arr[i + 1]) {
        let temp = arr[i];
        arr[i] = arr[i + 1];
        arr[i + 1] = temp;

        // making array immutable
        let arr2 = arr.slice();

        savedArray.push(arr2);
        sorts ++;
      }
    }
    if (sorts === 0) {
      sorted = true;
    }
  }
  return savedArray;
}