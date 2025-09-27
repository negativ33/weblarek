import { IProduct } from "../../types/index.ts";
import { EventEmitter } from "../base/Events.ts";

export class Cart {
  private items: IProduct[] = [];
  private events: EventEmitter;

  constructor(events: EventEmitter) {
    this.events = events;
  }

  getItems(): IProduct[] {
    return this.items;
  };

  addItem(product: IProduct): void {
    if (!this.hasItem(product.id)) {
      this.items.push(product);
      this.events.emit('cart:changed');
    };
  };

  removeItem(product: IProduct): void {
    this.items = this.items.filter(p => p.id !== product.id);
    this.events.emit('cart:changed');
  };

  clear(): void {
    this.items = [];
    this.events.emit('cart:changed');
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