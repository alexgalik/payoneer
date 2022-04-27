import { random } from "lodash";

export const getTotal = (store) => {
  const { list, checkout } = store;
  const totalCount = Object.values(checkout).reduce((acc, cur) => acc + cur, 0);
  const totalPrice = Object.entries(checkout)
    .reduce((acc, cur) => {
      const item = list.find(({ sku }) => sku === Number(cur[0]));
      return acc + cur[1] * item.price;
    }, 0)
    .toFixed(2);
  return { totalCount, totalPrice };
};

export const createNewListItem = (sku) => {
  const currentSku = sku + 1;
  return {
    sku: currentSku,
    basketLimit: random(1, 5),
    price: Number(random(1.11, 10.1).toFixed(2)),
    name: `Product ${currentSku}`,
    description: `Product ${currentSku} description`,
  };
};
