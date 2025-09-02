import { IsString, IsOptional } from 'class-validator';

export class CreateOAuthUrlDto {
  @IsString()
  successUrl: string;

  @IsString()
  failureUrl: string;
}

export class OAuthCallbackDto {
  @IsString()
  userId: string;

  @IsString()
  secret: string;
}

export class AuthResponseDto {
  success: boolean;
  message: string;
  data?: any;
  redirectUrl?: string;
}

export class UserSessionDto {
  @IsString()
  @IsOptional()
  secretToken?: string;
}
