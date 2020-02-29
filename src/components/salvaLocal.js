export default function salvaLocal(obj1, obj2, quantState, id) {
  const firstObject = obj1;
  let secondObject = obj2;
  firstObject.quant += quantState;
  secondObject = secondObject.filter((item) => item.id !== id);
  secondObject.push(firstObject);
  localStorage.setItem('Produtos', JSON.stringify(secondObject));
}
