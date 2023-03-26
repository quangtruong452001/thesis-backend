import { IsNotEmpty, IsEnum, IsOptional, IsBoolean } from 'class-validator';

export enum notificationType {
  'RESERVATION' = 'RESERVATION',
  'ORDER' = 'ORDER',
}

export class NotificationDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  @IsEnum(notificationType)
  type: notificationType;

  @IsOptional()
  orderId?: string;

  @IsOptional()
  reservationId?: string;

  @IsOptional()
  @IsBoolean()
  isRead?: boolean;

  // @IsOptional()
  // createdAt: Date;
}
