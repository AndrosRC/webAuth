import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DesktopViewComponent } from './desktop-view.component';

describe('DesktopViewComponent', () => {
  let component: DesktopViewComponent;
  let fixture: ComponentFixture<DesktopViewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [DesktopViewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DesktopViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
