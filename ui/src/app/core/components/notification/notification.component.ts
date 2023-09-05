import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements AfterViewInit, OnChanges {
  @Input() messages: string[] = []

  constructor(private el: ElementRef, private renderer: Renderer2, private cdr: ChangeDetectorRef) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['messages'] && !changes['messages'].firstChange) {
      this.cdr.detectChanges()
      this.showToasts()
    }
  }

  ngAfterViewInit(): void {
    this.showToasts()
  }

  private showToasts(): void {
    this.messages.forEach((_, index) => {
      const toastElement = this.el.nativeElement.querySelectorAll('.toast')[index]
      const closeButton = toastElement.querySelector('.btn-close')

      const toast = (window as any).bootstrap.Toast.getOrCreateInstance(toastElement)

      this.renderer.listen(closeButton, 'click', () => {
        toast.hide()
      })

      toast.show()
    })
  }

  remove(message: string): void {
    const index = this.messages.indexOf(message)
    if (index > -1) {
      this.messages.splice(index, 1)
    }
  }
}
