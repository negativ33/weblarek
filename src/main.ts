import './scss/styles.scss';
import { apiProducts } from "./utils/data";
import { Products } from "./components/Models/Products";
import { Cart } from "./components/Models/Cart";
import { Buyer } from "./components/Models/Buyer";
import { Api } from "./components/base/Api";
import { LarekApi } from "./components/Api/LarekApi";
import { API_URL } from "./utils/constants";

const productsModel = new Products();
const cart = new Cart();
const buyer = new Buyer();
const api = new Api(API_URL);
const larekApi = new LarekApi(api);

productsModel.setItems(apiProducts.items);
console.log("Каталог:", productsModel.getItems());
console.log("Товар по id", productsModel.getById(apiProducts.items[2].id));
productsModel.setSelected(apiProducts.items[3]);
console.log("Выбранная карточка", productsModel.getSelected())


console.log("Пустая корзина:", cart.getItems(), "Кол-во:", cart.getCount(), "Сумма:", cart.getTotal());
cart.addItem(apiProducts.items[3]);
cart.addItem(apiProducts.items[1])
console.log("Корзина после добавления товара:", cart.getItems(), "Кол-во:", cart.getCount(), "Сумма:", cart.getTotal());
console.log("Есть ли товар в корзине c айди:", apiProducts.items[1].id, cart.hasItem(apiProducts.items[1].id))
cart.removeItem(apiProducts.items[1]);
console.log("Корзина после удаления 1 товара:", cart.getItems(), "Кол-во:", cart.getCount(), "Сумма:", cart.getTotal())
cart.clear()
console.log("Корзина после полной отчистки:", cart.getItems, "Кол-во:", cart.getCount(), "Сумма:", cart.getTotal())


buyer.setAddress("Москва");
buyer.setEmail("test123@test.ru");
buyer.setPhone("79111111111")
buyer.setPayment("card")
console.log("Данные покупателя:", buyer.getData());
console.log("Проверка данных покупателя:",
"Email:", buyer.isEmailValid(),"Phone:", buyer.isPhoneValid(),"Address:", buyer.isAddressValid(),"Payment:", buyer.isPaymentValid())
buyer.clearData();
console.log("Данные плкупателя после отчистки", buyer.getData());

larekApi.getProducts()
  .then((products) => {
    productsModel.setItems(products);
    console.log("Каталог с сервера:", productsModel.getItems());
  })
  .catch((err) => {
    console.error("Ошибка загрузки товаров:", err);
  });
