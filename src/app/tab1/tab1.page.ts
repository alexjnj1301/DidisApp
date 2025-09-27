import { Component } from '@angular/core';
import {
  IonAccordion,
  IonAccordionGroup,
  IonButton,
  IonChip,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router'
import { Lesson } from '../models/Lesson'
import { LessonComponent } from '../pages/lesson/lesson.component'

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButton, RouterLink, IonAccordionGroup, IonAccordion, IonItem, IonLabel, IonChip, IonIcon],
  standalone: true
})
export class Tab1Page {
  public lessonsList: Lesson[] = [
    {
      id: 1,
      title: 'Introduction to Ionic',
      description: 'Learn the basics of Ionic framework and how to build mobile apps.',
    },
    {
      id: 2,
      title: 'Components and Layouts',
      description: 'Explore Ionic components and how to create responsive layouts.',
    },
    {
      id: 3,
      title: 'Navigation and Routing',
      description: 'Understand navigation patterns and routing in Ionic applications.',
    }
  ]
  public component = LessonComponent

  constructor() {
  }
}
