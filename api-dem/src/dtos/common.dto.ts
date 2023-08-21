// common.dto.ts

import {
	IsString,
	IsNotEmpty,
	IsBoolean,
	IsOptional,
	IsUUID,
	Min,
	Max,
	IsPositive,
	IsEnum,
	MinLength,
	MaxLength,
	Validate,
	IsUrl,
	registerDecorator,
	ValidationArguments,
	ValidationOptions,
	IsIn,
	IsNumber,
	ValidateNested,
	IsNotEmptyObject,
	IsObject,
	IsEmail,
} from 'class-validator';
import { Type } from 'class-transformer';
/*

{
        "meubles": [
            {
                "id": 27,
                "cat_id": 5,
                "title": "Armoire 3/4 aux portes coulisantes",
                "img": "https://fly-demenagement.ch/wp-content/uploads/2023/02/armoire-aux-portes-coulissantes.svg",
                "quantity": 1
            },
            {
                "id": 26,
                "cat_id": 5,
                "title": "Armoire 2 portes",
                "img": "https://fly-demenagement.ch/wp-content/uploads/2023/02/Armoire-2-portes.svg",
                "quantity": 1
            }
        ],
        "form_address": {
            "dep": {
                "type": "Depart",
                "rue": "sahloul",
                "code_postal": "4000",
                "ville": "sousse",
                "pays": "Tunisia"
            },
            "arr": {
                "type": "Arrivee",
                "rue": "khzema",
                "code_postal": "4010",
                "ville": "sousse",
                "pays": "Tunisia"
            }
        },
        "form_client": {
            "nom_prenom": "iheb",
            "email": "iheb@gmail.com",
            "tel": "99192298",
            "date": "2023-08-18T19:00:00.000Z",
            "message": ""
        }
    
}

*/

class FurnitureDto {
    @IsNotEmpty()
    @IsNumber()
    id: number;

    @IsNotEmpty()
    @IsNumber()
    cat_id: number;

    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsUrl()
    img: string;

    @IsNotEmpty()
    @IsNumber()
    quantity: number;
}


class ClientFormDto {

	@IsNotEmpty()
	@IsString()
	nom_prenom:string
	


	@IsNotEmpty()
	@IsEmail()
	email:string

	@IsNotEmpty()
	@IsString()
	tel:string


	@IsNotEmpty()
	@IsString()
	date:string


	@IsOptional()
	@IsString()
	message:string

	

}

class AddressDto {
    @IsNotEmpty()
    @IsString()
    type: string;

    @IsNotEmpty()
    @IsString()
    rue: string;

    @IsNotEmpty()
    @IsString()
    code_postal: string;

    @IsNotEmpty()
    @IsString()
    ville: string;

    @IsNotEmpty()
    @IsString()
    pays: string;
}

class FormAddressDto {
    @ValidateNested()
    @Type(() => AddressDto)
    dep: AddressDto;

    @ValidateNested()
    @Type(() => AddressDto)
    arr: AddressDto;
}
export class RequestDem {


	
	@ValidateNested()
	@IsNotEmptyObject()
	@IsObject()
	@Type(()=> ClientFormDto)
	form_client : ClientFormDto;


	@ValidateNested({ each: true })
    @Type(() => FurnitureDto)
    meubles: FurnitureDto[];

    @ValidateNested()
    @Type(() => FormAddressDto) // Use FormAddressDto here
    form_address: FormAddressDto;




}



