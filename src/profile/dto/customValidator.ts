import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { socialNetworks } from 'src/common/socials';
import { URL } from 'url';

@ValidatorConstraint({ name: 'isUrlWithHostname', async: false })
export class IsUrlWithHostname implements ValidatorConstraintInterface {
  validate(value: string, args: ValidationArguments) {
    console.log('changing to url', value);
    const url = new URL(value);
    console.log('checking if url is allowed');
    if (!socialNetworks[url.hostname]) return false;

    return true;
  }
}
