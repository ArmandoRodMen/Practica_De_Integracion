import { cartsModel } from "../models/carts.model.js"

class CartsManager{
  async createCart(){
      const newCart = { products:[]};
      const response = await cartsModel.create(newCart);
      return response;
  }
  async findCartById(idCart){
      const response = await cartsModel.findById(idCart).populate("products.product");
      return response;
  }
  async addProductToCart(idCart, idProduct){
      const cart = await cartsModel.findById(idCart);

      const productIndex = cart.products.findIndex(
          (p)=>p.product.equals(idProduct)
      );

      if(productIndex===-1){
          cart.products.push({product: idProduct, quantity:1});
      }else{
          cart.products[productIndex].quantity++;
      }
      return cart.save();
  }
  async getCarts() {
      const carts = await cartsModel.find();
      return carts;
  }
}

export const cartsManager = new CartsManager();
