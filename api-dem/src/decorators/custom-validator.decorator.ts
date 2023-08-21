import {
	ArgumentMetadata,
	BadRequestException,
	ValidationPipe,
	UnprocessableEntityException,
} from '@nestjs/common';
import {
	customError,
	betslipError,
	slotegratorError,
	blueoceanError,
	fiableError,
	gapiError,
} from 'src/exceptions/http-exception';


export class CustomValidation extends ValidationPipe {
	public async transform(value, metadata: ArgumentMetadata) {
		try {
			return await super.transform(value, metadata);
		} catch (e) {

			customError(e.response.message);
			/*if (e instanceof BadRequestException) {
				throw new UnprocessableEntityException(e.message);
			}*/
		}
	}
}
