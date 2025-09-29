import { ensureElement } from "../../../utils/utils";
import { IProduct } from "../../../types/index.ts";  
import { Card } from "./Card.ts";
import { IEvents } from "../../base/Events.ts";

interface ICardBasket extends Pick<IProduct, 'id' | 'title' | 'price' | 'image' | 'description' | 'category'> {
  counter: number;
}

export class CardBasket extends Card<ICardBasket> {
  protected productCounter: HTMLElement
  protected deleteProductButton: HTMLButtonElement;

  constructor(protected events: IEvents, container: HTMLElement) {
    super(container);
    this.productCounter = ensureElement<HTMLElement>('.basket__item-index', this.container);

    this.deleteProductButton = ensureElement<HTMLButtonElement>('.basket__item-delete', this.container);

    this.deleteProductButton.addEventListener("click", () => {
      const id = this.container.dataset.id;
      if (id) {
        this.events.emit("cart:removeFromBasket", { id: id, fromPreview: false });
      }
    });
} 

  set counter(value: number) {
    this.productCounter.textContent = String(value);
  }
}