export default function selectionSort(arr, savedArray) {
  let arr2 = arr.slice();
  savedArray = [];
  savedArray.push(arr2);
  // repeat (number of elements -1 times)
  for (let i = 0; i < arr.length - 1; i++) {
    // set the first unsorted element as the minimum
    let minIndex = i;
    // for each of the unsorted elements
    for (let j = i + 1; j < arr.length; j++) {
      // if element < current minimum
      savedArray.push([j, minIndex]);
      if (arr[j] < arr[minIndex]) {
        // set element as new minimum
        minIndex = j;
      }

      }
      // swap minimum with the first unsorted position)
    let temp = arr[i];
    arr[i] = arr[minIndex];
    arr[minIndex] = temp;

    arr2 = arr.slice();
    savedArray.push(arr2);
    }
savedArray.push([0,0]);
  return savedArray;
  }




