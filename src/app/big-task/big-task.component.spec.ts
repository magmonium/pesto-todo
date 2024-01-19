import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BigTaskComponent } from './big-task.component';

describe('BigTaskComponent', () => {
  let component: BigTaskComponent;
  let fixture: ComponentFixture<BigTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BigTaskComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BigTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
