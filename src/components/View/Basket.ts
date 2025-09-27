import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/Events";
import { Component } from "../base/Component";

interface IBasket {
  basketList: HTMLElement[];
  basketPrice: number;
}

export class Basket extends Component<IBasket> {
  protected basketListElement: HTMLElement;
  protected basketPriceElement: HTMLElement;
  protected basketButton: HTMLButtonElement;

  constructor(protected container: HTMLElement, protected events: IEvents) {
    super(container);
    this.basketListElement = ensureElement<HTMLElement>(".basket__list", this.container);
    this.basketPriceElement = ensureElement<HTMLElement>(".basket__price", this.container);
    this.basketButton = ensureElement<HTMLButtonElement>(".basket__button", this.container);

    this.basketButton.addEventListener("click", () => {
      this.events.emit("cart:checkout");
    });
  }

  set basketList(list: HTMLElement[]) {
    if (list.length === 0) {
      this.basketListElement.textContent = "Корзина пуста";
      this.basketButton.disabled = true;
    } else {
      this.basketListElement.innerHTML = "";
      list.forEach(item => this.basketListElement.appendChild(item));
      this.basketButton.disabled = false;
    }
  }

  set basketPrice(price: number) {
    this.basketPriceElement.textContent = `${price} синапсов`;
  }
}
