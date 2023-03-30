/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export enum NotificationType {
  RESERVATION = 'RESERVATION',
  ORDER = 'ORDER',
}

export enum OrderStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  FINISHED = 'FINISHED',
  RETURNED = 'RETURNED',
  CANCELED = 'CANCELED',
}

export enum LocationType {
  HOME = 'HOME',
  STORE = 'STORE',
}

export enum ReservationStatus {
  BOOKED = 'BOOKED',
  SUCCESS = 'SUCCESS',
  CANCELED = 'CANCELED',
}

export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export class AuthInput {
  email: string;
  password: string;
  lastName?: Nullable<string>;
  firstName?: Nullable<string>;
}

export class ImageInput {
  _id?: Nullable<string>;
  url: string;
  image_name?: Nullable<string>;
  createdAt?: Nullable<DateTime>;
  updatedAt?: Nullable<DateTime>;
}

export class CreateNotificationInput {
  title: string;
  type: NotificationType;
  orderId?: Nullable<string>;
  reservationId?: Nullable<string>;
}

export class OrderFilter {
  status?: Nullable<OrderStatus>;
}

export class CartItemInput {
  id?: Nullable<string>;
  name?: Nullable<string>;
  quantity?: Nullable<number>;
  price?: Nullable<number>;
  images?: Nullable<Nullable<ImageInput>[]>;
}

export class InfoInput {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  company: string;
  region: string;
  district: string;
  ward: string;
  address: string;
  orderComment?: Nullable<string>;
  paymentMethod: string;
}

export class CreateOrderInput {
  cart: CartItemInput[];
  bill: InfoInput;
  payment?: Nullable<string>;
  shippingTime: string;
  shippingFee: number;
  totalPrice: number;
  status?: Nullable<OrderStatus>;
}

export class UpdateOrderInput {
  cart?: Nullable<CartItemInput[]>;
  bill?: Nullable<InfoInput>;
  payment?: Nullable<string>;
  shippingTime?: Nullable<string>;
  shippingFee?: Nullable<number>;
  totalPrice?: Nullable<number>;
  status?: Nullable<OrderStatus>;
}

export class CreatePaymentInput {
  externalId: string;
  payerFistName: string;
  payerLastName: string;
  currencyCode: string;
  totalAmount: string;
  type: string;
}

export class ProductFilter {
  name?: Nullable<string>;
  categories?: Nullable<string>;
  minPrice?: Nullable<number>;
  maxPrice?: Nullable<number>;
}

export class CreateProductInput {
  name: string;
  productCode: string;
  productSKU: string;
  price: number;
  description: string;
  shortDescription?: Nullable<string>;
  additionalInfos?: Nullable<string>;
  categories: Nullable<string>[];
}

export class UpdateProductInput {
  name?: Nullable<string>;
  productCode?: Nullable<string>;
  productSKU?: Nullable<string>;
  price?: Nullable<number>;
  description?: Nullable<string>;
  shortDescription?: Nullable<string>;
  additionalInfos?: Nullable<string>;
  categories?: Nullable<Nullable<string>[]>;
}

export class ReservationInput {
  userName: string;
  phoneNumber: string;
  species?: Nullable<string>;
  breed: string;
  weight: number;
  reservationDate?: Nullable<DateTime>;
  reservationHour: string;
  serviceType: string;
  locationType: LocationType;
  location: LocationInput;
  note?: Nullable<string>;
  status: ReservationStatus;
}

export class UpdateReservationInput {
  userId?: Nullable<string>;
  userName?: Nullable<string>;
  phoneNumber?: Nullable<string>;
  species?: Nullable<string>;
  breed?: Nullable<string>;
  weight?: Nullable<number>;
  reservationDate?: Nullable<DateTime>;
  reservationHour?: Nullable<string>;
  serviceType?: Nullable<string>;
  locationType?: Nullable<LocationType>;
  location?: Nullable<LocationInput>;
  note?: Nullable<string>;
  status?: Nullable<ReservationStatus>;
}

export class LocationInput {
  region: string;
  district: string;
  ward: string;
  address: string;
  description?: Nullable<string>;
}

export class ServicePriceInput {
  name?: Nullable<string>;
  serviceId?: Nullable<number>;
  price?: Nullable<string>;
  priceNumber?: Nullable<number>;
  minWeight?: Nullable<number>;
  maxWeight?: Nullable<number>;
  updatedAt?: Nullable<DateTime>;
}

export class ServiceTypeInput {
  name?: Nullable<string>;
  price?: Nullable<Nullable<ServicePriceInput>[]>;
  description?: Nullable<string>;
  timeServe?: Nullable<string>;
  selectedCount?: Nullable<number>;
  typeId?: Nullable<number>;
}

export class UpdateServiceTypeInput {
  name?: Nullable<string>;
  price?: Nullable<Nullable<ServicePriceInput>[]>;
  description?: Nullable<string>;
  timeServe?: Nullable<string>;
}

export class UserInput {
  name: string;
  email: string;
  role?: Nullable<UserRole>;
  password: string;
}

export interface MutationOf {
  success?: Nullable<boolean>;
  msg?: Nullable<string>;
}

export interface Paginator {
  hasNextPage?: Nullable<boolean>;
  limit?: Nullable<number>;
  page?: Nullable<number>;
  prevPage?: Nullable<number>;
  total?: Nullable<number>;
  hasPrevPage?: Nullable<boolean>;
  nextPage?: Nullable<number>;
  pagingCounter?: Nullable<number>;
  totalPages?: Nullable<number>;
}

export abstract class IMutation {
  abstract signIn(
    input: AuthInput,
  ): Nullable<AuthPayload> | Promise<Nullable<AuthPayload>>;

  abstract signUp(
    input: AuthInput,
  ): Nullable<AuthPayload> | Promise<Nullable<AuthPayload>>;

  abstract updateCategory(
    id: string,
    name: string,
  ): Nullable<CategoryMutation> | Promise<Nullable<CategoryMutation>>;

  abstract deleteCategory(
    id: string,
  ): Nullable<CategoryMutation> | Promise<Nullable<CategoryMutation>>;

  abstract addCategory(
    name?: Nullable<string>,
  ): Nullable<CategoryMutation> | Promise<Nullable<CategoryMutation>>;

  abstract createNotification(
    input: CreateNotificationInput,
  ): NotificationMutation | Promise<NotificationMutation>;

  abstract markNotificationAsRead(
    id: string,
  ): Nullable<string> | Promise<Nullable<string>>;

  abstract deleteNotification(
    id: string,
  ): NotificationMutation | Promise<NotificationMutation>;

  abstract createOrder(
    input: CreateOrderInput,
  ): Nullable<OrderMutation> | Promise<Nullable<OrderMutation>>;

  abstract updateOrder(
    id: string,
    input: UpdateOrderInput,
  ): Nullable<OrderMutation> | Promise<Nullable<OrderMutation>>;

  abstract deleteOrder(
    id: string,
  ): Nullable<OrderMutation> | Promise<Nullable<OrderMutation>>;

  abstract createPayment(
    input: CreatePaymentInput,
  ): Nullable<Payment> | Promise<Nullable<Payment>>;

  abstract deleteProduct(
    id: string,
  ): Nullable<ProductMutation> | Promise<Nullable<ProductMutation>>;

  abstract createProduct(
    product: CreateProductInput,
    files?: Nullable<Upload[]>,
  ): Nullable<Product> | Promise<Nullable<Product>>;

  abstract updateProduct(
    id: string,
    input?: Nullable<UpdateProductInput>,
    files?: Nullable<Nullable<Upload>[]>,
  ): Nullable<Product> | Promise<Nullable<Product>>;

  abstract createReservation(
    reservation: ReservationInput,
  ): Reservation | Promise<Reservation>;

  abstract updateReservation(
    id: string,
    reservation: UpdateReservationInput,
  ): Reservation | Promise<Reservation>;

  abstract deleteReservation(
    id: string,
  ): Nullable<Reservation> | Promise<Nullable<Reservation>>;

  abstract createServiceType(
    serviceType: ServiceTypeInput,
  ): ServiceType | Promise<ServiceType>;

  abstract updateServiceType(
    id: string,
    serviceType: UpdateServiceTypeInput,
  ): ServiceType | Promise<ServiceType>;

  abstract deleteServiceType(
    id: string,
  ): Nullable<ServiceType> | Promise<Nullable<ServiceType>>;
}

export class AuthPayload {
  accessToken?: Nullable<string>;
  expiredIn?: Nullable<number>;
  user?: Nullable<User>;
  statusCode?: Nullable<number>;
}

export abstract class IQuery {
  abstract categories():
    | Nullable<Nullable<Category>[]>
    | Promise<Nullable<Nullable<Category>[]>>;

  abstract notifications(): Notification[] | Promise<Notification[]>;

  abstract countIsRead(): Nullable<number> | Promise<Nullable<number>>;

  abstract orders(
    page?: Nullable<number>,
    limit?: Nullable<number>,
    sort?: Nullable<string>,
    filters?: Nullable<OrderFilter>,
  ): Nullable<OrderPagination> | Promise<Nullable<OrderPagination>>;

  abstract order(id: string): Nullable<Order> | Promise<Nullable<Order>>;

  abstract totalOrderandSales():
    | Nullable<OrderSales>
    | Promise<Nullable<OrderSales>>;

  abstract latestOrders():
    | Nullable<Nullable<Order>[]>
    | Promise<Nullable<Nullable<Order>[]>>;

  abstract products(
    page?: Nullable<number>,
    limit?: Nullable<number>,
    sort?: Nullable<string>,
    filters?: Nullable<ProductFilter>,
  ): Nullable<ProductPagination> | Promise<Nullable<ProductPagination>>;

  abstract allProducts(
    filters?: Nullable<ProductFilter>,
  ): Nullable<ProductPagination> | Promise<Nullable<ProductPagination>>;

  abstract productDetail(
    id: string,
  ): Nullable<Product> | Promise<Nullable<Product>>;

  abstract totalProducts(): Nullable<number> | Promise<Nullable<number>>;

  abstract productsId():
    | Nullable<Nullable<string>[]>
    | Promise<Nullable<Nullable<string>[]>>;

  abstract minPrice(): Nullable<number> | Promise<Nullable<number>>;

  abstract maxPrice(): Nullable<number> | Promise<Nullable<number>>;

  abstract recommendProduct():
    | Nullable<Nullable<Product>[]>
    | Promise<Nullable<Nullable<Product>[]>>;

  abstract reservations(): Reservation[] | Promise<Reservation[]>;

  abstract reservation(
    id: string,
  ): Nullable<Reservation> | Promise<Nullable<Reservation>>;

  abstract totalReservationSales(): Nullable<Sales> | Promise<Nullable<Sales>>;

  abstract todayReservations():
    | Nullable<Nullable<Reservation>[]>
    | Promise<Nullable<Nullable<Reservation>[]>>;

  abstract getHours():
    | Nullable<Nullable<Hour>[]>
    | Promise<Nullable<Nullable<Hour>[]>>;

  abstract serviceTypes(): ServiceType[] | Promise<ServiceType[]>;

  abstract serviceType(
    id: string,
  ): Nullable<ServiceType> | Promise<Nullable<ServiceType>>;
}

export class Category {
  _id: string;
  category_name: string;
  totalProducts?: Nullable<number>;
}

export class CategoryMutation implements MutationOf {
  success?: Nullable<boolean>;
  msg?: Nullable<string>;
  data?: Nullable<Category>;
}

export class Hour {
  _id?: Nullable<string>;
  name?: Nullable<string>;
  time?: Nullable<number>;
  timeFrame?: Nullable<string>;
  slot?: Nullable<number>;
}

export class Image {
  id?: Nullable<string>;
  url: string;
  image_name?: Nullable<string>;
  createdDay?: Nullable<DateTime>;
}

export abstract class ISubscription {
  abstract newNotification(
    title: string,
  ): Nullable<Notification> | Promise<Nullable<Notification>>;

  abstract newOrderNotification(
    title: string,
  ): Nullable<Notification> | Promise<Nullable<Notification>>;

  abstract newReservationNotification(
    title: string,
  ): Nullable<Notification> | Promise<Nullable<Notification>>;
}

export class Notification {
  _id: string;
  title: string;
  type: NotificationType;
  orderId: string;
  order?: Nullable<Nullable<Order>[]>;
  reservation?: Nullable<Nullable<Reservation>[]>;
  isRead: boolean;
  createdAt?: Nullable<DateTime>;
}

export class NotificationMutation {
  success: boolean;
  msg: string;
  data?: Nullable<Notification>;
}

export class OrderSales {
  totalOrder?: Nullable<number>;
  totalPendingOrder?: Nullable<number>;
  totalFinishedOrder?: Nullable<number>;
  totalSales?: Nullable<number>;
}

export class Images {
  _id: string;
  image_name: string;
  url: string;
}

export class CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  images: Nullable<Images>[];
}

export class Info {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  company: string;
  region: string;
  district: string;
  ward: string;
  address: string;
  orderComment?: Nullable<string>;
  paymentMethod: string;
}

export class Order {
  _id: string;
  cart: CartItem[];
  bill: Info;
  user?: Nullable<User>;
  payment?: Nullable<string>;
  shippingTime: string;
  shippingFee: number;
  totalPrice: number;
  status: OrderStatus;
  createdAt?: Nullable<DateTime>;
  updatedAt?: Nullable<DateTime>;
}

export class Payment {
  _id: string;
  externalId: string;
  payerFistName: string;
  payerLastName: string;
  currencyCode: string;
  totalAmount: string;
  type: string;
  user: string;
  createdAt?: Nullable<DateTime>;
  updatedAt?: Nullable<DateTime>;
}

export class OrderPagination implements Paginator {
  docs?: Nullable<Nullable<Order>[]>;
  hasNextPage?: Nullable<boolean>;
  limit?: Nullable<number>;
  page?: Nullable<number>;
  prevPage?: Nullable<number>;
  total?: Nullable<number>;
  hasPrevPage?: Nullable<boolean>;
  nextPage?: Nullable<number>;
  pagingCounter?: Nullable<number>;
  totalPages?: Nullable<number>;
}

export class OrderMutation implements MutationOf {
  success?: Nullable<boolean>;
  msg?: Nullable<string>;
  data?: Nullable<Order>;
}

export class ProductPagination implements Paginator {
  docs?: Nullable<Nullable<Product>[]>;
  hasNextPage?: Nullable<boolean>;
  limit?: Nullable<number>;
  page?: Nullable<number>;
  prevPage?: Nullable<number>;
  total?: Nullable<number>;
  hasPrevPage?: Nullable<boolean>;
  nextPage?: Nullable<number>;
  pagingCounter?: Nullable<number>;
  totalPages?: Nullable<number>;
}

export class Product {
  _id: string;
  name?: Nullable<string>;
  productCode?: Nullable<string>;
  productSKU?: Nullable<string>;
  description?: Nullable<string>;
  price?: Nullable<number>;
  shortDescription?: Nullable<string>;
  additionalInfos?: Nullable<string>;
  stock?: Nullable<number>;
  images?: Nullable<Nullable<Image>[]>;
  categories?: Nullable<Nullable<Category>[]>;
}

export class ProductMutation implements MutationOf {
  success?: Nullable<boolean>;
  msg?: Nullable<string>;
  data?: Nullable<Product>;
}

export class Sales {
  totalSales?: Nullable<number>;
}

export class Reservation {
  _id: string;
  userId: User;
  userName: string;
  phoneNumber: string;
  species?: Nullable<string>;
  breed: string;
  weight: number;
  reservationDate: DateTime;
  reservationHour: Hour;
  serviceType: ServiceType;
  locationType: string;
  location: Location;
  note?: Nullable<string>;
  status: string;
}

export class Location {
  region: string;
  district: string;
  ward: string;
  address: string;
  description?: Nullable<string>;
}

export class ServiceType {
  _id: string;
  name?: Nullable<string>;
  price?: Nullable<Nullable<ServicePrice>[]>;
  selectedCount?: Nullable<number>;
  description?: Nullable<string>;
  timeServe?: Nullable<string>;
  typeId?: Nullable<number>;
}

export class ServicePrice {
  name?: Nullable<string>;
  serviceId?: Nullable<number>;
  price?: Nullable<string>;
  priceNumber?: Nullable<number>;
  minWeight?: Nullable<number>;
  maxWeight?: Nullable<number>;
  updatedAt?: Nullable<DateTime>;
}

export class User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role?: Nullable<string>;
}

export type DateTime = any;
export type Upload = any;
type Nullable<T> = T | null;
