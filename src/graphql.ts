
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export enum NotificationType {
    RESERVATION = "RESERVATION",
    ORDER = "ORDER"
}

export enum OrderStatus {
    PENDING = "PENDING",
    CONFIRMED = "CONFIRMED",
    FINISHED = "FINISHED",
    RETURNED = "RETURNED",
    CANCELED = "CANCELED"
}

export enum LocationType {
    HOME = "HOME",
    STORE = "STORE"
}

export enum ReservationStatus {
    BOOKED = "BOOKED",
    SUCCESS = "SUCCESS",
    CANCELED = "CANCELED"
}

export enum UserRole {
    ADMIN = "ADMIN",
    USER = "USER"
}

export class AuthInput {
    email: string;
    password: string;
    lastName?: Nullable<string>;
    firstName?: Nullable<string>;
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
    productId: string;
    quantity: number;
}

export class InfoInput {
    name: string;
    email: string;
    address: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
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
    images: Nullable<string>[];
    categories: Nullable<string>[];
}

export class ReservationInput {
    userId: string;
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
    abstract signIn(input: AuthInput): Nullable<AuthPayload> | Promise<Nullable<AuthPayload>>;

    abstract signUp(input: AuthInput): Nullable<AuthPayload> | Promise<Nullable<AuthPayload>>;

    abstract updateCategory(id: string, name: string): Nullable<CategoryMutation> | Promise<Nullable<CategoryMutation>>;

    abstract deleteCategory(id: string): Nullable<CategoryMutation> | Promise<Nullable<CategoryMutation>>;

    abstract addCategory(name?: Nullable<string>): Nullable<CategoryMutation> | Promise<Nullable<CategoryMutation>>;

    abstract createOrder(input: CreateOrderInput): Nullable<OrderMutation> | Promise<Nullable<OrderMutation>>;

    abstract updateOrder(id: string, input: UpdateOrderInput): Nullable<OrderMutation> | Promise<Nullable<OrderMutation>>;

    abstract deleteOrder(id: string): Nullable<OrderMutation> | Promise<Nullable<OrderMutation>>;

    abstract deleteProduct(id: string): Nullable<ProductMutation> | Promise<Nullable<ProductMutation>>;

    abstract createReservation(reservation: ReservationInput): Reservation | Promise<Reservation>;

    abstract updateReservation(id: string, reservation: UpdateReservationInput): Reservation | Promise<Reservation>;

    abstract deleteReservation(id: string): Nullable<Reservation> | Promise<Nullable<Reservation>>;
}

export class AuthPayload {
    accessToken?: Nullable<string>;
    expiredIn?: Nullable<number>;
    user?: Nullable<User>;
    statusCode?: Nullable<number>;
}

export abstract class IQuery {
    abstract categories(): Nullable<Nullable<Category>[]> | Promise<Nullable<Nullable<Category>[]>>;

    abstract orders(page?: Nullable<number>, limit?: Nullable<number>, sort?: Nullable<string>, filters?: Nullable<OrderFilter>): Nullable<OrderPagination> | Promise<Nullable<OrderPagination>>;

    abstract order(id: string): Nullable<Order> | Promise<Nullable<Order>>;

    abstract products(page?: Nullable<number>, limit?: Nullable<number>, sort?: Nullable<string>, filters?: Nullable<ProductFilter>): Nullable<ProductPagination> | Promise<Nullable<ProductPagination>>;

    abstract productDetail(id: string): Nullable<Product> | Promise<Nullable<Product>>;

    abstract totalProducts(): Nullable<number> | Promise<Nullable<number>>;

    abstract productsId(): Nullable<Nullable<string>[]> | Promise<Nullable<Nullable<string>[]>>;

    abstract minPrice(): Nullable<number> | Promise<Nullable<number>>;

    abstract maxPrice(): Nullable<number> | Promise<Nullable<number>>;

    abstract reservations(): Reservation[] | Promise<Reservation[]>;

    abstract reservation(id: string): Nullable<Reservation> | Promise<Nullable<Reservation>>;
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

export class ServiceType {
    _id?: Nullable<string>;
    name?: Nullable<string>;
    price?: Nullable<Nullable<ServicePrice>[]>;
    selectedCount?: Nullable<number>;
    description?: Nullable<string>;
    timeServe?: Nullable<string>;
    type?: Nullable<string>;
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

export class Image {
    id?: Nullable<string>;
    url: string;
    image_name?: Nullable<string>;
}

export class Notification {
    id: string;
    title: string;
    type: NotificationType;
    order?: Nullable<Order>;
    reservation?: Nullable<Reservation>;
    isRead: boolean;
    createdAt?: Nullable<string>;
}

export class NotificationMutation {
    success: boolean;
    msg: string;
    data?: Nullable<Notification>;
}

export class CartItem {
    productId: string;
    quantity: number;
}

export class Info {
    name: string;
    email: string;
    address: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
}

export class Order {
    id: string;
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
    id: string;
    name?: Nullable<string>;
    productCode?: Nullable<string>;
    productSKU?: Nullable<string>;
    description?: Nullable<string>;
    price?: Nullable<number>;
    shortDescription?: Nullable<string>;
    additionalInfo?: Nullable<string>;
    stock?: Nullable<number>;
    images?: Nullable<Nullable<Image>[]>;
    categories?: Nullable<Nullable<Category>[]>;
}

export class ProductMutation implements MutationOf {
    success?: Nullable<boolean>;
    msg?: Nullable<string>;
    data?: Nullable<Product>;
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

export class User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role?: Nullable<string>;
}

export type DateTime = any;
type Nullable<T> = T | null;
