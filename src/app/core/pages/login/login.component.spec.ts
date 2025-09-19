import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { LoginComponent } from './login.component';
import { Base_Url } from 'auth';
import { provideRouter } from '@angular/router';
import { MessageService } from 'primeng/api';
describe('LoginComponent', () => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [LoginComponent],
            providers: [
                provideHttpClient(withInterceptorsFromDi()),
                provideHttpClientTesting(),
                provideRouter([]),
                MessageService,
                { provide: Base_Url, useValue: 'https://exam.elevateegy.com/api/v1' },
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
    it('should initialize the form with empty values', () => {
        expect(component.loginForm).toBeDefined();
        expect(component.loginForm.get('Email')?.value).toBe('');
        expect(component.loginForm.get('password')?.value).toBe('');
    });
    it('should mark Email as invalid if empty or not an email', () => {
        const emailControl = component.loginForm.get('Email');

        emailControl?.setValue('');
        expect(emailControl?.invalid).toBeTrue();

        emailControl?.setValue('not-an-email');
        expect(emailControl?.invalid).toBeTrue();

        emailControl?.setValue('test@example.com');
        expect(emailControl?.valid).toBeTrue();
    });

    it('should require password with minimum 8 characters', () => {
        const passwordControl = component.loginForm.get('password');

        passwordControl?.setValue('123');
        expect(passwordControl?.invalid).toBeTrue();

        passwordControl?.setValue('12345678');
        expect(passwordControl?.valid).toBeTrue();
    });




});