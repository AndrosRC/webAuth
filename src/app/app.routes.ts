import { inject } from '@angular/core';
import { Router, Routes } from '@angular/router';
import { Platform } from '@ionic/angular';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    children: [], // <- Esto apacigua al validador de Angular
    canActivate: [async () => {
      const platform = inject(Platform);
      const router = inject(Router);
      
      await platform.ready();
      
      if (platform.is('capacitor')) {
        return router.createUrlTree(['/mobile']);
      } else {
        return router.createUrlTree(['/desktop']);
      }
    }]
  },
  {
    path: 'desktop',
    loadComponent: () => import('./pages/desktop-view/desktop-view.component').then(m => m.DesktopViewComponent)
  },
  {
    path: 'mobile',
    loadComponent: () => import('./pages/mobile-scanner/mobile-scanner.component').then(m => m.MobileScannerComponent)
  }
];