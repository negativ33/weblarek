import './scss/styles.scss';
import { Products } from "./components/Models/Products";
import { Cart } from "./components/Models/Cart";
import { Buyer } from "./components/Models/Buyer";
import { Api } from "./components/base/Api";
import { LarekApi } from "./components/Api/LarekApi";
import { API_URL } from "./utils/constants";
import { CDN_URL  } from "./utils/constants";
import { EventEmitter } from './components/base/Events';
import { Basket } from './components/View/Basket';
import { Gallery } from './components/View/Gallery';
import { Header } from './components/View/Header';
import { Modal } from './components/View/Modal';
import { Success } from './components/View/Success';
import { CardBasket } from './components/View/Card/CardBasket';
import { CardCatalog } from './components/View/Card/CardCatalog';
import { CardPreview } from './components/View/Card/CardPreview';
import { FormContacts } from './components/View/Form/FormContacts';
import { FormOrder } from './components/View/Form/FormOrder';
import { cloneTemplate } from './utils/utils';
import { ensureElement } from './utils/utils';
import { IProduct, TPayment, IOrder, ICartAction, IOrderForm, IContactsForm} from './types';

const cardPreviewTemplate = ensureElement<HTMLTemplateElement>("#card-preview");
const galleryElement = document.querySelector(".gallery") as HTMLElement;
const basketTemplate = ensureElement<HTMLTemplateElement>("#basket");
const modalContainer = ensureElement<HTMLElement>("#modal-container");
const contactsTemplate = ensureElement<HTMLTemplateElement>("#contacts");
const cardBasketTemplate = ensureElement<HTMLTemplateElement>("#card-basket");
const headerElement = document.querySelector(".header") as HTMLElement;
const orderTemplate = ensureElement<HTMLTemplateElement>("#order");
const cardCatalogTemplate = ensureElement<HTMLTemplateElement>("#card-catalog");
const successTemplate = ensureElement<HTMLTemplateElement>("#success");

const events = new EventEmitter();
export const productsModel = new Products(events);
export const cartModel = new Cart(events);
export const buyerModel = new Buyer(events);
export const api = new Api(API_URL);
export const larekApi = new LarekApi(api);
export const header = new Header(events, headerElement);
export const gallery = new Gallery(galleryElement);
export const modal = new Modal(events, modalContainer);

events.on("items:changed", () => {
  const products = productsModel.getItems();
  const itemsCards = products.map((product) => {
    const card = new CardCatalog(cloneTemplate(cardCatalogTemplate), {
      onClick: () => events.emit("card:select", product),
    });
    card.id = product.id;
    card.title = product.title;
    card.category = product.category;
    card.image = CDN_URL + product.image;
    card.price = product.price;
    return card.render();
  });
  gallery.catalog = itemsCards;
});

events.on("cart:open", () => {
  const basketItems = cartModel.getItems();
  const basketElements = basketItems.map((item, index) => {
    const basketCardContainer = cloneTemplate(cardBasketTemplate);
    const basketCard = new CardBasket(events, basketCardContainer);
    return basketCard.render({
      ...item,
      counter: index + 1,
    });
  });
  const basketContainer = cloneTemplate(basketTemplate);
  const basket = new Basket(basketContainer, events);
  const basketContent = basket.render({
    basketList: basketElements,
    basketPrice: cartModel.getTotal(),
  });
  modal.contentSet = basketContent;
  modal.open();
});

events.on("cart:addToBasket", (data: ICartAction) => {
  const product = productsModel.getById(data.id);
  if (product) {
    cartModel.addItem(product);
    modal.close();
  }
});


events.on("cart:removeFromBasket", (data: ICartAction) => {
  const product = productsModel.getById(data.id);
  if (product) {
    cartModel.removeItem(product);
    modal.close();
  }
});

events.on("selected:changed", (product: IProduct) => {
  const inBasket = cartModel.hasItem(product.id);
  const previewCard = new CardPreview(events, cloneTemplate(cardPreviewTemplate));
  previewCard.id = product.id;
  previewCard.title = product.title;
  previewCard.category = product.category;
  previewCard.image = CDN_URL + product.image;
  previewCard.price = product.price;
  previewCard.descripton = product.description;
  previewCard.inBasket = inBasket;
  modal.contentSet = previewCard.render();
  modal.open();
});

events.on("card:select", (product: IProduct) => {
  productsModel.setSelected(product);
});

events.on("cart:changed", () => {
  const count = cartModel.getCount();
  header.counter = count;
});

events.on("cart:checkout", () => {
  const orderForm = new FormOrder(events, cloneTemplate(orderTemplate));
  const renderOrder = orderForm.render();
  modal.contentSet = renderOrder;
});

events.on("order:next", (data: IOrderForm) => {
  buyerModel.setPayment(data.payment as TPayment);
  buyerModel.setAddress(data.address);
  const contactsForm = new FormContacts(events, cloneTemplate(contactsTemplate));
  const renderContacts = contactsForm.render();
  modal.contentSet = renderContacts;
});

events.on("success:close", () => {
  modal.close();
});

events.on("order:submit", async (data: IContactsForm) => {
  buyerModel.setEmail(data.email);
  buyerModel.setPhone(data.phone);

  const buyerData = buyerModel.getData();


  const requiredFields: (keyof typeof buyerData)[] = ["email", "phone", "address", "payment"];

 
  const missingFields = requiredFields.filter(field => !buyerData[field]);
  if (missingFields.length > 0) {
    console.error("Данные не заполнены. Пропущенные поля:", missingFields, "Текущие данные:", buyerData);
    return;
  }

  const orderData: IOrder = {
    payment: buyerData.payment as "card" | "cash",
    email: buyerData.email,
    phone: buyerData.phone,
    address: buyerData.address,
    total: cartModel.getTotal(),
    items: cartModel.getItems().map(item => item.id),
  };

  try {
    const response = await larekApi.sendOrder(orderData);
    const success = new Success(events, cloneTemplate(successTemplate));
    success.total = response.total;
    const renderSuccess = success.render();
    modal.contentSet = renderSuccess;
    modal.open();
    cartModel.clear();
    buyerModel.clearData();
    header.counter = cartModel.getCount();
  } catch (error) {
    console.error("Ошибка при оформлении заказа:", error);
  }
});



larekApi.getProducts()
  .then((response) => {
    if (response && Array.isArray(response.items)) {
      productsModel.setItems(response.items);
    } else {
      console.error("Ошибка: API вернул неожиданные данные", response);
    }
  })
  .catch((err) => {
    console.error("Ошибка загрузки товаров:", err);
  });