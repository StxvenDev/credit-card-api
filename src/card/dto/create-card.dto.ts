import { IsOptional } from "class-validator";
import { IsNumber, IsString, MinLength } from "class-validator";

export class CreateCardDto {
    @IsString()
    @MinLength(2)
    cardNumber : string;

    @IsNumber()
    creditLimit : number;

    @IsNumber()
    @IsOptional()
    balance : number;

}
