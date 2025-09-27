import { IProduct } from "../../types/index.ts";
import { EventEmitter } from "../base/Events.ts";

export class Products {
  private items: IProduct[] = [];
  private selected: IProduct | null = null;
  private events: EventEmitter;

  constructor(events: EventEmitter) {
    this.events = events;
  }

  setItems(items: IProduct[]) {
  this.items = items;
  this.events.emit("items:changed");
}

  getItems(): IProduct[] {
    return this.items;
  }

  getById(id: string): IProduct | undefined {
    return this.items.find(p => p.id === id);
  }

  setSelected(product: IProduct): void {
    this.selected = product;
    this.events.emit("selected:changed", product);
  }

  getSelected(): IProduct | null {
    return this.selected;
  }
};
