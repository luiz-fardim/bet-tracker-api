import { IsEnum, IsOptional } from "class-validator";
import { betStatus } from "../entities/bet.entity";

export class FindBetDto {
    @IsOptional()
    @IsEnum(betStatus)
    status: betStatus
}