import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminScheduleComponent } from './admin-schedule.component';

describe('AdminScheduleComponent', () => {
  let component: AdminScheduleComponent;
  let fixture: ComponentFixture<AdminScheduleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminScheduleComponent]
    });
    fixture = TestBed.createComponent(AdminScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
