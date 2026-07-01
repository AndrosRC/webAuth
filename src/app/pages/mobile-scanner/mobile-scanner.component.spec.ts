import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MobileScannerComponent } from './mobile-scanner.component';

describe('MobileScannerComponent', () => {
  let component: MobileScannerComponent;
  let fixture: ComponentFixture<MobileScannerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [MobileScannerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MobileScannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
