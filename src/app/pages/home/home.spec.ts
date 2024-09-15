import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HomeComponent } from "./home.component";
import { RouterModule } from "@angular/router";
import { targetByAriaLabel, targetButtonByTextContent } from "../../utils";

describe('Welcome Menu (Home Component)', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [
        RouterModule.forRoot(
          [{path: 'home', component: HomeComponent}]
        )
      ]
    })
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have property', () => {
    expect(component.title).toBe('Welcome to McDonald\'s!')
  })

  it('should render title', () => {
    const element = targetByAriaLabel<HomeComponent>(fixture, 'welcome-text');
    const renderedText = element.nativeElement.textContent;
    expect(renderedText).toContain('Welcome to McDonald\'s!')
  })

  it('should have customer button', () => {
    const customerButton = targetButtonByTextContent(fixture, 'Customers');
    expect(customerButton).toBeTruthy();
  });

  it('should have employee button', () => {
    const managerButton = targetButtonByTextContent(fixture, 'Manager');
    expect(managerButton).toBeTruthy();
  });

})


