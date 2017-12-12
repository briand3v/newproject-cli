import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoOwnerComponent } from './photo-owner.component';

describe('PhotoOwnerComponent', () => {
  let component: PhotoOwnerComponent;
  let fixture: ComponentFixture<PhotoOwnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhotoOwnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotoOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
