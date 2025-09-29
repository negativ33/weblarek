import { ensureElement } from "../../../utils/utils";
import { IEvents } from "../../base/Events";
import { Form } from "./Form";

interface IFormContacts {
  phone: string;
  email: string;
}

export class FormContacts extends Form<IFormContacts> {
  protected phoneInput: HTMLInputElement;
  protected emailInput: HTMLInputElement;

  constructor(protected events: IEvents, container: HTMLElement) {
    super(events, container);

    this.phoneInput = ensureElement<HTMLInputElement>('input[name="phone"]', this.container);
    this.emailInput = ensureElement<HTMLInputElement>('input[name="email"]', this.container);

    this.init();
  }
  
  init() {
    this.phoneInput.addEventListener('input', () => {
      this.events.emit('buyer:phoneChanged', { phone: this.phoneInput.value.trim() });
    });
    this.emailInput.addEventListener('input', () => {
      this.events.emit('buyer:emailChanged', { email: this.emailInput.value.trim() });
      
    });
  }

 

  protected submit(): void {

    this.events.emit('order:submit', { 
      phone: this.phoneInput.value.trim(), 
      email: this.emailInput.value.trim() 
    });
  }
}
