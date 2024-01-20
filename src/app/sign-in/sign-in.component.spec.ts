import { ComponentFixture, TestBed } from '@angular/core/testing'
import { SignInComponent } from './sign-in.component'
import { AppModule } from '../app.module'

describe('SignInComponent', () => {
  let component: SignInComponent;
  let fixture: ComponentFixture<SignInComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        SignInComponent,
        AppModule
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SignInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
