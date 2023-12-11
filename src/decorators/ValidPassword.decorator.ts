import { ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, registerDecorator } from "class-validator";

@ValidatorConstraint({ name: 'IsValidPassword', async: false })
export class ValidatePassword implements ValidatorConstraintInterface
{
  validate(value: any, args: ValidationArguments) {

    if(!value)
      return false;
    
    const minLength = 8;
    const hasLetter = value.match(/[a-zA-Z]/);
    const hasNumber = value.match(/\d/);
    const hasSpecialChar = value.match(/[!@#$%^&*(),.?":{}|<>]/);

    return (
      value.length >= minLength &&
      hasLetter &&
      hasNumber &&
      hasSpecialChar
    );
  }
}

export function IsValidPassword(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
      registerDecorator({
        name: 'IsValidPassword',
        target: object.constructor,
        propertyName: propertyName,
        constraints: [],
        options: validationOptions,
        validator: ValidatePassword,
      });
    };
  }