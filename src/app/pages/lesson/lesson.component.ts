import { Component, inject, OnInit, ViewChild } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCard, IonCardContent, IonCardHeader,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonIcon,
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
import { Flashcard } from '../../models/Flashcard'

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
    IonIcon,
    IonCardHeader,
    IonCardContent,

  ],
  standalone: true
})
export class LessonComponent  implements OnInit {
  @ViewChild(IonModal) modal!: IonModal;

  private route = inject(ActivatedRoute)
  public id = this.route.snapshot.paramMap.get('id')
  public loaded = false
  public src = "https://bucket-locngo.s3.eu-west-3.amazonaws.com/1758050020972IMG_8862.jpeg"
  public title = 'Image du cours'
  public description = 'Cliquer ici permet de visualiser l\'image en grand'
  public message = 'This modal example uses triggers to automatically open a modal when the button is clicked.'
  public name!: string
  public isModalOpen = false
  public cards: Flashcard[] | undefined

  constructor() { }

  public ngOnInit() {
    this.implementFlashcards()
    setTimeout(() => {
      this.loaded = true
    }, 1000)
  }

  public setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  public downloadImage() {
    const link = document.createElement('a');
    link.href = this.src;
    link.download = 'image.jpg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  public implementFlashcards() {
    this.cards = [
      {
        id: 1,
        question: 'What is Ionic?',
        answer: 'Ionic is a popular framework for building cross-platform mobile applications using web technologies like HTML, CSS, and JavaScript.',
        lessonId: 1
      },
      {
        id: 2,
        question: 'What are some key features of Ionic?',
        answer: 'Some key features of Ionic include a rich library of pre-built UI components, support for multiple platforms (iOS, Android, web), and integration with popular frameworks like Angular, React, and Vue.',
        lessonId: 1
      },
      {
        id: 3,
        question: 'How does Ionic handle navigation?',
        answer: 'Ionic uses a powerful navigation system that allows developers to create complex navigation patterns using a stack-based approach, similar to native mobile apps.',
        lessonId: 3
      }
    ]
  }

  flipped = new Set<number>();

  isFlipped(id: number) {
    return this.flipped.has(id);
  }

  toggleFlip(id: number) {
    if (this.flipped.has(id)) this.flipped.delete(id);
    else this.flipped.add(id);
    // force l’UI à se mettre à jour si besoin (pas nécessaire en général)
  }
}
