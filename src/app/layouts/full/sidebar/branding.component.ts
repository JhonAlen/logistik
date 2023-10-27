import { Component } from '@angular/core';

@Component({
  selector: 'app-branding',
  template: `
    <div class="branding">
      <a href="/">
        <img
          src="./assets/images/logos/logistika2.png"
          class="align-middle m-2"
          alt="logo"
          style="width: 70%"
        />
      </a>
    </div>
  `,
})
export class BrandingComponent {
  constructor() {}
}
