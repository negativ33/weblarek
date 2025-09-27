import { ensureElement } from "../../../utils/utils"; 
import { IEvents } from "../../base/Events";
import { Component } from "../../base/Component";

export abstract class Form<T> extends Component<T> {
  protected submitButton: HTMLButtonElement;
  protected formErrors: HTMLElement;

  constructor(protected events: IEvents, container: HTMLElement) {
    super(container);
    this.submitButton = ensureElement<HTMLButtonElement>('button[type="submit"]', this.container);
    this.formErrors = ensureElement<HTMLElement>('.form__errors', this.container);
    
    this.container.addEventListener('submit', this.handleSubmit.bind(this));
  }

  protected handleSubmit(event: Event) {
    event.preventDefault();
    if (this.isValid()) {
      this.submit();
    }
  }
  protected abstract isValid(): boolean;
  protected abstract submit(): void;

  protected updateSubmitButton() {
    this.submitButton.disabled = !this.isValid();
  }

  protected showError(errors: string[]) {
    this.formErrors.textContent = errors.join(", ");
  }
}