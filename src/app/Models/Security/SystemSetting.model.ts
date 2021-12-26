import { SystemModule } from './SystemModule.model';

export class SystemSetting {
  systemSettingId: number;
  module: SystemModule;
  key: string;
  value: string;
  isDeleted: boolean = false;
}
