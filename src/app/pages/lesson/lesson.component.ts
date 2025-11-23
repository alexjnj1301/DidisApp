import { Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, inject, OnInit, ViewChild } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import {
  AlertController,
  IonBackButton,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonImg,
  IonItem, IonItemOption, IonItemOptions, IonItemSliding,
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
import { PhotoService } from '../../services/photo.service'

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
    IonFab,
    IonFabButton,
    IonItemSliding,
    IonItemOptions,
    IonItemOption,

  ],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LessonComponent  implements OnInit {
  @ViewChild(IonModal) modal!: IonModal;
  @ViewChild('fileInput') fileInput!: ElementRef

  private route = inject(ActivatedRoute)
  public id = this.route.snapshot.paramMap.get('id')
  public loaded = false
  public srcs: Array<string> = [
    "https://didis-app-test.s3.eu-west-3.amazonaws.com/b44ab3b56a5409066d0ee4450f3bf53ff5d82025.jpg",
    "https://didis-app-test.s3.eu-west-3.amazonaws.com/IMG_9103.HEIC"
  ]
  public description = 'Cliquer ici permet de visualiser l\'image en grand'
  public message = 'This modal example uses triggers to automatically open a modal when the button is clicked.'
  public name!: string
  public isModalOpen = false
  public cards: Flashcard[] | undefined
  public bullets = '<span class="bullets">1</span>'
  public files: File[] = []
  public filesToSend: number = 0
  public modalImgUrl: string = ''
  public flipped = new Set<number>()
  public isCardViewReady: boolean = false


  constructor(private alertCtrl: AlertController,
              protected photoService: PhotoService) { }

  public ngOnInit() {
    this.implementFlashcards()
    setTimeout(() => {
      this.loaded = true
    }, 1000)
  }

  public setOpen(isOpen: boolean, imgUrl: string | null) {
    this.modalImgUrl = imgUrl!
    this.isModalOpen = isOpen
  }

  public downloadImage(imgUrl: string) {
    const link = document.createElement('a')
    link.href = imgUrl
    link.download = 'image.jpg'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
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

  isFlipped(id: number) {
    return this.flipped.has(id)
  }

  toggleFlip(id: number) {
    if (this.flipped.has(id)) this.flipped.delete(id)
    else this.flipped.add(id)
  }

  public editCard(card: Flashcard) {
    this.alertCtrl.create({
      header: 'Mettre à jour la carte',
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
          text: 'Annuler',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Edit cancelled')
          }
        },
        {
          text: 'Enregistrer',
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
    this.alertCtrl.create({
      header: 'Confirmer la suppression',
      message: 'Tu veux vraiiiiiiment supprimer là ou qwa ?👶🏿',
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Deletion cancelled')
          }
        },
        {
          text: 'Supprimer',
          handler: () => {
            this.confirmDelete(id)
          }
        }
      ]
    }).then(alert => {
      alert.present()
    })
  }

  private confirmDelete(id: number) {
    this.cards = this.cards?.filter(card => card.id !== id)
  }

  public onChange(event: Event) {
    const input = event.target as HTMLInputElement
    if (input.files) {
      const existingFile = this.files.find(file => file.name === input.files![0].name)
      if (existingFile) {
        console.warn('File already exists:', existingFile.name)
        return
      }
      this.files?.push(input.files[0])
    }

    this.filesToSend = this.files.length
  }

  public addPhotoToGallery() {
    // Moulinette à revoir qaund on aura le back parce qu'on fera juste un reload des images
    this.photoService.addNewToGallery().then(() => {
      this.srcs.push(this.photoService.photos[this.photoService.photos.length - 1].webviewPath!)
    })
  }

  public openAddCardAlert() {
    this.alertCtrl.create({
      header: 'Ajouter une carte',
      inputs: [
        {
          name: 'question',
          label: 'Question',
          type: 'text',
          placeholder: 'Question'
        },
        {
          name: 'reponse',
          label: 'Réponse',
          type: 'textarea',
          placeholder: 'Réponse'
        }
      ],
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Add card cancelled')
          }
        },
        {
          text: 'Ajouter',
          handler: (data) => {
            if (data.question.trim().length === 0 || data.reponse.trim().length === 0) {
              return false
            } else {
              const newCard: Flashcard = {
                id: this.cards!.length > 0 ? Math.max(...this.cards!.map(c => c.id)) + 1 : 1,
                question: data.question,
                answer: data.reponse,
                lessonId: Number(this.id)
              }
              this.cards?.push(newCard)
              return true
            }
          }
        }
      ]
    }).then(alert => {
      alert.present()
    })
  }
}
