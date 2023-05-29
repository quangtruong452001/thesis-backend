import {
  IsString,
  IsNumber,
  IsOptional,
  IsEnum,
  IsNotEmpty,
  IsIn,
  IsMongoId,
  Matches,
} from 'class-validator';

enum LocationType {
  HOME = 'HOME',
  STORE = 'STORE',
}

enum ReservationStatus {
  BOOKED = 'BOOKED',
  SUCCESS = 'SUCCESS',
  CANCELLED = 'CANCELLED',
}

class LocationInput {
  @IsIn(['Hồ Chí Minh', 'Hà Nội'])
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
  @IsNotEmpty()
  @IsMongoId()
  userId: string;

  @IsString()
  userName: string;

  @Matches(/^\d{10}$/)
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
  @IsMongoId()
  userId: string;

  @IsOptional()
  @IsString()
  userName: string;

  @IsOptional()
  @Matches(/^\d{10}$/)
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

  // @IsOptional()
  // staffId: string;
}
