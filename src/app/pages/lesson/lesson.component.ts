import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnInit, ViewChild } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import {
  AlertController,
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
    IonCardContent
  ],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LessonComponent  implements OnInit {
  @ViewChild(IonModal) modal!: IonModal;

  private route = inject(ActivatedRoute)
  public id = this.route.snapshot.paramMap.get('id')
  public loaded = false
  public src = "https://didis-app-test.s3.eu-west-3.amazonaws.com/b44ab3b56a5409066d0ee4450f3bf53ff5d82025.jpg"
  public title = 'Image du cours'
  public description = 'Cliquer ici permet de visualiser l\'image en grand'
  public message = 'This modal example uses triggers to automatically open a modal when the button is clicked.'
  public name!: string
  public isModalOpen = false
  public cards: Flashcard[] | undefined
  public bullets = '<span class="bullets">1</span>'

  constructor(private alertCtrl: AlertController) { }

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
        question: 'What is Ionic en vrai le sang ?',
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

  flipped = new Set<number>()

  isFlipped(id: number) {
    return this.flipped.has(id)
  }

  toggleFlip(id: number) {
    if (this.flipped.has(id)) this.flipped.delete(id)
    else this.flipped.add(id)
  }

  public editCard(card: Flashcard) {
    this.alertCtrl.create({
      header: 'Edit Card',
      inputs: [
        {
          name: 'question',
          label: 'Question',
          type: 'text',
          value: card.question,
          placeholder: 'Question'
        },
        {
          name: 'reponse',
          label: 'Réponse',
          type: 'textarea',
          value: card.answer,
          placeholder: 'Réponse'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Edit cancelled')
          }
        },
        {
          text: 'Save',
          handler: (data) => {
            if (data.question.trim().length === 0 || data.reponse.trim().length === 0) {
              return false
            } else {
              card.question = data.question
              card.answer = data.reponse
              return true
            }
          }
        }
      ]
    }).then(alert => {
      alert.present()
    })
  }

  public deleteCard(id: number) {
    this.cards = this.cards?.filter(card => card.id !== id)
  }
}
