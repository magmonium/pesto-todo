import { Component, inject } from '@angular/core'
import { TaskComponent } from '../task/task.component'
import { Firestore, collection, collectionData } from '@angular/fire/firestore'
import { Observable, combineLatest, forkJoin, map, merge, startWith, zip } from 'rxjs'
import { TASK_STATUS_ARR, Task, TaskStatus } from '../types'
import { CommonModule } from '@angular/common'
import { BigTaskComponent } from '../big-task/big-task.component'
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms'

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    TaskComponent,
    BigTaskComponent,
    CommonModule,
    ReactiveFormsModule
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
  taskStatus = TASK_STATUS_ARR
  editMode = 'new'
  filterForm = new FormGroup({
    [TaskStatus.TO_DO]: new FormControl(true),
    [TaskStatus.IN_PROGRESS]: new FormControl(true),
    [TaskStatus.DONE]: new FormControl(true)
  })
  

  constructor(){
    const taskCollection = collection(this.#firestore, `users/${sessionStorage.getItem('user')}/tasks`)
    this.tasks$ = combineLatest([
      this.filterForm.valueChanges.pipe(startWith(this.filterForm.value)),
      <Observable<Task[]>>collectionData(taskCollection, { idField: 'id'})
    ]).pipe(map(([form, tasks])=> tasks.filter((task) => (<any>form)[task.status]).sort((a,b)=> (b.date - a.date))))
  }

  editTask = (id:string) => {
    this.editMode = id
  }

}
