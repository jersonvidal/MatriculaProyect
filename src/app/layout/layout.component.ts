import { Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {
  // Variable que controla si el sidebar está visible o no
  isSidebarActive: boolean = true;

  // Metodo para alternar el estado del sidebar
  toggleSidebar() {
    this.isSidebarActive = !this.isSidebarActive; // Cambiar entre visible y oculto
  }
}
