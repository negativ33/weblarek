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
    this.emitChange("order");
  };

  setEmail(email: string): void {
    this.email = email;
    this.emitChange("contacts");
  };

  setPhone(phone: string): void {
    this.phone = phone;
    this.emitChange("contacts");
  };

  setAddress(address: string): void {
    this.address = address;
    this.emitChange("order");
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
    this.emitChange("order");
    this.emitChange("contacts");
  }

  isEmailValid(): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email);
  }

  isPhoneValid(): boolean {
  const cleaned = this.phone.replace(/\D/g, ''); 
  return /^\d{10,15}$/.test(cleaned);
  }

  isAddressValid(): boolean {
    return this.address.trim().length >= 5;
  }

  isPaymentValid(): boolean {
    return this.payment === "card" || this.payment === "cash";
  }

  checkStepOrder(): { valid: boolean; errors: string[] } {
    const errors: string[] = [];
    if (!this.isPaymentValid()) errors.push("Выберите способ оплаты");
    if (!this.isAddressValid()) errors.push("Укажите корректный адрес");
    return { valid: errors.length === 0, errors };
  }

  checkStepContacts(): { valid: boolean; errors: string[] } {
    const errors: string[] = [];
    if (!this.isEmailValid()) errors.push("Укажите корректный email");
    if (!this.isPhoneValid()) errors.push("Укажите корректный телефон");
    return { valid: errors.length === 0, errors };
  }

   private emitChange(step: "order" | "contacts") {
    this.events.emit("buyer:changed", this.getData());

    let validation;
    if (step === "order") {
      validation = this.checkStepOrder();
    } else {
      validation = this.checkStepContacts();
    }

    this.events.emit("buyer:validation", validation);
  }
}