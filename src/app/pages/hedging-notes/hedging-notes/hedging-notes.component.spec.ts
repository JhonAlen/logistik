import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HedgingNotesComponent } from './hedging-notes.component';

describe('HedgingNotesComponent', () => {
  let component: HedgingNotesComponent;
  let fixture: ComponentFixture<HedgingNotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HedgingNotesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HedgingNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
