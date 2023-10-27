import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IssuanceOfNotesComponent } from './issuance-of-notes.component';

describe('IssuanceOfNotesComponent', () => {
  let component: IssuanceOfNotesComponent;
  let fixture: ComponentFixture<IssuanceOfNotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IssuanceOfNotesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IssuanceOfNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
