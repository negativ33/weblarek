import { IProduct } from "../../types/index.ts";

export class Products {
  private items: IProduct[] = [];
  private selected: IProduct | null = null;

  setItems(items: IProduct[]): void {
    this.items = items;
  }

  getItems(): IProduct[] {
    return this.items;
  }

  getById(id: string): IProduct | undefined {
    return this.items.find(p => p.id === id);
  }

  setSelected(product: IProduct): void {
    this.selected = product;
  }

  getSelected(): IProduct | null {
    return this.selected;
  }
};
