export default function salvaLocal(array1, array2, quantState, id) {
  const firstArray = array1;
  let secondArray = array2;
  firstArray.quant = quantState;
  secondArray = secondArray.filter((item) => item.id !== id);
  secondArray.push(firstArray);
  localStorage.setItem('Produtos', JSON.stringify(secondArray));
}
