import { Component } from "../base/Component";
import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/Events";

interface IModal {
  modal: HTMLElement;
}

export class Modal extends Component<IModal> {
  protected content: HTMLElement;
  protected button: HTMLButtonElement;
  constructor(protected events: IEvents, container: HTMLElement) {
    super(container);

    this.button = ensureElement<HTMLButtonElement>('.modal__close', this.container);
    this.content = ensureElement<HTMLElement>('.modal__content', this.container);

    this.button.addEventListener('click', () => this.close())
    this.content.addEventListener('click', (event) => event.target === this.content && this.close());
  }


set contentSet(item: HTMLElement) {
  this.content.innerHTML = '';
  this.content.append(item);
}

protected escapeKey = (event: KeyboardEvent) => event.key === 'Escape' && this.close();

open(): void {
  this.container.classList.add('modal_active');
  document.addEventListener('keydown', this.escapeKey);
}

close(): void {
  this.container.classList.remove('modal_active');
  document.removeEventListener('keydown', this.escapeKey);
}
}