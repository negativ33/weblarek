import { ensureElement } from "../../../utils/utils";
import { IProduct } from "../../../types/index.ts";  
import { Card } from "./Card.ts";
import { categoryMap } from "../../../utils/constants.ts";

export interface ICardActions {
  onClick?: (event: MouseEvent) => void;
}

type categoryKey = keyof typeof categoryMap;

export type TCardCatalog = Pick<IProduct, "category" | "title" | "image" | "price" | "id" | "description">;

export class CardCatalog extends Card<TCardCatalog> {
  protected productImage: HTMLImageElement;
  protected productCategory: HTMLElement;

  constructor(container: HTMLElement, actions?: ICardActions) {
    super(container);
    this.productImage = ensureElement<HTMLImageElement>('.card__image', this.container);
    this.productCategory = ensureElement<HTMLElement>('.card__category', this.container);

    if (actions?.onClick) {
      this.container.addEventListener('click', actions.onClick);
    }
  }

  set category(value: string) {
    this.productCategory.textContent = value;
    for ( const key in categoryMap) {
      this.productCategory.classList.toggle(
        categoryMap[key as categoryKey],
        key === value
      )
    }
  }

  set image(value: string) {
    this.setImage(this.productImage, value, this.title);
  }
}