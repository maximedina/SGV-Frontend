import { User } from '../Security/User.model';

export class Email {
    recipient :string;
    subject : string;
    message : string;
    html : string;
    sender : string;
}
