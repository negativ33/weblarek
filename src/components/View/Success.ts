import { Component } from "../base/Component";
import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/Events";

interface ISuccess {
  total: number
}

export class Success extends Component<ISuccess> {
  protected elementTotal: HTMLElement;
  protected button: HTMLButtonElement;
  constructor(protected events: IEvents, container: HTMLElement) {
    super(container); 
    this.button = ensureElement<HTMLButtonElement>('.order-success__close', this.container); 
    this.elementTotal = ensureElement<HTMLElement>('.order-success__description', this.container); 
    this.button.addEventListener('click', () => this.events.emit('success:close')); 
  }

  set total(value: number) {
    this.elementTotal.textContent = `Списано ${value} синапсов`; 
  }
}