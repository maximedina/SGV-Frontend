import { Component, OnInit, HostListener, ViewChild, Input } from '@angular/core';
import { ConfirmationService, MessageService, TreeNode } from 'primeng/api';
import { SystemSettingService } from 'src/app/services/system-setting.service';
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'historiaClinica',
  templateUrl: './historia-clinica.component.html',
  styleUrls: ['./historia-clinica.component.css'],
  providers: [ConfirmationService, MessageService],
})
export class HistoriaClinicaComponent implements OnInit {

  loading : boolean = false;
  screenWidth:any;
  screenHeight:any;
  scrollHeight: any;

  @Input() paciente: string;
  iFrameUrl : SafeResourceUrl;

  constructor(
    private systemSettingService : SystemSettingService,
    private sanitizer: DomSanitizer,
    //private navBar: NavbarComponent,
    private router: Router,
    ) { }

  ngOnInit() {
    
    //this.router.events.subscribe(res => {
    //  this.iFrameUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.iframeUrlStr);
    //});

    this.iFrameUrl = this.sanitizer.bypassSecurityTrustResourceUrl('http://localhost/reports/report/SGV/HistoriaClinica_?Id=' + this.paciente +'&rs:embed=true');
    console.log('reporte '+this.iFrameUrl);
   /*this.router.events.subscribe(res => {
      this.iFrameUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.navBar.iframeUrlStr);
    });

    this.iFrameUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.navBar.iframeUrlStr);
  */
  }


  getURL() {
    return this.iFrameUrl;
  };
}

