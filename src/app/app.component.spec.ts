import { TestBed, fakeAsync, tick } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { AppComponent } from './app.component'
import { By } from '@angular/platform-browser'
import { Observable, of } from 'rxjs'
import { NavigationEnd, Router } from '@angular/router'

class MockServices {
  public events = of( new NavigationEnd(0, 'http://localhost:4200/login', 'http://localhost:4200/login'))
  public navigate = jasmine.createSpy('navigate')
}

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        { provide: Router, useClass: MockServices },
      ]
    }).compileComponents()
  })

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent)
    const app = fixture.componentInstance
    expect(app).toBeTruthy()
  })

  it(`should have as title 'pesto-todo'`, () => {
    const fixture = TestBed.createComponent(AppComponent)
    const app = fixture.componentInstance
    expect(app.title).toEqual('pesto-todo')
  })

  it(`should have log out button hidden without auth`, () => {
    const fixture = TestBed.createComponent(AppComponent),
    button = fixture.debugElement.query(By.css('.btn'))
    expect(button).toBeNull()
  })

  it(`should have log out button after auth and can logout`, fakeAsync(() => {
    sessionStorage.setItem('user', 'test')
    const fixture = TestBed.createComponent(AppComponent),
    component = fixture.componentInstance
    fixture.detectChanges()
    spyOn(component, 'logOut')
    const btn = fixture.debugElement.query(By.css('.btn'))
    btn.triggerEventHandler('click', null)
    tick()
    fixture.detectChanges()
    expect(component.logOut).toHaveBeenCalled()
  }))

  it(`should clear the user from logout click`, fakeAsync(() => {
    sessionStorage.setItem('user', 'test')
    const fixture = TestBed.createComponent(AppComponent),
    component = fixture.componentInstance
    component.logOut()
    expect(sessionStorage.getItem('user')).toBeNull()
  }))

});
