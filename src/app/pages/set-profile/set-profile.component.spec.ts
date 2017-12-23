import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetProfileComponent } from './set-profile.component';

describe('SetProfileComponent', () => {
  let component: SetProfileComponent;
  let fixture: ComponentFixture<SetProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
