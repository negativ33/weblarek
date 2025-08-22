import './scss/styles.scss';
import { apiProducts } from "./utils/data";
import { Products } from "./components/Models/Products";
import { Cart } from "./components/Models/Cart";
import { Buyer } from "./components/Models/Buyer";
import { Api } from "./components/base/Api";
import { LarekApi } from "./components/Api/LarekApi.ts";

const productsModel = new Products();
productsModel.setItems(apiProducts.items);
console.log("Каталог:", productsModel.getItems());

const cart = new Cart();
cart.addItem(apiProducts.items[0]);
console.log("Корзина:", cart.getItems());

const buyer = new Buyer();
buyer.setData({
  payment: "card",
  email: "test@test.com",
  phone: "1234567890",
  address: "Москва"
});
console.log("Покупатель:", buyer.getData(), "валидность:", buyer.validate());



const productsModel2 = new Products();


const api = new Api("https://larek-api.nomoreparties.co");

const larekApi = new LarekApi(api);


larekApi.getProducts()
  .then((products) => {
    productsModel2.setItems(products);
    console.log("Каталог с сервера:", productsModel2.getItems());

    const cart = new Cart();
    cart.addItem(products[0]); 
    console.log("Корзина:", cart.getItems());

    const buyer = new Buyer();
    buyer.setData({
      payment: "card",
      email: "test@test.com",
      phone: "1234567890",
      address: "Москва"
    });
    console.log("Покупатель:", buyer.getData(), "валидность:", buyer.validate());
  })
  .catch((err) => {
    console.error("Ошибка загрузки товаров:", err);
  });
