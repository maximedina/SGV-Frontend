import { OnInit, Component, HostListener } from '@angular/core';
import { Profile } from '../../../Models/Security/Profile.model';
import { SecurityService } from '../../../services/security.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  clonedProfiles: Profile[] = [];
  profiles: Profile[];
  profile: Profile = new Profile();
  newProfile: any;

  cols: any;

  disabled: boolean;
  disableAdd: boolean = true;

  screenWidth:any;
  screenHeight: any;
  scrollHeight: any;

  constructor(private profileService: SecurityService) {
    this.profiles = [];
    this.newProfile;
    this.profile = new Profile();
  }

  ngOnInit() {

    this.profileService.getProfiles().subscribe(
      (data) => {
        this.profiles = data;
      }
    );

    this.cols = [
      { field: 'name', header: 'Nombre' },
      { field: 'description', header: 'Descripción' },
    ];

    this.onResize();
  }

  @HostListener('window:resize', ['$event'])
    onResize(event?) {
      this.screenHeight = window.innerHeight;
      this.screenWidth = window.innerWidth;
      this.scrollHeight = this.screenHeight - 390;
      this.scrollHeight += "px";
  }

  buttonSearch(disabled: boolean) {
    return this.disabled = false;
  }

  // Disable Button Search
  disableButtonSearch() {
    const buttonSearch = this.search;
    if(!buttonSearch) {
    }
  }

  // Button Search
  search(form) {
    this.profileService.getProfile(form.value.name, form.value.description)
      .subscribe((result) => {
        this.profiles = result;
      }
    );
  }

  inputProfile (profile: Profile){
    this.profile = {...profile};
  }
}
