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

    this.phoneInput.addEventListener('input', () => this.validate());
    this.emailInput.addEventListener('input', () => this.validate());
  }

  protected isValid(): boolean {

    return this.emailInput.value.trim() !== '' && this.phoneInput.value.trim() !== '';
  }

  protected submit(): void {

    this.events.emit('order:submit', { 
      phone: this.phoneInput.value.trim(), 
      email: this.emailInput.value.trim() 
    });
  }

  protected validate(): void {
    const errors: string[] = [];

    if (!this.emailInput.value.trim()) {
      errors.push('Необходимо указать email');
    }
    if (!this.phoneInput.value.trim()) {
      errors.push('Необходимо указать номер телефона');
    }

    this.showError(errors);
    this.updateSubmitButton(); 
  }
}
