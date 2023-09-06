import { ChangeDetectorRef, Component, OnInit } from '@angular/core'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { NotificationService } from './core/services/notification.service'
import { Order } from './core/models/order.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent implements OnInit {
  public notifications: string[] = []

  constructor(
    private modalService: NgbModal,
    private notificationService: NotificationService,
    private cdr: ChangeDetectorRef
  ) { }

  public open(modal: any): void {
    this.modalService.open(modal)
  }

  ngOnInit(): void {
    this.notificationService.onNewFoodOrder().subscribe(() => {
      this.notificationService.showNotification('New food order received!')
    })

    this.notificationService.onNewDrinkOrder().subscribe(() => {
      this.notificationService.showNotification('New drink order received!')
    })

    this.notificationService.onOrderReady().subscribe((order: Order) => {
      this.notificationService.showNotification(`Order #${order.number} for table #${order.table} is ready!`)
    })

    this.notificationService.onOrderStatusChange().subscribe((_: Order) => {
      this.notificationService.triggerOrderUpdate()
    })

    this.notificationService.notifications$.subscribe(messages => {
      this.notifications = messages
    })
  }

  removeNotification(message: string): void {
    this.notificationService.removeNotification(message)
  }
}
