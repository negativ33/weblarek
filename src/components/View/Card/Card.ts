import { Component } from "../../base/Component";
import { ensureElement } from "../../../utils/utils";
import { IProduct } from "../../../types/index.ts";  

export abstract class Card<T extends IProduct> extends Component<T> {
  protected productTitle: HTMLElement;
  protected productPrice: HTMLElement;
  protected productId: string = '';
  
  constructor(container: HTMLElement) {
    super(container);
    this.productTitle = ensureElement<HTMLElement>('.card__title', this.container);
    this.productPrice = ensureElement<HTMLElement>('.card__price', this.container);
  }

  set title(value: string) { this.productTitle.textContent = value; }
  set price(value: number | null) {
    if (value === null) {
      this.productPrice.textContent = 'Бесценно';
    } else {
      this.productPrice.textContent = `${value} синапсов`;
    }
  }
  set id(value: string) {
   this.productId = value;
   this.container.dataset.id= value;
  }

}