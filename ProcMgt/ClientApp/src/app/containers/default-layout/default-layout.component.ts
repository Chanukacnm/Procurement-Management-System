import { Component, OnDestroy, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { navItem } from '../../_nav';
//import { navItems } from '../../services/auth.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})


export class DefaultLayoutComponent implements OnDestroy {
  
  //public navItems = navItems;

  public navItems;
  
  public sidebarMinimized = true;
  private changes: MutationObserver;
  public element: HTMLElement;
  constructor(@Inject(DOCUMENT) _document?: any, public auth?: AuthService ) {

    this.changes = new MutationObserver((mutations) => {
      this.sidebarMinimized = _document.body.classList.contains('sidebar-minimized');
    });
    this.element = _document.body;
    this.changes.observe(<Element>this.element, {
      attributes: true,
      attributeFilter: ['class']
    });
    //this.navItems = auth.menu;
    
    //var menus = JSON.parse(localStorage.getItem("menu"));
    var modules = JSON.parse(localStorage.getItem("ModuleMenuDetails"));
    //this.navItems = menus;
    this.navItems = modules;
  }
  
  ngOnDestroy(): void {
    this.changes.disconnect();
  }

  logout() {
    this.auth.logOut();
    //console.log("mmmmmmmmm");
  }
}
