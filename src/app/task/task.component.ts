import { Component, EventEmitter, Input, Output, inject } from '@angular/core'
import { TASK_STATUS_ARR, Task, TaskStatus } from '../types'
import { CommonModule } from '@angular/common'
import { Firestore, deleteDoc, doc } from '@angular/fire/firestore'
import { TimeAgoPipe } from '../pipe/time-ago.pipe'

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [
    CommonModule,
    TimeAgoPipe
  ],
  templateUrl: './task.component.html',
  styleUrl: './task.component.sass'
})
export class TaskComponent {

  @Input()
  set task(data:Task){
    this.details = data
    this.date = new Date(this.details?.date??'')
    this.isNew = this.details.id === 'new'
    this.status = TASK_STATUS_ARR.find(e =>e.key === this.details.status)?.name??''
  }

  @Output() onEdit = new EventEmitter()


  isNew!: boolean
  date !: Date
  taskStatus = TaskStatus
  status !: string
  #firestore: Firestore = inject(Firestore)
  details!: Task

  getStatus = () => TASK_STATUS_ARR.find(e =>e.key === this.details.status)?.name

  deleteTask = () => {
    deleteDoc(doc(this.#firestore, `users/${sessionStorage.getItem('user')}/tasks/${this.details.id}`))
  }

  editTask = () => {
    this.onEdit.emit(this.details.id)
  }


}
