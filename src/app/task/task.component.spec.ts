import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskComponent } from './task.component';
import { CommonModule } from '@angular/common';
import { TimeAgoPipe } from '../pipe/time-ago.pipe';
import { AppModule } from '../app.module';
import { Task, TaskStatus } from '../types';

describe('TaskComponent', () => {
  let component: TaskComponent;
  let fixture: ComponentFixture<TaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TaskComponent,
        CommonModule,
        TimeAgoPipe,
        AppModule
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TaskComponent);
    component = fixture.componentInstance;
    component.task = <Task>{
      status: TaskStatus.NEW,
      id: 'new'
    }
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
