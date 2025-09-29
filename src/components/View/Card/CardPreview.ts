import { ensureElement } from "../../../utils/utils";
import { IProduct } from "../../../types/index.ts";  
import { Card } from "./Card.ts";
import { IEvents } from "../../base/Events.ts";
import { categoryMap } from "../../../utils/constants.ts"

interface ICardPreview extends Pick<IProduct, "id" | "title"> {
  price: number | null;
  category: string;
  image: string;
  description: string;
  inBasket: boolean;
}

type CategoryKey = keyof typeof categoryMap;

export class CardPreview extends Card<ICardPreview> {
  protected productCategory: HTMLElement;
  protected productImage: HTMLImageElement;
  protected productDescription: HTMLElement;
  protected productInBasket: boolean = false
  protected productButton: HTMLButtonElement;

  constructor(protected events: IEvents, container: HTMLElement) {
    super(container);
    this.productCategory = ensureElement<HTMLElement>('.card__category', this.container);
    this.productImage = ensureElement<HTMLImageElement>('.card__image', this.container);
    this.productDescription = ensureElement<HTMLElement>('.card__text', this.container);
    this.productButton = ensureElement<HTMLButtonElement>('.card__button', this.container);

    this.productButton.addEventListener('click', () => {
      if (this.productInBasket) {
      this.events.emit("cart:removeFromBasket", { id: this.productId, fromPreview: true});
    } else {
      this.events.emit("cart:addToBasket", { id: this.productId });
    }
    })
  }

  set descripton(value: string) {
    this.productDescription.textContent = value;
  }

  set category(value: string) {
    this.productCategory.textContent = value;
    for ( const key in categoryMap) {
      this.productCategory.classList.toggle(
        categoryMap[key as CategoryKey],
        key === value
      )
    }
  }

  set image(value: string) {
    this.setImage(this.productImage, value, this.title);
  }

  set inBasket(value: boolean) {
    this.productInBasket = value;
    if (value) {
      this.productButton.textContent = 'Удалить из корзины';
    } else {
      this.productButton.textContent = 'Купить';
    }
  }

  set price(value:number | null) {
    super.price = value;
    if (value === null) {
      this.productButton.textContent = 'Недоступно';
      this.productButton.disabled = true;
    } else {
      this.productButton.disabled = false;
    }
  }
}