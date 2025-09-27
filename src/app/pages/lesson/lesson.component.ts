import { Component, inject, OnInit, ViewChild } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCard,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonImg,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonModal,
  IonSkeletonText,
  IonThumbnail,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone'

@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonTitle,
    IonContent,
    IonSkeletonText,
    IonLabel,
    IonThumbnail,
    IonItem,
    IonListHeader,
    IonList,
    IonCard,
    IonImg,
    IonCardTitle,
    IonModal,
    IonButton,
  ],
  standalone: true
})
export class LessonComponent  implements OnInit {
  @ViewChild(IonModal) modal!: IonModal;

  private route = inject(ActivatedRoute)
  public id = this.route.snapshot.paramMap.get('id')
  public loaded = false
  src = "http://images.cocodataset.org/val2017/000000039769.jpg"
  title = 'Image'
  description = 'Description'
  viewerOpen = false
  message = 'This modal example uses triggers to automatically open a modal when the button is clicked.'
  name!: string
  isModalOpen = false

  constructor() { }

  public ngOnInit() {
    setTimeout(() => {
      this.loaded = true
    }, 3000)
  }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }
}
