import { IBuyer } from "../../types/index.ts";

export class Buyer {
  private data: IBuyer | null = null;

  setData(data: IBuyer): void {
    this.data = data;
  }

  getData(): IBuyer | null {
    return this.data;
  }

  clear(): void {
    this.data = null;
  }

  validate(): boolean {
    if (!this.data) return false;
    return !!(this.data.email && this.data.phone && this.data.address && this.data.payment);
  }
}