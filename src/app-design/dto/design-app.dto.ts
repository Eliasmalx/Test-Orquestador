// src/app-design/dto/design-app.dto.ts
import { IsEnum, IsOptional, IsString, MinLength } from 'class-validator';

export class DesignAppDto {
  @IsString()
  @MinLength(5)
  idea!: string;

  @IsOptional()
  @IsString()
  targetUsers?: string;

  @IsOptional()
  @IsEnum(['web', 'mobile', 'desktop', 'api'])
  platform?: 'web' | 'mobile' | 'desktop' | 'api';
}