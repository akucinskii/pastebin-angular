import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadPasteComponent } from './read-paste.component';

describe('ReadPasteComponent', () => {
  let component: ReadPasteComponent;
  let fixture: ComponentFixture<ReadPasteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadPasteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReadPasteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
