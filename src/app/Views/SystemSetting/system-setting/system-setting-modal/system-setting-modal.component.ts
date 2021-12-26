import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SystemSetting } from '../../../../Models/Security/SystemSetting.model';
import { SystemModule } from '../../../../Models/Security/SystemModule.model';

@Component({
  selector: 'app-system-setting-modal',
  templateUrl: './system-setting-modal.component.html',
  styleUrls: ['./system-setting-modal.component.css']
})
export class SystemSettingModalComponent implements OnInit {
  display: boolean = false;

  @Input() modules: SystemModule[];
  module: SystemModule = new SystemModule();

  systemSetting: SystemSetting;

  @Output() sendDataModal = new EventEmitter();

  constructor() { }

  ngOnInit() {
    this.systemSetting = new SystemSetting();
  }

  /* Show Modal Add */
  showModal() {
    this.systemSetting = new SystemSetting();
    this.display = !this.display;
  }

  /* Add New Setting */
  addNewSystemSetting(systemSetting: SystemSetting) {
    this.sendDataModal.emit(systemSetting);
    this.display = !this.display;
  }
}
