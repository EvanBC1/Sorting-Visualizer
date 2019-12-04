export default function selectionSort(arr) {
  console.log(arr);

  // repeat (number of elements -1 times
  for (let i = 0; i < arr.length - 1; i++) {
    // set the first unsorted element as the minimum
    let minIndex = i;
    // for each of the unsorted elements
    for (let j = i + 1; j < arr.length; j++) {
      // if element < current minimum
      if (arr[j] < arr[minIndex]) {
        // set element as new minimum
        minIndex = j;
      }
      }
      // swap minimum with the first unsorted position)
    let temp = arr[i];
    arr[i] = arr[minIndex];
    arr[minIndex] = temp;

    }
  }


selectionSort([3,9,6,1,2,8,34,15,1,8,0,-5]);

// console.log(`p of i = ${i}`,`v of i = ${arr[i]}`, `p of j = ${j}`, `v of j = ${arr[j]}`);