import { User } from './User.model';
import { Permission } from './Permission.model';

export class OperationLog {
  operationLogId: number;
  user: User;
  permission: Permission;
  operationDateTime: Date;
  description: string;
  tableName: string;
  valueId: string;
}
