import { connect } from "react-redux"; // Import connect to link Redux store to component
import Cart from "./Cart";              // Import the presentational Cart component

// --------------------------------------------------------
// Map Redux state to component props
// --------------------------------------------------------
function mapStateToProps(state) {
  return {
    totalCost: state.totalCost,      // Pass total cost from store as prop
    productCart: state.productCart   // Pass array of products in cart as prop
  };
}

// --------------------------------------------------------
// Map dispatch actions to component props
// --------------------------------------------------------
function mapDispatchToProps(dispatch) {
  return {
    // Action to add a product to the cart
    onAddProduct: (productName, productPrice) => dispatch({
      type: "addProduct",           // Action type
      productData: {                // Payload containing product details
        productName: productName,
        productPrice: productPrice
      }
    }),

    // Action to delete a product from the cart
    onDeleteProduct: (productData) => dispatch({
      type: "deleteProduct",        // Action type
      productData: productData      // Payload with product to remove
    })
  };
}

// --------------------------------------------------------
// Connect the Cart component to the Redux store
// - Provides state and dispatch props
// --------------------------------------------------------
const connectedComponent = connect(
  mapStateToProps,     // Maps state to props
  mapDispatchToProps   // Maps dispatch functions to props
)(Cart);

// Export the connected component
export default connectedComponent;
