import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthFooterrComponent } from './auth-footerr.component';

describe('AuthFooterrComponent', () => {
  let component: AuthFooterrComponent;
  let fixture: ComponentFixture<AuthFooterrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthFooterrComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthFooterrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
