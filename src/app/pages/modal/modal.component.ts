import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  Renderer2,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { A11yModule } from '@angular/cdk/a11y';
import { Livro } from '../../models/interfaces';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, A11yModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
})
export class ModalComponent {
  @Input() livro!: Livro;
  @Output() mudouModal = new EventEmitter<boolean>();
  @HostListener('document:keydown.escape') fecharModalOnEsc() {
    if (this.statusModal) {
      this.fecharModal();
    }
  }
  statusModal: boolean = true;

  constructor(private render: Renderer2, private element: ElementRef) {}

  fecharModal() {
    this.statusModal = false;
    this.mudouModal.emit(this.statusModal);
    this.render.setStyle(
      this.element.nativeElement.ownerDocument.body,
      'overflow',
      'scroll'
    );
  }

  lerPrevia() {
    window.open(this.livro.previewLink, '_blank');
  }

  get thumbnailUrl() {
    return this.livro.thumbnail || 'assets/imagens/capa-indisponivel.png';
  }
}
