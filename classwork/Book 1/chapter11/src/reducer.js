// --------------------------------------------------------
// Reducer function for managing cart state
// - Handles adding and deleting products
// - Returns new state based on action type
// --------------------------------------------------------
function cartReducer(state, action) {

  // ------------------------------------------------------
  // Initial state setup if state is undefined
  // - totalCost: Total cost of products in the cart
  // - productCart: Array of products in the cart
  // ------------------------------------------------------
  if (state === undefined) {
    return {
      totalCost: 0,
      productCart: []
    };
  }

  // ------------------------------------------------------
  // Handle different action types
  // ------------------------------------------------------
  switch (action.type) {

    // ----------------------------------------------------
    // Add product to cart
    // - Update totalCost
    // - Append new product to productCart
    // ----------------------------------------------------
    case "addProduct":
      return {
        ...state, // Copy existing state
        totalCost: state.totalCost + parseInt(action.productData.productPrice),
        productCart: state.productCart.concat({
          productName: action.productData.productName,
          productPrice: action.productData.productPrice
        })
      };

    // ----------------------------------------------------
    // Delete product from cart
    // - Remove product from productCart
    // - Deduct its price from totalCost
    // ----------------------------------------------------
    case "deleteProduct":
      const updatedArray = state.productCart.filter(product =>
        product.productName !== action.productData.productName
      );
      return {
        ...state, // Copy existing state
        totalCost: state.totalCost - parseInt(action.productData.productPrice),
        productCart: updatedArray
      };

    // ----------------------------------------------------
    // Default case: return current state unchanged
    // ----------------------------------------------------
    default:
      return state;
  }
}

// Export reducer for creating Redux store
export default cartReducer;
