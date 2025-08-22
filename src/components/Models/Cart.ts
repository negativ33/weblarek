import { IProduct } from "../../types/index.ts";

export class Cart {
  private items: IProduct[] = [];

  getItems(): IProduct[] {
    return this.items;
  };

  addItem(product: IProduct): void {
    if (!this.hasItem(product.id)) {
      this.items.push(product);
    };
  };

  removeItem(product: IProduct): void {
    this.items = this.items.filter(p => p.id !== product.id);
  };

  clear(): void {
    this.items = [];
  };

  getTotal(): number {
    return this.items.reduce((acc, item) => acc + (item.price ?? 0), 0);
  }

  getCount(): number {
    return this.items.length;
  }

  hasItem(id: string): boolean {
    return this.items.some(p => p.id === id);
  };
}