import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";

export class CreateTodoDto {
    
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @MaxLength(256)
    name!: string

    @ApiPropertyOptional({default: ''})
    @IsOptional()
    @IsString()
    description?: string

    @ApiPropertyOptional({default: false})
    @IsOptional()
    @IsBoolean()
    isDone?: boolean


}
