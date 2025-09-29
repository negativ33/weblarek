import { ensureElement } from "../../../utils/utils"; 
import { IEvents } from "../../base/Events";
import { Form } from "./Form";

interface IFormOrder {
  address: string;
  payment: string;
}

export class FormOrder extends Form<IFormOrder> {
  protected cardButton: HTMLButtonElement;
  protected cashButton: HTMLButtonElement;
  protected addressInput: HTMLInputElement;
  protected selectedPayment: string = '';

  constructor(protected events: IEvents, container: HTMLElement) {
    super(events, container);

    this.cardButton = ensureElement<HTMLButtonElement>('button[name="card"]', this.container);
    this.cashButton = ensureElement<HTMLButtonElement>('button[name="cash"]', this.container);
    this.addressInput = ensureElement<HTMLInputElement>('input[name="address"]', this.container);

    this.init();

    
  }

  init() {
    const toggleActiveClass = (selectedButton: HTMLButtonElement, otherButton: HTMLButtonElement) => {
      selectedButton.classList.add('button_alt-active');
      otherButton.classList.remove('button_alt-active');
    };

    this.cardButton.addEventListener('click', () => {
      this.selectedPayment = 'card';
      toggleActiveClass(this.cardButton, this.cashButton);
      this.events.emit('buyer:paymentChanged', { payment: this.selectedPayment});
    });

    this.cashButton.addEventListener('click', () => {
      this.selectedPayment = 'cash';
      toggleActiveClass(this.cashButton, this.cardButton);
      this.events.emit('buyer:paymentChanged', { payment: this.selectedPayment});
    });

  
    this.addressInput.addEventListener('input', () => {
      this.events.emit('buyer:addressChanged', { address: this.addressInput.value.trim() });
    });
  }

  protected submit(): void {
    this.events.emit('order:next', {
      address: this.addressInput.value.trim(),
      payment: this.selectedPayment
    });
  }


}
