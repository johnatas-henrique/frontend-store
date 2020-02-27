export default function salvaLocal(array1, array2, quantState, id) {
  const primeiraArray = array1;
  primeiraArray.quant = quantState;
  const segundaArray = array2;
  segundaArray.filter((item) => item.id !== id);
  segundaArray.push(primeiraArray);
  localStorage.setItem('Produtos', JSON.stringify(segundaArray));
}
