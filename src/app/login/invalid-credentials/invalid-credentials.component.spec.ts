import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvalidCredentialsComponent } from './invalid-credentials.component';

describe('InvalidCredentialsComponent', () => {
  let component: InvalidCredentialsComponent;
  let fixture: ComponentFixture<InvalidCredentialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvalidCredentialsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvalidCredentialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
