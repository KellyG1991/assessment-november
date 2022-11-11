export default function counter(num = 0): [() => number, () => void] {
  let counter = num;

  const getNum = () => counter;

  const getNext = () => {
    counter++;
  };

  return [getNum, getNext];
}
