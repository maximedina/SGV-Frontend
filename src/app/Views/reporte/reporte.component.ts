import { Component, OnInit, HostListener, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService, TreeNode } from 'primeng/api';
import { SystemSettingService } from 'src/app/services/system-setting.service';
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';
import { NavbarComponent } from '../Layout/Navbar/navbar.component';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'reportes',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.css'],
  providers: [ConfirmationService, MessageService],
})
export class ReporteComponent implements OnInit {

  loading : boolean = false;
  screenWidth:any;
  screenHeight:any;
  scrollHeight: any;

  iframeUrlStr: string;
  iFrameUrl : SafeResourceUrl;

  constructor(
    private systemSettingService : SystemSettingService,
    private sanitizer: DomSanitizer,
    private navBar: NavbarComponent,
    private router: Router,
    ) { }

  ngOnInit() {
    
    /*console.log('reporte '+this.iframeUrlStr);
    this.router.events.subscribe(res => {
      this.iFrameUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.iframeUrlStr);
    });

    this.iFrameUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.iframeUrlStr);
*/
   this.router.events.subscribe(res => {
      this.iFrameUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.navBar.iframeUrlStr);
    });

    this.iFrameUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.navBar.iframeUrlStr);
  
  }


  getURL() {
    return this.iFrameUrl;
  };
}

