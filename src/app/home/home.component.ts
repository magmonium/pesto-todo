import { Component, inject } from '@angular/core'
import { TaskComponent } from '../task/task.component'
import { Firestore, collection, collectionData } from '@angular/fire/firestore'
import { Observable, map } from 'rxjs'
import { Task, TaskStatus } from '../types'
import { CommonModule } from '@angular/common'
import { BigTaskComponent } from '../big-task/big-task.component'

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    TaskComponent,
    BigTaskComponent,
    CommonModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.sass'
})
export class HomeComponent {

  #firestore: Firestore = inject(Firestore)
  tasks$!: Observable<Task[]>
  newTask = <Task>{
    id: 'new',
    status: TaskStatus.NEW
  }
  editMode = 'new'

  constructor(){
    const taskCollection = collection(this.#firestore, `users/${sessionStorage.getItem('user')}/tasks`)
    this.tasks$ = (<Observable<Task[]>>collectionData(taskCollection, { idField: 'id'})).pipe(map(tasks => {
      tasks.sort((a,b)=> (b.date - a.date))
      return tasks
    }))
  }

  editTask = (id:string) => {
    this.editMode = id
  }

}
