import { IBuyer, TPayment } from "../../types/index.ts";
import { EventEmitter } from "../base/Events.ts";

export class Buyer {
  private payment: TPayment | "";
  private email: string;
  private phone: string;
  private address: string;
  private events: EventEmitter

  constructor(events: EventEmitter) {
    this.payment = "";
    this.email = "";
    this.phone = "";
    this.address = "";
    this.events = events;
  };

  setPayment(payment: TPayment | ""): void {
    this.payment = payment;
    this.events.emit("buyer:changed", this.getData());
  };

  setEmail(email: string): void {
    this.email = email;
    this.events.emit("buyer:changed", this.getData());
  };

  setPhone(phone: string): void {
    this.phone = phone;
    this.events.emit("buyer:changed", this.getData());
  };

  setAddress(address: string): void {
    this.address = address;
    this.events.emit("buyer:changed", this.getData());
  }

  getData(): IBuyer {
    return {
      payment: this.payment as TPayment,
      email: this.email,
      phone: this.phone,
      address: this.address,
    }
  }

  clearData(): void {
    this.payment = "";
    this.email = "";
    this.phone = "";
    this.address = "";
    this.events.emit("buyer:changed", this.getData());
  }

  isEmailValid(): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email);
  }

  isPhoneValid(): boolean {
    return /^\d{10,15}$/.test(this.phone);
  }

  isAddressValid(): boolean {
    return this.address.trim().length >= 5;
  }

  isPaymentValid(): boolean {
    return this.payment === "card" || this.payment === "cash";
  }

  checkData(): boolean {
  return (
    this.isEmailValid() &&
    this.isPhoneValid() &&
    this.isAddressValid() &&
    this.isPaymentValid()
  );
}
}