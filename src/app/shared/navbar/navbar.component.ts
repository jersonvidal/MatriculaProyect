import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  template: `
    <nav class="navbar navbar-light bg-white shadow-sm mb-4">
      <div class="container-fluid">
        <span class="navbar-brand">Panel de Administración</span>
      </div>
    </nav>
  `
})
export class NavbarComponent {}
