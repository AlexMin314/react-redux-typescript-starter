// CURRENCIES
const _toDollor = (n: number) =>
  Number(n).toLocaleString('en-US', { style: 'currency', currency: 'USD' });

export const currencyFormatter = new Map();
currencyFormatter.set('$', (n: number) => _toDollor(Number(n)).slice(0, -3));
currencyFormatter.set('$.00', _toDollor);
