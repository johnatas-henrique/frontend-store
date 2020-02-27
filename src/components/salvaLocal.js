export default function salvaLocal(array1, array2, quantState, id) {
  array1.quant = quantState;
  array2 = array2.filter((item) => item.id !== id);
  array2.push(array1);
  localStorage.setItem('Produtos', JSON.stringify(array2));
}
