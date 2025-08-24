import { IBuyer, TPayment } from "../../types/index.ts";

export class Buyer {
  private payment: TPayment | "";
  private email: string;
  private phone: string;
  private address: string;

  constructor() {
    this.payment = "";
    this.email = "";
    this.phone = "";
    this.address = "";
  };

  setPayment(payment: TPayment | ""): void {
    this.payment = payment;
  };

  setEmail(email: string): void {
    this.email = email;
  };

  setPhone(phone: string): void {
    this.phone = phone;
  };

  setAddress(address: string): void {
    this.address = address;
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