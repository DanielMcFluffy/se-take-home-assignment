import { ComponentFixture } from "@angular/core/testing";
import { By } from "@angular/platform-browser";

export const targetButtonByTextContent = <T>(fixture: ComponentFixture<T>, text: string) => {
  const buttons = fixture.debugElement.queryAll(By.css('button'));
  return buttons.find(button => button.nativeElement.textContent.includes(text));
};

export const targetByAriaLabel = <T>(fixture: ComponentFixture<T>, ariaLabel: string) => {
  return fixture.debugElement.query(By.css(`[aria-label=${ariaLabel}]`))
}