
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Outlet
 * 
 */
export type Outlet = $Result.DefaultSelection<Prisma.$OutletPayload>
/**
 * Model Customer
 * 
 */
export type Customer = $Result.DefaultSelection<Prisma.$CustomerPayload>
/**
 * Model Review
 * 
 */
export type Review = $Result.DefaultSelection<Prisma.$ReviewPayload>
/**
 * Model CustomerVisit
 * 
 */
export type CustomerVisit = $Result.DefaultSelection<Prisma.$CustomerVisitPayload>
/**
 * Model MenuCategory
 * 
 */
export type MenuCategory = $Result.DefaultSelection<Prisma.$MenuCategoryPayload>
/**
 * Model MenuItem
 * 
 */
export type MenuItem = $Result.DefaultSelection<Prisma.$MenuItemPayload>
/**
 * Model AutomationLog
 * 
 */
export type AutomationLog = $Result.DefaultSelection<Prisma.$AutomationLogPayload>
/**
 * Model Staff
 * 
 */
export type Staff = $Result.DefaultSelection<Prisma.$StaffPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const Gender: {
  Male: 'Male',
  Female: 'Female',
  Transgender: 'Transgender',
  RatherNotSay: 'RatherNotSay'
};

export type Gender = (typeof Gender)[keyof typeof Gender]


export const MaritalStatus: {
  Married: 'Married',
  Unmarried: 'Unmarried'
};

export type MaritalStatus = (typeof MaritalStatus)[keyof typeof MaritalStatus]


export const ReviewType: {
  first_visit: 'first_visit',
  repeat: 'repeat'
};

export type ReviewType = (typeof ReviewType)[keyof typeof ReviewType]


export const VisitType: {
  qr_scan: 'qr_scan',
  payment: 'payment'
};

export type VisitType = (typeof VisitType)[keyof typeof VisitType]


export const AutomationType: {
  birthday_whatsapp: 'birthday_whatsapp',
  birthday_email: 'birthday_email',
  anniversary_whatsapp: 'anniversary_whatsapp',
  anniversary_email: 'anniversary_email',
  reengagement_whatsapp: 'reengagement_whatsapp',
  reengagement_email: 'reengagement_email'
};

export type AutomationType = (typeof AutomationType)[keyof typeof AutomationType]


export const MessageStage: {
  five_days_before: 'five_days_before',
  one_day_before: 'one_day_before',
  thirty_days_inactive: 'thirty_days_inactive',
  on_day: 'on_day'
};

export type MessageStage = (typeof MessageStage)[keyof typeof MessageStage]


export const AutomationStatus: {
  success: 'success',
  failed: 'failed'
};

export type AutomationStatus = (typeof AutomationStatus)[keyof typeof AutomationStatus]


export const StaffRole: {
  admin: 'admin',
  owner: 'owner',
  franchise_owner: 'franchise_owner',
  main_owner: 'main_owner'
};

export type StaffRole = (typeof StaffRole)[keyof typeof StaffRole]

}

export type Gender = $Enums.Gender

export const Gender: typeof $Enums.Gender

export type MaritalStatus = $Enums.MaritalStatus

export const MaritalStatus: typeof $Enums.MaritalStatus

export type ReviewType = $Enums.ReviewType

export const ReviewType: typeof $Enums.ReviewType

export type VisitType = $Enums.VisitType

export const VisitType: typeof $Enums.VisitType

export type AutomationType = $Enums.AutomationType

export const AutomationType: typeof $Enums.AutomationType

export type MessageStage = $Enums.MessageStage

export const MessageStage: typeof $Enums.MessageStage

export type AutomationStatus = $Enums.AutomationStatus

export const AutomationStatus: typeof $Enums.AutomationStatus

export type StaffRole = $Enums.StaffRole

export const StaffRole: typeof $Enums.StaffRole

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Outlets
 * const outlets = await prisma.outlet.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more Outlets
   * const outlets = await prisma.outlet.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.outlet`: Exposes CRUD operations for the **Outlet** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Outlets
    * const outlets = await prisma.outlet.findMany()
    * ```
    */
  get outlet(): Prisma.OutletDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.customer`: Exposes CRUD operations for the **Customer** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Customers
    * const customers = await prisma.customer.findMany()
    * ```
    */
  get customer(): Prisma.CustomerDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.review`: Exposes CRUD operations for the **Review** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Reviews
    * const reviews = await prisma.review.findMany()
    * ```
    */
  get review(): Prisma.ReviewDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.customerVisit`: Exposes CRUD operations for the **CustomerVisit** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CustomerVisits
    * const customerVisits = await prisma.customerVisit.findMany()
    * ```
    */
  get customerVisit(): Prisma.CustomerVisitDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.menuCategory`: Exposes CRUD operations for the **MenuCategory** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MenuCategories
    * const menuCategories = await prisma.menuCategory.findMany()
    * ```
    */
  get menuCategory(): Prisma.MenuCategoryDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.menuItem`: Exposes CRUD operations for the **MenuItem** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MenuItems
    * const menuItems = await prisma.menuItem.findMany()
    * ```
    */
  get menuItem(): Prisma.MenuItemDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.automationLog`: Exposes CRUD operations for the **AutomationLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AutomationLogs
    * const automationLogs = await prisma.automationLog.findMany()
    * ```
    */
  get automationLog(): Prisma.AutomationLogDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.staff`: Exposes CRUD operations for the **Staff** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Staff
    * const staff = await prisma.staff.findMany()
    * ```
    */
  get staff(): Prisma.StaffDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.7.0
   * Query Engine version: 75cbdc1eb7150937890ad5465d861175c6624711
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Outlet: 'Outlet',
    Customer: 'Customer',
    Review: 'Review',
    CustomerVisit: 'CustomerVisit',
    MenuCategory: 'MenuCategory',
    MenuItem: 'MenuItem',
    AutomationLog: 'AutomationLog',
    Staff: 'Staff'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "outlet" | "customer" | "review" | "customerVisit" | "menuCategory" | "menuItem" | "automationLog" | "staff"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Outlet: {
        payload: Prisma.$OutletPayload<ExtArgs>
        fields: Prisma.OutletFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OutletFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OutletPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OutletFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OutletPayload>
          }
          findFirst: {
            args: Prisma.OutletFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OutletPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OutletFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OutletPayload>
          }
          findMany: {
            args: Prisma.OutletFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OutletPayload>[]
          }
          create: {
            args: Prisma.OutletCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OutletPayload>
          }
          createMany: {
            args: Prisma.OutletCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.OutletCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OutletPayload>[]
          }
          delete: {
            args: Prisma.OutletDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OutletPayload>
          }
          update: {
            args: Prisma.OutletUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OutletPayload>
          }
          deleteMany: {
            args: Prisma.OutletDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OutletUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.OutletUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OutletPayload>[]
          }
          upsert: {
            args: Prisma.OutletUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OutletPayload>
          }
          aggregate: {
            args: Prisma.OutletAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOutlet>
          }
          groupBy: {
            args: Prisma.OutletGroupByArgs<ExtArgs>
            result: $Utils.Optional<OutletGroupByOutputType>[]
          }
          count: {
            args: Prisma.OutletCountArgs<ExtArgs>
            result: $Utils.Optional<OutletCountAggregateOutputType> | number
          }
        }
      }
      Customer: {
        payload: Prisma.$CustomerPayload<ExtArgs>
        fields: Prisma.CustomerFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CustomerFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CustomerFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>
          }
          findFirst: {
            args: Prisma.CustomerFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CustomerFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>
          }
          findMany: {
            args: Prisma.CustomerFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>[]
          }
          create: {
            args: Prisma.CustomerCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>
          }
          createMany: {
            args: Prisma.CustomerCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CustomerCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>[]
          }
          delete: {
            args: Prisma.CustomerDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>
          }
          update: {
            args: Prisma.CustomerUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>
          }
          deleteMany: {
            args: Prisma.CustomerDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CustomerUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CustomerUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>[]
          }
          upsert: {
            args: Prisma.CustomerUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>
          }
          aggregate: {
            args: Prisma.CustomerAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCustomer>
          }
          groupBy: {
            args: Prisma.CustomerGroupByArgs<ExtArgs>
            result: $Utils.Optional<CustomerGroupByOutputType>[]
          }
          count: {
            args: Prisma.CustomerCountArgs<ExtArgs>
            result: $Utils.Optional<CustomerCountAggregateOutputType> | number
          }
        }
      }
      Review: {
        payload: Prisma.$ReviewPayload<ExtArgs>
        fields: Prisma.ReviewFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ReviewFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ReviewFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>
          }
          findFirst: {
            args: Prisma.ReviewFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ReviewFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>
          }
          findMany: {
            args: Prisma.ReviewFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>[]
          }
          create: {
            args: Prisma.ReviewCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>
          }
          createMany: {
            args: Prisma.ReviewCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ReviewCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>[]
          }
          delete: {
            args: Prisma.ReviewDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>
          }
          update: {
            args: Prisma.ReviewUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>
          }
          deleteMany: {
            args: Prisma.ReviewDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ReviewUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ReviewUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>[]
          }
          upsert: {
            args: Prisma.ReviewUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>
          }
          aggregate: {
            args: Prisma.ReviewAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateReview>
          }
          groupBy: {
            args: Prisma.ReviewGroupByArgs<ExtArgs>
            result: $Utils.Optional<ReviewGroupByOutputType>[]
          }
          count: {
            args: Prisma.ReviewCountArgs<ExtArgs>
            result: $Utils.Optional<ReviewCountAggregateOutputType> | number
          }
        }
      }
      CustomerVisit: {
        payload: Prisma.$CustomerVisitPayload<ExtArgs>
        fields: Prisma.CustomerVisitFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CustomerVisitFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerVisitPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CustomerVisitFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerVisitPayload>
          }
          findFirst: {
            args: Prisma.CustomerVisitFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerVisitPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CustomerVisitFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerVisitPayload>
          }
          findMany: {
            args: Prisma.CustomerVisitFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerVisitPayload>[]
          }
          create: {
            args: Prisma.CustomerVisitCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerVisitPayload>
          }
          createMany: {
            args: Prisma.CustomerVisitCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CustomerVisitCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerVisitPayload>[]
          }
          delete: {
            args: Prisma.CustomerVisitDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerVisitPayload>
          }
          update: {
            args: Prisma.CustomerVisitUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerVisitPayload>
          }
          deleteMany: {
            args: Prisma.CustomerVisitDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CustomerVisitUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CustomerVisitUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerVisitPayload>[]
          }
          upsert: {
            args: Prisma.CustomerVisitUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerVisitPayload>
          }
          aggregate: {
            args: Prisma.CustomerVisitAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCustomerVisit>
          }
          groupBy: {
            args: Prisma.CustomerVisitGroupByArgs<ExtArgs>
            result: $Utils.Optional<CustomerVisitGroupByOutputType>[]
          }
          count: {
            args: Prisma.CustomerVisitCountArgs<ExtArgs>
            result: $Utils.Optional<CustomerVisitCountAggregateOutputType> | number
          }
        }
      }
      MenuCategory: {
        payload: Prisma.$MenuCategoryPayload<ExtArgs>
        fields: Prisma.MenuCategoryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MenuCategoryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MenuCategoryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MenuCategoryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MenuCategoryPayload>
          }
          findFirst: {
            args: Prisma.MenuCategoryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MenuCategoryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MenuCategoryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MenuCategoryPayload>
          }
          findMany: {
            args: Prisma.MenuCategoryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MenuCategoryPayload>[]
          }
          create: {
            args: Prisma.MenuCategoryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MenuCategoryPayload>
          }
          createMany: {
            args: Prisma.MenuCategoryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MenuCategoryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MenuCategoryPayload>[]
          }
          delete: {
            args: Prisma.MenuCategoryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MenuCategoryPayload>
          }
          update: {
            args: Prisma.MenuCategoryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MenuCategoryPayload>
          }
          deleteMany: {
            args: Prisma.MenuCategoryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MenuCategoryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MenuCategoryUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MenuCategoryPayload>[]
          }
          upsert: {
            args: Prisma.MenuCategoryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MenuCategoryPayload>
          }
          aggregate: {
            args: Prisma.MenuCategoryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMenuCategory>
          }
          groupBy: {
            args: Prisma.MenuCategoryGroupByArgs<ExtArgs>
            result: $Utils.Optional<MenuCategoryGroupByOutputType>[]
          }
          count: {
            args: Prisma.MenuCategoryCountArgs<ExtArgs>
            result: $Utils.Optional<MenuCategoryCountAggregateOutputType> | number
          }
        }
      }
      MenuItem: {
        payload: Prisma.$MenuItemPayload<ExtArgs>
        fields: Prisma.MenuItemFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MenuItemFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MenuItemPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MenuItemFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MenuItemPayload>
          }
          findFirst: {
            args: Prisma.MenuItemFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MenuItemPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MenuItemFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MenuItemPayload>
          }
          findMany: {
            args: Prisma.MenuItemFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MenuItemPayload>[]
          }
          create: {
            args: Prisma.MenuItemCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MenuItemPayload>
          }
          createMany: {
            args: Prisma.MenuItemCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MenuItemCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MenuItemPayload>[]
          }
          delete: {
            args: Prisma.MenuItemDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MenuItemPayload>
          }
          update: {
            args: Prisma.MenuItemUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MenuItemPayload>
          }
          deleteMany: {
            args: Prisma.MenuItemDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MenuItemUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MenuItemUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MenuItemPayload>[]
          }
          upsert: {
            args: Prisma.MenuItemUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MenuItemPayload>
          }
          aggregate: {
            args: Prisma.MenuItemAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMenuItem>
          }
          groupBy: {
            args: Prisma.MenuItemGroupByArgs<ExtArgs>
            result: $Utils.Optional<MenuItemGroupByOutputType>[]
          }
          count: {
            args: Prisma.MenuItemCountArgs<ExtArgs>
            result: $Utils.Optional<MenuItemCountAggregateOutputType> | number
          }
        }
      }
      AutomationLog: {
        payload: Prisma.$AutomationLogPayload<ExtArgs>
        fields: Prisma.AutomationLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AutomationLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AutomationLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AutomationLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AutomationLogPayload>
          }
          findFirst: {
            args: Prisma.AutomationLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AutomationLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AutomationLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AutomationLogPayload>
          }
          findMany: {
            args: Prisma.AutomationLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AutomationLogPayload>[]
          }
          create: {
            args: Prisma.AutomationLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AutomationLogPayload>
          }
          createMany: {
            args: Prisma.AutomationLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AutomationLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AutomationLogPayload>[]
          }
          delete: {
            args: Prisma.AutomationLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AutomationLogPayload>
          }
          update: {
            args: Prisma.AutomationLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AutomationLogPayload>
          }
          deleteMany: {
            args: Prisma.AutomationLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AutomationLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AutomationLogUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AutomationLogPayload>[]
          }
          upsert: {
            args: Prisma.AutomationLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AutomationLogPayload>
          }
          aggregate: {
            args: Prisma.AutomationLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAutomationLog>
          }
          groupBy: {
            args: Prisma.AutomationLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<AutomationLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.AutomationLogCountArgs<ExtArgs>
            result: $Utils.Optional<AutomationLogCountAggregateOutputType> | number
          }
        }
      }
      Staff: {
        payload: Prisma.$StaffPayload<ExtArgs>
        fields: Prisma.StaffFieldRefs
        operations: {
          findUnique: {
            args: Prisma.StaffFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.StaffFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffPayload>
          }
          findFirst: {
            args: Prisma.StaffFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.StaffFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffPayload>
          }
          findMany: {
            args: Prisma.StaffFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffPayload>[]
          }
          create: {
            args: Prisma.StaffCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffPayload>
          }
          createMany: {
            args: Prisma.StaffCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.StaffCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffPayload>[]
          }
          delete: {
            args: Prisma.StaffDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffPayload>
          }
          update: {
            args: Prisma.StaffUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffPayload>
          }
          deleteMany: {
            args: Prisma.StaffDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.StaffUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.StaffUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffPayload>[]
          }
          upsert: {
            args: Prisma.StaffUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffPayload>
          }
          aggregate: {
            args: Prisma.StaffAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateStaff>
          }
          groupBy: {
            args: Prisma.StaffGroupByArgs<ExtArgs>
            result: $Utils.Optional<StaffGroupByOutputType>[]
          }
          count: {
            args: Prisma.StaffCountArgs<ExtArgs>
            result: $Utils.Optional<StaffCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    outlet?: OutletOmit
    customer?: CustomerOmit
    review?: ReviewOmit
    customerVisit?: CustomerVisitOmit
    menuCategory?: MenuCategoryOmit
    menuItem?: MenuItemOmit
    automationLog?: AutomationLogOmit
    staff?: StaffOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type OutletCountOutputType
   */

  export type OutletCountOutputType = {
    customers: number
    reviews: number
    visits: number
    menuCategories: number
    staff: number
  }

  export type OutletCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    customers?: boolean | OutletCountOutputTypeCountCustomersArgs
    reviews?: boolean | OutletCountOutputTypeCountReviewsArgs
    visits?: boolean | OutletCountOutputTypeCountVisitsArgs
    menuCategories?: boolean | OutletCountOutputTypeCountMenuCategoriesArgs
    staff?: boolean | OutletCountOutputTypeCountStaffArgs
  }

  // Custom InputTypes
  /**
   * OutletCountOutputType without action
   */
  export type OutletCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OutletCountOutputType
     */
    select?: OutletCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * OutletCountOutputType without action
   */
  export type OutletCountOutputTypeCountCustomersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CustomerWhereInput
  }

  /**
   * OutletCountOutputType without action
   */
  export type OutletCountOutputTypeCountReviewsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReviewWhereInput
  }

  /**
   * OutletCountOutputType without action
   */
  export type OutletCountOutputTypeCountVisitsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CustomerVisitWhereInput
  }

  /**
   * OutletCountOutputType without action
   */
  export type OutletCountOutputTypeCountMenuCategoriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MenuCategoryWhereInput
  }

  /**
   * OutletCountOutputType without action
   */
  export type OutletCountOutputTypeCountStaffArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StaffWhereInput
  }


  /**
   * Count Type CustomerCountOutputType
   */

  export type CustomerCountOutputType = {
    reviews: number
    visits: number
    automationLogs: number
  }

  export type CustomerCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    reviews?: boolean | CustomerCountOutputTypeCountReviewsArgs
    visits?: boolean | CustomerCountOutputTypeCountVisitsArgs
    automationLogs?: boolean | CustomerCountOutputTypeCountAutomationLogsArgs
  }

  // Custom InputTypes
  /**
   * CustomerCountOutputType without action
   */
  export type CustomerCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerCountOutputType
     */
    select?: CustomerCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CustomerCountOutputType without action
   */
  export type CustomerCountOutputTypeCountReviewsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReviewWhereInput
  }

  /**
   * CustomerCountOutputType without action
   */
  export type CustomerCountOutputTypeCountVisitsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CustomerVisitWhereInput
  }

  /**
   * CustomerCountOutputType without action
   */
  export type CustomerCountOutputTypeCountAutomationLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AutomationLogWhereInput
  }


  /**
   * Count Type MenuCategoryCountOutputType
   */

  export type MenuCategoryCountOutputType = {
    items: number
  }

  export type MenuCategoryCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    items?: boolean | MenuCategoryCountOutputTypeCountItemsArgs
  }

  // Custom InputTypes
  /**
   * MenuCategoryCountOutputType without action
   */
  export type MenuCategoryCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MenuCategoryCountOutputType
     */
    select?: MenuCategoryCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * MenuCategoryCountOutputType without action
   */
  export type MenuCategoryCountOutputTypeCountItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MenuItemWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Outlet
   */

  export type AggregateOutlet = {
    _count: OutletCountAggregateOutputType | null
    _min: OutletMinAggregateOutputType | null
    _max: OutletMaxAggregateOutputType | null
  }

  export type OutletMinAggregateOutputType = {
    id: string | null
    code: string | null
    slug: string | null
    name: string | null
    location: string | null
    address: string | null
    googlePlaceId: string | null
    googleMapsUrl: string | null
    instagramUrl: string | null
    facebookUrl: string | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type OutletMaxAggregateOutputType = {
    id: string | null
    code: string | null
    slug: string | null
    name: string | null
    location: string | null
    address: string | null
    googlePlaceId: string | null
    googleMapsUrl: string | null
    instagramUrl: string | null
    facebookUrl: string | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type OutletCountAggregateOutputType = {
    id: number
    code: number
    slug: number
    name: number
    location: number
    address: number
    googlePlaceId: number
    googleMapsUrl: number
    instagramUrl: number
    facebookUrl: number
    isActive: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type OutletMinAggregateInputType = {
    id?: true
    code?: true
    slug?: true
    name?: true
    location?: true
    address?: true
    googlePlaceId?: true
    googleMapsUrl?: true
    instagramUrl?: true
    facebookUrl?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type OutletMaxAggregateInputType = {
    id?: true
    code?: true
    slug?: true
    name?: true
    location?: true
    address?: true
    googlePlaceId?: true
    googleMapsUrl?: true
    instagramUrl?: true
    facebookUrl?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type OutletCountAggregateInputType = {
    id?: true
    code?: true
    slug?: true
    name?: true
    location?: true
    address?: true
    googlePlaceId?: true
    googleMapsUrl?: true
    instagramUrl?: true
    facebookUrl?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type OutletAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Outlet to aggregate.
     */
    where?: OutletWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Outlets to fetch.
     */
    orderBy?: OutletOrderByWithRelationInput | OutletOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OutletWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Outlets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Outlets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Outlets
    **/
    _count?: true | OutletCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OutletMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OutletMaxAggregateInputType
  }

  export type GetOutletAggregateType<T extends OutletAggregateArgs> = {
        [P in keyof T & keyof AggregateOutlet]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOutlet[P]>
      : GetScalarType<T[P], AggregateOutlet[P]>
  }




  export type OutletGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OutletWhereInput
    orderBy?: OutletOrderByWithAggregationInput | OutletOrderByWithAggregationInput[]
    by: OutletScalarFieldEnum[] | OutletScalarFieldEnum
    having?: OutletScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OutletCountAggregateInputType | true
    _min?: OutletMinAggregateInputType
    _max?: OutletMaxAggregateInputType
  }

  export type OutletGroupByOutputType = {
    id: string
    code: string
    slug: string
    name: string
    location: string | null
    address: string | null
    googlePlaceId: string
    googleMapsUrl: string | null
    instagramUrl: string | null
    facebookUrl: string | null
    isActive: boolean
    createdAt: Date
    updatedAt: Date
    _count: OutletCountAggregateOutputType | null
    _min: OutletMinAggregateOutputType | null
    _max: OutletMaxAggregateOutputType | null
  }

  type GetOutletGroupByPayload<T extends OutletGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OutletGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OutletGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OutletGroupByOutputType[P]>
            : GetScalarType<T[P], OutletGroupByOutputType[P]>
        }
      >
    >


  export type OutletSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    slug?: boolean
    name?: boolean
    location?: boolean
    address?: boolean
    googlePlaceId?: boolean
    googleMapsUrl?: boolean
    instagramUrl?: boolean
    facebookUrl?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    customers?: boolean | Outlet$customersArgs<ExtArgs>
    reviews?: boolean | Outlet$reviewsArgs<ExtArgs>
    visits?: boolean | Outlet$visitsArgs<ExtArgs>
    menuCategories?: boolean | Outlet$menuCategoriesArgs<ExtArgs>
    staff?: boolean | Outlet$staffArgs<ExtArgs>
    _count?: boolean | OutletCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["outlet"]>

  export type OutletSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    slug?: boolean
    name?: boolean
    location?: boolean
    address?: boolean
    googlePlaceId?: boolean
    googleMapsUrl?: boolean
    instagramUrl?: boolean
    facebookUrl?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["outlet"]>

  export type OutletSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    slug?: boolean
    name?: boolean
    location?: boolean
    address?: boolean
    googlePlaceId?: boolean
    googleMapsUrl?: boolean
    instagramUrl?: boolean
    facebookUrl?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["outlet"]>

  export type OutletSelectScalar = {
    id?: boolean
    code?: boolean
    slug?: boolean
    name?: boolean
    location?: boolean
    address?: boolean
    googlePlaceId?: boolean
    googleMapsUrl?: boolean
    instagramUrl?: boolean
    facebookUrl?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type OutletOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "code" | "slug" | "name" | "location" | "address" | "googlePlaceId" | "googleMapsUrl" | "instagramUrl" | "facebookUrl" | "isActive" | "createdAt" | "updatedAt", ExtArgs["result"]["outlet"]>
  export type OutletInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    customers?: boolean | Outlet$customersArgs<ExtArgs>
    reviews?: boolean | Outlet$reviewsArgs<ExtArgs>
    visits?: boolean | Outlet$visitsArgs<ExtArgs>
    menuCategories?: boolean | Outlet$menuCategoriesArgs<ExtArgs>
    staff?: boolean | Outlet$staffArgs<ExtArgs>
    _count?: boolean | OutletCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type OutletIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type OutletIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $OutletPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Outlet"
    objects: {
      customers: Prisma.$CustomerPayload<ExtArgs>[]
      reviews: Prisma.$ReviewPayload<ExtArgs>[]
      visits: Prisma.$CustomerVisitPayload<ExtArgs>[]
      menuCategories: Prisma.$MenuCategoryPayload<ExtArgs>[]
      staff: Prisma.$StaffPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      code: string
      slug: string
      name: string
      location: string | null
      address: string | null
      googlePlaceId: string
      googleMapsUrl: string | null
      instagramUrl: string | null
      facebookUrl: string | null
      isActive: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["outlet"]>
    composites: {}
  }

  type OutletGetPayload<S extends boolean | null | undefined | OutletDefaultArgs> = $Result.GetResult<Prisma.$OutletPayload, S>

  type OutletCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<OutletFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: OutletCountAggregateInputType | true
    }

  export interface OutletDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Outlet'], meta: { name: 'Outlet' } }
    /**
     * Find zero or one Outlet that matches the filter.
     * @param {OutletFindUniqueArgs} args - Arguments to find a Outlet
     * @example
     * // Get one Outlet
     * const outlet = await prisma.outlet.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OutletFindUniqueArgs>(args: SelectSubset<T, OutletFindUniqueArgs<ExtArgs>>): Prisma__OutletClient<$Result.GetResult<Prisma.$OutletPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Outlet that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OutletFindUniqueOrThrowArgs} args - Arguments to find a Outlet
     * @example
     * // Get one Outlet
     * const outlet = await prisma.outlet.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OutletFindUniqueOrThrowArgs>(args: SelectSubset<T, OutletFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OutletClient<$Result.GetResult<Prisma.$OutletPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Outlet that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OutletFindFirstArgs} args - Arguments to find a Outlet
     * @example
     * // Get one Outlet
     * const outlet = await prisma.outlet.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OutletFindFirstArgs>(args?: SelectSubset<T, OutletFindFirstArgs<ExtArgs>>): Prisma__OutletClient<$Result.GetResult<Prisma.$OutletPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Outlet that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OutletFindFirstOrThrowArgs} args - Arguments to find a Outlet
     * @example
     * // Get one Outlet
     * const outlet = await prisma.outlet.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OutletFindFirstOrThrowArgs>(args?: SelectSubset<T, OutletFindFirstOrThrowArgs<ExtArgs>>): Prisma__OutletClient<$Result.GetResult<Prisma.$OutletPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Outlets that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OutletFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Outlets
     * const outlets = await prisma.outlet.findMany()
     * 
     * // Get first 10 Outlets
     * const outlets = await prisma.outlet.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const outletWithIdOnly = await prisma.outlet.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends OutletFindManyArgs>(args?: SelectSubset<T, OutletFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OutletPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Outlet.
     * @param {OutletCreateArgs} args - Arguments to create a Outlet.
     * @example
     * // Create one Outlet
     * const Outlet = await prisma.outlet.create({
     *   data: {
     *     // ... data to create a Outlet
     *   }
     * })
     * 
     */
    create<T extends OutletCreateArgs>(args: SelectSubset<T, OutletCreateArgs<ExtArgs>>): Prisma__OutletClient<$Result.GetResult<Prisma.$OutletPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Outlets.
     * @param {OutletCreateManyArgs} args - Arguments to create many Outlets.
     * @example
     * // Create many Outlets
     * const outlet = await prisma.outlet.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OutletCreateManyArgs>(args?: SelectSubset<T, OutletCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Outlets and returns the data saved in the database.
     * @param {OutletCreateManyAndReturnArgs} args - Arguments to create many Outlets.
     * @example
     * // Create many Outlets
     * const outlet = await prisma.outlet.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Outlets and only return the `id`
     * const outletWithIdOnly = await prisma.outlet.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends OutletCreateManyAndReturnArgs>(args?: SelectSubset<T, OutletCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OutletPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Outlet.
     * @param {OutletDeleteArgs} args - Arguments to delete one Outlet.
     * @example
     * // Delete one Outlet
     * const Outlet = await prisma.outlet.delete({
     *   where: {
     *     // ... filter to delete one Outlet
     *   }
     * })
     * 
     */
    delete<T extends OutletDeleteArgs>(args: SelectSubset<T, OutletDeleteArgs<ExtArgs>>): Prisma__OutletClient<$Result.GetResult<Prisma.$OutletPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Outlet.
     * @param {OutletUpdateArgs} args - Arguments to update one Outlet.
     * @example
     * // Update one Outlet
     * const outlet = await prisma.outlet.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OutletUpdateArgs>(args: SelectSubset<T, OutletUpdateArgs<ExtArgs>>): Prisma__OutletClient<$Result.GetResult<Prisma.$OutletPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Outlets.
     * @param {OutletDeleteManyArgs} args - Arguments to filter Outlets to delete.
     * @example
     * // Delete a few Outlets
     * const { count } = await prisma.outlet.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OutletDeleteManyArgs>(args?: SelectSubset<T, OutletDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Outlets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OutletUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Outlets
     * const outlet = await prisma.outlet.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OutletUpdateManyArgs>(args: SelectSubset<T, OutletUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Outlets and returns the data updated in the database.
     * @param {OutletUpdateManyAndReturnArgs} args - Arguments to update many Outlets.
     * @example
     * // Update many Outlets
     * const outlet = await prisma.outlet.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Outlets and only return the `id`
     * const outletWithIdOnly = await prisma.outlet.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends OutletUpdateManyAndReturnArgs>(args: SelectSubset<T, OutletUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OutletPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Outlet.
     * @param {OutletUpsertArgs} args - Arguments to update or create a Outlet.
     * @example
     * // Update or create a Outlet
     * const outlet = await prisma.outlet.upsert({
     *   create: {
     *     // ... data to create a Outlet
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Outlet we want to update
     *   }
     * })
     */
    upsert<T extends OutletUpsertArgs>(args: SelectSubset<T, OutletUpsertArgs<ExtArgs>>): Prisma__OutletClient<$Result.GetResult<Prisma.$OutletPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Outlets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OutletCountArgs} args - Arguments to filter Outlets to count.
     * @example
     * // Count the number of Outlets
     * const count = await prisma.outlet.count({
     *   where: {
     *     // ... the filter for the Outlets we want to count
     *   }
     * })
    **/
    count<T extends OutletCountArgs>(
      args?: Subset<T, OutletCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OutletCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Outlet.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OutletAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends OutletAggregateArgs>(args: Subset<T, OutletAggregateArgs>): Prisma.PrismaPromise<GetOutletAggregateType<T>>

    /**
     * Group by Outlet.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OutletGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends OutletGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OutletGroupByArgs['orderBy'] }
        : { orderBy?: OutletGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, OutletGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOutletGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Outlet model
   */
  readonly fields: OutletFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Outlet.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OutletClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    customers<T extends Outlet$customersArgs<ExtArgs> = {}>(args?: Subset<T, Outlet$customersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    reviews<T extends Outlet$reviewsArgs<ExtArgs> = {}>(args?: Subset<T, Outlet$reviewsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    visits<T extends Outlet$visitsArgs<ExtArgs> = {}>(args?: Subset<T, Outlet$visitsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CustomerVisitPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    menuCategories<T extends Outlet$menuCategoriesArgs<ExtArgs> = {}>(args?: Subset<T, Outlet$menuCategoriesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MenuCategoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    staff<T extends Outlet$staffArgs<ExtArgs> = {}>(args?: Subset<T, Outlet$staffArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StaffPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Outlet model
   */
  interface OutletFieldRefs {
    readonly id: FieldRef<"Outlet", 'String'>
    readonly code: FieldRef<"Outlet", 'String'>
    readonly slug: FieldRef<"Outlet", 'String'>
    readonly name: FieldRef<"Outlet", 'String'>
    readonly location: FieldRef<"Outlet", 'String'>
    readonly address: FieldRef<"Outlet", 'String'>
    readonly googlePlaceId: FieldRef<"Outlet", 'String'>
    readonly googleMapsUrl: FieldRef<"Outlet", 'String'>
    readonly instagramUrl: FieldRef<"Outlet", 'String'>
    readonly facebookUrl: FieldRef<"Outlet", 'String'>
    readonly isActive: FieldRef<"Outlet", 'Boolean'>
    readonly createdAt: FieldRef<"Outlet", 'DateTime'>
    readonly updatedAt: FieldRef<"Outlet", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Outlet findUnique
   */
  export type OutletFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Outlet
     */
    select?: OutletSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Outlet
     */
    omit?: OutletOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OutletInclude<ExtArgs> | null
    /**
     * Filter, which Outlet to fetch.
     */
    where: OutletWhereUniqueInput
  }

  /**
   * Outlet findUniqueOrThrow
   */
  export type OutletFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Outlet
     */
    select?: OutletSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Outlet
     */
    omit?: OutletOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OutletInclude<ExtArgs> | null
    /**
     * Filter, which Outlet to fetch.
     */
    where: OutletWhereUniqueInput
  }

  /**
   * Outlet findFirst
   */
  export type OutletFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Outlet
     */
    select?: OutletSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Outlet
     */
    omit?: OutletOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OutletInclude<ExtArgs> | null
    /**
     * Filter, which Outlet to fetch.
     */
    where?: OutletWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Outlets to fetch.
     */
    orderBy?: OutletOrderByWithRelationInput | OutletOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Outlets.
     */
    cursor?: OutletWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Outlets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Outlets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Outlets.
     */
    distinct?: OutletScalarFieldEnum | OutletScalarFieldEnum[]
  }

  /**
   * Outlet findFirstOrThrow
   */
  export type OutletFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Outlet
     */
    select?: OutletSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Outlet
     */
    omit?: OutletOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OutletInclude<ExtArgs> | null
    /**
     * Filter, which Outlet to fetch.
     */
    where?: OutletWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Outlets to fetch.
     */
    orderBy?: OutletOrderByWithRelationInput | OutletOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Outlets.
     */
    cursor?: OutletWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Outlets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Outlets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Outlets.
     */
    distinct?: OutletScalarFieldEnum | OutletScalarFieldEnum[]
  }

  /**
   * Outlet findMany
   */
  export type OutletFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Outlet
     */
    select?: OutletSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Outlet
     */
    omit?: OutletOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OutletInclude<ExtArgs> | null
    /**
     * Filter, which Outlets to fetch.
     */
    where?: OutletWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Outlets to fetch.
     */
    orderBy?: OutletOrderByWithRelationInput | OutletOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Outlets.
     */
    cursor?: OutletWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Outlets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Outlets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Outlets.
     */
    distinct?: OutletScalarFieldEnum | OutletScalarFieldEnum[]
  }

  /**
   * Outlet create
   */
  export type OutletCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Outlet
     */
    select?: OutletSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Outlet
     */
    omit?: OutletOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OutletInclude<ExtArgs> | null
    /**
     * The data needed to create a Outlet.
     */
    data: XOR<OutletCreateInput, OutletUncheckedCreateInput>
  }

  /**
   * Outlet createMany
   */
  export type OutletCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Outlets.
     */
    data: OutletCreateManyInput | OutletCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Outlet createManyAndReturn
   */
  export type OutletCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Outlet
     */
    select?: OutletSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Outlet
     */
    omit?: OutletOmit<ExtArgs> | null
    /**
     * The data used to create many Outlets.
     */
    data: OutletCreateManyInput | OutletCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Outlet update
   */
  export type OutletUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Outlet
     */
    select?: OutletSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Outlet
     */
    omit?: OutletOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OutletInclude<ExtArgs> | null
    /**
     * The data needed to update a Outlet.
     */
    data: XOR<OutletUpdateInput, OutletUncheckedUpdateInput>
    /**
     * Choose, which Outlet to update.
     */
    where: OutletWhereUniqueInput
  }

  /**
   * Outlet updateMany
   */
  export type OutletUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Outlets.
     */
    data: XOR<OutletUpdateManyMutationInput, OutletUncheckedUpdateManyInput>
    /**
     * Filter which Outlets to update
     */
    where?: OutletWhereInput
    /**
     * Limit how many Outlets to update.
     */
    limit?: number
  }

  /**
   * Outlet updateManyAndReturn
   */
  export type OutletUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Outlet
     */
    select?: OutletSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Outlet
     */
    omit?: OutletOmit<ExtArgs> | null
    /**
     * The data used to update Outlets.
     */
    data: XOR<OutletUpdateManyMutationInput, OutletUncheckedUpdateManyInput>
    /**
     * Filter which Outlets to update
     */
    where?: OutletWhereInput
    /**
     * Limit how many Outlets to update.
     */
    limit?: number
  }

  /**
   * Outlet upsert
   */
  export type OutletUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Outlet
     */
    select?: OutletSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Outlet
     */
    omit?: OutletOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OutletInclude<ExtArgs> | null
    /**
     * The filter to search for the Outlet to update in case it exists.
     */
    where: OutletWhereUniqueInput
    /**
     * In case the Outlet found by the `where` argument doesn't exist, create a new Outlet with this data.
     */
    create: XOR<OutletCreateInput, OutletUncheckedCreateInput>
    /**
     * In case the Outlet was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OutletUpdateInput, OutletUncheckedUpdateInput>
  }

  /**
   * Outlet delete
   */
  export type OutletDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Outlet
     */
    select?: OutletSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Outlet
     */
    omit?: OutletOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OutletInclude<ExtArgs> | null
    /**
     * Filter which Outlet to delete.
     */
    where: OutletWhereUniqueInput
  }

  /**
   * Outlet deleteMany
   */
  export type OutletDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Outlets to delete
     */
    where?: OutletWhereInput
    /**
     * Limit how many Outlets to delete.
     */
    limit?: number
  }

  /**
   * Outlet.customers
   */
  export type Outlet$customersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    where?: CustomerWhereInput
    orderBy?: CustomerOrderByWithRelationInput | CustomerOrderByWithRelationInput[]
    cursor?: CustomerWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CustomerScalarFieldEnum | CustomerScalarFieldEnum[]
  }

  /**
   * Outlet.reviews
   */
  export type Outlet$reviewsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    where?: ReviewWhereInput
    orderBy?: ReviewOrderByWithRelationInput | ReviewOrderByWithRelationInput[]
    cursor?: ReviewWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ReviewScalarFieldEnum | ReviewScalarFieldEnum[]
  }

  /**
   * Outlet.visits
   */
  export type Outlet$visitsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerVisit
     */
    select?: CustomerVisitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CustomerVisit
     */
    omit?: CustomerVisitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerVisitInclude<ExtArgs> | null
    where?: CustomerVisitWhereInput
    orderBy?: CustomerVisitOrderByWithRelationInput | CustomerVisitOrderByWithRelationInput[]
    cursor?: CustomerVisitWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CustomerVisitScalarFieldEnum | CustomerVisitScalarFieldEnum[]
  }

  /**
   * Outlet.menuCategories
   */
  export type Outlet$menuCategoriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MenuCategory
     */
    select?: MenuCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the MenuCategory
     */
    omit?: MenuCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MenuCategoryInclude<ExtArgs> | null
    where?: MenuCategoryWhereInput
    orderBy?: MenuCategoryOrderByWithRelationInput | MenuCategoryOrderByWithRelationInput[]
    cursor?: MenuCategoryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MenuCategoryScalarFieldEnum | MenuCategoryScalarFieldEnum[]
  }

  /**
   * Outlet.staff
   */
  export type Outlet$staffArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Staff
     */
    select?: StaffSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Staff
     */
    omit?: StaffOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StaffInclude<ExtArgs> | null
    where?: StaffWhereInput
    orderBy?: StaffOrderByWithRelationInput | StaffOrderByWithRelationInput[]
    cursor?: StaffWhereUniqueInput
    take?: number
    skip?: number
    distinct?: StaffScalarFieldEnum | StaffScalarFieldEnum[]
  }

  /**
   * Outlet without action
   */
  export type OutletDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Outlet
     */
    select?: OutletSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Outlet
     */
    omit?: OutletOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OutletInclude<ExtArgs> | null
  }


  /**
   * Model Customer
   */

  export type AggregateCustomer = {
    _count: CustomerCountAggregateOutputType | null
    _avg: CustomerAvgAggregateOutputType | null
    _sum: CustomerSumAggregateOutputType | null
    _min: CustomerMinAggregateOutputType | null
    _max: CustomerMaxAggregateOutputType | null
  }

  export type CustomerAvgAggregateOutputType = {
    totalVisits: number | null
  }

  export type CustomerSumAggregateOutputType = {
    totalVisits: number | null
  }

  export type CustomerMinAggregateOutputType = {
    id: string | null
    deviceId: string | null
    fullName: string | null
    phone: string | null
    email: string | null
    birthDate: Date | null
    anniversaryDate: Date | null
    gender: $Enums.Gender | null
    maritalStatus: $Enums.MaritalStatus | null
    firstVisitOutletId: string | null
    lastVisitDate: Date | null
    totalVisits: number | null
    hasSubmittedFirstReview: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CustomerMaxAggregateOutputType = {
    id: string | null
    deviceId: string | null
    fullName: string | null
    phone: string | null
    email: string | null
    birthDate: Date | null
    anniversaryDate: Date | null
    gender: $Enums.Gender | null
    maritalStatus: $Enums.MaritalStatus | null
    firstVisitOutletId: string | null
    lastVisitDate: Date | null
    totalVisits: number | null
    hasSubmittedFirstReview: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CustomerCountAggregateOutputType = {
    id: number
    deviceId: number
    fullName: number
    phone: number
    email: number
    birthDate: number
    anniversaryDate: number
    gender: number
    maritalStatus: number
    firstVisitOutletId: number
    lastVisitDate: number
    totalVisits: number
    hasSubmittedFirstReview: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CustomerAvgAggregateInputType = {
    totalVisits?: true
  }

  export type CustomerSumAggregateInputType = {
    totalVisits?: true
  }

  export type CustomerMinAggregateInputType = {
    id?: true
    deviceId?: true
    fullName?: true
    phone?: true
    email?: true
    birthDate?: true
    anniversaryDate?: true
    gender?: true
    maritalStatus?: true
    firstVisitOutletId?: true
    lastVisitDate?: true
    totalVisits?: true
    hasSubmittedFirstReview?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CustomerMaxAggregateInputType = {
    id?: true
    deviceId?: true
    fullName?: true
    phone?: true
    email?: true
    birthDate?: true
    anniversaryDate?: true
    gender?: true
    maritalStatus?: true
    firstVisitOutletId?: true
    lastVisitDate?: true
    totalVisits?: true
    hasSubmittedFirstReview?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CustomerCountAggregateInputType = {
    id?: true
    deviceId?: true
    fullName?: true
    phone?: true
    email?: true
    birthDate?: true
    anniversaryDate?: true
    gender?: true
    maritalStatus?: true
    firstVisitOutletId?: true
    lastVisitDate?: true
    totalVisits?: true
    hasSubmittedFirstReview?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CustomerAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Customer to aggregate.
     */
    where?: CustomerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Customers to fetch.
     */
    orderBy?: CustomerOrderByWithRelationInput | CustomerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CustomerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Customers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Customers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Customers
    **/
    _count?: true | CustomerCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CustomerAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CustomerSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CustomerMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CustomerMaxAggregateInputType
  }

  export type GetCustomerAggregateType<T extends CustomerAggregateArgs> = {
        [P in keyof T & keyof AggregateCustomer]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCustomer[P]>
      : GetScalarType<T[P], AggregateCustomer[P]>
  }




  export type CustomerGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CustomerWhereInput
    orderBy?: CustomerOrderByWithAggregationInput | CustomerOrderByWithAggregationInput[]
    by: CustomerScalarFieldEnum[] | CustomerScalarFieldEnum
    having?: CustomerScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CustomerCountAggregateInputType | true
    _avg?: CustomerAvgAggregateInputType
    _sum?: CustomerSumAggregateInputType
    _min?: CustomerMinAggregateInputType
    _max?: CustomerMaxAggregateInputType
  }

  export type CustomerGroupByOutputType = {
    id: string
    deviceId: string
    fullName: string
    phone: string
    email: string | null
    birthDate: Date
    anniversaryDate: Date | null
    gender: $Enums.Gender
    maritalStatus: $Enums.MaritalStatus
    firstVisitOutletId: string | null
    lastVisitDate: Date | null
    totalVisits: number
    hasSubmittedFirstReview: boolean
    createdAt: Date
    updatedAt: Date
    _count: CustomerCountAggregateOutputType | null
    _avg: CustomerAvgAggregateOutputType | null
    _sum: CustomerSumAggregateOutputType | null
    _min: CustomerMinAggregateOutputType | null
    _max: CustomerMaxAggregateOutputType | null
  }

  type GetCustomerGroupByPayload<T extends CustomerGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CustomerGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CustomerGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CustomerGroupByOutputType[P]>
            : GetScalarType<T[P], CustomerGroupByOutputType[P]>
        }
      >
    >


  export type CustomerSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    deviceId?: boolean
    fullName?: boolean
    phone?: boolean
    email?: boolean
    birthDate?: boolean
    anniversaryDate?: boolean
    gender?: boolean
    maritalStatus?: boolean
    firstVisitOutletId?: boolean
    lastVisitDate?: boolean
    totalVisits?: boolean
    hasSubmittedFirstReview?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    firstVisitOutlet?: boolean | Customer$firstVisitOutletArgs<ExtArgs>
    reviews?: boolean | Customer$reviewsArgs<ExtArgs>
    visits?: boolean | Customer$visitsArgs<ExtArgs>
    automationLogs?: boolean | Customer$automationLogsArgs<ExtArgs>
    _count?: boolean | CustomerCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["customer"]>

  export type CustomerSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    deviceId?: boolean
    fullName?: boolean
    phone?: boolean
    email?: boolean
    birthDate?: boolean
    anniversaryDate?: boolean
    gender?: boolean
    maritalStatus?: boolean
    firstVisitOutletId?: boolean
    lastVisitDate?: boolean
    totalVisits?: boolean
    hasSubmittedFirstReview?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    firstVisitOutlet?: boolean | Customer$firstVisitOutletArgs<ExtArgs>
  }, ExtArgs["result"]["customer"]>

  export type CustomerSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    deviceId?: boolean
    fullName?: boolean
    phone?: boolean
    email?: boolean
    birthDate?: boolean
    anniversaryDate?: boolean
    gender?: boolean
    maritalStatus?: boolean
    firstVisitOutletId?: boolean
    lastVisitDate?: boolean
    totalVisits?: boolean
    hasSubmittedFirstReview?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    firstVisitOutlet?: boolean | Customer$firstVisitOutletArgs<ExtArgs>
  }, ExtArgs["result"]["customer"]>

  export type CustomerSelectScalar = {
    id?: boolean
    deviceId?: boolean
    fullName?: boolean
    phone?: boolean
    email?: boolean
    birthDate?: boolean
    anniversaryDate?: boolean
    gender?: boolean
    maritalStatus?: boolean
    firstVisitOutletId?: boolean
    lastVisitDate?: boolean
    totalVisits?: boolean
    hasSubmittedFirstReview?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CustomerOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "deviceId" | "fullName" | "phone" | "email" | "birthDate" | "anniversaryDate" | "gender" | "maritalStatus" | "firstVisitOutletId" | "lastVisitDate" | "totalVisits" | "hasSubmittedFirstReview" | "createdAt" | "updatedAt", ExtArgs["result"]["customer"]>
  export type CustomerInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    firstVisitOutlet?: boolean | Customer$firstVisitOutletArgs<ExtArgs>
    reviews?: boolean | Customer$reviewsArgs<ExtArgs>
    visits?: boolean | Customer$visitsArgs<ExtArgs>
    automationLogs?: boolean | Customer$automationLogsArgs<ExtArgs>
    _count?: boolean | CustomerCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CustomerIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    firstVisitOutlet?: boolean | Customer$firstVisitOutletArgs<ExtArgs>
  }
  export type CustomerIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    firstVisitOutlet?: boolean | Customer$firstVisitOutletArgs<ExtArgs>
  }

  export type $CustomerPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Customer"
    objects: {
      firstVisitOutlet: Prisma.$OutletPayload<ExtArgs> | null
      reviews: Prisma.$ReviewPayload<ExtArgs>[]
      visits: Prisma.$CustomerVisitPayload<ExtArgs>[]
      automationLogs: Prisma.$AutomationLogPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      deviceId: string
      fullName: string
      phone: string
      email: string | null
      birthDate: Date
      anniversaryDate: Date | null
      gender: $Enums.Gender
      maritalStatus: $Enums.MaritalStatus
      firstVisitOutletId: string | null
      lastVisitDate: Date | null
      totalVisits: number
      hasSubmittedFirstReview: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["customer"]>
    composites: {}
  }

  type CustomerGetPayload<S extends boolean | null | undefined | CustomerDefaultArgs> = $Result.GetResult<Prisma.$CustomerPayload, S>

  type CustomerCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CustomerFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CustomerCountAggregateInputType | true
    }

  export interface CustomerDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Customer'], meta: { name: 'Customer' } }
    /**
     * Find zero or one Customer that matches the filter.
     * @param {CustomerFindUniqueArgs} args - Arguments to find a Customer
     * @example
     * // Get one Customer
     * const customer = await prisma.customer.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CustomerFindUniqueArgs>(args: SelectSubset<T, CustomerFindUniqueArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Customer that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CustomerFindUniqueOrThrowArgs} args - Arguments to find a Customer
     * @example
     * // Get one Customer
     * const customer = await prisma.customer.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CustomerFindUniqueOrThrowArgs>(args: SelectSubset<T, CustomerFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Customer that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerFindFirstArgs} args - Arguments to find a Customer
     * @example
     * // Get one Customer
     * const customer = await prisma.customer.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CustomerFindFirstArgs>(args?: SelectSubset<T, CustomerFindFirstArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Customer that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerFindFirstOrThrowArgs} args - Arguments to find a Customer
     * @example
     * // Get one Customer
     * const customer = await prisma.customer.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CustomerFindFirstOrThrowArgs>(args?: SelectSubset<T, CustomerFindFirstOrThrowArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Customers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Customers
     * const customers = await prisma.customer.findMany()
     * 
     * // Get first 10 Customers
     * const customers = await prisma.customer.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const customerWithIdOnly = await prisma.customer.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CustomerFindManyArgs>(args?: SelectSubset<T, CustomerFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Customer.
     * @param {CustomerCreateArgs} args - Arguments to create a Customer.
     * @example
     * // Create one Customer
     * const Customer = await prisma.customer.create({
     *   data: {
     *     // ... data to create a Customer
     *   }
     * })
     * 
     */
    create<T extends CustomerCreateArgs>(args: SelectSubset<T, CustomerCreateArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Customers.
     * @param {CustomerCreateManyArgs} args - Arguments to create many Customers.
     * @example
     * // Create many Customers
     * const customer = await prisma.customer.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CustomerCreateManyArgs>(args?: SelectSubset<T, CustomerCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Customers and returns the data saved in the database.
     * @param {CustomerCreateManyAndReturnArgs} args - Arguments to create many Customers.
     * @example
     * // Create many Customers
     * const customer = await prisma.customer.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Customers and only return the `id`
     * const customerWithIdOnly = await prisma.customer.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CustomerCreateManyAndReturnArgs>(args?: SelectSubset<T, CustomerCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Customer.
     * @param {CustomerDeleteArgs} args - Arguments to delete one Customer.
     * @example
     * // Delete one Customer
     * const Customer = await prisma.customer.delete({
     *   where: {
     *     // ... filter to delete one Customer
     *   }
     * })
     * 
     */
    delete<T extends CustomerDeleteArgs>(args: SelectSubset<T, CustomerDeleteArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Customer.
     * @param {CustomerUpdateArgs} args - Arguments to update one Customer.
     * @example
     * // Update one Customer
     * const customer = await prisma.customer.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CustomerUpdateArgs>(args: SelectSubset<T, CustomerUpdateArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Customers.
     * @param {CustomerDeleteManyArgs} args - Arguments to filter Customers to delete.
     * @example
     * // Delete a few Customers
     * const { count } = await prisma.customer.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CustomerDeleteManyArgs>(args?: SelectSubset<T, CustomerDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Customers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Customers
     * const customer = await prisma.customer.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CustomerUpdateManyArgs>(args: SelectSubset<T, CustomerUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Customers and returns the data updated in the database.
     * @param {CustomerUpdateManyAndReturnArgs} args - Arguments to update many Customers.
     * @example
     * // Update many Customers
     * const customer = await prisma.customer.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Customers and only return the `id`
     * const customerWithIdOnly = await prisma.customer.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CustomerUpdateManyAndReturnArgs>(args: SelectSubset<T, CustomerUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Customer.
     * @param {CustomerUpsertArgs} args - Arguments to update or create a Customer.
     * @example
     * // Update or create a Customer
     * const customer = await prisma.customer.upsert({
     *   create: {
     *     // ... data to create a Customer
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Customer we want to update
     *   }
     * })
     */
    upsert<T extends CustomerUpsertArgs>(args: SelectSubset<T, CustomerUpsertArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Customers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerCountArgs} args - Arguments to filter Customers to count.
     * @example
     * // Count the number of Customers
     * const count = await prisma.customer.count({
     *   where: {
     *     // ... the filter for the Customers we want to count
     *   }
     * })
    **/
    count<T extends CustomerCountArgs>(
      args?: Subset<T, CustomerCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CustomerCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Customer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CustomerAggregateArgs>(args: Subset<T, CustomerAggregateArgs>): Prisma.PrismaPromise<GetCustomerAggregateType<T>>

    /**
     * Group by Customer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CustomerGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CustomerGroupByArgs['orderBy'] }
        : { orderBy?: CustomerGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CustomerGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCustomerGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Customer model
   */
  readonly fields: CustomerFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Customer.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CustomerClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    firstVisitOutlet<T extends Customer$firstVisitOutletArgs<ExtArgs> = {}>(args?: Subset<T, Customer$firstVisitOutletArgs<ExtArgs>>): Prisma__OutletClient<$Result.GetResult<Prisma.$OutletPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    reviews<T extends Customer$reviewsArgs<ExtArgs> = {}>(args?: Subset<T, Customer$reviewsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    visits<T extends Customer$visitsArgs<ExtArgs> = {}>(args?: Subset<T, Customer$visitsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CustomerVisitPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    automationLogs<T extends Customer$automationLogsArgs<ExtArgs> = {}>(args?: Subset<T, Customer$automationLogsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AutomationLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Customer model
   */
  interface CustomerFieldRefs {
    readonly id: FieldRef<"Customer", 'String'>
    readonly deviceId: FieldRef<"Customer", 'String'>
    readonly fullName: FieldRef<"Customer", 'String'>
    readonly phone: FieldRef<"Customer", 'String'>
    readonly email: FieldRef<"Customer", 'String'>
    readonly birthDate: FieldRef<"Customer", 'DateTime'>
    readonly anniversaryDate: FieldRef<"Customer", 'DateTime'>
    readonly gender: FieldRef<"Customer", 'Gender'>
    readonly maritalStatus: FieldRef<"Customer", 'MaritalStatus'>
    readonly firstVisitOutletId: FieldRef<"Customer", 'String'>
    readonly lastVisitDate: FieldRef<"Customer", 'DateTime'>
    readonly totalVisits: FieldRef<"Customer", 'Int'>
    readonly hasSubmittedFirstReview: FieldRef<"Customer", 'Boolean'>
    readonly createdAt: FieldRef<"Customer", 'DateTime'>
    readonly updatedAt: FieldRef<"Customer", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Customer findUnique
   */
  export type CustomerFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * Filter, which Customer to fetch.
     */
    where: CustomerWhereUniqueInput
  }

  /**
   * Customer findUniqueOrThrow
   */
  export type CustomerFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * Filter, which Customer to fetch.
     */
    where: CustomerWhereUniqueInput
  }

  /**
   * Customer findFirst
   */
  export type CustomerFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * Filter, which Customer to fetch.
     */
    where?: CustomerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Customers to fetch.
     */
    orderBy?: CustomerOrderByWithRelationInput | CustomerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Customers.
     */
    cursor?: CustomerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Customers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Customers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Customers.
     */
    distinct?: CustomerScalarFieldEnum | CustomerScalarFieldEnum[]
  }

  /**
   * Customer findFirstOrThrow
   */
  export type CustomerFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * Filter, which Customer to fetch.
     */
    where?: CustomerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Customers to fetch.
     */
    orderBy?: CustomerOrderByWithRelationInput | CustomerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Customers.
     */
    cursor?: CustomerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Customers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Customers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Customers.
     */
    distinct?: CustomerScalarFieldEnum | CustomerScalarFieldEnum[]
  }

  /**
   * Customer findMany
   */
  export type CustomerFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * Filter, which Customers to fetch.
     */
    where?: CustomerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Customers to fetch.
     */
    orderBy?: CustomerOrderByWithRelationInput | CustomerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Customers.
     */
    cursor?: CustomerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Customers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Customers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Customers.
     */
    distinct?: CustomerScalarFieldEnum | CustomerScalarFieldEnum[]
  }

  /**
   * Customer create
   */
  export type CustomerCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * The data needed to create a Customer.
     */
    data: XOR<CustomerCreateInput, CustomerUncheckedCreateInput>
  }

  /**
   * Customer createMany
   */
  export type CustomerCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Customers.
     */
    data: CustomerCreateManyInput | CustomerCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Customer createManyAndReturn
   */
  export type CustomerCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * The data used to create many Customers.
     */
    data: CustomerCreateManyInput | CustomerCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Customer update
   */
  export type CustomerUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * The data needed to update a Customer.
     */
    data: XOR<CustomerUpdateInput, CustomerUncheckedUpdateInput>
    /**
     * Choose, which Customer to update.
     */
    where: CustomerWhereUniqueInput
  }

  /**
   * Customer updateMany
   */
  export type CustomerUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Customers.
     */
    data: XOR<CustomerUpdateManyMutationInput, CustomerUncheckedUpdateManyInput>
    /**
     * Filter which Customers to update
     */
    where?: CustomerWhereInput
    /**
     * Limit how many Customers to update.
     */
    limit?: number
  }

  /**
   * Customer updateManyAndReturn
   */
  export type CustomerUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * The data used to update Customers.
     */
    data: XOR<CustomerUpdateManyMutationInput, CustomerUncheckedUpdateManyInput>
    /**
     * Filter which Customers to update
     */
    where?: CustomerWhereInput
    /**
     * Limit how many Customers to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Customer upsert
   */
  export type CustomerUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * The filter to search for the Customer to update in case it exists.
     */
    where: CustomerWhereUniqueInput
    /**
     * In case the Customer found by the `where` argument doesn't exist, create a new Customer with this data.
     */
    create: XOR<CustomerCreateInput, CustomerUncheckedCreateInput>
    /**
     * In case the Customer was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CustomerUpdateInput, CustomerUncheckedUpdateInput>
  }

  /**
   * Customer delete
   */
  export type CustomerDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * Filter which Customer to delete.
     */
    where: CustomerWhereUniqueInput
  }

  /**
   * Customer deleteMany
   */
  export type CustomerDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Customers to delete
     */
    where?: CustomerWhereInput
    /**
     * Limit how many Customers to delete.
     */
    limit?: number
  }

  /**
   * Customer.firstVisitOutlet
   */
  export type Customer$firstVisitOutletArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Outlet
     */
    select?: OutletSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Outlet
     */
    omit?: OutletOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OutletInclude<ExtArgs> | null
    where?: OutletWhereInput
  }

  /**
   * Customer.reviews
   */
  export type Customer$reviewsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    where?: ReviewWhereInput
    orderBy?: ReviewOrderByWithRelationInput | ReviewOrderByWithRelationInput[]
    cursor?: ReviewWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ReviewScalarFieldEnum | ReviewScalarFieldEnum[]
  }

  /**
   * Customer.visits
   */
  export type Customer$visitsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerVisit
     */
    select?: CustomerVisitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CustomerVisit
     */
    omit?: CustomerVisitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerVisitInclude<ExtArgs> | null
    where?: CustomerVisitWhereInput
    orderBy?: CustomerVisitOrderByWithRelationInput | CustomerVisitOrderByWithRelationInput[]
    cursor?: CustomerVisitWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CustomerVisitScalarFieldEnum | CustomerVisitScalarFieldEnum[]
  }

  /**
   * Customer.automationLogs
   */
  export type Customer$automationLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AutomationLog
     */
    select?: AutomationLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AutomationLog
     */
    omit?: AutomationLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AutomationLogInclude<ExtArgs> | null
    where?: AutomationLogWhereInput
    orderBy?: AutomationLogOrderByWithRelationInput | AutomationLogOrderByWithRelationInput[]
    cursor?: AutomationLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AutomationLogScalarFieldEnum | AutomationLogScalarFieldEnum[]
  }

  /**
   * Customer without action
   */
  export type CustomerDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
  }


  /**
   * Model Review
   */

  export type AggregateReview = {
    _count: ReviewCountAggregateOutputType | null
    _avg: ReviewAvgAggregateOutputType | null
    _sum: ReviewSumAggregateOutputType | null
    _min: ReviewMinAggregateOutputType | null
    _max: ReviewMaxAggregateOutputType | null
  }

  export type ReviewAvgAggregateOutputType = {
    stars: number | null
  }

  export type ReviewSumAggregateOutputType = {
    stars: number | null
  }

  export type ReviewMinAggregateOutputType = {
    id: string | null
    customerId: string | null
    outletId: string | null
    reviewText: string | null
    stars: number | null
    reviewType: $Enums.ReviewType | null
    postedToGoogle: boolean | null
    isVisible: boolean | null
    createdAt: Date | null
  }

  export type ReviewMaxAggregateOutputType = {
    id: string | null
    customerId: string | null
    outletId: string | null
    reviewText: string | null
    stars: number | null
    reviewType: $Enums.ReviewType | null
    postedToGoogle: boolean | null
    isVisible: boolean | null
    createdAt: Date | null
  }

  export type ReviewCountAggregateOutputType = {
    id: number
    customerId: number
    outletId: number
    reviewText: number
    stars: number
    reviewType: number
    postedToGoogle: number
    isVisible: number
    createdAt: number
    _all: number
  }


  export type ReviewAvgAggregateInputType = {
    stars?: true
  }

  export type ReviewSumAggregateInputType = {
    stars?: true
  }

  export type ReviewMinAggregateInputType = {
    id?: true
    customerId?: true
    outletId?: true
    reviewText?: true
    stars?: true
    reviewType?: true
    postedToGoogle?: true
    isVisible?: true
    createdAt?: true
  }

  export type ReviewMaxAggregateInputType = {
    id?: true
    customerId?: true
    outletId?: true
    reviewText?: true
    stars?: true
    reviewType?: true
    postedToGoogle?: true
    isVisible?: true
    createdAt?: true
  }

  export type ReviewCountAggregateInputType = {
    id?: true
    customerId?: true
    outletId?: true
    reviewText?: true
    stars?: true
    reviewType?: true
    postedToGoogle?: true
    isVisible?: true
    createdAt?: true
    _all?: true
  }

  export type ReviewAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Review to aggregate.
     */
    where?: ReviewWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reviews to fetch.
     */
    orderBy?: ReviewOrderByWithRelationInput | ReviewOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ReviewWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reviews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reviews.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Reviews
    **/
    _count?: true | ReviewCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ReviewAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ReviewSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ReviewMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ReviewMaxAggregateInputType
  }

  export type GetReviewAggregateType<T extends ReviewAggregateArgs> = {
        [P in keyof T & keyof AggregateReview]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateReview[P]>
      : GetScalarType<T[P], AggregateReview[P]>
  }




  export type ReviewGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReviewWhereInput
    orderBy?: ReviewOrderByWithAggregationInput | ReviewOrderByWithAggregationInput[]
    by: ReviewScalarFieldEnum[] | ReviewScalarFieldEnum
    having?: ReviewScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ReviewCountAggregateInputType | true
    _avg?: ReviewAvgAggregateInputType
    _sum?: ReviewSumAggregateInputType
    _min?: ReviewMinAggregateInputType
    _max?: ReviewMaxAggregateInputType
  }

  export type ReviewGroupByOutputType = {
    id: string
    customerId: string | null
    outletId: string
    reviewText: string | null
    stars: number
    reviewType: $Enums.ReviewType
    postedToGoogle: boolean
    isVisible: boolean
    createdAt: Date
    _count: ReviewCountAggregateOutputType | null
    _avg: ReviewAvgAggregateOutputType | null
    _sum: ReviewSumAggregateOutputType | null
    _min: ReviewMinAggregateOutputType | null
    _max: ReviewMaxAggregateOutputType | null
  }

  type GetReviewGroupByPayload<T extends ReviewGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ReviewGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ReviewGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ReviewGroupByOutputType[P]>
            : GetScalarType<T[P], ReviewGroupByOutputType[P]>
        }
      >
    >


  export type ReviewSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    customerId?: boolean
    outletId?: boolean
    reviewText?: boolean
    stars?: boolean
    reviewType?: boolean
    postedToGoogle?: boolean
    isVisible?: boolean
    createdAt?: boolean
    customer?: boolean | Review$customerArgs<ExtArgs>
    outlet?: boolean | OutletDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["review"]>

  export type ReviewSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    customerId?: boolean
    outletId?: boolean
    reviewText?: boolean
    stars?: boolean
    reviewType?: boolean
    postedToGoogle?: boolean
    isVisible?: boolean
    createdAt?: boolean
    customer?: boolean | Review$customerArgs<ExtArgs>
    outlet?: boolean | OutletDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["review"]>

  export type ReviewSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    customerId?: boolean
    outletId?: boolean
    reviewText?: boolean
    stars?: boolean
    reviewType?: boolean
    postedToGoogle?: boolean
    isVisible?: boolean
    createdAt?: boolean
    customer?: boolean | Review$customerArgs<ExtArgs>
    outlet?: boolean | OutletDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["review"]>

  export type ReviewSelectScalar = {
    id?: boolean
    customerId?: boolean
    outletId?: boolean
    reviewText?: boolean
    stars?: boolean
    reviewType?: boolean
    postedToGoogle?: boolean
    isVisible?: boolean
    createdAt?: boolean
  }

  export type ReviewOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "customerId" | "outletId" | "reviewText" | "stars" | "reviewType" | "postedToGoogle" | "isVisible" | "createdAt", ExtArgs["result"]["review"]>
  export type ReviewInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    customer?: boolean | Review$customerArgs<ExtArgs>
    outlet?: boolean | OutletDefaultArgs<ExtArgs>
  }
  export type ReviewIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    customer?: boolean | Review$customerArgs<ExtArgs>
    outlet?: boolean | OutletDefaultArgs<ExtArgs>
  }
  export type ReviewIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    customer?: boolean | Review$customerArgs<ExtArgs>
    outlet?: boolean | OutletDefaultArgs<ExtArgs>
  }

  export type $ReviewPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Review"
    objects: {
      customer: Prisma.$CustomerPayload<ExtArgs> | null
      outlet: Prisma.$OutletPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      customerId: string | null
      outletId: string
      reviewText: string | null
      stars: number
      reviewType: $Enums.ReviewType
      postedToGoogle: boolean
      isVisible: boolean
      createdAt: Date
    }, ExtArgs["result"]["review"]>
    composites: {}
  }

  type ReviewGetPayload<S extends boolean | null | undefined | ReviewDefaultArgs> = $Result.GetResult<Prisma.$ReviewPayload, S>

  type ReviewCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ReviewFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ReviewCountAggregateInputType | true
    }

  export interface ReviewDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Review'], meta: { name: 'Review' } }
    /**
     * Find zero or one Review that matches the filter.
     * @param {ReviewFindUniqueArgs} args - Arguments to find a Review
     * @example
     * // Get one Review
     * const review = await prisma.review.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ReviewFindUniqueArgs>(args: SelectSubset<T, ReviewFindUniqueArgs<ExtArgs>>): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Review that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ReviewFindUniqueOrThrowArgs} args - Arguments to find a Review
     * @example
     * // Get one Review
     * const review = await prisma.review.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ReviewFindUniqueOrThrowArgs>(args: SelectSubset<T, ReviewFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Review that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewFindFirstArgs} args - Arguments to find a Review
     * @example
     * // Get one Review
     * const review = await prisma.review.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ReviewFindFirstArgs>(args?: SelectSubset<T, ReviewFindFirstArgs<ExtArgs>>): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Review that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewFindFirstOrThrowArgs} args - Arguments to find a Review
     * @example
     * // Get one Review
     * const review = await prisma.review.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ReviewFindFirstOrThrowArgs>(args?: SelectSubset<T, ReviewFindFirstOrThrowArgs<ExtArgs>>): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Reviews that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Reviews
     * const reviews = await prisma.review.findMany()
     * 
     * // Get first 10 Reviews
     * const reviews = await prisma.review.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const reviewWithIdOnly = await prisma.review.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ReviewFindManyArgs>(args?: SelectSubset<T, ReviewFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Review.
     * @param {ReviewCreateArgs} args - Arguments to create a Review.
     * @example
     * // Create one Review
     * const Review = await prisma.review.create({
     *   data: {
     *     // ... data to create a Review
     *   }
     * })
     * 
     */
    create<T extends ReviewCreateArgs>(args: SelectSubset<T, ReviewCreateArgs<ExtArgs>>): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Reviews.
     * @param {ReviewCreateManyArgs} args - Arguments to create many Reviews.
     * @example
     * // Create many Reviews
     * const review = await prisma.review.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ReviewCreateManyArgs>(args?: SelectSubset<T, ReviewCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Reviews and returns the data saved in the database.
     * @param {ReviewCreateManyAndReturnArgs} args - Arguments to create many Reviews.
     * @example
     * // Create many Reviews
     * const review = await prisma.review.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Reviews and only return the `id`
     * const reviewWithIdOnly = await prisma.review.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ReviewCreateManyAndReturnArgs>(args?: SelectSubset<T, ReviewCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Review.
     * @param {ReviewDeleteArgs} args - Arguments to delete one Review.
     * @example
     * // Delete one Review
     * const Review = await prisma.review.delete({
     *   where: {
     *     // ... filter to delete one Review
     *   }
     * })
     * 
     */
    delete<T extends ReviewDeleteArgs>(args: SelectSubset<T, ReviewDeleteArgs<ExtArgs>>): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Review.
     * @param {ReviewUpdateArgs} args - Arguments to update one Review.
     * @example
     * // Update one Review
     * const review = await prisma.review.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ReviewUpdateArgs>(args: SelectSubset<T, ReviewUpdateArgs<ExtArgs>>): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Reviews.
     * @param {ReviewDeleteManyArgs} args - Arguments to filter Reviews to delete.
     * @example
     * // Delete a few Reviews
     * const { count } = await prisma.review.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ReviewDeleteManyArgs>(args?: SelectSubset<T, ReviewDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Reviews.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Reviews
     * const review = await prisma.review.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ReviewUpdateManyArgs>(args: SelectSubset<T, ReviewUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Reviews and returns the data updated in the database.
     * @param {ReviewUpdateManyAndReturnArgs} args - Arguments to update many Reviews.
     * @example
     * // Update many Reviews
     * const review = await prisma.review.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Reviews and only return the `id`
     * const reviewWithIdOnly = await prisma.review.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ReviewUpdateManyAndReturnArgs>(args: SelectSubset<T, ReviewUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Review.
     * @param {ReviewUpsertArgs} args - Arguments to update or create a Review.
     * @example
     * // Update or create a Review
     * const review = await prisma.review.upsert({
     *   create: {
     *     // ... data to create a Review
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Review we want to update
     *   }
     * })
     */
    upsert<T extends ReviewUpsertArgs>(args: SelectSubset<T, ReviewUpsertArgs<ExtArgs>>): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Reviews.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewCountArgs} args - Arguments to filter Reviews to count.
     * @example
     * // Count the number of Reviews
     * const count = await prisma.review.count({
     *   where: {
     *     // ... the filter for the Reviews we want to count
     *   }
     * })
    **/
    count<T extends ReviewCountArgs>(
      args?: Subset<T, ReviewCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ReviewCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Review.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ReviewAggregateArgs>(args: Subset<T, ReviewAggregateArgs>): Prisma.PrismaPromise<GetReviewAggregateType<T>>

    /**
     * Group by Review.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ReviewGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ReviewGroupByArgs['orderBy'] }
        : { orderBy?: ReviewGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ReviewGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetReviewGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Review model
   */
  readonly fields: ReviewFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Review.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ReviewClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    customer<T extends Review$customerArgs<ExtArgs> = {}>(args?: Subset<T, Review$customerArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    outlet<T extends OutletDefaultArgs<ExtArgs> = {}>(args?: Subset<T, OutletDefaultArgs<ExtArgs>>): Prisma__OutletClient<$Result.GetResult<Prisma.$OutletPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Review model
   */
  interface ReviewFieldRefs {
    readonly id: FieldRef<"Review", 'String'>
    readonly customerId: FieldRef<"Review", 'String'>
    readonly outletId: FieldRef<"Review", 'String'>
    readonly reviewText: FieldRef<"Review", 'String'>
    readonly stars: FieldRef<"Review", 'Int'>
    readonly reviewType: FieldRef<"Review", 'ReviewType'>
    readonly postedToGoogle: FieldRef<"Review", 'Boolean'>
    readonly isVisible: FieldRef<"Review", 'Boolean'>
    readonly createdAt: FieldRef<"Review", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Review findUnique
   */
  export type ReviewFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * Filter, which Review to fetch.
     */
    where: ReviewWhereUniqueInput
  }

  /**
   * Review findUniqueOrThrow
   */
  export type ReviewFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * Filter, which Review to fetch.
     */
    where: ReviewWhereUniqueInput
  }

  /**
   * Review findFirst
   */
  export type ReviewFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * Filter, which Review to fetch.
     */
    where?: ReviewWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reviews to fetch.
     */
    orderBy?: ReviewOrderByWithRelationInput | ReviewOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Reviews.
     */
    cursor?: ReviewWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reviews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reviews.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Reviews.
     */
    distinct?: ReviewScalarFieldEnum | ReviewScalarFieldEnum[]
  }

  /**
   * Review findFirstOrThrow
   */
  export type ReviewFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * Filter, which Review to fetch.
     */
    where?: ReviewWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reviews to fetch.
     */
    orderBy?: ReviewOrderByWithRelationInput | ReviewOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Reviews.
     */
    cursor?: ReviewWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reviews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reviews.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Reviews.
     */
    distinct?: ReviewScalarFieldEnum | ReviewScalarFieldEnum[]
  }

  /**
   * Review findMany
   */
  export type ReviewFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * Filter, which Reviews to fetch.
     */
    where?: ReviewWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reviews to fetch.
     */
    orderBy?: ReviewOrderByWithRelationInput | ReviewOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Reviews.
     */
    cursor?: ReviewWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reviews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reviews.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Reviews.
     */
    distinct?: ReviewScalarFieldEnum | ReviewScalarFieldEnum[]
  }

  /**
   * Review create
   */
  export type ReviewCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * The data needed to create a Review.
     */
    data: XOR<ReviewCreateInput, ReviewUncheckedCreateInput>
  }

  /**
   * Review createMany
   */
  export type ReviewCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Reviews.
     */
    data: ReviewCreateManyInput | ReviewCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Review createManyAndReturn
   */
  export type ReviewCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * The data used to create many Reviews.
     */
    data: ReviewCreateManyInput | ReviewCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Review update
   */
  export type ReviewUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * The data needed to update a Review.
     */
    data: XOR<ReviewUpdateInput, ReviewUncheckedUpdateInput>
    /**
     * Choose, which Review to update.
     */
    where: ReviewWhereUniqueInput
  }

  /**
   * Review updateMany
   */
  export type ReviewUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Reviews.
     */
    data: XOR<ReviewUpdateManyMutationInput, ReviewUncheckedUpdateManyInput>
    /**
     * Filter which Reviews to update
     */
    where?: ReviewWhereInput
    /**
     * Limit how many Reviews to update.
     */
    limit?: number
  }

  /**
   * Review updateManyAndReturn
   */
  export type ReviewUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * The data used to update Reviews.
     */
    data: XOR<ReviewUpdateManyMutationInput, ReviewUncheckedUpdateManyInput>
    /**
     * Filter which Reviews to update
     */
    where?: ReviewWhereInput
    /**
     * Limit how many Reviews to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Review upsert
   */
  export type ReviewUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * The filter to search for the Review to update in case it exists.
     */
    where: ReviewWhereUniqueInput
    /**
     * In case the Review found by the `where` argument doesn't exist, create a new Review with this data.
     */
    create: XOR<ReviewCreateInput, ReviewUncheckedCreateInput>
    /**
     * In case the Review was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ReviewUpdateInput, ReviewUncheckedUpdateInput>
  }

  /**
   * Review delete
   */
  export type ReviewDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * Filter which Review to delete.
     */
    where: ReviewWhereUniqueInput
  }

  /**
   * Review deleteMany
   */
  export type ReviewDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Reviews to delete
     */
    where?: ReviewWhereInput
    /**
     * Limit how many Reviews to delete.
     */
    limit?: number
  }

  /**
   * Review.customer
   */
  export type Review$customerArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    where?: CustomerWhereInput
  }

  /**
   * Review without action
   */
  export type ReviewDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
  }


  /**
   * Model CustomerVisit
   */

  export type AggregateCustomerVisit = {
    _count: CustomerVisitCountAggregateOutputType | null
    _min: CustomerVisitMinAggregateOutputType | null
    _max: CustomerVisitMaxAggregateOutputType | null
  }

  export type CustomerVisitMinAggregateOutputType = {
    id: string | null
    customerId: string | null
    deviceId: string | null
    outletId: string | null
    visitType: $Enums.VisitType | null
    visitedAt: Date | null
  }

  export type CustomerVisitMaxAggregateOutputType = {
    id: string | null
    customerId: string | null
    deviceId: string | null
    outletId: string | null
    visitType: $Enums.VisitType | null
    visitedAt: Date | null
  }

  export type CustomerVisitCountAggregateOutputType = {
    id: number
    customerId: number
    deviceId: number
    outletId: number
    visitType: number
    visitedAt: number
    _all: number
  }


  export type CustomerVisitMinAggregateInputType = {
    id?: true
    customerId?: true
    deviceId?: true
    outletId?: true
    visitType?: true
    visitedAt?: true
  }

  export type CustomerVisitMaxAggregateInputType = {
    id?: true
    customerId?: true
    deviceId?: true
    outletId?: true
    visitType?: true
    visitedAt?: true
  }

  export type CustomerVisitCountAggregateInputType = {
    id?: true
    customerId?: true
    deviceId?: true
    outletId?: true
    visitType?: true
    visitedAt?: true
    _all?: true
  }

  export type CustomerVisitAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CustomerVisit to aggregate.
     */
    where?: CustomerVisitWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CustomerVisits to fetch.
     */
    orderBy?: CustomerVisitOrderByWithRelationInput | CustomerVisitOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CustomerVisitWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CustomerVisits from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CustomerVisits.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CustomerVisits
    **/
    _count?: true | CustomerVisitCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CustomerVisitMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CustomerVisitMaxAggregateInputType
  }

  export type GetCustomerVisitAggregateType<T extends CustomerVisitAggregateArgs> = {
        [P in keyof T & keyof AggregateCustomerVisit]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCustomerVisit[P]>
      : GetScalarType<T[P], AggregateCustomerVisit[P]>
  }




  export type CustomerVisitGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CustomerVisitWhereInput
    orderBy?: CustomerVisitOrderByWithAggregationInput | CustomerVisitOrderByWithAggregationInput[]
    by: CustomerVisitScalarFieldEnum[] | CustomerVisitScalarFieldEnum
    having?: CustomerVisitScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CustomerVisitCountAggregateInputType | true
    _min?: CustomerVisitMinAggregateInputType
    _max?: CustomerVisitMaxAggregateInputType
  }

  export type CustomerVisitGroupByOutputType = {
    id: string
    customerId: string | null
    deviceId: string
    outletId: string
    visitType: $Enums.VisitType
    visitedAt: Date
    _count: CustomerVisitCountAggregateOutputType | null
    _min: CustomerVisitMinAggregateOutputType | null
    _max: CustomerVisitMaxAggregateOutputType | null
  }

  type GetCustomerVisitGroupByPayload<T extends CustomerVisitGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CustomerVisitGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CustomerVisitGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CustomerVisitGroupByOutputType[P]>
            : GetScalarType<T[P], CustomerVisitGroupByOutputType[P]>
        }
      >
    >


  export type CustomerVisitSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    customerId?: boolean
    deviceId?: boolean
    outletId?: boolean
    visitType?: boolean
    visitedAt?: boolean
    customer?: boolean | CustomerVisit$customerArgs<ExtArgs>
    outlet?: boolean | OutletDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["customerVisit"]>

  export type CustomerVisitSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    customerId?: boolean
    deviceId?: boolean
    outletId?: boolean
    visitType?: boolean
    visitedAt?: boolean
    customer?: boolean | CustomerVisit$customerArgs<ExtArgs>
    outlet?: boolean | OutletDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["customerVisit"]>

  export type CustomerVisitSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    customerId?: boolean
    deviceId?: boolean
    outletId?: boolean
    visitType?: boolean
    visitedAt?: boolean
    customer?: boolean | CustomerVisit$customerArgs<ExtArgs>
    outlet?: boolean | OutletDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["customerVisit"]>

  export type CustomerVisitSelectScalar = {
    id?: boolean
    customerId?: boolean
    deviceId?: boolean
    outletId?: boolean
    visitType?: boolean
    visitedAt?: boolean
  }

  export type CustomerVisitOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "customerId" | "deviceId" | "outletId" | "visitType" | "visitedAt", ExtArgs["result"]["customerVisit"]>
  export type CustomerVisitInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    customer?: boolean | CustomerVisit$customerArgs<ExtArgs>
    outlet?: boolean | OutletDefaultArgs<ExtArgs>
  }
  export type CustomerVisitIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    customer?: boolean | CustomerVisit$customerArgs<ExtArgs>
    outlet?: boolean | OutletDefaultArgs<ExtArgs>
  }
  export type CustomerVisitIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    customer?: boolean | CustomerVisit$customerArgs<ExtArgs>
    outlet?: boolean | OutletDefaultArgs<ExtArgs>
  }

  export type $CustomerVisitPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CustomerVisit"
    objects: {
      customer: Prisma.$CustomerPayload<ExtArgs> | null
      outlet: Prisma.$OutletPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      customerId: string | null
      deviceId: string
      outletId: string
      visitType: $Enums.VisitType
      visitedAt: Date
    }, ExtArgs["result"]["customerVisit"]>
    composites: {}
  }

  type CustomerVisitGetPayload<S extends boolean | null | undefined | CustomerVisitDefaultArgs> = $Result.GetResult<Prisma.$CustomerVisitPayload, S>

  type CustomerVisitCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CustomerVisitFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CustomerVisitCountAggregateInputType | true
    }

  export interface CustomerVisitDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CustomerVisit'], meta: { name: 'CustomerVisit' } }
    /**
     * Find zero or one CustomerVisit that matches the filter.
     * @param {CustomerVisitFindUniqueArgs} args - Arguments to find a CustomerVisit
     * @example
     * // Get one CustomerVisit
     * const customerVisit = await prisma.customerVisit.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CustomerVisitFindUniqueArgs>(args: SelectSubset<T, CustomerVisitFindUniqueArgs<ExtArgs>>): Prisma__CustomerVisitClient<$Result.GetResult<Prisma.$CustomerVisitPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one CustomerVisit that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CustomerVisitFindUniqueOrThrowArgs} args - Arguments to find a CustomerVisit
     * @example
     * // Get one CustomerVisit
     * const customerVisit = await prisma.customerVisit.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CustomerVisitFindUniqueOrThrowArgs>(args: SelectSubset<T, CustomerVisitFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CustomerVisitClient<$Result.GetResult<Prisma.$CustomerVisitPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CustomerVisit that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerVisitFindFirstArgs} args - Arguments to find a CustomerVisit
     * @example
     * // Get one CustomerVisit
     * const customerVisit = await prisma.customerVisit.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CustomerVisitFindFirstArgs>(args?: SelectSubset<T, CustomerVisitFindFirstArgs<ExtArgs>>): Prisma__CustomerVisitClient<$Result.GetResult<Prisma.$CustomerVisitPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CustomerVisit that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerVisitFindFirstOrThrowArgs} args - Arguments to find a CustomerVisit
     * @example
     * // Get one CustomerVisit
     * const customerVisit = await prisma.customerVisit.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CustomerVisitFindFirstOrThrowArgs>(args?: SelectSubset<T, CustomerVisitFindFirstOrThrowArgs<ExtArgs>>): Prisma__CustomerVisitClient<$Result.GetResult<Prisma.$CustomerVisitPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CustomerVisits that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerVisitFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CustomerVisits
     * const customerVisits = await prisma.customerVisit.findMany()
     * 
     * // Get first 10 CustomerVisits
     * const customerVisits = await prisma.customerVisit.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const customerVisitWithIdOnly = await prisma.customerVisit.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CustomerVisitFindManyArgs>(args?: SelectSubset<T, CustomerVisitFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CustomerVisitPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a CustomerVisit.
     * @param {CustomerVisitCreateArgs} args - Arguments to create a CustomerVisit.
     * @example
     * // Create one CustomerVisit
     * const CustomerVisit = await prisma.customerVisit.create({
     *   data: {
     *     // ... data to create a CustomerVisit
     *   }
     * })
     * 
     */
    create<T extends CustomerVisitCreateArgs>(args: SelectSubset<T, CustomerVisitCreateArgs<ExtArgs>>): Prisma__CustomerVisitClient<$Result.GetResult<Prisma.$CustomerVisitPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many CustomerVisits.
     * @param {CustomerVisitCreateManyArgs} args - Arguments to create many CustomerVisits.
     * @example
     * // Create many CustomerVisits
     * const customerVisit = await prisma.customerVisit.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CustomerVisitCreateManyArgs>(args?: SelectSubset<T, CustomerVisitCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CustomerVisits and returns the data saved in the database.
     * @param {CustomerVisitCreateManyAndReturnArgs} args - Arguments to create many CustomerVisits.
     * @example
     * // Create many CustomerVisits
     * const customerVisit = await prisma.customerVisit.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CustomerVisits and only return the `id`
     * const customerVisitWithIdOnly = await prisma.customerVisit.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CustomerVisitCreateManyAndReturnArgs>(args?: SelectSubset<T, CustomerVisitCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CustomerVisitPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a CustomerVisit.
     * @param {CustomerVisitDeleteArgs} args - Arguments to delete one CustomerVisit.
     * @example
     * // Delete one CustomerVisit
     * const CustomerVisit = await prisma.customerVisit.delete({
     *   where: {
     *     // ... filter to delete one CustomerVisit
     *   }
     * })
     * 
     */
    delete<T extends CustomerVisitDeleteArgs>(args: SelectSubset<T, CustomerVisitDeleteArgs<ExtArgs>>): Prisma__CustomerVisitClient<$Result.GetResult<Prisma.$CustomerVisitPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one CustomerVisit.
     * @param {CustomerVisitUpdateArgs} args - Arguments to update one CustomerVisit.
     * @example
     * // Update one CustomerVisit
     * const customerVisit = await prisma.customerVisit.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CustomerVisitUpdateArgs>(args: SelectSubset<T, CustomerVisitUpdateArgs<ExtArgs>>): Prisma__CustomerVisitClient<$Result.GetResult<Prisma.$CustomerVisitPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more CustomerVisits.
     * @param {CustomerVisitDeleteManyArgs} args - Arguments to filter CustomerVisits to delete.
     * @example
     * // Delete a few CustomerVisits
     * const { count } = await prisma.customerVisit.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CustomerVisitDeleteManyArgs>(args?: SelectSubset<T, CustomerVisitDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CustomerVisits.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerVisitUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CustomerVisits
     * const customerVisit = await prisma.customerVisit.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CustomerVisitUpdateManyArgs>(args: SelectSubset<T, CustomerVisitUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CustomerVisits and returns the data updated in the database.
     * @param {CustomerVisitUpdateManyAndReturnArgs} args - Arguments to update many CustomerVisits.
     * @example
     * // Update many CustomerVisits
     * const customerVisit = await prisma.customerVisit.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more CustomerVisits and only return the `id`
     * const customerVisitWithIdOnly = await prisma.customerVisit.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CustomerVisitUpdateManyAndReturnArgs>(args: SelectSubset<T, CustomerVisitUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CustomerVisitPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one CustomerVisit.
     * @param {CustomerVisitUpsertArgs} args - Arguments to update or create a CustomerVisit.
     * @example
     * // Update or create a CustomerVisit
     * const customerVisit = await prisma.customerVisit.upsert({
     *   create: {
     *     // ... data to create a CustomerVisit
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CustomerVisit we want to update
     *   }
     * })
     */
    upsert<T extends CustomerVisitUpsertArgs>(args: SelectSubset<T, CustomerVisitUpsertArgs<ExtArgs>>): Prisma__CustomerVisitClient<$Result.GetResult<Prisma.$CustomerVisitPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of CustomerVisits.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerVisitCountArgs} args - Arguments to filter CustomerVisits to count.
     * @example
     * // Count the number of CustomerVisits
     * const count = await prisma.customerVisit.count({
     *   where: {
     *     // ... the filter for the CustomerVisits we want to count
     *   }
     * })
    **/
    count<T extends CustomerVisitCountArgs>(
      args?: Subset<T, CustomerVisitCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CustomerVisitCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CustomerVisit.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerVisitAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CustomerVisitAggregateArgs>(args: Subset<T, CustomerVisitAggregateArgs>): Prisma.PrismaPromise<GetCustomerVisitAggregateType<T>>

    /**
     * Group by CustomerVisit.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerVisitGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CustomerVisitGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CustomerVisitGroupByArgs['orderBy'] }
        : { orderBy?: CustomerVisitGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CustomerVisitGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCustomerVisitGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CustomerVisit model
   */
  readonly fields: CustomerVisitFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CustomerVisit.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CustomerVisitClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    customer<T extends CustomerVisit$customerArgs<ExtArgs> = {}>(args?: Subset<T, CustomerVisit$customerArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    outlet<T extends OutletDefaultArgs<ExtArgs> = {}>(args?: Subset<T, OutletDefaultArgs<ExtArgs>>): Prisma__OutletClient<$Result.GetResult<Prisma.$OutletPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the CustomerVisit model
   */
  interface CustomerVisitFieldRefs {
    readonly id: FieldRef<"CustomerVisit", 'String'>
    readonly customerId: FieldRef<"CustomerVisit", 'String'>
    readonly deviceId: FieldRef<"CustomerVisit", 'String'>
    readonly outletId: FieldRef<"CustomerVisit", 'String'>
    readonly visitType: FieldRef<"CustomerVisit", 'VisitType'>
    readonly visitedAt: FieldRef<"CustomerVisit", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * CustomerVisit findUnique
   */
  export type CustomerVisitFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerVisit
     */
    select?: CustomerVisitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CustomerVisit
     */
    omit?: CustomerVisitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerVisitInclude<ExtArgs> | null
    /**
     * Filter, which CustomerVisit to fetch.
     */
    where: CustomerVisitWhereUniqueInput
  }

  /**
   * CustomerVisit findUniqueOrThrow
   */
  export type CustomerVisitFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerVisit
     */
    select?: CustomerVisitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CustomerVisit
     */
    omit?: CustomerVisitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerVisitInclude<ExtArgs> | null
    /**
     * Filter, which CustomerVisit to fetch.
     */
    where: CustomerVisitWhereUniqueInput
  }

  /**
   * CustomerVisit findFirst
   */
  export type CustomerVisitFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerVisit
     */
    select?: CustomerVisitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CustomerVisit
     */
    omit?: CustomerVisitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerVisitInclude<ExtArgs> | null
    /**
     * Filter, which CustomerVisit to fetch.
     */
    where?: CustomerVisitWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CustomerVisits to fetch.
     */
    orderBy?: CustomerVisitOrderByWithRelationInput | CustomerVisitOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CustomerVisits.
     */
    cursor?: CustomerVisitWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CustomerVisits from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CustomerVisits.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CustomerVisits.
     */
    distinct?: CustomerVisitScalarFieldEnum | CustomerVisitScalarFieldEnum[]
  }

  /**
   * CustomerVisit findFirstOrThrow
   */
  export type CustomerVisitFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerVisit
     */
    select?: CustomerVisitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CustomerVisit
     */
    omit?: CustomerVisitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerVisitInclude<ExtArgs> | null
    /**
     * Filter, which CustomerVisit to fetch.
     */
    where?: CustomerVisitWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CustomerVisits to fetch.
     */
    orderBy?: CustomerVisitOrderByWithRelationInput | CustomerVisitOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CustomerVisits.
     */
    cursor?: CustomerVisitWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CustomerVisits from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CustomerVisits.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CustomerVisits.
     */
    distinct?: CustomerVisitScalarFieldEnum | CustomerVisitScalarFieldEnum[]
  }

  /**
   * CustomerVisit findMany
   */
  export type CustomerVisitFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerVisit
     */
    select?: CustomerVisitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CustomerVisit
     */
    omit?: CustomerVisitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerVisitInclude<ExtArgs> | null
    /**
     * Filter, which CustomerVisits to fetch.
     */
    where?: CustomerVisitWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CustomerVisits to fetch.
     */
    orderBy?: CustomerVisitOrderByWithRelationInput | CustomerVisitOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CustomerVisits.
     */
    cursor?: CustomerVisitWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CustomerVisits from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CustomerVisits.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CustomerVisits.
     */
    distinct?: CustomerVisitScalarFieldEnum | CustomerVisitScalarFieldEnum[]
  }

  /**
   * CustomerVisit create
   */
  export type CustomerVisitCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerVisit
     */
    select?: CustomerVisitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CustomerVisit
     */
    omit?: CustomerVisitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerVisitInclude<ExtArgs> | null
    /**
     * The data needed to create a CustomerVisit.
     */
    data: XOR<CustomerVisitCreateInput, CustomerVisitUncheckedCreateInput>
  }

  /**
   * CustomerVisit createMany
   */
  export type CustomerVisitCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CustomerVisits.
     */
    data: CustomerVisitCreateManyInput | CustomerVisitCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CustomerVisit createManyAndReturn
   */
  export type CustomerVisitCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerVisit
     */
    select?: CustomerVisitSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CustomerVisit
     */
    omit?: CustomerVisitOmit<ExtArgs> | null
    /**
     * The data used to create many CustomerVisits.
     */
    data: CustomerVisitCreateManyInput | CustomerVisitCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerVisitIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * CustomerVisit update
   */
  export type CustomerVisitUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerVisit
     */
    select?: CustomerVisitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CustomerVisit
     */
    omit?: CustomerVisitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerVisitInclude<ExtArgs> | null
    /**
     * The data needed to update a CustomerVisit.
     */
    data: XOR<CustomerVisitUpdateInput, CustomerVisitUncheckedUpdateInput>
    /**
     * Choose, which CustomerVisit to update.
     */
    where: CustomerVisitWhereUniqueInput
  }

  /**
   * CustomerVisit updateMany
   */
  export type CustomerVisitUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CustomerVisits.
     */
    data: XOR<CustomerVisitUpdateManyMutationInput, CustomerVisitUncheckedUpdateManyInput>
    /**
     * Filter which CustomerVisits to update
     */
    where?: CustomerVisitWhereInput
    /**
     * Limit how many CustomerVisits to update.
     */
    limit?: number
  }

  /**
   * CustomerVisit updateManyAndReturn
   */
  export type CustomerVisitUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerVisit
     */
    select?: CustomerVisitSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CustomerVisit
     */
    omit?: CustomerVisitOmit<ExtArgs> | null
    /**
     * The data used to update CustomerVisits.
     */
    data: XOR<CustomerVisitUpdateManyMutationInput, CustomerVisitUncheckedUpdateManyInput>
    /**
     * Filter which CustomerVisits to update
     */
    where?: CustomerVisitWhereInput
    /**
     * Limit how many CustomerVisits to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerVisitIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * CustomerVisit upsert
   */
  export type CustomerVisitUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerVisit
     */
    select?: CustomerVisitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CustomerVisit
     */
    omit?: CustomerVisitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerVisitInclude<ExtArgs> | null
    /**
     * The filter to search for the CustomerVisit to update in case it exists.
     */
    where: CustomerVisitWhereUniqueInput
    /**
     * In case the CustomerVisit found by the `where` argument doesn't exist, create a new CustomerVisit with this data.
     */
    create: XOR<CustomerVisitCreateInput, CustomerVisitUncheckedCreateInput>
    /**
     * In case the CustomerVisit was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CustomerVisitUpdateInput, CustomerVisitUncheckedUpdateInput>
  }

  /**
   * CustomerVisit delete
   */
  export type CustomerVisitDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerVisit
     */
    select?: CustomerVisitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CustomerVisit
     */
    omit?: CustomerVisitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerVisitInclude<ExtArgs> | null
    /**
     * Filter which CustomerVisit to delete.
     */
    where: CustomerVisitWhereUniqueInput
  }

  /**
   * CustomerVisit deleteMany
   */
  export type CustomerVisitDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CustomerVisits to delete
     */
    where?: CustomerVisitWhereInput
    /**
     * Limit how many CustomerVisits to delete.
     */
    limit?: number
  }

  /**
   * CustomerVisit.customer
   */
  export type CustomerVisit$customerArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    where?: CustomerWhereInput
  }

  /**
   * CustomerVisit without action
   */
  export type CustomerVisitDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerVisit
     */
    select?: CustomerVisitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CustomerVisit
     */
    omit?: CustomerVisitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerVisitInclude<ExtArgs> | null
  }


  /**
   * Model MenuCategory
   */

  export type AggregateMenuCategory = {
    _count: MenuCategoryCountAggregateOutputType | null
    _avg: MenuCategoryAvgAggregateOutputType | null
    _sum: MenuCategorySumAggregateOutputType | null
    _min: MenuCategoryMinAggregateOutputType | null
    _max: MenuCategoryMaxAggregateOutputType | null
  }

  export type MenuCategoryAvgAggregateOutputType = {
    displayOrder: number | null
  }

  export type MenuCategorySumAggregateOutputType = {
    displayOrder: number | null
  }

  export type MenuCategoryMinAggregateOutputType = {
    id: string | null
    name: string | null
    displayOrder: number | null
    isActive: boolean | null
    outletId: string | null
    createdAt: Date | null
  }

  export type MenuCategoryMaxAggregateOutputType = {
    id: string | null
    name: string | null
    displayOrder: number | null
    isActive: boolean | null
    outletId: string | null
    createdAt: Date | null
  }

  export type MenuCategoryCountAggregateOutputType = {
    id: number
    name: number
    displayOrder: number
    isActive: number
    outletId: number
    createdAt: number
    _all: number
  }


  export type MenuCategoryAvgAggregateInputType = {
    displayOrder?: true
  }

  export type MenuCategorySumAggregateInputType = {
    displayOrder?: true
  }

  export type MenuCategoryMinAggregateInputType = {
    id?: true
    name?: true
    displayOrder?: true
    isActive?: true
    outletId?: true
    createdAt?: true
  }

  export type MenuCategoryMaxAggregateInputType = {
    id?: true
    name?: true
    displayOrder?: true
    isActive?: true
    outletId?: true
    createdAt?: true
  }

  export type MenuCategoryCountAggregateInputType = {
    id?: true
    name?: true
    displayOrder?: true
    isActive?: true
    outletId?: true
    createdAt?: true
    _all?: true
  }

  export type MenuCategoryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MenuCategory to aggregate.
     */
    where?: MenuCategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MenuCategories to fetch.
     */
    orderBy?: MenuCategoryOrderByWithRelationInput | MenuCategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MenuCategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MenuCategories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MenuCategories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MenuCategories
    **/
    _count?: true | MenuCategoryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MenuCategoryAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MenuCategorySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MenuCategoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MenuCategoryMaxAggregateInputType
  }

  export type GetMenuCategoryAggregateType<T extends MenuCategoryAggregateArgs> = {
        [P in keyof T & keyof AggregateMenuCategory]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMenuCategory[P]>
      : GetScalarType<T[P], AggregateMenuCategory[P]>
  }




  export type MenuCategoryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MenuCategoryWhereInput
    orderBy?: MenuCategoryOrderByWithAggregationInput | MenuCategoryOrderByWithAggregationInput[]
    by: MenuCategoryScalarFieldEnum[] | MenuCategoryScalarFieldEnum
    having?: MenuCategoryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MenuCategoryCountAggregateInputType | true
    _avg?: MenuCategoryAvgAggregateInputType
    _sum?: MenuCategorySumAggregateInputType
    _min?: MenuCategoryMinAggregateInputType
    _max?: MenuCategoryMaxAggregateInputType
  }

  export type MenuCategoryGroupByOutputType = {
    id: string
    name: string
    displayOrder: number | null
    isActive: boolean
    outletId: string | null
    createdAt: Date
    _count: MenuCategoryCountAggregateOutputType | null
    _avg: MenuCategoryAvgAggregateOutputType | null
    _sum: MenuCategorySumAggregateOutputType | null
    _min: MenuCategoryMinAggregateOutputType | null
    _max: MenuCategoryMaxAggregateOutputType | null
  }

  type GetMenuCategoryGroupByPayload<T extends MenuCategoryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MenuCategoryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MenuCategoryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MenuCategoryGroupByOutputType[P]>
            : GetScalarType<T[P], MenuCategoryGroupByOutputType[P]>
        }
      >
    >


  export type MenuCategorySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    displayOrder?: boolean
    isActive?: boolean
    outletId?: boolean
    createdAt?: boolean
    outlet?: boolean | MenuCategory$outletArgs<ExtArgs>
    items?: boolean | MenuCategory$itemsArgs<ExtArgs>
    _count?: boolean | MenuCategoryCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["menuCategory"]>

  export type MenuCategorySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    displayOrder?: boolean
    isActive?: boolean
    outletId?: boolean
    createdAt?: boolean
    outlet?: boolean | MenuCategory$outletArgs<ExtArgs>
  }, ExtArgs["result"]["menuCategory"]>

  export type MenuCategorySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    displayOrder?: boolean
    isActive?: boolean
    outletId?: boolean
    createdAt?: boolean
    outlet?: boolean | MenuCategory$outletArgs<ExtArgs>
  }, ExtArgs["result"]["menuCategory"]>

  export type MenuCategorySelectScalar = {
    id?: boolean
    name?: boolean
    displayOrder?: boolean
    isActive?: boolean
    outletId?: boolean
    createdAt?: boolean
  }

  export type MenuCategoryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "displayOrder" | "isActive" | "outletId" | "createdAt", ExtArgs["result"]["menuCategory"]>
  export type MenuCategoryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    outlet?: boolean | MenuCategory$outletArgs<ExtArgs>
    items?: boolean | MenuCategory$itemsArgs<ExtArgs>
    _count?: boolean | MenuCategoryCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type MenuCategoryIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    outlet?: boolean | MenuCategory$outletArgs<ExtArgs>
  }
  export type MenuCategoryIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    outlet?: boolean | MenuCategory$outletArgs<ExtArgs>
  }

  export type $MenuCategoryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MenuCategory"
    objects: {
      outlet: Prisma.$OutletPayload<ExtArgs> | null
      items: Prisma.$MenuItemPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      displayOrder: number | null
      isActive: boolean
      outletId: string | null
      createdAt: Date
    }, ExtArgs["result"]["menuCategory"]>
    composites: {}
  }

  type MenuCategoryGetPayload<S extends boolean | null | undefined | MenuCategoryDefaultArgs> = $Result.GetResult<Prisma.$MenuCategoryPayload, S>

  type MenuCategoryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MenuCategoryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MenuCategoryCountAggregateInputType | true
    }

  export interface MenuCategoryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['MenuCategory'], meta: { name: 'MenuCategory' } }
    /**
     * Find zero or one MenuCategory that matches the filter.
     * @param {MenuCategoryFindUniqueArgs} args - Arguments to find a MenuCategory
     * @example
     * // Get one MenuCategory
     * const menuCategory = await prisma.menuCategory.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MenuCategoryFindUniqueArgs>(args: SelectSubset<T, MenuCategoryFindUniqueArgs<ExtArgs>>): Prisma__MenuCategoryClient<$Result.GetResult<Prisma.$MenuCategoryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one MenuCategory that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MenuCategoryFindUniqueOrThrowArgs} args - Arguments to find a MenuCategory
     * @example
     * // Get one MenuCategory
     * const menuCategory = await prisma.menuCategory.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MenuCategoryFindUniqueOrThrowArgs>(args: SelectSubset<T, MenuCategoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MenuCategoryClient<$Result.GetResult<Prisma.$MenuCategoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MenuCategory that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MenuCategoryFindFirstArgs} args - Arguments to find a MenuCategory
     * @example
     * // Get one MenuCategory
     * const menuCategory = await prisma.menuCategory.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MenuCategoryFindFirstArgs>(args?: SelectSubset<T, MenuCategoryFindFirstArgs<ExtArgs>>): Prisma__MenuCategoryClient<$Result.GetResult<Prisma.$MenuCategoryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MenuCategory that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MenuCategoryFindFirstOrThrowArgs} args - Arguments to find a MenuCategory
     * @example
     * // Get one MenuCategory
     * const menuCategory = await prisma.menuCategory.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MenuCategoryFindFirstOrThrowArgs>(args?: SelectSubset<T, MenuCategoryFindFirstOrThrowArgs<ExtArgs>>): Prisma__MenuCategoryClient<$Result.GetResult<Prisma.$MenuCategoryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more MenuCategories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MenuCategoryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MenuCategories
     * const menuCategories = await prisma.menuCategory.findMany()
     * 
     * // Get first 10 MenuCategories
     * const menuCategories = await prisma.menuCategory.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const menuCategoryWithIdOnly = await prisma.menuCategory.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MenuCategoryFindManyArgs>(args?: SelectSubset<T, MenuCategoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MenuCategoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a MenuCategory.
     * @param {MenuCategoryCreateArgs} args - Arguments to create a MenuCategory.
     * @example
     * // Create one MenuCategory
     * const MenuCategory = await prisma.menuCategory.create({
     *   data: {
     *     // ... data to create a MenuCategory
     *   }
     * })
     * 
     */
    create<T extends MenuCategoryCreateArgs>(args: SelectSubset<T, MenuCategoryCreateArgs<ExtArgs>>): Prisma__MenuCategoryClient<$Result.GetResult<Prisma.$MenuCategoryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many MenuCategories.
     * @param {MenuCategoryCreateManyArgs} args - Arguments to create many MenuCategories.
     * @example
     * // Create many MenuCategories
     * const menuCategory = await prisma.menuCategory.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MenuCategoryCreateManyArgs>(args?: SelectSubset<T, MenuCategoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many MenuCategories and returns the data saved in the database.
     * @param {MenuCategoryCreateManyAndReturnArgs} args - Arguments to create many MenuCategories.
     * @example
     * // Create many MenuCategories
     * const menuCategory = await prisma.menuCategory.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many MenuCategories and only return the `id`
     * const menuCategoryWithIdOnly = await prisma.menuCategory.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MenuCategoryCreateManyAndReturnArgs>(args?: SelectSubset<T, MenuCategoryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MenuCategoryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a MenuCategory.
     * @param {MenuCategoryDeleteArgs} args - Arguments to delete one MenuCategory.
     * @example
     * // Delete one MenuCategory
     * const MenuCategory = await prisma.menuCategory.delete({
     *   where: {
     *     // ... filter to delete one MenuCategory
     *   }
     * })
     * 
     */
    delete<T extends MenuCategoryDeleteArgs>(args: SelectSubset<T, MenuCategoryDeleteArgs<ExtArgs>>): Prisma__MenuCategoryClient<$Result.GetResult<Prisma.$MenuCategoryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one MenuCategory.
     * @param {MenuCategoryUpdateArgs} args - Arguments to update one MenuCategory.
     * @example
     * // Update one MenuCategory
     * const menuCategory = await prisma.menuCategory.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MenuCategoryUpdateArgs>(args: SelectSubset<T, MenuCategoryUpdateArgs<ExtArgs>>): Prisma__MenuCategoryClient<$Result.GetResult<Prisma.$MenuCategoryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more MenuCategories.
     * @param {MenuCategoryDeleteManyArgs} args - Arguments to filter MenuCategories to delete.
     * @example
     * // Delete a few MenuCategories
     * const { count } = await prisma.menuCategory.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MenuCategoryDeleteManyArgs>(args?: SelectSubset<T, MenuCategoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MenuCategories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MenuCategoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MenuCategories
     * const menuCategory = await prisma.menuCategory.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MenuCategoryUpdateManyArgs>(args: SelectSubset<T, MenuCategoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MenuCategories and returns the data updated in the database.
     * @param {MenuCategoryUpdateManyAndReturnArgs} args - Arguments to update many MenuCategories.
     * @example
     * // Update many MenuCategories
     * const menuCategory = await prisma.menuCategory.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more MenuCategories and only return the `id`
     * const menuCategoryWithIdOnly = await prisma.menuCategory.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MenuCategoryUpdateManyAndReturnArgs>(args: SelectSubset<T, MenuCategoryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MenuCategoryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one MenuCategory.
     * @param {MenuCategoryUpsertArgs} args - Arguments to update or create a MenuCategory.
     * @example
     * // Update or create a MenuCategory
     * const menuCategory = await prisma.menuCategory.upsert({
     *   create: {
     *     // ... data to create a MenuCategory
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MenuCategory we want to update
     *   }
     * })
     */
    upsert<T extends MenuCategoryUpsertArgs>(args: SelectSubset<T, MenuCategoryUpsertArgs<ExtArgs>>): Prisma__MenuCategoryClient<$Result.GetResult<Prisma.$MenuCategoryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of MenuCategories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MenuCategoryCountArgs} args - Arguments to filter MenuCategories to count.
     * @example
     * // Count the number of MenuCategories
     * const count = await prisma.menuCategory.count({
     *   where: {
     *     // ... the filter for the MenuCategories we want to count
     *   }
     * })
    **/
    count<T extends MenuCategoryCountArgs>(
      args?: Subset<T, MenuCategoryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MenuCategoryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MenuCategory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MenuCategoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MenuCategoryAggregateArgs>(args: Subset<T, MenuCategoryAggregateArgs>): Prisma.PrismaPromise<GetMenuCategoryAggregateType<T>>

    /**
     * Group by MenuCategory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MenuCategoryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MenuCategoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MenuCategoryGroupByArgs['orderBy'] }
        : { orderBy?: MenuCategoryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MenuCategoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMenuCategoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the MenuCategory model
   */
  readonly fields: MenuCategoryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for MenuCategory.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MenuCategoryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    outlet<T extends MenuCategory$outletArgs<ExtArgs> = {}>(args?: Subset<T, MenuCategory$outletArgs<ExtArgs>>): Prisma__OutletClient<$Result.GetResult<Prisma.$OutletPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    items<T extends MenuCategory$itemsArgs<ExtArgs> = {}>(args?: Subset<T, MenuCategory$itemsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MenuItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the MenuCategory model
   */
  interface MenuCategoryFieldRefs {
    readonly id: FieldRef<"MenuCategory", 'String'>
    readonly name: FieldRef<"MenuCategory", 'String'>
    readonly displayOrder: FieldRef<"MenuCategory", 'Int'>
    readonly isActive: FieldRef<"MenuCategory", 'Boolean'>
    readonly outletId: FieldRef<"MenuCategory", 'String'>
    readonly createdAt: FieldRef<"MenuCategory", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * MenuCategory findUnique
   */
  export type MenuCategoryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MenuCategory
     */
    select?: MenuCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the MenuCategory
     */
    omit?: MenuCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MenuCategoryInclude<ExtArgs> | null
    /**
     * Filter, which MenuCategory to fetch.
     */
    where: MenuCategoryWhereUniqueInput
  }

  /**
   * MenuCategory findUniqueOrThrow
   */
  export type MenuCategoryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MenuCategory
     */
    select?: MenuCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the MenuCategory
     */
    omit?: MenuCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MenuCategoryInclude<ExtArgs> | null
    /**
     * Filter, which MenuCategory to fetch.
     */
    where: MenuCategoryWhereUniqueInput
  }

  /**
   * MenuCategory findFirst
   */
  export type MenuCategoryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MenuCategory
     */
    select?: MenuCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the MenuCategory
     */
    omit?: MenuCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MenuCategoryInclude<ExtArgs> | null
    /**
     * Filter, which MenuCategory to fetch.
     */
    where?: MenuCategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MenuCategories to fetch.
     */
    orderBy?: MenuCategoryOrderByWithRelationInput | MenuCategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MenuCategories.
     */
    cursor?: MenuCategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MenuCategories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MenuCategories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MenuCategories.
     */
    distinct?: MenuCategoryScalarFieldEnum | MenuCategoryScalarFieldEnum[]
  }

  /**
   * MenuCategory findFirstOrThrow
   */
  export type MenuCategoryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MenuCategory
     */
    select?: MenuCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the MenuCategory
     */
    omit?: MenuCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MenuCategoryInclude<ExtArgs> | null
    /**
     * Filter, which MenuCategory to fetch.
     */
    where?: MenuCategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MenuCategories to fetch.
     */
    orderBy?: MenuCategoryOrderByWithRelationInput | MenuCategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MenuCategories.
     */
    cursor?: MenuCategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MenuCategories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MenuCategories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MenuCategories.
     */
    distinct?: MenuCategoryScalarFieldEnum | MenuCategoryScalarFieldEnum[]
  }

  /**
   * MenuCategory findMany
   */
  export type MenuCategoryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MenuCategory
     */
    select?: MenuCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the MenuCategory
     */
    omit?: MenuCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MenuCategoryInclude<ExtArgs> | null
    /**
     * Filter, which MenuCategories to fetch.
     */
    where?: MenuCategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MenuCategories to fetch.
     */
    orderBy?: MenuCategoryOrderByWithRelationInput | MenuCategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MenuCategories.
     */
    cursor?: MenuCategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MenuCategories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MenuCategories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MenuCategories.
     */
    distinct?: MenuCategoryScalarFieldEnum | MenuCategoryScalarFieldEnum[]
  }

  /**
   * MenuCategory create
   */
  export type MenuCategoryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MenuCategory
     */
    select?: MenuCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the MenuCategory
     */
    omit?: MenuCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MenuCategoryInclude<ExtArgs> | null
    /**
     * The data needed to create a MenuCategory.
     */
    data: XOR<MenuCategoryCreateInput, MenuCategoryUncheckedCreateInput>
  }

  /**
   * MenuCategory createMany
   */
  export type MenuCategoryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many MenuCategories.
     */
    data: MenuCategoryCreateManyInput | MenuCategoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MenuCategory createManyAndReturn
   */
  export type MenuCategoryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MenuCategory
     */
    select?: MenuCategorySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MenuCategory
     */
    omit?: MenuCategoryOmit<ExtArgs> | null
    /**
     * The data used to create many MenuCategories.
     */
    data: MenuCategoryCreateManyInput | MenuCategoryCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MenuCategoryIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * MenuCategory update
   */
  export type MenuCategoryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MenuCategory
     */
    select?: MenuCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the MenuCategory
     */
    omit?: MenuCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MenuCategoryInclude<ExtArgs> | null
    /**
     * The data needed to update a MenuCategory.
     */
    data: XOR<MenuCategoryUpdateInput, MenuCategoryUncheckedUpdateInput>
    /**
     * Choose, which MenuCategory to update.
     */
    where: MenuCategoryWhereUniqueInput
  }

  /**
   * MenuCategory updateMany
   */
  export type MenuCategoryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update MenuCategories.
     */
    data: XOR<MenuCategoryUpdateManyMutationInput, MenuCategoryUncheckedUpdateManyInput>
    /**
     * Filter which MenuCategories to update
     */
    where?: MenuCategoryWhereInput
    /**
     * Limit how many MenuCategories to update.
     */
    limit?: number
  }

  /**
   * MenuCategory updateManyAndReturn
   */
  export type MenuCategoryUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MenuCategory
     */
    select?: MenuCategorySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MenuCategory
     */
    omit?: MenuCategoryOmit<ExtArgs> | null
    /**
     * The data used to update MenuCategories.
     */
    data: XOR<MenuCategoryUpdateManyMutationInput, MenuCategoryUncheckedUpdateManyInput>
    /**
     * Filter which MenuCategories to update
     */
    where?: MenuCategoryWhereInput
    /**
     * Limit how many MenuCategories to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MenuCategoryIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * MenuCategory upsert
   */
  export type MenuCategoryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MenuCategory
     */
    select?: MenuCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the MenuCategory
     */
    omit?: MenuCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MenuCategoryInclude<ExtArgs> | null
    /**
     * The filter to search for the MenuCategory to update in case it exists.
     */
    where: MenuCategoryWhereUniqueInput
    /**
     * In case the MenuCategory found by the `where` argument doesn't exist, create a new MenuCategory with this data.
     */
    create: XOR<MenuCategoryCreateInput, MenuCategoryUncheckedCreateInput>
    /**
     * In case the MenuCategory was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MenuCategoryUpdateInput, MenuCategoryUncheckedUpdateInput>
  }

  /**
   * MenuCategory delete
   */
  export type MenuCategoryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MenuCategory
     */
    select?: MenuCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the MenuCategory
     */
    omit?: MenuCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MenuCategoryInclude<ExtArgs> | null
    /**
     * Filter which MenuCategory to delete.
     */
    where: MenuCategoryWhereUniqueInput
  }

  /**
   * MenuCategory deleteMany
   */
  export type MenuCategoryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MenuCategories to delete
     */
    where?: MenuCategoryWhereInput
    /**
     * Limit how many MenuCategories to delete.
     */
    limit?: number
  }

  /**
   * MenuCategory.outlet
   */
  export type MenuCategory$outletArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Outlet
     */
    select?: OutletSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Outlet
     */
    omit?: OutletOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OutletInclude<ExtArgs> | null
    where?: OutletWhereInput
  }

  /**
   * MenuCategory.items
   */
  export type MenuCategory$itemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MenuItem
     */
    select?: MenuItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MenuItem
     */
    omit?: MenuItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MenuItemInclude<ExtArgs> | null
    where?: MenuItemWhereInput
    orderBy?: MenuItemOrderByWithRelationInput | MenuItemOrderByWithRelationInput[]
    cursor?: MenuItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MenuItemScalarFieldEnum | MenuItemScalarFieldEnum[]
  }

  /**
   * MenuCategory without action
   */
  export type MenuCategoryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MenuCategory
     */
    select?: MenuCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the MenuCategory
     */
    omit?: MenuCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MenuCategoryInclude<ExtArgs> | null
  }


  /**
   * Model MenuItem
   */

  export type AggregateMenuItem = {
    _count: MenuItemCountAggregateOutputType | null
    _avg: MenuItemAvgAggregateOutputType | null
    _sum: MenuItemSumAggregateOutputType | null
    _min: MenuItemMinAggregateOutputType | null
    _max: MenuItemMaxAggregateOutputType | null
  }

  export type MenuItemAvgAggregateOutputType = {
    price: Decimal | null
    displayOrder: number | null
  }

  export type MenuItemSumAggregateOutputType = {
    price: Decimal | null
    displayOrder: number | null
  }

  export type MenuItemMinAggregateOutputType = {
    id: string | null
    categoryId: string | null
    name: string | null
    description: string | null
    price: Decimal | null
    isVeg: boolean | null
    imageUrl: string | null
    isAvailable: boolean | null
    displayOrder: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MenuItemMaxAggregateOutputType = {
    id: string | null
    categoryId: string | null
    name: string | null
    description: string | null
    price: Decimal | null
    isVeg: boolean | null
    imageUrl: string | null
    isAvailable: boolean | null
    displayOrder: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MenuItemCountAggregateOutputType = {
    id: number
    categoryId: number
    name: number
    description: number
    price: number
    priceVariants: number
    isVeg: number
    imageUrl: number
    isAvailable: number
    displayOrder: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type MenuItemAvgAggregateInputType = {
    price?: true
    displayOrder?: true
  }

  export type MenuItemSumAggregateInputType = {
    price?: true
    displayOrder?: true
  }

  export type MenuItemMinAggregateInputType = {
    id?: true
    categoryId?: true
    name?: true
    description?: true
    price?: true
    isVeg?: true
    imageUrl?: true
    isAvailable?: true
    displayOrder?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MenuItemMaxAggregateInputType = {
    id?: true
    categoryId?: true
    name?: true
    description?: true
    price?: true
    isVeg?: true
    imageUrl?: true
    isAvailable?: true
    displayOrder?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MenuItemCountAggregateInputType = {
    id?: true
    categoryId?: true
    name?: true
    description?: true
    price?: true
    priceVariants?: true
    isVeg?: true
    imageUrl?: true
    isAvailable?: true
    displayOrder?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type MenuItemAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MenuItem to aggregate.
     */
    where?: MenuItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MenuItems to fetch.
     */
    orderBy?: MenuItemOrderByWithRelationInput | MenuItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MenuItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MenuItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MenuItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MenuItems
    **/
    _count?: true | MenuItemCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MenuItemAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MenuItemSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MenuItemMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MenuItemMaxAggregateInputType
  }

  export type GetMenuItemAggregateType<T extends MenuItemAggregateArgs> = {
        [P in keyof T & keyof AggregateMenuItem]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMenuItem[P]>
      : GetScalarType<T[P], AggregateMenuItem[P]>
  }




  export type MenuItemGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MenuItemWhereInput
    orderBy?: MenuItemOrderByWithAggregationInput | MenuItemOrderByWithAggregationInput[]
    by: MenuItemScalarFieldEnum[] | MenuItemScalarFieldEnum
    having?: MenuItemScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MenuItemCountAggregateInputType | true
    _avg?: MenuItemAvgAggregateInputType
    _sum?: MenuItemSumAggregateInputType
    _min?: MenuItemMinAggregateInputType
    _max?: MenuItemMaxAggregateInputType
  }

  export type MenuItemGroupByOutputType = {
    id: string
    categoryId: string
    name: string
    description: string | null
    price: Decimal | null
    priceVariants: JsonValue | null
    isVeg: boolean
    imageUrl: string | null
    isAvailable: boolean
    displayOrder: number | null
    createdAt: Date
    updatedAt: Date
    _count: MenuItemCountAggregateOutputType | null
    _avg: MenuItemAvgAggregateOutputType | null
    _sum: MenuItemSumAggregateOutputType | null
    _min: MenuItemMinAggregateOutputType | null
    _max: MenuItemMaxAggregateOutputType | null
  }

  type GetMenuItemGroupByPayload<T extends MenuItemGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MenuItemGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MenuItemGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MenuItemGroupByOutputType[P]>
            : GetScalarType<T[P], MenuItemGroupByOutputType[P]>
        }
      >
    >


  export type MenuItemSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    categoryId?: boolean
    name?: boolean
    description?: boolean
    price?: boolean
    priceVariants?: boolean
    isVeg?: boolean
    imageUrl?: boolean
    isAvailable?: boolean
    displayOrder?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    category?: boolean | MenuCategoryDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["menuItem"]>

  export type MenuItemSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    categoryId?: boolean
    name?: boolean
    description?: boolean
    price?: boolean
    priceVariants?: boolean
    isVeg?: boolean
    imageUrl?: boolean
    isAvailable?: boolean
    displayOrder?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    category?: boolean | MenuCategoryDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["menuItem"]>

  export type MenuItemSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    categoryId?: boolean
    name?: boolean
    description?: boolean
    price?: boolean
    priceVariants?: boolean
    isVeg?: boolean
    imageUrl?: boolean
    isAvailable?: boolean
    displayOrder?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    category?: boolean | MenuCategoryDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["menuItem"]>

  export type MenuItemSelectScalar = {
    id?: boolean
    categoryId?: boolean
    name?: boolean
    description?: boolean
    price?: boolean
    priceVariants?: boolean
    isVeg?: boolean
    imageUrl?: boolean
    isAvailable?: boolean
    displayOrder?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type MenuItemOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "categoryId" | "name" | "description" | "price" | "priceVariants" | "isVeg" | "imageUrl" | "isAvailable" | "displayOrder" | "createdAt" | "updatedAt", ExtArgs["result"]["menuItem"]>
  export type MenuItemInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    category?: boolean | MenuCategoryDefaultArgs<ExtArgs>
  }
  export type MenuItemIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    category?: boolean | MenuCategoryDefaultArgs<ExtArgs>
  }
  export type MenuItemIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    category?: boolean | MenuCategoryDefaultArgs<ExtArgs>
  }

  export type $MenuItemPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MenuItem"
    objects: {
      category: Prisma.$MenuCategoryPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      categoryId: string
      name: string
      description: string | null
      price: Prisma.Decimal | null
      priceVariants: Prisma.JsonValue | null
      isVeg: boolean
      imageUrl: string | null
      isAvailable: boolean
      displayOrder: number | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["menuItem"]>
    composites: {}
  }

  type MenuItemGetPayload<S extends boolean | null | undefined | MenuItemDefaultArgs> = $Result.GetResult<Prisma.$MenuItemPayload, S>

  type MenuItemCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MenuItemFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MenuItemCountAggregateInputType | true
    }

  export interface MenuItemDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['MenuItem'], meta: { name: 'MenuItem' } }
    /**
     * Find zero or one MenuItem that matches the filter.
     * @param {MenuItemFindUniqueArgs} args - Arguments to find a MenuItem
     * @example
     * // Get one MenuItem
     * const menuItem = await prisma.menuItem.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MenuItemFindUniqueArgs>(args: SelectSubset<T, MenuItemFindUniqueArgs<ExtArgs>>): Prisma__MenuItemClient<$Result.GetResult<Prisma.$MenuItemPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one MenuItem that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MenuItemFindUniqueOrThrowArgs} args - Arguments to find a MenuItem
     * @example
     * // Get one MenuItem
     * const menuItem = await prisma.menuItem.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MenuItemFindUniqueOrThrowArgs>(args: SelectSubset<T, MenuItemFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MenuItemClient<$Result.GetResult<Prisma.$MenuItemPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MenuItem that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MenuItemFindFirstArgs} args - Arguments to find a MenuItem
     * @example
     * // Get one MenuItem
     * const menuItem = await prisma.menuItem.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MenuItemFindFirstArgs>(args?: SelectSubset<T, MenuItemFindFirstArgs<ExtArgs>>): Prisma__MenuItemClient<$Result.GetResult<Prisma.$MenuItemPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MenuItem that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MenuItemFindFirstOrThrowArgs} args - Arguments to find a MenuItem
     * @example
     * // Get one MenuItem
     * const menuItem = await prisma.menuItem.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MenuItemFindFirstOrThrowArgs>(args?: SelectSubset<T, MenuItemFindFirstOrThrowArgs<ExtArgs>>): Prisma__MenuItemClient<$Result.GetResult<Prisma.$MenuItemPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more MenuItems that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MenuItemFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MenuItems
     * const menuItems = await prisma.menuItem.findMany()
     * 
     * // Get first 10 MenuItems
     * const menuItems = await prisma.menuItem.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const menuItemWithIdOnly = await prisma.menuItem.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MenuItemFindManyArgs>(args?: SelectSubset<T, MenuItemFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MenuItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a MenuItem.
     * @param {MenuItemCreateArgs} args - Arguments to create a MenuItem.
     * @example
     * // Create one MenuItem
     * const MenuItem = await prisma.menuItem.create({
     *   data: {
     *     // ... data to create a MenuItem
     *   }
     * })
     * 
     */
    create<T extends MenuItemCreateArgs>(args: SelectSubset<T, MenuItemCreateArgs<ExtArgs>>): Prisma__MenuItemClient<$Result.GetResult<Prisma.$MenuItemPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many MenuItems.
     * @param {MenuItemCreateManyArgs} args - Arguments to create many MenuItems.
     * @example
     * // Create many MenuItems
     * const menuItem = await prisma.menuItem.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MenuItemCreateManyArgs>(args?: SelectSubset<T, MenuItemCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many MenuItems and returns the data saved in the database.
     * @param {MenuItemCreateManyAndReturnArgs} args - Arguments to create many MenuItems.
     * @example
     * // Create many MenuItems
     * const menuItem = await prisma.menuItem.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many MenuItems and only return the `id`
     * const menuItemWithIdOnly = await prisma.menuItem.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MenuItemCreateManyAndReturnArgs>(args?: SelectSubset<T, MenuItemCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MenuItemPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a MenuItem.
     * @param {MenuItemDeleteArgs} args - Arguments to delete one MenuItem.
     * @example
     * // Delete one MenuItem
     * const MenuItem = await prisma.menuItem.delete({
     *   where: {
     *     // ... filter to delete one MenuItem
     *   }
     * })
     * 
     */
    delete<T extends MenuItemDeleteArgs>(args: SelectSubset<T, MenuItemDeleteArgs<ExtArgs>>): Prisma__MenuItemClient<$Result.GetResult<Prisma.$MenuItemPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one MenuItem.
     * @param {MenuItemUpdateArgs} args - Arguments to update one MenuItem.
     * @example
     * // Update one MenuItem
     * const menuItem = await prisma.menuItem.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MenuItemUpdateArgs>(args: SelectSubset<T, MenuItemUpdateArgs<ExtArgs>>): Prisma__MenuItemClient<$Result.GetResult<Prisma.$MenuItemPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more MenuItems.
     * @param {MenuItemDeleteManyArgs} args - Arguments to filter MenuItems to delete.
     * @example
     * // Delete a few MenuItems
     * const { count } = await prisma.menuItem.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MenuItemDeleteManyArgs>(args?: SelectSubset<T, MenuItemDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MenuItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MenuItemUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MenuItems
     * const menuItem = await prisma.menuItem.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MenuItemUpdateManyArgs>(args: SelectSubset<T, MenuItemUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MenuItems and returns the data updated in the database.
     * @param {MenuItemUpdateManyAndReturnArgs} args - Arguments to update many MenuItems.
     * @example
     * // Update many MenuItems
     * const menuItem = await prisma.menuItem.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more MenuItems and only return the `id`
     * const menuItemWithIdOnly = await prisma.menuItem.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MenuItemUpdateManyAndReturnArgs>(args: SelectSubset<T, MenuItemUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MenuItemPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one MenuItem.
     * @param {MenuItemUpsertArgs} args - Arguments to update or create a MenuItem.
     * @example
     * // Update or create a MenuItem
     * const menuItem = await prisma.menuItem.upsert({
     *   create: {
     *     // ... data to create a MenuItem
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MenuItem we want to update
     *   }
     * })
     */
    upsert<T extends MenuItemUpsertArgs>(args: SelectSubset<T, MenuItemUpsertArgs<ExtArgs>>): Prisma__MenuItemClient<$Result.GetResult<Prisma.$MenuItemPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of MenuItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MenuItemCountArgs} args - Arguments to filter MenuItems to count.
     * @example
     * // Count the number of MenuItems
     * const count = await prisma.menuItem.count({
     *   where: {
     *     // ... the filter for the MenuItems we want to count
     *   }
     * })
    **/
    count<T extends MenuItemCountArgs>(
      args?: Subset<T, MenuItemCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MenuItemCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MenuItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MenuItemAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MenuItemAggregateArgs>(args: Subset<T, MenuItemAggregateArgs>): Prisma.PrismaPromise<GetMenuItemAggregateType<T>>

    /**
     * Group by MenuItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MenuItemGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MenuItemGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MenuItemGroupByArgs['orderBy'] }
        : { orderBy?: MenuItemGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MenuItemGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMenuItemGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the MenuItem model
   */
  readonly fields: MenuItemFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for MenuItem.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MenuItemClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    category<T extends MenuCategoryDefaultArgs<ExtArgs> = {}>(args?: Subset<T, MenuCategoryDefaultArgs<ExtArgs>>): Prisma__MenuCategoryClient<$Result.GetResult<Prisma.$MenuCategoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the MenuItem model
   */
  interface MenuItemFieldRefs {
    readonly id: FieldRef<"MenuItem", 'String'>
    readonly categoryId: FieldRef<"MenuItem", 'String'>
    readonly name: FieldRef<"MenuItem", 'String'>
    readonly description: FieldRef<"MenuItem", 'String'>
    readonly price: FieldRef<"MenuItem", 'Decimal'>
    readonly priceVariants: FieldRef<"MenuItem", 'Json'>
    readonly isVeg: FieldRef<"MenuItem", 'Boolean'>
    readonly imageUrl: FieldRef<"MenuItem", 'String'>
    readonly isAvailable: FieldRef<"MenuItem", 'Boolean'>
    readonly displayOrder: FieldRef<"MenuItem", 'Int'>
    readonly createdAt: FieldRef<"MenuItem", 'DateTime'>
    readonly updatedAt: FieldRef<"MenuItem", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * MenuItem findUnique
   */
  export type MenuItemFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MenuItem
     */
    select?: MenuItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MenuItem
     */
    omit?: MenuItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MenuItemInclude<ExtArgs> | null
    /**
     * Filter, which MenuItem to fetch.
     */
    where: MenuItemWhereUniqueInput
  }

  /**
   * MenuItem findUniqueOrThrow
   */
  export type MenuItemFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MenuItem
     */
    select?: MenuItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MenuItem
     */
    omit?: MenuItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MenuItemInclude<ExtArgs> | null
    /**
     * Filter, which MenuItem to fetch.
     */
    where: MenuItemWhereUniqueInput
  }

  /**
   * MenuItem findFirst
   */
  export type MenuItemFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MenuItem
     */
    select?: MenuItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MenuItem
     */
    omit?: MenuItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MenuItemInclude<ExtArgs> | null
    /**
     * Filter, which MenuItem to fetch.
     */
    where?: MenuItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MenuItems to fetch.
     */
    orderBy?: MenuItemOrderByWithRelationInput | MenuItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MenuItems.
     */
    cursor?: MenuItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MenuItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MenuItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MenuItems.
     */
    distinct?: MenuItemScalarFieldEnum | MenuItemScalarFieldEnum[]
  }

  /**
   * MenuItem findFirstOrThrow
   */
  export type MenuItemFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MenuItem
     */
    select?: MenuItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MenuItem
     */
    omit?: MenuItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MenuItemInclude<ExtArgs> | null
    /**
     * Filter, which MenuItem to fetch.
     */
    where?: MenuItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MenuItems to fetch.
     */
    orderBy?: MenuItemOrderByWithRelationInput | MenuItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MenuItems.
     */
    cursor?: MenuItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MenuItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MenuItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MenuItems.
     */
    distinct?: MenuItemScalarFieldEnum | MenuItemScalarFieldEnum[]
  }

  /**
   * MenuItem findMany
   */
  export type MenuItemFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MenuItem
     */
    select?: MenuItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MenuItem
     */
    omit?: MenuItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MenuItemInclude<ExtArgs> | null
    /**
     * Filter, which MenuItems to fetch.
     */
    where?: MenuItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MenuItems to fetch.
     */
    orderBy?: MenuItemOrderByWithRelationInput | MenuItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MenuItems.
     */
    cursor?: MenuItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MenuItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MenuItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MenuItems.
     */
    distinct?: MenuItemScalarFieldEnum | MenuItemScalarFieldEnum[]
  }

  /**
   * MenuItem create
   */
  export type MenuItemCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MenuItem
     */
    select?: MenuItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MenuItem
     */
    omit?: MenuItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MenuItemInclude<ExtArgs> | null
    /**
     * The data needed to create a MenuItem.
     */
    data: XOR<MenuItemCreateInput, MenuItemUncheckedCreateInput>
  }

  /**
   * MenuItem createMany
   */
  export type MenuItemCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many MenuItems.
     */
    data: MenuItemCreateManyInput | MenuItemCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MenuItem createManyAndReturn
   */
  export type MenuItemCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MenuItem
     */
    select?: MenuItemSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MenuItem
     */
    omit?: MenuItemOmit<ExtArgs> | null
    /**
     * The data used to create many MenuItems.
     */
    data: MenuItemCreateManyInput | MenuItemCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MenuItemIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * MenuItem update
   */
  export type MenuItemUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MenuItem
     */
    select?: MenuItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MenuItem
     */
    omit?: MenuItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MenuItemInclude<ExtArgs> | null
    /**
     * The data needed to update a MenuItem.
     */
    data: XOR<MenuItemUpdateInput, MenuItemUncheckedUpdateInput>
    /**
     * Choose, which MenuItem to update.
     */
    where: MenuItemWhereUniqueInput
  }

  /**
   * MenuItem updateMany
   */
  export type MenuItemUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update MenuItems.
     */
    data: XOR<MenuItemUpdateManyMutationInput, MenuItemUncheckedUpdateManyInput>
    /**
     * Filter which MenuItems to update
     */
    where?: MenuItemWhereInput
    /**
     * Limit how many MenuItems to update.
     */
    limit?: number
  }

  /**
   * MenuItem updateManyAndReturn
   */
  export type MenuItemUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MenuItem
     */
    select?: MenuItemSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MenuItem
     */
    omit?: MenuItemOmit<ExtArgs> | null
    /**
     * The data used to update MenuItems.
     */
    data: XOR<MenuItemUpdateManyMutationInput, MenuItemUncheckedUpdateManyInput>
    /**
     * Filter which MenuItems to update
     */
    where?: MenuItemWhereInput
    /**
     * Limit how many MenuItems to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MenuItemIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * MenuItem upsert
   */
  export type MenuItemUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MenuItem
     */
    select?: MenuItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MenuItem
     */
    omit?: MenuItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MenuItemInclude<ExtArgs> | null
    /**
     * The filter to search for the MenuItem to update in case it exists.
     */
    where: MenuItemWhereUniqueInput
    /**
     * In case the MenuItem found by the `where` argument doesn't exist, create a new MenuItem with this data.
     */
    create: XOR<MenuItemCreateInput, MenuItemUncheckedCreateInput>
    /**
     * In case the MenuItem was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MenuItemUpdateInput, MenuItemUncheckedUpdateInput>
  }

  /**
   * MenuItem delete
   */
  export type MenuItemDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MenuItem
     */
    select?: MenuItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MenuItem
     */
    omit?: MenuItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MenuItemInclude<ExtArgs> | null
    /**
     * Filter which MenuItem to delete.
     */
    where: MenuItemWhereUniqueInput
  }

  /**
   * MenuItem deleteMany
   */
  export type MenuItemDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MenuItems to delete
     */
    where?: MenuItemWhereInput
    /**
     * Limit how many MenuItems to delete.
     */
    limit?: number
  }

  /**
   * MenuItem without action
   */
  export type MenuItemDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MenuItem
     */
    select?: MenuItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MenuItem
     */
    omit?: MenuItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MenuItemInclude<ExtArgs> | null
  }


  /**
   * Model AutomationLog
   */

  export type AggregateAutomationLog = {
    _count: AutomationLogCountAggregateOutputType | null
    _min: AutomationLogMinAggregateOutputType | null
    _max: AutomationLogMaxAggregateOutputType | null
  }

  export type AutomationLogMinAggregateOutputType = {
    id: string | null
    customerId: string | null
    automationType: $Enums.AutomationType | null
    messageStage: $Enums.MessageStage | null
    status: $Enums.AutomationStatus | null
    errorMessage: string | null
    sentAt: Date | null
  }

  export type AutomationLogMaxAggregateOutputType = {
    id: string | null
    customerId: string | null
    automationType: $Enums.AutomationType | null
    messageStage: $Enums.MessageStage | null
    status: $Enums.AutomationStatus | null
    errorMessage: string | null
    sentAt: Date | null
  }

  export type AutomationLogCountAggregateOutputType = {
    id: number
    customerId: number
    automationType: number
    messageStage: number
    status: number
    errorMessage: number
    sentAt: number
    _all: number
  }


  export type AutomationLogMinAggregateInputType = {
    id?: true
    customerId?: true
    automationType?: true
    messageStage?: true
    status?: true
    errorMessage?: true
    sentAt?: true
  }

  export type AutomationLogMaxAggregateInputType = {
    id?: true
    customerId?: true
    automationType?: true
    messageStage?: true
    status?: true
    errorMessage?: true
    sentAt?: true
  }

  export type AutomationLogCountAggregateInputType = {
    id?: true
    customerId?: true
    automationType?: true
    messageStage?: true
    status?: true
    errorMessage?: true
    sentAt?: true
    _all?: true
  }

  export type AutomationLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AutomationLog to aggregate.
     */
    where?: AutomationLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AutomationLogs to fetch.
     */
    orderBy?: AutomationLogOrderByWithRelationInput | AutomationLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AutomationLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AutomationLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AutomationLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AutomationLogs
    **/
    _count?: true | AutomationLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AutomationLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AutomationLogMaxAggregateInputType
  }

  export type GetAutomationLogAggregateType<T extends AutomationLogAggregateArgs> = {
        [P in keyof T & keyof AggregateAutomationLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAutomationLog[P]>
      : GetScalarType<T[P], AggregateAutomationLog[P]>
  }




  export type AutomationLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AutomationLogWhereInput
    orderBy?: AutomationLogOrderByWithAggregationInput | AutomationLogOrderByWithAggregationInput[]
    by: AutomationLogScalarFieldEnum[] | AutomationLogScalarFieldEnum
    having?: AutomationLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AutomationLogCountAggregateInputType | true
    _min?: AutomationLogMinAggregateInputType
    _max?: AutomationLogMaxAggregateInputType
  }

  export type AutomationLogGroupByOutputType = {
    id: string
    customerId: string | null
    automationType: $Enums.AutomationType
    messageStage: $Enums.MessageStage
    status: $Enums.AutomationStatus
    errorMessage: string | null
    sentAt: Date
    _count: AutomationLogCountAggregateOutputType | null
    _min: AutomationLogMinAggregateOutputType | null
    _max: AutomationLogMaxAggregateOutputType | null
  }

  type GetAutomationLogGroupByPayload<T extends AutomationLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AutomationLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AutomationLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AutomationLogGroupByOutputType[P]>
            : GetScalarType<T[P], AutomationLogGroupByOutputType[P]>
        }
      >
    >


  export type AutomationLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    customerId?: boolean
    automationType?: boolean
    messageStage?: boolean
    status?: boolean
    errorMessage?: boolean
    sentAt?: boolean
    customer?: boolean | AutomationLog$customerArgs<ExtArgs>
  }, ExtArgs["result"]["automationLog"]>

  export type AutomationLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    customerId?: boolean
    automationType?: boolean
    messageStage?: boolean
    status?: boolean
    errorMessage?: boolean
    sentAt?: boolean
    customer?: boolean | AutomationLog$customerArgs<ExtArgs>
  }, ExtArgs["result"]["automationLog"]>

  export type AutomationLogSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    customerId?: boolean
    automationType?: boolean
    messageStage?: boolean
    status?: boolean
    errorMessage?: boolean
    sentAt?: boolean
    customer?: boolean | AutomationLog$customerArgs<ExtArgs>
  }, ExtArgs["result"]["automationLog"]>

  export type AutomationLogSelectScalar = {
    id?: boolean
    customerId?: boolean
    automationType?: boolean
    messageStage?: boolean
    status?: boolean
    errorMessage?: boolean
    sentAt?: boolean
  }

  export type AutomationLogOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "customerId" | "automationType" | "messageStage" | "status" | "errorMessage" | "sentAt", ExtArgs["result"]["automationLog"]>
  export type AutomationLogInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    customer?: boolean | AutomationLog$customerArgs<ExtArgs>
  }
  export type AutomationLogIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    customer?: boolean | AutomationLog$customerArgs<ExtArgs>
  }
  export type AutomationLogIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    customer?: boolean | AutomationLog$customerArgs<ExtArgs>
  }

  export type $AutomationLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AutomationLog"
    objects: {
      customer: Prisma.$CustomerPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      customerId: string | null
      automationType: $Enums.AutomationType
      messageStage: $Enums.MessageStage
      status: $Enums.AutomationStatus
      errorMessage: string | null
      sentAt: Date
    }, ExtArgs["result"]["automationLog"]>
    composites: {}
  }

  type AutomationLogGetPayload<S extends boolean | null | undefined | AutomationLogDefaultArgs> = $Result.GetResult<Prisma.$AutomationLogPayload, S>

  type AutomationLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AutomationLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AutomationLogCountAggregateInputType | true
    }

  export interface AutomationLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AutomationLog'], meta: { name: 'AutomationLog' } }
    /**
     * Find zero or one AutomationLog that matches the filter.
     * @param {AutomationLogFindUniqueArgs} args - Arguments to find a AutomationLog
     * @example
     * // Get one AutomationLog
     * const automationLog = await prisma.automationLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AutomationLogFindUniqueArgs>(args: SelectSubset<T, AutomationLogFindUniqueArgs<ExtArgs>>): Prisma__AutomationLogClient<$Result.GetResult<Prisma.$AutomationLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AutomationLog that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AutomationLogFindUniqueOrThrowArgs} args - Arguments to find a AutomationLog
     * @example
     * // Get one AutomationLog
     * const automationLog = await prisma.automationLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AutomationLogFindUniqueOrThrowArgs>(args: SelectSubset<T, AutomationLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AutomationLogClient<$Result.GetResult<Prisma.$AutomationLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AutomationLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AutomationLogFindFirstArgs} args - Arguments to find a AutomationLog
     * @example
     * // Get one AutomationLog
     * const automationLog = await prisma.automationLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AutomationLogFindFirstArgs>(args?: SelectSubset<T, AutomationLogFindFirstArgs<ExtArgs>>): Prisma__AutomationLogClient<$Result.GetResult<Prisma.$AutomationLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AutomationLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AutomationLogFindFirstOrThrowArgs} args - Arguments to find a AutomationLog
     * @example
     * // Get one AutomationLog
     * const automationLog = await prisma.automationLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AutomationLogFindFirstOrThrowArgs>(args?: SelectSubset<T, AutomationLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__AutomationLogClient<$Result.GetResult<Prisma.$AutomationLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AutomationLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AutomationLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AutomationLogs
     * const automationLogs = await prisma.automationLog.findMany()
     * 
     * // Get first 10 AutomationLogs
     * const automationLogs = await prisma.automationLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const automationLogWithIdOnly = await prisma.automationLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AutomationLogFindManyArgs>(args?: SelectSubset<T, AutomationLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AutomationLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AutomationLog.
     * @param {AutomationLogCreateArgs} args - Arguments to create a AutomationLog.
     * @example
     * // Create one AutomationLog
     * const AutomationLog = await prisma.automationLog.create({
     *   data: {
     *     // ... data to create a AutomationLog
     *   }
     * })
     * 
     */
    create<T extends AutomationLogCreateArgs>(args: SelectSubset<T, AutomationLogCreateArgs<ExtArgs>>): Prisma__AutomationLogClient<$Result.GetResult<Prisma.$AutomationLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AutomationLogs.
     * @param {AutomationLogCreateManyArgs} args - Arguments to create many AutomationLogs.
     * @example
     * // Create many AutomationLogs
     * const automationLog = await prisma.automationLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AutomationLogCreateManyArgs>(args?: SelectSubset<T, AutomationLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AutomationLogs and returns the data saved in the database.
     * @param {AutomationLogCreateManyAndReturnArgs} args - Arguments to create many AutomationLogs.
     * @example
     * // Create many AutomationLogs
     * const automationLog = await prisma.automationLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AutomationLogs and only return the `id`
     * const automationLogWithIdOnly = await prisma.automationLog.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AutomationLogCreateManyAndReturnArgs>(args?: SelectSubset<T, AutomationLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AutomationLogPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AutomationLog.
     * @param {AutomationLogDeleteArgs} args - Arguments to delete one AutomationLog.
     * @example
     * // Delete one AutomationLog
     * const AutomationLog = await prisma.automationLog.delete({
     *   where: {
     *     // ... filter to delete one AutomationLog
     *   }
     * })
     * 
     */
    delete<T extends AutomationLogDeleteArgs>(args: SelectSubset<T, AutomationLogDeleteArgs<ExtArgs>>): Prisma__AutomationLogClient<$Result.GetResult<Prisma.$AutomationLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AutomationLog.
     * @param {AutomationLogUpdateArgs} args - Arguments to update one AutomationLog.
     * @example
     * // Update one AutomationLog
     * const automationLog = await prisma.automationLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AutomationLogUpdateArgs>(args: SelectSubset<T, AutomationLogUpdateArgs<ExtArgs>>): Prisma__AutomationLogClient<$Result.GetResult<Prisma.$AutomationLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AutomationLogs.
     * @param {AutomationLogDeleteManyArgs} args - Arguments to filter AutomationLogs to delete.
     * @example
     * // Delete a few AutomationLogs
     * const { count } = await prisma.automationLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AutomationLogDeleteManyArgs>(args?: SelectSubset<T, AutomationLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AutomationLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AutomationLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AutomationLogs
     * const automationLog = await prisma.automationLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AutomationLogUpdateManyArgs>(args: SelectSubset<T, AutomationLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AutomationLogs and returns the data updated in the database.
     * @param {AutomationLogUpdateManyAndReturnArgs} args - Arguments to update many AutomationLogs.
     * @example
     * // Update many AutomationLogs
     * const automationLog = await prisma.automationLog.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AutomationLogs and only return the `id`
     * const automationLogWithIdOnly = await prisma.automationLog.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AutomationLogUpdateManyAndReturnArgs>(args: SelectSubset<T, AutomationLogUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AutomationLogPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AutomationLog.
     * @param {AutomationLogUpsertArgs} args - Arguments to update or create a AutomationLog.
     * @example
     * // Update or create a AutomationLog
     * const automationLog = await prisma.automationLog.upsert({
     *   create: {
     *     // ... data to create a AutomationLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AutomationLog we want to update
     *   }
     * })
     */
    upsert<T extends AutomationLogUpsertArgs>(args: SelectSubset<T, AutomationLogUpsertArgs<ExtArgs>>): Prisma__AutomationLogClient<$Result.GetResult<Prisma.$AutomationLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AutomationLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AutomationLogCountArgs} args - Arguments to filter AutomationLogs to count.
     * @example
     * // Count the number of AutomationLogs
     * const count = await prisma.automationLog.count({
     *   where: {
     *     // ... the filter for the AutomationLogs we want to count
     *   }
     * })
    **/
    count<T extends AutomationLogCountArgs>(
      args?: Subset<T, AutomationLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AutomationLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AutomationLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AutomationLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AutomationLogAggregateArgs>(args: Subset<T, AutomationLogAggregateArgs>): Prisma.PrismaPromise<GetAutomationLogAggregateType<T>>

    /**
     * Group by AutomationLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AutomationLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AutomationLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AutomationLogGroupByArgs['orderBy'] }
        : { orderBy?: AutomationLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AutomationLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAutomationLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AutomationLog model
   */
  readonly fields: AutomationLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AutomationLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AutomationLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    customer<T extends AutomationLog$customerArgs<ExtArgs> = {}>(args?: Subset<T, AutomationLog$customerArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AutomationLog model
   */
  interface AutomationLogFieldRefs {
    readonly id: FieldRef<"AutomationLog", 'String'>
    readonly customerId: FieldRef<"AutomationLog", 'String'>
    readonly automationType: FieldRef<"AutomationLog", 'AutomationType'>
    readonly messageStage: FieldRef<"AutomationLog", 'MessageStage'>
    readonly status: FieldRef<"AutomationLog", 'AutomationStatus'>
    readonly errorMessage: FieldRef<"AutomationLog", 'String'>
    readonly sentAt: FieldRef<"AutomationLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AutomationLog findUnique
   */
  export type AutomationLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AutomationLog
     */
    select?: AutomationLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AutomationLog
     */
    omit?: AutomationLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AutomationLogInclude<ExtArgs> | null
    /**
     * Filter, which AutomationLog to fetch.
     */
    where: AutomationLogWhereUniqueInput
  }

  /**
   * AutomationLog findUniqueOrThrow
   */
  export type AutomationLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AutomationLog
     */
    select?: AutomationLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AutomationLog
     */
    omit?: AutomationLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AutomationLogInclude<ExtArgs> | null
    /**
     * Filter, which AutomationLog to fetch.
     */
    where: AutomationLogWhereUniqueInput
  }

  /**
   * AutomationLog findFirst
   */
  export type AutomationLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AutomationLog
     */
    select?: AutomationLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AutomationLog
     */
    omit?: AutomationLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AutomationLogInclude<ExtArgs> | null
    /**
     * Filter, which AutomationLog to fetch.
     */
    where?: AutomationLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AutomationLogs to fetch.
     */
    orderBy?: AutomationLogOrderByWithRelationInput | AutomationLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AutomationLogs.
     */
    cursor?: AutomationLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AutomationLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AutomationLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AutomationLogs.
     */
    distinct?: AutomationLogScalarFieldEnum | AutomationLogScalarFieldEnum[]
  }

  /**
   * AutomationLog findFirstOrThrow
   */
  export type AutomationLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AutomationLog
     */
    select?: AutomationLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AutomationLog
     */
    omit?: AutomationLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AutomationLogInclude<ExtArgs> | null
    /**
     * Filter, which AutomationLog to fetch.
     */
    where?: AutomationLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AutomationLogs to fetch.
     */
    orderBy?: AutomationLogOrderByWithRelationInput | AutomationLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AutomationLogs.
     */
    cursor?: AutomationLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AutomationLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AutomationLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AutomationLogs.
     */
    distinct?: AutomationLogScalarFieldEnum | AutomationLogScalarFieldEnum[]
  }

  /**
   * AutomationLog findMany
   */
  export type AutomationLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AutomationLog
     */
    select?: AutomationLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AutomationLog
     */
    omit?: AutomationLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AutomationLogInclude<ExtArgs> | null
    /**
     * Filter, which AutomationLogs to fetch.
     */
    where?: AutomationLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AutomationLogs to fetch.
     */
    orderBy?: AutomationLogOrderByWithRelationInput | AutomationLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AutomationLogs.
     */
    cursor?: AutomationLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AutomationLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AutomationLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AutomationLogs.
     */
    distinct?: AutomationLogScalarFieldEnum | AutomationLogScalarFieldEnum[]
  }

  /**
   * AutomationLog create
   */
  export type AutomationLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AutomationLog
     */
    select?: AutomationLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AutomationLog
     */
    omit?: AutomationLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AutomationLogInclude<ExtArgs> | null
    /**
     * The data needed to create a AutomationLog.
     */
    data: XOR<AutomationLogCreateInput, AutomationLogUncheckedCreateInput>
  }

  /**
   * AutomationLog createMany
   */
  export type AutomationLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AutomationLogs.
     */
    data: AutomationLogCreateManyInput | AutomationLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AutomationLog createManyAndReturn
   */
  export type AutomationLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AutomationLog
     */
    select?: AutomationLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AutomationLog
     */
    omit?: AutomationLogOmit<ExtArgs> | null
    /**
     * The data used to create many AutomationLogs.
     */
    data: AutomationLogCreateManyInput | AutomationLogCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AutomationLogIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * AutomationLog update
   */
  export type AutomationLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AutomationLog
     */
    select?: AutomationLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AutomationLog
     */
    omit?: AutomationLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AutomationLogInclude<ExtArgs> | null
    /**
     * The data needed to update a AutomationLog.
     */
    data: XOR<AutomationLogUpdateInput, AutomationLogUncheckedUpdateInput>
    /**
     * Choose, which AutomationLog to update.
     */
    where: AutomationLogWhereUniqueInput
  }

  /**
   * AutomationLog updateMany
   */
  export type AutomationLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AutomationLogs.
     */
    data: XOR<AutomationLogUpdateManyMutationInput, AutomationLogUncheckedUpdateManyInput>
    /**
     * Filter which AutomationLogs to update
     */
    where?: AutomationLogWhereInput
    /**
     * Limit how many AutomationLogs to update.
     */
    limit?: number
  }

  /**
   * AutomationLog updateManyAndReturn
   */
  export type AutomationLogUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AutomationLog
     */
    select?: AutomationLogSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AutomationLog
     */
    omit?: AutomationLogOmit<ExtArgs> | null
    /**
     * The data used to update AutomationLogs.
     */
    data: XOR<AutomationLogUpdateManyMutationInput, AutomationLogUncheckedUpdateManyInput>
    /**
     * Filter which AutomationLogs to update
     */
    where?: AutomationLogWhereInput
    /**
     * Limit how many AutomationLogs to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AutomationLogIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * AutomationLog upsert
   */
  export type AutomationLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AutomationLog
     */
    select?: AutomationLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AutomationLog
     */
    omit?: AutomationLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AutomationLogInclude<ExtArgs> | null
    /**
     * The filter to search for the AutomationLog to update in case it exists.
     */
    where: AutomationLogWhereUniqueInput
    /**
     * In case the AutomationLog found by the `where` argument doesn't exist, create a new AutomationLog with this data.
     */
    create: XOR<AutomationLogCreateInput, AutomationLogUncheckedCreateInput>
    /**
     * In case the AutomationLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AutomationLogUpdateInput, AutomationLogUncheckedUpdateInput>
  }

  /**
   * AutomationLog delete
   */
  export type AutomationLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AutomationLog
     */
    select?: AutomationLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AutomationLog
     */
    omit?: AutomationLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AutomationLogInclude<ExtArgs> | null
    /**
     * Filter which AutomationLog to delete.
     */
    where: AutomationLogWhereUniqueInput
  }

  /**
   * AutomationLog deleteMany
   */
  export type AutomationLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AutomationLogs to delete
     */
    where?: AutomationLogWhereInput
    /**
     * Limit how many AutomationLogs to delete.
     */
    limit?: number
  }

  /**
   * AutomationLog.customer
   */
  export type AutomationLog$customerArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    where?: CustomerWhereInput
  }

  /**
   * AutomationLog without action
   */
  export type AutomationLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AutomationLog
     */
    select?: AutomationLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AutomationLog
     */
    omit?: AutomationLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AutomationLogInclude<ExtArgs> | null
  }


  /**
   * Model Staff
   */

  export type AggregateStaff = {
    _count: StaffCountAggregateOutputType | null
    _min: StaffMinAggregateOutputType | null
    _max: StaffMaxAggregateOutputType | null
  }

  export type StaffMinAggregateOutputType = {
    id: string | null
    username: string | null
    fullName: string | null
    email: string | null
    phone: string | null
    role: $Enums.StaffRole | null
    isAdmin: boolean | null
    assignedOutletId: string | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type StaffMaxAggregateOutputType = {
    id: string | null
    username: string | null
    fullName: string | null
    email: string | null
    phone: string | null
    role: $Enums.StaffRole | null
    isAdmin: boolean | null
    assignedOutletId: string | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type StaffCountAggregateOutputType = {
    id: number
    username: number
    fullName: number
    email: number
    phone: number
    role: number
    isAdmin: number
    assignedOutletId: number
    isActive: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type StaffMinAggregateInputType = {
    id?: true
    username?: true
    fullName?: true
    email?: true
    phone?: true
    role?: true
    isAdmin?: true
    assignedOutletId?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type StaffMaxAggregateInputType = {
    id?: true
    username?: true
    fullName?: true
    email?: true
    phone?: true
    role?: true
    isAdmin?: true
    assignedOutletId?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type StaffCountAggregateInputType = {
    id?: true
    username?: true
    fullName?: true
    email?: true
    phone?: true
    role?: true
    isAdmin?: true
    assignedOutletId?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type StaffAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Staff to aggregate.
     */
    where?: StaffWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Staff to fetch.
     */
    orderBy?: StaffOrderByWithRelationInput | StaffOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: StaffWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Staff from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Staff.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Staff
    **/
    _count?: true | StaffCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: StaffMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: StaffMaxAggregateInputType
  }

  export type GetStaffAggregateType<T extends StaffAggregateArgs> = {
        [P in keyof T & keyof AggregateStaff]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateStaff[P]>
      : GetScalarType<T[P], AggregateStaff[P]>
  }




  export type StaffGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StaffWhereInput
    orderBy?: StaffOrderByWithAggregationInput | StaffOrderByWithAggregationInput[]
    by: StaffScalarFieldEnum[] | StaffScalarFieldEnum
    having?: StaffScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: StaffCountAggregateInputType | true
    _min?: StaffMinAggregateInputType
    _max?: StaffMaxAggregateInputType
  }

  export type StaffGroupByOutputType = {
    id: string
    username: string | null
    fullName: string
    email: string
    phone: string | null
    role: $Enums.StaffRole
    isAdmin: boolean
    assignedOutletId: string | null
    isActive: boolean
    createdAt: Date
    updatedAt: Date
    _count: StaffCountAggregateOutputType | null
    _min: StaffMinAggregateOutputType | null
    _max: StaffMaxAggregateOutputType | null
  }

  type GetStaffGroupByPayload<T extends StaffGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<StaffGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof StaffGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], StaffGroupByOutputType[P]>
            : GetScalarType<T[P], StaffGroupByOutputType[P]>
        }
      >
    >


  export type StaffSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    fullName?: boolean
    email?: boolean
    phone?: boolean
    role?: boolean
    isAdmin?: boolean
    assignedOutletId?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    assignedOutlet?: boolean | Staff$assignedOutletArgs<ExtArgs>
  }, ExtArgs["result"]["staff"]>

  export type StaffSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    fullName?: boolean
    email?: boolean
    phone?: boolean
    role?: boolean
    isAdmin?: boolean
    assignedOutletId?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    assignedOutlet?: boolean | Staff$assignedOutletArgs<ExtArgs>
  }, ExtArgs["result"]["staff"]>

  export type StaffSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    fullName?: boolean
    email?: boolean
    phone?: boolean
    role?: boolean
    isAdmin?: boolean
    assignedOutletId?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    assignedOutlet?: boolean | Staff$assignedOutletArgs<ExtArgs>
  }, ExtArgs["result"]["staff"]>

  export type StaffSelectScalar = {
    id?: boolean
    username?: boolean
    fullName?: boolean
    email?: boolean
    phone?: boolean
    role?: boolean
    isAdmin?: boolean
    assignedOutletId?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type StaffOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "username" | "fullName" | "email" | "phone" | "role" | "isAdmin" | "assignedOutletId" | "isActive" | "createdAt" | "updatedAt", ExtArgs["result"]["staff"]>
  export type StaffInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    assignedOutlet?: boolean | Staff$assignedOutletArgs<ExtArgs>
  }
  export type StaffIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    assignedOutlet?: boolean | Staff$assignedOutletArgs<ExtArgs>
  }
  export type StaffIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    assignedOutlet?: boolean | Staff$assignedOutletArgs<ExtArgs>
  }

  export type $StaffPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Staff"
    objects: {
      assignedOutlet: Prisma.$OutletPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      username: string | null
      fullName: string
      email: string
      phone: string | null
      role: $Enums.StaffRole
      isAdmin: boolean
      assignedOutletId: string | null
      isActive: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["staff"]>
    composites: {}
  }

  type StaffGetPayload<S extends boolean | null | undefined | StaffDefaultArgs> = $Result.GetResult<Prisma.$StaffPayload, S>

  type StaffCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<StaffFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: StaffCountAggregateInputType | true
    }

  export interface StaffDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Staff'], meta: { name: 'Staff' } }
    /**
     * Find zero or one Staff that matches the filter.
     * @param {StaffFindUniqueArgs} args - Arguments to find a Staff
     * @example
     * // Get one Staff
     * const staff = await prisma.staff.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends StaffFindUniqueArgs>(args: SelectSubset<T, StaffFindUniqueArgs<ExtArgs>>): Prisma__StaffClient<$Result.GetResult<Prisma.$StaffPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Staff that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {StaffFindUniqueOrThrowArgs} args - Arguments to find a Staff
     * @example
     * // Get one Staff
     * const staff = await prisma.staff.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends StaffFindUniqueOrThrowArgs>(args: SelectSubset<T, StaffFindUniqueOrThrowArgs<ExtArgs>>): Prisma__StaffClient<$Result.GetResult<Prisma.$StaffPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Staff that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StaffFindFirstArgs} args - Arguments to find a Staff
     * @example
     * // Get one Staff
     * const staff = await prisma.staff.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends StaffFindFirstArgs>(args?: SelectSubset<T, StaffFindFirstArgs<ExtArgs>>): Prisma__StaffClient<$Result.GetResult<Prisma.$StaffPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Staff that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StaffFindFirstOrThrowArgs} args - Arguments to find a Staff
     * @example
     * // Get one Staff
     * const staff = await prisma.staff.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends StaffFindFirstOrThrowArgs>(args?: SelectSubset<T, StaffFindFirstOrThrowArgs<ExtArgs>>): Prisma__StaffClient<$Result.GetResult<Prisma.$StaffPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Staff that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StaffFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Staff
     * const staff = await prisma.staff.findMany()
     * 
     * // Get first 10 Staff
     * const staff = await prisma.staff.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const staffWithIdOnly = await prisma.staff.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends StaffFindManyArgs>(args?: SelectSubset<T, StaffFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StaffPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Staff.
     * @param {StaffCreateArgs} args - Arguments to create a Staff.
     * @example
     * // Create one Staff
     * const Staff = await prisma.staff.create({
     *   data: {
     *     // ... data to create a Staff
     *   }
     * })
     * 
     */
    create<T extends StaffCreateArgs>(args: SelectSubset<T, StaffCreateArgs<ExtArgs>>): Prisma__StaffClient<$Result.GetResult<Prisma.$StaffPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Staff.
     * @param {StaffCreateManyArgs} args - Arguments to create many Staff.
     * @example
     * // Create many Staff
     * const staff = await prisma.staff.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends StaffCreateManyArgs>(args?: SelectSubset<T, StaffCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Staff and returns the data saved in the database.
     * @param {StaffCreateManyAndReturnArgs} args - Arguments to create many Staff.
     * @example
     * // Create many Staff
     * const staff = await prisma.staff.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Staff and only return the `id`
     * const staffWithIdOnly = await prisma.staff.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends StaffCreateManyAndReturnArgs>(args?: SelectSubset<T, StaffCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StaffPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Staff.
     * @param {StaffDeleteArgs} args - Arguments to delete one Staff.
     * @example
     * // Delete one Staff
     * const Staff = await prisma.staff.delete({
     *   where: {
     *     // ... filter to delete one Staff
     *   }
     * })
     * 
     */
    delete<T extends StaffDeleteArgs>(args: SelectSubset<T, StaffDeleteArgs<ExtArgs>>): Prisma__StaffClient<$Result.GetResult<Prisma.$StaffPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Staff.
     * @param {StaffUpdateArgs} args - Arguments to update one Staff.
     * @example
     * // Update one Staff
     * const staff = await prisma.staff.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends StaffUpdateArgs>(args: SelectSubset<T, StaffUpdateArgs<ExtArgs>>): Prisma__StaffClient<$Result.GetResult<Prisma.$StaffPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Staff.
     * @param {StaffDeleteManyArgs} args - Arguments to filter Staff to delete.
     * @example
     * // Delete a few Staff
     * const { count } = await prisma.staff.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends StaffDeleteManyArgs>(args?: SelectSubset<T, StaffDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Staff.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StaffUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Staff
     * const staff = await prisma.staff.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends StaffUpdateManyArgs>(args: SelectSubset<T, StaffUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Staff and returns the data updated in the database.
     * @param {StaffUpdateManyAndReturnArgs} args - Arguments to update many Staff.
     * @example
     * // Update many Staff
     * const staff = await prisma.staff.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Staff and only return the `id`
     * const staffWithIdOnly = await prisma.staff.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends StaffUpdateManyAndReturnArgs>(args: SelectSubset<T, StaffUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StaffPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Staff.
     * @param {StaffUpsertArgs} args - Arguments to update or create a Staff.
     * @example
     * // Update or create a Staff
     * const staff = await prisma.staff.upsert({
     *   create: {
     *     // ... data to create a Staff
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Staff we want to update
     *   }
     * })
     */
    upsert<T extends StaffUpsertArgs>(args: SelectSubset<T, StaffUpsertArgs<ExtArgs>>): Prisma__StaffClient<$Result.GetResult<Prisma.$StaffPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Staff.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StaffCountArgs} args - Arguments to filter Staff to count.
     * @example
     * // Count the number of Staff
     * const count = await prisma.staff.count({
     *   where: {
     *     // ... the filter for the Staff we want to count
     *   }
     * })
    **/
    count<T extends StaffCountArgs>(
      args?: Subset<T, StaffCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], StaffCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Staff.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StaffAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends StaffAggregateArgs>(args: Subset<T, StaffAggregateArgs>): Prisma.PrismaPromise<GetStaffAggregateType<T>>

    /**
     * Group by Staff.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StaffGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends StaffGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: StaffGroupByArgs['orderBy'] }
        : { orderBy?: StaffGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, StaffGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStaffGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Staff model
   */
  readonly fields: StaffFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Staff.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__StaffClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    assignedOutlet<T extends Staff$assignedOutletArgs<ExtArgs> = {}>(args?: Subset<T, Staff$assignedOutletArgs<ExtArgs>>): Prisma__OutletClient<$Result.GetResult<Prisma.$OutletPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Staff model
   */
  interface StaffFieldRefs {
    readonly id: FieldRef<"Staff", 'String'>
    readonly username: FieldRef<"Staff", 'String'>
    readonly fullName: FieldRef<"Staff", 'String'>
    readonly email: FieldRef<"Staff", 'String'>
    readonly phone: FieldRef<"Staff", 'String'>
    readonly role: FieldRef<"Staff", 'StaffRole'>
    readonly isAdmin: FieldRef<"Staff", 'Boolean'>
    readonly assignedOutletId: FieldRef<"Staff", 'String'>
    readonly isActive: FieldRef<"Staff", 'Boolean'>
    readonly createdAt: FieldRef<"Staff", 'DateTime'>
    readonly updatedAt: FieldRef<"Staff", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Staff findUnique
   */
  export type StaffFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Staff
     */
    select?: StaffSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Staff
     */
    omit?: StaffOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StaffInclude<ExtArgs> | null
    /**
     * Filter, which Staff to fetch.
     */
    where: StaffWhereUniqueInput
  }

  /**
   * Staff findUniqueOrThrow
   */
  export type StaffFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Staff
     */
    select?: StaffSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Staff
     */
    omit?: StaffOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StaffInclude<ExtArgs> | null
    /**
     * Filter, which Staff to fetch.
     */
    where: StaffWhereUniqueInput
  }

  /**
   * Staff findFirst
   */
  export type StaffFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Staff
     */
    select?: StaffSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Staff
     */
    omit?: StaffOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StaffInclude<ExtArgs> | null
    /**
     * Filter, which Staff to fetch.
     */
    where?: StaffWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Staff to fetch.
     */
    orderBy?: StaffOrderByWithRelationInput | StaffOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Staff.
     */
    cursor?: StaffWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Staff from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Staff.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Staff.
     */
    distinct?: StaffScalarFieldEnum | StaffScalarFieldEnum[]
  }

  /**
   * Staff findFirstOrThrow
   */
  export type StaffFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Staff
     */
    select?: StaffSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Staff
     */
    omit?: StaffOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StaffInclude<ExtArgs> | null
    /**
     * Filter, which Staff to fetch.
     */
    where?: StaffWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Staff to fetch.
     */
    orderBy?: StaffOrderByWithRelationInput | StaffOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Staff.
     */
    cursor?: StaffWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Staff from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Staff.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Staff.
     */
    distinct?: StaffScalarFieldEnum | StaffScalarFieldEnum[]
  }

  /**
   * Staff findMany
   */
  export type StaffFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Staff
     */
    select?: StaffSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Staff
     */
    omit?: StaffOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StaffInclude<ExtArgs> | null
    /**
     * Filter, which Staff to fetch.
     */
    where?: StaffWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Staff to fetch.
     */
    orderBy?: StaffOrderByWithRelationInput | StaffOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Staff.
     */
    cursor?: StaffWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Staff from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Staff.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Staff.
     */
    distinct?: StaffScalarFieldEnum | StaffScalarFieldEnum[]
  }

  /**
   * Staff create
   */
  export type StaffCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Staff
     */
    select?: StaffSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Staff
     */
    omit?: StaffOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StaffInclude<ExtArgs> | null
    /**
     * The data needed to create a Staff.
     */
    data: XOR<StaffCreateInput, StaffUncheckedCreateInput>
  }

  /**
   * Staff createMany
   */
  export type StaffCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Staff.
     */
    data: StaffCreateManyInput | StaffCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Staff createManyAndReturn
   */
  export type StaffCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Staff
     */
    select?: StaffSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Staff
     */
    omit?: StaffOmit<ExtArgs> | null
    /**
     * The data used to create many Staff.
     */
    data: StaffCreateManyInput | StaffCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StaffIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Staff update
   */
  export type StaffUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Staff
     */
    select?: StaffSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Staff
     */
    omit?: StaffOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StaffInclude<ExtArgs> | null
    /**
     * The data needed to update a Staff.
     */
    data: XOR<StaffUpdateInput, StaffUncheckedUpdateInput>
    /**
     * Choose, which Staff to update.
     */
    where: StaffWhereUniqueInput
  }

  /**
   * Staff updateMany
   */
  export type StaffUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Staff.
     */
    data: XOR<StaffUpdateManyMutationInput, StaffUncheckedUpdateManyInput>
    /**
     * Filter which Staff to update
     */
    where?: StaffWhereInput
    /**
     * Limit how many Staff to update.
     */
    limit?: number
  }

  /**
   * Staff updateManyAndReturn
   */
  export type StaffUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Staff
     */
    select?: StaffSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Staff
     */
    omit?: StaffOmit<ExtArgs> | null
    /**
     * The data used to update Staff.
     */
    data: XOR<StaffUpdateManyMutationInput, StaffUncheckedUpdateManyInput>
    /**
     * Filter which Staff to update
     */
    where?: StaffWhereInput
    /**
     * Limit how many Staff to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StaffIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Staff upsert
   */
  export type StaffUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Staff
     */
    select?: StaffSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Staff
     */
    omit?: StaffOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StaffInclude<ExtArgs> | null
    /**
     * The filter to search for the Staff to update in case it exists.
     */
    where: StaffWhereUniqueInput
    /**
     * In case the Staff found by the `where` argument doesn't exist, create a new Staff with this data.
     */
    create: XOR<StaffCreateInput, StaffUncheckedCreateInput>
    /**
     * In case the Staff was found with the provided `where` argument, update it with this data.
     */
    update: XOR<StaffUpdateInput, StaffUncheckedUpdateInput>
  }

  /**
   * Staff delete
   */
  export type StaffDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Staff
     */
    select?: StaffSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Staff
     */
    omit?: StaffOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StaffInclude<ExtArgs> | null
    /**
     * Filter which Staff to delete.
     */
    where: StaffWhereUniqueInput
  }

  /**
   * Staff deleteMany
   */
  export type StaffDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Staff to delete
     */
    where?: StaffWhereInput
    /**
     * Limit how many Staff to delete.
     */
    limit?: number
  }

  /**
   * Staff.assignedOutlet
   */
  export type Staff$assignedOutletArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Outlet
     */
    select?: OutletSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Outlet
     */
    omit?: OutletOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OutletInclude<ExtArgs> | null
    where?: OutletWhereInput
  }

  /**
   * Staff without action
   */
  export type StaffDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Staff
     */
    select?: StaffSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Staff
     */
    omit?: StaffOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StaffInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const OutletScalarFieldEnum: {
    id: 'id',
    code: 'code',
    slug: 'slug',
    name: 'name',
    location: 'location',
    address: 'address',
    googlePlaceId: 'googlePlaceId',
    googleMapsUrl: 'googleMapsUrl',
    instagramUrl: 'instagramUrl',
    facebookUrl: 'facebookUrl',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type OutletScalarFieldEnum = (typeof OutletScalarFieldEnum)[keyof typeof OutletScalarFieldEnum]


  export const CustomerScalarFieldEnum: {
    id: 'id',
    deviceId: 'deviceId',
    fullName: 'fullName',
    phone: 'phone',
    email: 'email',
    birthDate: 'birthDate',
    anniversaryDate: 'anniversaryDate',
    gender: 'gender',
    maritalStatus: 'maritalStatus',
    firstVisitOutletId: 'firstVisitOutletId',
    lastVisitDate: 'lastVisitDate',
    totalVisits: 'totalVisits',
    hasSubmittedFirstReview: 'hasSubmittedFirstReview',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CustomerScalarFieldEnum = (typeof CustomerScalarFieldEnum)[keyof typeof CustomerScalarFieldEnum]


  export const ReviewScalarFieldEnum: {
    id: 'id',
    customerId: 'customerId',
    outletId: 'outletId',
    reviewText: 'reviewText',
    stars: 'stars',
    reviewType: 'reviewType',
    postedToGoogle: 'postedToGoogle',
    isVisible: 'isVisible',
    createdAt: 'createdAt'
  };

  export type ReviewScalarFieldEnum = (typeof ReviewScalarFieldEnum)[keyof typeof ReviewScalarFieldEnum]


  export const CustomerVisitScalarFieldEnum: {
    id: 'id',
    customerId: 'customerId',
    deviceId: 'deviceId',
    outletId: 'outletId',
    visitType: 'visitType',
    visitedAt: 'visitedAt'
  };

  export type CustomerVisitScalarFieldEnum = (typeof CustomerVisitScalarFieldEnum)[keyof typeof CustomerVisitScalarFieldEnum]


  export const MenuCategoryScalarFieldEnum: {
    id: 'id',
    name: 'name',
    displayOrder: 'displayOrder',
    isActive: 'isActive',
    outletId: 'outletId',
    createdAt: 'createdAt'
  };

  export type MenuCategoryScalarFieldEnum = (typeof MenuCategoryScalarFieldEnum)[keyof typeof MenuCategoryScalarFieldEnum]


  export const MenuItemScalarFieldEnum: {
    id: 'id',
    categoryId: 'categoryId',
    name: 'name',
    description: 'description',
    price: 'price',
    priceVariants: 'priceVariants',
    isVeg: 'isVeg',
    imageUrl: 'imageUrl',
    isAvailable: 'isAvailable',
    displayOrder: 'displayOrder',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type MenuItemScalarFieldEnum = (typeof MenuItemScalarFieldEnum)[keyof typeof MenuItemScalarFieldEnum]


  export const AutomationLogScalarFieldEnum: {
    id: 'id',
    customerId: 'customerId',
    automationType: 'automationType',
    messageStage: 'messageStage',
    status: 'status',
    errorMessage: 'errorMessage',
    sentAt: 'sentAt'
  };

  export type AutomationLogScalarFieldEnum = (typeof AutomationLogScalarFieldEnum)[keyof typeof AutomationLogScalarFieldEnum]


  export const StaffScalarFieldEnum: {
    id: 'id',
    username: 'username',
    fullName: 'fullName',
    email: 'email',
    phone: 'phone',
    role: 'role',
    isAdmin: 'isAdmin',
    assignedOutletId: 'assignedOutletId',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type StaffScalarFieldEnum = (typeof StaffScalarFieldEnum)[keyof typeof StaffScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Gender'
   */
  export type EnumGenderFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Gender'>
    


  /**
   * Reference to a field of type 'Gender[]'
   */
  export type ListEnumGenderFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Gender[]'>
    


  /**
   * Reference to a field of type 'MaritalStatus'
   */
  export type EnumMaritalStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'MaritalStatus'>
    


  /**
   * Reference to a field of type 'MaritalStatus[]'
   */
  export type ListEnumMaritalStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'MaritalStatus[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'ReviewType'
   */
  export type EnumReviewTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ReviewType'>
    


  /**
   * Reference to a field of type 'ReviewType[]'
   */
  export type ListEnumReviewTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ReviewType[]'>
    


  /**
   * Reference to a field of type 'VisitType'
   */
  export type EnumVisitTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'VisitType'>
    


  /**
   * Reference to a field of type 'VisitType[]'
   */
  export type ListEnumVisitTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'VisitType[]'>
    


  /**
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>
    


  /**
   * Reference to a field of type 'Decimal[]'
   */
  export type ListDecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'AutomationType'
   */
  export type EnumAutomationTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AutomationType'>
    


  /**
   * Reference to a field of type 'AutomationType[]'
   */
  export type ListEnumAutomationTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AutomationType[]'>
    


  /**
   * Reference to a field of type 'MessageStage'
   */
  export type EnumMessageStageFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'MessageStage'>
    


  /**
   * Reference to a field of type 'MessageStage[]'
   */
  export type ListEnumMessageStageFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'MessageStage[]'>
    


  /**
   * Reference to a field of type 'AutomationStatus'
   */
  export type EnumAutomationStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AutomationStatus'>
    


  /**
   * Reference to a field of type 'AutomationStatus[]'
   */
  export type ListEnumAutomationStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AutomationStatus[]'>
    


  /**
   * Reference to a field of type 'StaffRole'
   */
  export type EnumStaffRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'StaffRole'>
    


  /**
   * Reference to a field of type 'StaffRole[]'
   */
  export type ListEnumStaffRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'StaffRole[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type OutletWhereInput = {
    AND?: OutletWhereInput | OutletWhereInput[]
    OR?: OutletWhereInput[]
    NOT?: OutletWhereInput | OutletWhereInput[]
    id?: UuidFilter<"Outlet"> | string
    code?: StringFilter<"Outlet"> | string
    slug?: StringFilter<"Outlet"> | string
    name?: StringFilter<"Outlet"> | string
    location?: StringNullableFilter<"Outlet"> | string | null
    address?: StringNullableFilter<"Outlet"> | string | null
    googlePlaceId?: StringFilter<"Outlet"> | string
    googleMapsUrl?: StringNullableFilter<"Outlet"> | string | null
    instagramUrl?: StringNullableFilter<"Outlet"> | string | null
    facebookUrl?: StringNullableFilter<"Outlet"> | string | null
    isActive?: BoolFilter<"Outlet"> | boolean
    createdAt?: DateTimeFilter<"Outlet"> | Date | string
    updatedAt?: DateTimeFilter<"Outlet"> | Date | string
    customers?: CustomerListRelationFilter
    reviews?: ReviewListRelationFilter
    visits?: CustomerVisitListRelationFilter
    menuCategories?: MenuCategoryListRelationFilter
    staff?: StaffListRelationFilter
  }

  export type OutletOrderByWithRelationInput = {
    id?: SortOrder
    code?: SortOrder
    slug?: SortOrder
    name?: SortOrder
    location?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    googlePlaceId?: SortOrder
    googleMapsUrl?: SortOrderInput | SortOrder
    instagramUrl?: SortOrderInput | SortOrder
    facebookUrl?: SortOrderInput | SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    customers?: CustomerOrderByRelationAggregateInput
    reviews?: ReviewOrderByRelationAggregateInput
    visits?: CustomerVisitOrderByRelationAggregateInput
    menuCategories?: MenuCategoryOrderByRelationAggregateInput
    staff?: StaffOrderByRelationAggregateInput
  }

  export type OutletWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    code?: string
    slug?: string
    googlePlaceId?: string
    AND?: OutletWhereInput | OutletWhereInput[]
    OR?: OutletWhereInput[]
    NOT?: OutletWhereInput | OutletWhereInput[]
    name?: StringFilter<"Outlet"> | string
    location?: StringNullableFilter<"Outlet"> | string | null
    address?: StringNullableFilter<"Outlet"> | string | null
    googleMapsUrl?: StringNullableFilter<"Outlet"> | string | null
    instagramUrl?: StringNullableFilter<"Outlet"> | string | null
    facebookUrl?: StringNullableFilter<"Outlet"> | string | null
    isActive?: BoolFilter<"Outlet"> | boolean
    createdAt?: DateTimeFilter<"Outlet"> | Date | string
    updatedAt?: DateTimeFilter<"Outlet"> | Date | string
    customers?: CustomerListRelationFilter
    reviews?: ReviewListRelationFilter
    visits?: CustomerVisitListRelationFilter
    menuCategories?: MenuCategoryListRelationFilter
    staff?: StaffListRelationFilter
  }, "id" | "code" | "slug" | "googlePlaceId">

  export type OutletOrderByWithAggregationInput = {
    id?: SortOrder
    code?: SortOrder
    slug?: SortOrder
    name?: SortOrder
    location?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    googlePlaceId?: SortOrder
    googleMapsUrl?: SortOrderInput | SortOrder
    instagramUrl?: SortOrderInput | SortOrder
    facebookUrl?: SortOrderInput | SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: OutletCountOrderByAggregateInput
    _max?: OutletMaxOrderByAggregateInput
    _min?: OutletMinOrderByAggregateInput
  }

  export type OutletScalarWhereWithAggregatesInput = {
    AND?: OutletScalarWhereWithAggregatesInput | OutletScalarWhereWithAggregatesInput[]
    OR?: OutletScalarWhereWithAggregatesInput[]
    NOT?: OutletScalarWhereWithAggregatesInput | OutletScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"Outlet"> | string
    code?: StringWithAggregatesFilter<"Outlet"> | string
    slug?: StringWithAggregatesFilter<"Outlet"> | string
    name?: StringWithAggregatesFilter<"Outlet"> | string
    location?: StringNullableWithAggregatesFilter<"Outlet"> | string | null
    address?: StringNullableWithAggregatesFilter<"Outlet"> | string | null
    googlePlaceId?: StringWithAggregatesFilter<"Outlet"> | string
    googleMapsUrl?: StringNullableWithAggregatesFilter<"Outlet"> | string | null
    instagramUrl?: StringNullableWithAggregatesFilter<"Outlet"> | string | null
    facebookUrl?: StringNullableWithAggregatesFilter<"Outlet"> | string | null
    isActive?: BoolWithAggregatesFilter<"Outlet"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Outlet"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Outlet"> | Date | string
  }

  export type CustomerWhereInput = {
    AND?: CustomerWhereInput | CustomerWhereInput[]
    OR?: CustomerWhereInput[]
    NOT?: CustomerWhereInput | CustomerWhereInput[]
    id?: UuidFilter<"Customer"> | string
    deviceId?: StringFilter<"Customer"> | string
    fullName?: StringFilter<"Customer"> | string
    phone?: StringFilter<"Customer"> | string
    email?: StringNullableFilter<"Customer"> | string | null
    birthDate?: DateTimeFilter<"Customer"> | Date | string
    anniversaryDate?: DateTimeNullableFilter<"Customer"> | Date | string | null
    gender?: EnumGenderFilter<"Customer"> | $Enums.Gender
    maritalStatus?: EnumMaritalStatusFilter<"Customer"> | $Enums.MaritalStatus
    firstVisitOutletId?: UuidNullableFilter<"Customer"> | string | null
    lastVisitDate?: DateTimeNullableFilter<"Customer"> | Date | string | null
    totalVisits?: IntFilter<"Customer"> | number
    hasSubmittedFirstReview?: BoolFilter<"Customer"> | boolean
    createdAt?: DateTimeFilter<"Customer"> | Date | string
    updatedAt?: DateTimeFilter<"Customer"> | Date | string
    firstVisitOutlet?: XOR<OutletNullableScalarRelationFilter, OutletWhereInput> | null
    reviews?: ReviewListRelationFilter
    visits?: CustomerVisitListRelationFilter
    automationLogs?: AutomationLogListRelationFilter
  }

  export type CustomerOrderByWithRelationInput = {
    id?: SortOrder
    deviceId?: SortOrder
    fullName?: SortOrder
    phone?: SortOrder
    email?: SortOrderInput | SortOrder
    birthDate?: SortOrder
    anniversaryDate?: SortOrderInput | SortOrder
    gender?: SortOrder
    maritalStatus?: SortOrder
    firstVisitOutletId?: SortOrderInput | SortOrder
    lastVisitDate?: SortOrderInput | SortOrder
    totalVisits?: SortOrder
    hasSubmittedFirstReview?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    firstVisitOutlet?: OutletOrderByWithRelationInput
    reviews?: ReviewOrderByRelationAggregateInput
    visits?: CustomerVisitOrderByRelationAggregateInput
    automationLogs?: AutomationLogOrderByRelationAggregateInput
  }

  export type CustomerWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    deviceId?: string
    phone?: string
    AND?: CustomerWhereInput | CustomerWhereInput[]
    OR?: CustomerWhereInput[]
    NOT?: CustomerWhereInput | CustomerWhereInput[]
    fullName?: StringFilter<"Customer"> | string
    email?: StringNullableFilter<"Customer"> | string | null
    birthDate?: DateTimeFilter<"Customer"> | Date | string
    anniversaryDate?: DateTimeNullableFilter<"Customer"> | Date | string | null
    gender?: EnumGenderFilter<"Customer"> | $Enums.Gender
    maritalStatus?: EnumMaritalStatusFilter<"Customer"> | $Enums.MaritalStatus
    firstVisitOutletId?: UuidNullableFilter<"Customer"> | string | null
    lastVisitDate?: DateTimeNullableFilter<"Customer"> | Date | string | null
    totalVisits?: IntFilter<"Customer"> | number
    hasSubmittedFirstReview?: BoolFilter<"Customer"> | boolean
    createdAt?: DateTimeFilter<"Customer"> | Date | string
    updatedAt?: DateTimeFilter<"Customer"> | Date | string
    firstVisitOutlet?: XOR<OutletNullableScalarRelationFilter, OutletWhereInput> | null
    reviews?: ReviewListRelationFilter
    visits?: CustomerVisitListRelationFilter
    automationLogs?: AutomationLogListRelationFilter
  }, "id" | "deviceId" | "phone">

  export type CustomerOrderByWithAggregationInput = {
    id?: SortOrder
    deviceId?: SortOrder
    fullName?: SortOrder
    phone?: SortOrder
    email?: SortOrderInput | SortOrder
    birthDate?: SortOrder
    anniversaryDate?: SortOrderInput | SortOrder
    gender?: SortOrder
    maritalStatus?: SortOrder
    firstVisitOutletId?: SortOrderInput | SortOrder
    lastVisitDate?: SortOrderInput | SortOrder
    totalVisits?: SortOrder
    hasSubmittedFirstReview?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CustomerCountOrderByAggregateInput
    _avg?: CustomerAvgOrderByAggregateInput
    _max?: CustomerMaxOrderByAggregateInput
    _min?: CustomerMinOrderByAggregateInput
    _sum?: CustomerSumOrderByAggregateInput
  }

  export type CustomerScalarWhereWithAggregatesInput = {
    AND?: CustomerScalarWhereWithAggregatesInput | CustomerScalarWhereWithAggregatesInput[]
    OR?: CustomerScalarWhereWithAggregatesInput[]
    NOT?: CustomerScalarWhereWithAggregatesInput | CustomerScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"Customer"> | string
    deviceId?: StringWithAggregatesFilter<"Customer"> | string
    fullName?: StringWithAggregatesFilter<"Customer"> | string
    phone?: StringWithAggregatesFilter<"Customer"> | string
    email?: StringNullableWithAggregatesFilter<"Customer"> | string | null
    birthDate?: DateTimeWithAggregatesFilter<"Customer"> | Date | string
    anniversaryDate?: DateTimeNullableWithAggregatesFilter<"Customer"> | Date | string | null
    gender?: EnumGenderWithAggregatesFilter<"Customer"> | $Enums.Gender
    maritalStatus?: EnumMaritalStatusWithAggregatesFilter<"Customer"> | $Enums.MaritalStatus
    firstVisitOutletId?: UuidNullableWithAggregatesFilter<"Customer"> | string | null
    lastVisitDate?: DateTimeNullableWithAggregatesFilter<"Customer"> | Date | string | null
    totalVisits?: IntWithAggregatesFilter<"Customer"> | number
    hasSubmittedFirstReview?: BoolWithAggregatesFilter<"Customer"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Customer"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Customer"> | Date | string
  }

  export type ReviewWhereInput = {
    AND?: ReviewWhereInput | ReviewWhereInput[]
    OR?: ReviewWhereInput[]
    NOT?: ReviewWhereInput | ReviewWhereInput[]
    id?: UuidFilter<"Review"> | string
    customerId?: UuidNullableFilter<"Review"> | string | null
    outletId?: UuidFilter<"Review"> | string
    reviewText?: StringNullableFilter<"Review"> | string | null
    stars?: IntFilter<"Review"> | number
    reviewType?: EnumReviewTypeFilter<"Review"> | $Enums.ReviewType
    postedToGoogle?: BoolFilter<"Review"> | boolean
    isVisible?: BoolFilter<"Review"> | boolean
    createdAt?: DateTimeFilter<"Review"> | Date | string
    customer?: XOR<CustomerNullableScalarRelationFilter, CustomerWhereInput> | null
    outlet?: XOR<OutletScalarRelationFilter, OutletWhereInput>
  }

  export type ReviewOrderByWithRelationInput = {
    id?: SortOrder
    customerId?: SortOrderInput | SortOrder
    outletId?: SortOrder
    reviewText?: SortOrderInput | SortOrder
    stars?: SortOrder
    reviewType?: SortOrder
    postedToGoogle?: SortOrder
    isVisible?: SortOrder
    createdAt?: SortOrder
    customer?: CustomerOrderByWithRelationInput
    outlet?: OutletOrderByWithRelationInput
  }

  export type ReviewWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ReviewWhereInput | ReviewWhereInput[]
    OR?: ReviewWhereInput[]
    NOT?: ReviewWhereInput | ReviewWhereInput[]
    customerId?: UuidNullableFilter<"Review"> | string | null
    outletId?: UuidFilter<"Review"> | string
    reviewText?: StringNullableFilter<"Review"> | string | null
    stars?: IntFilter<"Review"> | number
    reviewType?: EnumReviewTypeFilter<"Review"> | $Enums.ReviewType
    postedToGoogle?: BoolFilter<"Review"> | boolean
    isVisible?: BoolFilter<"Review"> | boolean
    createdAt?: DateTimeFilter<"Review"> | Date | string
    customer?: XOR<CustomerNullableScalarRelationFilter, CustomerWhereInput> | null
    outlet?: XOR<OutletScalarRelationFilter, OutletWhereInput>
  }, "id">

  export type ReviewOrderByWithAggregationInput = {
    id?: SortOrder
    customerId?: SortOrderInput | SortOrder
    outletId?: SortOrder
    reviewText?: SortOrderInput | SortOrder
    stars?: SortOrder
    reviewType?: SortOrder
    postedToGoogle?: SortOrder
    isVisible?: SortOrder
    createdAt?: SortOrder
    _count?: ReviewCountOrderByAggregateInput
    _avg?: ReviewAvgOrderByAggregateInput
    _max?: ReviewMaxOrderByAggregateInput
    _min?: ReviewMinOrderByAggregateInput
    _sum?: ReviewSumOrderByAggregateInput
  }

  export type ReviewScalarWhereWithAggregatesInput = {
    AND?: ReviewScalarWhereWithAggregatesInput | ReviewScalarWhereWithAggregatesInput[]
    OR?: ReviewScalarWhereWithAggregatesInput[]
    NOT?: ReviewScalarWhereWithAggregatesInput | ReviewScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"Review"> | string
    customerId?: UuidNullableWithAggregatesFilter<"Review"> | string | null
    outletId?: UuidWithAggregatesFilter<"Review"> | string
    reviewText?: StringNullableWithAggregatesFilter<"Review"> | string | null
    stars?: IntWithAggregatesFilter<"Review"> | number
    reviewType?: EnumReviewTypeWithAggregatesFilter<"Review"> | $Enums.ReviewType
    postedToGoogle?: BoolWithAggregatesFilter<"Review"> | boolean
    isVisible?: BoolWithAggregatesFilter<"Review"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Review"> | Date | string
  }

  export type CustomerVisitWhereInput = {
    AND?: CustomerVisitWhereInput | CustomerVisitWhereInput[]
    OR?: CustomerVisitWhereInput[]
    NOT?: CustomerVisitWhereInput | CustomerVisitWhereInput[]
    id?: UuidFilter<"CustomerVisit"> | string
    customerId?: UuidNullableFilter<"CustomerVisit"> | string | null
    deviceId?: StringFilter<"CustomerVisit"> | string
    outletId?: UuidFilter<"CustomerVisit"> | string
    visitType?: EnumVisitTypeFilter<"CustomerVisit"> | $Enums.VisitType
    visitedAt?: DateTimeFilter<"CustomerVisit"> | Date | string
    customer?: XOR<CustomerNullableScalarRelationFilter, CustomerWhereInput> | null
    outlet?: XOR<OutletScalarRelationFilter, OutletWhereInput>
  }

  export type CustomerVisitOrderByWithRelationInput = {
    id?: SortOrder
    customerId?: SortOrderInput | SortOrder
    deviceId?: SortOrder
    outletId?: SortOrder
    visitType?: SortOrder
    visitedAt?: SortOrder
    customer?: CustomerOrderByWithRelationInput
    outlet?: OutletOrderByWithRelationInput
  }

  export type CustomerVisitWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CustomerVisitWhereInput | CustomerVisitWhereInput[]
    OR?: CustomerVisitWhereInput[]
    NOT?: CustomerVisitWhereInput | CustomerVisitWhereInput[]
    customerId?: UuidNullableFilter<"CustomerVisit"> | string | null
    deviceId?: StringFilter<"CustomerVisit"> | string
    outletId?: UuidFilter<"CustomerVisit"> | string
    visitType?: EnumVisitTypeFilter<"CustomerVisit"> | $Enums.VisitType
    visitedAt?: DateTimeFilter<"CustomerVisit"> | Date | string
    customer?: XOR<CustomerNullableScalarRelationFilter, CustomerWhereInput> | null
    outlet?: XOR<OutletScalarRelationFilter, OutletWhereInput>
  }, "id">

  export type CustomerVisitOrderByWithAggregationInput = {
    id?: SortOrder
    customerId?: SortOrderInput | SortOrder
    deviceId?: SortOrder
    outletId?: SortOrder
    visitType?: SortOrder
    visitedAt?: SortOrder
    _count?: CustomerVisitCountOrderByAggregateInput
    _max?: CustomerVisitMaxOrderByAggregateInput
    _min?: CustomerVisitMinOrderByAggregateInput
  }

  export type CustomerVisitScalarWhereWithAggregatesInput = {
    AND?: CustomerVisitScalarWhereWithAggregatesInput | CustomerVisitScalarWhereWithAggregatesInput[]
    OR?: CustomerVisitScalarWhereWithAggregatesInput[]
    NOT?: CustomerVisitScalarWhereWithAggregatesInput | CustomerVisitScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"CustomerVisit"> | string
    customerId?: UuidNullableWithAggregatesFilter<"CustomerVisit"> | string | null
    deviceId?: StringWithAggregatesFilter<"CustomerVisit"> | string
    outletId?: UuidWithAggregatesFilter<"CustomerVisit"> | string
    visitType?: EnumVisitTypeWithAggregatesFilter<"CustomerVisit"> | $Enums.VisitType
    visitedAt?: DateTimeWithAggregatesFilter<"CustomerVisit"> | Date | string
  }

  export type MenuCategoryWhereInput = {
    AND?: MenuCategoryWhereInput | MenuCategoryWhereInput[]
    OR?: MenuCategoryWhereInput[]
    NOT?: MenuCategoryWhereInput | MenuCategoryWhereInput[]
    id?: UuidFilter<"MenuCategory"> | string
    name?: StringFilter<"MenuCategory"> | string
    displayOrder?: IntNullableFilter<"MenuCategory"> | number | null
    isActive?: BoolFilter<"MenuCategory"> | boolean
    outletId?: UuidNullableFilter<"MenuCategory"> | string | null
    createdAt?: DateTimeFilter<"MenuCategory"> | Date | string
    outlet?: XOR<OutletNullableScalarRelationFilter, OutletWhereInput> | null
    items?: MenuItemListRelationFilter
  }

  export type MenuCategoryOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    displayOrder?: SortOrderInput | SortOrder
    isActive?: SortOrder
    outletId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    outlet?: OutletOrderByWithRelationInput
    items?: MenuItemOrderByRelationAggregateInput
  }

  export type MenuCategoryWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: MenuCategoryWhereInput | MenuCategoryWhereInput[]
    OR?: MenuCategoryWhereInput[]
    NOT?: MenuCategoryWhereInput | MenuCategoryWhereInput[]
    name?: StringFilter<"MenuCategory"> | string
    displayOrder?: IntNullableFilter<"MenuCategory"> | number | null
    isActive?: BoolFilter<"MenuCategory"> | boolean
    outletId?: UuidNullableFilter<"MenuCategory"> | string | null
    createdAt?: DateTimeFilter<"MenuCategory"> | Date | string
    outlet?: XOR<OutletNullableScalarRelationFilter, OutletWhereInput> | null
    items?: MenuItemListRelationFilter
  }, "id">

  export type MenuCategoryOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    displayOrder?: SortOrderInput | SortOrder
    isActive?: SortOrder
    outletId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: MenuCategoryCountOrderByAggregateInput
    _avg?: MenuCategoryAvgOrderByAggregateInput
    _max?: MenuCategoryMaxOrderByAggregateInput
    _min?: MenuCategoryMinOrderByAggregateInput
    _sum?: MenuCategorySumOrderByAggregateInput
  }

  export type MenuCategoryScalarWhereWithAggregatesInput = {
    AND?: MenuCategoryScalarWhereWithAggregatesInput | MenuCategoryScalarWhereWithAggregatesInput[]
    OR?: MenuCategoryScalarWhereWithAggregatesInput[]
    NOT?: MenuCategoryScalarWhereWithAggregatesInput | MenuCategoryScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"MenuCategory"> | string
    name?: StringWithAggregatesFilter<"MenuCategory"> | string
    displayOrder?: IntNullableWithAggregatesFilter<"MenuCategory"> | number | null
    isActive?: BoolWithAggregatesFilter<"MenuCategory"> | boolean
    outletId?: UuidNullableWithAggregatesFilter<"MenuCategory"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"MenuCategory"> | Date | string
  }

  export type MenuItemWhereInput = {
    AND?: MenuItemWhereInput | MenuItemWhereInput[]
    OR?: MenuItemWhereInput[]
    NOT?: MenuItemWhereInput | MenuItemWhereInput[]
    id?: UuidFilter<"MenuItem"> | string
    categoryId?: UuidFilter<"MenuItem"> | string
    name?: StringFilter<"MenuItem"> | string
    description?: StringNullableFilter<"MenuItem"> | string | null
    price?: DecimalNullableFilter<"MenuItem"> | Decimal | DecimalJsLike | number | string | null
    priceVariants?: JsonNullableFilter<"MenuItem">
    isVeg?: BoolFilter<"MenuItem"> | boolean
    imageUrl?: StringNullableFilter<"MenuItem"> | string | null
    isAvailable?: BoolFilter<"MenuItem"> | boolean
    displayOrder?: IntNullableFilter<"MenuItem"> | number | null
    createdAt?: DateTimeFilter<"MenuItem"> | Date | string
    updatedAt?: DateTimeFilter<"MenuItem"> | Date | string
    category?: XOR<MenuCategoryScalarRelationFilter, MenuCategoryWhereInput>
  }

  export type MenuItemOrderByWithRelationInput = {
    id?: SortOrder
    categoryId?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    price?: SortOrderInput | SortOrder
    priceVariants?: SortOrderInput | SortOrder
    isVeg?: SortOrder
    imageUrl?: SortOrderInput | SortOrder
    isAvailable?: SortOrder
    displayOrder?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    category?: MenuCategoryOrderByWithRelationInput
  }

  export type MenuItemWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: MenuItemWhereInput | MenuItemWhereInput[]
    OR?: MenuItemWhereInput[]
    NOT?: MenuItemWhereInput | MenuItemWhereInput[]
    categoryId?: UuidFilter<"MenuItem"> | string
    name?: StringFilter<"MenuItem"> | string
    description?: StringNullableFilter<"MenuItem"> | string | null
    price?: DecimalNullableFilter<"MenuItem"> | Decimal | DecimalJsLike | number | string | null
    priceVariants?: JsonNullableFilter<"MenuItem">
    isVeg?: BoolFilter<"MenuItem"> | boolean
    imageUrl?: StringNullableFilter<"MenuItem"> | string | null
    isAvailable?: BoolFilter<"MenuItem"> | boolean
    displayOrder?: IntNullableFilter<"MenuItem"> | number | null
    createdAt?: DateTimeFilter<"MenuItem"> | Date | string
    updatedAt?: DateTimeFilter<"MenuItem"> | Date | string
    category?: XOR<MenuCategoryScalarRelationFilter, MenuCategoryWhereInput>
  }, "id">

  export type MenuItemOrderByWithAggregationInput = {
    id?: SortOrder
    categoryId?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    price?: SortOrderInput | SortOrder
    priceVariants?: SortOrderInput | SortOrder
    isVeg?: SortOrder
    imageUrl?: SortOrderInput | SortOrder
    isAvailable?: SortOrder
    displayOrder?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: MenuItemCountOrderByAggregateInput
    _avg?: MenuItemAvgOrderByAggregateInput
    _max?: MenuItemMaxOrderByAggregateInput
    _min?: MenuItemMinOrderByAggregateInput
    _sum?: MenuItemSumOrderByAggregateInput
  }

  export type MenuItemScalarWhereWithAggregatesInput = {
    AND?: MenuItemScalarWhereWithAggregatesInput | MenuItemScalarWhereWithAggregatesInput[]
    OR?: MenuItemScalarWhereWithAggregatesInput[]
    NOT?: MenuItemScalarWhereWithAggregatesInput | MenuItemScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"MenuItem"> | string
    categoryId?: UuidWithAggregatesFilter<"MenuItem"> | string
    name?: StringWithAggregatesFilter<"MenuItem"> | string
    description?: StringNullableWithAggregatesFilter<"MenuItem"> | string | null
    price?: DecimalNullableWithAggregatesFilter<"MenuItem"> | Decimal | DecimalJsLike | number | string | null
    priceVariants?: JsonNullableWithAggregatesFilter<"MenuItem">
    isVeg?: BoolWithAggregatesFilter<"MenuItem"> | boolean
    imageUrl?: StringNullableWithAggregatesFilter<"MenuItem"> | string | null
    isAvailable?: BoolWithAggregatesFilter<"MenuItem"> | boolean
    displayOrder?: IntNullableWithAggregatesFilter<"MenuItem"> | number | null
    createdAt?: DateTimeWithAggregatesFilter<"MenuItem"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"MenuItem"> | Date | string
  }

  export type AutomationLogWhereInput = {
    AND?: AutomationLogWhereInput | AutomationLogWhereInput[]
    OR?: AutomationLogWhereInput[]
    NOT?: AutomationLogWhereInput | AutomationLogWhereInput[]
    id?: UuidFilter<"AutomationLog"> | string
    customerId?: UuidNullableFilter<"AutomationLog"> | string | null
    automationType?: EnumAutomationTypeFilter<"AutomationLog"> | $Enums.AutomationType
    messageStage?: EnumMessageStageFilter<"AutomationLog"> | $Enums.MessageStage
    status?: EnumAutomationStatusFilter<"AutomationLog"> | $Enums.AutomationStatus
    errorMessage?: StringNullableFilter<"AutomationLog"> | string | null
    sentAt?: DateTimeFilter<"AutomationLog"> | Date | string
    customer?: XOR<CustomerNullableScalarRelationFilter, CustomerWhereInput> | null
  }

  export type AutomationLogOrderByWithRelationInput = {
    id?: SortOrder
    customerId?: SortOrderInput | SortOrder
    automationType?: SortOrder
    messageStage?: SortOrder
    status?: SortOrder
    errorMessage?: SortOrderInput | SortOrder
    sentAt?: SortOrder
    customer?: CustomerOrderByWithRelationInput
  }

  export type AutomationLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AutomationLogWhereInput | AutomationLogWhereInput[]
    OR?: AutomationLogWhereInput[]
    NOT?: AutomationLogWhereInput | AutomationLogWhereInput[]
    customerId?: UuidNullableFilter<"AutomationLog"> | string | null
    automationType?: EnumAutomationTypeFilter<"AutomationLog"> | $Enums.AutomationType
    messageStage?: EnumMessageStageFilter<"AutomationLog"> | $Enums.MessageStage
    status?: EnumAutomationStatusFilter<"AutomationLog"> | $Enums.AutomationStatus
    errorMessage?: StringNullableFilter<"AutomationLog"> | string | null
    sentAt?: DateTimeFilter<"AutomationLog"> | Date | string
    customer?: XOR<CustomerNullableScalarRelationFilter, CustomerWhereInput> | null
  }, "id">

  export type AutomationLogOrderByWithAggregationInput = {
    id?: SortOrder
    customerId?: SortOrderInput | SortOrder
    automationType?: SortOrder
    messageStage?: SortOrder
    status?: SortOrder
    errorMessage?: SortOrderInput | SortOrder
    sentAt?: SortOrder
    _count?: AutomationLogCountOrderByAggregateInput
    _max?: AutomationLogMaxOrderByAggregateInput
    _min?: AutomationLogMinOrderByAggregateInput
  }

  export type AutomationLogScalarWhereWithAggregatesInput = {
    AND?: AutomationLogScalarWhereWithAggregatesInput | AutomationLogScalarWhereWithAggregatesInput[]
    OR?: AutomationLogScalarWhereWithAggregatesInput[]
    NOT?: AutomationLogScalarWhereWithAggregatesInput | AutomationLogScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"AutomationLog"> | string
    customerId?: UuidNullableWithAggregatesFilter<"AutomationLog"> | string | null
    automationType?: EnumAutomationTypeWithAggregatesFilter<"AutomationLog"> | $Enums.AutomationType
    messageStage?: EnumMessageStageWithAggregatesFilter<"AutomationLog"> | $Enums.MessageStage
    status?: EnumAutomationStatusWithAggregatesFilter<"AutomationLog"> | $Enums.AutomationStatus
    errorMessage?: StringNullableWithAggregatesFilter<"AutomationLog"> | string | null
    sentAt?: DateTimeWithAggregatesFilter<"AutomationLog"> | Date | string
  }

  export type StaffWhereInput = {
    AND?: StaffWhereInput | StaffWhereInput[]
    OR?: StaffWhereInput[]
    NOT?: StaffWhereInput | StaffWhereInput[]
    id?: UuidFilter<"Staff"> | string
    username?: StringNullableFilter<"Staff"> | string | null
    fullName?: StringFilter<"Staff"> | string
    email?: StringFilter<"Staff"> | string
    phone?: StringNullableFilter<"Staff"> | string | null
    role?: EnumStaffRoleFilter<"Staff"> | $Enums.StaffRole
    isAdmin?: BoolFilter<"Staff"> | boolean
    assignedOutletId?: UuidNullableFilter<"Staff"> | string | null
    isActive?: BoolFilter<"Staff"> | boolean
    createdAt?: DateTimeFilter<"Staff"> | Date | string
    updatedAt?: DateTimeFilter<"Staff"> | Date | string
    assignedOutlet?: XOR<OutletNullableScalarRelationFilter, OutletWhereInput> | null
  }

  export type StaffOrderByWithRelationInput = {
    id?: SortOrder
    username?: SortOrderInput | SortOrder
    fullName?: SortOrder
    email?: SortOrder
    phone?: SortOrderInput | SortOrder
    role?: SortOrder
    isAdmin?: SortOrder
    assignedOutletId?: SortOrderInput | SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    assignedOutlet?: OutletOrderByWithRelationInput
  }

  export type StaffWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    username?: string
    email?: string
    AND?: StaffWhereInput | StaffWhereInput[]
    OR?: StaffWhereInput[]
    NOT?: StaffWhereInput | StaffWhereInput[]
    fullName?: StringFilter<"Staff"> | string
    phone?: StringNullableFilter<"Staff"> | string | null
    role?: EnumStaffRoleFilter<"Staff"> | $Enums.StaffRole
    isAdmin?: BoolFilter<"Staff"> | boolean
    assignedOutletId?: UuidNullableFilter<"Staff"> | string | null
    isActive?: BoolFilter<"Staff"> | boolean
    createdAt?: DateTimeFilter<"Staff"> | Date | string
    updatedAt?: DateTimeFilter<"Staff"> | Date | string
    assignedOutlet?: XOR<OutletNullableScalarRelationFilter, OutletWhereInput> | null
  }, "id" | "username" | "email">

  export type StaffOrderByWithAggregationInput = {
    id?: SortOrder
    username?: SortOrderInput | SortOrder
    fullName?: SortOrder
    email?: SortOrder
    phone?: SortOrderInput | SortOrder
    role?: SortOrder
    isAdmin?: SortOrder
    assignedOutletId?: SortOrderInput | SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: StaffCountOrderByAggregateInput
    _max?: StaffMaxOrderByAggregateInput
    _min?: StaffMinOrderByAggregateInput
  }

  export type StaffScalarWhereWithAggregatesInput = {
    AND?: StaffScalarWhereWithAggregatesInput | StaffScalarWhereWithAggregatesInput[]
    OR?: StaffScalarWhereWithAggregatesInput[]
    NOT?: StaffScalarWhereWithAggregatesInput | StaffScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"Staff"> | string
    username?: StringNullableWithAggregatesFilter<"Staff"> | string | null
    fullName?: StringWithAggregatesFilter<"Staff"> | string
    email?: StringWithAggregatesFilter<"Staff"> | string
    phone?: StringNullableWithAggregatesFilter<"Staff"> | string | null
    role?: EnumStaffRoleWithAggregatesFilter<"Staff"> | $Enums.StaffRole
    isAdmin?: BoolWithAggregatesFilter<"Staff"> | boolean
    assignedOutletId?: UuidNullableWithAggregatesFilter<"Staff"> | string | null
    isActive?: BoolWithAggregatesFilter<"Staff"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Staff"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Staff"> | Date | string
  }

  export type OutletCreateInput = {
    id?: string
    code: string
    slug: string
    name: string
    location?: string | null
    address?: string | null
    googlePlaceId: string
    googleMapsUrl?: string | null
    instagramUrl?: string | null
    facebookUrl?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    customers?: CustomerCreateNestedManyWithoutFirstVisitOutletInput
    reviews?: ReviewCreateNestedManyWithoutOutletInput
    visits?: CustomerVisitCreateNestedManyWithoutOutletInput
    menuCategories?: MenuCategoryCreateNestedManyWithoutOutletInput
    staff?: StaffCreateNestedManyWithoutAssignedOutletInput
  }

  export type OutletUncheckedCreateInput = {
    id?: string
    code: string
    slug: string
    name: string
    location?: string | null
    address?: string | null
    googlePlaceId: string
    googleMapsUrl?: string | null
    instagramUrl?: string | null
    facebookUrl?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    customers?: CustomerUncheckedCreateNestedManyWithoutFirstVisitOutletInput
    reviews?: ReviewUncheckedCreateNestedManyWithoutOutletInput
    visits?: CustomerVisitUncheckedCreateNestedManyWithoutOutletInput
    menuCategories?: MenuCategoryUncheckedCreateNestedManyWithoutOutletInput
    staff?: StaffUncheckedCreateNestedManyWithoutAssignedOutletInput
  }

  export type OutletUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    googlePlaceId?: StringFieldUpdateOperationsInput | string
    googleMapsUrl?: NullableStringFieldUpdateOperationsInput | string | null
    instagramUrl?: NullableStringFieldUpdateOperationsInput | string | null
    facebookUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customers?: CustomerUpdateManyWithoutFirstVisitOutletNestedInput
    reviews?: ReviewUpdateManyWithoutOutletNestedInput
    visits?: CustomerVisitUpdateManyWithoutOutletNestedInput
    menuCategories?: MenuCategoryUpdateManyWithoutOutletNestedInput
    staff?: StaffUpdateManyWithoutAssignedOutletNestedInput
  }

  export type OutletUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    googlePlaceId?: StringFieldUpdateOperationsInput | string
    googleMapsUrl?: NullableStringFieldUpdateOperationsInput | string | null
    instagramUrl?: NullableStringFieldUpdateOperationsInput | string | null
    facebookUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customers?: CustomerUncheckedUpdateManyWithoutFirstVisitOutletNestedInput
    reviews?: ReviewUncheckedUpdateManyWithoutOutletNestedInput
    visits?: CustomerVisitUncheckedUpdateManyWithoutOutletNestedInput
    menuCategories?: MenuCategoryUncheckedUpdateManyWithoutOutletNestedInput
    staff?: StaffUncheckedUpdateManyWithoutAssignedOutletNestedInput
  }

  export type OutletCreateManyInput = {
    id?: string
    code: string
    slug: string
    name: string
    location?: string | null
    address?: string | null
    googlePlaceId: string
    googleMapsUrl?: string | null
    instagramUrl?: string | null
    facebookUrl?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OutletUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    googlePlaceId?: StringFieldUpdateOperationsInput | string
    googleMapsUrl?: NullableStringFieldUpdateOperationsInput | string | null
    instagramUrl?: NullableStringFieldUpdateOperationsInput | string | null
    facebookUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OutletUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    googlePlaceId?: StringFieldUpdateOperationsInput | string
    googleMapsUrl?: NullableStringFieldUpdateOperationsInput | string | null
    instagramUrl?: NullableStringFieldUpdateOperationsInput | string | null
    facebookUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CustomerCreateInput = {
    id?: string
    deviceId: string
    fullName: string
    phone: string
    email?: string | null
    birthDate: Date | string
    anniversaryDate?: Date | string | null
    gender: $Enums.Gender
    maritalStatus: $Enums.MaritalStatus
    lastVisitDate?: Date | string | null
    totalVisits?: number
    hasSubmittedFirstReview?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    firstVisitOutlet?: OutletCreateNestedOneWithoutCustomersInput
    reviews?: ReviewCreateNestedManyWithoutCustomerInput
    visits?: CustomerVisitCreateNestedManyWithoutCustomerInput
    automationLogs?: AutomationLogCreateNestedManyWithoutCustomerInput
  }

  export type CustomerUncheckedCreateInput = {
    id?: string
    deviceId: string
    fullName: string
    phone: string
    email?: string | null
    birthDate: Date | string
    anniversaryDate?: Date | string | null
    gender: $Enums.Gender
    maritalStatus: $Enums.MaritalStatus
    firstVisitOutletId?: string | null
    lastVisitDate?: Date | string | null
    totalVisits?: number
    hasSubmittedFirstReview?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    reviews?: ReviewUncheckedCreateNestedManyWithoutCustomerInput
    visits?: CustomerVisitUncheckedCreateNestedManyWithoutCustomerInput
    automationLogs?: AutomationLogUncheckedCreateNestedManyWithoutCustomerInput
  }

  export type CustomerUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    deviceId?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    anniversaryDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    maritalStatus?: EnumMaritalStatusFieldUpdateOperationsInput | $Enums.MaritalStatus
    lastVisitDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    totalVisits?: IntFieldUpdateOperationsInput | number
    hasSubmittedFirstReview?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    firstVisitOutlet?: OutletUpdateOneWithoutCustomersNestedInput
    reviews?: ReviewUpdateManyWithoutCustomerNestedInput
    visits?: CustomerVisitUpdateManyWithoutCustomerNestedInput
    automationLogs?: AutomationLogUpdateManyWithoutCustomerNestedInput
  }

  export type CustomerUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    deviceId?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    anniversaryDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    maritalStatus?: EnumMaritalStatusFieldUpdateOperationsInput | $Enums.MaritalStatus
    firstVisitOutletId?: NullableStringFieldUpdateOperationsInput | string | null
    lastVisitDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    totalVisits?: IntFieldUpdateOperationsInput | number
    hasSubmittedFirstReview?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reviews?: ReviewUncheckedUpdateManyWithoutCustomerNestedInput
    visits?: CustomerVisitUncheckedUpdateManyWithoutCustomerNestedInput
    automationLogs?: AutomationLogUncheckedUpdateManyWithoutCustomerNestedInput
  }

  export type CustomerCreateManyInput = {
    id?: string
    deviceId: string
    fullName: string
    phone: string
    email?: string | null
    birthDate: Date | string
    anniversaryDate?: Date | string | null
    gender: $Enums.Gender
    maritalStatus: $Enums.MaritalStatus
    firstVisitOutletId?: string | null
    lastVisitDate?: Date | string | null
    totalVisits?: number
    hasSubmittedFirstReview?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CustomerUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    deviceId?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    anniversaryDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    maritalStatus?: EnumMaritalStatusFieldUpdateOperationsInput | $Enums.MaritalStatus
    lastVisitDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    totalVisits?: IntFieldUpdateOperationsInput | number
    hasSubmittedFirstReview?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CustomerUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    deviceId?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    anniversaryDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    maritalStatus?: EnumMaritalStatusFieldUpdateOperationsInput | $Enums.MaritalStatus
    firstVisitOutletId?: NullableStringFieldUpdateOperationsInput | string | null
    lastVisitDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    totalVisits?: IntFieldUpdateOperationsInput | number
    hasSubmittedFirstReview?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReviewCreateInput = {
    id?: string
    reviewText?: string | null
    stars: number
    reviewType: $Enums.ReviewType
    postedToGoogle?: boolean
    isVisible?: boolean
    createdAt?: Date | string
    customer?: CustomerCreateNestedOneWithoutReviewsInput
    outlet: OutletCreateNestedOneWithoutReviewsInput
  }

  export type ReviewUncheckedCreateInput = {
    id?: string
    customerId?: string | null
    outletId: string
    reviewText?: string | null
    stars: number
    reviewType: $Enums.ReviewType
    postedToGoogle?: boolean
    isVisible?: boolean
    createdAt?: Date | string
  }

  export type ReviewUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    reviewText?: NullableStringFieldUpdateOperationsInput | string | null
    stars?: IntFieldUpdateOperationsInput | number
    reviewType?: EnumReviewTypeFieldUpdateOperationsInput | $Enums.ReviewType
    postedToGoogle?: BoolFieldUpdateOperationsInput | boolean
    isVisible?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customer?: CustomerUpdateOneWithoutReviewsNestedInput
    outlet?: OutletUpdateOneRequiredWithoutReviewsNestedInput
  }

  export type ReviewUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    customerId?: NullableStringFieldUpdateOperationsInput | string | null
    outletId?: StringFieldUpdateOperationsInput | string
    reviewText?: NullableStringFieldUpdateOperationsInput | string | null
    stars?: IntFieldUpdateOperationsInput | number
    reviewType?: EnumReviewTypeFieldUpdateOperationsInput | $Enums.ReviewType
    postedToGoogle?: BoolFieldUpdateOperationsInput | boolean
    isVisible?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReviewCreateManyInput = {
    id?: string
    customerId?: string | null
    outletId: string
    reviewText?: string | null
    stars: number
    reviewType: $Enums.ReviewType
    postedToGoogle?: boolean
    isVisible?: boolean
    createdAt?: Date | string
  }

  export type ReviewUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    reviewText?: NullableStringFieldUpdateOperationsInput | string | null
    stars?: IntFieldUpdateOperationsInput | number
    reviewType?: EnumReviewTypeFieldUpdateOperationsInput | $Enums.ReviewType
    postedToGoogle?: BoolFieldUpdateOperationsInput | boolean
    isVisible?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReviewUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    customerId?: NullableStringFieldUpdateOperationsInput | string | null
    outletId?: StringFieldUpdateOperationsInput | string
    reviewText?: NullableStringFieldUpdateOperationsInput | string | null
    stars?: IntFieldUpdateOperationsInput | number
    reviewType?: EnumReviewTypeFieldUpdateOperationsInput | $Enums.ReviewType
    postedToGoogle?: BoolFieldUpdateOperationsInput | boolean
    isVisible?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CustomerVisitCreateInput = {
    id?: string
    deviceId: string
    visitType?: $Enums.VisitType
    visitedAt?: Date | string
    customer?: CustomerCreateNestedOneWithoutVisitsInput
    outlet: OutletCreateNestedOneWithoutVisitsInput
  }

  export type CustomerVisitUncheckedCreateInput = {
    id?: string
    customerId?: string | null
    deviceId: string
    outletId: string
    visitType?: $Enums.VisitType
    visitedAt?: Date | string
  }

  export type CustomerVisitUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    deviceId?: StringFieldUpdateOperationsInput | string
    visitType?: EnumVisitTypeFieldUpdateOperationsInput | $Enums.VisitType
    visitedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customer?: CustomerUpdateOneWithoutVisitsNestedInput
    outlet?: OutletUpdateOneRequiredWithoutVisitsNestedInput
  }

  export type CustomerVisitUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    customerId?: NullableStringFieldUpdateOperationsInput | string | null
    deviceId?: StringFieldUpdateOperationsInput | string
    outletId?: StringFieldUpdateOperationsInput | string
    visitType?: EnumVisitTypeFieldUpdateOperationsInput | $Enums.VisitType
    visitedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CustomerVisitCreateManyInput = {
    id?: string
    customerId?: string | null
    deviceId: string
    outletId: string
    visitType?: $Enums.VisitType
    visitedAt?: Date | string
  }

  export type CustomerVisitUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    deviceId?: StringFieldUpdateOperationsInput | string
    visitType?: EnumVisitTypeFieldUpdateOperationsInput | $Enums.VisitType
    visitedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CustomerVisitUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    customerId?: NullableStringFieldUpdateOperationsInput | string | null
    deviceId?: StringFieldUpdateOperationsInput | string
    outletId?: StringFieldUpdateOperationsInput | string
    visitType?: EnumVisitTypeFieldUpdateOperationsInput | $Enums.VisitType
    visitedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MenuCategoryCreateInput = {
    id?: string
    name: string
    displayOrder?: number | null
    isActive?: boolean
    createdAt?: Date | string
    outlet?: OutletCreateNestedOneWithoutMenuCategoriesInput
    items?: MenuItemCreateNestedManyWithoutCategoryInput
  }

  export type MenuCategoryUncheckedCreateInput = {
    id?: string
    name: string
    displayOrder?: number | null
    isActive?: boolean
    outletId?: string | null
    createdAt?: Date | string
    items?: MenuItemUncheckedCreateNestedManyWithoutCategoryInput
  }

  export type MenuCategoryUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    displayOrder?: NullableIntFieldUpdateOperationsInput | number | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    outlet?: OutletUpdateOneWithoutMenuCategoriesNestedInput
    items?: MenuItemUpdateManyWithoutCategoryNestedInput
  }

  export type MenuCategoryUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    displayOrder?: NullableIntFieldUpdateOperationsInput | number | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    outletId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: MenuItemUncheckedUpdateManyWithoutCategoryNestedInput
  }

  export type MenuCategoryCreateManyInput = {
    id?: string
    name: string
    displayOrder?: number | null
    isActive?: boolean
    outletId?: string | null
    createdAt?: Date | string
  }

  export type MenuCategoryUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    displayOrder?: NullableIntFieldUpdateOperationsInput | number | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MenuCategoryUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    displayOrder?: NullableIntFieldUpdateOperationsInput | number | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    outletId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MenuItemCreateInput = {
    id?: string
    name: string
    description?: string | null
    price?: Decimal | DecimalJsLike | number | string | null
    priceVariants?: NullableJsonNullValueInput | InputJsonValue
    isVeg?: boolean
    imageUrl?: string | null
    isAvailable?: boolean
    displayOrder?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    category: MenuCategoryCreateNestedOneWithoutItemsInput
  }

  export type MenuItemUncheckedCreateInput = {
    id?: string
    categoryId: string
    name: string
    description?: string | null
    price?: Decimal | DecimalJsLike | number | string | null
    priceVariants?: NullableJsonNullValueInput | InputJsonValue
    isVeg?: boolean
    imageUrl?: string | null
    isAvailable?: boolean
    displayOrder?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MenuItemUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    priceVariants?: NullableJsonNullValueInput | InputJsonValue
    isVeg?: BoolFieldUpdateOperationsInput | boolean
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isAvailable?: BoolFieldUpdateOperationsInput | boolean
    displayOrder?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    category?: MenuCategoryUpdateOneRequiredWithoutItemsNestedInput
  }

  export type MenuItemUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    categoryId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    priceVariants?: NullableJsonNullValueInput | InputJsonValue
    isVeg?: BoolFieldUpdateOperationsInput | boolean
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isAvailable?: BoolFieldUpdateOperationsInput | boolean
    displayOrder?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MenuItemCreateManyInput = {
    id?: string
    categoryId: string
    name: string
    description?: string | null
    price?: Decimal | DecimalJsLike | number | string | null
    priceVariants?: NullableJsonNullValueInput | InputJsonValue
    isVeg?: boolean
    imageUrl?: string | null
    isAvailable?: boolean
    displayOrder?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MenuItemUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    priceVariants?: NullableJsonNullValueInput | InputJsonValue
    isVeg?: BoolFieldUpdateOperationsInput | boolean
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isAvailable?: BoolFieldUpdateOperationsInput | boolean
    displayOrder?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MenuItemUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    categoryId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    priceVariants?: NullableJsonNullValueInput | InputJsonValue
    isVeg?: BoolFieldUpdateOperationsInput | boolean
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isAvailable?: BoolFieldUpdateOperationsInput | boolean
    displayOrder?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AutomationLogCreateInput = {
    id?: string
    automationType: $Enums.AutomationType
    messageStage: $Enums.MessageStage
    status: $Enums.AutomationStatus
    errorMessage?: string | null
    sentAt?: Date | string
    customer?: CustomerCreateNestedOneWithoutAutomationLogsInput
  }

  export type AutomationLogUncheckedCreateInput = {
    id?: string
    customerId?: string | null
    automationType: $Enums.AutomationType
    messageStage: $Enums.MessageStage
    status: $Enums.AutomationStatus
    errorMessage?: string | null
    sentAt?: Date | string
  }

  export type AutomationLogUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    automationType?: EnumAutomationTypeFieldUpdateOperationsInput | $Enums.AutomationType
    messageStage?: EnumMessageStageFieldUpdateOperationsInput | $Enums.MessageStage
    status?: EnumAutomationStatusFieldUpdateOperationsInput | $Enums.AutomationStatus
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    sentAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customer?: CustomerUpdateOneWithoutAutomationLogsNestedInput
  }

  export type AutomationLogUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    customerId?: NullableStringFieldUpdateOperationsInput | string | null
    automationType?: EnumAutomationTypeFieldUpdateOperationsInput | $Enums.AutomationType
    messageStage?: EnumMessageStageFieldUpdateOperationsInput | $Enums.MessageStage
    status?: EnumAutomationStatusFieldUpdateOperationsInput | $Enums.AutomationStatus
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    sentAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AutomationLogCreateManyInput = {
    id?: string
    customerId?: string | null
    automationType: $Enums.AutomationType
    messageStage: $Enums.MessageStage
    status: $Enums.AutomationStatus
    errorMessage?: string | null
    sentAt?: Date | string
  }

  export type AutomationLogUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    automationType?: EnumAutomationTypeFieldUpdateOperationsInput | $Enums.AutomationType
    messageStage?: EnumMessageStageFieldUpdateOperationsInput | $Enums.MessageStage
    status?: EnumAutomationStatusFieldUpdateOperationsInput | $Enums.AutomationStatus
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    sentAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AutomationLogUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    customerId?: NullableStringFieldUpdateOperationsInput | string | null
    automationType?: EnumAutomationTypeFieldUpdateOperationsInput | $Enums.AutomationType
    messageStage?: EnumMessageStageFieldUpdateOperationsInput | $Enums.MessageStage
    status?: EnumAutomationStatusFieldUpdateOperationsInput | $Enums.AutomationStatus
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    sentAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StaffCreateInput = {
    id: string
    username?: string | null
    fullName: string
    email: string
    phone?: string | null
    role: $Enums.StaffRole
    isAdmin?: boolean
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    assignedOutlet?: OutletCreateNestedOneWithoutStaffInput
  }

  export type StaffUncheckedCreateInput = {
    id: string
    username?: string | null
    fullName: string
    email: string
    phone?: string | null
    role: $Enums.StaffRole
    isAdmin?: boolean
    assignedOutletId?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type StaffUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    fullName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumStaffRoleFieldUpdateOperationsInput | $Enums.StaffRole
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    assignedOutlet?: OutletUpdateOneWithoutStaffNestedInput
  }

  export type StaffUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    fullName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumStaffRoleFieldUpdateOperationsInput | $Enums.StaffRole
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    assignedOutletId?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StaffCreateManyInput = {
    id: string
    username?: string | null
    fullName: string
    email: string
    phone?: string | null
    role: $Enums.StaffRole
    isAdmin?: boolean
    assignedOutletId?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type StaffUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    fullName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumStaffRoleFieldUpdateOperationsInput | $Enums.StaffRole
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StaffUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    fullName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumStaffRoleFieldUpdateOperationsInput | $Enums.StaffRole
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    assignedOutletId?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UuidFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidFilter<$PrismaModel> | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type CustomerListRelationFilter = {
    every?: CustomerWhereInput
    some?: CustomerWhereInput
    none?: CustomerWhereInput
  }

  export type ReviewListRelationFilter = {
    every?: ReviewWhereInput
    some?: ReviewWhereInput
    none?: ReviewWhereInput
  }

  export type CustomerVisitListRelationFilter = {
    every?: CustomerVisitWhereInput
    some?: CustomerVisitWhereInput
    none?: CustomerVisitWhereInput
  }

  export type MenuCategoryListRelationFilter = {
    every?: MenuCategoryWhereInput
    some?: MenuCategoryWhereInput
    none?: MenuCategoryWhereInput
  }

  export type StaffListRelationFilter = {
    every?: StaffWhereInput
    some?: StaffWhereInput
    none?: StaffWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type CustomerOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ReviewOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CustomerVisitOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type MenuCategoryOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type StaffOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type OutletCountOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    slug?: SortOrder
    name?: SortOrder
    location?: SortOrder
    address?: SortOrder
    googlePlaceId?: SortOrder
    googleMapsUrl?: SortOrder
    instagramUrl?: SortOrder
    facebookUrl?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type OutletMaxOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    slug?: SortOrder
    name?: SortOrder
    location?: SortOrder
    address?: SortOrder
    googlePlaceId?: SortOrder
    googleMapsUrl?: SortOrder
    instagramUrl?: SortOrder
    facebookUrl?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type OutletMinOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    slug?: SortOrder
    name?: SortOrder
    location?: SortOrder
    address?: SortOrder
    googlePlaceId?: SortOrder
    googleMapsUrl?: SortOrder
    instagramUrl?: SortOrder
    facebookUrl?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UuidWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type EnumGenderFilter<$PrismaModel = never> = {
    equals?: $Enums.Gender | EnumGenderFieldRefInput<$PrismaModel>
    in?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel>
    notIn?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel>
    not?: NestedEnumGenderFilter<$PrismaModel> | $Enums.Gender
  }

  export type EnumMaritalStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.MaritalStatus | EnumMaritalStatusFieldRefInput<$PrismaModel>
    in?: $Enums.MaritalStatus[] | ListEnumMaritalStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.MaritalStatus[] | ListEnumMaritalStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumMaritalStatusFilter<$PrismaModel> | $Enums.MaritalStatus
  }

  export type UuidNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidNullableFilter<$PrismaModel> | string | null
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type OutletNullableScalarRelationFilter = {
    is?: OutletWhereInput | null
    isNot?: OutletWhereInput | null
  }

  export type AutomationLogListRelationFilter = {
    every?: AutomationLogWhereInput
    some?: AutomationLogWhereInput
    none?: AutomationLogWhereInput
  }

  export type AutomationLogOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CustomerCountOrderByAggregateInput = {
    id?: SortOrder
    deviceId?: SortOrder
    fullName?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    birthDate?: SortOrder
    anniversaryDate?: SortOrder
    gender?: SortOrder
    maritalStatus?: SortOrder
    firstVisitOutletId?: SortOrder
    lastVisitDate?: SortOrder
    totalVisits?: SortOrder
    hasSubmittedFirstReview?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CustomerAvgOrderByAggregateInput = {
    totalVisits?: SortOrder
  }

  export type CustomerMaxOrderByAggregateInput = {
    id?: SortOrder
    deviceId?: SortOrder
    fullName?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    birthDate?: SortOrder
    anniversaryDate?: SortOrder
    gender?: SortOrder
    maritalStatus?: SortOrder
    firstVisitOutletId?: SortOrder
    lastVisitDate?: SortOrder
    totalVisits?: SortOrder
    hasSubmittedFirstReview?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CustomerMinOrderByAggregateInput = {
    id?: SortOrder
    deviceId?: SortOrder
    fullName?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    birthDate?: SortOrder
    anniversaryDate?: SortOrder
    gender?: SortOrder
    maritalStatus?: SortOrder
    firstVisitOutletId?: SortOrder
    lastVisitDate?: SortOrder
    totalVisits?: SortOrder
    hasSubmittedFirstReview?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CustomerSumOrderByAggregateInput = {
    totalVisits?: SortOrder
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type EnumGenderWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Gender | EnumGenderFieldRefInput<$PrismaModel>
    in?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel>
    notIn?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel>
    not?: NestedEnumGenderWithAggregatesFilter<$PrismaModel> | $Enums.Gender
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumGenderFilter<$PrismaModel>
    _max?: NestedEnumGenderFilter<$PrismaModel>
  }

  export type EnumMaritalStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.MaritalStatus | EnumMaritalStatusFieldRefInput<$PrismaModel>
    in?: $Enums.MaritalStatus[] | ListEnumMaritalStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.MaritalStatus[] | ListEnumMaritalStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumMaritalStatusWithAggregatesFilter<$PrismaModel> | $Enums.MaritalStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumMaritalStatusFilter<$PrismaModel>
    _max?: NestedEnumMaritalStatusFilter<$PrismaModel>
  }

  export type UuidNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type EnumReviewTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.ReviewType | EnumReviewTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ReviewType[] | ListEnumReviewTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ReviewType[] | ListEnumReviewTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumReviewTypeFilter<$PrismaModel> | $Enums.ReviewType
  }

  export type CustomerNullableScalarRelationFilter = {
    is?: CustomerWhereInput | null
    isNot?: CustomerWhereInput | null
  }

  export type OutletScalarRelationFilter = {
    is?: OutletWhereInput
    isNot?: OutletWhereInput
  }

  export type ReviewCountOrderByAggregateInput = {
    id?: SortOrder
    customerId?: SortOrder
    outletId?: SortOrder
    reviewText?: SortOrder
    stars?: SortOrder
    reviewType?: SortOrder
    postedToGoogle?: SortOrder
    isVisible?: SortOrder
    createdAt?: SortOrder
  }

  export type ReviewAvgOrderByAggregateInput = {
    stars?: SortOrder
  }

  export type ReviewMaxOrderByAggregateInput = {
    id?: SortOrder
    customerId?: SortOrder
    outletId?: SortOrder
    reviewText?: SortOrder
    stars?: SortOrder
    reviewType?: SortOrder
    postedToGoogle?: SortOrder
    isVisible?: SortOrder
    createdAt?: SortOrder
  }

  export type ReviewMinOrderByAggregateInput = {
    id?: SortOrder
    customerId?: SortOrder
    outletId?: SortOrder
    reviewText?: SortOrder
    stars?: SortOrder
    reviewType?: SortOrder
    postedToGoogle?: SortOrder
    isVisible?: SortOrder
    createdAt?: SortOrder
  }

  export type ReviewSumOrderByAggregateInput = {
    stars?: SortOrder
  }

  export type EnumReviewTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ReviewType | EnumReviewTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ReviewType[] | ListEnumReviewTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ReviewType[] | ListEnumReviewTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumReviewTypeWithAggregatesFilter<$PrismaModel> | $Enums.ReviewType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumReviewTypeFilter<$PrismaModel>
    _max?: NestedEnumReviewTypeFilter<$PrismaModel>
  }

  export type EnumVisitTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.VisitType | EnumVisitTypeFieldRefInput<$PrismaModel>
    in?: $Enums.VisitType[] | ListEnumVisitTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.VisitType[] | ListEnumVisitTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumVisitTypeFilter<$PrismaModel> | $Enums.VisitType
  }

  export type CustomerVisitCountOrderByAggregateInput = {
    id?: SortOrder
    customerId?: SortOrder
    deviceId?: SortOrder
    outletId?: SortOrder
    visitType?: SortOrder
    visitedAt?: SortOrder
  }

  export type CustomerVisitMaxOrderByAggregateInput = {
    id?: SortOrder
    customerId?: SortOrder
    deviceId?: SortOrder
    outletId?: SortOrder
    visitType?: SortOrder
    visitedAt?: SortOrder
  }

  export type CustomerVisitMinOrderByAggregateInput = {
    id?: SortOrder
    customerId?: SortOrder
    deviceId?: SortOrder
    outletId?: SortOrder
    visitType?: SortOrder
    visitedAt?: SortOrder
  }

  export type EnumVisitTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.VisitType | EnumVisitTypeFieldRefInput<$PrismaModel>
    in?: $Enums.VisitType[] | ListEnumVisitTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.VisitType[] | ListEnumVisitTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumVisitTypeWithAggregatesFilter<$PrismaModel> | $Enums.VisitType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumVisitTypeFilter<$PrismaModel>
    _max?: NestedEnumVisitTypeFilter<$PrismaModel>
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type MenuItemListRelationFilter = {
    every?: MenuItemWhereInput
    some?: MenuItemWhereInput
    none?: MenuItemWhereInput
  }

  export type MenuItemOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type MenuCategoryCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    displayOrder?: SortOrder
    isActive?: SortOrder
    outletId?: SortOrder
    createdAt?: SortOrder
  }

  export type MenuCategoryAvgOrderByAggregateInput = {
    displayOrder?: SortOrder
  }

  export type MenuCategoryMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    displayOrder?: SortOrder
    isActive?: SortOrder
    outletId?: SortOrder
    createdAt?: SortOrder
  }

  export type MenuCategoryMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    displayOrder?: SortOrder
    isActive?: SortOrder
    outletId?: SortOrder
    createdAt?: SortOrder
  }

  export type MenuCategorySumOrderByAggregateInput = {
    displayOrder?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type DecimalNullableFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type MenuCategoryScalarRelationFilter = {
    is?: MenuCategoryWhereInput
    isNot?: MenuCategoryWhereInput
  }

  export type MenuItemCountOrderByAggregateInput = {
    id?: SortOrder
    categoryId?: SortOrder
    name?: SortOrder
    description?: SortOrder
    price?: SortOrder
    priceVariants?: SortOrder
    isVeg?: SortOrder
    imageUrl?: SortOrder
    isAvailable?: SortOrder
    displayOrder?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MenuItemAvgOrderByAggregateInput = {
    price?: SortOrder
    displayOrder?: SortOrder
  }

  export type MenuItemMaxOrderByAggregateInput = {
    id?: SortOrder
    categoryId?: SortOrder
    name?: SortOrder
    description?: SortOrder
    price?: SortOrder
    isVeg?: SortOrder
    imageUrl?: SortOrder
    isAvailable?: SortOrder
    displayOrder?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MenuItemMinOrderByAggregateInput = {
    id?: SortOrder
    categoryId?: SortOrder
    name?: SortOrder
    description?: SortOrder
    price?: SortOrder
    isVeg?: SortOrder
    imageUrl?: SortOrder
    isAvailable?: SortOrder
    displayOrder?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MenuItemSumOrderByAggregateInput = {
    price?: SortOrder
    displayOrder?: SortOrder
  }

  export type DecimalNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedDecimalNullableFilter<$PrismaModel>
    _sum?: NestedDecimalNullableFilter<$PrismaModel>
    _min?: NestedDecimalNullableFilter<$PrismaModel>
    _max?: NestedDecimalNullableFilter<$PrismaModel>
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type EnumAutomationTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.AutomationType | EnumAutomationTypeFieldRefInput<$PrismaModel>
    in?: $Enums.AutomationType[] | ListEnumAutomationTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.AutomationType[] | ListEnumAutomationTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumAutomationTypeFilter<$PrismaModel> | $Enums.AutomationType
  }

  export type EnumMessageStageFilter<$PrismaModel = never> = {
    equals?: $Enums.MessageStage | EnumMessageStageFieldRefInput<$PrismaModel>
    in?: $Enums.MessageStage[] | ListEnumMessageStageFieldRefInput<$PrismaModel>
    notIn?: $Enums.MessageStage[] | ListEnumMessageStageFieldRefInput<$PrismaModel>
    not?: NestedEnumMessageStageFilter<$PrismaModel> | $Enums.MessageStage
  }

  export type EnumAutomationStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.AutomationStatus | EnumAutomationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AutomationStatus[] | ListEnumAutomationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.AutomationStatus[] | ListEnumAutomationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumAutomationStatusFilter<$PrismaModel> | $Enums.AutomationStatus
  }

  export type AutomationLogCountOrderByAggregateInput = {
    id?: SortOrder
    customerId?: SortOrder
    automationType?: SortOrder
    messageStage?: SortOrder
    status?: SortOrder
    errorMessage?: SortOrder
    sentAt?: SortOrder
  }

  export type AutomationLogMaxOrderByAggregateInput = {
    id?: SortOrder
    customerId?: SortOrder
    automationType?: SortOrder
    messageStage?: SortOrder
    status?: SortOrder
    errorMessage?: SortOrder
    sentAt?: SortOrder
  }

  export type AutomationLogMinOrderByAggregateInput = {
    id?: SortOrder
    customerId?: SortOrder
    automationType?: SortOrder
    messageStage?: SortOrder
    status?: SortOrder
    errorMessage?: SortOrder
    sentAt?: SortOrder
  }

  export type EnumAutomationTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AutomationType | EnumAutomationTypeFieldRefInput<$PrismaModel>
    in?: $Enums.AutomationType[] | ListEnumAutomationTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.AutomationType[] | ListEnumAutomationTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumAutomationTypeWithAggregatesFilter<$PrismaModel> | $Enums.AutomationType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAutomationTypeFilter<$PrismaModel>
    _max?: NestedEnumAutomationTypeFilter<$PrismaModel>
  }

  export type EnumMessageStageWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.MessageStage | EnumMessageStageFieldRefInput<$PrismaModel>
    in?: $Enums.MessageStage[] | ListEnumMessageStageFieldRefInput<$PrismaModel>
    notIn?: $Enums.MessageStage[] | ListEnumMessageStageFieldRefInput<$PrismaModel>
    not?: NestedEnumMessageStageWithAggregatesFilter<$PrismaModel> | $Enums.MessageStage
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumMessageStageFilter<$PrismaModel>
    _max?: NestedEnumMessageStageFilter<$PrismaModel>
  }

  export type EnumAutomationStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AutomationStatus | EnumAutomationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AutomationStatus[] | ListEnumAutomationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.AutomationStatus[] | ListEnumAutomationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumAutomationStatusWithAggregatesFilter<$PrismaModel> | $Enums.AutomationStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAutomationStatusFilter<$PrismaModel>
    _max?: NestedEnumAutomationStatusFilter<$PrismaModel>
  }

  export type EnumStaffRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.StaffRole | EnumStaffRoleFieldRefInput<$PrismaModel>
    in?: $Enums.StaffRole[] | ListEnumStaffRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.StaffRole[] | ListEnumStaffRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumStaffRoleFilter<$PrismaModel> | $Enums.StaffRole
  }

  export type StaffCountOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    fullName?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    role?: SortOrder
    isAdmin?: SortOrder
    assignedOutletId?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StaffMaxOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    fullName?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    role?: SortOrder
    isAdmin?: SortOrder
    assignedOutletId?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StaffMinOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    fullName?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    role?: SortOrder
    isAdmin?: SortOrder
    assignedOutletId?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumStaffRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.StaffRole | EnumStaffRoleFieldRefInput<$PrismaModel>
    in?: $Enums.StaffRole[] | ListEnumStaffRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.StaffRole[] | ListEnumStaffRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumStaffRoleWithAggregatesFilter<$PrismaModel> | $Enums.StaffRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumStaffRoleFilter<$PrismaModel>
    _max?: NestedEnumStaffRoleFilter<$PrismaModel>
  }

  export type CustomerCreateNestedManyWithoutFirstVisitOutletInput = {
    create?: XOR<CustomerCreateWithoutFirstVisitOutletInput, CustomerUncheckedCreateWithoutFirstVisitOutletInput> | CustomerCreateWithoutFirstVisitOutletInput[] | CustomerUncheckedCreateWithoutFirstVisitOutletInput[]
    connectOrCreate?: CustomerCreateOrConnectWithoutFirstVisitOutletInput | CustomerCreateOrConnectWithoutFirstVisitOutletInput[]
    createMany?: CustomerCreateManyFirstVisitOutletInputEnvelope
    connect?: CustomerWhereUniqueInput | CustomerWhereUniqueInput[]
  }

  export type ReviewCreateNestedManyWithoutOutletInput = {
    create?: XOR<ReviewCreateWithoutOutletInput, ReviewUncheckedCreateWithoutOutletInput> | ReviewCreateWithoutOutletInput[] | ReviewUncheckedCreateWithoutOutletInput[]
    connectOrCreate?: ReviewCreateOrConnectWithoutOutletInput | ReviewCreateOrConnectWithoutOutletInput[]
    createMany?: ReviewCreateManyOutletInputEnvelope
    connect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
  }

  export type CustomerVisitCreateNestedManyWithoutOutletInput = {
    create?: XOR<CustomerVisitCreateWithoutOutletInput, CustomerVisitUncheckedCreateWithoutOutletInput> | CustomerVisitCreateWithoutOutletInput[] | CustomerVisitUncheckedCreateWithoutOutletInput[]
    connectOrCreate?: CustomerVisitCreateOrConnectWithoutOutletInput | CustomerVisitCreateOrConnectWithoutOutletInput[]
    createMany?: CustomerVisitCreateManyOutletInputEnvelope
    connect?: CustomerVisitWhereUniqueInput | CustomerVisitWhereUniqueInput[]
  }

  export type MenuCategoryCreateNestedManyWithoutOutletInput = {
    create?: XOR<MenuCategoryCreateWithoutOutletInput, MenuCategoryUncheckedCreateWithoutOutletInput> | MenuCategoryCreateWithoutOutletInput[] | MenuCategoryUncheckedCreateWithoutOutletInput[]
    connectOrCreate?: MenuCategoryCreateOrConnectWithoutOutletInput | MenuCategoryCreateOrConnectWithoutOutletInput[]
    createMany?: MenuCategoryCreateManyOutletInputEnvelope
    connect?: MenuCategoryWhereUniqueInput | MenuCategoryWhereUniqueInput[]
  }

  export type StaffCreateNestedManyWithoutAssignedOutletInput = {
    create?: XOR<StaffCreateWithoutAssignedOutletInput, StaffUncheckedCreateWithoutAssignedOutletInput> | StaffCreateWithoutAssignedOutletInput[] | StaffUncheckedCreateWithoutAssignedOutletInput[]
    connectOrCreate?: StaffCreateOrConnectWithoutAssignedOutletInput | StaffCreateOrConnectWithoutAssignedOutletInput[]
    createMany?: StaffCreateManyAssignedOutletInputEnvelope
    connect?: StaffWhereUniqueInput | StaffWhereUniqueInput[]
  }

  export type CustomerUncheckedCreateNestedManyWithoutFirstVisitOutletInput = {
    create?: XOR<CustomerCreateWithoutFirstVisitOutletInput, CustomerUncheckedCreateWithoutFirstVisitOutletInput> | CustomerCreateWithoutFirstVisitOutletInput[] | CustomerUncheckedCreateWithoutFirstVisitOutletInput[]
    connectOrCreate?: CustomerCreateOrConnectWithoutFirstVisitOutletInput | CustomerCreateOrConnectWithoutFirstVisitOutletInput[]
    createMany?: CustomerCreateManyFirstVisitOutletInputEnvelope
    connect?: CustomerWhereUniqueInput | CustomerWhereUniqueInput[]
  }

  export type ReviewUncheckedCreateNestedManyWithoutOutletInput = {
    create?: XOR<ReviewCreateWithoutOutletInput, ReviewUncheckedCreateWithoutOutletInput> | ReviewCreateWithoutOutletInput[] | ReviewUncheckedCreateWithoutOutletInput[]
    connectOrCreate?: ReviewCreateOrConnectWithoutOutletInput | ReviewCreateOrConnectWithoutOutletInput[]
    createMany?: ReviewCreateManyOutletInputEnvelope
    connect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
  }

  export type CustomerVisitUncheckedCreateNestedManyWithoutOutletInput = {
    create?: XOR<CustomerVisitCreateWithoutOutletInput, CustomerVisitUncheckedCreateWithoutOutletInput> | CustomerVisitCreateWithoutOutletInput[] | CustomerVisitUncheckedCreateWithoutOutletInput[]
    connectOrCreate?: CustomerVisitCreateOrConnectWithoutOutletInput | CustomerVisitCreateOrConnectWithoutOutletInput[]
    createMany?: CustomerVisitCreateManyOutletInputEnvelope
    connect?: CustomerVisitWhereUniqueInput | CustomerVisitWhereUniqueInput[]
  }

  export type MenuCategoryUncheckedCreateNestedManyWithoutOutletInput = {
    create?: XOR<MenuCategoryCreateWithoutOutletInput, MenuCategoryUncheckedCreateWithoutOutletInput> | MenuCategoryCreateWithoutOutletInput[] | MenuCategoryUncheckedCreateWithoutOutletInput[]
    connectOrCreate?: MenuCategoryCreateOrConnectWithoutOutletInput | MenuCategoryCreateOrConnectWithoutOutletInput[]
    createMany?: MenuCategoryCreateManyOutletInputEnvelope
    connect?: MenuCategoryWhereUniqueInput | MenuCategoryWhereUniqueInput[]
  }

  export type StaffUncheckedCreateNestedManyWithoutAssignedOutletInput = {
    create?: XOR<StaffCreateWithoutAssignedOutletInput, StaffUncheckedCreateWithoutAssignedOutletInput> | StaffCreateWithoutAssignedOutletInput[] | StaffUncheckedCreateWithoutAssignedOutletInput[]
    connectOrCreate?: StaffCreateOrConnectWithoutAssignedOutletInput | StaffCreateOrConnectWithoutAssignedOutletInput[]
    createMany?: StaffCreateManyAssignedOutletInputEnvelope
    connect?: StaffWhereUniqueInput | StaffWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type CustomerUpdateManyWithoutFirstVisitOutletNestedInput = {
    create?: XOR<CustomerCreateWithoutFirstVisitOutletInput, CustomerUncheckedCreateWithoutFirstVisitOutletInput> | CustomerCreateWithoutFirstVisitOutletInput[] | CustomerUncheckedCreateWithoutFirstVisitOutletInput[]
    connectOrCreate?: CustomerCreateOrConnectWithoutFirstVisitOutletInput | CustomerCreateOrConnectWithoutFirstVisitOutletInput[]
    upsert?: CustomerUpsertWithWhereUniqueWithoutFirstVisitOutletInput | CustomerUpsertWithWhereUniqueWithoutFirstVisitOutletInput[]
    createMany?: CustomerCreateManyFirstVisitOutletInputEnvelope
    set?: CustomerWhereUniqueInput | CustomerWhereUniqueInput[]
    disconnect?: CustomerWhereUniqueInput | CustomerWhereUniqueInput[]
    delete?: CustomerWhereUniqueInput | CustomerWhereUniqueInput[]
    connect?: CustomerWhereUniqueInput | CustomerWhereUniqueInput[]
    update?: CustomerUpdateWithWhereUniqueWithoutFirstVisitOutletInput | CustomerUpdateWithWhereUniqueWithoutFirstVisitOutletInput[]
    updateMany?: CustomerUpdateManyWithWhereWithoutFirstVisitOutletInput | CustomerUpdateManyWithWhereWithoutFirstVisitOutletInput[]
    deleteMany?: CustomerScalarWhereInput | CustomerScalarWhereInput[]
  }

  export type ReviewUpdateManyWithoutOutletNestedInput = {
    create?: XOR<ReviewCreateWithoutOutletInput, ReviewUncheckedCreateWithoutOutletInput> | ReviewCreateWithoutOutletInput[] | ReviewUncheckedCreateWithoutOutletInput[]
    connectOrCreate?: ReviewCreateOrConnectWithoutOutletInput | ReviewCreateOrConnectWithoutOutletInput[]
    upsert?: ReviewUpsertWithWhereUniqueWithoutOutletInput | ReviewUpsertWithWhereUniqueWithoutOutletInput[]
    createMany?: ReviewCreateManyOutletInputEnvelope
    set?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    disconnect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    delete?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    connect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    update?: ReviewUpdateWithWhereUniqueWithoutOutletInput | ReviewUpdateWithWhereUniqueWithoutOutletInput[]
    updateMany?: ReviewUpdateManyWithWhereWithoutOutletInput | ReviewUpdateManyWithWhereWithoutOutletInput[]
    deleteMany?: ReviewScalarWhereInput | ReviewScalarWhereInput[]
  }

  export type CustomerVisitUpdateManyWithoutOutletNestedInput = {
    create?: XOR<CustomerVisitCreateWithoutOutletInput, CustomerVisitUncheckedCreateWithoutOutletInput> | CustomerVisitCreateWithoutOutletInput[] | CustomerVisitUncheckedCreateWithoutOutletInput[]
    connectOrCreate?: CustomerVisitCreateOrConnectWithoutOutletInput | CustomerVisitCreateOrConnectWithoutOutletInput[]
    upsert?: CustomerVisitUpsertWithWhereUniqueWithoutOutletInput | CustomerVisitUpsertWithWhereUniqueWithoutOutletInput[]
    createMany?: CustomerVisitCreateManyOutletInputEnvelope
    set?: CustomerVisitWhereUniqueInput | CustomerVisitWhereUniqueInput[]
    disconnect?: CustomerVisitWhereUniqueInput | CustomerVisitWhereUniqueInput[]
    delete?: CustomerVisitWhereUniqueInput | CustomerVisitWhereUniqueInput[]
    connect?: CustomerVisitWhereUniqueInput | CustomerVisitWhereUniqueInput[]
    update?: CustomerVisitUpdateWithWhereUniqueWithoutOutletInput | CustomerVisitUpdateWithWhereUniqueWithoutOutletInput[]
    updateMany?: CustomerVisitUpdateManyWithWhereWithoutOutletInput | CustomerVisitUpdateManyWithWhereWithoutOutletInput[]
    deleteMany?: CustomerVisitScalarWhereInput | CustomerVisitScalarWhereInput[]
  }

  export type MenuCategoryUpdateManyWithoutOutletNestedInput = {
    create?: XOR<MenuCategoryCreateWithoutOutletInput, MenuCategoryUncheckedCreateWithoutOutletInput> | MenuCategoryCreateWithoutOutletInput[] | MenuCategoryUncheckedCreateWithoutOutletInput[]
    connectOrCreate?: MenuCategoryCreateOrConnectWithoutOutletInput | MenuCategoryCreateOrConnectWithoutOutletInput[]
    upsert?: MenuCategoryUpsertWithWhereUniqueWithoutOutletInput | MenuCategoryUpsertWithWhereUniqueWithoutOutletInput[]
    createMany?: MenuCategoryCreateManyOutletInputEnvelope
    set?: MenuCategoryWhereUniqueInput | MenuCategoryWhereUniqueInput[]
    disconnect?: MenuCategoryWhereUniqueInput | MenuCategoryWhereUniqueInput[]
    delete?: MenuCategoryWhereUniqueInput | MenuCategoryWhereUniqueInput[]
    connect?: MenuCategoryWhereUniqueInput | MenuCategoryWhereUniqueInput[]
    update?: MenuCategoryUpdateWithWhereUniqueWithoutOutletInput | MenuCategoryUpdateWithWhereUniqueWithoutOutletInput[]
    updateMany?: MenuCategoryUpdateManyWithWhereWithoutOutletInput | MenuCategoryUpdateManyWithWhereWithoutOutletInput[]
    deleteMany?: MenuCategoryScalarWhereInput | MenuCategoryScalarWhereInput[]
  }

  export type StaffUpdateManyWithoutAssignedOutletNestedInput = {
    create?: XOR<StaffCreateWithoutAssignedOutletInput, StaffUncheckedCreateWithoutAssignedOutletInput> | StaffCreateWithoutAssignedOutletInput[] | StaffUncheckedCreateWithoutAssignedOutletInput[]
    connectOrCreate?: StaffCreateOrConnectWithoutAssignedOutletInput | StaffCreateOrConnectWithoutAssignedOutletInput[]
    upsert?: StaffUpsertWithWhereUniqueWithoutAssignedOutletInput | StaffUpsertWithWhereUniqueWithoutAssignedOutletInput[]
    createMany?: StaffCreateManyAssignedOutletInputEnvelope
    set?: StaffWhereUniqueInput | StaffWhereUniqueInput[]
    disconnect?: StaffWhereUniqueInput | StaffWhereUniqueInput[]
    delete?: StaffWhereUniqueInput | StaffWhereUniqueInput[]
    connect?: StaffWhereUniqueInput | StaffWhereUniqueInput[]
    update?: StaffUpdateWithWhereUniqueWithoutAssignedOutletInput | StaffUpdateWithWhereUniqueWithoutAssignedOutletInput[]
    updateMany?: StaffUpdateManyWithWhereWithoutAssignedOutletInput | StaffUpdateManyWithWhereWithoutAssignedOutletInput[]
    deleteMany?: StaffScalarWhereInput | StaffScalarWhereInput[]
  }

  export type CustomerUncheckedUpdateManyWithoutFirstVisitOutletNestedInput = {
    create?: XOR<CustomerCreateWithoutFirstVisitOutletInput, CustomerUncheckedCreateWithoutFirstVisitOutletInput> | CustomerCreateWithoutFirstVisitOutletInput[] | CustomerUncheckedCreateWithoutFirstVisitOutletInput[]
    connectOrCreate?: CustomerCreateOrConnectWithoutFirstVisitOutletInput | CustomerCreateOrConnectWithoutFirstVisitOutletInput[]
    upsert?: CustomerUpsertWithWhereUniqueWithoutFirstVisitOutletInput | CustomerUpsertWithWhereUniqueWithoutFirstVisitOutletInput[]
    createMany?: CustomerCreateManyFirstVisitOutletInputEnvelope
    set?: CustomerWhereUniqueInput | CustomerWhereUniqueInput[]
    disconnect?: CustomerWhereUniqueInput | CustomerWhereUniqueInput[]
    delete?: CustomerWhereUniqueInput | CustomerWhereUniqueInput[]
    connect?: CustomerWhereUniqueInput | CustomerWhereUniqueInput[]
    update?: CustomerUpdateWithWhereUniqueWithoutFirstVisitOutletInput | CustomerUpdateWithWhereUniqueWithoutFirstVisitOutletInput[]
    updateMany?: CustomerUpdateManyWithWhereWithoutFirstVisitOutletInput | CustomerUpdateManyWithWhereWithoutFirstVisitOutletInput[]
    deleteMany?: CustomerScalarWhereInput | CustomerScalarWhereInput[]
  }

  export type ReviewUncheckedUpdateManyWithoutOutletNestedInput = {
    create?: XOR<ReviewCreateWithoutOutletInput, ReviewUncheckedCreateWithoutOutletInput> | ReviewCreateWithoutOutletInput[] | ReviewUncheckedCreateWithoutOutletInput[]
    connectOrCreate?: ReviewCreateOrConnectWithoutOutletInput | ReviewCreateOrConnectWithoutOutletInput[]
    upsert?: ReviewUpsertWithWhereUniqueWithoutOutletInput | ReviewUpsertWithWhereUniqueWithoutOutletInput[]
    createMany?: ReviewCreateManyOutletInputEnvelope
    set?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    disconnect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    delete?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    connect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    update?: ReviewUpdateWithWhereUniqueWithoutOutletInput | ReviewUpdateWithWhereUniqueWithoutOutletInput[]
    updateMany?: ReviewUpdateManyWithWhereWithoutOutletInput | ReviewUpdateManyWithWhereWithoutOutletInput[]
    deleteMany?: ReviewScalarWhereInput | ReviewScalarWhereInput[]
  }

  export type CustomerVisitUncheckedUpdateManyWithoutOutletNestedInput = {
    create?: XOR<CustomerVisitCreateWithoutOutletInput, CustomerVisitUncheckedCreateWithoutOutletInput> | CustomerVisitCreateWithoutOutletInput[] | CustomerVisitUncheckedCreateWithoutOutletInput[]
    connectOrCreate?: CustomerVisitCreateOrConnectWithoutOutletInput | CustomerVisitCreateOrConnectWithoutOutletInput[]
    upsert?: CustomerVisitUpsertWithWhereUniqueWithoutOutletInput | CustomerVisitUpsertWithWhereUniqueWithoutOutletInput[]
    createMany?: CustomerVisitCreateManyOutletInputEnvelope
    set?: CustomerVisitWhereUniqueInput | CustomerVisitWhereUniqueInput[]
    disconnect?: CustomerVisitWhereUniqueInput | CustomerVisitWhereUniqueInput[]
    delete?: CustomerVisitWhereUniqueInput | CustomerVisitWhereUniqueInput[]
    connect?: CustomerVisitWhereUniqueInput | CustomerVisitWhereUniqueInput[]
    update?: CustomerVisitUpdateWithWhereUniqueWithoutOutletInput | CustomerVisitUpdateWithWhereUniqueWithoutOutletInput[]
    updateMany?: CustomerVisitUpdateManyWithWhereWithoutOutletInput | CustomerVisitUpdateManyWithWhereWithoutOutletInput[]
    deleteMany?: CustomerVisitScalarWhereInput | CustomerVisitScalarWhereInput[]
  }

  export type MenuCategoryUncheckedUpdateManyWithoutOutletNestedInput = {
    create?: XOR<MenuCategoryCreateWithoutOutletInput, MenuCategoryUncheckedCreateWithoutOutletInput> | MenuCategoryCreateWithoutOutletInput[] | MenuCategoryUncheckedCreateWithoutOutletInput[]
    connectOrCreate?: MenuCategoryCreateOrConnectWithoutOutletInput | MenuCategoryCreateOrConnectWithoutOutletInput[]
    upsert?: MenuCategoryUpsertWithWhereUniqueWithoutOutletInput | MenuCategoryUpsertWithWhereUniqueWithoutOutletInput[]
    createMany?: MenuCategoryCreateManyOutletInputEnvelope
    set?: MenuCategoryWhereUniqueInput | MenuCategoryWhereUniqueInput[]
    disconnect?: MenuCategoryWhereUniqueInput | MenuCategoryWhereUniqueInput[]
    delete?: MenuCategoryWhereUniqueInput | MenuCategoryWhereUniqueInput[]
    connect?: MenuCategoryWhereUniqueInput | MenuCategoryWhereUniqueInput[]
    update?: MenuCategoryUpdateWithWhereUniqueWithoutOutletInput | MenuCategoryUpdateWithWhereUniqueWithoutOutletInput[]
    updateMany?: MenuCategoryUpdateManyWithWhereWithoutOutletInput | MenuCategoryUpdateManyWithWhereWithoutOutletInput[]
    deleteMany?: MenuCategoryScalarWhereInput | MenuCategoryScalarWhereInput[]
  }

  export type StaffUncheckedUpdateManyWithoutAssignedOutletNestedInput = {
    create?: XOR<StaffCreateWithoutAssignedOutletInput, StaffUncheckedCreateWithoutAssignedOutletInput> | StaffCreateWithoutAssignedOutletInput[] | StaffUncheckedCreateWithoutAssignedOutletInput[]
    connectOrCreate?: StaffCreateOrConnectWithoutAssignedOutletInput | StaffCreateOrConnectWithoutAssignedOutletInput[]
    upsert?: StaffUpsertWithWhereUniqueWithoutAssignedOutletInput | StaffUpsertWithWhereUniqueWithoutAssignedOutletInput[]
    createMany?: StaffCreateManyAssignedOutletInputEnvelope
    set?: StaffWhereUniqueInput | StaffWhereUniqueInput[]
    disconnect?: StaffWhereUniqueInput | StaffWhereUniqueInput[]
    delete?: StaffWhereUniqueInput | StaffWhereUniqueInput[]
    connect?: StaffWhereUniqueInput | StaffWhereUniqueInput[]
    update?: StaffUpdateWithWhereUniqueWithoutAssignedOutletInput | StaffUpdateWithWhereUniqueWithoutAssignedOutletInput[]
    updateMany?: StaffUpdateManyWithWhereWithoutAssignedOutletInput | StaffUpdateManyWithWhereWithoutAssignedOutletInput[]
    deleteMany?: StaffScalarWhereInput | StaffScalarWhereInput[]
  }

  export type OutletCreateNestedOneWithoutCustomersInput = {
    create?: XOR<OutletCreateWithoutCustomersInput, OutletUncheckedCreateWithoutCustomersInput>
    connectOrCreate?: OutletCreateOrConnectWithoutCustomersInput
    connect?: OutletWhereUniqueInput
  }

  export type ReviewCreateNestedManyWithoutCustomerInput = {
    create?: XOR<ReviewCreateWithoutCustomerInput, ReviewUncheckedCreateWithoutCustomerInput> | ReviewCreateWithoutCustomerInput[] | ReviewUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: ReviewCreateOrConnectWithoutCustomerInput | ReviewCreateOrConnectWithoutCustomerInput[]
    createMany?: ReviewCreateManyCustomerInputEnvelope
    connect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
  }

  export type CustomerVisitCreateNestedManyWithoutCustomerInput = {
    create?: XOR<CustomerVisitCreateWithoutCustomerInput, CustomerVisitUncheckedCreateWithoutCustomerInput> | CustomerVisitCreateWithoutCustomerInput[] | CustomerVisitUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: CustomerVisitCreateOrConnectWithoutCustomerInput | CustomerVisitCreateOrConnectWithoutCustomerInput[]
    createMany?: CustomerVisitCreateManyCustomerInputEnvelope
    connect?: CustomerVisitWhereUniqueInput | CustomerVisitWhereUniqueInput[]
  }

  export type AutomationLogCreateNestedManyWithoutCustomerInput = {
    create?: XOR<AutomationLogCreateWithoutCustomerInput, AutomationLogUncheckedCreateWithoutCustomerInput> | AutomationLogCreateWithoutCustomerInput[] | AutomationLogUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: AutomationLogCreateOrConnectWithoutCustomerInput | AutomationLogCreateOrConnectWithoutCustomerInput[]
    createMany?: AutomationLogCreateManyCustomerInputEnvelope
    connect?: AutomationLogWhereUniqueInput | AutomationLogWhereUniqueInput[]
  }

  export type ReviewUncheckedCreateNestedManyWithoutCustomerInput = {
    create?: XOR<ReviewCreateWithoutCustomerInput, ReviewUncheckedCreateWithoutCustomerInput> | ReviewCreateWithoutCustomerInput[] | ReviewUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: ReviewCreateOrConnectWithoutCustomerInput | ReviewCreateOrConnectWithoutCustomerInput[]
    createMany?: ReviewCreateManyCustomerInputEnvelope
    connect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
  }

  export type CustomerVisitUncheckedCreateNestedManyWithoutCustomerInput = {
    create?: XOR<CustomerVisitCreateWithoutCustomerInput, CustomerVisitUncheckedCreateWithoutCustomerInput> | CustomerVisitCreateWithoutCustomerInput[] | CustomerVisitUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: CustomerVisitCreateOrConnectWithoutCustomerInput | CustomerVisitCreateOrConnectWithoutCustomerInput[]
    createMany?: CustomerVisitCreateManyCustomerInputEnvelope
    connect?: CustomerVisitWhereUniqueInput | CustomerVisitWhereUniqueInput[]
  }

  export type AutomationLogUncheckedCreateNestedManyWithoutCustomerInput = {
    create?: XOR<AutomationLogCreateWithoutCustomerInput, AutomationLogUncheckedCreateWithoutCustomerInput> | AutomationLogCreateWithoutCustomerInput[] | AutomationLogUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: AutomationLogCreateOrConnectWithoutCustomerInput | AutomationLogCreateOrConnectWithoutCustomerInput[]
    createMany?: AutomationLogCreateManyCustomerInputEnvelope
    connect?: AutomationLogWhereUniqueInput | AutomationLogWhereUniqueInput[]
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type EnumGenderFieldUpdateOperationsInput = {
    set?: $Enums.Gender
  }

  export type EnumMaritalStatusFieldUpdateOperationsInput = {
    set?: $Enums.MaritalStatus
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type OutletUpdateOneWithoutCustomersNestedInput = {
    create?: XOR<OutletCreateWithoutCustomersInput, OutletUncheckedCreateWithoutCustomersInput>
    connectOrCreate?: OutletCreateOrConnectWithoutCustomersInput
    upsert?: OutletUpsertWithoutCustomersInput
    disconnect?: OutletWhereInput | boolean
    delete?: OutletWhereInput | boolean
    connect?: OutletWhereUniqueInput
    update?: XOR<XOR<OutletUpdateToOneWithWhereWithoutCustomersInput, OutletUpdateWithoutCustomersInput>, OutletUncheckedUpdateWithoutCustomersInput>
  }

  export type ReviewUpdateManyWithoutCustomerNestedInput = {
    create?: XOR<ReviewCreateWithoutCustomerInput, ReviewUncheckedCreateWithoutCustomerInput> | ReviewCreateWithoutCustomerInput[] | ReviewUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: ReviewCreateOrConnectWithoutCustomerInput | ReviewCreateOrConnectWithoutCustomerInput[]
    upsert?: ReviewUpsertWithWhereUniqueWithoutCustomerInput | ReviewUpsertWithWhereUniqueWithoutCustomerInput[]
    createMany?: ReviewCreateManyCustomerInputEnvelope
    set?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    disconnect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    delete?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    connect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    update?: ReviewUpdateWithWhereUniqueWithoutCustomerInput | ReviewUpdateWithWhereUniqueWithoutCustomerInput[]
    updateMany?: ReviewUpdateManyWithWhereWithoutCustomerInput | ReviewUpdateManyWithWhereWithoutCustomerInput[]
    deleteMany?: ReviewScalarWhereInput | ReviewScalarWhereInput[]
  }

  export type CustomerVisitUpdateManyWithoutCustomerNestedInput = {
    create?: XOR<CustomerVisitCreateWithoutCustomerInput, CustomerVisitUncheckedCreateWithoutCustomerInput> | CustomerVisitCreateWithoutCustomerInput[] | CustomerVisitUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: CustomerVisitCreateOrConnectWithoutCustomerInput | CustomerVisitCreateOrConnectWithoutCustomerInput[]
    upsert?: CustomerVisitUpsertWithWhereUniqueWithoutCustomerInput | CustomerVisitUpsertWithWhereUniqueWithoutCustomerInput[]
    createMany?: CustomerVisitCreateManyCustomerInputEnvelope
    set?: CustomerVisitWhereUniqueInput | CustomerVisitWhereUniqueInput[]
    disconnect?: CustomerVisitWhereUniqueInput | CustomerVisitWhereUniqueInput[]
    delete?: CustomerVisitWhereUniqueInput | CustomerVisitWhereUniqueInput[]
    connect?: CustomerVisitWhereUniqueInput | CustomerVisitWhereUniqueInput[]
    update?: CustomerVisitUpdateWithWhereUniqueWithoutCustomerInput | CustomerVisitUpdateWithWhereUniqueWithoutCustomerInput[]
    updateMany?: CustomerVisitUpdateManyWithWhereWithoutCustomerInput | CustomerVisitUpdateManyWithWhereWithoutCustomerInput[]
    deleteMany?: CustomerVisitScalarWhereInput | CustomerVisitScalarWhereInput[]
  }

  export type AutomationLogUpdateManyWithoutCustomerNestedInput = {
    create?: XOR<AutomationLogCreateWithoutCustomerInput, AutomationLogUncheckedCreateWithoutCustomerInput> | AutomationLogCreateWithoutCustomerInput[] | AutomationLogUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: AutomationLogCreateOrConnectWithoutCustomerInput | AutomationLogCreateOrConnectWithoutCustomerInput[]
    upsert?: AutomationLogUpsertWithWhereUniqueWithoutCustomerInput | AutomationLogUpsertWithWhereUniqueWithoutCustomerInput[]
    createMany?: AutomationLogCreateManyCustomerInputEnvelope
    set?: AutomationLogWhereUniqueInput | AutomationLogWhereUniqueInput[]
    disconnect?: AutomationLogWhereUniqueInput | AutomationLogWhereUniqueInput[]
    delete?: AutomationLogWhereUniqueInput | AutomationLogWhereUniqueInput[]
    connect?: AutomationLogWhereUniqueInput | AutomationLogWhereUniqueInput[]
    update?: AutomationLogUpdateWithWhereUniqueWithoutCustomerInput | AutomationLogUpdateWithWhereUniqueWithoutCustomerInput[]
    updateMany?: AutomationLogUpdateManyWithWhereWithoutCustomerInput | AutomationLogUpdateManyWithWhereWithoutCustomerInput[]
    deleteMany?: AutomationLogScalarWhereInput | AutomationLogScalarWhereInput[]
  }

  export type ReviewUncheckedUpdateManyWithoutCustomerNestedInput = {
    create?: XOR<ReviewCreateWithoutCustomerInput, ReviewUncheckedCreateWithoutCustomerInput> | ReviewCreateWithoutCustomerInput[] | ReviewUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: ReviewCreateOrConnectWithoutCustomerInput | ReviewCreateOrConnectWithoutCustomerInput[]
    upsert?: ReviewUpsertWithWhereUniqueWithoutCustomerInput | ReviewUpsertWithWhereUniqueWithoutCustomerInput[]
    createMany?: ReviewCreateManyCustomerInputEnvelope
    set?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    disconnect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    delete?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    connect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    update?: ReviewUpdateWithWhereUniqueWithoutCustomerInput | ReviewUpdateWithWhereUniqueWithoutCustomerInput[]
    updateMany?: ReviewUpdateManyWithWhereWithoutCustomerInput | ReviewUpdateManyWithWhereWithoutCustomerInput[]
    deleteMany?: ReviewScalarWhereInput | ReviewScalarWhereInput[]
  }

  export type CustomerVisitUncheckedUpdateManyWithoutCustomerNestedInput = {
    create?: XOR<CustomerVisitCreateWithoutCustomerInput, CustomerVisitUncheckedCreateWithoutCustomerInput> | CustomerVisitCreateWithoutCustomerInput[] | CustomerVisitUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: CustomerVisitCreateOrConnectWithoutCustomerInput | CustomerVisitCreateOrConnectWithoutCustomerInput[]
    upsert?: CustomerVisitUpsertWithWhereUniqueWithoutCustomerInput | CustomerVisitUpsertWithWhereUniqueWithoutCustomerInput[]
    createMany?: CustomerVisitCreateManyCustomerInputEnvelope
    set?: CustomerVisitWhereUniqueInput | CustomerVisitWhereUniqueInput[]
    disconnect?: CustomerVisitWhereUniqueInput | CustomerVisitWhereUniqueInput[]
    delete?: CustomerVisitWhereUniqueInput | CustomerVisitWhereUniqueInput[]
    connect?: CustomerVisitWhereUniqueInput | CustomerVisitWhereUniqueInput[]
    update?: CustomerVisitUpdateWithWhereUniqueWithoutCustomerInput | CustomerVisitUpdateWithWhereUniqueWithoutCustomerInput[]
    updateMany?: CustomerVisitUpdateManyWithWhereWithoutCustomerInput | CustomerVisitUpdateManyWithWhereWithoutCustomerInput[]
    deleteMany?: CustomerVisitScalarWhereInput | CustomerVisitScalarWhereInput[]
  }

  export type AutomationLogUncheckedUpdateManyWithoutCustomerNestedInput = {
    create?: XOR<AutomationLogCreateWithoutCustomerInput, AutomationLogUncheckedCreateWithoutCustomerInput> | AutomationLogCreateWithoutCustomerInput[] | AutomationLogUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: AutomationLogCreateOrConnectWithoutCustomerInput | AutomationLogCreateOrConnectWithoutCustomerInput[]
    upsert?: AutomationLogUpsertWithWhereUniqueWithoutCustomerInput | AutomationLogUpsertWithWhereUniqueWithoutCustomerInput[]
    createMany?: AutomationLogCreateManyCustomerInputEnvelope
    set?: AutomationLogWhereUniqueInput | AutomationLogWhereUniqueInput[]
    disconnect?: AutomationLogWhereUniqueInput | AutomationLogWhereUniqueInput[]
    delete?: AutomationLogWhereUniqueInput | AutomationLogWhereUniqueInput[]
    connect?: AutomationLogWhereUniqueInput | AutomationLogWhereUniqueInput[]
    update?: AutomationLogUpdateWithWhereUniqueWithoutCustomerInput | AutomationLogUpdateWithWhereUniqueWithoutCustomerInput[]
    updateMany?: AutomationLogUpdateManyWithWhereWithoutCustomerInput | AutomationLogUpdateManyWithWhereWithoutCustomerInput[]
    deleteMany?: AutomationLogScalarWhereInput | AutomationLogScalarWhereInput[]
  }

  export type CustomerCreateNestedOneWithoutReviewsInput = {
    create?: XOR<CustomerCreateWithoutReviewsInput, CustomerUncheckedCreateWithoutReviewsInput>
    connectOrCreate?: CustomerCreateOrConnectWithoutReviewsInput
    connect?: CustomerWhereUniqueInput
  }

  export type OutletCreateNestedOneWithoutReviewsInput = {
    create?: XOR<OutletCreateWithoutReviewsInput, OutletUncheckedCreateWithoutReviewsInput>
    connectOrCreate?: OutletCreateOrConnectWithoutReviewsInput
    connect?: OutletWhereUniqueInput
  }

  export type EnumReviewTypeFieldUpdateOperationsInput = {
    set?: $Enums.ReviewType
  }

  export type CustomerUpdateOneWithoutReviewsNestedInput = {
    create?: XOR<CustomerCreateWithoutReviewsInput, CustomerUncheckedCreateWithoutReviewsInput>
    connectOrCreate?: CustomerCreateOrConnectWithoutReviewsInput
    upsert?: CustomerUpsertWithoutReviewsInput
    disconnect?: CustomerWhereInput | boolean
    delete?: CustomerWhereInput | boolean
    connect?: CustomerWhereUniqueInput
    update?: XOR<XOR<CustomerUpdateToOneWithWhereWithoutReviewsInput, CustomerUpdateWithoutReviewsInput>, CustomerUncheckedUpdateWithoutReviewsInput>
  }

  export type OutletUpdateOneRequiredWithoutReviewsNestedInput = {
    create?: XOR<OutletCreateWithoutReviewsInput, OutletUncheckedCreateWithoutReviewsInput>
    connectOrCreate?: OutletCreateOrConnectWithoutReviewsInput
    upsert?: OutletUpsertWithoutReviewsInput
    connect?: OutletWhereUniqueInput
    update?: XOR<XOR<OutletUpdateToOneWithWhereWithoutReviewsInput, OutletUpdateWithoutReviewsInput>, OutletUncheckedUpdateWithoutReviewsInput>
  }

  export type CustomerCreateNestedOneWithoutVisitsInput = {
    create?: XOR<CustomerCreateWithoutVisitsInput, CustomerUncheckedCreateWithoutVisitsInput>
    connectOrCreate?: CustomerCreateOrConnectWithoutVisitsInput
    connect?: CustomerWhereUniqueInput
  }

  export type OutletCreateNestedOneWithoutVisitsInput = {
    create?: XOR<OutletCreateWithoutVisitsInput, OutletUncheckedCreateWithoutVisitsInput>
    connectOrCreate?: OutletCreateOrConnectWithoutVisitsInput
    connect?: OutletWhereUniqueInput
  }

  export type EnumVisitTypeFieldUpdateOperationsInput = {
    set?: $Enums.VisitType
  }

  export type CustomerUpdateOneWithoutVisitsNestedInput = {
    create?: XOR<CustomerCreateWithoutVisitsInput, CustomerUncheckedCreateWithoutVisitsInput>
    connectOrCreate?: CustomerCreateOrConnectWithoutVisitsInput
    upsert?: CustomerUpsertWithoutVisitsInput
    disconnect?: CustomerWhereInput | boolean
    delete?: CustomerWhereInput | boolean
    connect?: CustomerWhereUniqueInput
    update?: XOR<XOR<CustomerUpdateToOneWithWhereWithoutVisitsInput, CustomerUpdateWithoutVisitsInput>, CustomerUncheckedUpdateWithoutVisitsInput>
  }

  export type OutletUpdateOneRequiredWithoutVisitsNestedInput = {
    create?: XOR<OutletCreateWithoutVisitsInput, OutletUncheckedCreateWithoutVisitsInput>
    connectOrCreate?: OutletCreateOrConnectWithoutVisitsInput
    upsert?: OutletUpsertWithoutVisitsInput
    connect?: OutletWhereUniqueInput
    update?: XOR<XOR<OutletUpdateToOneWithWhereWithoutVisitsInput, OutletUpdateWithoutVisitsInput>, OutletUncheckedUpdateWithoutVisitsInput>
  }

  export type OutletCreateNestedOneWithoutMenuCategoriesInput = {
    create?: XOR<OutletCreateWithoutMenuCategoriesInput, OutletUncheckedCreateWithoutMenuCategoriesInput>
    connectOrCreate?: OutletCreateOrConnectWithoutMenuCategoriesInput
    connect?: OutletWhereUniqueInput
  }

  export type MenuItemCreateNestedManyWithoutCategoryInput = {
    create?: XOR<MenuItemCreateWithoutCategoryInput, MenuItemUncheckedCreateWithoutCategoryInput> | MenuItemCreateWithoutCategoryInput[] | MenuItemUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: MenuItemCreateOrConnectWithoutCategoryInput | MenuItemCreateOrConnectWithoutCategoryInput[]
    createMany?: MenuItemCreateManyCategoryInputEnvelope
    connect?: MenuItemWhereUniqueInput | MenuItemWhereUniqueInput[]
  }

  export type MenuItemUncheckedCreateNestedManyWithoutCategoryInput = {
    create?: XOR<MenuItemCreateWithoutCategoryInput, MenuItemUncheckedCreateWithoutCategoryInput> | MenuItemCreateWithoutCategoryInput[] | MenuItemUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: MenuItemCreateOrConnectWithoutCategoryInput | MenuItemCreateOrConnectWithoutCategoryInput[]
    createMany?: MenuItemCreateManyCategoryInputEnvelope
    connect?: MenuItemWhereUniqueInput | MenuItemWhereUniqueInput[]
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type OutletUpdateOneWithoutMenuCategoriesNestedInput = {
    create?: XOR<OutletCreateWithoutMenuCategoriesInput, OutletUncheckedCreateWithoutMenuCategoriesInput>
    connectOrCreate?: OutletCreateOrConnectWithoutMenuCategoriesInput
    upsert?: OutletUpsertWithoutMenuCategoriesInput
    disconnect?: OutletWhereInput | boolean
    delete?: OutletWhereInput | boolean
    connect?: OutletWhereUniqueInput
    update?: XOR<XOR<OutletUpdateToOneWithWhereWithoutMenuCategoriesInput, OutletUpdateWithoutMenuCategoriesInput>, OutletUncheckedUpdateWithoutMenuCategoriesInput>
  }

  export type MenuItemUpdateManyWithoutCategoryNestedInput = {
    create?: XOR<MenuItemCreateWithoutCategoryInput, MenuItemUncheckedCreateWithoutCategoryInput> | MenuItemCreateWithoutCategoryInput[] | MenuItemUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: MenuItemCreateOrConnectWithoutCategoryInput | MenuItemCreateOrConnectWithoutCategoryInput[]
    upsert?: MenuItemUpsertWithWhereUniqueWithoutCategoryInput | MenuItemUpsertWithWhereUniqueWithoutCategoryInput[]
    createMany?: MenuItemCreateManyCategoryInputEnvelope
    set?: MenuItemWhereUniqueInput | MenuItemWhereUniqueInput[]
    disconnect?: MenuItemWhereUniqueInput | MenuItemWhereUniqueInput[]
    delete?: MenuItemWhereUniqueInput | MenuItemWhereUniqueInput[]
    connect?: MenuItemWhereUniqueInput | MenuItemWhereUniqueInput[]
    update?: MenuItemUpdateWithWhereUniqueWithoutCategoryInput | MenuItemUpdateWithWhereUniqueWithoutCategoryInput[]
    updateMany?: MenuItemUpdateManyWithWhereWithoutCategoryInput | MenuItemUpdateManyWithWhereWithoutCategoryInput[]
    deleteMany?: MenuItemScalarWhereInput | MenuItemScalarWhereInput[]
  }

  export type MenuItemUncheckedUpdateManyWithoutCategoryNestedInput = {
    create?: XOR<MenuItemCreateWithoutCategoryInput, MenuItemUncheckedCreateWithoutCategoryInput> | MenuItemCreateWithoutCategoryInput[] | MenuItemUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: MenuItemCreateOrConnectWithoutCategoryInput | MenuItemCreateOrConnectWithoutCategoryInput[]
    upsert?: MenuItemUpsertWithWhereUniqueWithoutCategoryInput | MenuItemUpsertWithWhereUniqueWithoutCategoryInput[]
    createMany?: MenuItemCreateManyCategoryInputEnvelope
    set?: MenuItemWhereUniqueInput | MenuItemWhereUniqueInput[]
    disconnect?: MenuItemWhereUniqueInput | MenuItemWhereUniqueInput[]
    delete?: MenuItemWhereUniqueInput | MenuItemWhereUniqueInput[]
    connect?: MenuItemWhereUniqueInput | MenuItemWhereUniqueInput[]
    update?: MenuItemUpdateWithWhereUniqueWithoutCategoryInput | MenuItemUpdateWithWhereUniqueWithoutCategoryInput[]
    updateMany?: MenuItemUpdateManyWithWhereWithoutCategoryInput | MenuItemUpdateManyWithWhereWithoutCategoryInput[]
    deleteMany?: MenuItemScalarWhereInput | MenuItemScalarWhereInput[]
  }

  export type MenuCategoryCreateNestedOneWithoutItemsInput = {
    create?: XOR<MenuCategoryCreateWithoutItemsInput, MenuCategoryUncheckedCreateWithoutItemsInput>
    connectOrCreate?: MenuCategoryCreateOrConnectWithoutItemsInput
    connect?: MenuCategoryWhereUniqueInput
  }

  export type NullableDecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string | null
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type MenuCategoryUpdateOneRequiredWithoutItemsNestedInput = {
    create?: XOR<MenuCategoryCreateWithoutItemsInput, MenuCategoryUncheckedCreateWithoutItemsInput>
    connectOrCreate?: MenuCategoryCreateOrConnectWithoutItemsInput
    upsert?: MenuCategoryUpsertWithoutItemsInput
    connect?: MenuCategoryWhereUniqueInput
    update?: XOR<XOR<MenuCategoryUpdateToOneWithWhereWithoutItemsInput, MenuCategoryUpdateWithoutItemsInput>, MenuCategoryUncheckedUpdateWithoutItemsInput>
  }

  export type CustomerCreateNestedOneWithoutAutomationLogsInput = {
    create?: XOR<CustomerCreateWithoutAutomationLogsInput, CustomerUncheckedCreateWithoutAutomationLogsInput>
    connectOrCreate?: CustomerCreateOrConnectWithoutAutomationLogsInput
    connect?: CustomerWhereUniqueInput
  }

  export type EnumAutomationTypeFieldUpdateOperationsInput = {
    set?: $Enums.AutomationType
  }

  export type EnumMessageStageFieldUpdateOperationsInput = {
    set?: $Enums.MessageStage
  }

  export type EnumAutomationStatusFieldUpdateOperationsInput = {
    set?: $Enums.AutomationStatus
  }

  export type CustomerUpdateOneWithoutAutomationLogsNestedInput = {
    create?: XOR<CustomerCreateWithoutAutomationLogsInput, CustomerUncheckedCreateWithoutAutomationLogsInput>
    connectOrCreate?: CustomerCreateOrConnectWithoutAutomationLogsInput
    upsert?: CustomerUpsertWithoutAutomationLogsInput
    disconnect?: CustomerWhereInput | boolean
    delete?: CustomerWhereInput | boolean
    connect?: CustomerWhereUniqueInput
    update?: XOR<XOR<CustomerUpdateToOneWithWhereWithoutAutomationLogsInput, CustomerUpdateWithoutAutomationLogsInput>, CustomerUncheckedUpdateWithoutAutomationLogsInput>
  }

  export type OutletCreateNestedOneWithoutStaffInput = {
    create?: XOR<OutletCreateWithoutStaffInput, OutletUncheckedCreateWithoutStaffInput>
    connectOrCreate?: OutletCreateOrConnectWithoutStaffInput
    connect?: OutletWhereUniqueInput
  }

  export type EnumStaffRoleFieldUpdateOperationsInput = {
    set?: $Enums.StaffRole
  }

  export type OutletUpdateOneWithoutStaffNestedInput = {
    create?: XOR<OutletCreateWithoutStaffInput, OutletUncheckedCreateWithoutStaffInput>
    connectOrCreate?: OutletCreateOrConnectWithoutStaffInput
    upsert?: OutletUpsertWithoutStaffInput
    disconnect?: OutletWhereInput | boolean
    delete?: OutletWhereInput | boolean
    connect?: OutletWhereUniqueInput
    update?: XOR<XOR<OutletUpdateToOneWithWhereWithoutStaffInput, OutletUpdateWithoutStaffInput>, OutletUncheckedUpdateWithoutStaffInput>
  }

  export type NestedUuidFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidFilter<$PrismaModel> | string
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedUuidWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedEnumGenderFilter<$PrismaModel = never> = {
    equals?: $Enums.Gender | EnumGenderFieldRefInput<$PrismaModel>
    in?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel>
    notIn?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel>
    not?: NestedEnumGenderFilter<$PrismaModel> | $Enums.Gender
  }

  export type NestedEnumMaritalStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.MaritalStatus | EnumMaritalStatusFieldRefInput<$PrismaModel>
    in?: $Enums.MaritalStatus[] | ListEnumMaritalStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.MaritalStatus[] | ListEnumMaritalStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumMaritalStatusFilter<$PrismaModel> | $Enums.MaritalStatus
  }

  export type NestedUuidNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedEnumGenderWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Gender | EnumGenderFieldRefInput<$PrismaModel>
    in?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel>
    notIn?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel>
    not?: NestedEnumGenderWithAggregatesFilter<$PrismaModel> | $Enums.Gender
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumGenderFilter<$PrismaModel>
    _max?: NestedEnumGenderFilter<$PrismaModel>
  }

  export type NestedEnumMaritalStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.MaritalStatus | EnumMaritalStatusFieldRefInput<$PrismaModel>
    in?: $Enums.MaritalStatus[] | ListEnumMaritalStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.MaritalStatus[] | ListEnumMaritalStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumMaritalStatusWithAggregatesFilter<$PrismaModel> | $Enums.MaritalStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumMaritalStatusFilter<$PrismaModel>
    _max?: NestedEnumMaritalStatusFilter<$PrismaModel>
  }

  export type NestedUuidNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedEnumReviewTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.ReviewType | EnumReviewTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ReviewType[] | ListEnumReviewTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ReviewType[] | ListEnumReviewTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumReviewTypeFilter<$PrismaModel> | $Enums.ReviewType
  }

  export type NestedEnumReviewTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ReviewType | EnumReviewTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ReviewType[] | ListEnumReviewTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ReviewType[] | ListEnumReviewTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumReviewTypeWithAggregatesFilter<$PrismaModel> | $Enums.ReviewType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumReviewTypeFilter<$PrismaModel>
    _max?: NestedEnumReviewTypeFilter<$PrismaModel>
  }

  export type NestedEnumVisitTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.VisitType | EnumVisitTypeFieldRefInput<$PrismaModel>
    in?: $Enums.VisitType[] | ListEnumVisitTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.VisitType[] | ListEnumVisitTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumVisitTypeFilter<$PrismaModel> | $Enums.VisitType
  }

  export type NestedEnumVisitTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.VisitType | EnumVisitTypeFieldRefInput<$PrismaModel>
    in?: $Enums.VisitType[] | ListEnumVisitTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.VisitType[] | ListEnumVisitTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumVisitTypeWithAggregatesFilter<$PrismaModel> | $Enums.VisitType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumVisitTypeFilter<$PrismaModel>
    _max?: NestedEnumVisitTypeFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDecimalNullableFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
  }

  export type NestedDecimalNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedDecimalNullableFilter<$PrismaModel>
    _sum?: NestedDecimalNullableFilter<$PrismaModel>
    _min?: NestedDecimalNullableFilter<$PrismaModel>
    _max?: NestedDecimalNullableFilter<$PrismaModel>
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedEnumAutomationTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.AutomationType | EnumAutomationTypeFieldRefInput<$PrismaModel>
    in?: $Enums.AutomationType[] | ListEnumAutomationTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.AutomationType[] | ListEnumAutomationTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumAutomationTypeFilter<$PrismaModel> | $Enums.AutomationType
  }

  export type NestedEnumMessageStageFilter<$PrismaModel = never> = {
    equals?: $Enums.MessageStage | EnumMessageStageFieldRefInput<$PrismaModel>
    in?: $Enums.MessageStage[] | ListEnumMessageStageFieldRefInput<$PrismaModel>
    notIn?: $Enums.MessageStage[] | ListEnumMessageStageFieldRefInput<$PrismaModel>
    not?: NestedEnumMessageStageFilter<$PrismaModel> | $Enums.MessageStage
  }

  export type NestedEnumAutomationStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.AutomationStatus | EnumAutomationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AutomationStatus[] | ListEnumAutomationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.AutomationStatus[] | ListEnumAutomationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumAutomationStatusFilter<$PrismaModel> | $Enums.AutomationStatus
  }

  export type NestedEnumAutomationTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AutomationType | EnumAutomationTypeFieldRefInput<$PrismaModel>
    in?: $Enums.AutomationType[] | ListEnumAutomationTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.AutomationType[] | ListEnumAutomationTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumAutomationTypeWithAggregatesFilter<$PrismaModel> | $Enums.AutomationType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAutomationTypeFilter<$PrismaModel>
    _max?: NestedEnumAutomationTypeFilter<$PrismaModel>
  }

  export type NestedEnumMessageStageWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.MessageStage | EnumMessageStageFieldRefInput<$PrismaModel>
    in?: $Enums.MessageStage[] | ListEnumMessageStageFieldRefInput<$PrismaModel>
    notIn?: $Enums.MessageStage[] | ListEnumMessageStageFieldRefInput<$PrismaModel>
    not?: NestedEnumMessageStageWithAggregatesFilter<$PrismaModel> | $Enums.MessageStage
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumMessageStageFilter<$PrismaModel>
    _max?: NestedEnumMessageStageFilter<$PrismaModel>
  }

  export type NestedEnumAutomationStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AutomationStatus | EnumAutomationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AutomationStatus[] | ListEnumAutomationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.AutomationStatus[] | ListEnumAutomationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumAutomationStatusWithAggregatesFilter<$PrismaModel> | $Enums.AutomationStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAutomationStatusFilter<$PrismaModel>
    _max?: NestedEnumAutomationStatusFilter<$PrismaModel>
  }

  export type NestedEnumStaffRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.StaffRole | EnumStaffRoleFieldRefInput<$PrismaModel>
    in?: $Enums.StaffRole[] | ListEnumStaffRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.StaffRole[] | ListEnumStaffRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumStaffRoleFilter<$PrismaModel> | $Enums.StaffRole
  }

  export type NestedEnumStaffRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.StaffRole | EnumStaffRoleFieldRefInput<$PrismaModel>
    in?: $Enums.StaffRole[] | ListEnumStaffRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.StaffRole[] | ListEnumStaffRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumStaffRoleWithAggregatesFilter<$PrismaModel> | $Enums.StaffRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumStaffRoleFilter<$PrismaModel>
    _max?: NestedEnumStaffRoleFilter<$PrismaModel>
  }

  export type CustomerCreateWithoutFirstVisitOutletInput = {
    id?: string
    deviceId: string
    fullName: string
    phone: string
    email?: string | null
    birthDate: Date | string
    anniversaryDate?: Date | string | null
    gender: $Enums.Gender
    maritalStatus: $Enums.MaritalStatus
    lastVisitDate?: Date | string | null
    totalVisits?: number
    hasSubmittedFirstReview?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    reviews?: ReviewCreateNestedManyWithoutCustomerInput
    visits?: CustomerVisitCreateNestedManyWithoutCustomerInput
    automationLogs?: AutomationLogCreateNestedManyWithoutCustomerInput
  }

  export type CustomerUncheckedCreateWithoutFirstVisitOutletInput = {
    id?: string
    deviceId: string
    fullName: string
    phone: string
    email?: string | null
    birthDate: Date | string
    anniversaryDate?: Date | string | null
    gender: $Enums.Gender
    maritalStatus: $Enums.MaritalStatus
    lastVisitDate?: Date | string | null
    totalVisits?: number
    hasSubmittedFirstReview?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    reviews?: ReviewUncheckedCreateNestedManyWithoutCustomerInput
    visits?: CustomerVisitUncheckedCreateNestedManyWithoutCustomerInput
    automationLogs?: AutomationLogUncheckedCreateNestedManyWithoutCustomerInput
  }

  export type CustomerCreateOrConnectWithoutFirstVisitOutletInput = {
    where: CustomerWhereUniqueInput
    create: XOR<CustomerCreateWithoutFirstVisitOutletInput, CustomerUncheckedCreateWithoutFirstVisitOutletInput>
  }

  export type CustomerCreateManyFirstVisitOutletInputEnvelope = {
    data: CustomerCreateManyFirstVisitOutletInput | CustomerCreateManyFirstVisitOutletInput[]
    skipDuplicates?: boolean
  }

  export type ReviewCreateWithoutOutletInput = {
    id?: string
    reviewText?: string | null
    stars: number
    reviewType: $Enums.ReviewType
    postedToGoogle?: boolean
    isVisible?: boolean
    createdAt?: Date | string
    customer?: CustomerCreateNestedOneWithoutReviewsInput
  }

  export type ReviewUncheckedCreateWithoutOutletInput = {
    id?: string
    customerId?: string | null
    reviewText?: string | null
    stars: number
    reviewType: $Enums.ReviewType
    postedToGoogle?: boolean
    isVisible?: boolean
    createdAt?: Date | string
  }

  export type ReviewCreateOrConnectWithoutOutletInput = {
    where: ReviewWhereUniqueInput
    create: XOR<ReviewCreateWithoutOutletInput, ReviewUncheckedCreateWithoutOutletInput>
  }

  export type ReviewCreateManyOutletInputEnvelope = {
    data: ReviewCreateManyOutletInput | ReviewCreateManyOutletInput[]
    skipDuplicates?: boolean
  }

  export type CustomerVisitCreateWithoutOutletInput = {
    id?: string
    deviceId: string
    visitType?: $Enums.VisitType
    visitedAt?: Date | string
    customer?: CustomerCreateNestedOneWithoutVisitsInput
  }

  export type CustomerVisitUncheckedCreateWithoutOutletInput = {
    id?: string
    customerId?: string | null
    deviceId: string
    visitType?: $Enums.VisitType
    visitedAt?: Date | string
  }

  export type CustomerVisitCreateOrConnectWithoutOutletInput = {
    where: CustomerVisitWhereUniqueInput
    create: XOR<CustomerVisitCreateWithoutOutletInput, CustomerVisitUncheckedCreateWithoutOutletInput>
  }

  export type CustomerVisitCreateManyOutletInputEnvelope = {
    data: CustomerVisitCreateManyOutletInput | CustomerVisitCreateManyOutletInput[]
    skipDuplicates?: boolean
  }

  export type MenuCategoryCreateWithoutOutletInput = {
    id?: string
    name: string
    displayOrder?: number | null
    isActive?: boolean
    createdAt?: Date | string
    items?: MenuItemCreateNestedManyWithoutCategoryInput
  }

  export type MenuCategoryUncheckedCreateWithoutOutletInput = {
    id?: string
    name: string
    displayOrder?: number | null
    isActive?: boolean
    createdAt?: Date | string
    items?: MenuItemUncheckedCreateNestedManyWithoutCategoryInput
  }

  export type MenuCategoryCreateOrConnectWithoutOutletInput = {
    where: MenuCategoryWhereUniqueInput
    create: XOR<MenuCategoryCreateWithoutOutletInput, MenuCategoryUncheckedCreateWithoutOutletInput>
  }

  export type MenuCategoryCreateManyOutletInputEnvelope = {
    data: MenuCategoryCreateManyOutletInput | MenuCategoryCreateManyOutletInput[]
    skipDuplicates?: boolean
  }

  export type StaffCreateWithoutAssignedOutletInput = {
    id: string
    username?: string | null
    fullName: string
    email: string
    phone?: string | null
    role: $Enums.StaffRole
    isAdmin?: boolean
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type StaffUncheckedCreateWithoutAssignedOutletInput = {
    id: string
    username?: string | null
    fullName: string
    email: string
    phone?: string | null
    role: $Enums.StaffRole
    isAdmin?: boolean
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type StaffCreateOrConnectWithoutAssignedOutletInput = {
    where: StaffWhereUniqueInput
    create: XOR<StaffCreateWithoutAssignedOutletInput, StaffUncheckedCreateWithoutAssignedOutletInput>
  }

  export type StaffCreateManyAssignedOutletInputEnvelope = {
    data: StaffCreateManyAssignedOutletInput | StaffCreateManyAssignedOutletInput[]
    skipDuplicates?: boolean
  }

  export type CustomerUpsertWithWhereUniqueWithoutFirstVisitOutletInput = {
    where: CustomerWhereUniqueInput
    update: XOR<CustomerUpdateWithoutFirstVisitOutletInput, CustomerUncheckedUpdateWithoutFirstVisitOutletInput>
    create: XOR<CustomerCreateWithoutFirstVisitOutletInput, CustomerUncheckedCreateWithoutFirstVisitOutletInput>
  }

  export type CustomerUpdateWithWhereUniqueWithoutFirstVisitOutletInput = {
    where: CustomerWhereUniqueInput
    data: XOR<CustomerUpdateWithoutFirstVisitOutletInput, CustomerUncheckedUpdateWithoutFirstVisitOutletInput>
  }

  export type CustomerUpdateManyWithWhereWithoutFirstVisitOutletInput = {
    where: CustomerScalarWhereInput
    data: XOR<CustomerUpdateManyMutationInput, CustomerUncheckedUpdateManyWithoutFirstVisitOutletInput>
  }

  export type CustomerScalarWhereInput = {
    AND?: CustomerScalarWhereInput | CustomerScalarWhereInput[]
    OR?: CustomerScalarWhereInput[]
    NOT?: CustomerScalarWhereInput | CustomerScalarWhereInput[]
    id?: UuidFilter<"Customer"> | string
    deviceId?: StringFilter<"Customer"> | string
    fullName?: StringFilter<"Customer"> | string
    phone?: StringFilter<"Customer"> | string
    email?: StringNullableFilter<"Customer"> | string | null
    birthDate?: DateTimeFilter<"Customer"> | Date | string
    anniversaryDate?: DateTimeNullableFilter<"Customer"> | Date | string | null
    gender?: EnumGenderFilter<"Customer"> | $Enums.Gender
    maritalStatus?: EnumMaritalStatusFilter<"Customer"> | $Enums.MaritalStatus
    firstVisitOutletId?: UuidNullableFilter<"Customer"> | string | null
    lastVisitDate?: DateTimeNullableFilter<"Customer"> | Date | string | null
    totalVisits?: IntFilter<"Customer"> | number
    hasSubmittedFirstReview?: BoolFilter<"Customer"> | boolean
    createdAt?: DateTimeFilter<"Customer"> | Date | string
    updatedAt?: DateTimeFilter<"Customer"> | Date | string
  }

  export type ReviewUpsertWithWhereUniqueWithoutOutletInput = {
    where: ReviewWhereUniqueInput
    update: XOR<ReviewUpdateWithoutOutletInput, ReviewUncheckedUpdateWithoutOutletInput>
    create: XOR<ReviewCreateWithoutOutletInput, ReviewUncheckedCreateWithoutOutletInput>
  }

  export type ReviewUpdateWithWhereUniqueWithoutOutletInput = {
    where: ReviewWhereUniqueInput
    data: XOR<ReviewUpdateWithoutOutletInput, ReviewUncheckedUpdateWithoutOutletInput>
  }

  export type ReviewUpdateManyWithWhereWithoutOutletInput = {
    where: ReviewScalarWhereInput
    data: XOR<ReviewUpdateManyMutationInput, ReviewUncheckedUpdateManyWithoutOutletInput>
  }

  export type ReviewScalarWhereInput = {
    AND?: ReviewScalarWhereInput | ReviewScalarWhereInput[]
    OR?: ReviewScalarWhereInput[]
    NOT?: ReviewScalarWhereInput | ReviewScalarWhereInput[]
    id?: UuidFilter<"Review"> | string
    customerId?: UuidNullableFilter<"Review"> | string | null
    outletId?: UuidFilter<"Review"> | string
    reviewText?: StringNullableFilter<"Review"> | string | null
    stars?: IntFilter<"Review"> | number
    reviewType?: EnumReviewTypeFilter<"Review"> | $Enums.ReviewType
    postedToGoogle?: BoolFilter<"Review"> | boolean
    isVisible?: BoolFilter<"Review"> | boolean
    createdAt?: DateTimeFilter<"Review"> | Date | string
  }

  export type CustomerVisitUpsertWithWhereUniqueWithoutOutletInput = {
    where: CustomerVisitWhereUniqueInput
    update: XOR<CustomerVisitUpdateWithoutOutletInput, CustomerVisitUncheckedUpdateWithoutOutletInput>
    create: XOR<CustomerVisitCreateWithoutOutletInput, CustomerVisitUncheckedCreateWithoutOutletInput>
  }

  export type CustomerVisitUpdateWithWhereUniqueWithoutOutletInput = {
    where: CustomerVisitWhereUniqueInput
    data: XOR<CustomerVisitUpdateWithoutOutletInput, CustomerVisitUncheckedUpdateWithoutOutletInput>
  }

  export type CustomerVisitUpdateManyWithWhereWithoutOutletInput = {
    where: CustomerVisitScalarWhereInput
    data: XOR<CustomerVisitUpdateManyMutationInput, CustomerVisitUncheckedUpdateManyWithoutOutletInput>
  }

  export type CustomerVisitScalarWhereInput = {
    AND?: CustomerVisitScalarWhereInput | CustomerVisitScalarWhereInput[]
    OR?: CustomerVisitScalarWhereInput[]
    NOT?: CustomerVisitScalarWhereInput | CustomerVisitScalarWhereInput[]
    id?: UuidFilter<"CustomerVisit"> | string
    customerId?: UuidNullableFilter<"CustomerVisit"> | string | null
    deviceId?: StringFilter<"CustomerVisit"> | string
    outletId?: UuidFilter<"CustomerVisit"> | string
    visitType?: EnumVisitTypeFilter<"CustomerVisit"> | $Enums.VisitType
    visitedAt?: DateTimeFilter<"CustomerVisit"> | Date | string
  }

  export type MenuCategoryUpsertWithWhereUniqueWithoutOutletInput = {
    where: MenuCategoryWhereUniqueInput
    update: XOR<MenuCategoryUpdateWithoutOutletInput, MenuCategoryUncheckedUpdateWithoutOutletInput>
    create: XOR<MenuCategoryCreateWithoutOutletInput, MenuCategoryUncheckedCreateWithoutOutletInput>
  }

  export type MenuCategoryUpdateWithWhereUniqueWithoutOutletInput = {
    where: MenuCategoryWhereUniqueInput
    data: XOR<MenuCategoryUpdateWithoutOutletInput, MenuCategoryUncheckedUpdateWithoutOutletInput>
  }

  export type MenuCategoryUpdateManyWithWhereWithoutOutletInput = {
    where: MenuCategoryScalarWhereInput
    data: XOR<MenuCategoryUpdateManyMutationInput, MenuCategoryUncheckedUpdateManyWithoutOutletInput>
  }

  export type MenuCategoryScalarWhereInput = {
    AND?: MenuCategoryScalarWhereInput | MenuCategoryScalarWhereInput[]
    OR?: MenuCategoryScalarWhereInput[]
    NOT?: MenuCategoryScalarWhereInput | MenuCategoryScalarWhereInput[]
    id?: UuidFilter<"MenuCategory"> | string
    name?: StringFilter<"MenuCategory"> | string
    displayOrder?: IntNullableFilter<"MenuCategory"> | number | null
    isActive?: BoolFilter<"MenuCategory"> | boolean
    outletId?: UuidNullableFilter<"MenuCategory"> | string | null
    createdAt?: DateTimeFilter<"MenuCategory"> | Date | string
  }

  export type StaffUpsertWithWhereUniqueWithoutAssignedOutletInput = {
    where: StaffWhereUniqueInput
    update: XOR<StaffUpdateWithoutAssignedOutletInput, StaffUncheckedUpdateWithoutAssignedOutletInput>
    create: XOR<StaffCreateWithoutAssignedOutletInput, StaffUncheckedCreateWithoutAssignedOutletInput>
  }

  export type StaffUpdateWithWhereUniqueWithoutAssignedOutletInput = {
    where: StaffWhereUniqueInput
    data: XOR<StaffUpdateWithoutAssignedOutletInput, StaffUncheckedUpdateWithoutAssignedOutletInput>
  }

  export type StaffUpdateManyWithWhereWithoutAssignedOutletInput = {
    where: StaffScalarWhereInput
    data: XOR<StaffUpdateManyMutationInput, StaffUncheckedUpdateManyWithoutAssignedOutletInput>
  }

  export type StaffScalarWhereInput = {
    AND?: StaffScalarWhereInput | StaffScalarWhereInput[]
    OR?: StaffScalarWhereInput[]
    NOT?: StaffScalarWhereInput | StaffScalarWhereInput[]
    id?: UuidFilter<"Staff"> | string
    username?: StringNullableFilter<"Staff"> | string | null
    fullName?: StringFilter<"Staff"> | string
    email?: StringFilter<"Staff"> | string
    phone?: StringNullableFilter<"Staff"> | string | null
    role?: EnumStaffRoleFilter<"Staff"> | $Enums.StaffRole
    isAdmin?: BoolFilter<"Staff"> | boolean
    assignedOutletId?: UuidNullableFilter<"Staff"> | string | null
    isActive?: BoolFilter<"Staff"> | boolean
    createdAt?: DateTimeFilter<"Staff"> | Date | string
    updatedAt?: DateTimeFilter<"Staff"> | Date | string
  }

  export type OutletCreateWithoutCustomersInput = {
    id?: string
    code: string
    slug: string
    name: string
    location?: string | null
    address?: string | null
    googlePlaceId: string
    googleMapsUrl?: string | null
    instagramUrl?: string | null
    facebookUrl?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    reviews?: ReviewCreateNestedManyWithoutOutletInput
    visits?: CustomerVisitCreateNestedManyWithoutOutletInput
    menuCategories?: MenuCategoryCreateNestedManyWithoutOutletInput
    staff?: StaffCreateNestedManyWithoutAssignedOutletInput
  }

  export type OutletUncheckedCreateWithoutCustomersInput = {
    id?: string
    code: string
    slug: string
    name: string
    location?: string | null
    address?: string | null
    googlePlaceId: string
    googleMapsUrl?: string | null
    instagramUrl?: string | null
    facebookUrl?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    reviews?: ReviewUncheckedCreateNestedManyWithoutOutletInput
    visits?: CustomerVisitUncheckedCreateNestedManyWithoutOutletInput
    menuCategories?: MenuCategoryUncheckedCreateNestedManyWithoutOutletInput
    staff?: StaffUncheckedCreateNestedManyWithoutAssignedOutletInput
  }

  export type OutletCreateOrConnectWithoutCustomersInput = {
    where: OutletWhereUniqueInput
    create: XOR<OutletCreateWithoutCustomersInput, OutletUncheckedCreateWithoutCustomersInput>
  }

  export type ReviewCreateWithoutCustomerInput = {
    id?: string
    reviewText?: string | null
    stars: number
    reviewType: $Enums.ReviewType
    postedToGoogle?: boolean
    isVisible?: boolean
    createdAt?: Date | string
    outlet: OutletCreateNestedOneWithoutReviewsInput
  }

  export type ReviewUncheckedCreateWithoutCustomerInput = {
    id?: string
    outletId: string
    reviewText?: string | null
    stars: number
    reviewType: $Enums.ReviewType
    postedToGoogle?: boolean
    isVisible?: boolean
    createdAt?: Date | string
  }

  export type ReviewCreateOrConnectWithoutCustomerInput = {
    where: ReviewWhereUniqueInput
    create: XOR<ReviewCreateWithoutCustomerInput, ReviewUncheckedCreateWithoutCustomerInput>
  }

  export type ReviewCreateManyCustomerInputEnvelope = {
    data: ReviewCreateManyCustomerInput | ReviewCreateManyCustomerInput[]
    skipDuplicates?: boolean
  }

  export type CustomerVisitCreateWithoutCustomerInput = {
    id?: string
    deviceId: string
    visitType?: $Enums.VisitType
    visitedAt?: Date | string
    outlet: OutletCreateNestedOneWithoutVisitsInput
  }

  export type CustomerVisitUncheckedCreateWithoutCustomerInput = {
    id?: string
    deviceId: string
    outletId: string
    visitType?: $Enums.VisitType
    visitedAt?: Date | string
  }

  export type CustomerVisitCreateOrConnectWithoutCustomerInput = {
    where: CustomerVisitWhereUniqueInput
    create: XOR<CustomerVisitCreateWithoutCustomerInput, CustomerVisitUncheckedCreateWithoutCustomerInput>
  }

  export type CustomerVisitCreateManyCustomerInputEnvelope = {
    data: CustomerVisitCreateManyCustomerInput | CustomerVisitCreateManyCustomerInput[]
    skipDuplicates?: boolean
  }

  export type AutomationLogCreateWithoutCustomerInput = {
    id?: string
    automationType: $Enums.AutomationType
    messageStage: $Enums.MessageStage
    status: $Enums.AutomationStatus
    errorMessage?: string | null
    sentAt?: Date | string
  }

  export type AutomationLogUncheckedCreateWithoutCustomerInput = {
    id?: string
    automationType: $Enums.AutomationType
    messageStage: $Enums.MessageStage
    status: $Enums.AutomationStatus
    errorMessage?: string | null
    sentAt?: Date | string
  }

  export type AutomationLogCreateOrConnectWithoutCustomerInput = {
    where: AutomationLogWhereUniqueInput
    create: XOR<AutomationLogCreateWithoutCustomerInput, AutomationLogUncheckedCreateWithoutCustomerInput>
  }

  export type AutomationLogCreateManyCustomerInputEnvelope = {
    data: AutomationLogCreateManyCustomerInput | AutomationLogCreateManyCustomerInput[]
    skipDuplicates?: boolean
  }

  export type OutletUpsertWithoutCustomersInput = {
    update: XOR<OutletUpdateWithoutCustomersInput, OutletUncheckedUpdateWithoutCustomersInput>
    create: XOR<OutletCreateWithoutCustomersInput, OutletUncheckedCreateWithoutCustomersInput>
    where?: OutletWhereInput
  }

  export type OutletUpdateToOneWithWhereWithoutCustomersInput = {
    where?: OutletWhereInput
    data: XOR<OutletUpdateWithoutCustomersInput, OutletUncheckedUpdateWithoutCustomersInput>
  }

  export type OutletUpdateWithoutCustomersInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    googlePlaceId?: StringFieldUpdateOperationsInput | string
    googleMapsUrl?: NullableStringFieldUpdateOperationsInput | string | null
    instagramUrl?: NullableStringFieldUpdateOperationsInput | string | null
    facebookUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reviews?: ReviewUpdateManyWithoutOutletNestedInput
    visits?: CustomerVisitUpdateManyWithoutOutletNestedInput
    menuCategories?: MenuCategoryUpdateManyWithoutOutletNestedInput
    staff?: StaffUpdateManyWithoutAssignedOutletNestedInput
  }

  export type OutletUncheckedUpdateWithoutCustomersInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    googlePlaceId?: StringFieldUpdateOperationsInput | string
    googleMapsUrl?: NullableStringFieldUpdateOperationsInput | string | null
    instagramUrl?: NullableStringFieldUpdateOperationsInput | string | null
    facebookUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reviews?: ReviewUncheckedUpdateManyWithoutOutletNestedInput
    visits?: CustomerVisitUncheckedUpdateManyWithoutOutletNestedInput
    menuCategories?: MenuCategoryUncheckedUpdateManyWithoutOutletNestedInput
    staff?: StaffUncheckedUpdateManyWithoutAssignedOutletNestedInput
  }

  export type ReviewUpsertWithWhereUniqueWithoutCustomerInput = {
    where: ReviewWhereUniqueInput
    update: XOR<ReviewUpdateWithoutCustomerInput, ReviewUncheckedUpdateWithoutCustomerInput>
    create: XOR<ReviewCreateWithoutCustomerInput, ReviewUncheckedCreateWithoutCustomerInput>
  }

  export type ReviewUpdateWithWhereUniqueWithoutCustomerInput = {
    where: ReviewWhereUniqueInput
    data: XOR<ReviewUpdateWithoutCustomerInput, ReviewUncheckedUpdateWithoutCustomerInput>
  }

  export type ReviewUpdateManyWithWhereWithoutCustomerInput = {
    where: ReviewScalarWhereInput
    data: XOR<ReviewUpdateManyMutationInput, ReviewUncheckedUpdateManyWithoutCustomerInput>
  }

  export type CustomerVisitUpsertWithWhereUniqueWithoutCustomerInput = {
    where: CustomerVisitWhereUniqueInput
    update: XOR<CustomerVisitUpdateWithoutCustomerInput, CustomerVisitUncheckedUpdateWithoutCustomerInput>
    create: XOR<CustomerVisitCreateWithoutCustomerInput, CustomerVisitUncheckedCreateWithoutCustomerInput>
  }

  export type CustomerVisitUpdateWithWhereUniqueWithoutCustomerInput = {
    where: CustomerVisitWhereUniqueInput
    data: XOR<CustomerVisitUpdateWithoutCustomerInput, CustomerVisitUncheckedUpdateWithoutCustomerInput>
  }

  export type CustomerVisitUpdateManyWithWhereWithoutCustomerInput = {
    where: CustomerVisitScalarWhereInput
    data: XOR<CustomerVisitUpdateManyMutationInput, CustomerVisitUncheckedUpdateManyWithoutCustomerInput>
  }

  export type AutomationLogUpsertWithWhereUniqueWithoutCustomerInput = {
    where: AutomationLogWhereUniqueInput
    update: XOR<AutomationLogUpdateWithoutCustomerInput, AutomationLogUncheckedUpdateWithoutCustomerInput>
    create: XOR<AutomationLogCreateWithoutCustomerInput, AutomationLogUncheckedCreateWithoutCustomerInput>
  }

  export type AutomationLogUpdateWithWhereUniqueWithoutCustomerInput = {
    where: AutomationLogWhereUniqueInput
    data: XOR<AutomationLogUpdateWithoutCustomerInput, AutomationLogUncheckedUpdateWithoutCustomerInput>
  }

  export type AutomationLogUpdateManyWithWhereWithoutCustomerInput = {
    where: AutomationLogScalarWhereInput
    data: XOR<AutomationLogUpdateManyMutationInput, AutomationLogUncheckedUpdateManyWithoutCustomerInput>
  }

  export type AutomationLogScalarWhereInput = {
    AND?: AutomationLogScalarWhereInput | AutomationLogScalarWhereInput[]
    OR?: AutomationLogScalarWhereInput[]
    NOT?: AutomationLogScalarWhereInput | AutomationLogScalarWhereInput[]
    id?: UuidFilter<"AutomationLog"> | string
    customerId?: UuidNullableFilter<"AutomationLog"> | string | null
    automationType?: EnumAutomationTypeFilter<"AutomationLog"> | $Enums.AutomationType
    messageStage?: EnumMessageStageFilter<"AutomationLog"> | $Enums.MessageStage
    status?: EnumAutomationStatusFilter<"AutomationLog"> | $Enums.AutomationStatus
    errorMessage?: StringNullableFilter<"AutomationLog"> | string | null
    sentAt?: DateTimeFilter<"AutomationLog"> | Date | string
  }

  export type CustomerCreateWithoutReviewsInput = {
    id?: string
    deviceId: string
    fullName: string
    phone: string
    email?: string | null
    birthDate: Date | string
    anniversaryDate?: Date | string | null
    gender: $Enums.Gender
    maritalStatus: $Enums.MaritalStatus
    lastVisitDate?: Date | string | null
    totalVisits?: number
    hasSubmittedFirstReview?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    firstVisitOutlet?: OutletCreateNestedOneWithoutCustomersInput
    visits?: CustomerVisitCreateNestedManyWithoutCustomerInput
    automationLogs?: AutomationLogCreateNestedManyWithoutCustomerInput
  }

  export type CustomerUncheckedCreateWithoutReviewsInput = {
    id?: string
    deviceId: string
    fullName: string
    phone: string
    email?: string | null
    birthDate: Date | string
    anniversaryDate?: Date | string | null
    gender: $Enums.Gender
    maritalStatus: $Enums.MaritalStatus
    firstVisitOutletId?: string | null
    lastVisitDate?: Date | string | null
    totalVisits?: number
    hasSubmittedFirstReview?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    visits?: CustomerVisitUncheckedCreateNestedManyWithoutCustomerInput
    automationLogs?: AutomationLogUncheckedCreateNestedManyWithoutCustomerInput
  }

  export type CustomerCreateOrConnectWithoutReviewsInput = {
    where: CustomerWhereUniqueInput
    create: XOR<CustomerCreateWithoutReviewsInput, CustomerUncheckedCreateWithoutReviewsInput>
  }

  export type OutletCreateWithoutReviewsInput = {
    id?: string
    code: string
    slug: string
    name: string
    location?: string | null
    address?: string | null
    googlePlaceId: string
    googleMapsUrl?: string | null
    instagramUrl?: string | null
    facebookUrl?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    customers?: CustomerCreateNestedManyWithoutFirstVisitOutletInput
    visits?: CustomerVisitCreateNestedManyWithoutOutletInput
    menuCategories?: MenuCategoryCreateNestedManyWithoutOutletInput
    staff?: StaffCreateNestedManyWithoutAssignedOutletInput
  }

  export type OutletUncheckedCreateWithoutReviewsInput = {
    id?: string
    code: string
    slug: string
    name: string
    location?: string | null
    address?: string | null
    googlePlaceId: string
    googleMapsUrl?: string | null
    instagramUrl?: string | null
    facebookUrl?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    customers?: CustomerUncheckedCreateNestedManyWithoutFirstVisitOutletInput
    visits?: CustomerVisitUncheckedCreateNestedManyWithoutOutletInput
    menuCategories?: MenuCategoryUncheckedCreateNestedManyWithoutOutletInput
    staff?: StaffUncheckedCreateNestedManyWithoutAssignedOutletInput
  }

  export type OutletCreateOrConnectWithoutReviewsInput = {
    where: OutletWhereUniqueInput
    create: XOR<OutletCreateWithoutReviewsInput, OutletUncheckedCreateWithoutReviewsInput>
  }

  export type CustomerUpsertWithoutReviewsInput = {
    update: XOR<CustomerUpdateWithoutReviewsInput, CustomerUncheckedUpdateWithoutReviewsInput>
    create: XOR<CustomerCreateWithoutReviewsInput, CustomerUncheckedCreateWithoutReviewsInput>
    where?: CustomerWhereInput
  }

  export type CustomerUpdateToOneWithWhereWithoutReviewsInput = {
    where?: CustomerWhereInput
    data: XOR<CustomerUpdateWithoutReviewsInput, CustomerUncheckedUpdateWithoutReviewsInput>
  }

  export type CustomerUpdateWithoutReviewsInput = {
    id?: StringFieldUpdateOperationsInput | string
    deviceId?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    anniversaryDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    maritalStatus?: EnumMaritalStatusFieldUpdateOperationsInput | $Enums.MaritalStatus
    lastVisitDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    totalVisits?: IntFieldUpdateOperationsInput | number
    hasSubmittedFirstReview?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    firstVisitOutlet?: OutletUpdateOneWithoutCustomersNestedInput
    visits?: CustomerVisitUpdateManyWithoutCustomerNestedInput
    automationLogs?: AutomationLogUpdateManyWithoutCustomerNestedInput
  }

  export type CustomerUncheckedUpdateWithoutReviewsInput = {
    id?: StringFieldUpdateOperationsInput | string
    deviceId?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    anniversaryDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    maritalStatus?: EnumMaritalStatusFieldUpdateOperationsInput | $Enums.MaritalStatus
    firstVisitOutletId?: NullableStringFieldUpdateOperationsInput | string | null
    lastVisitDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    totalVisits?: IntFieldUpdateOperationsInput | number
    hasSubmittedFirstReview?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    visits?: CustomerVisitUncheckedUpdateManyWithoutCustomerNestedInput
    automationLogs?: AutomationLogUncheckedUpdateManyWithoutCustomerNestedInput
  }

  export type OutletUpsertWithoutReviewsInput = {
    update: XOR<OutletUpdateWithoutReviewsInput, OutletUncheckedUpdateWithoutReviewsInput>
    create: XOR<OutletCreateWithoutReviewsInput, OutletUncheckedCreateWithoutReviewsInput>
    where?: OutletWhereInput
  }

  export type OutletUpdateToOneWithWhereWithoutReviewsInput = {
    where?: OutletWhereInput
    data: XOR<OutletUpdateWithoutReviewsInput, OutletUncheckedUpdateWithoutReviewsInput>
  }

  export type OutletUpdateWithoutReviewsInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    googlePlaceId?: StringFieldUpdateOperationsInput | string
    googleMapsUrl?: NullableStringFieldUpdateOperationsInput | string | null
    instagramUrl?: NullableStringFieldUpdateOperationsInput | string | null
    facebookUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customers?: CustomerUpdateManyWithoutFirstVisitOutletNestedInput
    visits?: CustomerVisitUpdateManyWithoutOutletNestedInput
    menuCategories?: MenuCategoryUpdateManyWithoutOutletNestedInput
    staff?: StaffUpdateManyWithoutAssignedOutletNestedInput
  }

  export type OutletUncheckedUpdateWithoutReviewsInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    googlePlaceId?: StringFieldUpdateOperationsInput | string
    googleMapsUrl?: NullableStringFieldUpdateOperationsInput | string | null
    instagramUrl?: NullableStringFieldUpdateOperationsInput | string | null
    facebookUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customers?: CustomerUncheckedUpdateManyWithoutFirstVisitOutletNestedInput
    visits?: CustomerVisitUncheckedUpdateManyWithoutOutletNestedInput
    menuCategories?: MenuCategoryUncheckedUpdateManyWithoutOutletNestedInput
    staff?: StaffUncheckedUpdateManyWithoutAssignedOutletNestedInput
  }

  export type CustomerCreateWithoutVisitsInput = {
    id?: string
    deviceId: string
    fullName: string
    phone: string
    email?: string | null
    birthDate: Date | string
    anniversaryDate?: Date | string | null
    gender: $Enums.Gender
    maritalStatus: $Enums.MaritalStatus
    lastVisitDate?: Date | string | null
    totalVisits?: number
    hasSubmittedFirstReview?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    firstVisitOutlet?: OutletCreateNestedOneWithoutCustomersInput
    reviews?: ReviewCreateNestedManyWithoutCustomerInput
    automationLogs?: AutomationLogCreateNestedManyWithoutCustomerInput
  }

  export type CustomerUncheckedCreateWithoutVisitsInput = {
    id?: string
    deviceId: string
    fullName: string
    phone: string
    email?: string | null
    birthDate: Date | string
    anniversaryDate?: Date | string | null
    gender: $Enums.Gender
    maritalStatus: $Enums.MaritalStatus
    firstVisitOutletId?: string | null
    lastVisitDate?: Date | string | null
    totalVisits?: number
    hasSubmittedFirstReview?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    reviews?: ReviewUncheckedCreateNestedManyWithoutCustomerInput
    automationLogs?: AutomationLogUncheckedCreateNestedManyWithoutCustomerInput
  }

  export type CustomerCreateOrConnectWithoutVisitsInput = {
    where: CustomerWhereUniqueInput
    create: XOR<CustomerCreateWithoutVisitsInput, CustomerUncheckedCreateWithoutVisitsInput>
  }

  export type OutletCreateWithoutVisitsInput = {
    id?: string
    code: string
    slug: string
    name: string
    location?: string | null
    address?: string | null
    googlePlaceId: string
    googleMapsUrl?: string | null
    instagramUrl?: string | null
    facebookUrl?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    customers?: CustomerCreateNestedManyWithoutFirstVisitOutletInput
    reviews?: ReviewCreateNestedManyWithoutOutletInput
    menuCategories?: MenuCategoryCreateNestedManyWithoutOutletInput
    staff?: StaffCreateNestedManyWithoutAssignedOutletInput
  }

  export type OutletUncheckedCreateWithoutVisitsInput = {
    id?: string
    code: string
    slug: string
    name: string
    location?: string | null
    address?: string | null
    googlePlaceId: string
    googleMapsUrl?: string | null
    instagramUrl?: string | null
    facebookUrl?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    customers?: CustomerUncheckedCreateNestedManyWithoutFirstVisitOutletInput
    reviews?: ReviewUncheckedCreateNestedManyWithoutOutletInput
    menuCategories?: MenuCategoryUncheckedCreateNestedManyWithoutOutletInput
    staff?: StaffUncheckedCreateNestedManyWithoutAssignedOutletInput
  }

  export type OutletCreateOrConnectWithoutVisitsInput = {
    where: OutletWhereUniqueInput
    create: XOR<OutletCreateWithoutVisitsInput, OutletUncheckedCreateWithoutVisitsInput>
  }

  export type CustomerUpsertWithoutVisitsInput = {
    update: XOR<CustomerUpdateWithoutVisitsInput, CustomerUncheckedUpdateWithoutVisitsInput>
    create: XOR<CustomerCreateWithoutVisitsInput, CustomerUncheckedCreateWithoutVisitsInput>
    where?: CustomerWhereInput
  }

  export type CustomerUpdateToOneWithWhereWithoutVisitsInput = {
    where?: CustomerWhereInput
    data: XOR<CustomerUpdateWithoutVisitsInput, CustomerUncheckedUpdateWithoutVisitsInput>
  }

  export type CustomerUpdateWithoutVisitsInput = {
    id?: StringFieldUpdateOperationsInput | string
    deviceId?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    anniversaryDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    maritalStatus?: EnumMaritalStatusFieldUpdateOperationsInput | $Enums.MaritalStatus
    lastVisitDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    totalVisits?: IntFieldUpdateOperationsInput | number
    hasSubmittedFirstReview?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    firstVisitOutlet?: OutletUpdateOneWithoutCustomersNestedInput
    reviews?: ReviewUpdateManyWithoutCustomerNestedInput
    automationLogs?: AutomationLogUpdateManyWithoutCustomerNestedInput
  }

  export type CustomerUncheckedUpdateWithoutVisitsInput = {
    id?: StringFieldUpdateOperationsInput | string
    deviceId?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    anniversaryDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    maritalStatus?: EnumMaritalStatusFieldUpdateOperationsInput | $Enums.MaritalStatus
    firstVisitOutletId?: NullableStringFieldUpdateOperationsInput | string | null
    lastVisitDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    totalVisits?: IntFieldUpdateOperationsInput | number
    hasSubmittedFirstReview?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reviews?: ReviewUncheckedUpdateManyWithoutCustomerNestedInput
    automationLogs?: AutomationLogUncheckedUpdateManyWithoutCustomerNestedInput
  }

  export type OutletUpsertWithoutVisitsInput = {
    update: XOR<OutletUpdateWithoutVisitsInput, OutletUncheckedUpdateWithoutVisitsInput>
    create: XOR<OutletCreateWithoutVisitsInput, OutletUncheckedCreateWithoutVisitsInput>
    where?: OutletWhereInput
  }

  export type OutletUpdateToOneWithWhereWithoutVisitsInput = {
    where?: OutletWhereInput
    data: XOR<OutletUpdateWithoutVisitsInput, OutletUncheckedUpdateWithoutVisitsInput>
  }

  export type OutletUpdateWithoutVisitsInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    googlePlaceId?: StringFieldUpdateOperationsInput | string
    googleMapsUrl?: NullableStringFieldUpdateOperationsInput | string | null
    instagramUrl?: NullableStringFieldUpdateOperationsInput | string | null
    facebookUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customers?: CustomerUpdateManyWithoutFirstVisitOutletNestedInput
    reviews?: ReviewUpdateManyWithoutOutletNestedInput
    menuCategories?: MenuCategoryUpdateManyWithoutOutletNestedInput
    staff?: StaffUpdateManyWithoutAssignedOutletNestedInput
  }

  export type OutletUncheckedUpdateWithoutVisitsInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    googlePlaceId?: StringFieldUpdateOperationsInput | string
    googleMapsUrl?: NullableStringFieldUpdateOperationsInput | string | null
    instagramUrl?: NullableStringFieldUpdateOperationsInput | string | null
    facebookUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customers?: CustomerUncheckedUpdateManyWithoutFirstVisitOutletNestedInput
    reviews?: ReviewUncheckedUpdateManyWithoutOutletNestedInput
    menuCategories?: MenuCategoryUncheckedUpdateManyWithoutOutletNestedInput
    staff?: StaffUncheckedUpdateManyWithoutAssignedOutletNestedInput
  }

  export type OutletCreateWithoutMenuCategoriesInput = {
    id?: string
    code: string
    slug: string
    name: string
    location?: string | null
    address?: string | null
    googlePlaceId: string
    googleMapsUrl?: string | null
    instagramUrl?: string | null
    facebookUrl?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    customers?: CustomerCreateNestedManyWithoutFirstVisitOutletInput
    reviews?: ReviewCreateNestedManyWithoutOutletInput
    visits?: CustomerVisitCreateNestedManyWithoutOutletInput
    staff?: StaffCreateNestedManyWithoutAssignedOutletInput
  }

  export type OutletUncheckedCreateWithoutMenuCategoriesInput = {
    id?: string
    code: string
    slug: string
    name: string
    location?: string | null
    address?: string | null
    googlePlaceId: string
    googleMapsUrl?: string | null
    instagramUrl?: string | null
    facebookUrl?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    customers?: CustomerUncheckedCreateNestedManyWithoutFirstVisitOutletInput
    reviews?: ReviewUncheckedCreateNestedManyWithoutOutletInput
    visits?: CustomerVisitUncheckedCreateNestedManyWithoutOutletInput
    staff?: StaffUncheckedCreateNestedManyWithoutAssignedOutletInput
  }

  export type OutletCreateOrConnectWithoutMenuCategoriesInput = {
    where: OutletWhereUniqueInput
    create: XOR<OutletCreateWithoutMenuCategoriesInput, OutletUncheckedCreateWithoutMenuCategoriesInput>
  }

  export type MenuItemCreateWithoutCategoryInput = {
    id?: string
    name: string
    description?: string | null
    price?: Decimal | DecimalJsLike | number | string | null
    priceVariants?: NullableJsonNullValueInput | InputJsonValue
    isVeg?: boolean
    imageUrl?: string | null
    isAvailable?: boolean
    displayOrder?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MenuItemUncheckedCreateWithoutCategoryInput = {
    id?: string
    name: string
    description?: string | null
    price?: Decimal | DecimalJsLike | number | string | null
    priceVariants?: NullableJsonNullValueInput | InputJsonValue
    isVeg?: boolean
    imageUrl?: string | null
    isAvailable?: boolean
    displayOrder?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MenuItemCreateOrConnectWithoutCategoryInput = {
    where: MenuItemWhereUniqueInput
    create: XOR<MenuItemCreateWithoutCategoryInput, MenuItemUncheckedCreateWithoutCategoryInput>
  }

  export type MenuItemCreateManyCategoryInputEnvelope = {
    data: MenuItemCreateManyCategoryInput | MenuItemCreateManyCategoryInput[]
    skipDuplicates?: boolean
  }

  export type OutletUpsertWithoutMenuCategoriesInput = {
    update: XOR<OutletUpdateWithoutMenuCategoriesInput, OutletUncheckedUpdateWithoutMenuCategoriesInput>
    create: XOR<OutletCreateWithoutMenuCategoriesInput, OutletUncheckedCreateWithoutMenuCategoriesInput>
    where?: OutletWhereInput
  }

  export type OutletUpdateToOneWithWhereWithoutMenuCategoriesInput = {
    where?: OutletWhereInput
    data: XOR<OutletUpdateWithoutMenuCategoriesInput, OutletUncheckedUpdateWithoutMenuCategoriesInput>
  }

  export type OutletUpdateWithoutMenuCategoriesInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    googlePlaceId?: StringFieldUpdateOperationsInput | string
    googleMapsUrl?: NullableStringFieldUpdateOperationsInput | string | null
    instagramUrl?: NullableStringFieldUpdateOperationsInput | string | null
    facebookUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customers?: CustomerUpdateManyWithoutFirstVisitOutletNestedInput
    reviews?: ReviewUpdateManyWithoutOutletNestedInput
    visits?: CustomerVisitUpdateManyWithoutOutletNestedInput
    staff?: StaffUpdateManyWithoutAssignedOutletNestedInput
  }

  export type OutletUncheckedUpdateWithoutMenuCategoriesInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    googlePlaceId?: StringFieldUpdateOperationsInput | string
    googleMapsUrl?: NullableStringFieldUpdateOperationsInput | string | null
    instagramUrl?: NullableStringFieldUpdateOperationsInput | string | null
    facebookUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customers?: CustomerUncheckedUpdateManyWithoutFirstVisitOutletNestedInput
    reviews?: ReviewUncheckedUpdateManyWithoutOutletNestedInput
    visits?: CustomerVisitUncheckedUpdateManyWithoutOutletNestedInput
    staff?: StaffUncheckedUpdateManyWithoutAssignedOutletNestedInput
  }

  export type MenuItemUpsertWithWhereUniqueWithoutCategoryInput = {
    where: MenuItemWhereUniqueInput
    update: XOR<MenuItemUpdateWithoutCategoryInput, MenuItemUncheckedUpdateWithoutCategoryInput>
    create: XOR<MenuItemCreateWithoutCategoryInput, MenuItemUncheckedCreateWithoutCategoryInput>
  }

  export type MenuItemUpdateWithWhereUniqueWithoutCategoryInput = {
    where: MenuItemWhereUniqueInput
    data: XOR<MenuItemUpdateWithoutCategoryInput, MenuItemUncheckedUpdateWithoutCategoryInput>
  }

  export type MenuItemUpdateManyWithWhereWithoutCategoryInput = {
    where: MenuItemScalarWhereInput
    data: XOR<MenuItemUpdateManyMutationInput, MenuItemUncheckedUpdateManyWithoutCategoryInput>
  }

  export type MenuItemScalarWhereInput = {
    AND?: MenuItemScalarWhereInput | MenuItemScalarWhereInput[]
    OR?: MenuItemScalarWhereInput[]
    NOT?: MenuItemScalarWhereInput | MenuItemScalarWhereInput[]
    id?: UuidFilter<"MenuItem"> | string
    categoryId?: UuidFilter<"MenuItem"> | string
    name?: StringFilter<"MenuItem"> | string
    description?: StringNullableFilter<"MenuItem"> | string | null
    price?: DecimalNullableFilter<"MenuItem"> | Decimal | DecimalJsLike | number | string | null
    priceVariants?: JsonNullableFilter<"MenuItem">
    isVeg?: BoolFilter<"MenuItem"> | boolean
    imageUrl?: StringNullableFilter<"MenuItem"> | string | null
    isAvailable?: BoolFilter<"MenuItem"> | boolean
    displayOrder?: IntNullableFilter<"MenuItem"> | number | null
    createdAt?: DateTimeFilter<"MenuItem"> | Date | string
    updatedAt?: DateTimeFilter<"MenuItem"> | Date | string
  }

  export type MenuCategoryCreateWithoutItemsInput = {
    id?: string
    name: string
    displayOrder?: number | null
    isActive?: boolean
    createdAt?: Date | string
    outlet?: OutletCreateNestedOneWithoutMenuCategoriesInput
  }

  export type MenuCategoryUncheckedCreateWithoutItemsInput = {
    id?: string
    name: string
    displayOrder?: number | null
    isActive?: boolean
    outletId?: string | null
    createdAt?: Date | string
  }

  export type MenuCategoryCreateOrConnectWithoutItemsInput = {
    where: MenuCategoryWhereUniqueInput
    create: XOR<MenuCategoryCreateWithoutItemsInput, MenuCategoryUncheckedCreateWithoutItemsInput>
  }

  export type MenuCategoryUpsertWithoutItemsInput = {
    update: XOR<MenuCategoryUpdateWithoutItemsInput, MenuCategoryUncheckedUpdateWithoutItemsInput>
    create: XOR<MenuCategoryCreateWithoutItemsInput, MenuCategoryUncheckedCreateWithoutItemsInput>
    where?: MenuCategoryWhereInput
  }

  export type MenuCategoryUpdateToOneWithWhereWithoutItemsInput = {
    where?: MenuCategoryWhereInput
    data: XOR<MenuCategoryUpdateWithoutItemsInput, MenuCategoryUncheckedUpdateWithoutItemsInput>
  }

  export type MenuCategoryUpdateWithoutItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    displayOrder?: NullableIntFieldUpdateOperationsInput | number | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    outlet?: OutletUpdateOneWithoutMenuCategoriesNestedInput
  }

  export type MenuCategoryUncheckedUpdateWithoutItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    displayOrder?: NullableIntFieldUpdateOperationsInput | number | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    outletId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CustomerCreateWithoutAutomationLogsInput = {
    id?: string
    deviceId: string
    fullName: string
    phone: string
    email?: string | null
    birthDate: Date | string
    anniversaryDate?: Date | string | null
    gender: $Enums.Gender
    maritalStatus: $Enums.MaritalStatus
    lastVisitDate?: Date | string | null
    totalVisits?: number
    hasSubmittedFirstReview?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    firstVisitOutlet?: OutletCreateNestedOneWithoutCustomersInput
    reviews?: ReviewCreateNestedManyWithoutCustomerInput
    visits?: CustomerVisitCreateNestedManyWithoutCustomerInput
  }

  export type CustomerUncheckedCreateWithoutAutomationLogsInput = {
    id?: string
    deviceId: string
    fullName: string
    phone: string
    email?: string | null
    birthDate: Date | string
    anniversaryDate?: Date | string | null
    gender: $Enums.Gender
    maritalStatus: $Enums.MaritalStatus
    firstVisitOutletId?: string | null
    lastVisitDate?: Date | string | null
    totalVisits?: number
    hasSubmittedFirstReview?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    reviews?: ReviewUncheckedCreateNestedManyWithoutCustomerInput
    visits?: CustomerVisitUncheckedCreateNestedManyWithoutCustomerInput
  }

  export type CustomerCreateOrConnectWithoutAutomationLogsInput = {
    where: CustomerWhereUniqueInput
    create: XOR<CustomerCreateWithoutAutomationLogsInput, CustomerUncheckedCreateWithoutAutomationLogsInput>
  }

  export type CustomerUpsertWithoutAutomationLogsInput = {
    update: XOR<CustomerUpdateWithoutAutomationLogsInput, CustomerUncheckedUpdateWithoutAutomationLogsInput>
    create: XOR<CustomerCreateWithoutAutomationLogsInput, CustomerUncheckedCreateWithoutAutomationLogsInput>
    where?: CustomerWhereInput
  }

  export type CustomerUpdateToOneWithWhereWithoutAutomationLogsInput = {
    where?: CustomerWhereInput
    data: XOR<CustomerUpdateWithoutAutomationLogsInput, CustomerUncheckedUpdateWithoutAutomationLogsInput>
  }

  export type CustomerUpdateWithoutAutomationLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    deviceId?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    anniversaryDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    maritalStatus?: EnumMaritalStatusFieldUpdateOperationsInput | $Enums.MaritalStatus
    lastVisitDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    totalVisits?: IntFieldUpdateOperationsInput | number
    hasSubmittedFirstReview?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    firstVisitOutlet?: OutletUpdateOneWithoutCustomersNestedInput
    reviews?: ReviewUpdateManyWithoutCustomerNestedInput
    visits?: CustomerVisitUpdateManyWithoutCustomerNestedInput
  }

  export type CustomerUncheckedUpdateWithoutAutomationLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    deviceId?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    anniversaryDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    maritalStatus?: EnumMaritalStatusFieldUpdateOperationsInput | $Enums.MaritalStatus
    firstVisitOutletId?: NullableStringFieldUpdateOperationsInput | string | null
    lastVisitDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    totalVisits?: IntFieldUpdateOperationsInput | number
    hasSubmittedFirstReview?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reviews?: ReviewUncheckedUpdateManyWithoutCustomerNestedInput
    visits?: CustomerVisitUncheckedUpdateManyWithoutCustomerNestedInput
  }

  export type OutletCreateWithoutStaffInput = {
    id?: string
    code: string
    slug: string
    name: string
    location?: string | null
    address?: string | null
    googlePlaceId: string
    googleMapsUrl?: string | null
    instagramUrl?: string | null
    facebookUrl?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    customers?: CustomerCreateNestedManyWithoutFirstVisitOutletInput
    reviews?: ReviewCreateNestedManyWithoutOutletInput
    visits?: CustomerVisitCreateNestedManyWithoutOutletInput
    menuCategories?: MenuCategoryCreateNestedManyWithoutOutletInput
  }

  export type OutletUncheckedCreateWithoutStaffInput = {
    id?: string
    code: string
    slug: string
    name: string
    location?: string | null
    address?: string | null
    googlePlaceId: string
    googleMapsUrl?: string | null
    instagramUrl?: string | null
    facebookUrl?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    customers?: CustomerUncheckedCreateNestedManyWithoutFirstVisitOutletInput
    reviews?: ReviewUncheckedCreateNestedManyWithoutOutletInput
    visits?: CustomerVisitUncheckedCreateNestedManyWithoutOutletInput
    menuCategories?: MenuCategoryUncheckedCreateNestedManyWithoutOutletInput
  }

  export type OutletCreateOrConnectWithoutStaffInput = {
    where: OutletWhereUniqueInput
    create: XOR<OutletCreateWithoutStaffInput, OutletUncheckedCreateWithoutStaffInput>
  }

  export type OutletUpsertWithoutStaffInput = {
    update: XOR<OutletUpdateWithoutStaffInput, OutletUncheckedUpdateWithoutStaffInput>
    create: XOR<OutletCreateWithoutStaffInput, OutletUncheckedCreateWithoutStaffInput>
    where?: OutletWhereInput
  }

  export type OutletUpdateToOneWithWhereWithoutStaffInput = {
    where?: OutletWhereInput
    data: XOR<OutletUpdateWithoutStaffInput, OutletUncheckedUpdateWithoutStaffInput>
  }

  export type OutletUpdateWithoutStaffInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    googlePlaceId?: StringFieldUpdateOperationsInput | string
    googleMapsUrl?: NullableStringFieldUpdateOperationsInput | string | null
    instagramUrl?: NullableStringFieldUpdateOperationsInput | string | null
    facebookUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customers?: CustomerUpdateManyWithoutFirstVisitOutletNestedInput
    reviews?: ReviewUpdateManyWithoutOutletNestedInput
    visits?: CustomerVisitUpdateManyWithoutOutletNestedInput
    menuCategories?: MenuCategoryUpdateManyWithoutOutletNestedInput
  }

  export type OutletUncheckedUpdateWithoutStaffInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    googlePlaceId?: StringFieldUpdateOperationsInput | string
    googleMapsUrl?: NullableStringFieldUpdateOperationsInput | string | null
    instagramUrl?: NullableStringFieldUpdateOperationsInput | string | null
    facebookUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customers?: CustomerUncheckedUpdateManyWithoutFirstVisitOutletNestedInput
    reviews?: ReviewUncheckedUpdateManyWithoutOutletNestedInput
    visits?: CustomerVisitUncheckedUpdateManyWithoutOutletNestedInput
    menuCategories?: MenuCategoryUncheckedUpdateManyWithoutOutletNestedInput
  }

  export type CustomerCreateManyFirstVisitOutletInput = {
    id?: string
    deviceId: string
    fullName: string
    phone: string
    email?: string | null
    birthDate: Date | string
    anniversaryDate?: Date | string | null
    gender: $Enums.Gender
    maritalStatus: $Enums.MaritalStatus
    lastVisitDate?: Date | string | null
    totalVisits?: number
    hasSubmittedFirstReview?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ReviewCreateManyOutletInput = {
    id?: string
    customerId?: string | null
    reviewText?: string | null
    stars: number
    reviewType: $Enums.ReviewType
    postedToGoogle?: boolean
    isVisible?: boolean
    createdAt?: Date | string
  }

  export type CustomerVisitCreateManyOutletInput = {
    id?: string
    customerId?: string | null
    deviceId: string
    visitType?: $Enums.VisitType
    visitedAt?: Date | string
  }

  export type MenuCategoryCreateManyOutletInput = {
    id?: string
    name: string
    displayOrder?: number | null
    isActive?: boolean
    createdAt?: Date | string
  }

  export type StaffCreateManyAssignedOutletInput = {
    id: string
    username?: string | null
    fullName: string
    email: string
    phone?: string | null
    role: $Enums.StaffRole
    isAdmin?: boolean
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CustomerUpdateWithoutFirstVisitOutletInput = {
    id?: StringFieldUpdateOperationsInput | string
    deviceId?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    anniversaryDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    maritalStatus?: EnumMaritalStatusFieldUpdateOperationsInput | $Enums.MaritalStatus
    lastVisitDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    totalVisits?: IntFieldUpdateOperationsInput | number
    hasSubmittedFirstReview?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reviews?: ReviewUpdateManyWithoutCustomerNestedInput
    visits?: CustomerVisitUpdateManyWithoutCustomerNestedInput
    automationLogs?: AutomationLogUpdateManyWithoutCustomerNestedInput
  }

  export type CustomerUncheckedUpdateWithoutFirstVisitOutletInput = {
    id?: StringFieldUpdateOperationsInput | string
    deviceId?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    anniversaryDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    maritalStatus?: EnumMaritalStatusFieldUpdateOperationsInput | $Enums.MaritalStatus
    lastVisitDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    totalVisits?: IntFieldUpdateOperationsInput | number
    hasSubmittedFirstReview?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reviews?: ReviewUncheckedUpdateManyWithoutCustomerNestedInput
    visits?: CustomerVisitUncheckedUpdateManyWithoutCustomerNestedInput
    automationLogs?: AutomationLogUncheckedUpdateManyWithoutCustomerNestedInput
  }

  export type CustomerUncheckedUpdateManyWithoutFirstVisitOutletInput = {
    id?: StringFieldUpdateOperationsInput | string
    deviceId?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    anniversaryDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    maritalStatus?: EnumMaritalStatusFieldUpdateOperationsInput | $Enums.MaritalStatus
    lastVisitDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    totalVisits?: IntFieldUpdateOperationsInput | number
    hasSubmittedFirstReview?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReviewUpdateWithoutOutletInput = {
    id?: StringFieldUpdateOperationsInput | string
    reviewText?: NullableStringFieldUpdateOperationsInput | string | null
    stars?: IntFieldUpdateOperationsInput | number
    reviewType?: EnumReviewTypeFieldUpdateOperationsInput | $Enums.ReviewType
    postedToGoogle?: BoolFieldUpdateOperationsInput | boolean
    isVisible?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customer?: CustomerUpdateOneWithoutReviewsNestedInput
  }

  export type ReviewUncheckedUpdateWithoutOutletInput = {
    id?: StringFieldUpdateOperationsInput | string
    customerId?: NullableStringFieldUpdateOperationsInput | string | null
    reviewText?: NullableStringFieldUpdateOperationsInput | string | null
    stars?: IntFieldUpdateOperationsInput | number
    reviewType?: EnumReviewTypeFieldUpdateOperationsInput | $Enums.ReviewType
    postedToGoogle?: BoolFieldUpdateOperationsInput | boolean
    isVisible?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReviewUncheckedUpdateManyWithoutOutletInput = {
    id?: StringFieldUpdateOperationsInput | string
    customerId?: NullableStringFieldUpdateOperationsInput | string | null
    reviewText?: NullableStringFieldUpdateOperationsInput | string | null
    stars?: IntFieldUpdateOperationsInput | number
    reviewType?: EnumReviewTypeFieldUpdateOperationsInput | $Enums.ReviewType
    postedToGoogle?: BoolFieldUpdateOperationsInput | boolean
    isVisible?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CustomerVisitUpdateWithoutOutletInput = {
    id?: StringFieldUpdateOperationsInput | string
    deviceId?: StringFieldUpdateOperationsInput | string
    visitType?: EnumVisitTypeFieldUpdateOperationsInput | $Enums.VisitType
    visitedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customer?: CustomerUpdateOneWithoutVisitsNestedInput
  }

  export type CustomerVisitUncheckedUpdateWithoutOutletInput = {
    id?: StringFieldUpdateOperationsInput | string
    customerId?: NullableStringFieldUpdateOperationsInput | string | null
    deviceId?: StringFieldUpdateOperationsInput | string
    visitType?: EnumVisitTypeFieldUpdateOperationsInput | $Enums.VisitType
    visitedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CustomerVisitUncheckedUpdateManyWithoutOutletInput = {
    id?: StringFieldUpdateOperationsInput | string
    customerId?: NullableStringFieldUpdateOperationsInput | string | null
    deviceId?: StringFieldUpdateOperationsInput | string
    visitType?: EnumVisitTypeFieldUpdateOperationsInput | $Enums.VisitType
    visitedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MenuCategoryUpdateWithoutOutletInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    displayOrder?: NullableIntFieldUpdateOperationsInput | number | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: MenuItemUpdateManyWithoutCategoryNestedInput
  }

  export type MenuCategoryUncheckedUpdateWithoutOutletInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    displayOrder?: NullableIntFieldUpdateOperationsInput | number | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: MenuItemUncheckedUpdateManyWithoutCategoryNestedInput
  }

  export type MenuCategoryUncheckedUpdateManyWithoutOutletInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    displayOrder?: NullableIntFieldUpdateOperationsInput | number | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StaffUpdateWithoutAssignedOutletInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    fullName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumStaffRoleFieldUpdateOperationsInput | $Enums.StaffRole
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StaffUncheckedUpdateWithoutAssignedOutletInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    fullName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumStaffRoleFieldUpdateOperationsInput | $Enums.StaffRole
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StaffUncheckedUpdateManyWithoutAssignedOutletInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    fullName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumStaffRoleFieldUpdateOperationsInput | $Enums.StaffRole
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReviewCreateManyCustomerInput = {
    id?: string
    outletId: string
    reviewText?: string | null
    stars: number
    reviewType: $Enums.ReviewType
    postedToGoogle?: boolean
    isVisible?: boolean
    createdAt?: Date | string
  }

  export type CustomerVisitCreateManyCustomerInput = {
    id?: string
    deviceId: string
    outletId: string
    visitType?: $Enums.VisitType
    visitedAt?: Date | string
  }

  export type AutomationLogCreateManyCustomerInput = {
    id?: string
    automationType: $Enums.AutomationType
    messageStage: $Enums.MessageStage
    status: $Enums.AutomationStatus
    errorMessage?: string | null
    sentAt?: Date | string
  }

  export type ReviewUpdateWithoutCustomerInput = {
    id?: StringFieldUpdateOperationsInput | string
    reviewText?: NullableStringFieldUpdateOperationsInput | string | null
    stars?: IntFieldUpdateOperationsInput | number
    reviewType?: EnumReviewTypeFieldUpdateOperationsInput | $Enums.ReviewType
    postedToGoogle?: BoolFieldUpdateOperationsInput | boolean
    isVisible?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    outlet?: OutletUpdateOneRequiredWithoutReviewsNestedInput
  }

  export type ReviewUncheckedUpdateWithoutCustomerInput = {
    id?: StringFieldUpdateOperationsInput | string
    outletId?: StringFieldUpdateOperationsInput | string
    reviewText?: NullableStringFieldUpdateOperationsInput | string | null
    stars?: IntFieldUpdateOperationsInput | number
    reviewType?: EnumReviewTypeFieldUpdateOperationsInput | $Enums.ReviewType
    postedToGoogle?: BoolFieldUpdateOperationsInput | boolean
    isVisible?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReviewUncheckedUpdateManyWithoutCustomerInput = {
    id?: StringFieldUpdateOperationsInput | string
    outletId?: StringFieldUpdateOperationsInput | string
    reviewText?: NullableStringFieldUpdateOperationsInput | string | null
    stars?: IntFieldUpdateOperationsInput | number
    reviewType?: EnumReviewTypeFieldUpdateOperationsInput | $Enums.ReviewType
    postedToGoogle?: BoolFieldUpdateOperationsInput | boolean
    isVisible?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CustomerVisitUpdateWithoutCustomerInput = {
    id?: StringFieldUpdateOperationsInput | string
    deviceId?: StringFieldUpdateOperationsInput | string
    visitType?: EnumVisitTypeFieldUpdateOperationsInput | $Enums.VisitType
    visitedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    outlet?: OutletUpdateOneRequiredWithoutVisitsNestedInput
  }

  export type CustomerVisitUncheckedUpdateWithoutCustomerInput = {
    id?: StringFieldUpdateOperationsInput | string
    deviceId?: StringFieldUpdateOperationsInput | string
    outletId?: StringFieldUpdateOperationsInput | string
    visitType?: EnumVisitTypeFieldUpdateOperationsInput | $Enums.VisitType
    visitedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CustomerVisitUncheckedUpdateManyWithoutCustomerInput = {
    id?: StringFieldUpdateOperationsInput | string
    deviceId?: StringFieldUpdateOperationsInput | string
    outletId?: StringFieldUpdateOperationsInput | string
    visitType?: EnumVisitTypeFieldUpdateOperationsInput | $Enums.VisitType
    visitedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AutomationLogUpdateWithoutCustomerInput = {
    id?: StringFieldUpdateOperationsInput | string
    automationType?: EnumAutomationTypeFieldUpdateOperationsInput | $Enums.AutomationType
    messageStage?: EnumMessageStageFieldUpdateOperationsInput | $Enums.MessageStage
    status?: EnumAutomationStatusFieldUpdateOperationsInput | $Enums.AutomationStatus
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    sentAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AutomationLogUncheckedUpdateWithoutCustomerInput = {
    id?: StringFieldUpdateOperationsInput | string
    automationType?: EnumAutomationTypeFieldUpdateOperationsInput | $Enums.AutomationType
    messageStage?: EnumMessageStageFieldUpdateOperationsInput | $Enums.MessageStage
    status?: EnumAutomationStatusFieldUpdateOperationsInput | $Enums.AutomationStatus
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    sentAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AutomationLogUncheckedUpdateManyWithoutCustomerInput = {
    id?: StringFieldUpdateOperationsInput | string
    automationType?: EnumAutomationTypeFieldUpdateOperationsInput | $Enums.AutomationType
    messageStage?: EnumMessageStageFieldUpdateOperationsInput | $Enums.MessageStage
    status?: EnumAutomationStatusFieldUpdateOperationsInput | $Enums.AutomationStatus
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    sentAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MenuItemCreateManyCategoryInput = {
    id?: string
    name: string
    description?: string | null
    price?: Decimal | DecimalJsLike | number | string | null
    priceVariants?: NullableJsonNullValueInput | InputJsonValue
    isVeg?: boolean
    imageUrl?: string | null
    isAvailable?: boolean
    displayOrder?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MenuItemUpdateWithoutCategoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    priceVariants?: NullableJsonNullValueInput | InputJsonValue
    isVeg?: BoolFieldUpdateOperationsInput | boolean
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isAvailable?: BoolFieldUpdateOperationsInput | boolean
    displayOrder?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MenuItemUncheckedUpdateWithoutCategoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    priceVariants?: NullableJsonNullValueInput | InputJsonValue
    isVeg?: BoolFieldUpdateOperationsInput | boolean
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isAvailable?: BoolFieldUpdateOperationsInput | boolean
    displayOrder?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MenuItemUncheckedUpdateManyWithoutCategoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    priceVariants?: NullableJsonNullValueInput | InputJsonValue
    isVeg?: BoolFieldUpdateOperationsInput | boolean
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isAvailable?: BoolFieldUpdateOperationsInput | boolean
    displayOrder?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}