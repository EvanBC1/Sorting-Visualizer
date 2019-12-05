
export default function generateArray (arrLength) {
  let arr = [];
  for (let i = 0; i < arrLength; i++) {
    arr.push(Math.ceil(Math.random() * arrLength));
  }
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
