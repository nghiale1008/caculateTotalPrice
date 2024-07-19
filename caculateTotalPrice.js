const products = {
  1: 3, 
  4: 4, 
  3: 5
};

const Url = "https://fakestoreapi.com/products";

async function getProductPrice(productId) {
  try { 
    const response = await fetch(`${Url}/${productId}`);
  
    if(!response.ok) {
      throw new Error(`Error fetchning product with ID ${productId}: ${response.status}`);
    }

    const productData = await response.json();

    return productData.price;
  } catch(error) {
    console.error(error);
    return null;
  }
}

async function caculateTotalPrice() {
  let totalPrice = 0;
  for(let productId in products) {
    const quantity = products[productId];
    const price = await getProductPrice(productId);

    if(price !== null) {
      totalPrice += quantity*price;
    }

    else {
      console.log(`Skipping product with ID ${productId} due to an error`);
    }
  }

  return totalPrice.toFixed(2);
}