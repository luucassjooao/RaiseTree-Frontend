export function GetRandomIndex<T>(array: Array<T>) {
  const randomIndex = Math.floor(Math.random() * array.length);

  const item = array[randomIndex];

  return item;
}
