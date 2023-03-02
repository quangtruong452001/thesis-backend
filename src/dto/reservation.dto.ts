import {
  IsString,
  IsNumber,
  IsOptional,
  IsEnum,
  IsNotEmpty,
  Length,
} from 'class-validator';

enum LocationType {
  HOME = 'HOME',
  STORE = 'STORE',
}

enum ReservationStatus {
  BOOKED = 'BOOKED',
  SUCCESS = 'SUCCESS',
  CANCELED = 'CANCELED',
}

class LocationInput {
  @IsString()
  region: string;

  @IsString()
  district: string;

  @IsString()
  ward: string;

  @IsString()
  address: string;

  @IsOptional()
  @IsString()
  description?: string;
}

export class ReservationInput {
  // @IsNotEmpty()
  userId: string;

  @IsString()
  userName: string;
  @Length(10, 10)
  @IsString()
  phoneNumber: string;

  // @ArrayMinSize(1)
  @IsString()
  species: string;

  @IsString()
  breed: string;

  @IsNumber()
  weight: number;

  @IsOptional()
  reservationDate: Date;

  @IsNotEmpty()
  reservationHour: string;

  @IsNotEmpty()
  serviceType: string;

  @IsEnum(LocationType)
  locationType: LocationType;

  @IsNotEmpty()
  location: LocationInput;

  @IsOptional()
  @IsString()
  note?: string;

  @IsEnum(ReservationStatus)
  status: ReservationStatus;
}

export class UpdateReservationInput {
  @IsOptional()
  userId: string;

  @IsOptional()
  @IsString()
  userName: string;

  @IsOptional()
  @IsString()
  @Length(10, 10)
  phoneNumber: string;

  @IsOptional()
  // @ArrayMinSize(1)
  @IsString()
  species: string;

  @IsOptional()
  @IsString()
  breed: string;

  @IsOptional()
  @IsNumber()
  weight: number;

  @IsOptional()
  reservationDate: Date;

  @IsOptional()
  reservationHour: string;

  @IsOptional()
  serviceType: string;

  @IsOptional()
  @IsEnum(LocationType)
  locationType: LocationType;

  @IsOptional()
  location: LocationInput;

  @IsOptional()
  @IsString()
  note?: string;

  @IsOptional()
  @IsEnum(ReservationStatus)
  status: ReservationStatus;
}
