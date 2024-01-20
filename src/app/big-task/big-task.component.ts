import { Component, EventEmitter, Input, Output, inject } from '@angular/core'
import { TASK_STATUS_ARR, Task, TaskStatus } from '../types'
import { FormControl, FormControlStatus, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { Firestore, addDoc, collection, doc, updateDoc } from '@angular/fire/firestore'

@Component({
  selector: 'app-big-task',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './big-task.component.html',
  styleUrl: './big-task.component.sass'
})
export class BigTaskComponent {

  taskForm !: FormGroup
  #firestore: Firestore = inject(Firestore)

  @Input()
  set task(data:Task){
    this.details = data
    this.isEdit = this.details.id !== 'new'
    this.#init()
  }
  @Output() onEdit = new EventEmitter()

  details!: Task
  isEdit!: boolean
  isValid !: boolean
  taskStatus = TASK_STATUS_ARR
  #taskCollection = collection(this.#firestore, `users/${sessionStorage.getItem('user')}/tasks`)

  #init = () => {
    this.taskForm = new FormGroup({
      name: new FormControl(this.details.name??'', [
        Validators.required,
      ]),
      description: new FormControl(this.details.description??'', [
        Validators.required
      ]),
      status: new FormControl(this.details.status !== TaskStatus.NEW?this.details.status:TaskStatus.TO_DO, [
        Validators.required
      ]),
    })
    this.taskForm?.statusChanges.subscribe((status:FormControlStatus) => {
      this.isValid = status === 'VALID'
    })
  }

  onSubmit = () => {
    const {name, description, status} = this.taskForm.value
    const date = new Date().getTime()

    if(!this.isEdit){
      addDoc(this.#taskCollection, { name, description, status, date })
      this.taskForm.setValue({name:'', description:'', status:TaskStatus.TO_DO})
    }else{
      updateDoc(doc(this.#firestore, `users/${sessionStorage.getItem('user')}/tasks/${this.details.id}`),{ 
        name, 
        description, 
        status
      })
      this.onEdit.emit('new')
    }
  }

}
