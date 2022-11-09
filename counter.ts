export default function counter(num = 0) {
  let counter = num;

  const getNum = () => counter;

  const getNext = () => {
    counter++;
    return null;
  };

  return [getNum, getNext];
}
