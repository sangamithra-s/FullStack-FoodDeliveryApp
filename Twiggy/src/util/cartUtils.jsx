export const calculateCartTotals = (cartItems, quantity) => {
  const subtotal = cartItems.reduce((total, food) => {
    return total + food.price * quantity[food.id];
  }, 0);

  const shipping = subtotal > 0 ? 10 : 0; // Example shipping cost
  const tax = subtotal > 0 ? subtotal * 0.1 : 0; // Example tax rate of 10%
  const total = subtotal + shipping + tax;

  return { subtotal, shipping, tax, total };
};
