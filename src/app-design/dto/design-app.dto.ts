import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString, MinLength } from 'class-validator';

export class DesignAppDto {
  @ApiProperty({ example: 'Una app para descubrir eventos en Madrid' })
  @IsString()
  @MinLength(5)
  idea!: string;

  @ApiPropertyOptional({ example: 'jóvenes profesionales' })
  @IsOptional()
  @IsString()
  targetUsers?: string;

  @ApiPropertyOptional({ example: 'web', enum: ['web', 'mobile', 'desktop', 'api'] })
  @IsOptional()
  @IsEnum(['web', 'mobile', 'desktop', 'api'])
  platform?: 'web' | 'mobile' | 'desktop' | 'api';
}

