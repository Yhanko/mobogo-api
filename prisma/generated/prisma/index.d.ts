
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Agent
 * 
 */
export type Agent = $Result.DefaultSelection<Prisma.$AgentPayload>
/**
 * Model Driver
 * 
 */
export type Driver = $Result.DefaultSelection<Prisma.$DriverPayload>
/**
 * Model Wallet
 * 
 */
export type Wallet = $Result.DefaultSelection<Prisma.$WalletPayload>
/**
 * Model Ticket
 * 
 */
export type Ticket = $Result.DefaultSelection<Prisma.$TicketPayload>
/**
 * Model Transaction
 * 
 */
export type Transaction = $Result.DefaultSelection<Prisma.$TransactionPayload>
/**
 * Model LocationEvent
 * 
 */
export type LocationEvent = $Result.DefaultSelection<Prisma.$LocationEventPayload>
/**
 * Model LotadorPartner
 * 
 */
export type LotadorPartner = $Result.DefaultSelection<Prisma.$LotadorPartnerPayload>
/**
 * Model AuditLog
 * 
 */
export type AuditLog = $Result.DefaultSelection<Prisma.$AuditLogPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const Role: {
  ADMIN: 'ADMIN',
  AGENT: 'AGENT',
  DRIVER: 'DRIVER',
  PASSENGER: 'PASSENGER',
  CLIENT: 'CLIENT',
  LOTADOR: 'LOTADOR'
};

export type Role = (typeof Role)[keyof typeof Role]


export const TicketStatus: {
  PENDING: 'PENDING',
  USED: 'USED',
  TRANSFERRED: 'TRANSFERRED',
  CANCELLED: 'CANCELLED',
  EXPIRED: 'EXPIRED'
};

export type TicketStatus = (typeof TicketStatus)[keyof typeof TicketStatus]


export const TransactionType: {
  TOPUP: 'TOPUP',
  PAYMENT: 'PAYMENT',
  WITHDRAWAL: 'WITHDRAWAL',
  REFUND: 'REFUND',
  TRANSFER_IN: 'TRANSFER_IN',
  TRANSFER_OUT: 'TRANSFER_OUT'
};

export type TransactionType = (typeof TransactionType)[keyof typeof TransactionType]


export const DriverStatus: {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
  ON_TRIP: 'ON_TRIP',
  BLOCKED: 'BLOCKED'
};

export type DriverStatus = (typeof DriverStatus)[keyof typeof DriverStatus]

}

export type Role = $Enums.Role

export const Role: typeof $Enums.Role

export type TicketStatus = $Enums.TicketStatus

export const TicketStatus: typeof $Enums.TicketStatus

export type TransactionType = $Enums.TransactionType

export const TransactionType: typeof $Enums.TransactionType

export type DriverStatus = $Enums.DriverStatus

export const DriverStatus: typeof $Enums.DriverStatus

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
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
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
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
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
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
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
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
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
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
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.agent`: Exposes CRUD operations for the **Agent** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Agents
    * const agents = await prisma.agent.findMany()
    * ```
    */
  get agent(): Prisma.AgentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.driver`: Exposes CRUD operations for the **Driver** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Drivers
    * const drivers = await prisma.driver.findMany()
    * ```
    */
  get driver(): Prisma.DriverDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.wallet`: Exposes CRUD operations for the **Wallet** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Wallets
    * const wallets = await prisma.wallet.findMany()
    * ```
    */
  get wallet(): Prisma.WalletDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.ticket`: Exposes CRUD operations for the **Ticket** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Tickets
    * const tickets = await prisma.ticket.findMany()
    * ```
    */
  get ticket(): Prisma.TicketDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.transaction`: Exposes CRUD operations for the **Transaction** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Transactions
    * const transactions = await prisma.transaction.findMany()
    * ```
    */
  get transaction(): Prisma.TransactionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.locationEvent`: Exposes CRUD operations for the **LocationEvent** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more LocationEvents
    * const locationEvents = await prisma.locationEvent.findMany()
    * ```
    */
  get locationEvent(): Prisma.LocationEventDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.lotadorPartner`: Exposes CRUD operations for the **LotadorPartner** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more LotadorPartners
    * const lotadorPartners = await prisma.lotadorPartner.findMany()
    * ```
    */
  get lotadorPartner(): Prisma.LotadorPartnerDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.auditLog`: Exposes CRUD operations for the **AuditLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AuditLogs
    * const auditLogs = await prisma.auditLog.findMany()
    * ```
    */
  get auditLog(): Prisma.AuditLogDelegate<ExtArgs, ClientOptions>;
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
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

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
   * Prisma Client JS version: 6.19.3
   * Query Engine version: c2990dca591cba766e3b7ef5d9e8a84796e47ab7
   */
  export type PrismaVersion = {
    client: string
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
    User: 'User',
    Agent: 'Agent',
    Driver: 'Driver',
    Wallet: 'Wallet',
    Ticket: 'Ticket',
    Transaction: 'Transaction',
    LocationEvent: 'LocationEvent',
    LotadorPartner: 'LotadorPartner',
    AuditLog: 'AuditLog'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "agent" | "driver" | "wallet" | "ticket" | "transaction" | "locationEvent" | "lotadorPartner" | "auditLog"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Agent: {
        payload: Prisma.$AgentPayload<ExtArgs>
        fields: Prisma.AgentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AgentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AgentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentPayload>
          }
          findFirst: {
            args: Prisma.AgentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AgentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentPayload>
          }
          findMany: {
            args: Prisma.AgentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentPayload>[]
          }
          create: {
            args: Prisma.AgentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentPayload>
          }
          createMany: {
            args: Prisma.AgentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AgentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentPayload>[]
          }
          delete: {
            args: Prisma.AgentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentPayload>
          }
          update: {
            args: Prisma.AgentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentPayload>
          }
          deleteMany: {
            args: Prisma.AgentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AgentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AgentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentPayload>[]
          }
          upsert: {
            args: Prisma.AgentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentPayload>
          }
          aggregate: {
            args: Prisma.AgentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAgent>
          }
          groupBy: {
            args: Prisma.AgentGroupByArgs<ExtArgs>
            result: $Utils.Optional<AgentGroupByOutputType>[]
          }
          count: {
            args: Prisma.AgentCountArgs<ExtArgs>
            result: $Utils.Optional<AgentCountAggregateOutputType> | number
          }
        }
      }
      Driver: {
        payload: Prisma.$DriverPayload<ExtArgs>
        fields: Prisma.DriverFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DriverFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DriverPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DriverFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DriverPayload>
          }
          findFirst: {
            args: Prisma.DriverFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DriverPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DriverFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DriverPayload>
          }
          findMany: {
            args: Prisma.DriverFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DriverPayload>[]
          }
          create: {
            args: Prisma.DriverCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DriverPayload>
          }
          createMany: {
            args: Prisma.DriverCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DriverCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DriverPayload>[]
          }
          delete: {
            args: Prisma.DriverDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DriverPayload>
          }
          update: {
            args: Prisma.DriverUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DriverPayload>
          }
          deleteMany: {
            args: Prisma.DriverDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DriverUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DriverUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DriverPayload>[]
          }
          upsert: {
            args: Prisma.DriverUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DriverPayload>
          }
          aggregate: {
            args: Prisma.DriverAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDriver>
          }
          groupBy: {
            args: Prisma.DriverGroupByArgs<ExtArgs>
            result: $Utils.Optional<DriverGroupByOutputType>[]
          }
          count: {
            args: Prisma.DriverCountArgs<ExtArgs>
            result: $Utils.Optional<DriverCountAggregateOutputType> | number
          }
        }
      }
      Wallet: {
        payload: Prisma.$WalletPayload<ExtArgs>
        fields: Prisma.WalletFieldRefs
        operations: {
          findUnique: {
            args: Prisma.WalletFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WalletPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.WalletFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WalletPayload>
          }
          findFirst: {
            args: Prisma.WalletFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WalletPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.WalletFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WalletPayload>
          }
          findMany: {
            args: Prisma.WalletFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WalletPayload>[]
          }
          create: {
            args: Prisma.WalletCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WalletPayload>
          }
          createMany: {
            args: Prisma.WalletCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.WalletCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WalletPayload>[]
          }
          delete: {
            args: Prisma.WalletDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WalletPayload>
          }
          update: {
            args: Prisma.WalletUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WalletPayload>
          }
          deleteMany: {
            args: Prisma.WalletDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.WalletUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.WalletUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WalletPayload>[]
          }
          upsert: {
            args: Prisma.WalletUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WalletPayload>
          }
          aggregate: {
            args: Prisma.WalletAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateWallet>
          }
          groupBy: {
            args: Prisma.WalletGroupByArgs<ExtArgs>
            result: $Utils.Optional<WalletGroupByOutputType>[]
          }
          count: {
            args: Prisma.WalletCountArgs<ExtArgs>
            result: $Utils.Optional<WalletCountAggregateOutputType> | number
          }
        }
      }
      Ticket: {
        payload: Prisma.$TicketPayload<ExtArgs>
        fields: Prisma.TicketFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TicketFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TicketPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TicketFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TicketPayload>
          }
          findFirst: {
            args: Prisma.TicketFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TicketPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TicketFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TicketPayload>
          }
          findMany: {
            args: Prisma.TicketFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TicketPayload>[]
          }
          create: {
            args: Prisma.TicketCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TicketPayload>
          }
          createMany: {
            args: Prisma.TicketCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TicketCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TicketPayload>[]
          }
          delete: {
            args: Prisma.TicketDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TicketPayload>
          }
          update: {
            args: Prisma.TicketUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TicketPayload>
          }
          deleteMany: {
            args: Prisma.TicketDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TicketUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TicketUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TicketPayload>[]
          }
          upsert: {
            args: Prisma.TicketUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TicketPayload>
          }
          aggregate: {
            args: Prisma.TicketAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTicket>
          }
          groupBy: {
            args: Prisma.TicketGroupByArgs<ExtArgs>
            result: $Utils.Optional<TicketGroupByOutputType>[]
          }
          count: {
            args: Prisma.TicketCountArgs<ExtArgs>
            result: $Utils.Optional<TicketCountAggregateOutputType> | number
          }
        }
      }
      Transaction: {
        payload: Prisma.$TransactionPayload<ExtArgs>
        fields: Prisma.TransactionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TransactionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TransactionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          findFirst: {
            args: Prisma.TransactionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TransactionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          findMany: {
            args: Prisma.TransactionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>[]
          }
          create: {
            args: Prisma.TransactionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          createMany: {
            args: Prisma.TransactionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TransactionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>[]
          }
          delete: {
            args: Prisma.TransactionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          update: {
            args: Prisma.TransactionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          deleteMany: {
            args: Prisma.TransactionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TransactionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TransactionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>[]
          }
          upsert: {
            args: Prisma.TransactionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          aggregate: {
            args: Prisma.TransactionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTransaction>
          }
          groupBy: {
            args: Prisma.TransactionGroupByArgs<ExtArgs>
            result: $Utils.Optional<TransactionGroupByOutputType>[]
          }
          count: {
            args: Prisma.TransactionCountArgs<ExtArgs>
            result: $Utils.Optional<TransactionCountAggregateOutputType> | number
          }
        }
      }
      LocationEvent: {
        payload: Prisma.$LocationEventPayload<ExtArgs>
        fields: Prisma.LocationEventFieldRefs
        operations: {
          findUnique: {
            args: Prisma.LocationEventFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationEventPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.LocationEventFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationEventPayload>
          }
          findFirst: {
            args: Prisma.LocationEventFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationEventPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.LocationEventFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationEventPayload>
          }
          findMany: {
            args: Prisma.LocationEventFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationEventPayload>[]
          }
          create: {
            args: Prisma.LocationEventCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationEventPayload>
          }
          createMany: {
            args: Prisma.LocationEventCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.LocationEventCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationEventPayload>[]
          }
          delete: {
            args: Prisma.LocationEventDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationEventPayload>
          }
          update: {
            args: Prisma.LocationEventUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationEventPayload>
          }
          deleteMany: {
            args: Prisma.LocationEventDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.LocationEventUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.LocationEventUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationEventPayload>[]
          }
          upsert: {
            args: Prisma.LocationEventUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationEventPayload>
          }
          aggregate: {
            args: Prisma.LocationEventAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLocationEvent>
          }
          groupBy: {
            args: Prisma.LocationEventGroupByArgs<ExtArgs>
            result: $Utils.Optional<LocationEventGroupByOutputType>[]
          }
          count: {
            args: Prisma.LocationEventCountArgs<ExtArgs>
            result: $Utils.Optional<LocationEventCountAggregateOutputType> | number
          }
        }
      }
      LotadorPartner: {
        payload: Prisma.$LotadorPartnerPayload<ExtArgs>
        fields: Prisma.LotadorPartnerFieldRefs
        operations: {
          findUnique: {
            args: Prisma.LotadorPartnerFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LotadorPartnerPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.LotadorPartnerFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LotadorPartnerPayload>
          }
          findFirst: {
            args: Prisma.LotadorPartnerFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LotadorPartnerPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.LotadorPartnerFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LotadorPartnerPayload>
          }
          findMany: {
            args: Prisma.LotadorPartnerFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LotadorPartnerPayload>[]
          }
          create: {
            args: Prisma.LotadorPartnerCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LotadorPartnerPayload>
          }
          createMany: {
            args: Prisma.LotadorPartnerCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.LotadorPartnerCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LotadorPartnerPayload>[]
          }
          delete: {
            args: Prisma.LotadorPartnerDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LotadorPartnerPayload>
          }
          update: {
            args: Prisma.LotadorPartnerUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LotadorPartnerPayload>
          }
          deleteMany: {
            args: Prisma.LotadorPartnerDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.LotadorPartnerUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.LotadorPartnerUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LotadorPartnerPayload>[]
          }
          upsert: {
            args: Prisma.LotadorPartnerUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LotadorPartnerPayload>
          }
          aggregate: {
            args: Prisma.LotadorPartnerAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLotadorPartner>
          }
          groupBy: {
            args: Prisma.LotadorPartnerGroupByArgs<ExtArgs>
            result: $Utils.Optional<LotadorPartnerGroupByOutputType>[]
          }
          count: {
            args: Prisma.LotadorPartnerCountArgs<ExtArgs>
            result: $Utils.Optional<LotadorPartnerCountAggregateOutputType> | number
          }
        }
      }
      AuditLog: {
        payload: Prisma.$AuditLogPayload<ExtArgs>
        fields: Prisma.AuditLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AuditLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AuditLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          findFirst: {
            args: Prisma.AuditLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AuditLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          findMany: {
            args: Prisma.AuditLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>[]
          }
          create: {
            args: Prisma.AuditLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          createMany: {
            args: Prisma.AuditLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AuditLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>[]
          }
          delete: {
            args: Prisma.AuditLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          update: {
            args: Prisma.AuditLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          deleteMany: {
            args: Prisma.AuditLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AuditLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AuditLogUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>[]
          }
          upsert: {
            args: Prisma.AuditLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          aggregate: {
            args: Prisma.AuditLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAuditLog>
          }
          groupBy: {
            args: Prisma.AuditLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<AuditLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.AuditLogCountArgs<ExtArgs>
            result: $Utils.Optional<AuditLogCountAggregateOutputType> | number
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
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
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
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
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
    adapter?: runtime.SqlDriverAdapterFactory | null
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
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    agent?: AgentOmit
    driver?: DriverOmit
    wallet?: WalletOmit
    ticket?: TicketOmit
    transaction?: TransactionOmit
    locationEvent?: LocationEventOmit
    lotadorPartner?: LotadorPartnerOmit
    auditLog?: AuditLogOmit
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
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    createdUsers: number
    adminAgents: number
    clientDrivers: number
    ticketsAsPassenger: number
    ticketsEmitted: number
    ticketsTransferredTo: number
    lotadorPartnerships: number
    auditLogs: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    createdUsers?: boolean | UserCountOutputTypeCountCreatedUsersArgs
    adminAgents?: boolean | UserCountOutputTypeCountAdminAgentsArgs
    clientDrivers?: boolean | UserCountOutputTypeCountClientDriversArgs
    ticketsAsPassenger?: boolean | UserCountOutputTypeCountTicketsAsPassengerArgs
    ticketsEmitted?: boolean | UserCountOutputTypeCountTicketsEmittedArgs
    ticketsTransferredTo?: boolean | UserCountOutputTypeCountTicketsTransferredToArgs
    lotadorPartnerships?: boolean | UserCountOutputTypeCountLotadorPartnershipsArgs
    auditLogs?: boolean | UserCountOutputTypeCountAuditLogsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountCreatedUsersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAdminAgentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AgentWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountClientDriversArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DriverWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountTicketsAsPassengerArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TicketWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountTicketsEmittedArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TicketWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountTicketsTransferredToArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TicketWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountLotadorPartnershipsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LotadorPartnerWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAuditLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AuditLogWhereInput
  }


  /**
   * Count Type DriverCountOutputType
   */

  export type DriverCountOutputType = {
    ticketsReceived: number
    locationEvents: number
    lotadorPartnerships: number
  }

  export type DriverCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    ticketsReceived?: boolean | DriverCountOutputTypeCountTicketsReceivedArgs
    locationEvents?: boolean | DriverCountOutputTypeCountLocationEventsArgs
    lotadorPartnerships?: boolean | DriverCountOutputTypeCountLotadorPartnershipsArgs
  }

  // Custom InputTypes
  /**
   * DriverCountOutputType without action
   */
  export type DriverCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DriverCountOutputType
     */
    select?: DriverCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * DriverCountOutputType without action
   */
  export type DriverCountOutputTypeCountTicketsReceivedArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TicketWhereInput
  }

  /**
   * DriverCountOutputType without action
   */
  export type DriverCountOutputTypeCountLocationEventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LocationEventWhereInput
  }

  /**
   * DriverCountOutputType without action
   */
  export type DriverCountOutputTypeCountLotadorPartnershipsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LotadorPartnerWhereInput
  }


  /**
   * Count Type WalletCountOutputType
   */

  export type WalletCountOutputType = {
    transactions: number
  }

  export type WalletCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    transactions?: boolean | WalletCountOutputTypeCountTransactionsArgs
  }

  // Custom InputTypes
  /**
   * WalletCountOutputType without action
   */
  export type WalletCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WalletCountOutputType
     */
    select?: WalletCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * WalletCountOutputType without action
   */
  export type WalletCountOutputTypeCountTransactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TransactionWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    phone: string | null
    displayId: string | null
    name: string | null
    pinHash: string | null
    passwordHash: string | null
    role: $Enums.Role | null
    isActive: boolean | null
    isBlocked: boolean | null
    blockReason: string | null
    createdById: string | null
    createdAt: Date | null
    updatedAt: Date | null
    deletedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    phone: string | null
    displayId: string | null
    name: string | null
    pinHash: string | null
    passwordHash: string | null
    role: $Enums.Role | null
    isActive: boolean | null
    isBlocked: boolean | null
    blockReason: string | null
    createdById: string | null
    createdAt: Date | null
    updatedAt: Date | null
    deletedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    phone: number
    displayId: number
    name: number
    pinHash: number
    passwordHash: number
    role: number
    isActive: number
    isBlocked: number
    blockReason: number
    createdById: number
    createdAt: number
    updatedAt: number
    deletedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    phone?: true
    displayId?: true
    name?: true
    pinHash?: true
    passwordHash?: true
    role?: true
    isActive?: true
    isBlocked?: true
    blockReason?: true
    createdById?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    phone?: true
    displayId?: true
    name?: true
    pinHash?: true
    passwordHash?: true
    role?: true
    isActive?: true
    isBlocked?: true
    blockReason?: true
    createdById?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    phone?: true
    displayId?: true
    name?: true
    pinHash?: true
    passwordHash?: true
    role?: true
    isActive?: true
    isBlocked?: true
    blockReason?: true
    createdById?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    phone: string | null
    displayId: string | null
    name: string
    pinHash: string | null
    passwordHash: string | null
    role: $Enums.Role
    isActive: boolean
    isBlocked: boolean
    blockReason: string | null
    createdById: string | null
    createdAt: Date
    updatedAt: Date
    deletedAt: Date | null
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    phone?: boolean
    displayId?: boolean
    name?: boolean
    pinHash?: boolean
    passwordHash?: boolean
    role?: boolean
    isActive?: boolean
    isBlocked?: boolean
    blockReason?: boolean
    createdById?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
    createdBy?: boolean | User$createdByArgs<ExtArgs>
    createdUsers?: boolean | User$createdUsersArgs<ExtArgs>
    agentProfile?: boolean | User$agentProfileArgs<ExtArgs>
    adminAgents?: boolean | User$adminAgentsArgs<ExtArgs>
    driverProfile?: boolean | User$driverProfileArgs<ExtArgs>
    clientDrivers?: boolean | User$clientDriversArgs<ExtArgs>
    wallet?: boolean | User$walletArgs<ExtArgs>
    ticketsAsPassenger?: boolean | User$ticketsAsPassengerArgs<ExtArgs>
    ticketsEmitted?: boolean | User$ticketsEmittedArgs<ExtArgs>
    ticketsTransferredTo?: boolean | User$ticketsTransferredToArgs<ExtArgs>
    lotadorPartnerships?: boolean | User$lotadorPartnershipsArgs<ExtArgs>
    auditLogs?: boolean | User$auditLogsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    phone?: boolean
    displayId?: boolean
    name?: boolean
    pinHash?: boolean
    passwordHash?: boolean
    role?: boolean
    isActive?: boolean
    isBlocked?: boolean
    blockReason?: boolean
    createdById?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
    createdBy?: boolean | User$createdByArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    phone?: boolean
    displayId?: boolean
    name?: boolean
    pinHash?: boolean
    passwordHash?: boolean
    role?: boolean
    isActive?: boolean
    isBlocked?: boolean
    blockReason?: boolean
    createdById?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
    createdBy?: boolean | User$createdByArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    phone?: boolean
    displayId?: boolean
    name?: boolean
    pinHash?: boolean
    passwordHash?: boolean
    role?: boolean
    isActive?: boolean
    isBlocked?: boolean
    blockReason?: boolean
    createdById?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "phone" | "displayId" | "name" | "pinHash" | "passwordHash" | "role" | "isActive" | "isBlocked" | "blockReason" | "createdById" | "createdAt" | "updatedAt" | "deletedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    createdBy?: boolean | User$createdByArgs<ExtArgs>
    createdUsers?: boolean | User$createdUsersArgs<ExtArgs>
    agentProfile?: boolean | User$agentProfileArgs<ExtArgs>
    adminAgents?: boolean | User$adminAgentsArgs<ExtArgs>
    driverProfile?: boolean | User$driverProfileArgs<ExtArgs>
    clientDrivers?: boolean | User$clientDriversArgs<ExtArgs>
    wallet?: boolean | User$walletArgs<ExtArgs>
    ticketsAsPassenger?: boolean | User$ticketsAsPassengerArgs<ExtArgs>
    ticketsEmitted?: boolean | User$ticketsEmittedArgs<ExtArgs>
    ticketsTransferredTo?: boolean | User$ticketsTransferredToArgs<ExtArgs>
    lotadorPartnerships?: boolean | User$lotadorPartnershipsArgs<ExtArgs>
    auditLogs?: boolean | User$auditLogsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    createdBy?: boolean | User$createdByArgs<ExtArgs>
  }
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    createdBy?: boolean | User$createdByArgs<ExtArgs>
  }

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      createdBy: Prisma.$UserPayload<ExtArgs> | null
      createdUsers: Prisma.$UserPayload<ExtArgs>[]
      agentProfile: Prisma.$AgentPayload<ExtArgs> | null
      adminAgents: Prisma.$AgentPayload<ExtArgs>[]
      driverProfile: Prisma.$DriverPayload<ExtArgs> | null
      clientDrivers: Prisma.$DriverPayload<ExtArgs>[]
      wallet: Prisma.$WalletPayload<ExtArgs> | null
      ticketsAsPassenger: Prisma.$TicketPayload<ExtArgs>[]
      ticketsEmitted: Prisma.$TicketPayload<ExtArgs>[]
      ticketsTransferredTo: Prisma.$TicketPayload<ExtArgs>[]
      lotadorPartnerships: Prisma.$LotadorPartnerPayload<ExtArgs>[]
      auditLogs: Prisma.$AuditLogPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      phone: string | null
      displayId: string | null
      name: string
      pinHash: string | null
      passwordHash: string | null
      role: $Enums.Role
      isActive: boolean
      isBlocked: boolean
      blockReason: string | null
      createdById: string | null
      createdAt: Date
      updatedAt: Date
      deletedAt: Date | null
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
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
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
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
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    createdBy<T extends User$createdByArgs<ExtArgs> = {}>(args?: Subset<T, User$createdByArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    createdUsers<T extends User$createdUsersArgs<ExtArgs> = {}>(args?: Subset<T, User$createdUsersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    agentProfile<T extends User$agentProfileArgs<ExtArgs> = {}>(args?: Subset<T, User$agentProfileArgs<ExtArgs>>): Prisma__AgentClient<$Result.GetResult<Prisma.$AgentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    adminAgents<T extends User$adminAgentsArgs<ExtArgs> = {}>(args?: Subset<T, User$adminAgentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AgentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    driverProfile<T extends User$driverProfileArgs<ExtArgs> = {}>(args?: Subset<T, User$driverProfileArgs<ExtArgs>>): Prisma__DriverClient<$Result.GetResult<Prisma.$DriverPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    clientDrivers<T extends User$clientDriversArgs<ExtArgs> = {}>(args?: Subset<T, User$clientDriversArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DriverPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    wallet<T extends User$walletArgs<ExtArgs> = {}>(args?: Subset<T, User$walletArgs<ExtArgs>>): Prisma__WalletClient<$Result.GetResult<Prisma.$WalletPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    ticketsAsPassenger<T extends User$ticketsAsPassengerArgs<ExtArgs> = {}>(args?: Subset<T, User$ticketsAsPassengerArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TicketPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    ticketsEmitted<T extends User$ticketsEmittedArgs<ExtArgs> = {}>(args?: Subset<T, User$ticketsEmittedArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TicketPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    ticketsTransferredTo<T extends User$ticketsTransferredToArgs<ExtArgs> = {}>(args?: Subset<T, User$ticketsTransferredToArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TicketPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    lotadorPartnerships<T extends User$lotadorPartnershipsArgs<ExtArgs> = {}>(args?: Subset<T, User$lotadorPartnershipsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LotadorPartnerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    auditLogs<T extends User$auditLogsArgs<ExtArgs> = {}>(args?: Subset<T, User$auditLogsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly phone: FieldRef<"User", 'String'>
    readonly displayId: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly pinHash: FieldRef<"User", 'String'>
    readonly passwordHash: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'Role'>
    readonly isActive: FieldRef<"User", 'Boolean'>
    readonly isBlocked: FieldRef<"User", 'Boolean'>
    readonly blockReason: FieldRef<"User", 'String'>
    readonly createdById: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
    readonly deletedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.createdBy
   */
  export type User$createdByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * User.createdUsers
   */
  export type User$createdUsersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    cursor?: UserWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User.agentProfile
   */
  export type User$agentProfileArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agent
     */
    select?: AgentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Agent
     */
    omit?: AgentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentInclude<ExtArgs> | null
    where?: AgentWhereInput
  }

  /**
   * User.adminAgents
   */
  export type User$adminAgentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agent
     */
    select?: AgentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Agent
     */
    omit?: AgentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentInclude<ExtArgs> | null
    where?: AgentWhereInput
    orderBy?: AgentOrderByWithRelationInput | AgentOrderByWithRelationInput[]
    cursor?: AgentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AgentScalarFieldEnum | AgentScalarFieldEnum[]
  }

  /**
   * User.driverProfile
   */
  export type User$driverProfileArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Driver
     */
    select?: DriverSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Driver
     */
    omit?: DriverOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DriverInclude<ExtArgs> | null
    where?: DriverWhereInput
  }

  /**
   * User.clientDrivers
   */
  export type User$clientDriversArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Driver
     */
    select?: DriverSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Driver
     */
    omit?: DriverOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DriverInclude<ExtArgs> | null
    where?: DriverWhereInput
    orderBy?: DriverOrderByWithRelationInput | DriverOrderByWithRelationInput[]
    cursor?: DriverWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DriverScalarFieldEnum | DriverScalarFieldEnum[]
  }

  /**
   * User.wallet
   */
  export type User$walletArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wallet
     */
    select?: WalletSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Wallet
     */
    omit?: WalletOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WalletInclude<ExtArgs> | null
    where?: WalletWhereInput
  }

  /**
   * User.ticketsAsPassenger
   */
  export type User$ticketsAsPassengerArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ticket
     */
    select?: TicketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ticket
     */
    omit?: TicketOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TicketInclude<ExtArgs> | null
    where?: TicketWhereInput
    orderBy?: TicketOrderByWithRelationInput | TicketOrderByWithRelationInput[]
    cursor?: TicketWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TicketScalarFieldEnum | TicketScalarFieldEnum[]
  }

  /**
   * User.ticketsEmitted
   */
  export type User$ticketsEmittedArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ticket
     */
    select?: TicketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ticket
     */
    omit?: TicketOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TicketInclude<ExtArgs> | null
    where?: TicketWhereInput
    orderBy?: TicketOrderByWithRelationInput | TicketOrderByWithRelationInput[]
    cursor?: TicketWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TicketScalarFieldEnum | TicketScalarFieldEnum[]
  }

  /**
   * User.ticketsTransferredTo
   */
  export type User$ticketsTransferredToArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ticket
     */
    select?: TicketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ticket
     */
    omit?: TicketOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TicketInclude<ExtArgs> | null
    where?: TicketWhereInput
    orderBy?: TicketOrderByWithRelationInput | TicketOrderByWithRelationInput[]
    cursor?: TicketWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TicketScalarFieldEnum | TicketScalarFieldEnum[]
  }

  /**
   * User.lotadorPartnerships
   */
  export type User$lotadorPartnershipsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LotadorPartner
     */
    select?: LotadorPartnerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LotadorPartner
     */
    omit?: LotadorPartnerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LotadorPartnerInclude<ExtArgs> | null
    where?: LotadorPartnerWhereInput
    orderBy?: LotadorPartnerOrderByWithRelationInput | LotadorPartnerOrderByWithRelationInput[]
    cursor?: LotadorPartnerWhereUniqueInput
    take?: number
    skip?: number
    distinct?: LotadorPartnerScalarFieldEnum | LotadorPartnerScalarFieldEnum[]
  }

  /**
   * User.auditLogs
   */
  export type User$auditLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    where?: AuditLogWhereInput
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    cursor?: AuditLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Agent
   */

  export type AggregateAgent = {
    _count: AgentCountAggregateOutputType | null
    _avg: AgentAvgAggregateOutputType | null
    _sum: AgentSumAggregateOutputType | null
    _min: AgentMinAggregateOutputType | null
    _max: AgentMaxAggregateOutputType | null
  }

  export type AgentAvgAggregateOutputType = {
    dailyTicketLimit: number | null
  }

  export type AgentSumAggregateOutputType = {
    dailyTicketLimit: number | null
  }

  export type AgentMinAggregateOutputType = {
    id: string | null
    userId: string | null
    adminId: string | null
    isActive: boolean | null
    dailyTicketLimit: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AgentMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    adminId: string | null
    isActive: boolean | null
    dailyTicketLimit: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AgentCountAggregateOutputType = {
    id: number
    userId: number
    adminId: number
    isActive: number
    dailyTicketLimit: number
    permissions: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AgentAvgAggregateInputType = {
    dailyTicketLimit?: true
  }

  export type AgentSumAggregateInputType = {
    dailyTicketLimit?: true
  }

  export type AgentMinAggregateInputType = {
    id?: true
    userId?: true
    adminId?: true
    isActive?: true
    dailyTicketLimit?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AgentMaxAggregateInputType = {
    id?: true
    userId?: true
    adminId?: true
    isActive?: true
    dailyTicketLimit?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AgentCountAggregateInputType = {
    id?: true
    userId?: true
    adminId?: true
    isActive?: true
    dailyTicketLimit?: true
    permissions?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AgentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Agent to aggregate.
     */
    where?: AgentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Agents to fetch.
     */
    orderBy?: AgentOrderByWithRelationInput | AgentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AgentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Agents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Agents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Agents
    **/
    _count?: true | AgentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AgentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AgentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AgentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AgentMaxAggregateInputType
  }

  export type GetAgentAggregateType<T extends AgentAggregateArgs> = {
        [P in keyof T & keyof AggregateAgent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAgent[P]>
      : GetScalarType<T[P], AggregateAgent[P]>
  }




  export type AgentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AgentWhereInput
    orderBy?: AgentOrderByWithAggregationInput | AgentOrderByWithAggregationInput[]
    by: AgentScalarFieldEnum[] | AgentScalarFieldEnum
    having?: AgentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AgentCountAggregateInputType | true
    _avg?: AgentAvgAggregateInputType
    _sum?: AgentSumAggregateInputType
    _min?: AgentMinAggregateInputType
    _max?: AgentMaxAggregateInputType
  }

  export type AgentGroupByOutputType = {
    id: string
    userId: string
    adminId: string
    isActive: boolean
    dailyTicketLimit: number
    permissions: string[]
    createdAt: Date
    updatedAt: Date
    _count: AgentCountAggregateOutputType | null
    _avg: AgentAvgAggregateOutputType | null
    _sum: AgentSumAggregateOutputType | null
    _min: AgentMinAggregateOutputType | null
    _max: AgentMaxAggregateOutputType | null
  }

  type GetAgentGroupByPayload<T extends AgentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AgentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AgentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AgentGroupByOutputType[P]>
            : GetScalarType<T[P], AgentGroupByOutputType[P]>
        }
      >
    >


  export type AgentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    adminId?: boolean
    isActive?: boolean
    dailyTicketLimit?: boolean
    permissions?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    admin?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["agent"]>

  export type AgentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    adminId?: boolean
    isActive?: boolean
    dailyTicketLimit?: boolean
    permissions?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    admin?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["agent"]>

  export type AgentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    adminId?: boolean
    isActive?: boolean
    dailyTicketLimit?: boolean
    permissions?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    admin?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["agent"]>

  export type AgentSelectScalar = {
    id?: boolean
    userId?: boolean
    adminId?: boolean
    isActive?: boolean
    dailyTicketLimit?: boolean
    permissions?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AgentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "adminId" | "isActive" | "dailyTicketLimit" | "permissions" | "createdAt" | "updatedAt", ExtArgs["result"]["agent"]>
  export type AgentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    admin?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AgentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    admin?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AgentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    admin?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $AgentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Agent"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      admin: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      adminId: string
      isActive: boolean
      dailyTicketLimit: number
      permissions: string[]
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["agent"]>
    composites: {}
  }

  type AgentGetPayload<S extends boolean | null | undefined | AgentDefaultArgs> = $Result.GetResult<Prisma.$AgentPayload, S>

  type AgentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AgentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AgentCountAggregateInputType | true
    }

  export interface AgentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Agent'], meta: { name: 'Agent' } }
    /**
     * Find zero or one Agent that matches the filter.
     * @param {AgentFindUniqueArgs} args - Arguments to find a Agent
     * @example
     * // Get one Agent
     * const agent = await prisma.agent.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AgentFindUniqueArgs>(args: SelectSubset<T, AgentFindUniqueArgs<ExtArgs>>): Prisma__AgentClient<$Result.GetResult<Prisma.$AgentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Agent that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AgentFindUniqueOrThrowArgs} args - Arguments to find a Agent
     * @example
     * // Get one Agent
     * const agent = await prisma.agent.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AgentFindUniqueOrThrowArgs>(args: SelectSubset<T, AgentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AgentClient<$Result.GetResult<Prisma.$AgentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Agent that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentFindFirstArgs} args - Arguments to find a Agent
     * @example
     * // Get one Agent
     * const agent = await prisma.agent.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AgentFindFirstArgs>(args?: SelectSubset<T, AgentFindFirstArgs<ExtArgs>>): Prisma__AgentClient<$Result.GetResult<Prisma.$AgentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Agent that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentFindFirstOrThrowArgs} args - Arguments to find a Agent
     * @example
     * // Get one Agent
     * const agent = await prisma.agent.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AgentFindFirstOrThrowArgs>(args?: SelectSubset<T, AgentFindFirstOrThrowArgs<ExtArgs>>): Prisma__AgentClient<$Result.GetResult<Prisma.$AgentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Agents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Agents
     * const agents = await prisma.agent.findMany()
     * 
     * // Get first 10 Agents
     * const agents = await prisma.agent.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const agentWithIdOnly = await prisma.agent.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AgentFindManyArgs>(args?: SelectSubset<T, AgentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AgentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Agent.
     * @param {AgentCreateArgs} args - Arguments to create a Agent.
     * @example
     * // Create one Agent
     * const Agent = await prisma.agent.create({
     *   data: {
     *     // ... data to create a Agent
     *   }
     * })
     * 
     */
    create<T extends AgentCreateArgs>(args: SelectSubset<T, AgentCreateArgs<ExtArgs>>): Prisma__AgentClient<$Result.GetResult<Prisma.$AgentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Agents.
     * @param {AgentCreateManyArgs} args - Arguments to create many Agents.
     * @example
     * // Create many Agents
     * const agent = await prisma.agent.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AgentCreateManyArgs>(args?: SelectSubset<T, AgentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Agents and returns the data saved in the database.
     * @param {AgentCreateManyAndReturnArgs} args - Arguments to create many Agents.
     * @example
     * // Create many Agents
     * const agent = await prisma.agent.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Agents and only return the `id`
     * const agentWithIdOnly = await prisma.agent.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AgentCreateManyAndReturnArgs>(args?: SelectSubset<T, AgentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AgentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Agent.
     * @param {AgentDeleteArgs} args - Arguments to delete one Agent.
     * @example
     * // Delete one Agent
     * const Agent = await prisma.agent.delete({
     *   where: {
     *     // ... filter to delete one Agent
     *   }
     * })
     * 
     */
    delete<T extends AgentDeleteArgs>(args: SelectSubset<T, AgentDeleteArgs<ExtArgs>>): Prisma__AgentClient<$Result.GetResult<Prisma.$AgentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Agent.
     * @param {AgentUpdateArgs} args - Arguments to update one Agent.
     * @example
     * // Update one Agent
     * const agent = await prisma.agent.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AgentUpdateArgs>(args: SelectSubset<T, AgentUpdateArgs<ExtArgs>>): Prisma__AgentClient<$Result.GetResult<Prisma.$AgentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Agents.
     * @param {AgentDeleteManyArgs} args - Arguments to filter Agents to delete.
     * @example
     * // Delete a few Agents
     * const { count } = await prisma.agent.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AgentDeleteManyArgs>(args?: SelectSubset<T, AgentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Agents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Agents
     * const agent = await prisma.agent.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AgentUpdateManyArgs>(args: SelectSubset<T, AgentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Agents and returns the data updated in the database.
     * @param {AgentUpdateManyAndReturnArgs} args - Arguments to update many Agents.
     * @example
     * // Update many Agents
     * const agent = await prisma.agent.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Agents and only return the `id`
     * const agentWithIdOnly = await prisma.agent.updateManyAndReturn({
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
    updateManyAndReturn<T extends AgentUpdateManyAndReturnArgs>(args: SelectSubset<T, AgentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AgentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Agent.
     * @param {AgentUpsertArgs} args - Arguments to update or create a Agent.
     * @example
     * // Update or create a Agent
     * const agent = await prisma.agent.upsert({
     *   create: {
     *     // ... data to create a Agent
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Agent we want to update
     *   }
     * })
     */
    upsert<T extends AgentUpsertArgs>(args: SelectSubset<T, AgentUpsertArgs<ExtArgs>>): Prisma__AgentClient<$Result.GetResult<Prisma.$AgentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Agents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentCountArgs} args - Arguments to filter Agents to count.
     * @example
     * // Count the number of Agents
     * const count = await prisma.agent.count({
     *   where: {
     *     // ... the filter for the Agents we want to count
     *   }
     * })
    **/
    count<T extends AgentCountArgs>(
      args?: Subset<T, AgentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AgentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Agent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AgentAggregateArgs>(args: Subset<T, AgentAggregateArgs>): Prisma.PrismaPromise<GetAgentAggregateType<T>>

    /**
     * Group by Agent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentGroupByArgs} args - Group by arguments.
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
      T extends AgentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AgentGroupByArgs['orderBy'] }
        : { orderBy?: AgentGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, AgentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAgentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Agent model
   */
  readonly fields: AgentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Agent.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AgentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    admin<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the Agent model
   */
  interface AgentFieldRefs {
    readonly id: FieldRef<"Agent", 'String'>
    readonly userId: FieldRef<"Agent", 'String'>
    readonly adminId: FieldRef<"Agent", 'String'>
    readonly isActive: FieldRef<"Agent", 'Boolean'>
    readonly dailyTicketLimit: FieldRef<"Agent", 'Int'>
    readonly permissions: FieldRef<"Agent", 'String[]'>
    readonly createdAt: FieldRef<"Agent", 'DateTime'>
    readonly updatedAt: FieldRef<"Agent", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Agent findUnique
   */
  export type AgentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agent
     */
    select?: AgentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Agent
     */
    omit?: AgentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentInclude<ExtArgs> | null
    /**
     * Filter, which Agent to fetch.
     */
    where: AgentWhereUniqueInput
  }

  /**
   * Agent findUniqueOrThrow
   */
  export type AgentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agent
     */
    select?: AgentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Agent
     */
    omit?: AgentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentInclude<ExtArgs> | null
    /**
     * Filter, which Agent to fetch.
     */
    where: AgentWhereUniqueInput
  }

  /**
   * Agent findFirst
   */
  export type AgentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agent
     */
    select?: AgentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Agent
     */
    omit?: AgentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentInclude<ExtArgs> | null
    /**
     * Filter, which Agent to fetch.
     */
    where?: AgentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Agents to fetch.
     */
    orderBy?: AgentOrderByWithRelationInput | AgentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Agents.
     */
    cursor?: AgentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Agents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Agents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Agents.
     */
    distinct?: AgentScalarFieldEnum | AgentScalarFieldEnum[]
  }

  /**
   * Agent findFirstOrThrow
   */
  export type AgentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agent
     */
    select?: AgentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Agent
     */
    omit?: AgentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentInclude<ExtArgs> | null
    /**
     * Filter, which Agent to fetch.
     */
    where?: AgentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Agents to fetch.
     */
    orderBy?: AgentOrderByWithRelationInput | AgentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Agents.
     */
    cursor?: AgentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Agents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Agents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Agents.
     */
    distinct?: AgentScalarFieldEnum | AgentScalarFieldEnum[]
  }

  /**
   * Agent findMany
   */
  export type AgentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agent
     */
    select?: AgentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Agent
     */
    omit?: AgentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentInclude<ExtArgs> | null
    /**
     * Filter, which Agents to fetch.
     */
    where?: AgentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Agents to fetch.
     */
    orderBy?: AgentOrderByWithRelationInput | AgentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Agents.
     */
    cursor?: AgentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Agents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Agents.
     */
    skip?: number
    distinct?: AgentScalarFieldEnum | AgentScalarFieldEnum[]
  }

  /**
   * Agent create
   */
  export type AgentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agent
     */
    select?: AgentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Agent
     */
    omit?: AgentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentInclude<ExtArgs> | null
    /**
     * The data needed to create a Agent.
     */
    data: XOR<AgentCreateInput, AgentUncheckedCreateInput>
  }

  /**
   * Agent createMany
   */
  export type AgentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Agents.
     */
    data: AgentCreateManyInput | AgentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Agent createManyAndReturn
   */
  export type AgentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agent
     */
    select?: AgentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Agent
     */
    omit?: AgentOmit<ExtArgs> | null
    /**
     * The data used to create many Agents.
     */
    data: AgentCreateManyInput | AgentCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Agent update
   */
  export type AgentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agent
     */
    select?: AgentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Agent
     */
    omit?: AgentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentInclude<ExtArgs> | null
    /**
     * The data needed to update a Agent.
     */
    data: XOR<AgentUpdateInput, AgentUncheckedUpdateInput>
    /**
     * Choose, which Agent to update.
     */
    where: AgentWhereUniqueInput
  }

  /**
   * Agent updateMany
   */
  export type AgentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Agents.
     */
    data: XOR<AgentUpdateManyMutationInput, AgentUncheckedUpdateManyInput>
    /**
     * Filter which Agents to update
     */
    where?: AgentWhereInput
    /**
     * Limit how many Agents to update.
     */
    limit?: number
  }

  /**
   * Agent updateManyAndReturn
   */
  export type AgentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agent
     */
    select?: AgentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Agent
     */
    omit?: AgentOmit<ExtArgs> | null
    /**
     * The data used to update Agents.
     */
    data: XOR<AgentUpdateManyMutationInput, AgentUncheckedUpdateManyInput>
    /**
     * Filter which Agents to update
     */
    where?: AgentWhereInput
    /**
     * Limit how many Agents to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Agent upsert
   */
  export type AgentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agent
     */
    select?: AgentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Agent
     */
    omit?: AgentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentInclude<ExtArgs> | null
    /**
     * The filter to search for the Agent to update in case it exists.
     */
    where: AgentWhereUniqueInput
    /**
     * In case the Agent found by the `where` argument doesn't exist, create a new Agent with this data.
     */
    create: XOR<AgentCreateInput, AgentUncheckedCreateInput>
    /**
     * In case the Agent was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AgentUpdateInput, AgentUncheckedUpdateInput>
  }

  /**
   * Agent delete
   */
  export type AgentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agent
     */
    select?: AgentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Agent
     */
    omit?: AgentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentInclude<ExtArgs> | null
    /**
     * Filter which Agent to delete.
     */
    where: AgentWhereUniqueInput
  }

  /**
   * Agent deleteMany
   */
  export type AgentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Agents to delete
     */
    where?: AgentWhereInput
    /**
     * Limit how many Agents to delete.
     */
    limit?: number
  }

  /**
   * Agent without action
   */
  export type AgentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agent
     */
    select?: AgentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Agent
     */
    omit?: AgentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentInclude<ExtArgs> | null
  }


  /**
   * Model Driver
   */

  export type AggregateDriver = {
    _count: DriverCountAggregateOutputType | null
    _avg: DriverAvgAggregateOutputType | null
    _sum: DriverSumAggregateOutputType | null
    _min: DriverMinAggregateOutputType | null
    _max: DriverMaxAggregateOutputType | null
  }

  export type DriverAvgAggregateOutputType = {
    workDays: number | null
    currentBalance: Decimal | null
  }

  export type DriverSumAggregateOutputType = {
    workDays: number[]
    currentBalance: Decimal | null
  }

  export type DriverMinAggregateOutputType = {
    id: string | null
    userId: string | null
    clientId: string | null
    licensePlate: string | null
    status: $Enums.DriverStatus | null
    currentBalance: Decimal | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DriverMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    clientId: string | null
    licensePlate: string | null
    status: $Enums.DriverStatus | null
    currentBalance: Decimal | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DriverCountAggregateOutputType = {
    id: number
    userId: number
    clientId: number
    licensePlate: number
    status: number
    workDays: number
    currentBalance: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type DriverAvgAggregateInputType = {
    workDays?: true
    currentBalance?: true
  }

  export type DriverSumAggregateInputType = {
    workDays?: true
    currentBalance?: true
  }

  export type DriverMinAggregateInputType = {
    id?: true
    userId?: true
    clientId?: true
    licensePlate?: true
    status?: true
    currentBalance?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DriverMaxAggregateInputType = {
    id?: true
    userId?: true
    clientId?: true
    licensePlate?: true
    status?: true
    currentBalance?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DriverCountAggregateInputType = {
    id?: true
    userId?: true
    clientId?: true
    licensePlate?: true
    status?: true
    workDays?: true
    currentBalance?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type DriverAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Driver to aggregate.
     */
    where?: DriverWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Drivers to fetch.
     */
    orderBy?: DriverOrderByWithRelationInput | DriverOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DriverWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Drivers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Drivers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Drivers
    **/
    _count?: true | DriverCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DriverAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DriverSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DriverMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DriverMaxAggregateInputType
  }

  export type GetDriverAggregateType<T extends DriverAggregateArgs> = {
        [P in keyof T & keyof AggregateDriver]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDriver[P]>
      : GetScalarType<T[P], AggregateDriver[P]>
  }




  export type DriverGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DriverWhereInput
    orderBy?: DriverOrderByWithAggregationInput | DriverOrderByWithAggregationInput[]
    by: DriverScalarFieldEnum[] | DriverScalarFieldEnum
    having?: DriverScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DriverCountAggregateInputType | true
    _avg?: DriverAvgAggregateInputType
    _sum?: DriverSumAggregateInputType
    _min?: DriverMinAggregateInputType
    _max?: DriverMaxAggregateInputType
  }

  export type DriverGroupByOutputType = {
    id: string
    userId: string
    clientId: string
    licensePlate: string
    status: $Enums.DriverStatus
    workDays: number[]
    currentBalance: Decimal
    createdAt: Date
    updatedAt: Date
    _count: DriverCountAggregateOutputType | null
    _avg: DriverAvgAggregateOutputType | null
    _sum: DriverSumAggregateOutputType | null
    _min: DriverMinAggregateOutputType | null
    _max: DriverMaxAggregateOutputType | null
  }

  type GetDriverGroupByPayload<T extends DriverGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DriverGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DriverGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DriverGroupByOutputType[P]>
            : GetScalarType<T[P], DriverGroupByOutputType[P]>
        }
      >
    >


  export type DriverSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    clientId?: boolean
    licensePlate?: boolean
    status?: boolean
    workDays?: boolean
    currentBalance?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    client?: boolean | UserDefaultArgs<ExtArgs>
    ticketsReceived?: boolean | Driver$ticketsReceivedArgs<ExtArgs>
    locationEvents?: boolean | Driver$locationEventsArgs<ExtArgs>
    lotadorPartnerships?: boolean | Driver$lotadorPartnershipsArgs<ExtArgs>
    _count?: boolean | DriverCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["driver"]>

  export type DriverSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    clientId?: boolean
    licensePlate?: boolean
    status?: boolean
    workDays?: boolean
    currentBalance?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    client?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["driver"]>

  export type DriverSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    clientId?: boolean
    licensePlate?: boolean
    status?: boolean
    workDays?: boolean
    currentBalance?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    client?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["driver"]>

  export type DriverSelectScalar = {
    id?: boolean
    userId?: boolean
    clientId?: boolean
    licensePlate?: boolean
    status?: boolean
    workDays?: boolean
    currentBalance?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type DriverOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "clientId" | "licensePlate" | "status" | "workDays" | "currentBalance" | "createdAt" | "updatedAt", ExtArgs["result"]["driver"]>
  export type DriverInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    client?: boolean | UserDefaultArgs<ExtArgs>
    ticketsReceived?: boolean | Driver$ticketsReceivedArgs<ExtArgs>
    locationEvents?: boolean | Driver$locationEventsArgs<ExtArgs>
    lotadorPartnerships?: boolean | Driver$lotadorPartnershipsArgs<ExtArgs>
    _count?: boolean | DriverCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type DriverIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    client?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type DriverIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    client?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $DriverPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Driver"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      client: Prisma.$UserPayload<ExtArgs>
      ticketsReceived: Prisma.$TicketPayload<ExtArgs>[]
      locationEvents: Prisma.$LocationEventPayload<ExtArgs>[]
      lotadorPartnerships: Prisma.$LotadorPartnerPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      clientId: string
      licensePlate: string
      status: $Enums.DriverStatus
      workDays: number[]
      currentBalance: Prisma.Decimal
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["driver"]>
    composites: {}
  }

  type DriverGetPayload<S extends boolean | null | undefined | DriverDefaultArgs> = $Result.GetResult<Prisma.$DriverPayload, S>

  type DriverCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DriverFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DriverCountAggregateInputType | true
    }

  export interface DriverDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Driver'], meta: { name: 'Driver' } }
    /**
     * Find zero or one Driver that matches the filter.
     * @param {DriverFindUniqueArgs} args - Arguments to find a Driver
     * @example
     * // Get one Driver
     * const driver = await prisma.driver.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DriverFindUniqueArgs>(args: SelectSubset<T, DriverFindUniqueArgs<ExtArgs>>): Prisma__DriverClient<$Result.GetResult<Prisma.$DriverPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Driver that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DriverFindUniqueOrThrowArgs} args - Arguments to find a Driver
     * @example
     * // Get one Driver
     * const driver = await prisma.driver.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DriverFindUniqueOrThrowArgs>(args: SelectSubset<T, DriverFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DriverClient<$Result.GetResult<Prisma.$DriverPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Driver that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DriverFindFirstArgs} args - Arguments to find a Driver
     * @example
     * // Get one Driver
     * const driver = await prisma.driver.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DriverFindFirstArgs>(args?: SelectSubset<T, DriverFindFirstArgs<ExtArgs>>): Prisma__DriverClient<$Result.GetResult<Prisma.$DriverPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Driver that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DriverFindFirstOrThrowArgs} args - Arguments to find a Driver
     * @example
     * // Get one Driver
     * const driver = await prisma.driver.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DriverFindFirstOrThrowArgs>(args?: SelectSubset<T, DriverFindFirstOrThrowArgs<ExtArgs>>): Prisma__DriverClient<$Result.GetResult<Prisma.$DriverPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Drivers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DriverFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Drivers
     * const drivers = await prisma.driver.findMany()
     * 
     * // Get first 10 Drivers
     * const drivers = await prisma.driver.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const driverWithIdOnly = await prisma.driver.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DriverFindManyArgs>(args?: SelectSubset<T, DriverFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DriverPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Driver.
     * @param {DriverCreateArgs} args - Arguments to create a Driver.
     * @example
     * // Create one Driver
     * const Driver = await prisma.driver.create({
     *   data: {
     *     // ... data to create a Driver
     *   }
     * })
     * 
     */
    create<T extends DriverCreateArgs>(args: SelectSubset<T, DriverCreateArgs<ExtArgs>>): Prisma__DriverClient<$Result.GetResult<Prisma.$DriverPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Drivers.
     * @param {DriverCreateManyArgs} args - Arguments to create many Drivers.
     * @example
     * // Create many Drivers
     * const driver = await prisma.driver.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DriverCreateManyArgs>(args?: SelectSubset<T, DriverCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Drivers and returns the data saved in the database.
     * @param {DriverCreateManyAndReturnArgs} args - Arguments to create many Drivers.
     * @example
     * // Create many Drivers
     * const driver = await prisma.driver.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Drivers and only return the `id`
     * const driverWithIdOnly = await prisma.driver.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DriverCreateManyAndReturnArgs>(args?: SelectSubset<T, DriverCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DriverPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Driver.
     * @param {DriverDeleteArgs} args - Arguments to delete one Driver.
     * @example
     * // Delete one Driver
     * const Driver = await prisma.driver.delete({
     *   where: {
     *     // ... filter to delete one Driver
     *   }
     * })
     * 
     */
    delete<T extends DriverDeleteArgs>(args: SelectSubset<T, DriverDeleteArgs<ExtArgs>>): Prisma__DriverClient<$Result.GetResult<Prisma.$DriverPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Driver.
     * @param {DriverUpdateArgs} args - Arguments to update one Driver.
     * @example
     * // Update one Driver
     * const driver = await prisma.driver.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DriverUpdateArgs>(args: SelectSubset<T, DriverUpdateArgs<ExtArgs>>): Prisma__DriverClient<$Result.GetResult<Prisma.$DriverPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Drivers.
     * @param {DriverDeleteManyArgs} args - Arguments to filter Drivers to delete.
     * @example
     * // Delete a few Drivers
     * const { count } = await prisma.driver.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DriverDeleteManyArgs>(args?: SelectSubset<T, DriverDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Drivers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DriverUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Drivers
     * const driver = await prisma.driver.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DriverUpdateManyArgs>(args: SelectSubset<T, DriverUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Drivers and returns the data updated in the database.
     * @param {DriverUpdateManyAndReturnArgs} args - Arguments to update many Drivers.
     * @example
     * // Update many Drivers
     * const driver = await prisma.driver.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Drivers and only return the `id`
     * const driverWithIdOnly = await prisma.driver.updateManyAndReturn({
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
    updateManyAndReturn<T extends DriverUpdateManyAndReturnArgs>(args: SelectSubset<T, DriverUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DriverPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Driver.
     * @param {DriverUpsertArgs} args - Arguments to update or create a Driver.
     * @example
     * // Update or create a Driver
     * const driver = await prisma.driver.upsert({
     *   create: {
     *     // ... data to create a Driver
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Driver we want to update
     *   }
     * })
     */
    upsert<T extends DriverUpsertArgs>(args: SelectSubset<T, DriverUpsertArgs<ExtArgs>>): Prisma__DriverClient<$Result.GetResult<Prisma.$DriverPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Drivers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DriverCountArgs} args - Arguments to filter Drivers to count.
     * @example
     * // Count the number of Drivers
     * const count = await prisma.driver.count({
     *   where: {
     *     // ... the filter for the Drivers we want to count
     *   }
     * })
    **/
    count<T extends DriverCountArgs>(
      args?: Subset<T, DriverCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DriverCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Driver.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DriverAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends DriverAggregateArgs>(args: Subset<T, DriverAggregateArgs>): Prisma.PrismaPromise<GetDriverAggregateType<T>>

    /**
     * Group by Driver.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DriverGroupByArgs} args - Group by arguments.
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
      T extends DriverGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DriverGroupByArgs['orderBy'] }
        : { orderBy?: DriverGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, DriverGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDriverGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Driver model
   */
  readonly fields: DriverFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Driver.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DriverClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    client<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    ticketsReceived<T extends Driver$ticketsReceivedArgs<ExtArgs> = {}>(args?: Subset<T, Driver$ticketsReceivedArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TicketPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    locationEvents<T extends Driver$locationEventsArgs<ExtArgs> = {}>(args?: Subset<T, Driver$locationEventsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LocationEventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    lotadorPartnerships<T extends Driver$lotadorPartnershipsArgs<ExtArgs> = {}>(args?: Subset<T, Driver$lotadorPartnershipsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LotadorPartnerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Driver model
   */
  interface DriverFieldRefs {
    readonly id: FieldRef<"Driver", 'String'>
    readonly userId: FieldRef<"Driver", 'String'>
    readonly clientId: FieldRef<"Driver", 'String'>
    readonly licensePlate: FieldRef<"Driver", 'String'>
    readonly status: FieldRef<"Driver", 'DriverStatus'>
    readonly workDays: FieldRef<"Driver", 'Int[]'>
    readonly currentBalance: FieldRef<"Driver", 'Decimal'>
    readonly createdAt: FieldRef<"Driver", 'DateTime'>
    readonly updatedAt: FieldRef<"Driver", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Driver findUnique
   */
  export type DriverFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Driver
     */
    select?: DriverSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Driver
     */
    omit?: DriverOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DriverInclude<ExtArgs> | null
    /**
     * Filter, which Driver to fetch.
     */
    where: DriverWhereUniqueInput
  }

  /**
   * Driver findUniqueOrThrow
   */
  export type DriverFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Driver
     */
    select?: DriverSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Driver
     */
    omit?: DriverOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DriverInclude<ExtArgs> | null
    /**
     * Filter, which Driver to fetch.
     */
    where: DriverWhereUniqueInput
  }

  /**
   * Driver findFirst
   */
  export type DriverFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Driver
     */
    select?: DriverSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Driver
     */
    omit?: DriverOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DriverInclude<ExtArgs> | null
    /**
     * Filter, which Driver to fetch.
     */
    where?: DriverWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Drivers to fetch.
     */
    orderBy?: DriverOrderByWithRelationInput | DriverOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Drivers.
     */
    cursor?: DriverWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Drivers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Drivers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Drivers.
     */
    distinct?: DriverScalarFieldEnum | DriverScalarFieldEnum[]
  }

  /**
   * Driver findFirstOrThrow
   */
  export type DriverFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Driver
     */
    select?: DriverSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Driver
     */
    omit?: DriverOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DriverInclude<ExtArgs> | null
    /**
     * Filter, which Driver to fetch.
     */
    where?: DriverWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Drivers to fetch.
     */
    orderBy?: DriverOrderByWithRelationInput | DriverOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Drivers.
     */
    cursor?: DriverWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Drivers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Drivers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Drivers.
     */
    distinct?: DriverScalarFieldEnum | DriverScalarFieldEnum[]
  }

  /**
   * Driver findMany
   */
  export type DriverFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Driver
     */
    select?: DriverSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Driver
     */
    omit?: DriverOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DriverInclude<ExtArgs> | null
    /**
     * Filter, which Drivers to fetch.
     */
    where?: DriverWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Drivers to fetch.
     */
    orderBy?: DriverOrderByWithRelationInput | DriverOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Drivers.
     */
    cursor?: DriverWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Drivers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Drivers.
     */
    skip?: number
    distinct?: DriverScalarFieldEnum | DriverScalarFieldEnum[]
  }

  /**
   * Driver create
   */
  export type DriverCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Driver
     */
    select?: DriverSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Driver
     */
    omit?: DriverOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DriverInclude<ExtArgs> | null
    /**
     * The data needed to create a Driver.
     */
    data: XOR<DriverCreateInput, DriverUncheckedCreateInput>
  }

  /**
   * Driver createMany
   */
  export type DriverCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Drivers.
     */
    data: DriverCreateManyInput | DriverCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Driver createManyAndReturn
   */
  export type DriverCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Driver
     */
    select?: DriverSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Driver
     */
    omit?: DriverOmit<ExtArgs> | null
    /**
     * The data used to create many Drivers.
     */
    data: DriverCreateManyInput | DriverCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DriverIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Driver update
   */
  export type DriverUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Driver
     */
    select?: DriverSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Driver
     */
    omit?: DriverOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DriverInclude<ExtArgs> | null
    /**
     * The data needed to update a Driver.
     */
    data: XOR<DriverUpdateInput, DriverUncheckedUpdateInput>
    /**
     * Choose, which Driver to update.
     */
    where: DriverWhereUniqueInput
  }

  /**
   * Driver updateMany
   */
  export type DriverUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Drivers.
     */
    data: XOR<DriverUpdateManyMutationInput, DriverUncheckedUpdateManyInput>
    /**
     * Filter which Drivers to update
     */
    where?: DriverWhereInput
    /**
     * Limit how many Drivers to update.
     */
    limit?: number
  }

  /**
   * Driver updateManyAndReturn
   */
  export type DriverUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Driver
     */
    select?: DriverSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Driver
     */
    omit?: DriverOmit<ExtArgs> | null
    /**
     * The data used to update Drivers.
     */
    data: XOR<DriverUpdateManyMutationInput, DriverUncheckedUpdateManyInput>
    /**
     * Filter which Drivers to update
     */
    where?: DriverWhereInput
    /**
     * Limit how many Drivers to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DriverIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Driver upsert
   */
  export type DriverUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Driver
     */
    select?: DriverSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Driver
     */
    omit?: DriverOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DriverInclude<ExtArgs> | null
    /**
     * The filter to search for the Driver to update in case it exists.
     */
    where: DriverWhereUniqueInput
    /**
     * In case the Driver found by the `where` argument doesn't exist, create a new Driver with this data.
     */
    create: XOR<DriverCreateInput, DriverUncheckedCreateInput>
    /**
     * In case the Driver was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DriverUpdateInput, DriverUncheckedUpdateInput>
  }

  /**
   * Driver delete
   */
  export type DriverDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Driver
     */
    select?: DriverSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Driver
     */
    omit?: DriverOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DriverInclude<ExtArgs> | null
    /**
     * Filter which Driver to delete.
     */
    where: DriverWhereUniqueInput
  }

  /**
   * Driver deleteMany
   */
  export type DriverDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Drivers to delete
     */
    where?: DriverWhereInput
    /**
     * Limit how many Drivers to delete.
     */
    limit?: number
  }

  /**
   * Driver.ticketsReceived
   */
  export type Driver$ticketsReceivedArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ticket
     */
    select?: TicketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ticket
     */
    omit?: TicketOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TicketInclude<ExtArgs> | null
    where?: TicketWhereInput
    orderBy?: TicketOrderByWithRelationInput | TicketOrderByWithRelationInput[]
    cursor?: TicketWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TicketScalarFieldEnum | TicketScalarFieldEnum[]
  }

  /**
   * Driver.locationEvents
   */
  export type Driver$locationEventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LocationEvent
     */
    select?: LocationEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LocationEvent
     */
    omit?: LocationEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationEventInclude<ExtArgs> | null
    where?: LocationEventWhereInput
    orderBy?: LocationEventOrderByWithRelationInput | LocationEventOrderByWithRelationInput[]
    cursor?: LocationEventWhereUniqueInput
    take?: number
    skip?: number
    distinct?: LocationEventScalarFieldEnum | LocationEventScalarFieldEnum[]
  }

  /**
   * Driver.lotadorPartnerships
   */
  export type Driver$lotadorPartnershipsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LotadorPartner
     */
    select?: LotadorPartnerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LotadorPartner
     */
    omit?: LotadorPartnerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LotadorPartnerInclude<ExtArgs> | null
    where?: LotadorPartnerWhereInput
    orderBy?: LotadorPartnerOrderByWithRelationInput | LotadorPartnerOrderByWithRelationInput[]
    cursor?: LotadorPartnerWhereUniqueInput
    take?: number
    skip?: number
    distinct?: LotadorPartnerScalarFieldEnum | LotadorPartnerScalarFieldEnum[]
  }

  /**
   * Driver without action
   */
  export type DriverDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Driver
     */
    select?: DriverSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Driver
     */
    omit?: DriverOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DriverInclude<ExtArgs> | null
  }


  /**
   * Model Wallet
   */

  export type AggregateWallet = {
    _count: WalletCountAggregateOutputType | null
    _avg: WalletAvgAggregateOutputType | null
    _sum: WalletSumAggregateOutputType | null
    _min: WalletMinAggregateOutputType | null
    _max: WalletMaxAggregateOutputType | null
  }

  export type WalletAvgAggregateOutputType = {
    balance: Decimal | null
  }

  export type WalletSumAggregateOutputType = {
    balance: Decimal | null
  }

  export type WalletMinAggregateOutputType = {
    id: string | null
    userId: string | null
    balance: Decimal | null
    currency: string | null
    updatedAt: Date | null
    createdAt: Date | null
  }

  export type WalletMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    balance: Decimal | null
    currency: string | null
    updatedAt: Date | null
    createdAt: Date | null
  }

  export type WalletCountAggregateOutputType = {
    id: number
    userId: number
    balance: number
    currency: number
    updatedAt: number
    createdAt: number
    _all: number
  }


  export type WalletAvgAggregateInputType = {
    balance?: true
  }

  export type WalletSumAggregateInputType = {
    balance?: true
  }

  export type WalletMinAggregateInputType = {
    id?: true
    userId?: true
    balance?: true
    currency?: true
    updatedAt?: true
    createdAt?: true
  }

  export type WalletMaxAggregateInputType = {
    id?: true
    userId?: true
    balance?: true
    currency?: true
    updatedAt?: true
    createdAt?: true
  }

  export type WalletCountAggregateInputType = {
    id?: true
    userId?: true
    balance?: true
    currency?: true
    updatedAt?: true
    createdAt?: true
    _all?: true
  }

  export type WalletAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Wallet to aggregate.
     */
    where?: WalletWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Wallets to fetch.
     */
    orderBy?: WalletOrderByWithRelationInput | WalletOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: WalletWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Wallets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Wallets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Wallets
    **/
    _count?: true | WalletCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: WalletAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: WalletSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: WalletMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: WalletMaxAggregateInputType
  }

  export type GetWalletAggregateType<T extends WalletAggregateArgs> = {
        [P in keyof T & keyof AggregateWallet]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWallet[P]>
      : GetScalarType<T[P], AggregateWallet[P]>
  }




  export type WalletGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WalletWhereInput
    orderBy?: WalletOrderByWithAggregationInput | WalletOrderByWithAggregationInput[]
    by: WalletScalarFieldEnum[] | WalletScalarFieldEnum
    having?: WalletScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: WalletCountAggregateInputType | true
    _avg?: WalletAvgAggregateInputType
    _sum?: WalletSumAggregateInputType
    _min?: WalletMinAggregateInputType
    _max?: WalletMaxAggregateInputType
  }

  export type WalletGroupByOutputType = {
    id: string
    userId: string
    balance: Decimal
    currency: string
    updatedAt: Date
    createdAt: Date
    _count: WalletCountAggregateOutputType | null
    _avg: WalletAvgAggregateOutputType | null
    _sum: WalletSumAggregateOutputType | null
    _min: WalletMinAggregateOutputType | null
    _max: WalletMaxAggregateOutputType | null
  }

  type GetWalletGroupByPayload<T extends WalletGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<WalletGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof WalletGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], WalletGroupByOutputType[P]>
            : GetScalarType<T[P], WalletGroupByOutputType[P]>
        }
      >
    >


  export type WalletSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    balance?: boolean
    currency?: boolean
    updatedAt?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    transactions?: boolean | Wallet$transactionsArgs<ExtArgs>
    _count?: boolean | WalletCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["wallet"]>

  export type WalletSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    balance?: boolean
    currency?: boolean
    updatedAt?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["wallet"]>

  export type WalletSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    balance?: boolean
    currency?: boolean
    updatedAt?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["wallet"]>

  export type WalletSelectScalar = {
    id?: boolean
    userId?: boolean
    balance?: boolean
    currency?: boolean
    updatedAt?: boolean
    createdAt?: boolean
  }

  export type WalletOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "balance" | "currency" | "updatedAt" | "createdAt", ExtArgs["result"]["wallet"]>
  export type WalletInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    transactions?: boolean | Wallet$transactionsArgs<ExtArgs>
    _count?: boolean | WalletCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type WalletIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type WalletIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $WalletPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Wallet"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      transactions: Prisma.$TransactionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      balance: Prisma.Decimal
      currency: string
      updatedAt: Date
      createdAt: Date
    }, ExtArgs["result"]["wallet"]>
    composites: {}
  }

  type WalletGetPayload<S extends boolean | null | undefined | WalletDefaultArgs> = $Result.GetResult<Prisma.$WalletPayload, S>

  type WalletCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<WalletFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: WalletCountAggregateInputType | true
    }

  export interface WalletDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Wallet'], meta: { name: 'Wallet' } }
    /**
     * Find zero or one Wallet that matches the filter.
     * @param {WalletFindUniqueArgs} args - Arguments to find a Wallet
     * @example
     * // Get one Wallet
     * const wallet = await prisma.wallet.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends WalletFindUniqueArgs>(args: SelectSubset<T, WalletFindUniqueArgs<ExtArgs>>): Prisma__WalletClient<$Result.GetResult<Prisma.$WalletPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Wallet that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {WalletFindUniqueOrThrowArgs} args - Arguments to find a Wallet
     * @example
     * // Get one Wallet
     * const wallet = await prisma.wallet.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends WalletFindUniqueOrThrowArgs>(args: SelectSubset<T, WalletFindUniqueOrThrowArgs<ExtArgs>>): Prisma__WalletClient<$Result.GetResult<Prisma.$WalletPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Wallet that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WalletFindFirstArgs} args - Arguments to find a Wallet
     * @example
     * // Get one Wallet
     * const wallet = await prisma.wallet.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends WalletFindFirstArgs>(args?: SelectSubset<T, WalletFindFirstArgs<ExtArgs>>): Prisma__WalletClient<$Result.GetResult<Prisma.$WalletPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Wallet that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WalletFindFirstOrThrowArgs} args - Arguments to find a Wallet
     * @example
     * // Get one Wallet
     * const wallet = await prisma.wallet.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends WalletFindFirstOrThrowArgs>(args?: SelectSubset<T, WalletFindFirstOrThrowArgs<ExtArgs>>): Prisma__WalletClient<$Result.GetResult<Prisma.$WalletPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Wallets that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WalletFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Wallets
     * const wallets = await prisma.wallet.findMany()
     * 
     * // Get first 10 Wallets
     * const wallets = await prisma.wallet.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const walletWithIdOnly = await prisma.wallet.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends WalletFindManyArgs>(args?: SelectSubset<T, WalletFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WalletPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Wallet.
     * @param {WalletCreateArgs} args - Arguments to create a Wallet.
     * @example
     * // Create one Wallet
     * const Wallet = await prisma.wallet.create({
     *   data: {
     *     // ... data to create a Wallet
     *   }
     * })
     * 
     */
    create<T extends WalletCreateArgs>(args: SelectSubset<T, WalletCreateArgs<ExtArgs>>): Prisma__WalletClient<$Result.GetResult<Prisma.$WalletPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Wallets.
     * @param {WalletCreateManyArgs} args - Arguments to create many Wallets.
     * @example
     * // Create many Wallets
     * const wallet = await prisma.wallet.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends WalletCreateManyArgs>(args?: SelectSubset<T, WalletCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Wallets and returns the data saved in the database.
     * @param {WalletCreateManyAndReturnArgs} args - Arguments to create many Wallets.
     * @example
     * // Create many Wallets
     * const wallet = await prisma.wallet.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Wallets and only return the `id`
     * const walletWithIdOnly = await prisma.wallet.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends WalletCreateManyAndReturnArgs>(args?: SelectSubset<T, WalletCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WalletPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Wallet.
     * @param {WalletDeleteArgs} args - Arguments to delete one Wallet.
     * @example
     * // Delete one Wallet
     * const Wallet = await prisma.wallet.delete({
     *   where: {
     *     // ... filter to delete one Wallet
     *   }
     * })
     * 
     */
    delete<T extends WalletDeleteArgs>(args: SelectSubset<T, WalletDeleteArgs<ExtArgs>>): Prisma__WalletClient<$Result.GetResult<Prisma.$WalletPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Wallet.
     * @param {WalletUpdateArgs} args - Arguments to update one Wallet.
     * @example
     * // Update one Wallet
     * const wallet = await prisma.wallet.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends WalletUpdateArgs>(args: SelectSubset<T, WalletUpdateArgs<ExtArgs>>): Prisma__WalletClient<$Result.GetResult<Prisma.$WalletPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Wallets.
     * @param {WalletDeleteManyArgs} args - Arguments to filter Wallets to delete.
     * @example
     * // Delete a few Wallets
     * const { count } = await prisma.wallet.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends WalletDeleteManyArgs>(args?: SelectSubset<T, WalletDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Wallets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WalletUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Wallets
     * const wallet = await prisma.wallet.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends WalletUpdateManyArgs>(args: SelectSubset<T, WalletUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Wallets and returns the data updated in the database.
     * @param {WalletUpdateManyAndReturnArgs} args - Arguments to update many Wallets.
     * @example
     * // Update many Wallets
     * const wallet = await prisma.wallet.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Wallets and only return the `id`
     * const walletWithIdOnly = await prisma.wallet.updateManyAndReturn({
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
    updateManyAndReturn<T extends WalletUpdateManyAndReturnArgs>(args: SelectSubset<T, WalletUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WalletPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Wallet.
     * @param {WalletUpsertArgs} args - Arguments to update or create a Wallet.
     * @example
     * // Update or create a Wallet
     * const wallet = await prisma.wallet.upsert({
     *   create: {
     *     // ... data to create a Wallet
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Wallet we want to update
     *   }
     * })
     */
    upsert<T extends WalletUpsertArgs>(args: SelectSubset<T, WalletUpsertArgs<ExtArgs>>): Prisma__WalletClient<$Result.GetResult<Prisma.$WalletPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Wallets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WalletCountArgs} args - Arguments to filter Wallets to count.
     * @example
     * // Count the number of Wallets
     * const count = await prisma.wallet.count({
     *   where: {
     *     // ... the filter for the Wallets we want to count
     *   }
     * })
    **/
    count<T extends WalletCountArgs>(
      args?: Subset<T, WalletCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WalletCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Wallet.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WalletAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends WalletAggregateArgs>(args: Subset<T, WalletAggregateArgs>): Prisma.PrismaPromise<GetWalletAggregateType<T>>

    /**
     * Group by Wallet.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WalletGroupByArgs} args - Group by arguments.
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
      T extends WalletGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: WalletGroupByArgs['orderBy'] }
        : { orderBy?: WalletGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, WalletGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWalletGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Wallet model
   */
  readonly fields: WalletFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Wallet.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__WalletClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    transactions<T extends Wallet$transactionsArgs<ExtArgs> = {}>(args?: Subset<T, Wallet$transactionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Wallet model
   */
  interface WalletFieldRefs {
    readonly id: FieldRef<"Wallet", 'String'>
    readonly userId: FieldRef<"Wallet", 'String'>
    readonly balance: FieldRef<"Wallet", 'Decimal'>
    readonly currency: FieldRef<"Wallet", 'String'>
    readonly updatedAt: FieldRef<"Wallet", 'DateTime'>
    readonly createdAt: FieldRef<"Wallet", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Wallet findUnique
   */
  export type WalletFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wallet
     */
    select?: WalletSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Wallet
     */
    omit?: WalletOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WalletInclude<ExtArgs> | null
    /**
     * Filter, which Wallet to fetch.
     */
    where: WalletWhereUniqueInput
  }

  /**
   * Wallet findUniqueOrThrow
   */
  export type WalletFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wallet
     */
    select?: WalletSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Wallet
     */
    omit?: WalletOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WalletInclude<ExtArgs> | null
    /**
     * Filter, which Wallet to fetch.
     */
    where: WalletWhereUniqueInput
  }

  /**
   * Wallet findFirst
   */
  export type WalletFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wallet
     */
    select?: WalletSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Wallet
     */
    omit?: WalletOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WalletInclude<ExtArgs> | null
    /**
     * Filter, which Wallet to fetch.
     */
    where?: WalletWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Wallets to fetch.
     */
    orderBy?: WalletOrderByWithRelationInput | WalletOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Wallets.
     */
    cursor?: WalletWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Wallets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Wallets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Wallets.
     */
    distinct?: WalletScalarFieldEnum | WalletScalarFieldEnum[]
  }

  /**
   * Wallet findFirstOrThrow
   */
  export type WalletFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wallet
     */
    select?: WalletSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Wallet
     */
    omit?: WalletOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WalletInclude<ExtArgs> | null
    /**
     * Filter, which Wallet to fetch.
     */
    where?: WalletWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Wallets to fetch.
     */
    orderBy?: WalletOrderByWithRelationInput | WalletOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Wallets.
     */
    cursor?: WalletWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Wallets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Wallets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Wallets.
     */
    distinct?: WalletScalarFieldEnum | WalletScalarFieldEnum[]
  }

  /**
   * Wallet findMany
   */
  export type WalletFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wallet
     */
    select?: WalletSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Wallet
     */
    omit?: WalletOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WalletInclude<ExtArgs> | null
    /**
     * Filter, which Wallets to fetch.
     */
    where?: WalletWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Wallets to fetch.
     */
    orderBy?: WalletOrderByWithRelationInput | WalletOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Wallets.
     */
    cursor?: WalletWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Wallets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Wallets.
     */
    skip?: number
    distinct?: WalletScalarFieldEnum | WalletScalarFieldEnum[]
  }

  /**
   * Wallet create
   */
  export type WalletCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wallet
     */
    select?: WalletSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Wallet
     */
    omit?: WalletOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WalletInclude<ExtArgs> | null
    /**
     * The data needed to create a Wallet.
     */
    data: XOR<WalletCreateInput, WalletUncheckedCreateInput>
  }

  /**
   * Wallet createMany
   */
  export type WalletCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Wallets.
     */
    data: WalletCreateManyInput | WalletCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Wallet createManyAndReturn
   */
  export type WalletCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wallet
     */
    select?: WalletSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Wallet
     */
    omit?: WalletOmit<ExtArgs> | null
    /**
     * The data used to create many Wallets.
     */
    data: WalletCreateManyInput | WalletCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WalletIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Wallet update
   */
  export type WalletUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wallet
     */
    select?: WalletSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Wallet
     */
    omit?: WalletOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WalletInclude<ExtArgs> | null
    /**
     * The data needed to update a Wallet.
     */
    data: XOR<WalletUpdateInput, WalletUncheckedUpdateInput>
    /**
     * Choose, which Wallet to update.
     */
    where: WalletWhereUniqueInput
  }

  /**
   * Wallet updateMany
   */
  export type WalletUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Wallets.
     */
    data: XOR<WalletUpdateManyMutationInput, WalletUncheckedUpdateManyInput>
    /**
     * Filter which Wallets to update
     */
    where?: WalletWhereInput
    /**
     * Limit how many Wallets to update.
     */
    limit?: number
  }

  /**
   * Wallet updateManyAndReturn
   */
  export type WalletUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wallet
     */
    select?: WalletSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Wallet
     */
    omit?: WalletOmit<ExtArgs> | null
    /**
     * The data used to update Wallets.
     */
    data: XOR<WalletUpdateManyMutationInput, WalletUncheckedUpdateManyInput>
    /**
     * Filter which Wallets to update
     */
    where?: WalletWhereInput
    /**
     * Limit how many Wallets to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WalletIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Wallet upsert
   */
  export type WalletUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wallet
     */
    select?: WalletSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Wallet
     */
    omit?: WalletOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WalletInclude<ExtArgs> | null
    /**
     * The filter to search for the Wallet to update in case it exists.
     */
    where: WalletWhereUniqueInput
    /**
     * In case the Wallet found by the `where` argument doesn't exist, create a new Wallet with this data.
     */
    create: XOR<WalletCreateInput, WalletUncheckedCreateInput>
    /**
     * In case the Wallet was found with the provided `where` argument, update it with this data.
     */
    update: XOR<WalletUpdateInput, WalletUncheckedUpdateInput>
  }

  /**
   * Wallet delete
   */
  export type WalletDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wallet
     */
    select?: WalletSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Wallet
     */
    omit?: WalletOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WalletInclude<ExtArgs> | null
    /**
     * Filter which Wallet to delete.
     */
    where: WalletWhereUniqueInput
  }

  /**
   * Wallet deleteMany
   */
  export type WalletDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Wallets to delete
     */
    where?: WalletWhereInput
    /**
     * Limit how many Wallets to delete.
     */
    limit?: number
  }

  /**
   * Wallet.transactions
   */
  export type Wallet$transactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    where?: TransactionWhereInput
    orderBy?: TransactionOrderByWithRelationInput | TransactionOrderByWithRelationInput[]
    cursor?: TransactionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TransactionScalarFieldEnum | TransactionScalarFieldEnum[]
  }

  /**
   * Wallet without action
   */
  export type WalletDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wallet
     */
    select?: WalletSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Wallet
     */
    omit?: WalletOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WalletInclude<ExtArgs> | null
  }


  /**
   * Model Ticket
   */

  export type AggregateTicket = {
    _count: TicketCountAggregateOutputType | null
    _avg: TicketAvgAggregateOutputType | null
    _sum: TicketSumAggregateOutputType | null
    _min: TicketMinAggregateOutputType | null
    _max: TicketMaxAggregateOutputType | null
  }

  export type TicketAvgAggregateOutputType = {
    amount: Decimal | null
  }

  export type TicketSumAggregateOutputType = {
    amount: Decimal | null
  }

  export type TicketMinAggregateOutputType = {
    id: string | null
    passengerId: string | null
    driverId: string | null
    issuedById: string | null
    amount: Decimal | null
    status: $Enums.TicketStatus | null
    qrNonce: string | null
    shortCode: string | null
    transferredToId: string | null
    transferredAt: Date | null
    cancelReason: string | null
    cancelledById: string | null
    usedAt: Date | null
    expiresAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TicketMaxAggregateOutputType = {
    id: string | null
    passengerId: string | null
    driverId: string | null
    issuedById: string | null
    amount: Decimal | null
    status: $Enums.TicketStatus | null
    qrNonce: string | null
    shortCode: string | null
    transferredToId: string | null
    transferredAt: Date | null
    cancelReason: string | null
    cancelledById: string | null
    usedAt: Date | null
    expiresAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TicketCountAggregateOutputType = {
    id: number
    passengerId: number
    driverId: number
    issuedById: number
    amount: number
    status: number
    qrNonce: number
    shortCode: number
    transferredToId: number
    transferredAt: number
    cancelReason: number
    cancelledById: number
    usedAt: number
    expiresAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type TicketAvgAggregateInputType = {
    amount?: true
  }

  export type TicketSumAggregateInputType = {
    amount?: true
  }

  export type TicketMinAggregateInputType = {
    id?: true
    passengerId?: true
    driverId?: true
    issuedById?: true
    amount?: true
    status?: true
    qrNonce?: true
    shortCode?: true
    transferredToId?: true
    transferredAt?: true
    cancelReason?: true
    cancelledById?: true
    usedAt?: true
    expiresAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TicketMaxAggregateInputType = {
    id?: true
    passengerId?: true
    driverId?: true
    issuedById?: true
    amount?: true
    status?: true
    qrNonce?: true
    shortCode?: true
    transferredToId?: true
    transferredAt?: true
    cancelReason?: true
    cancelledById?: true
    usedAt?: true
    expiresAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TicketCountAggregateInputType = {
    id?: true
    passengerId?: true
    driverId?: true
    issuedById?: true
    amount?: true
    status?: true
    qrNonce?: true
    shortCode?: true
    transferredToId?: true
    transferredAt?: true
    cancelReason?: true
    cancelledById?: true
    usedAt?: true
    expiresAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type TicketAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Ticket to aggregate.
     */
    where?: TicketWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tickets to fetch.
     */
    orderBy?: TicketOrderByWithRelationInput | TicketOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TicketWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tickets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tickets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Tickets
    **/
    _count?: true | TicketCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TicketAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TicketSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TicketMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TicketMaxAggregateInputType
  }

  export type GetTicketAggregateType<T extends TicketAggregateArgs> = {
        [P in keyof T & keyof AggregateTicket]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTicket[P]>
      : GetScalarType<T[P], AggregateTicket[P]>
  }




  export type TicketGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TicketWhereInput
    orderBy?: TicketOrderByWithAggregationInput | TicketOrderByWithAggregationInput[]
    by: TicketScalarFieldEnum[] | TicketScalarFieldEnum
    having?: TicketScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TicketCountAggregateInputType | true
    _avg?: TicketAvgAggregateInputType
    _sum?: TicketSumAggregateInputType
    _min?: TicketMinAggregateInputType
    _max?: TicketMaxAggregateInputType
  }

  export type TicketGroupByOutputType = {
    id: string
    passengerId: string
    driverId: string
    issuedById: string
    amount: Decimal
    status: $Enums.TicketStatus
    qrNonce: string
    shortCode: string | null
    transferredToId: string | null
    transferredAt: Date | null
    cancelReason: string | null
    cancelledById: string | null
    usedAt: Date | null
    expiresAt: Date
    createdAt: Date
    updatedAt: Date
    _count: TicketCountAggregateOutputType | null
    _avg: TicketAvgAggregateOutputType | null
    _sum: TicketSumAggregateOutputType | null
    _min: TicketMinAggregateOutputType | null
    _max: TicketMaxAggregateOutputType | null
  }

  type GetTicketGroupByPayload<T extends TicketGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TicketGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TicketGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TicketGroupByOutputType[P]>
            : GetScalarType<T[P], TicketGroupByOutputType[P]>
        }
      >
    >


  export type TicketSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    passengerId?: boolean
    driverId?: boolean
    issuedById?: boolean
    amount?: boolean
    status?: boolean
    qrNonce?: boolean
    shortCode?: boolean
    transferredToId?: boolean
    transferredAt?: boolean
    cancelReason?: boolean
    cancelledById?: boolean
    usedAt?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    passenger?: boolean | UserDefaultArgs<ExtArgs>
    driver?: boolean | DriverDefaultArgs<ExtArgs>
    issuedBy?: boolean | UserDefaultArgs<ExtArgs>
    transferredTo?: boolean | Ticket$transferredToArgs<ExtArgs>
    transaction?: boolean | Ticket$transactionArgs<ExtArgs>
  }, ExtArgs["result"]["ticket"]>

  export type TicketSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    passengerId?: boolean
    driverId?: boolean
    issuedById?: boolean
    amount?: boolean
    status?: boolean
    qrNonce?: boolean
    shortCode?: boolean
    transferredToId?: boolean
    transferredAt?: boolean
    cancelReason?: boolean
    cancelledById?: boolean
    usedAt?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    passenger?: boolean | UserDefaultArgs<ExtArgs>
    driver?: boolean | DriverDefaultArgs<ExtArgs>
    issuedBy?: boolean | UserDefaultArgs<ExtArgs>
    transferredTo?: boolean | Ticket$transferredToArgs<ExtArgs>
  }, ExtArgs["result"]["ticket"]>

  export type TicketSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    passengerId?: boolean
    driverId?: boolean
    issuedById?: boolean
    amount?: boolean
    status?: boolean
    qrNonce?: boolean
    shortCode?: boolean
    transferredToId?: boolean
    transferredAt?: boolean
    cancelReason?: boolean
    cancelledById?: boolean
    usedAt?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    passenger?: boolean | UserDefaultArgs<ExtArgs>
    driver?: boolean | DriverDefaultArgs<ExtArgs>
    issuedBy?: boolean | UserDefaultArgs<ExtArgs>
    transferredTo?: boolean | Ticket$transferredToArgs<ExtArgs>
  }, ExtArgs["result"]["ticket"]>

  export type TicketSelectScalar = {
    id?: boolean
    passengerId?: boolean
    driverId?: boolean
    issuedById?: boolean
    amount?: boolean
    status?: boolean
    qrNonce?: boolean
    shortCode?: boolean
    transferredToId?: boolean
    transferredAt?: boolean
    cancelReason?: boolean
    cancelledById?: boolean
    usedAt?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type TicketOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "passengerId" | "driverId" | "issuedById" | "amount" | "status" | "qrNonce" | "shortCode" | "transferredToId" | "transferredAt" | "cancelReason" | "cancelledById" | "usedAt" | "expiresAt" | "createdAt" | "updatedAt", ExtArgs["result"]["ticket"]>
  export type TicketInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    passenger?: boolean | UserDefaultArgs<ExtArgs>
    driver?: boolean | DriverDefaultArgs<ExtArgs>
    issuedBy?: boolean | UserDefaultArgs<ExtArgs>
    transferredTo?: boolean | Ticket$transferredToArgs<ExtArgs>
    transaction?: boolean | Ticket$transactionArgs<ExtArgs>
  }
  export type TicketIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    passenger?: boolean | UserDefaultArgs<ExtArgs>
    driver?: boolean | DriverDefaultArgs<ExtArgs>
    issuedBy?: boolean | UserDefaultArgs<ExtArgs>
    transferredTo?: boolean | Ticket$transferredToArgs<ExtArgs>
  }
  export type TicketIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    passenger?: boolean | UserDefaultArgs<ExtArgs>
    driver?: boolean | DriverDefaultArgs<ExtArgs>
    issuedBy?: boolean | UserDefaultArgs<ExtArgs>
    transferredTo?: boolean | Ticket$transferredToArgs<ExtArgs>
  }

  export type $TicketPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Ticket"
    objects: {
      passenger: Prisma.$UserPayload<ExtArgs>
      driver: Prisma.$DriverPayload<ExtArgs>
      issuedBy: Prisma.$UserPayload<ExtArgs>
      transferredTo: Prisma.$UserPayload<ExtArgs> | null
      transaction: Prisma.$TransactionPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      passengerId: string
      driverId: string
      issuedById: string
      amount: Prisma.Decimal
      status: $Enums.TicketStatus
      qrNonce: string
      shortCode: string | null
      transferredToId: string | null
      transferredAt: Date | null
      cancelReason: string | null
      cancelledById: string | null
      usedAt: Date | null
      expiresAt: Date
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["ticket"]>
    composites: {}
  }

  type TicketGetPayload<S extends boolean | null | undefined | TicketDefaultArgs> = $Result.GetResult<Prisma.$TicketPayload, S>

  type TicketCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TicketFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TicketCountAggregateInputType | true
    }

  export interface TicketDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Ticket'], meta: { name: 'Ticket' } }
    /**
     * Find zero or one Ticket that matches the filter.
     * @param {TicketFindUniqueArgs} args - Arguments to find a Ticket
     * @example
     * // Get one Ticket
     * const ticket = await prisma.ticket.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TicketFindUniqueArgs>(args: SelectSubset<T, TicketFindUniqueArgs<ExtArgs>>): Prisma__TicketClient<$Result.GetResult<Prisma.$TicketPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Ticket that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TicketFindUniqueOrThrowArgs} args - Arguments to find a Ticket
     * @example
     * // Get one Ticket
     * const ticket = await prisma.ticket.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TicketFindUniqueOrThrowArgs>(args: SelectSubset<T, TicketFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TicketClient<$Result.GetResult<Prisma.$TicketPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Ticket that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TicketFindFirstArgs} args - Arguments to find a Ticket
     * @example
     * // Get one Ticket
     * const ticket = await prisma.ticket.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TicketFindFirstArgs>(args?: SelectSubset<T, TicketFindFirstArgs<ExtArgs>>): Prisma__TicketClient<$Result.GetResult<Prisma.$TicketPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Ticket that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TicketFindFirstOrThrowArgs} args - Arguments to find a Ticket
     * @example
     * // Get one Ticket
     * const ticket = await prisma.ticket.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TicketFindFirstOrThrowArgs>(args?: SelectSubset<T, TicketFindFirstOrThrowArgs<ExtArgs>>): Prisma__TicketClient<$Result.GetResult<Prisma.$TicketPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Tickets that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TicketFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Tickets
     * const tickets = await prisma.ticket.findMany()
     * 
     * // Get first 10 Tickets
     * const tickets = await prisma.ticket.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const ticketWithIdOnly = await prisma.ticket.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TicketFindManyArgs>(args?: SelectSubset<T, TicketFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TicketPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Ticket.
     * @param {TicketCreateArgs} args - Arguments to create a Ticket.
     * @example
     * // Create one Ticket
     * const Ticket = await prisma.ticket.create({
     *   data: {
     *     // ... data to create a Ticket
     *   }
     * })
     * 
     */
    create<T extends TicketCreateArgs>(args: SelectSubset<T, TicketCreateArgs<ExtArgs>>): Prisma__TicketClient<$Result.GetResult<Prisma.$TicketPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Tickets.
     * @param {TicketCreateManyArgs} args - Arguments to create many Tickets.
     * @example
     * // Create many Tickets
     * const ticket = await prisma.ticket.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TicketCreateManyArgs>(args?: SelectSubset<T, TicketCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Tickets and returns the data saved in the database.
     * @param {TicketCreateManyAndReturnArgs} args - Arguments to create many Tickets.
     * @example
     * // Create many Tickets
     * const ticket = await prisma.ticket.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Tickets and only return the `id`
     * const ticketWithIdOnly = await prisma.ticket.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TicketCreateManyAndReturnArgs>(args?: SelectSubset<T, TicketCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TicketPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Ticket.
     * @param {TicketDeleteArgs} args - Arguments to delete one Ticket.
     * @example
     * // Delete one Ticket
     * const Ticket = await prisma.ticket.delete({
     *   where: {
     *     // ... filter to delete one Ticket
     *   }
     * })
     * 
     */
    delete<T extends TicketDeleteArgs>(args: SelectSubset<T, TicketDeleteArgs<ExtArgs>>): Prisma__TicketClient<$Result.GetResult<Prisma.$TicketPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Ticket.
     * @param {TicketUpdateArgs} args - Arguments to update one Ticket.
     * @example
     * // Update one Ticket
     * const ticket = await prisma.ticket.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TicketUpdateArgs>(args: SelectSubset<T, TicketUpdateArgs<ExtArgs>>): Prisma__TicketClient<$Result.GetResult<Prisma.$TicketPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Tickets.
     * @param {TicketDeleteManyArgs} args - Arguments to filter Tickets to delete.
     * @example
     * // Delete a few Tickets
     * const { count } = await prisma.ticket.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TicketDeleteManyArgs>(args?: SelectSubset<T, TicketDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tickets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TicketUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Tickets
     * const ticket = await prisma.ticket.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TicketUpdateManyArgs>(args: SelectSubset<T, TicketUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tickets and returns the data updated in the database.
     * @param {TicketUpdateManyAndReturnArgs} args - Arguments to update many Tickets.
     * @example
     * // Update many Tickets
     * const ticket = await prisma.ticket.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Tickets and only return the `id`
     * const ticketWithIdOnly = await prisma.ticket.updateManyAndReturn({
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
    updateManyAndReturn<T extends TicketUpdateManyAndReturnArgs>(args: SelectSubset<T, TicketUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TicketPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Ticket.
     * @param {TicketUpsertArgs} args - Arguments to update or create a Ticket.
     * @example
     * // Update or create a Ticket
     * const ticket = await prisma.ticket.upsert({
     *   create: {
     *     // ... data to create a Ticket
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Ticket we want to update
     *   }
     * })
     */
    upsert<T extends TicketUpsertArgs>(args: SelectSubset<T, TicketUpsertArgs<ExtArgs>>): Prisma__TicketClient<$Result.GetResult<Prisma.$TicketPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Tickets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TicketCountArgs} args - Arguments to filter Tickets to count.
     * @example
     * // Count the number of Tickets
     * const count = await prisma.ticket.count({
     *   where: {
     *     // ... the filter for the Tickets we want to count
     *   }
     * })
    **/
    count<T extends TicketCountArgs>(
      args?: Subset<T, TicketCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TicketCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Ticket.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TicketAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends TicketAggregateArgs>(args: Subset<T, TicketAggregateArgs>): Prisma.PrismaPromise<GetTicketAggregateType<T>>

    /**
     * Group by Ticket.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TicketGroupByArgs} args - Group by arguments.
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
      T extends TicketGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TicketGroupByArgs['orderBy'] }
        : { orderBy?: TicketGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, TicketGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTicketGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Ticket model
   */
  readonly fields: TicketFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Ticket.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TicketClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    passenger<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    driver<T extends DriverDefaultArgs<ExtArgs> = {}>(args?: Subset<T, DriverDefaultArgs<ExtArgs>>): Prisma__DriverClient<$Result.GetResult<Prisma.$DriverPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    issuedBy<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    transferredTo<T extends Ticket$transferredToArgs<ExtArgs> = {}>(args?: Subset<T, Ticket$transferredToArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    transaction<T extends Ticket$transactionArgs<ExtArgs> = {}>(args?: Subset<T, Ticket$transactionArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the Ticket model
   */
  interface TicketFieldRefs {
    readonly id: FieldRef<"Ticket", 'String'>
    readonly passengerId: FieldRef<"Ticket", 'String'>
    readonly driverId: FieldRef<"Ticket", 'String'>
    readonly issuedById: FieldRef<"Ticket", 'String'>
    readonly amount: FieldRef<"Ticket", 'Decimal'>
    readonly status: FieldRef<"Ticket", 'TicketStatus'>
    readonly qrNonce: FieldRef<"Ticket", 'String'>
    readonly shortCode: FieldRef<"Ticket", 'String'>
    readonly transferredToId: FieldRef<"Ticket", 'String'>
    readonly transferredAt: FieldRef<"Ticket", 'DateTime'>
    readonly cancelReason: FieldRef<"Ticket", 'String'>
    readonly cancelledById: FieldRef<"Ticket", 'String'>
    readonly usedAt: FieldRef<"Ticket", 'DateTime'>
    readonly expiresAt: FieldRef<"Ticket", 'DateTime'>
    readonly createdAt: FieldRef<"Ticket", 'DateTime'>
    readonly updatedAt: FieldRef<"Ticket", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Ticket findUnique
   */
  export type TicketFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ticket
     */
    select?: TicketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ticket
     */
    omit?: TicketOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TicketInclude<ExtArgs> | null
    /**
     * Filter, which Ticket to fetch.
     */
    where: TicketWhereUniqueInput
  }

  /**
   * Ticket findUniqueOrThrow
   */
  export type TicketFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ticket
     */
    select?: TicketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ticket
     */
    omit?: TicketOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TicketInclude<ExtArgs> | null
    /**
     * Filter, which Ticket to fetch.
     */
    where: TicketWhereUniqueInput
  }

  /**
   * Ticket findFirst
   */
  export type TicketFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ticket
     */
    select?: TicketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ticket
     */
    omit?: TicketOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TicketInclude<ExtArgs> | null
    /**
     * Filter, which Ticket to fetch.
     */
    where?: TicketWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tickets to fetch.
     */
    orderBy?: TicketOrderByWithRelationInput | TicketOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tickets.
     */
    cursor?: TicketWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tickets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tickets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tickets.
     */
    distinct?: TicketScalarFieldEnum | TicketScalarFieldEnum[]
  }

  /**
   * Ticket findFirstOrThrow
   */
  export type TicketFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ticket
     */
    select?: TicketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ticket
     */
    omit?: TicketOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TicketInclude<ExtArgs> | null
    /**
     * Filter, which Ticket to fetch.
     */
    where?: TicketWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tickets to fetch.
     */
    orderBy?: TicketOrderByWithRelationInput | TicketOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tickets.
     */
    cursor?: TicketWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tickets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tickets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tickets.
     */
    distinct?: TicketScalarFieldEnum | TicketScalarFieldEnum[]
  }

  /**
   * Ticket findMany
   */
  export type TicketFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ticket
     */
    select?: TicketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ticket
     */
    omit?: TicketOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TicketInclude<ExtArgs> | null
    /**
     * Filter, which Tickets to fetch.
     */
    where?: TicketWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tickets to fetch.
     */
    orderBy?: TicketOrderByWithRelationInput | TicketOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Tickets.
     */
    cursor?: TicketWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tickets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tickets.
     */
    skip?: number
    distinct?: TicketScalarFieldEnum | TicketScalarFieldEnum[]
  }

  /**
   * Ticket create
   */
  export type TicketCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ticket
     */
    select?: TicketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ticket
     */
    omit?: TicketOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TicketInclude<ExtArgs> | null
    /**
     * The data needed to create a Ticket.
     */
    data: XOR<TicketCreateInput, TicketUncheckedCreateInput>
  }

  /**
   * Ticket createMany
   */
  export type TicketCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Tickets.
     */
    data: TicketCreateManyInput | TicketCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Ticket createManyAndReturn
   */
  export type TicketCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ticket
     */
    select?: TicketSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Ticket
     */
    omit?: TicketOmit<ExtArgs> | null
    /**
     * The data used to create many Tickets.
     */
    data: TicketCreateManyInput | TicketCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TicketIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Ticket update
   */
  export type TicketUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ticket
     */
    select?: TicketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ticket
     */
    omit?: TicketOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TicketInclude<ExtArgs> | null
    /**
     * The data needed to update a Ticket.
     */
    data: XOR<TicketUpdateInput, TicketUncheckedUpdateInput>
    /**
     * Choose, which Ticket to update.
     */
    where: TicketWhereUniqueInput
  }

  /**
   * Ticket updateMany
   */
  export type TicketUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Tickets.
     */
    data: XOR<TicketUpdateManyMutationInput, TicketUncheckedUpdateManyInput>
    /**
     * Filter which Tickets to update
     */
    where?: TicketWhereInput
    /**
     * Limit how many Tickets to update.
     */
    limit?: number
  }

  /**
   * Ticket updateManyAndReturn
   */
  export type TicketUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ticket
     */
    select?: TicketSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Ticket
     */
    omit?: TicketOmit<ExtArgs> | null
    /**
     * The data used to update Tickets.
     */
    data: XOR<TicketUpdateManyMutationInput, TicketUncheckedUpdateManyInput>
    /**
     * Filter which Tickets to update
     */
    where?: TicketWhereInput
    /**
     * Limit how many Tickets to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TicketIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Ticket upsert
   */
  export type TicketUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ticket
     */
    select?: TicketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ticket
     */
    omit?: TicketOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TicketInclude<ExtArgs> | null
    /**
     * The filter to search for the Ticket to update in case it exists.
     */
    where: TicketWhereUniqueInput
    /**
     * In case the Ticket found by the `where` argument doesn't exist, create a new Ticket with this data.
     */
    create: XOR<TicketCreateInput, TicketUncheckedCreateInput>
    /**
     * In case the Ticket was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TicketUpdateInput, TicketUncheckedUpdateInput>
  }

  /**
   * Ticket delete
   */
  export type TicketDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ticket
     */
    select?: TicketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ticket
     */
    omit?: TicketOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TicketInclude<ExtArgs> | null
    /**
     * Filter which Ticket to delete.
     */
    where: TicketWhereUniqueInput
  }

  /**
   * Ticket deleteMany
   */
  export type TicketDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Tickets to delete
     */
    where?: TicketWhereInput
    /**
     * Limit how many Tickets to delete.
     */
    limit?: number
  }

  /**
   * Ticket.transferredTo
   */
  export type Ticket$transferredToArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * Ticket.transaction
   */
  export type Ticket$transactionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    where?: TransactionWhereInput
  }

  /**
   * Ticket without action
   */
  export type TicketDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ticket
     */
    select?: TicketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ticket
     */
    omit?: TicketOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TicketInclude<ExtArgs> | null
  }


  /**
   * Model Transaction
   */

  export type AggregateTransaction = {
    _count: TransactionCountAggregateOutputType | null
    _avg: TransactionAvgAggregateOutputType | null
    _sum: TransactionSumAggregateOutputType | null
    _min: TransactionMinAggregateOutputType | null
    _max: TransactionMaxAggregateOutputType | null
  }

  export type TransactionAvgAggregateOutputType = {
    amount: Decimal | null
    balanceBefore: Decimal | null
    balanceAfter: Decimal | null
  }

  export type TransactionSumAggregateOutputType = {
    amount: Decimal | null
    balanceBefore: Decimal | null
    balanceAfter: Decimal | null
  }

  export type TransactionMinAggregateOutputType = {
    id: string | null
    walletId: string | null
    ticketId: string | null
    type: $Enums.TransactionType | null
    amount: Decimal | null
    balanceBefore: Decimal | null
    balanceAfter: Decimal | null
    reference: string | null
    createdAt: Date | null
  }

  export type TransactionMaxAggregateOutputType = {
    id: string | null
    walletId: string | null
    ticketId: string | null
    type: $Enums.TransactionType | null
    amount: Decimal | null
    balanceBefore: Decimal | null
    balanceAfter: Decimal | null
    reference: string | null
    createdAt: Date | null
  }

  export type TransactionCountAggregateOutputType = {
    id: number
    walletId: number
    ticketId: number
    type: number
    amount: number
    balanceBefore: number
    balanceAfter: number
    reference: number
    metadata: number
    createdAt: number
    _all: number
  }


  export type TransactionAvgAggregateInputType = {
    amount?: true
    balanceBefore?: true
    balanceAfter?: true
  }

  export type TransactionSumAggregateInputType = {
    amount?: true
    balanceBefore?: true
    balanceAfter?: true
  }

  export type TransactionMinAggregateInputType = {
    id?: true
    walletId?: true
    ticketId?: true
    type?: true
    amount?: true
    balanceBefore?: true
    balanceAfter?: true
    reference?: true
    createdAt?: true
  }

  export type TransactionMaxAggregateInputType = {
    id?: true
    walletId?: true
    ticketId?: true
    type?: true
    amount?: true
    balanceBefore?: true
    balanceAfter?: true
    reference?: true
    createdAt?: true
  }

  export type TransactionCountAggregateInputType = {
    id?: true
    walletId?: true
    ticketId?: true
    type?: true
    amount?: true
    balanceBefore?: true
    balanceAfter?: true
    reference?: true
    metadata?: true
    createdAt?: true
    _all?: true
  }

  export type TransactionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Transaction to aggregate.
     */
    where?: TransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Transactions to fetch.
     */
    orderBy?: TransactionOrderByWithRelationInput | TransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Transactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Transactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Transactions
    **/
    _count?: true | TransactionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TransactionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TransactionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TransactionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TransactionMaxAggregateInputType
  }

  export type GetTransactionAggregateType<T extends TransactionAggregateArgs> = {
        [P in keyof T & keyof AggregateTransaction]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTransaction[P]>
      : GetScalarType<T[P], AggregateTransaction[P]>
  }




  export type TransactionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TransactionWhereInput
    orderBy?: TransactionOrderByWithAggregationInput | TransactionOrderByWithAggregationInput[]
    by: TransactionScalarFieldEnum[] | TransactionScalarFieldEnum
    having?: TransactionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TransactionCountAggregateInputType | true
    _avg?: TransactionAvgAggregateInputType
    _sum?: TransactionSumAggregateInputType
    _min?: TransactionMinAggregateInputType
    _max?: TransactionMaxAggregateInputType
  }

  export type TransactionGroupByOutputType = {
    id: string
    walletId: string
    ticketId: string | null
    type: $Enums.TransactionType
    amount: Decimal
    balanceBefore: Decimal
    balanceAfter: Decimal
    reference: string | null
    metadata: JsonValue | null
    createdAt: Date
    _count: TransactionCountAggregateOutputType | null
    _avg: TransactionAvgAggregateOutputType | null
    _sum: TransactionSumAggregateOutputType | null
    _min: TransactionMinAggregateOutputType | null
    _max: TransactionMaxAggregateOutputType | null
  }

  type GetTransactionGroupByPayload<T extends TransactionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TransactionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TransactionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TransactionGroupByOutputType[P]>
            : GetScalarType<T[P], TransactionGroupByOutputType[P]>
        }
      >
    >


  export type TransactionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    walletId?: boolean
    ticketId?: boolean
    type?: boolean
    amount?: boolean
    balanceBefore?: boolean
    balanceAfter?: boolean
    reference?: boolean
    metadata?: boolean
    createdAt?: boolean
    wallet?: boolean | WalletDefaultArgs<ExtArgs>
    ticket?: boolean | Transaction$ticketArgs<ExtArgs>
  }, ExtArgs["result"]["transaction"]>

  export type TransactionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    walletId?: boolean
    ticketId?: boolean
    type?: boolean
    amount?: boolean
    balanceBefore?: boolean
    balanceAfter?: boolean
    reference?: boolean
    metadata?: boolean
    createdAt?: boolean
    wallet?: boolean | WalletDefaultArgs<ExtArgs>
    ticket?: boolean | Transaction$ticketArgs<ExtArgs>
  }, ExtArgs["result"]["transaction"]>

  export type TransactionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    walletId?: boolean
    ticketId?: boolean
    type?: boolean
    amount?: boolean
    balanceBefore?: boolean
    balanceAfter?: boolean
    reference?: boolean
    metadata?: boolean
    createdAt?: boolean
    wallet?: boolean | WalletDefaultArgs<ExtArgs>
    ticket?: boolean | Transaction$ticketArgs<ExtArgs>
  }, ExtArgs["result"]["transaction"]>

  export type TransactionSelectScalar = {
    id?: boolean
    walletId?: boolean
    ticketId?: boolean
    type?: boolean
    amount?: boolean
    balanceBefore?: boolean
    balanceAfter?: boolean
    reference?: boolean
    metadata?: boolean
    createdAt?: boolean
  }

  export type TransactionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "walletId" | "ticketId" | "type" | "amount" | "balanceBefore" | "balanceAfter" | "reference" | "metadata" | "createdAt", ExtArgs["result"]["transaction"]>
  export type TransactionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    wallet?: boolean | WalletDefaultArgs<ExtArgs>
    ticket?: boolean | Transaction$ticketArgs<ExtArgs>
  }
  export type TransactionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    wallet?: boolean | WalletDefaultArgs<ExtArgs>
    ticket?: boolean | Transaction$ticketArgs<ExtArgs>
  }
  export type TransactionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    wallet?: boolean | WalletDefaultArgs<ExtArgs>
    ticket?: boolean | Transaction$ticketArgs<ExtArgs>
  }

  export type $TransactionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Transaction"
    objects: {
      wallet: Prisma.$WalletPayload<ExtArgs>
      ticket: Prisma.$TicketPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      walletId: string
      ticketId: string | null
      type: $Enums.TransactionType
      amount: Prisma.Decimal
      balanceBefore: Prisma.Decimal
      balanceAfter: Prisma.Decimal
      reference: string | null
      metadata: Prisma.JsonValue | null
      createdAt: Date
    }, ExtArgs["result"]["transaction"]>
    composites: {}
  }

  type TransactionGetPayload<S extends boolean | null | undefined | TransactionDefaultArgs> = $Result.GetResult<Prisma.$TransactionPayload, S>

  type TransactionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TransactionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TransactionCountAggregateInputType | true
    }

  export interface TransactionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Transaction'], meta: { name: 'Transaction' } }
    /**
     * Find zero or one Transaction that matches the filter.
     * @param {TransactionFindUniqueArgs} args - Arguments to find a Transaction
     * @example
     * // Get one Transaction
     * const transaction = await prisma.transaction.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TransactionFindUniqueArgs>(args: SelectSubset<T, TransactionFindUniqueArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Transaction that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TransactionFindUniqueOrThrowArgs} args - Arguments to find a Transaction
     * @example
     * // Get one Transaction
     * const transaction = await prisma.transaction.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TransactionFindUniqueOrThrowArgs>(args: SelectSubset<T, TransactionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Transaction that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionFindFirstArgs} args - Arguments to find a Transaction
     * @example
     * // Get one Transaction
     * const transaction = await prisma.transaction.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TransactionFindFirstArgs>(args?: SelectSubset<T, TransactionFindFirstArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Transaction that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionFindFirstOrThrowArgs} args - Arguments to find a Transaction
     * @example
     * // Get one Transaction
     * const transaction = await prisma.transaction.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TransactionFindFirstOrThrowArgs>(args?: SelectSubset<T, TransactionFindFirstOrThrowArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Transactions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Transactions
     * const transactions = await prisma.transaction.findMany()
     * 
     * // Get first 10 Transactions
     * const transactions = await prisma.transaction.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const transactionWithIdOnly = await prisma.transaction.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TransactionFindManyArgs>(args?: SelectSubset<T, TransactionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Transaction.
     * @param {TransactionCreateArgs} args - Arguments to create a Transaction.
     * @example
     * // Create one Transaction
     * const Transaction = await prisma.transaction.create({
     *   data: {
     *     // ... data to create a Transaction
     *   }
     * })
     * 
     */
    create<T extends TransactionCreateArgs>(args: SelectSubset<T, TransactionCreateArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Transactions.
     * @param {TransactionCreateManyArgs} args - Arguments to create many Transactions.
     * @example
     * // Create many Transactions
     * const transaction = await prisma.transaction.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TransactionCreateManyArgs>(args?: SelectSubset<T, TransactionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Transactions and returns the data saved in the database.
     * @param {TransactionCreateManyAndReturnArgs} args - Arguments to create many Transactions.
     * @example
     * // Create many Transactions
     * const transaction = await prisma.transaction.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Transactions and only return the `id`
     * const transactionWithIdOnly = await prisma.transaction.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TransactionCreateManyAndReturnArgs>(args?: SelectSubset<T, TransactionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Transaction.
     * @param {TransactionDeleteArgs} args - Arguments to delete one Transaction.
     * @example
     * // Delete one Transaction
     * const Transaction = await prisma.transaction.delete({
     *   where: {
     *     // ... filter to delete one Transaction
     *   }
     * })
     * 
     */
    delete<T extends TransactionDeleteArgs>(args: SelectSubset<T, TransactionDeleteArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Transaction.
     * @param {TransactionUpdateArgs} args - Arguments to update one Transaction.
     * @example
     * // Update one Transaction
     * const transaction = await prisma.transaction.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TransactionUpdateArgs>(args: SelectSubset<T, TransactionUpdateArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Transactions.
     * @param {TransactionDeleteManyArgs} args - Arguments to filter Transactions to delete.
     * @example
     * // Delete a few Transactions
     * const { count } = await prisma.transaction.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TransactionDeleteManyArgs>(args?: SelectSubset<T, TransactionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Transactions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Transactions
     * const transaction = await prisma.transaction.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TransactionUpdateManyArgs>(args: SelectSubset<T, TransactionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Transactions and returns the data updated in the database.
     * @param {TransactionUpdateManyAndReturnArgs} args - Arguments to update many Transactions.
     * @example
     * // Update many Transactions
     * const transaction = await prisma.transaction.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Transactions and only return the `id`
     * const transactionWithIdOnly = await prisma.transaction.updateManyAndReturn({
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
    updateManyAndReturn<T extends TransactionUpdateManyAndReturnArgs>(args: SelectSubset<T, TransactionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Transaction.
     * @param {TransactionUpsertArgs} args - Arguments to update or create a Transaction.
     * @example
     * // Update or create a Transaction
     * const transaction = await prisma.transaction.upsert({
     *   create: {
     *     // ... data to create a Transaction
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Transaction we want to update
     *   }
     * })
     */
    upsert<T extends TransactionUpsertArgs>(args: SelectSubset<T, TransactionUpsertArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Transactions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionCountArgs} args - Arguments to filter Transactions to count.
     * @example
     * // Count the number of Transactions
     * const count = await prisma.transaction.count({
     *   where: {
     *     // ... the filter for the Transactions we want to count
     *   }
     * })
    **/
    count<T extends TransactionCountArgs>(
      args?: Subset<T, TransactionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TransactionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Transaction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends TransactionAggregateArgs>(args: Subset<T, TransactionAggregateArgs>): Prisma.PrismaPromise<GetTransactionAggregateType<T>>

    /**
     * Group by Transaction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionGroupByArgs} args - Group by arguments.
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
      T extends TransactionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TransactionGroupByArgs['orderBy'] }
        : { orderBy?: TransactionGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, TransactionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTransactionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Transaction model
   */
  readonly fields: TransactionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Transaction.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TransactionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    wallet<T extends WalletDefaultArgs<ExtArgs> = {}>(args?: Subset<T, WalletDefaultArgs<ExtArgs>>): Prisma__WalletClient<$Result.GetResult<Prisma.$WalletPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    ticket<T extends Transaction$ticketArgs<ExtArgs> = {}>(args?: Subset<T, Transaction$ticketArgs<ExtArgs>>): Prisma__TicketClient<$Result.GetResult<Prisma.$TicketPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the Transaction model
   */
  interface TransactionFieldRefs {
    readonly id: FieldRef<"Transaction", 'String'>
    readonly walletId: FieldRef<"Transaction", 'String'>
    readonly ticketId: FieldRef<"Transaction", 'String'>
    readonly type: FieldRef<"Transaction", 'TransactionType'>
    readonly amount: FieldRef<"Transaction", 'Decimal'>
    readonly balanceBefore: FieldRef<"Transaction", 'Decimal'>
    readonly balanceAfter: FieldRef<"Transaction", 'Decimal'>
    readonly reference: FieldRef<"Transaction", 'String'>
    readonly metadata: FieldRef<"Transaction", 'Json'>
    readonly createdAt: FieldRef<"Transaction", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Transaction findUnique
   */
  export type TransactionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * Filter, which Transaction to fetch.
     */
    where: TransactionWhereUniqueInput
  }

  /**
   * Transaction findUniqueOrThrow
   */
  export type TransactionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * Filter, which Transaction to fetch.
     */
    where: TransactionWhereUniqueInput
  }

  /**
   * Transaction findFirst
   */
  export type TransactionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * Filter, which Transaction to fetch.
     */
    where?: TransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Transactions to fetch.
     */
    orderBy?: TransactionOrderByWithRelationInput | TransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Transactions.
     */
    cursor?: TransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Transactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Transactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Transactions.
     */
    distinct?: TransactionScalarFieldEnum | TransactionScalarFieldEnum[]
  }

  /**
   * Transaction findFirstOrThrow
   */
  export type TransactionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * Filter, which Transaction to fetch.
     */
    where?: TransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Transactions to fetch.
     */
    orderBy?: TransactionOrderByWithRelationInput | TransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Transactions.
     */
    cursor?: TransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Transactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Transactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Transactions.
     */
    distinct?: TransactionScalarFieldEnum | TransactionScalarFieldEnum[]
  }

  /**
   * Transaction findMany
   */
  export type TransactionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * Filter, which Transactions to fetch.
     */
    where?: TransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Transactions to fetch.
     */
    orderBy?: TransactionOrderByWithRelationInput | TransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Transactions.
     */
    cursor?: TransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Transactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Transactions.
     */
    skip?: number
    distinct?: TransactionScalarFieldEnum | TransactionScalarFieldEnum[]
  }

  /**
   * Transaction create
   */
  export type TransactionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * The data needed to create a Transaction.
     */
    data: XOR<TransactionCreateInput, TransactionUncheckedCreateInput>
  }

  /**
   * Transaction createMany
   */
  export type TransactionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Transactions.
     */
    data: TransactionCreateManyInput | TransactionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Transaction createManyAndReturn
   */
  export type TransactionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * The data used to create many Transactions.
     */
    data: TransactionCreateManyInput | TransactionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Transaction update
   */
  export type TransactionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * The data needed to update a Transaction.
     */
    data: XOR<TransactionUpdateInput, TransactionUncheckedUpdateInput>
    /**
     * Choose, which Transaction to update.
     */
    where: TransactionWhereUniqueInput
  }

  /**
   * Transaction updateMany
   */
  export type TransactionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Transactions.
     */
    data: XOR<TransactionUpdateManyMutationInput, TransactionUncheckedUpdateManyInput>
    /**
     * Filter which Transactions to update
     */
    where?: TransactionWhereInput
    /**
     * Limit how many Transactions to update.
     */
    limit?: number
  }

  /**
   * Transaction updateManyAndReturn
   */
  export type TransactionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * The data used to update Transactions.
     */
    data: XOR<TransactionUpdateManyMutationInput, TransactionUncheckedUpdateManyInput>
    /**
     * Filter which Transactions to update
     */
    where?: TransactionWhereInput
    /**
     * Limit how many Transactions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Transaction upsert
   */
  export type TransactionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * The filter to search for the Transaction to update in case it exists.
     */
    where: TransactionWhereUniqueInput
    /**
     * In case the Transaction found by the `where` argument doesn't exist, create a new Transaction with this data.
     */
    create: XOR<TransactionCreateInput, TransactionUncheckedCreateInput>
    /**
     * In case the Transaction was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TransactionUpdateInput, TransactionUncheckedUpdateInput>
  }

  /**
   * Transaction delete
   */
  export type TransactionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * Filter which Transaction to delete.
     */
    where: TransactionWhereUniqueInput
  }

  /**
   * Transaction deleteMany
   */
  export type TransactionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Transactions to delete
     */
    where?: TransactionWhereInput
    /**
     * Limit how many Transactions to delete.
     */
    limit?: number
  }

  /**
   * Transaction.ticket
   */
  export type Transaction$ticketArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ticket
     */
    select?: TicketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ticket
     */
    omit?: TicketOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TicketInclude<ExtArgs> | null
    where?: TicketWhereInput
  }

  /**
   * Transaction without action
   */
  export type TransactionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
  }


  /**
   * Model LocationEvent
   */

  export type AggregateLocationEvent = {
    _count: LocationEventCountAggregateOutputType | null
    _avg: LocationEventAvgAggregateOutputType | null
    _sum: LocationEventSumAggregateOutputType | null
    _min: LocationEventMinAggregateOutputType | null
    _max: LocationEventMaxAggregateOutputType | null
  }

  export type LocationEventAvgAggregateOutputType = {
    lat: number | null
    lng: number | null
    speed: number | null
    heading: number | null
  }

  export type LocationEventSumAggregateOutputType = {
    lat: number | null
    lng: number | null
    speed: number | null
    heading: number | null
  }

  export type LocationEventMinAggregateOutputType = {
    id: string | null
    driverId: string | null
    lat: number | null
    lng: number | null
    speed: number | null
    heading: number | null
    recordedAt: Date | null
  }

  export type LocationEventMaxAggregateOutputType = {
    id: string | null
    driverId: string | null
    lat: number | null
    lng: number | null
    speed: number | null
    heading: number | null
    recordedAt: Date | null
  }

  export type LocationEventCountAggregateOutputType = {
    id: number
    driverId: number
    lat: number
    lng: number
    speed: number
    heading: number
    recordedAt: number
    _all: number
  }


  export type LocationEventAvgAggregateInputType = {
    lat?: true
    lng?: true
    speed?: true
    heading?: true
  }

  export type LocationEventSumAggregateInputType = {
    lat?: true
    lng?: true
    speed?: true
    heading?: true
  }

  export type LocationEventMinAggregateInputType = {
    id?: true
    driverId?: true
    lat?: true
    lng?: true
    speed?: true
    heading?: true
    recordedAt?: true
  }

  export type LocationEventMaxAggregateInputType = {
    id?: true
    driverId?: true
    lat?: true
    lng?: true
    speed?: true
    heading?: true
    recordedAt?: true
  }

  export type LocationEventCountAggregateInputType = {
    id?: true
    driverId?: true
    lat?: true
    lng?: true
    speed?: true
    heading?: true
    recordedAt?: true
    _all?: true
  }

  export type LocationEventAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LocationEvent to aggregate.
     */
    where?: LocationEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LocationEvents to fetch.
     */
    orderBy?: LocationEventOrderByWithRelationInput | LocationEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: LocationEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LocationEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LocationEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned LocationEvents
    **/
    _count?: true | LocationEventCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: LocationEventAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: LocationEventSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LocationEventMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LocationEventMaxAggregateInputType
  }

  export type GetLocationEventAggregateType<T extends LocationEventAggregateArgs> = {
        [P in keyof T & keyof AggregateLocationEvent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLocationEvent[P]>
      : GetScalarType<T[P], AggregateLocationEvent[P]>
  }




  export type LocationEventGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LocationEventWhereInput
    orderBy?: LocationEventOrderByWithAggregationInput | LocationEventOrderByWithAggregationInput[]
    by: LocationEventScalarFieldEnum[] | LocationEventScalarFieldEnum
    having?: LocationEventScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LocationEventCountAggregateInputType | true
    _avg?: LocationEventAvgAggregateInputType
    _sum?: LocationEventSumAggregateInputType
    _min?: LocationEventMinAggregateInputType
    _max?: LocationEventMaxAggregateInputType
  }

  export type LocationEventGroupByOutputType = {
    id: string
    driverId: string
    lat: number
    lng: number
    speed: number
    heading: number | null
    recordedAt: Date
    _count: LocationEventCountAggregateOutputType | null
    _avg: LocationEventAvgAggregateOutputType | null
    _sum: LocationEventSumAggregateOutputType | null
    _min: LocationEventMinAggregateOutputType | null
    _max: LocationEventMaxAggregateOutputType | null
  }

  type GetLocationEventGroupByPayload<T extends LocationEventGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LocationEventGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LocationEventGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LocationEventGroupByOutputType[P]>
            : GetScalarType<T[P], LocationEventGroupByOutputType[P]>
        }
      >
    >


  export type LocationEventSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    driverId?: boolean
    lat?: boolean
    lng?: boolean
    speed?: boolean
    heading?: boolean
    recordedAt?: boolean
    driver?: boolean | DriverDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["locationEvent"]>

  export type LocationEventSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    driverId?: boolean
    lat?: boolean
    lng?: boolean
    speed?: boolean
    heading?: boolean
    recordedAt?: boolean
    driver?: boolean | DriverDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["locationEvent"]>

  export type LocationEventSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    driverId?: boolean
    lat?: boolean
    lng?: boolean
    speed?: boolean
    heading?: boolean
    recordedAt?: boolean
    driver?: boolean | DriverDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["locationEvent"]>

  export type LocationEventSelectScalar = {
    id?: boolean
    driverId?: boolean
    lat?: boolean
    lng?: boolean
    speed?: boolean
    heading?: boolean
    recordedAt?: boolean
  }

  export type LocationEventOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "driverId" | "lat" | "lng" | "speed" | "heading" | "recordedAt", ExtArgs["result"]["locationEvent"]>
  export type LocationEventInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    driver?: boolean | DriverDefaultArgs<ExtArgs>
  }
  export type LocationEventIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    driver?: boolean | DriverDefaultArgs<ExtArgs>
  }
  export type LocationEventIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    driver?: boolean | DriverDefaultArgs<ExtArgs>
  }

  export type $LocationEventPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "LocationEvent"
    objects: {
      driver: Prisma.$DriverPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      driverId: string
      lat: number
      lng: number
      speed: number
      heading: number | null
      recordedAt: Date
    }, ExtArgs["result"]["locationEvent"]>
    composites: {}
  }

  type LocationEventGetPayload<S extends boolean | null | undefined | LocationEventDefaultArgs> = $Result.GetResult<Prisma.$LocationEventPayload, S>

  type LocationEventCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<LocationEventFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: LocationEventCountAggregateInputType | true
    }

  export interface LocationEventDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['LocationEvent'], meta: { name: 'LocationEvent' } }
    /**
     * Find zero or one LocationEvent that matches the filter.
     * @param {LocationEventFindUniqueArgs} args - Arguments to find a LocationEvent
     * @example
     * // Get one LocationEvent
     * const locationEvent = await prisma.locationEvent.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LocationEventFindUniqueArgs>(args: SelectSubset<T, LocationEventFindUniqueArgs<ExtArgs>>): Prisma__LocationEventClient<$Result.GetResult<Prisma.$LocationEventPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one LocationEvent that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {LocationEventFindUniqueOrThrowArgs} args - Arguments to find a LocationEvent
     * @example
     * // Get one LocationEvent
     * const locationEvent = await prisma.locationEvent.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LocationEventFindUniqueOrThrowArgs>(args: SelectSubset<T, LocationEventFindUniqueOrThrowArgs<ExtArgs>>): Prisma__LocationEventClient<$Result.GetResult<Prisma.$LocationEventPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first LocationEvent that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LocationEventFindFirstArgs} args - Arguments to find a LocationEvent
     * @example
     * // Get one LocationEvent
     * const locationEvent = await prisma.locationEvent.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LocationEventFindFirstArgs>(args?: SelectSubset<T, LocationEventFindFirstArgs<ExtArgs>>): Prisma__LocationEventClient<$Result.GetResult<Prisma.$LocationEventPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first LocationEvent that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LocationEventFindFirstOrThrowArgs} args - Arguments to find a LocationEvent
     * @example
     * // Get one LocationEvent
     * const locationEvent = await prisma.locationEvent.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LocationEventFindFirstOrThrowArgs>(args?: SelectSubset<T, LocationEventFindFirstOrThrowArgs<ExtArgs>>): Prisma__LocationEventClient<$Result.GetResult<Prisma.$LocationEventPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more LocationEvents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LocationEventFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all LocationEvents
     * const locationEvents = await prisma.locationEvent.findMany()
     * 
     * // Get first 10 LocationEvents
     * const locationEvents = await prisma.locationEvent.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const locationEventWithIdOnly = await prisma.locationEvent.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends LocationEventFindManyArgs>(args?: SelectSubset<T, LocationEventFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LocationEventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a LocationEvent.
     * @param {LocationEventCreateArgs} args - Arguments to create a LocationEvent.
     * @example
     * // Create one LocationEvent
     * const LocationEvent = await prisma.locationEvent.create({
     *   data: {
     *     // ... data to create a LocationEvent
     *   }
     * })
     * 
     */
    create<T extends LocationEventCreateArgs>(args: SelectSubset<T, LocationEventCreateArgs<ExtArgs>>): Prisma__LocationEventClient<$Result.GetResult<Prisma.$LocationEventPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many LocationEvents.
     * @param {LocationEventCreateManyArgs} args - Arguments to create many LocationEvents.
     * @example
     * // Create many LocationEvents
     * const locationEvent = await prisma.locationEvent.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends LocationEventCreateManyArgs>(args?: SelectSubset<T, LocationEventCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many LocationEvents and returns the data saved in the database.
     * @param {LocationEventCreateManyAndReturnArgs} args - Arguments to create many LocationEvents.
     * @example
     * // Create many LocationEvents
     * const locationEvent = await prisma.locationEvent.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many LocationEvents and only return the `id`
     * const locationEventWithIdOnly = await prisma.locationEvent.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends LocationEventCreateManyAndReturnArgs>(args?: SelectSubset<T, LocationEventCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LocationEventPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a LocationEvent.
     * @param {LocationEventDeleteArgs} args - Arguments to delete one LocationEvent.
     * @example
     * // Delete one LocationEvent
     * const LocationEvent = await prisma.locationEvent.delete({
     *   where: {
     *     // ... filter to delete one LocationEvent
     *   }
     * })
     * 
     */
    delete<T extends LocationEventDeleteArgs>(args: SelectSubset<T, LocationEventDeleteArgs<ExtArgs>>): Prisma__LocationEventClient<$Result.GetResult<Prisma.$LocationEventPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one LocationEvent.
     * @param {LocationEventUpdateArgs} args - Arguments to update one LocationEvent.
     * @example
     * // Update one LocationEvent
     * const locationEvent = await prisma.locationEvent.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends LocationEventUpdateArgs>(args: SelectSubset<T, LocationEventUpdateArgs<ExtArgs>>): Prisma__LocationEventClient<$Result.GetResult<Prisma.$LocationEventPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more LocationEvents.
     * @param {LocationEventDeleteManyArgs} args - Arguments to filter LocationEvents to delete.
     * @example
     * // Delete a few LocationEvents
     * const { count } = await prisma.locationEvent.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends LocationEventDeleteManyArgs>(args?: SelectSubset<T, LocationEventDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LocationEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LocationEventUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many LocationEvents
     * const locationEvent = await prisma.locationEvent.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends LocationEventUpdateManyArgs>(args: SelectSubset<T, LocationEventUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LocationEvents and returns the data updated in the database.
     * @param {LocationEventUpdateManyAndReturnArgs} args - Arguments to update many LocationEvents.
     * @example
     * // Update many LocationEvents
     * const locationEvent = await prisma.locationEvent.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more LocationEvents and only return the `id`
     * const locationEventWithIdOnly = await prisma.locationEvent.updateManyAndReturn({
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
    updateManyAndReturn<T extends LocationEventUpdateManyAndReturnArgs>(args: SelectSubset<T, LocationEventUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LocationEventPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one LocationEvent.
     * @param {LocationEventUpsertArgs} args - Arguments to update or create a LocationEvent.
     * @example
     * // Update or create a LocationEvent
     * const locationEvent = await prisma.locationEvent.upsert({
     *   create: {
     *     // ... data to create a LocationEvent
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the LocationEvent we want to update
     *   }
     * })
     */
    upsert<T extends LocationEventUpsertArgs>(args: SelectSubset<T, LocationEventUpsertArgs<ExtArgs>>): Prisma__LocationEventClient<$Result.GetResult<Prisma.$LocationEventPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of LocationEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LocationEventCountArgs} args - Arguments to filter LocationEvents to count.
     * @example
     * // Count the number of LocationEvents
     * const count = await prisma.locationEvent.count({
     *   where: {
     *     // ... the filter for the LocationEvents we want to count
     *   }
     * })
    **/
    count<T extends LocationEventCountArgs>(
      args?: Subset<T, LocationEventCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LocationEventCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a LocationEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LocationEventAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends LocationEventAggregateArgs>(args: Subset<T, LocationEventAggregateArgs>): Prisma.PrismaPromise<GetLocationEventAggregateType<T>>

    /**
     * Group by LocationEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LocationEventGroupByArgs} args - Group by arguments.
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
      T extends LocationEventGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LocationEventGroupByArgs['orderBy'] }
        : { orderBy?: LocationEventGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, LocationEventGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLocationEventGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the LocationEvent model
   */
  readonly fields: LocationEventFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for LocationEvent.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__LocationEventClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    driver<T extends DriverDefaultArgs<ExtArgs> = {}>(args?: Subset<T, DriverDefaultArgs<ExtArgs>>): Prisma__DriverClient<$Result.GetResult<Prisma.$DriverPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the LocationEvent model
   */
  interface LocationEventFieldRefs {
    readonly id: FieldRef<"LocationEvent", 'String'>
    readonly driverId: FieldRef<"LocationEvent", 'String'>
    readonly lat: FieldRef<"LocationEvent", 'Float'>
    readonly lng: FieldRef<"LocationEvent", 'Float'>
    readonly speed: FieldRef<"LocationEvent", 'Float'>
    readonly heading: FieldRef<"LocationEvent", 'Float'>
    readonly recordedAt: FieldRef<"LocationEvent", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * LocationEvent findUnique
   */
  export type LocationEventFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LocationEvent
     */
    select?: LocationEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LocationEvent
     */
    omit?: LocationEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationEventInclude<ExtArgs> | null
    /**
     * Filter, which LocationEvent to fetch.
     */
    where: LocationEventWhereUniqueInput
  }

  /**
   * LocationEvent findUniqueOrThrow
   */
  export type LocationEventFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LocationEvent
     */
    select?: LocationEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LocationEvent
     */
    omit?: LocationEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationEventInclude<ExtArgs> | null
    /**
     * Filter, which LocationEvent to fetch.
     */
    where: LocationEventWhereUniqueInput
  }

  /**
   * LocationEvent findFirst
   */
  export type LocationEventFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LocationEvent
     */
    select?: LocationEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LocationEvent
     */
    omit?: LocationEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationEventInclude<ExtArgs> | null
    /**
     * Filter, which LocationEvent to fetch.
     */
    where?: LocationEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LocationEvents to fetch.
     */
    orderBy?: LocationEventOrderByWithRelationInput | LocationEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LocationEvents.
     */
    cursor?: LocationEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LocationEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LocationEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LocationEvents.
     */
    distinct?: LocationEventScalarFieldEnum | LocationEventScalarFieldEnum[]
  }

  /**
   * LocationEvent findFirstOrThrow
   */
  export type LocationEventFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LocationEvent
     */
    select?: LocationEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LocationEvent
     */
    omit?: LocationEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationEventInclude<ExtArgs> | null
    /**
     * Filter, which LocationEvent to fetch.
     */
    where?: LocationEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LocationEvents to fetch.
     */
    orderBy?: LocationEventOrderByWithRelationInput | LocationEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LocationEvents.
     */
    cursor?: LocationEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LocationEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LocationEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LocationEvents.
     */
    distinct?: LocationEventScalarFieldEnum | LocationEventScalarFieldEnum[]
  }

  /**
   * LocationEvent findMany
   */
  export type LocationEventFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LocationEvent
     */
    select?: LocationEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LocationEvent
     */
    omit?: LocationEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationEventInclude<ExtArgs> | null
    /**
     * Filter, which LocationEvents to fetch.
     */
    where?: LocationEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LocationEvents to fetch.
     */
    orderBy?: LocationEventOrderByWithRelationInput | LocationEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing LocationEvents.
     */
    cursor?: LocationEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LocationEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LocationEvents.
     */
    skip?: number
    distinct?: LocationEventScalarFieldEnum | LocationEventScalarFieldEnum[]
  }

  /**
   * LocationEvent create
   */
  export type LocationEventCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LocationEvent
     */
    select?: LocationEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LocationEvent
     */
    omit?: LocationEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationEventInclude<ExtArgs> | null
    /**
     * The data needed to create a LocationEvent.
     */
    data: XOR<LocationEventCreateInput, LocationEventUncheckedCreateInput>
  }

  /**
   * LocationEvent createMany
   */
  export type LocationEventCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many LocationEvents.
     */
    data: LocationEventCreateManyInput | LocationEventCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * LocationEvent createManyAndReturn
   */
  export type LocationEventCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LocationEvent
     */
    select?: LocationEventSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the LocationEvent
     */
    omit?: LocationEventOmit<ExtArgs> | null
    /**
     * The data used to create many LocationEvents.
     */
    data: LocationEventCreateManyInput | LocationEventCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationEventIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * LocationEvent update
   */
  export type LocationEventUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LocationEvent
     */
    select?: LocationEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LocationEvent
     */
    omit?: LocationEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationEventInclude<ExtArgs> | null
    /**
     * The data needed to update a LocationEvent.
     */
    data: XOR<LocationEventUpdateInput, LocationEventUncheckedUpdateInput>
    /**
     * Choose, which LocationEvent to update.
     */
    where: LocationEventWhereUniqueInput
  }

  /**
   * LocationEvent updateMany
   */
  export type LocationEventUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update LocationEvents.
     */
    data: XOR<LocationEventUpdateManyMutationInput, LocationEventUncheckedUpdateManyInput>
    /**
     * Filter which LocationEvents to update
     */
    where?: LocationEventWhereInput
    /**
     * Limit how many LocationEvents to update.
     */
    limit?: number
  }

  /**
   * LocationEvent updateManyAndReturn
   */
  export type LocationEventUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LocationEvent
     */
    select?: LocationEventSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the LocationEvent
     */
    omit?: LocationEventOmit<ExtArgs> | null
    /**
     * The data used to update LocationEvents.
     */
    data: XOR<LocationEventUpdateManyMutationInput, LocationEventUncheckedUpdateManyInput>
    /**
     * Filter which LocationEvents to update
     */
    where?: LocationEventWhereInput
    /**
     * Limit how many LocationEvents to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationEventIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * LocationEvent upsert
   */
  export type LocationEventUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LocationEvent
     */
    select?: LocationEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LocationEvent
     */
    omit?: LocationEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationEventInclude<ExtArgs> | null
    /**
     * The filter to search for the LocationEvent to update in case it exists.
     */
    where: LocationEventWhereUniqueInput
    /**
     * In case the LocationEvent found by the `where` argument doesn't exist, create a new LocationEvent with this data.
     */
    create: XOR<LocationEventCreateInput, LocationEventUncheckedCreateInput>
    /**
     * In case the LocationEvent was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LocationEventUpdateInput, LocationEventUncheckedUpdateInput>
  }

  /**
   * LocationEvent delete
   */
  export type LocationEventDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LocationEvent
     */
    select?: LocationEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LocationEvent
     */
    omit?: LocationEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationEventInclude<ExtArgs> | null
    /**
     * Filter which LocationEvent to delete.
     */
    where: LocationEventWhereUniqueInput
  }

  /**
   * LocationEvent deleteMany
   */
  export type LocationEventDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LocationEvents to delete
     */
    where?: LocationEventWhereInput
    /**
     * Limit how many LocationEvents to delete.
     */
    limit?: number
  }

  /**
   * LocationEvent without action
   */
  export type LocationEventDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LocationEvent
     */
    select?: LocationEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LocationEvent
     */
    omit?: LocationEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationEventInclude<ExtArgs> | null
  }


  /**
   * Model LotadorPartner
   */

  export type AggregateLotadorPartner = {
    _count: LotadorPartnerCountAggregateOutputType | null
    _min: LotadorPartnerMinAggregateOutputType | null
    _max: LotadorPartnerMaxAggregateOutputType | null
  }

  export type LotadorPartnerMinAggregateOutputType = {
    id: string | null
    driverId: string | null
    lotadorUserId: string | null
    referenceCode: string | null
    isActive: boolean | null
    createdAt: Date | null
  }

  export type LotadorPartnerMaxAggregateOutputType = {
    id: string | null
    driverId: string | null
    lotadorUserId: string | null
    referenceCode: string | null
    isActive: boolean | null
    createdAt: Date | null
  }

  export type LotadorPartnerCountAggregateOutputType = {
    id: number
    driverId: number
    lotadorUserId: number
    referenceCode: number
    isActive: number
    createdAt: number
    _all: number
  }


  export type LotadorPartnerMinAggregateInputType = {
    id?: true
    driverId?: true
    lotadorUserId?: true
    referenceCode?: true
    isActive?: true
    createdAt?: true
  }

  export type LotadorPartnerMaxAggregateInputType = {
    id?: true
    driverId?: true
    lotadorUserId?: true
    referenceCode?: true
    isActive?: true
    createdAt?: true
  }

  export type LotadorPartnerCountAggregateInputType = {
    id?: true
    driverId?: true
    lotadorUserId?: true
    referenceCode?: true
    isActive?: true
    createdAt?: true
    _all?: true
  }

  export type LotadorPartnerAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LotadorPartner to aggregate.
     */
    where?: LotadorPartnerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LotadorPartners to fetch.
     */
    orderBy?: LotadorPartnerOrderByWithRelationInput | LotadorPartnerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: LotadorPartnerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LotadorPartners from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LotadorPartners.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned LotadorPartners
    **/
    _count?: true | LotadorPartnerCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LotadorPartnerMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LotadorPartnerMaxAggregateInputType
  }

  export type GetLotadorPartnerAggregateType<T extends LotadorPartnerAggregateArgs> = {
        [P in keyof T & keyof AggregateLotadorPartner]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLotadorPartner[P]>
      : GetScalarType<T[P], AggregateLotadorPartner[P]>
  }




  export type LotadorPartnerGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LotadorPartnerWhereInput
    orderBy?: LotadorPartnerOrderByWithAggregationInput | LotadorPartnerOrderByWithAggregationInput[]
    by: LotadorPartnerScalarFieldEnum[] | LotadorPartnerScalarFieldEnum
    having?: LotadorPartnerScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LotadorPartnerCountAggregateInputType | true
    _min?: LotadorPartnerMinAggregateInputType
    _max?: LotadorPartnerMaxAggregateInputType
  }

  export type LotadorPartnerGroupByOutputType = {
    id: string
    driverId: string
    lotadorUserId: string
    referenceCode: string
    isActive: boolean
    createdAt: Date
    _count: LotadorPartnerCountAggregateOutputType | null
    _min: LotadorPartnerMinAggregateOutputType | null
    _max: LotadorPartnerMaxAggregateOutputType | null
  }

  type GetLotadorPartnerGroupByPayload<T extends LotadorPartnerGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LotadorPartnerGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LotadorPartnerGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LotadorPartnerGroupByOutputType[P]>
            : GetScalarType<T[P], LotadorPartnerGroupByOutputType[P]>
        }
      >
    >


  export type LotadorPartnerSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    driverId?: boolean
    lotadorUserId?: boolean
    referenceCode?: boolean
    isActive?: boolean
    createdAt?: boolean
    driver?: boolean | DriverDefaultArgs<ExtArgs>
    lotador?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["lotadorPartner"]>

  export type LotadorPartnerSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    driverId?: boolean
    lotadorUserId?: boolean
    referenceCode?: boolean
    isActive?: boolean
    createdAt?: boolean
    driver?: boolean | DriverDefaultArgs<ExtArgs>
    lotador?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["lotadorPartner"]>

  export type LotadorPartnerSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    driverId?: boolean
    lotadorUserId?: boolean
    referenceCode?: boolean
    isActive?: boolean
    createdAt?: boolean
    driver?: boolean | DriverDefaultArgs<ExtArgs>
    lotador?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["lotadorPartner"]>

  export type LotadorPartnerSelectScalar = {
    id?: boolean
    driverId?: boolean
    lotadorUserId?: boolean
    referenceCode?: boolean
    isActive?: boolean
    createdAt?: boolean
  }

  export type LotadorPartnerOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "driverId" | "lotadorUserId" | "referenceCode" | "isActive" | "createdAt", ExtArgs["result"]["lotadorPartner"]>
  export type LotadorPartnerInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    driver?: boolean | DriverDefaultArgs<ExtArgs>
    lotador?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type LotadorPartnerIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    driver?: boolean | DriverDefaultArgs<ExtArgs>
    lotador?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type LotadorPartnerIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    driver?: boolean | DriverDefaultArgs<ExtArgs>
    lotador?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $LotadorPartnerPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "LotadorPartner"
    objects: {
      driver: Prisma.$DriverPayload<ExtArgs>
      lotador: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      driverId: string
      lotadorUserId: string
      referenceCode: string
      isActive: boolean
      createdAt: Date
    }, ExtArgs["result"]["lotadorPartner"]>
    composites: {}
  }

  type LotadorPartnerGetPayload<S extends boolean | null | undefined | LotadorPartnerDefaultArgs> = $Result.GetResult<Prisma.$LotadorPartnerPayload, S>

  type LotadorPartnerCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<LotadorPartnerFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: LotadorPartnerCountAggregateInputType | true
    }

  export interface LotadorPartnerDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['LotadorPartner'], meta: { name: 'LotadorPartner' } }
    /**
     * Find zero or one LotadorPartner that matches the filter.
     * @param {LotadorPartnerFindUniqueArgs} args - Arguments to find a LotadorPartner
     * @example
     * // Get one LotadorPartner
     * const lotadorPartner = await prisma.lotadorPartner.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LotadorPartnerFindUniqueArgs>(args: SelectSubset<T, LotadorPartnerFindUniqueArgs<ExtArgs>>): Prisma__LotadorPartnerClient<$Result.GetResult<Prisma.$LotadorPartnerPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one LotadorPartner that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {LotadorPartnerFindUniqueOrThrowArgs} args - Arguments to find a LotadorPartner
     * @example
     * // Get one LotadorPartner
     * const lotadorPartner = await prisma.lotadorPartner.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LotadorPartnerFindUniqueOrThrowArgs>(args: SelectSubset<T, LotadorPartnerFindUniqueOrThrowArgs<ExtArgs>>): Prisma__LotadorPartnerClient<$Result.GetResult<Prisma.$LotadorPartnerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first LotadorPartner that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LotadorPartnerFindFirstArgs} args - Arguments to find a LotadorPartner
     * @example
     * // Get one LotadorPartner
     * const lotadorPartner = await prisma.lotadorPartner.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LotadorPartnerFindFirstArgs>(args?: SelectSubset<T, LotadorPartnerFindFirstArgs<ExtArgs>>): Prisma__LotadorPartnerClient<$Result.GetResult<Prisma.$LotadorPartnerPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first LotadorPartner that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LotadorPartnerFindFirstOrThrowArgs} args - Arguments to find a LotadorPartner
     * @example
     * // Get one LotadorPartner
     * const lotadorPartner = await prisma.lotadorPartner.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LotadorPartnerFindFirstOrThrowArgs>(args?: SelectSubset<T, LotadorPartnerFindFirstOrThrowArgs<ExtArgs>>): Prisma__LotadorPartnerClient<$Result.GetResult<Prisma.$LotadorPartnerPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more LotadorPartners that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LotadorPartnerFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all LotadorPartners
     * const lotadorPartners = await prisma.lotadorPartner.findMany()
     * 
     * // Get first 10 LotadorPartners
     * const lotadorPartners = await prisma.lotadorPartner.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const lotadorPartnerWithIdOnly = await prisma.lotadorPartner.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends LotadorPartnerFindManyArgs>(args?: SelectSubset<T, LotadorPartnerFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LotadorPartnerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a LotadorPartner.
     * @param {LotadorPartnerCreateArgs} args - Arguments to create a LotadorPartner.
     * @example
     * // Create one LotadorPartner
     * const LotadorPartner = await prisma.lotadorPartner.create({
     *   data: {
     *     // ... data to create a LotadorPartner
     *   }
     * })
     * 
     */
    create<T extends LotadorPartnerCreateArgs>(args: SelectSubset<T, LotadorPartnerCreateArgs<ExtArgs>>): Prisma__LotadorPartnerClient<$Result.GetResult<Prisma.$LotadorPartnerPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many LotadorPartners.
     * @param {LotadorPartnerCreateManyArgs} args - Arguments to create many LotadorPartners.
     * @example
     * // Create many LotadorPartners
     * const lotadorPartner = await prisma.lotadorPartner.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends LotadorPartnerCreateManyArgs>(args?: SelectSubset<T, LotadorPartnerCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many LotadorPartners and returns the data saved in the database.
     * @param {LotadorPartnerCreateManyAndReturnArgs} args - Arguments to create many LotadorPartners.
     * @example
     * // Create many LotadorPartners
     * const lotadorPartner = await prisma.lotadorPartner.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many LotadorPartners and only return the `id`
     * const lotadorPartnerWithIdOnly = await prisma.lotadorPartner.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends LotadorPartnerCreateManyAndReturnArgs>(args?: SelectSubset<T, LotadorPartnerCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LotadorPartnerPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a LotadorPartner.
     * @param {LotadorPartnerDeleteArgs} args - Arguments to delete one LotadorPartner.
     * @example
     * // Delete one LotadorPartner
     * const LotadorPartner = await prisma.lotadorPartner.delete({
     *   where: {
     *     // ... filter to delete one LotadorPartner
     *   }
     * })
     * 
     */
    delete<T extends LotadorPartnerDeleteArgs>(args: SelectSubset<T, LotadorPartnerDeleteArgs<ExtArgs>>): Prisma__LotadorPartnerClient<$Result.GetResult<Prisma.$LotadorPartnerPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one LotadorPartner.
     * @param {LotadorPartnerUpdateArgs} args - Arguments to update one LotadorPartner.
     * @example
     * // Update one LotadorPartner
     * const lotadorPartner = await prisma.lotadorPartner.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends LotadorPartnerUpdateArgs>(args: SelectSubset<T, LotadorPartnerUpdateArgs<ExtArgs>>): Prisma__LotadorPartnerClient<$Result.GetResult<Prisma.$LotadorPartnerPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more LotadorPartners.
     * @param {LotadorPartnerDeleteManyArgs} args - Arguments to filter LotadorPartners to delete.
     * @example
     * // Delete a few LotadorPartners
     * const { count } = await prisma.lotadorPartner.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends LotadorPartnerDeleteManyArgs>(args?: SelectSubset<T, LotadorPartnerDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LotadorPartners.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LotadorPartnerUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many LotadorPartners
     * const lotadorPartner = await prisma.lotadorPartner.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends LotadorPartnerUpdateManyArgs>(args: SelectSubset<T, LotadorPartnerUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LotadorPartners and returns the data updated in the database.
     * @param {LotadorPartnerUpdateManyAndReturnArgs} args - Arguments to update many LotadorPartners.
     * @example
     * // Update many LotadorPartners
     * const lotadorPartner = await prisma.lotadorPartner.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more LotadorPartners and only return the `id`
     * const lotadorPartnerWithIdOnly = await prisma.lotadorPartner.updateManyAndReturn({
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
    updateManyAndReturn<T extends LotadorPartnerUpdateManyAndReturnArgs>(args: SelectSubset<T, LotadorPartnerUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LotadorPartnerPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one LotadorPartner.
     * @param {LotadorPartnerUpsertArgs} args - Arguments to update or create a LotadorPartner.
     * @example
     * // Update or create a LotadorPartner
     * const lotadorPartner = await prisma.lotadorPartner.upsert({
     *   create: {
     *     // ... data to create a LotadorPartner
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the LotadorPartner we want to update
     *   }
     * })
     */
    upsert<T extends LotadorPartnerUpsertArgs>(args: SelectSubset<T, LotadorPartnerUpsertArgs<ExtArgs>>): Prisma__LotadorPartnerClient<$Result.GetResult<Prisma.$LotadorPartnerPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of LotadorPartners.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LotadorPartnerCountArgs} args - Arguments to filter LotadorPartners to count.
     * @example
     * // Count the number of LotadorPartners
     * const count = await prisma.lotadorPartner.count({
     *   where: {
     *     // ... the filter for the LotadorPartners we want to count
     *   }
     * })
    **/
    count<T extends LotadorPartnerCountArgs>(
      args?: Subset<T, LotadorPartnerCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LotadorPartnerCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a LotadorPartner.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LotadorPartnerAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends LotadorPartnerAggregateArgs>(args: Subset<T, LotadorPartnerAggregateArgs>): Prisma.PrismaPromise<GetLotadorPartnerAggregateType<T>>

    /**
     * Group by LotadorPartner.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LotadorPartnerGroupByArgs} args - Group by arguments.
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
      T extends LotadorPartnerGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LotadorPartnerGroupByArgs['orderBy'] }
        : { orderBy?: LotadorPartnerGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, LotadorPartnerGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLotadorPartnerGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the LotadorPartner model
   */
  readonly fields: LotadorPartnerFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for LotadorPartner.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__LotadorPartnerClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    driver<T extends DriverDefaultArgs<ExtArgs> = {}>(args?: Subset<T, DriverDefaultArgs<ExtArgs>>): Prisma__DriverClient<$Result.GetResult<Prisma.$DriverPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    lotador<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the LotadorPartner model
   */
  interface LotadorPartnerFieldRefs {
    readonly id: FieldRef<"LotadorPartner", 'String'>
    readonly driverId: FieldRef<"LotadorPartner", 'String'>
    readonly lotadorUserId: FieldRef<"LotadorPartner", 'String'>
    readonly referenceCode: FieldRef<"LotadorPartner", 'String'>
    readonly isActive: FieldRef<"LotadorPartner", 'Boolean'>
    readonly createdAt: FieldRef<"LotadorPartner", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * LotadorPartner findUnique
   */
  export type LotadorPartnerFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LotadorPartner
     */
    select?: LotadorPartnerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LotadorPartner
     */
    omit?: LotadorPartnerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LotadorPartnerInclude<ExtArgs> | null
    /**
     * Filter, which LotadorPartner to fetch.
     */
    where: LotadorPartnerWhereUniqueInput
  }

  /**
   * LotadorPartner findUniqueOrThrow
   */
  export type LotadorPartnerFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LotadorPartner
     */
    select?: LotadorPartnerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LotadorPartner
     */
    omit?: LotadorPartnerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LotadorPartnerInclude<ExtArgs> | null
    /**
     * Filter, which LotadorPartner to fetch.
     */
    where: LotadorPartnerWhereUniqueInput
  }

  /**
   * LotadorPartner findFirst
   */
  export type LotadorPartnerFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LotadorPartner
     */
    select?: LotadorPartnerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LotadorPartner
     */
    omit?: LotadorPartnerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LotadorPartnerInclude<ExtArgs> | null
    /**
     * Filter, which LotadorPartner to fetch.
     */
    where?: LotadorPartnerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LotadorPartners to fetch.
     */
    orderBy?: LotadorPartnerOrderByWithRelationInput | LotadorPartnerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LotadorPartners.
     */
    cursor?: LotadorPartnerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LotadorPartners from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LotadorPartners.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LotadorPartners.
     */
    distinct?: LotadorPartnerScalarFieldEnum | LotadorPartnerScalarFieldEnum[]
  }

  /**
   * LotadorPartner findFirstOrThrow
   */
  export type LotadorPartnerFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LotadorPartner
     */
    select?: LotadorPartnerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LotadorPartner
     */
    omit?: LotadorPartnerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LotadorPartnerInclude<ExtArgs> | null
    /**
     * Filter, which LotadorPartner to fetch.
     */
    where?: LotadorPartnerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LotadorPartners to fetch.
     */
    orderBy?: LotadorPartnerOrderByWithRelationInput | LotadorPartnerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LotadorPartners.
     */
    cursor?: LotadorPartnerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LotadorPartners from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LotadorPartners.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LotadorPartners.
     */
    distinct?: LotadorPartnerScalarFieldEnum | LotadorPartnerScalarFieldEnum[]
  }

  /**
   * LotadorPartner findMany
   */
  export type LotadorPartnerFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LotadorPartner
     */
    select?: LotadorPartnerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LotadorPartner
     */
    omit?: LotadorPartnerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LotadorPartnerInclude<ExtArgs> | null
    /**
     * Filter, which LotadorPartners to fetch.
     */
    where?: LotadorPartnerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LotadorPartners to fetch.
     */
    orderBy?: LotadorPartnerOrderByWithRelationInput | LotadorPartnerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing LotadorPartners.
     */
    cursor?: LotadorPartnerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LotadorPartners from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LotadorPartners.
     */
    skip?: number
    distinct?: LotadorPartnerScalarFieldEnum | LotadorPartnerScalarFieldEnum[]
  }

  /**
   * LotadorPartner create
   */
  export type LotadorPartnerCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LotadorPartner
     */
    select?: LotadorPartnerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LotadorPartner
     */
    omit?: LotadorPartnerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LotadorPartnerInclude<ExtArgs> | null
    /**
     * The data needed to create a LotadorPartner.
     */
    data: XOR<LotadorPartnerCreateInput, LotadorPartnerUncheckedCreateInput>
  }

  /**
   * LotadorPartner createMany
   */
  export type LotadorPartnerCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many LotadorPartners.
     */
    data: LotadorPartnerCreateManyInput | LotadorPartnerCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * LotadorPartner createManyAndReturn
   */
  export type LotadorPartnerCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LotadorPartner
     */
    select?: LotadorPartnerSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the LotadorPartner
     */
    omit?: LotadorPartnerOmit<ExtArgs> | null
    /**
     * The data used to create many LotadorPartners.
     */
    data: LotadorPartnerCreateManyInput | LotadorPartnerCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LotadorPartnerIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * LotadorPartner update
   */
  export type LotadorPartnerUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LotadorPartner
     */
    select?: LotadorPartnerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LotadorPartner
     */
    omit?: LotadorPartnerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LotadorPartnerInclude<ExtArgs> | null
    /**
     * The data needed to update a LotadorPartner.
     */
    data: XOR<LotadorPartnerUpdateInput, LotadorPartnerUncheckedUpdateInput>
    /**
     * Choose, which LotadorPartner to update.
     */
    where: LotadorPartnerWhereUniqueInput
  }

  /**
   * LotadorPartner updateMany
   */
  export type LotadorPartnerUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update LotadorPartners.
     */
    data: XOR<LotadorPartnerUpdateManyMutationInput, LotadorPartnerUncheckedUpdateManyInput>
    /**
     * Filter which LotadorPartners to update
     */
    where?: LotadorPartnerWhereInput
    /**
     * Limit how many LotadorPartners to update.
     */
    limit?: number
  }

  /**
   * LotadorPartner updateManyAndReturn
   */
  export type LotadorPartnerUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LotadorPartner
     */
    select?: LotadorPartnerSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the LotadorPartner
     */
    omit?: LotadorPartnerOmit<ExtArgs> | null
    /**
     * The data used to update LotadorPartners.
     */
    data: XOR<LotadorPartnerUpdateManyMutationInput, LotadorPartnerUncheckedUpdateManyInput>
    /**
     * Filter which LotadorPartners to update
     */
    where?: LotadorPartnerWhereInput
    /**
     * Limit how many LotadorPartners to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LotadorPartnerIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * LotadorPartner upsert
   */
  export type LotadorPartnerUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LotadorPartner
     */
    select?: LotadorPartnerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LotadorPartner
     */
    omit?: LotadorPartnerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LotadorPartnerInclude<ExtArgs> | null
    /**
     * The filter to search for the LotadorPartner to update in case it exists.
     */
    where: LotadorPartnerWhereUniqueInput
    /**
     * In case the LotadorPartner found by the `where` argument doesn't exist, create a new LotadorPartner with this data.
     */
    create: XOR<LotadorPartnerCreateInput, LotadorPartnerUncheckedCreateInput>
    /**
     * In case the LotadorPartner was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LotadorPartnerUpdateInput, LotadorPartnerUncheckedUpdateInput>
  }

  /**
   * LotadorPartner delete
   */
  export type LotadorPartnerDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LotadorPartner
     */
    select?: LotadorPartnerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LotadorPartner
     */
    omit?: LotadorPartnerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LotadorPartnerInclude<ExtArgs> | null
    /**
     * Filter which LotadorPartner to delete.
     */
    where: LotadorPartnerWhereUniqueInput
  }

  /**
   * LotadorPartner deleteMany
   */
  export type LotadorPartnerDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LotadorPartners to delete
     */
    where?: LotadorPartnerWhereInput
    /**
     * Limit how many LotadorPartners to delete.
     */
    limit?: number
  }

  /**
   * LotadorPartner without action
   */
  export type LotadorPartnerDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LotadorPartner
     */
    select?: LotadorPartnerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LotadorPartner
     */
    omit?: LotadorPartnerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LotadorPartnerInclude<ExtArgs> | null
  }


  /**
   * Model AuditLog
   */

  export type AggregateAuditLog = {
    _count: AuditLogCountAggregateOutputType | null
    _min: AuditLogMinAggregateOutputType | null
    _max: AuditLogMaxAggregateOutputType | null
  }

  export type AuditLogMinAggregateOutputType = {
    id: string | null
    userId: string | null
    action: string | null
    entityType: string | null
    entityId: string | null
    ipAddress: string | null
    createdAt: Date | null
  }

  export type AuditLogMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    action: string | null
    entityType: string | null
    entityId: string | null
    ipAddress: string | null
    createdAt: Date | null
  }

  export type AuditLogCountAggregateOutputType = {
    id: number
    userId: number
    action: number
    entityType: number
    entityId: number
    metadata: number
    ipAddress: number
    createdAt: number
    _all: number
  }


  export type AuditLogMinAggregateInputType = {
    id?: true
    userId?: true
    action?: true
    entityType?: true
    entityId?: true
    ipAddress?: true
    createdAt?: true
  }

  export type AuditLogMaxAggregateInputType = {
    id?: true
    userId?: true
    action?: true
    entityType?: true
    entityId?: true
    ipAddress?: true
    createdAt?: true
  }

  export type AuditLogCountAggregateInputType = {
    id?: true
    userId?: true
    action?: true
    entityType?: true
    entityId?: true
    metadata?: true
    ipAddress?: true
    createdAt?: true
    _all?: true
  }

  export type AuditLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AuditLog to aggregate.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AuditLogs
    **/
    _count?: true | AuditLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AuditLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AuditLogMaxAggregateInputType
  }

  export type GetAuditLogAggregateType<T extends AuditLogAggregateArgs> = {
        [P in keyof T & keyof AggregateAuditLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAuditLog[P]>
      : GetScalarType<T[P], AggregateAuditLog[P]>
  }




  export type AuditLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AuditLogWhereInput
    orderBy?: AuditLogOrderByWithAggregationInput | AuditLogOrderByWithAggregationInput[]
    by: AuditLogScalarFieldEnum[] | AuditLogScalarFieldEnum
    having?: AuditLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AuditLogCountAggregateInputType | true
    _min?: AuditLogMinAggregateInputType
    _max?: AuditLogMaxAggregateInputType
  }

  export type AuditLogGroupByOutputType = {
    id: string
    userId: string
    action: string
    entityType: string
    entityId: string
    metadata: JsonValue | null
    ipAddress: string | null
    createdAt: Date
    _count: AuditLogCountAggregateOutputType | null
    _min: AuditLogMinAggregateOutputType | null
    _max: AuditLogMaxAggregateOutputType | null
  }

  type GetAuditLogGroupByPayload<T extends AuditLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AuditLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AuditLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AuditLogGroupByOutputType[P]>
            : GetScalarType<T[P], AuditLogGroupByOutputType[P]>
        }
      >
    >


  export type AuditLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    action?: boolean
    entityType?: boolean
    entityId?: boolean
    metadata?: boolean
    ipAddress?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["auditLog"]>

  export type AuditLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    action?: boolean
    entityType?: boolean
    entityId?: boolean
    metadata?: boolean
    ipAddress?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["auditLog"]>

  export type AuditLogSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    action?: boolean
    entityType?: boolean
    entityId?: boolean
    metadata?: boolean
    ipAddress?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["auditLog"]>

  export type AuditLogSelectScalar = {
    id?: boolean
    userId?: boolean
    action?: boolean
    entityType?: boolean
    entityId?: boolean
    metadata?: boolean
    ipAddress?: boolean
    createdAt?: boolean
  }

  export type AuditLogOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "action" | "entityType" | "entityId" | "metadata" | "ipAddress" | "createdAt", ExtArgs["result"]["auditLog"]>
  export type AuditLogInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AuditLogIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AuditLogIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $AuditLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AuditLog"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      action: string
      entityType: string
      entityId: string
      metadata: Prisma.JsonValue | null
      ipAddress: string | null
      createdAt: Date
    }, ExtArgs["result"]["auditLog"]>
    composites: {}
  }

  type AuditLogGetPayload<S extends boolean | null | undefined | AuditLogDefaultArgs> = $Result.GetResult<Prisma.$AuditLogPayload, S>

  type AuditLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AuditLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AuditLogCountAggregateInputType | true
    }

  export interface AuditLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AuditLog'], meta: { name: 'AuditLog' } }
    /**
     * Find zero or one AuditLog that matches the filter.
     * @param {AuditLogFindUniqueArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AuditLogFindUniqueArgs>(args: SelectSubset<T, AuditLogFindUniqueArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AuditLog that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AuditLogFindUniqueOrThrowArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AuditLogFindUniqueOrThrowArgs>(args: SelectSubset<T, AuditLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AuditLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindFirstArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AuditLogFindFirstArgs>(args?: SelectSubset<T, AuditLogFindFirstArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AuditLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindFirstOrThrowArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AuditLogFindFirstOrThrowArgs>(args?: SelectSubset<T, AuditLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AuditLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AuditLogs
     * const auditLogs = await prisma.auditLog.findMany()
     * 
     * // Get first 10 AuditLogs
     * const auditLogs = await prisma.auditLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const auditLogWithIdOnly = await prisma.auditLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AuditLogFindManyArgs>(args?: SelectSubset<T, AuditLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AuditLog.
     * @param {AuditLogCreateArgs} args - Arguments to create a AuditLog.
     * @example
     * // Create one AuditLog
     * const AuditLog = await prisma.auditLog.create({
     *   data: {
     *     // ... data to create a AuditLog
     *   }
     * })
     * 
     */
    create<T extends AuditLogCreateArgs>(args: SelectSubset<T, AuditLogCreateArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AuditLogs.
     * @param {AuditLogCreateManyArgs} args - Arguments to create many AuditLogs.
     * @example
     * // Create many AuditLogs
     * const auditLog = await prisma.auditLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AuditLogCreateManyArgs>(args?: SelectSubset<T, AuditLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AuditLogs and returns the data saved in the database.
     * @param {AuditLogCreateManyAndReturnArgs} args - Arguments to create many AuditLogs.
     * @example
     * // Create many AuditLogs
     * const auditLog = await prisma.auditLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AuditLogs and only return the `id`
     * const auditLogWithIdOnly = await prisma.auditLog.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AuditLogCreateManyAndReturnArgs>(args?: SelectSubset<T, AuditLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AuditLog.
     * @param {AuditLogDeleteArgs} args - Arguments to delete one AuditLog.
     * @example
     * // Delete one AuditLog
     * const AuditLog = await prisma.auditLog.delete({
     *   where: {
     *     // ... filter to delete one AuditLog
     *   }
     * })
     * 
     */
    delete<T extends AuditLogDeleteArgs>(args: SelectSubset<T, AuditLogDeleteArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AuditLog.
     * @param {AuditLogUpdateArgs} args - Arguments to update one AuditLog.
     * @example
     * // Update one AuditLog
     * const auditLog = await prisma.auditLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AuditLogUpdateArgs>(args: SelectSubset<T, AuditLogUpdateArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AuditLogs.
     * @param {AuditLogDeleteManyArgs} args - Arguments to filter AuditLogs to delete.
     * @example
     * // Delete a few AuditLogs
     * const { count } = await prisma.auditLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AuditLogDeleteManyArgs>(args?: SelectSubset<T, AuditLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AuditLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AuditLogs
     * const auditLog = await prisma.auditLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AuditLogUpdateManyArgs>(args: SelectSubset<T, AuditLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AuditLogs and returns the data updated in the database.
     * @param {AuditLogUpdateManyAndReturnArgs} args - Arguments to update many AuditLogs.
     * @example
     * // Update many AuditLogs
     * const auditLog = await prisma.auditLog.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AuditLogs and only return the `id`
     * const auditLogWithIdOnly = await prisma.auditLog.updateManyAndReturn({
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
    updateManyAndReturn<T extends AuditLogUpdateManyAndReturnArgs>(args: SelectSubset<T, AuditLogUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AuditLog.
     * @param {AuditLogUpsertArgs} args - Arguments to update or create a AuditLog.
     * @example
     * // Update or create a AuditLog
     * const auditLog = await prisma.auditLog.upsert({
     *   create: {
     *     // ... data to create a AuditLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AuditLog we want to update
     *   }
     * })
     */
    upsert<T extends AuditLogUpsertArgs>(args: SelectSubset<T, AuditLogUpsertArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AuditLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogCountArgs} args - Arguments to filter AuditLogs to count.
     * @example
     * // Count the number of AuditLogs
     * const count = await prisma.auditLog.count({
     *   where: {
     *     // ... the filter for the AuditLogs we want to count
     *   }
     * })
    **/
    count<T extends AuditLogCountArgs>(
      args?: Subset<T, AuditLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AuditLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AuditLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AuditLogAggregateArgs>(args: Subset<T, AuditLogAggregateArgs>): Prisma.PrismaPromise<GetAuditLogAggregateType<T>>

    /**
     * Group by AuditLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogGroupByArgs} args - Group by arguments.
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
      T extends AuditLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AuditLogGroupByArgs['orderBy'] }
        : { orderBy?: AuditLogGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, AuditLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAuditLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AuditLog model
   */
  readonly fields: AuditLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AuditLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AuditLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the AuditLog model
   */
  interface AuditLogFieldRefs {
    readonly id: FieldRef<"AuditLog", 'String'>
    readonly userId: FieldRef<"AuditLog", 'String'>
    readonly action: FieldRef<"AuditLog", 'String'>
    readonly entityType: FieldRef<"AuditLog", 'String'>
    readonly entityId: FieldRef<"AuditLog", 'String'>
    readonly metadata: FieldRef<"AuditLog", 'Json'>
    readonly ipAddress: FieldRef<"AuditLog", 'String'>
    readonly createdAt: FieldRef<"AuditLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AuditLog findUnique
   */
  export type AuditLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog findUniqueOrThrow
   */
  export type AuditLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog findFirst
   */
  export type AuditLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuditLogs.
     */
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog findFirstOrThrow
   */
  export type AuditLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuditLogs.
     */
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog findMany
   */
  export type AuditLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLogs to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog create
   */
  export type AuditLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * The data needed to create a AuditLog.
     */
    data: XOR<AuditLogCreateInput, AuditLogUncheckedCreateInput>
  }

  /**
   * AuditLog createMany
   */
  export type AuditLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AuditLogs.
     */
    data: AuditLogCreateManyInput | AuditLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AuditLog createManyAndReturn
   */
  export type AuditLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * The data used to create many AuditLogs.
     */
    data: AuditLogCreateManyInput | AuditLogCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * AuditLog update
   */
  export type AuditLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * The data needed to update a AuditLog.
     */
    data: XOR<AuditLogUpdateInput, AuditLogUncheckedUpdateInput>
    /**
     * Choose, which AuditLog to update.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog updateMany
   */
  export type AuditLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AuditLogs.
     */
    data: XOR<AuditLogUpdateManyMutationInput, AuditLogUncheckedUpdateManyInput>
    /**
     * Filter which AuditLogs to update
     */
    where?: AuditLogWhereInput
    /**
     * Limit how many AuditLogs to update.
     */
    limit?: number
  }

  /**
   * AuditLog updateManyAndReturn
   */
  export type AuditLogUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * The data used to update AuditLogs.
     */
    data: XOR<AuditLogUpdateManyMutationInput, AuditLogUncheckedUpdateManyInput>
    /**
     * Filter which AuditLogs to update
     */
    where?: AuditLogWhereInput
    /**
     * Limit how many AuditLogs to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * AuditLog upsert
   */
  export type AuditLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * The filter to search for the AuditLog to update in case it exists.
     */
    where: AuditLogWhereUniqueInput
    /**
     * In case the AuditLog found by the `where` argument doesn't exist, create a new AuditLog with this data.
     */
    create: XOR<AuditLogCreateInput, AuditLogUncheckedCreateInput>
    /**
     * In case the AuditLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AuditLogUpdateInput, AuditLogUncheckedUpdateInput>
  }

  /**
   * AuditLog delete
   */
  export type AuditLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter which AuditLog to delete.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog deleteMany
   */
  export type AuditLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AuditLogs to delete
     */
    where?: AuditLogWhereInput
    /**
     * Limit how many AuditLogs to delete.
     */
    limit?: number
  }

  /**
   * AuditLog without action
   */
  export type AuditLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
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


  export const UserScalarFieldEnum: {
    id: 'id',
    phone: 'phone',
    displayId: 'displayId',
    name: 'name',
    pinHash: 'pinHash',
    passwordHash: 'passwordHash',
    role: 'role',
    isActive: 'isActive',
    isBlocked: 'isBlocked',
    blockReason: 'blockReason',
    createdById: 'createdById',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    deletedAt: 'deletedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const AgentScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    adminId: 'adminId',
    isActive: 'isActive',
    dailyTicketLimit: 'dailyTicketLimit',
    permissions: 'permissions',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AgentScalarFieldEnum = (typeof AgentScalarFieldEnum)[keyof typeof AgentScalarFieldEnum]


  export const DriverScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    clientId: 'clientId',
    licensePlate: 'licensePlate',
    status: 'status',
    workDays: 'workDays',
    currentBalance: 'currentBalance',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type DriverScalarFieldEnum = (typeof DriverScalarFieldEnum)[keyof typeof DriverScalarFieldEnum]


  export const WalletScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    balance: 'balance',
    currency: 'currency',
    updatedAt: 'updatedAt',
    createdAt: 'createdAt'
  };

  export type WalletScalarFieldEnum = (typeof WalletScalarFieldEnum)[keyof typeof WalletScalarFieldEnum]


  export const TicketScalarFieldEnum: {
    id: 'id',
    passengerId: 'passengerId',
    driverId: 'driverId',
    issuedById: 'issuedById',
    amount: 'amount',
    status: 'status',
    qrNonce: 'qrNonce',
    shortCode: 'shortCode',
    transferredToId: 'transferredToId',
    transferredAt: 'transferredAt',
    cancelReason: 'cancelReason',
    cancelledById: 'cancelledById',
    usedAt: 'usedAt',
    expiresAt: 'expiresAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type TicketScalarFieldEnum = (typeof TicketScalarFieldEnum)[keyof typeof TicketScalarFieldEnum]


  export const TransactionScalarFieldEnum: {
    id: 'id',
    walletId: 'walletId',
    ticketId: 'ticketId',
    type: 'type',
    amount: 'amount',
    balanceBefore: 'balanceBefore',
    balanceAfter: 'balanceAfter',
    reference: 'reference',
    metadata: 'metadata',
    createdAt: 'createdAt'
  };

  export type TransactionScalarFieldEnum = (typeof TransactionScalarFieldEnum)[keyof typeof TransactionScalarFieldEnum]


  export const LocationEventScalarFieldEnum: {
    id: 'id',
    driverId: 'driverId',
    lat: 'lat',
    lng: 'lng',
    speed: 'speed',
    heading: 'heading',
    recordedAt: 'recordedAt'
  };

  export type LocationEventScalarFieldEnum = (typeof LocationEventScalarFieldEnum)[keyof typeof LocationEventScalarFieldEnum]


  export const LotadorPartnerScalarFieldEnum: {
    id: 'id',
    driverId: 'driverId',
    lotadorUserId: 'lotadorUserId',
    referenceCode: 'referenceCode',
    isActive: 'isActive',
    createdAt: 'createdAt'
  };

  export type LotadorPartnerScalarFieldEnum = (typeof LotadorPartnerScalarFieldEnum)[keyof typeof LotadorPartnerScalarFieldEnum]


  export const AuditLogScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    action: 'action',
    entityType: 'entityType',
    entityId: 'entityId',
    metadata: 'metadata',
    ipAddress: 'ipAddress',
    createdAt: 'createdAt'
  };

  export type AuditLogScalarFieldEnum = (typeof AuditLogScalarFieldEnum)[keyof typeof AuditLogScalarFieldEnum]


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
   * Reference to a field of type 'Role'
   */
  export type EnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role'>
    


  /**
   * Reference to a field of type 'Role[]'
   */
  export type ListEnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role[]'>
    


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
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'DriverStatus'
   */
  export type EnumDriverStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DriverStatus'>
    


  /**
   * Reference to a field of type 'DriverStatus[]'
   */
  export type ListEnumDriverStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DriverStatus[]'>
    


  /**
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>
    


  /**
   * Reference to a field of type 'Decimal[]'
   */
  export type ListDecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal[]'>
    


  /**
   * Reference to a field of type 'TicketStatus'
   */
  export type EnumTicketStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TicketStatus'>
    


  /**
   * Reference to a field of type 'TicketStatus[]'
   */
  export type ListEnumTicketStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TicketStatus[]'>
    


  /**
   * Reference to a field of type 'TransactionType'
   */
  export type EnumTransactionTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TransactionType'>
    


  /**
   * Reference to a field of type 'TransactionType[]'
   */
  export type ListEnumTransactionTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TransactionType[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


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


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    phone?: StringNullableFilter<"User"> | string | null
    displayId?: StringNullableFilter<"User"> | string | null
    name?: StringFilter<"User"> | string
    pinHash?: StringNullableFilter<"User"> | string | null
    passwordHash?: StringNullableFilter<"User"> | string | null
    role?: EnumRoleFilter<"User"> | $Enums.Role
    isActive?: BoolFilter<"User"> | boolean
    isBlocked?: BoolFilter<"User"> | boolean
    blockReason?: StringNullableFilter<"User"> | string | null
    createdById?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    deletedAt?: DateTimeNullableFilter<"User"> | Date | string | null
    createdBy?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    createdUsers?: UserListRelationFilter
    agentProfile?: XOR<AgentNullableScalarRelationFilter, AgentWhereInput> | null
    adminAgents?: AgentListRelationFilter
    driverProfile?: XOR<DriverNullableScalarRelationFilter, DriverWhereInput> | null
    clientDrivers?: DriverListRelationFilter
    wallet?: XOR<WalletNullableScalarRelationFilter, WalletWhereInput> | null
    ticketsAsPassenger?: TicketListRelationFilter
    ticketsEmitted?: TicketListRelationFilter
    ticketsTransferredTo?: TicketListRelationFilter
    lotadorPartnerships?: LotadorPartnerListRelationFilter
    auditLogs?: AuditLogListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    phone?: SortOrderInput | SortOrder
    displayId?: SortOrderInput | SortOrder
    name?: SortOrder
    pinHash?: SortOrderInput | SortOrder
    passwordHash?: SortOrderInput | SortOrder
    role?: SortOrder
    isActive?: SortOrder
    isBlocked?: SortOrder
    blockReason?: SortOrderInput | SortOrder
    createdById?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    createdBy?: UserOrderByWithRelationInput
    createdUsers?: UserOrderByRelationAggregateInput
    agentProfile?: AgentOrderByWithRelationInput
    adminAgents?: AgentOrderByRelationAggregateInput
    driverProfile?: DriverOrderByWithRelationInput
    clientDrivers?: DriverOrderByRelationAggregateInput
    wallet?: WalletOrderByWithRelationInput
    ticketsAsPassenger?: TicketOrderByRelationAggregateInput
    ticketsEmitted?: TicketOrderByRelationAggregateInput
    ticketsTransferredTo?: TicketOrderByRelationAggregateInput
    lotadorPartnerships?: LotadorPartnerOrderByRelationAggregateInput
    auditLogs?: AuditLogOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    phone?: string
    displayId?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringFilter<"User"> | string
    pinHash?: StringNullableFilter<"User"> | string | null
    passwordHash?: StringNullableFilter<"User"> | string | null
    role?: EnumRoleFilter<"User"> | $Enums.Role
    isActive?: BoolFilter<"User"> | boolean
    isBlocked?: BoolFilter<"User"> | boolean
    blockReason?: StringNullableFilter<"User"> | string | null
    createdById?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    deletedAt?: DateTimeNullableFilter<"User"> | Date | string | null
    createdBy?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    createdUsers?: UserListRelationFilter
    agentProfile?: XOR<AgentNullableScalarRelationFilter, AgentWhereInput> | null
    adminAgents?: AgentListRelationFilter
    driverProfile?: XOR<DriverNullableScalarRelationFilter, DriverWhereInput> | null
    clientDrivers?: DriverListRelationFilter
    wallet?: XOR<WalletNullableScalarRelationFilter, WalletWhereInput> | null
    ticketsAsPassenger?: TicketListRelationFilter
    ticketsEmitted?: TicketListRelationFilter
    ticketsTransferredTo?: TicketListRelationFilter
    lotadorPartnerships?: LotadorPartnerListRelationFilter
    auditLogs?: AuditLogListRelationFilter
  }, "id" | "phone" | "displayId">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    phone?: SortOrderInput | SortOrder
    displayId?: SortOrderInput | SortOrder
    name?: SortOrder
    pinHash?: SortOrderInput | SortOrder
    passwordHash?: SortOrderInput | SortOrder
    role?: SortOrder
    isActive?: SortOrder
    isBlocked?: SortOrder
    blockReason?: SortOrderInput | SortOrder
    createdById?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    phone?: StringNullableWithAggregatesFilter<"User"> | string | null
    displayId?: StringNullableWithAggregatesFilter<"User"> | string | null
    name?: StringWithAggregatesFilter<"User"> | string
    pinHash?: StringNullableWithAggregatesFilter<"User"> | string | null
    passwordHash?: StringNullableWithAggregatesFilter<"User"> | string | null
    role?: EnumRoleWithAggregatesFilter<"User"> | $Enums.Role
    isActive?: BoolWithAggregatesFilter<"User"> | boolean
    isBlocked?: BoolWithAggregatesFilter<"User"> | boolean
    blockReason?: StringNullableWithAggregatesFilter<"User"> | string | null
    createdById?: StringNullableWithAggregatesFilter<"User"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    deletedAt?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
  }

  export type AgentWhereInput = {
    AND?: AgentWhereInput | AgentWhereInput[]
    OR?: AgentWhereInput[]
    NOT?: AgentWhereInput | AgentWhereInput[]
    id?: StringFilter<"Agent"> | string
    userId?: StringFilter<"Agent"> | string
    adminId?: StringFilter<"Agent"> | string
    isActive?: BoolFilter<"Agent"> | boolean
    dailyTicketLimit?: IntFilter<"Agent"> | number
    permissions?: StringNullableListFilter<"Agent">
    createdAt?: DateTimeFilter<"Agent"> | Date | string
    updatedAt?: DateTimeFilter<"Agent"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    admin?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type AgentOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    adminId?: SortOrder
    isActive?: SortOrder
    dailyTicketLimit?: SortOrder
    permissions?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    admin?: UserOrderByWithRelationInput
  }

  export type AgentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId?: string
    AND?: AgentWhereInput | AgentWhereInput[]
    OR?: AgentWhereInput[]
    NOT?: AgentWhereInput | AgentWhereInput[]
    adminId?: StringFilter<"Agent"> | string
    isActive?: BoolFilter<"Agent"> | boolean
    dailyTicketLimit?: IntFilter<"Agent"> | number
    permissions?: StringNullableListFilter<"Agent">
    createdAt?: DateTimeFilter<"Agent"> | Date | string
    updatedAt?: DateTimeFilter<"Agent"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    admin?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "userId">

  export type AgentOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    adminId?: SortOrder
    isActive?: SortOrder
    dailyTicketLimit?: SortOrder
    permissions?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AgentCountOrderByAggregateInput
    _avg?: AgentAvgOrderByAggregateInput
    _max?: AgentMaxOrderByAggregateInput
    _min?: AgentMinOrderByAggregateInput
    _sum?: AgentSumOrderByAggregateInput
  }

  export type AgentScalarWhereWithAggregatesInput = {
    AND?: AgentScalarWhereWithAggregatesInput | AgentScalarWhereWithAggregatesInput[]
    OR?: AgentScalarWhereWithAggregatesInput[]
    NOT?: AgentScalarWhereWithAggregatesInput | AgentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Agent"> | string
    userId?: StringWithAggregatesFilter<"Agent"> | string
    adminId?: StringWithAggregatesFilter<"Agent"> | string
    isActive?: BoolWithAggregatesFilter<"Agent"> | boolean
    dailyTicketLimit?: IntWithAggregatesFilter<"Agent"> | number
    permissions?: StringNullableListFilter<"Agent">
    createdAt?: DateTimeWithAggregatesFilter<"Agent"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Agent"> | Date | string
  }

  export type DriverWhereInput = {
    AND?: DriverWhereInput | DriverWhereInput[]
    OR?: DriverWhereInput[]
    NOT?: DriverWhereInput | DriverWhereInput[]
    id?: StringFilter<"Driver"> | string
    userId?: StringFilter<"Driver"> | string
    clientId?: StringFilter<"Driver"> | string
    licensePlate?: StringFilter<"Driver"> | string
    status?: EnumDriverStatusFilter<"Driver"> | $Enums.DriverStatus
    workDays?: IntNullableListFilter<"Driver">
    currentBalance?: DecimalFilter<"Driver"> | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFilter<"Driver"> | Date | string
    updatedAt?: DateTimeFilter<"Driver"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    client?: XOR<UserScalarRelationFilter, UserWhereInput>
    ticketsReceived?: TicketListRelationFilter
    locationEvents?: LocationEventListRelationFilter
    lotadorPartnerships?: LotadorPartnerListRelationFilter
  }

  export type DriverOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    clientId?: SortOrder
    licensePlate?: SortOrder
    status?: SortOrder
    workDays?: SortOrder
    currentBalance?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    client?: UserOrderByWithRelationInput
    ticketsReceived?: TicketOrderByRelationAggregateInput
    locationEvents?: LocationEventOrderByRelationAggregateInput
    lotadorPartnerships?: LotadorPartnerOrderByRelationAggregateInput
  }

  export type DriverWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId?: string
    licensePlate?: string
    AND?: DriverWhereInput | DriverWhereInput[]
    OR?: DriverWhereInput[]
    NOT?: DriverWhereInput | DriverWhereInput[]
    clientId?: StringFilter<"Driver"> | string
    status?: EnumDriverStatusFilter<"Driver"> | $Enums.DriverStatus
    workDays?: IntNullableListFilter<"Driver">
    currentBalance?: DecimalFilter<"Driver"> | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFilter<"Driver"> | Date | string
    updatedAt?: DateTimeFilter<"Driver"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    client?: XOR<UserScalarRelationFilter, UserWhereInput>
    ticketsReceived?: TicketListRelationFilter
    locationEvents?: LocationEventListRelationFilter
    lotadorPartnerships?: LotadorPartnerListRelationFilter
  }, "id" | "userId" | "licensePlate">

  export type DriverOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    clientId?: SortOrder
    licensePlate?: SortOrder
    status?: SortOrder
    workDays?: SortOrder
    currentBalance?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: DriverCountOrderByAggregateInput
    _avg?: DriverAvgOrderByAggregateInput
    _max?: DriverMaxOrderByAggregateInput
    _min?: DriverMinOrderByAggregateInput
    _sum?: DriverSumOrderByAggregateInput
  }

  export type DriverScalarWhereWithAggregatesInput = {
    AND?: DriverScalarWhereWithAggregatesInput | DriverScalarWhereWithAggregatesInput[]
    OR?: DriverScalarWhereWithAggregatesInput[]
    NOT?: DriverScalarWhereWithAggregatesInput | DriverScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Driver"> | string
    userId?: StringWithAggregatesFilter<"Driver"> | string
    clientId?: StringWithAggregatesFilter<"Driver"> | string
    licensePlate?: StringWithAggregatesFilter<"Driver"> | string
    status?: EnumDriverStatusWithAggregatesFilter<"Driver"> | $Enums.DriverStatus
    workDays?: IntNullableListFilter<"Driver">
    currentBalance?: DecimalWithAggregatesFilter<"Driver"> | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeWithAggregatesFilter<"Driver"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Driver"> | Date | string
  }

  export type WalletWhereInput = {
    AND?: WalletWhereInput | WalletWhereInput[]
    OR?: WalletWhereInput[]
    NOT?: WalletWhereInput | WalletWhereInput[]
    id?: StringFilter<"Wallet"> | string
    userId?: StringFilter<"Wallet"> | string
    balance?: DecimalFilter<"Wallet"> | Decimal | DecimalJsLike | number | string
    currency?: StringFilter<"Wallet"> | string
    updatedAt?: DateTimeFilter<"Wallet"> | Date | string
    createdAt?: DateTimeFilter<"Wallet"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    transactions?: TransactionListRelationFilter
  }

  export type WalletOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    balance?: SortOrder
    currency?: SortOrder
    updatedAt?: SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
    transactions?: TransactionOrderByRelationAggregateInput
  }

  export type WalletWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId?: string
    AND?: WalletWhereInput | WalletWhereInput[]
    OR?: WalletWhereInput[]
    NOT?: WalletWhereInput | WalletWhereInput[]
    balance?: DecimalFilter<"Wallet"> | Decimal | DecimalJsLike | number | string
    currency?: StringFilter<"Wallet"> | string
    updatedAt?: DateTimeFilter<"Wallet"> | Date | string
    createdAt?: DateTimeFilter<"Wallet"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    transactions?: TransactionListRelationFilter
  }, "id" | "userId">

  export type WalletOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    balance?: SortOrder
    currency?: SortOrder
    updatedAt?: SortOrder
    createdAt?: SortOrder
    _count?: WalletCountOrderByAggregateInput
    _avg?: WalletAvgOrderByAggregateInput
    _max?: WalletMaxOrderByAggregateInput
    _min?: WalletMinOrderByAggregateInput
    _sum?: WalletSumOrderByAggregateInput
  }

  export type WalletScalarWhereWithAggregatesInput = {
    AND?: WalletScalarWhereWithAggregatesInput | WalletScalarWhereWithAggregatesInput[]
    OR?: WalletScalarWhereWithAggregatesInput[]
    NOT?: WalletScalarWhereWithAggregatesInput | WalletScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Wallet"> | string
    userId?: StringWithAggregatesFilter<"Wallet"> | string
    balance?: DecimalWithAggregatesFilter<"Wallet"> | Decimal | DecimalJsLike | number | string
    currency?: StringWithAggregatesFilter<"Wallet"> | string
    updatedAt?: DateTimeWithAggregatesFilter<"Wallet"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"Wallet"> | Date | string
  }

  export type TicketWhereInput = {
    AND?: TicketWhereInput | TicketWhereInput[]
    OR?: TicketWhereInput[]
    NOT?: TicketWhereInput | TicketWhereInput[]
    id?: StringFilter<"Ticket"> | string
    passengerId?: StringFilter<"Ticket"> | string
    driverId?: StringFilter<"Ticket"> | string
    issuedById?: StringFilter<"Ticket"> | string
    amount?: DecimalFilter<"Ticket"> | Decimal | DecimalJsLike | number | string
    status?: EnumTicketStatusFilter<"Ticket"> | $Enums.TicketStatus
    qrNonce?: StringFilter<"Ticket"> | string
    shortCode?: StringNullableFilter<"Ticket"> | string | null
    transferredToId?: StringNullableFilter<"Ticket"> | string | null
    transferredAt?: DateTimeNullableFilter<"Ticket"> | Date | string | null
    cancelReason?: StringNullableFilter<"Ticket"> | string | null
    cancelledById?: StringNullableFilter<"Ticket"> | string | null
    usedAt?: DateTimeNullableFilter<"Ticket"> | Date | string | null
    expiresAt?: DateTimeFilter<"Ticket"> | Date | string
    createdAt?: DateTimeFilter<"Ticket"> | Date | string
    updatedAt?: DateTimeFilter<"Ticket"> | Date | string
    passenger?: XOR<UserScalarRelationFilter, UserWhereInput>
    driver?: XOR<DriverScalarRelationFilter, DriverWhereInput>
    issuedBy?: XOR<UserScalarRelationFilter, UserWhereInput>
    transferredTo?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    transaction?: XOR<TransactionNullableScalarRelationFilter, TransactionWhereInput> | null
  }

  export type TicketOrderByWithRelationInput = {
    id?: SortOrder
    passengerId?: SortOrder
    driverId?: SortOrder
    issuedById?: SortOrder
    amount?: SortOrder
    status?: SortOrder
    qrNonce?: SortOrder
    shortCode?: SortOrderInput | SortOrder
    transferredToId?: SortOrderInput | SortOrder
    transferredAt?: SortOrderInput | SortOrder
    cancelReason?: SortOrderInput | SortOrder
    cancelledById?: SortOrderInput | SortOrder
    usedAt?: SortOrderInput | SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    passenger?: UserOrderByWithRelationInput
    driver?: DriverOrderByWithRelationInput
    issuedBy?: UserOrderByWithRelationInput
    transferredTo?: UserOrderByWithRelationInput
    transaction?: TransactionOrderByWithRelationInput
  }

  export type TicketWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    qrNonce?: string
    shortCode?: string
    AND?: TicketWhereInput | TicketWhereInput[]
    OR?: TicketWhereInput[]
    NOT?: TicketWhereInput | TicketWhereInput[]
    passengerId?: StringFilter<"Ticket"> | string
    driverId?: StringFilter<"Ticket"> | string
    issuedById?: StringFilter<"Ticket"> | string
    amount?: DecimalFilter<"Ticket"> | Decimal | DecimalJsLike | number | string
    status?: EnumTicketStatusFilter<"Ticket"> | $Enums.TicketStatus
    transferredToId?: StringNullableFilter<"Ticket"> | string | null
    transferredAt?: DateTimeNullableFilter<"Ticket"> | Date | string | null
    cancelReason?: StringNullableFilter<"Ticket"> | string | null
    cancelledById?: StringNullableFilter<"Ticket"> | string | null
    usedAt?: DateTimeNullableFilter<"Ticket"> | Date | string | null
    expiresAt?: DateTimeFilter<"Ticket"> | Date | string
    createdAt?: DateTimeFilter<"Ticket"> | Date | string
    updatedAt?: DateTimeFilter<"Ticket"> | Date | string
    passenger?: XOR<UserScalarRelationFilter, UserWhereInput>
    driver?: XOR<DriverScalarRelationFilter, DriverWhereInput>
    issuedBy?: XOR<UserScalarRelationFilter, UserWhereInput>
    transferredTo?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    transaction?: XOR<TransactionNullableScalarRelationFilter, TransactionWhereInput> | null
  }, "id" | "qrNonce" | "shortCode">

  export type TicketOrderByWithAggregationInput = {
    id?: SortOrder
    passengerId?: SortOrder
    driverId?: SortOrder
    issuedById?: SortOrder
    amount?: SortOrder
    status?: SortOrder
    qrNonce?: SortOrder
    shortCode?: SortOrderInput | SortOrder
    transferredToId?: SortOrderInput | SortOrder
    transferredAt?: SortOrderInput | SortOrder
    cancelReason?: SortOrderInput | SortOrder
    cancelledById?: SortOrderInput | SortOrder
    usedAt?: SortOrderInput | SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: TicketCountOrderByAggregateInput
    _avg?: TicketAvgOrderByAggregateInput
    _max?: TicketMaxOrderByAggregateInput
    _min?: TicketMinOrderByAggregateInput
    _sum?: TicketSumOrderByAggregateInput
  }

  export type TicketScalarWhereWithAggregatesInput = {
    AND?: TicketScalarWhereWithAggregatesInput | TicketScalarWhereWithAggregatesInput[]
    OR?: TicketScalarWhereWithAggregatesInput[]
    NOT?: TicketScalarWhereWithAggregatesInput | TicketScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Ticket"> | string
    passengerId?: StringWithAggregatesFilter<"Ticket"> | string
    driverId?: StringWithAggregatesFilter<"Ticket"> | string
    issuedById?: StringWithAggregatesFilter<"Ticket"> | string
    amount?: DecimalWithAggregatesFilter<"Ticket"> | Decimal | DecimalJsLike | number | string
    status?: EnumTicketStatusWithAggregatesFilter<"Ticket"> | $Enums.TicketStatus
    qrNonce?: StringWithAggregatesFilter<"Ticket"> | string
    shortCode?: StringNullableWithAggregatesFilter<"Ticket"> | string | null
    transferredToId?: StringNullableWithAggregatesFilter<"Ticket"> | string | null
    transferredAt?: DateTimeNullableWithAggregatesFilter<"Ticket"> | Date | string | null
    cancelReason?: StringNullableWithAggregatesFilter<"Ticket"> | string | null
    cancelledById?: StringNullableWithAggregatesFilter<"Ticket"> | string | null
    usedAt?: DateTimeNullableWithAggregatesFilter<"Ticket"> | Date | string | null
    expiresAt?: DateTimeWithAggregatesFilter<"Ticket"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"Ticket"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Ticket"> | Date | string
  }

  export type TransactionWhereInput = {
    AND?: TransactionWhereInput | TransactionWhereInput[]
    OR?: TransactionWhereInput[]
    NOT?: TransactionWhereInput | TransactionWhereInput[]
    id?: StringFilter<"Transaction"> | string
    walletId?: StringFilter<"Transaction"> | string
    ticketId?: StringNullableFilter<"Transaction"> | string | null
    type?: EnumTransactionTypeFilter<"Transaction"> | $Enums.TransactionType
    amount?: DecimalFilter<"Transaction"> | Decimal | DecimalJsLike | number | string
    balanceBefore?: DecimalFilter<"Transaction"> | Decimal | DecimalJsLike | number | string
    balanceAfter?: DecimalFilter<"Transaction"> | Decimal | DecimalJsLike | number | string
    reference?: StringNullableFilter<"Transaction"> | string | null
    metadata?: JsonNullableFilter<"Transaction">
    createdAt?: DateTimeFilter<"Transaction"> | Date | string
    wallet?: XOR<WalletScalarRelationFilter, WalletWhereInput>
    ticket?: XOR<TicketNullableScalarRelationFilter, TicketWhereInput> | null
  }

  export type TransactionOrderByWithRelationInput = {
    id?: SortOrder
    walletId?: SortOrder
    ticketId?: SortOrderInput | SortOrder
    type?: SortOrder
    amount?: SortOrder
    balanceBefore?: SortOrder
    balanceAfter?: SortOrder
    reference?: SortOrderInput | SortOrder
    metadata?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    wallet?: WalletOrderByWithRelationInput
    ticket?: TicketOrderByWithRelationInput
  }

  export type TransactionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    ticketId?: string
    AND?: TransactionWhereInput | TransactionWhereInput[]
    OR?: TransactionWhereInput[]
    NOT?: TransactionWhereInput | TransactionWhereInput[]
    walletId?: StringFilter<"Transaction"> | string
    type?: EnumTransactionTypeFilter<"Transaction"> | $Enums.TransactionType
    amount?: DecimalFilter<"Transaction"> | Decimal | DecimalJsLike | number | string
    balanceBefore?: DecimalFilter<"Transaction"> | Decimal | DecimalJsLike | number | string
    balanceAfter?: DecimalFilter<"Transaction"> | Decimal | DecimalJsLike | number | string
    reference?: StringNullableFilter<"Transaction"> | string | null
    metadata?: JsonNullableFilter<"Transaction">
    createdAt?: DateTimeFilter<"Transaction"> | Date | string
    wallet?: XOR<WalletScalarRelationFilter, WalletWhereInput>
    ticket?: XOR<TicketNullableScalarRelationFilter, TicketWhereInput> | null
  }, "id" | "ticketId">

  export type TransactionOrderByWithAggregationInput = {
    id?: SortOrder
    walletId?: SortOrder
    ticketId?: SortOrderInput | SortOrder
    type?: SortOrder
    amount?: SortOrder
    balanceBefore?: SortOrder
    balanceAfter?: SortOrder
    reference?: SortOrderInput | SortOrder
    metadata?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: TransactionCountOrderByAggregateInput
    _avg?: TransactionAvgOrderByAggregateInput
    _max?: TransactionMaxOrderByAggregateInput
    _min?: TransactionMinOrderByAggregateInput
    _sum?: TransactionSumOrderByAggregateInput
  }

  export type TransactionScalarWhereWithAggregatesInput = {
    AND?: TransactionScalarWhereWithAggregatesInput | TransactionScalarWhereWithAggregatesInput[]
    OR?: TransactionScalarWhereWithAggregatesInput[]
    NOT?: TransactionScalarWhereWithAggregatesInput | TransactionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Transaction"> | string
    walletId?: StringWithAggregatesFilter<"Transaction"> | string
    ticketId?: StringNullableWithAggregatesFilter<"Transaction"> | string | null
    type?: EnumTransactionTypeWithAggregatesFilter<"Transaction"> | $Enums.TransactionType
    amount?: DecimalWithAggregatesFilter<"Transaction"> | Decimal | DecimalJsLike | number | string
    balanceBefore?: DecimalWithAggregatesFilter<"Transaction"> | Decimal | DecimalJsLike | number | string
    balanceAfter?: DecimalWithAggregatesFilter<"Transaction"> | Decimal | DecimalJsLike | number | string
    reference?: StringNullableWithAggregatesFilter<"Transaction"> | string | null
    metadata?: JsonNullableWithAggregatesFilter<"Transaction">
    createdAt?: DateTimeWithAggregatesFilter<"Transaction"> | Date | string
  }

  export type LocationEventWhereInput = {
    AND?: LocationEventWhereInput | LocationEventWhereInput[]
    OR?: LocationEventWhereInput[]
    NOT?: LocationEventWhereInput | LocationEventWhereInput[]
    id?: StringFilter<"LocationEvent"> | string
    driverId?: StringFilter<"LocationEvent"> | string
    lat?: FloatFilter<"LocationEvent"> | number
    lng?: FloatFilter<"LocationEvent"> | number
    speed?: FloatFilter<"LocationEvent"> | number
    heading?: FloatNullableFilter<"LocationEvent"> | number | null
    recordedAt?: DateTimeFilter<"LocationEvent"> | Date | string
    driver?: XOR<DriverScalarRelationFilter, DriverWhereInput>
  }

  export type LocationEventOrderByWithRelationInput = {
    id?: SortOrder
    driverId?: SortOrder
    lat?: SortOrder
    lng?: SortOrder
    speed?: SortOrder
    heading?: SortOrderInput | SortOrder
    recordedAt?: SortOrder
    driver?: DriverOrderByWithRelationInput
  }

  export type LocationEventWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: LocationEventWhereInput | LocationEventWhereInput[]
    OR?: LocationEventWhereInput[]
    NOT?: LocationEventWhereInput | LocationEventWhereInput[]
    driverId?: StringFilter<"LocationEvent"> | string
    lat?: FloatFilter<"LocationEvent"> | number
    lng?: FloatFilter<"LocationEvent"> | number
    speed?: FloatFilter<"LocationEvent"> | number
    heading?: FloatNullableFilter<"LocationEvent"> | number | null
    recordedAt?: DateTimeFilter<"LocationEvent"> | Date | string
    driver?: XOR<DriverScalarRelationFilter, DriverWhereInput>
  }, "id">

  export type LocationEventOrderByWithAggregationInput = {
    id?: SortOrder
    driverId?: SortOrder
    lat?: SortOrder
    lng?: SortOrder
    speed?: SortOrder
    heading?: SortOrderInput | SortOrder
    recordedAt?: SortOrder
    _count?: LocationEventCountOrderByAggregateInput
    _avg?: LocationEventAvgOrderByAggregateInput
    _max?: LocationEventMaxOrderByAggregateInput
    _min?: LocationEventMinOrderByAggregateInput
    _sum?: LocationEventSumOrderByAggregateInput
  }

  export type LocationEventScalarWhereWithAggregatesInput = {
    AND?: LocationEventScalarWhereWithAggregatesInput | LocationEventScalarWhereWithAggregatesInput[]
    OR?: LocationEventScalarWhereWithAggregatesInput[]
    NOT?: LocationEventScalarWhereWithAggregatesInput | LocationEventScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"LocationEvent"> | string
    driverId?: StringWithAggregatesFilter<"LocationEvent"> | string
    lat?: FloatWithAggregatesFilter<"LocationEvent"> | number
    lng?: FloatWithAggregatesFilter<"LocationEvent"> | number
    speed?: FloatWithAggregatesFilter<"LocationEvent"> | number
    heading?: FloatNullableWithAggregatesFilter<"LocationEvent"> | number | null
    recordedAt?: DateTimeWithAggregatesFilter<"LocationEvent"> | Date | string
  }

  export type LotadorPartnerWhereInput = {
    AND?: LotadorPartnerWhereInput | LotadorPartnerWhereInput[]
    OR?: LotadorPartnerWhereInput[]
    NOT?: LotadorPartnerWhereInput | LotadorPartnerWhereInput[]
    id?: StringFilter<"LotadorPartner"> | string
    driverId?: StringFilter<"LotadorPartner"> | string
    lotadorUserId?: StringFilter<"LotadorPartner"> | string
    referenceCode?: StringFilter<"LotadorPartner"> | string
    isActive?: BoolFilter<"LotadorPartner"> | boolean
    createdAt?: DateTimeFilter<"LotadorPartner"> | Date | string
    driver?: XOR<DriverScalarRelationFilter, DriverWhereInput>
    lotador?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type LotadorPartnerOrderByWithRelationInput = {
    id?: SortOrder
    driverId?: SortOrder
    lotadorUserId?: SortOrder
    referenceCode?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    driver?: DriverOrderByWithRelationInput
    lotador?: UserOrderByWithRelationInput
  }

  export type LotadorPartnerWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    referenceCode?: string
    driverId_lotadorUserId?: LotadorPartnerDriverIdLotadorUserIdCompoundUniqueInput
    AND?: LotadorPartnerWhereInput | LotadorPartnerWhereInput[]
    OR?: LotadorPartnerWhereInput[]
    NOT?: LotadorPartnerWhereInput | LotadorPartnerWhereInput[]
    driverId?: StringFilter<"LotadorPartner"> | string
    lotadorUserId?: StringFilter<"LotadorPartner"> | string
    isActive?: BoolFilter<"LotadorPartner"> | boolean
    createdAt?: DateTimeFilter<"LotadorPartner"> | Date | string
    driver?: XOR<DriverScalarRelationFilter, DriverWhereInput>
    lotador?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "referenceCode" | "driverId_lotadorUserId">

  export type LotadorPartnerOrderByWithAggregationInput = {
    id?: SortOrder
    driverId?: SortOrder
    lotadorUserId?: SortOrder
    referenceCode?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    _count?: LotadorPartnerCountOrderByAggregateInput
    _max?: LotadorPartnerMaxOrderByAggregateInput
    _min?: LotadorPartnerMinOrderByAggregateInput
  }

  export type LotadorPartnerScalarWhereWithAggregatesInput = {
    AND?: LotadorPartnerScalarWhereWithAggregatesInput | LotadorPartnerScalarWhereWithAggregatesInput[]
    OR?: LotadorPartnerScalarWhereWithAggregatesInput[]
    NOT?: LotadorPartnerScalarWhereWithAggregatesInput | LotadorPartnerScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"LotadorPartner"> | string
    driverId?: StringWithAggregatesFilter<"LotadorPartner"> | string
    lotadorUserId?: StringWithAggregatesFilter<"LotadorPartner"> | string
    referenceCode?: StringWithAggregatesFilter<"LotadorPartner"> | string
    isActive?: BoolWithAggregatesFilter<"LotadorPartner"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"LotadorPartner"> | Date | string
  }

  export type AuditLogWhereInput = {
    AND?: AuditLogWhereInput | AuditLogWhereInput[]
    OR?: AuditLogWhereInput[]
    NOT?: AuditLogWhereInput | AuditLogWhereInput[]
    id?: StringFilter<"AuditLog"> | string
    userId?: StringFilter<"AuditLog"> | string
    action?: StringFilter<"AuditLog"> | string
    entityType?: StringFilter<"AuditLog"> | string
    entityId?: StringFilter<"AuditLog"> | string
    metadata?: JsonNullableFilter<"AuditLog">
    ipAddress?: StringNullableFilter<"AuditLog"> | string | null
    createdAt?: DateTimeFilter<"AuditLog"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type AuditLogOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    action?: SortOrder
    entityType?: SortOrder
    entityId?: SortOrder
    metadata?: SortOrderInput | SortOrder
    ipAddress?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type AuditLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AuditLogWhereInput | AuditLogWhereInput[]
    OR?: AuditLogWhereInput[]
    NOT?: AuditLogWhereInput | AuditLogWhereInput[]
    userId?: StringFilter<"AuditLog"> | string
    action?: StringFilter<"AuditLog"> | string
    entityType?: StringFilter<"AuditLog"> | string
    entityId?: StringFilter<"AuditLog"> | string
    metadata?: JsonNullableFilter<"AuditLog">
    ipAddress?: StringNullableFilter<"AuditLog"> | string | null
    createdAt?: DateTimeFilter<"AuditLog"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type AuditLogOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    action?: SortOrder
    entityType?: SortOrder
    entityId?: SortOrder
    metadata?: SortOrderInput | SortOrder
    ipAddress?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: AuditLogCountOrderByAggregateInput
    _max?: AuditLogMaxOrderByAggregateInput
    _min?: AuditLogMinOrderByAggregateInput
  }

  export type AuditLogScalarWhereWithAggregatesInput = {
    AND?: AuditLogScalarWhereWithAggregatesInput | AuditLogScalarWhereWithAggregatesInput[]
    OR?: AuditLogScalarWhereWithAggregatesInput[]
    NOT?: AuditLogScalarWhereWithAggregatesInput | AuditLogScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AuditLog"> | string
    userId?: StringWithAggregatesFilter<"AuditLog"> | string
    action?: StringWithAggregatesFilter<"AuditLog"> | string
    entityType?: StringWithAggregatesFilter<"AuditLog"> | string
    entityId?: StringWithAggregatesFilter<"AuditLog"> | string
    metadata?: JsonNullableWithAggregatesFilter<"AuditLog">
    ipAddress?: StringNullableWithAggregatesFilter<"AuditLog"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"AuditLog"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    phone?: string | null
    displayId?: string | null
    name: string
    pinHash?: string | null
    passwordHash?: string | null
    role: $Enums.Role
    isActive?: boolean
    isBlocked?: boolean
    blockReason?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    createdBy?: UserCreateNestedOneWithoutCreatedUsersInput
    createdUsers?: UserCreateNestedManyWithoutCreatedByInput
    agentProfile?: AgentCreateNestedOneWithoutUserInput
    adminAgents?: AgentCreateNestedManyWithoutAdminInput
    driverProfile?: DriverCreateNestedOneWithoutUserInput
    clientDrivers?: DriverCreateNestedManyWithoutClientInput
    wallet?: WalletCreateNestedOneWithoutUserInput
    ticketsAsPassenger?: TicketCreateNestedManyWithoutPassengerInput
    ticketsEmitted?: TicketCreateNestedManyWithoutIssuedByInput
    ticketsTransferredTo?: TicketCreateNestedManyWithoutTransferredToInput
    lotadorPartnerships?: LotadorPartnerCreateNestedManyWithoutLotadorInput
    auditLogs?: AuditLogCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    phone?: string | null
    displayId?: string | null
    name: string
    pinHash?: string | null
    passwordHash?: string | null
    role: $Enums.Role
    isActive?: boolean
    isBlocked?: boolean
    blockReason?: string | null
    createdById?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    createdUsers?: UserUncheckedCreateNestedManyWithoutCreatedByInput
    agentProfile?: AgentUncheckedCreateNestedOneWithoutUserInput
    adminAgents?: AgentUncheckedCreateNestedManyWithoutAdminInput
    driverProfile?: DriverUncheckedCreateNestedOneWithoutUserInput
    clientDrivers?: DriverUncheckedCreateNestedManyWithoutClientInput
    wallet?: WalletUncheckedCreateNestedOneWithoutUserInput
    ticketsAsPassenger?: TicketUncheckedCreateNestedManyWithoutPassengerInput
    ticketsEmitted?: TicketUncheckedCreateNestedManyWithoutIssuedByInput
    ticketsTransferredTo?: TicketUncheckedCreateNestedManyWithoutTransferredToInput
    lotadorPartnerships?: LotadorPartnerUncheckedCreateNestedManyWithoutLotadorInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    displayId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    pinHash?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isBlocked?: BoolFieldUpdateOperationsInput | boolean
    blockReason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdBy?: UserUpdateOneWithoutCreatedUsersNestedInput
    createdUsers?: UserUpdateManyWithoutCreatedByNestedInput
    agentProfile?: AgentUpdateOneWithoutUserNestedInput
    adminAgents?: AgentUpdateManyWithoutAdminNestedInput
    driverProfile?: DriverUpdateOneWithoutUserNestedInput
    clientDrivers?: DriverUpdateManyWithoutClientNestedInput
    wallet?: WalletUpdateOneWithoutUserNestedInput
    ticketsAsPassenger?: TicketUpdateManyWithoutPassengerNestedInput
    ticketsEmitted?: TicketUpdateManyWithoutIssuedByNestedInput
    ticketsTransferredTo?: TicketUpdateManyWithoutTransferredToNestedInput
    lotadorPartnerships?: LotadorPartnerUpdateManyWithoutLotadorNestedInput
    auditLogs?: AuditLogUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    displayId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    pinHash?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isBlocked?: BoolFieldUpdateOperationsInput | boolean
    blockReason?: NullableStringFieldUpdateOperationsInput | string | null
    createdById?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdUsers?: UserUncheckedUpdateManyWithoutCreatedByNestedInput
    agentProfile?: AgentUncheckedUpdateOneWithoutUserNestedInput
    adminAgents?: AgentUncheckedUpdateManyWithoutAdminNestedInput
    driverProfile?: DriverUncheckedUpdateOneWithoutUserNestedInput
    clientDrivers?: DriverUncheckedUpdateManyWithoutClientNestedInput
    wallet?: WalletUncheckedUpdateOneWithoutUserNestedInput
    ticketsAsPassenger?: TicketUncheckedUpdateManyWithoutPassengerNestedInput
    ticketsEmitted?: TicketUncheckedUpdateManyWithoutIssuedByNestedInput
    ticketsTransferredTo?: TicketUncheckedUpdateManyWithoutTransferredToNestedInput
    lotadorPartnerships?: LotadorPartnerUncheckedUpdateManyWithoutLotadorNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    phone?: string | null
    displayId?: string | null
    name: string
    pinHash?: string | null
    passwordHash?: string | null
    role: $Enums.Role
    isActive?: boolean
    isBlocked?: boolean
    blockReason?: string | null
    createdById?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    displayId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    pinHash?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isBlocked?: BoolFieldUpdateOperationsInput | boolean
    blockReason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    displayId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    pinHash?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isBlocked?: BoolFieldUpdateOperationsInput | boolean
    blockReason?: NullableStringFieldUpdateOperationsInput | string | null
    createdById?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type AgentCreateInput = {
    id?: string
    isActive?: boolean
    dailyTicketLimit?: number
    permissions?: AgentCreatepermissionsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutAgentProfileInput
    admin: UserCreateNestedOneWithoutAdminAgentsInput
  }

  export type AgentUncheckedCreateInput = {
    id?: string
    userId: string
    adminId: string
    isActive?: boolean
    dailyTicketLimit?: number
    permissions?: AgentCreatepermissionsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AgentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    dailyTicketLimit?: IntFieldUpdateOperationsInput | number
    permissions?: AgentUpdatepermissionsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutAgentProfileNestedInput
    admin?: UserUpdateOneRequiredWithoutAdminAgentsNestedInput
  }

  export type AgentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    adminId?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    dailyTicketLimit?: IntFieldUpdateOperationsInput | number
    permissions?: AgentUpdatepermissionsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AgentCreateManyInput = {
    id?: string
    userId: string
    adminId: string
    isActive?: boolean
    dailyTicketLimit?: number
    permissions?: AgentCreatepermissionsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AgentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    dailyTicketLimit?: IntFieldUpdateOperationsInput | number
    permissions?: AgentUpdatepermissionsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AgentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    adminId?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    dailyTicketLimit?: IntFieldUpdateOperationsInput | number
    permissions?: AgentUpdatepermissionsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DriverCreateInput = {
    id?: string
    licensePlate: string
    status?: $Enums.DriverStatus
    workDays?: DriverCreateworkDaysInput | number[]
    currentBalance?: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutDriverProfileInput
    client: UserCreateNestedOneWithoutClientDriversInput
    ticketsReceived?: TicketCreateNestedManyWithoutDriverInput
    locationEvents?: LocationEventCreateNestedManyWithoutDriverInput
    lotadorPartnerships?: LotadorPartnerCreateNestedManyWithoutDriverInput
  }

  export type DriverUncheckedCreateInput = {
    id?: string
    userId: string
    clientId: string
    licensePlate: string
    status?: $Enums.DriverStatus
    workDays?: DriverCreateworkDaysInput | number[]
    currentBalance?: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
    ticketsReceived?: TicketUncheckedCreateNestedManyWithoutDriverInput
    locationEvents?: LocationEventUncheckedCreateNestedManyWithoutDriverInput
    lotadorPartnerships?: LotadorPartnerUncheckedCreateNestedManyWithoutDriverInput
  }

  export type DriverUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    licensePlate?: StringFieldUpdateOperationsInput | string
    status?: EnumDriverStatusFieldUpdateOperationsInput | $Enums.DriverStatus
    workDays?: DriverUpdateworkDaysInput | number[]
    currentBalance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutDriverProfileNestedInput
    client?: UserUpdateOneRequiredWithoutClientDriversNestedInput
    ticketsReceived?: TicketUpdateManyWithoutDriverNestedInput
    locationEvents?: LocationEventUpdateManyWithoutDriverNestedInput
    lotadorPartnerships?: LotadorPartnerUpdateManyWithoutDriverNestedInput
  }

  export type DriverUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    clientId?: StringFieldUpdateOperationsInput | string
    licensePlate?: StringFieldUpdateOperationsInput | string
    status?: EnumDriverStatusFieldUpdateOperationsInput | $Enums.DriverStatus
    workDays?: DriverUpdateworkDaysInput | number[]
    currentBalance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ticketsReceived?: TicketUncheckedUpdateManyWithoutDriverNestedInput
    locationEvents?: LocationEventUncheckedUpdateManyWithoutDriverNestedInput
    lotadorPartnerships?: LotadorPartnerUncheckedUpdateManyWithoutDriverNestedInput
  }

  export type DriverCreateManyInput = {
    id?: string
    userId: string
    clientId: string
    licensePlate: string
    status?: $Enums.DriverStatus
    workDays?: DriverCreateworkDaysInput | number[]
    currentBalance?: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DriverUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    licensePlate?: StringFieldUpdateOperationsInput | string
    status?: EnumDriverStatusFieldUpdateOperationsInput | $Enums.DriverStatus
    workDays?: DriverUpdateworkDaysInput | number[]
    currentBalance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DriverUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    clientId?: StringFieldUpdateOperationsInput | string
    licensePlate?: StringFieldUpdateOperationsInput | string
    status?: EnumDriverStatusFieldUpdateOperationsInput | $Enums.DriverStatus
    workDays?: DriverUpdateworkDaysInput | number[]
    currentBalance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WalletCreateInput = {
    id?: string
    balance?: Decimal | DecimalJsLike | number | string
    currency?: string
    updatedAt?: Date | string
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutWalletInput
    transactions?: TransactionCreateNestedManyWithoutWalletInput
  }

  export type WalletUncheckedCreateInput = {
    id?: string
    userId: string
    balance?: Decimal | DecimalJsLike | number | string
    currency?: string
    updatedAt?: Date | string
    createdAt?: Date | string
    transactions?: TransactionUncheckedCreateNestedManyWithoutWalletInput
  }

  export type WalletUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    balance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currency?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutWalletNestedInput
    transactions?: TransactionUpdateManyWithoutWalletNestedInput
  }

  export type WalletUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    balance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currency?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    transactions?: TransactionUncheckedUpdateManyWithoutWalletNestedInput
  }

  export type WalletCreateManyInput = {
    id?: string
    userId: string
    balance?: Decimal | DecimalJsLike | number | string
    currency?: string
    updatedAt?: Date | string
    createdAt?: Date | string
  }

  export type WalletUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    balance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currency?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WalletUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    balance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currency?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TicketCreateInput = {
    id?: string
    amount: Decimal | DecimalJsLike | number | string
    status?: $Enums.TicketStatus
    qrNonce: string
    shortCode?: string | null
    transferredAt?: Date | string | null
    cancelReason?: string | null
    cancelledById?: string | null
    usedAt?: Date | string | null
    expiresAt: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    passenger: UserCreateNestedOneWithoutTicketsAsPassengerInput
    driver: DriverCreateNestedOneWithoutTicketsReceivedInput
    issuedBy: UserCreateNestedOneWithoutTicketsEmittedInput
    transferredTo?: UserCreateNestedOneWithoutTicketsTransferredToInput
    transaction?: TransactionCreateNestedOneWithoutTicketInput
  }

  export type TicketUncheckedCreateInput = {
    id?: string
    passengerId: string
    driverId: string
    issuedById: string
    amount: Decimal | DecimalJsLike | number | string
    status?: $Enums.TicketStatus
    qrNonce: string
    shortCode?: string | null
    transferredToId?: string | null
    transferredAt?: Date | string | null
    cancelReason?: string | null
    cancelledById?: string | null
    usedAt?: Date | string | null
    expiresAt: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    transaction?: TransactionUncheckedCreateNestedOneWithoutTicketInput
  }

  export type TicketUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: EnumTicketStatusFieldUpdateOperationsInput | $Enums.TicketStatus
    qrNonce?: StringFieldUpdateOperationsInput | string
    shortCode?: NullableStringFieldUpdateOperationsInput | string | null
    transferredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancelReason?: NullableStringFieldUpdateOperationsInput | string | null
    cancelledById?: NullableStringFieldUpdateOperationsInput | string | null
    usedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    passenger?: UserUpdateOneRequiredWithoutTicketsAsPassengerNestedInput
    driver?: DriverUpdateOneRequiredWithoutTicketsReceivedNestedInput
    issuedBy?: UserUpdateOneRequiredWithoutTicketsEmittedNestedInput
    transferredTo?: UserUpdateOneWithoutTicketsTransferredToNestedInput
    transaction?: TransactionUpdateOneWithoutTicketNestedInput
  }

  export type TicketUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    passengerId?: StringFieldUpdateOperationsInput | string
    driverId?: StringFieldUpdateOperationsInput | string
    issuedById?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: EnumTicketStatusFieldUpdateOperationsInput | $Enums.TicketStatus
    qrNonce?: StringFieldUpdateOperationsInput | string
    shortCode?: NullableStringFieldUpdateOperationsInput | string | null
    transferredToId?: NullableStringFieldUpdateOperationsInput | string | null
    transferredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancelReason?: NullableStringFieldUpdateOperationsInput | string | null
    cancelledById?: NullableStringFieldUpdateOperationsInput | string | null
    usedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    transaction?: TransactionUncheckedUpdateOneWithoutTicketNestedInput
  }

  export type TicketCreateManyInput = {
    id?: string
    passengerId: string
    driverId: string
    issuedById: string
    amount: Decimal | DecimalJsLike | number | string
    status?: $Enums.TicketStatus
    qrNonce: string
    shortCode?: string | null
    transferredToId?: string | null
    transferredAt?: Date | string | null
    cancelReason?: string | null
    cancelledById?: string | null
    usedAt?: Date | string | null
    expiresAt: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TicketUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: EnumTicketStatusFieldUpdateOperationsInput | $Enums.TicketStatus
    qrNonce?: StringFieldUpdateOperationsInput | string
    shortCode?: NullableStringFieldUpdateOperationsInput | string | null
    transferredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancelReason?: NullableStringFieldUpdateOperationsInput | string | null
    cancelledById?: NullableStringFieldUpdateOperationsInput | string | null
    usedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TicketUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    passengerId?: StringFieldUpdateOperationsInput | string
    driverId?: StringFieldUpdateOperationsInput | string
    issuedById?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: EnumTicketStatusFieldUpdateOperationsInput | $Enums.TicketStatus
    qrNonce?: StringFieldUpdateOperationsInput | string
    shortCode?: NullableStringFieldUpdateOperationsInput | string | null
    transferredToId?: NullableStringFieldUpdateOperationsInput | string | null
    transferredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancelReason?: NullableStringFieldUpdateOperationsInput | string | null
    cancelledById?: NullableStringFieldUpdateOperationsInput | string | null
    usedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransactionCreateInput = {
    id?: string
    type: $Enums.TransactionType
    amount: Decimal | DecimalJsLike | number | string
    balanceBefore: Decimal | DecimalJsLike | number | string
    balanceAfter: Decimal | DecimalJsLike | number | string
    reference?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    wallet: WalletCreateNestedOneWithoutTransactionsInput
    ticket?: TicketCreateNestedOneWithoutTransactionInput
  }

  export type TransactionUncheckedCreateInput = {
    id?: string
    walletId: string
    ticketId?: string | null
    type: $Enums.TransactionType
    amount: Decimal | DecimalJsLike | number | string
    balanceBefore: Decimal | DecimalJsLike | number | string
    balanceAfter: Decimal | DecimalJsLike | number | string
    reference?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type TransactionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    balanceBefore?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    balanceAfter?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    reference?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    wallet?: WalletUpdateOneRequiredWithoutTransactionsNestedInput
    ticket?: TicketUpdateOneWithoutTransactionNestedInput
  }

  export type TransactionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    walletId?: StringFieldUpdateOperationsInput | string
    ticketId?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    balanceBefore?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    balanceAfter?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    reference?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransactionCreateManyInput = {
    id?: string
    walletId: string
    ticketId?: string | null
    type: $Enums.TransactionType
    amount: Decimal | DecimalJsLike | number | string
    balanceBefore: Decimal | DecimalJsLike | number | string
    balanceAfter: Decimal | DecimalJsLike | number | string
    reference?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type TransactionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    balanceBefore?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    balanceAfter?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    reference?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransactionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    walletId?: StringFieldUpdateOperationsInput | string
    ticketId?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    balanceBefore?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    balanceAfter?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    reference?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LocationEventCreateInput = {
    id?: string
    lat: number
    lng: number
    speed?: number
    heading?: number | null
    recordedAt: Date | string
    driver: DriverCreateNestedOneWithoutLocationEventsInput
  }

  export type LocationEventUncheckedCreateInput = {
    id?: string
    driverId: string
    lat: number
    lng: number
    speed?: number
    heading?: number | null
    recordedAt: Date | string
  }

  export type LocationEventUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    lat?: FloatFieldUpdateOperationsInput | number
    lng?: FloatFieldUpdateOperationsInput | number
    speed?: FloatFieldUpdateOperationsInput | number
    heading?: NullableFloatFieldUpdateOperationsInput | number | null
    recordedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    driver?: DriverUpdateOneRequiredWithoutLocationEventsNestedInput
  }

  export type LocationEventUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    driverId?: StringFieldUpdateOperationsInput | string
    lat?: FloatFieldUpdateOperationsInput | number
    lng?: FloatFieldUpdateOperationsInput | number
    speed?: FloatFieldUpdateOperationsInput | number
    heading?: NullableFloatFieldUpdateOperationsInput | number | null
    recordedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LocationEventCreateManyInput = {
    id?: string
    driverId: string
    lat: number
    lng: number
    speed?: number
    heading?: number | null
    recordedAt: Date | string
  }

  export type LocationEventUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    lat?: FloatFieldUpdateOperationsInput | number
    lng?: FloatFieldUpdateOperationsInput | number
    speed?: FloatFieldUpdateOperationsInput | number
    heading?: NullableFloatFieldUpdateOperationsInput | number | null
    recordedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LocationEventUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    driverId?: StringFieldUpdateOperationsInput | string
    lat?: FloatFieldUpdateOperationsInput | number
    lng?: FloatFieldUpdateOperationsInput | number
    speed?: FloatFieldUpdateOperationsInput | number
    heading?: NullableFloatFieldUpdateOperationsInput | number | null
    recordedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LotadorPartnerCreateInput = {
    id?: string
    referenceCode: string
    isActive?: boolean
    createdAt?: Date | string
    driver: DriverCreateNestedOneWithoutLotadorPartnershipsInput
    lotador: UserCreateNestedOneWithoutLotadorPartnershipsInput
  }

  export type LotadorPartnerUncheckedCreateInput = {
    id?: string
    driverId: string
    lotadorUserId: string
    referenceCode: string
    isActive?: boolean
    createdAt?: Date | string
  }

  export type LotadorPartnerUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    referenceCode?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    driver?: DriverUpdateOneRequiredWithoutLotadorPartnershipsNestedInput
    lotador?: UserUpdateOneRequiredWithoutLotadorPartnershipsNestedInput
  }

  export type LotadorPartnerUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    driverId?: StringFieldUpdateOperationsInput | string
    lotadorUserId?: StringFieldUpdateOperationsInput | string
    referenceCode?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LotadorPartnerCreateManyInput = {
    id?: string
    driverId: string
    lotadorUserId: string
    referenceCode: string
    isActive?: boolean
    createdAt?: Date | string
  }

  export type LotadorPartnerUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    referenceCode?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LotadorPartnerUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    driverId?: StringFieldUpdateOperationsInput | string
    lotadorUserId?: StringFieldUpdateOperationsInput | string
    referenceCode?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogCreateInput = {
    id?: string
    action: string
    entityType: string
    entityId: string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    ipAddress?: string | null
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutAuditLogsInput
  }

  export type AuditLogUncheckedCreateInput = {
    id?: string
    userId: string
    action: string
    entityType: string
    entityId: string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    ipAddress?: string | null
    createdAt?: Date | string
  }

  export type AuditLogUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    entityType?: StringFieldUpdateOperationsInput | string
    entityId?: StringFieldUpdateOperationsInput | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutAuditLogsNestedInput
  }

  export type AuditLogUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    entityType?: StringFieldUpdateOperationsInput | string
    entityId?: StringFieldUpdateOperationsInput | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogCreateManyInput = {
    id?: string
    userId: string
    action: string
    entityType: string
    entityId: string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    ipAddress?: string | null
    createdAt?: Date | string
  }

  export type AuditLogUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    entityType?: StringFieldUpdateOperationsInput | string
    entityId?: StringFieldUpdateOperationsInput | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    entityType?: StringFieldUpdateOperationsInput | string
    entityId?: StringFieldUpdateOperationsInput | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
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

  export type EnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
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

  export type UserNullableScalarRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type UserListRelationFilter = {
    every?: UserWhereInput
    some?: UserWhereInput
    none?: UserWhereInput
  }

  export type AgentNullableScalarRelationFilter = {
    is?: AgentWhereInput | null
    isNot?: AgentWhereInput | null
  }

  export type AgentListRelationFilter = {
    every?: AgentWhereInput
    some?: AgentWhereInput
    none?: AgentWhereInput
  }

  export type DriverNullableScalarRelationFilter = {
    is?: DriverWhereInput | null
    isNot?: DriverWhereInput | null
  }

  export type DriverListRelationFilter = {
    every?: DriverWhereInput
    some?: DriverWhereInput
    none?: DriverWhereInput
  }

  export type WalletNullableScalarRelationFilter = {
    is?: WalletWhereInput | null
    isNot?: WalletWhereInput | null
  }

  export type TicketListRelationFilter = {
    every?: TicketWhereInput
    some?: TicketWhereInput
    none?: TicketWhereInput
  }

  export type LotadorPartnerListRelationFilter = {
    every?: LotadorPartnerWhereInput
    some?: LotadorPartnerWhereInput
    none?: LotadorPartnerWhereInput
  }

  export type AuditLogListRelationFilter = {
    every?: AuditLogWhereInput
    some?: AuditLogWhereInput
    none?: AuditLogWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type UserOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AgentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type DriverOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TicketOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type LotadorPartnerOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AuditLogOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    phone?: SortOrder
    displayId?: SortOrder
    name?: SortOrder
    pinHash?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    isActive?: SortOrder
    isBlocked?: SortOrder
    blockReason?: SortOrder
    createdById?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    phone?: SortOrder
    displayId?: SortOrder
    name?: SortOrder
    pinHash?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    isActive?: SortOrder
    isBlocked?: SortOrder
    blockReason?: SortOrder
    createdById?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    phone?: SortOrder
    displayId?: SortOrder
    name?: SortOrder
    pinHash?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    isActive?: SortOrder
    isBlocked?: SortOrder
    blockReason?: SortOrder
    createdById?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
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

  export type EnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
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

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type AgentCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    adminId?: SortOrder
    isActive?: SortOrder
    dailyTicketLimit?: SortOrder
    permissions?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AgentAvgOrderByAggregateInput = {
    dailyTicketLimit?: SortOrder
  }

  export type AgentMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    adminId?: SortOrder
    isActive?: SortOrder
    dailyTicketLimit?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AgentMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    adminId?: SortOrder
    isActive?: SortOrder
    dailyTicketLimit?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AgentSumOrderByAggregateInput = {
    dailyTicketLimit?: SortOrder
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

  export type EnumDriverStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.DriverStatus | EnumDriverStatusFieldRefInput<$PrismaModel>
    in?: $Enums.DriverStatus[] | ListEnumDriverStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.DriverStatus[] | ListEnumDriverStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumDriverStatusFilter<$PrismaModel> | $Enums.DriverStatus
  }

  export type IntNullableListFilter<$PrismaModel = never> = {
    equals?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    has?: number | IntFieldRefInput<$PrismaModel> | null
    hasEvery?: number[] | ListIntFieldRefInput<$PrismaModel>
    hasSome?: number[] | ListIntFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type DecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type LocationEventListRelationFilter = {
    every?: LocationEventWhereInput
    some?: LocationEventWhereInput
    none?: LocationEventWhereInput
  }

  export type LocationEventOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type DriverCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    clientId?: SortOrder
    licensePlate?: SortOrder
    status?: SortOrder
    workDays?: SortOrder
    currentBalance?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DriverAvgOrderByAggregateInput = {
    workDays?: SortOrder
    currentBalance?: SortOrder
  }

  export type DriverMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    clientId?: SortOrder
    licensePlate?: SortOrder
    status?: SortOrder
    currentBalance?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DriverMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    clientId?: SortOrder
    licensePlate?: SortOrder
    status?: SortOrder
    currentBalance?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DriverSumOrderByAggregateInput = {
    workDays?: SortOrder
    currentBalance?: SortOrder
  }

  export type EnumDriverStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.DriverStatus | EnumDriverStatusFieldRefInput<$PrismaModel>
    in?: $Enums.DriverStatus[] | ListEnumDriverStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.DriverStatus[] | ListEnumDriverStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumDriverStatusWithAggregatesFilter<$PrismaModel> | $Enums.DriverStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumDriverStatusFilter<$PrismaModel>
    _max?: NestedEnumDriverStatusFilter<$PrismaModel>
  }

  export type DecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type TransactionListRelationFilter = {
    every?: TransactionWhereInput
    some?: TransactionWhereInput
    none?: TransactionWhereInput
  }

  export type TransactionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type WalletCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    balance?: SortOrder
    currency?: SortOrder
    updatedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type WalletAvgOrderByAggregateInput = {
    balance?: SortOrder
  }

  export type WalletMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    balance?: SortOrder
    currency?: SortOrder
    updatedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type WalletMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    balance?: SortOrder
    currency?: SortOrder
    updatedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type WalletSumOrderByAggregateInput = {
    balance?: SortOrder
  }

  export type EnumTicketStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.TicketStatus | EnumTicketStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TicketStatus[] | ListEnumTicketStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.TicketStatus[] | ListEnumTicketStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumTicketStatusFilter<$PrismaModel> | $Enums.TicketStatus
  }

  export type DriverScalarRelationFilter = {
    is?: DriverWhereInput
    isNot?: DriverWhereInput
  }

  export type TransactionNullableScalarRelationFilter = {
    is?: TransactionWhereInput | null
    isNot?: TransactionWhereInput | null
  }

  export type TicketCountOrderByAggregateInput = {
    id?: SortOrder
    passengerId?: SortOrder
    driverId?: SortOrder
    issuedById?: SortOrder
    amount?: SortOrder
    status?: SortOrder
    qrNonce?: SortOrder
    shortCode?: SortOrder
    transferredToId?: SortOrder
    transferredAt?: SortOrder
    cancelReason?: SortOrder
    cancelledById?: SortOrder
    usedAt?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TicketAvgOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type TicketMaxOrderByAggregateInput = {
    id?: SortOrder
    passengerId?: SortOrder
    driverId?: SortOrder
    issuedById?: SortOrder
    amount?: SortOrder
    status?: SortOrder
    qrNonce?: SortOrder
    shortCode?: SortOrder
    transferredToId?: SortOrder
    transferredAt?: SortOrder
    cancelReason?: SortOrder
    cancelledById?: SortOrder
    usedAt?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TicketMinOrderByAggregateInput = {
    id?: SortOrder
    passengerId?: SortOrder
    driverId?: SortOrder
    issuedById?: SortOrder
    amount?: SortOrder
    status?: SortOrder
    qrNonce?: SortOrder
    shortCode?: SortOrder
    transferredToId?: SortOrder
    transferredAt?: SortOrder
    cancelReason?: SortOrder
    cancelledById?: SortOrder
    usedAt?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TicketSumOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type EnumTicketStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TicketStatus | EnumTicketStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TicketStatus[] | ListEnumTicketStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.TicketStatus[] | ListEnumTicketStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumTicketStatusWithAggregatesFilter<$PrismaModel> | $Enums.TicketStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTicketStatusFilter<$PrismaModel>
    _max?: NestedEnumTicketStatusFilter<$PrismaModel>
  }

  export type EnumTransactionTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.TransactionType | EnumTransactionTypeFieldRefInput<$PrismaModel>
    in?: $Enums.TransactionType[] | ListEnumTransactionTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.TransactionType[] | ListEnumTransactionTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumTransactionTypeFilter<$PrismaModel> | $Enums.TransactionType
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

  export type WalletScalarRelationFilter = {
    is?: WalletWhereInput
    isNot?: WalletWhereInput
  }

  export type TicketNullableScalarRelationFilter = {
    is?: TicketWhereInput | null
    isNot?: TicketWhereInput | null
  }

  export type TransactionCountOrderByAggregateInput = {
    id?: SortOrder
    walletId?: SortOrder
    ticketId?: SortOrder
    type?: SortOrder
    amount?: SortOrder
    balanceBefore?: SortOrder
    balanceAfter?: SortOrder
    reference?: SortOrder
    metadata?: SortOrder
    createdAt?: SortOrder
  }

  export type TransactionAvgOrderByAggregateInput = {
    amount?: SortOrder
    balanceBefore?: SortOrder
    balanceAfter?: SortOrder
  }

  export type TransactionMaxOrderByAggregateInput = {
    id?: SortOrder
    walletId?: SortOrder
    ticketId?: SortOrder
    type?: SortOrder
    amount?: SortOrder
    balanceBefore?: SortOrder
    balanceAfter?: SortOrder
    reference?: SortOrder
    createdAt?: SortOrder
  }

  export type TransactionMinOrderByAggregateInput = {
    id?: SortOrder
    walletId?: SortOrder
    ticketId?: SortOrder
    type?: SortOrder
    amount?: SortOrder
    balanceBefore?: SortOrder
    balanceAfter?: SortOrder
    reference?: SortOrder
    createdAt?: SortOrder
  }

  export type TransactionSumOrderByAggregateInput = {
    amount?: SortOrder
    balanceBefore?: SortOrder
    balanceAfter?: SortOrder
  }

  export type EnumTransactionTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TransactionType | EnumTransactionTypeFieldRefInput<$PrismaModel>
    in?: $Enums.TransactionType[] | ListEnumTransactionTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.TransactionType[] | ListEnumTransactionTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumTransactionTypeWithAggregatesFilter<$PrismaModel> | $Enums.TransactionType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTransactionTypeFilter<$PrismaModel>
    _max?: NestedEnumTransactionTypeFilter<$PrismaModel>
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

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type LocationEventCountOrderByAggregateInput = {
    id?: SortOrder
    driverId?: SortOrder
    lat?: SortOrder
    lng?: SortOrder
    speed?: SortOrder
    heading?: SortOrder
    recordedAt?: SortOrder
  }

  export type LocationEventAvgOrderByAggregateInput = {
    lat?: SortOrder
    lng?: SortOrder
    speed?: SortOrder
    heading?: SortOrder
  }

  export type LocationEventMaxOrderByAggregateInput = {
    id?: SortOrder
    driverId?: SortOrder
    lat?: SortOrder
    lng?: SortOrder
    speed?: SortOrder
    heading?: SortOrder
    recordedAt?: SortOrder
  }

  export type LocationEventMinOrderByAggregateInput = {
    id?: SortOrder
    driverId?: SortOrder
    lat?: SortOrder
    lng?: SortOrder
    speed?: SortOrder
    heading?: SortOrder
    recordedAt?: SortOrder
  }

  export type LocationEventSumOrderByAggregateInput = {
    lat?: SortOrder
    lng?: SortOrder
    speed?: SortOrder
    heading?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type LotadorPartnerDriverIdLotadorUserIdCompoundUniqueInput = {
    driverId: string
    lotadorUserId: string
  }

  export type LotadorPartnerCountOrderByAggregateInput = {
    id?: SortOrder
    driverId?: SortOrder
    lotadorUserId?: SortOrder
    referenceCode?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
  }

  export type LotadorPartnerMaxOrderByAggregateInput = {
    id?: SortOrder
    driverId?: SortOrder
    lotadorUserId?: SortOrder
    referenceCode?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
  }

  export type LotadorPartnerMinOrderByAggregateInput = {
    id?: SortOrder
    driverId?: SortOrder
    lotadorUserId?: SortOrder
    referenceCode?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
  }

  export type AuditLogCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    action?: SortOrder
    entityType?: SortOrder
    entityId?: SortOrder
    metadata?: SortOrder
    ipAddress?: SortOrder
    createdAt?: SortOrder
  }

  export type AuditLogMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    action?: SortOrder
    entityType?: SortOrder
    entityId?: SortOrder
    ipAddress?: SortOrder
    createdAt?: SortOrder
  }

  export type AuditLogMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    action?: SortOrder
    entityType?: SortOrder
    entityId?: SortOrder
    ipAddress?: SortOrder
    createdAt?: SortOrder
  }

  export type UserCreateNestedOneWithoutCreatedUsersInput = {
    create?: XOR<UserCreateWithoutCreatedUsersInput, UserUncheckedCreateWithoutCreatedUsersInput>
    connectOrCreate?: UserCreateOrConnectWithoutCreatedUsersInput
    connect?: UserWhereUniqueInput
  }

  export type UserCreateNestedManyWithoutCreatedByInput = {
    create?: XOR<UserCreateWithoutCreatedByInput, UserUncheckedCreateWithoutCreatedByInput> | UserCreateWithoutCreatedByInput[] | UserUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: UserCreateOrConnectWithoutCreatedByInput | UserCreateOrConnectWithoutCreatedByInput[]
    createMany?: UserCreateManyCreatedByInputEnvelope
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type AgentCreateNestedOneWithoutUserInput = {
    create?: XOR<AgentCreateWithoutUserInput, AgentUncheckedCreateWithoutUserInput>
    connectOrCreate?: AgentCreateOrConnectWithoutUserInput
    connect?: AgentWhereUniqueInput
  }

  export type AgentCreateNestedManyWithoutAdminInput = {
    create?: XOR<AgentCreateWithoutAdminInput, AgentUncheckedCreateWithoutAdminInput> | AgentCreateWithoutAdminInput[] | AgentUncheckedCreateWithoutAdminInput[]
    connectOrCreate?: AgentCreateOrConnectWithoutAdminInput | AgentCreateOrConnectWithoutAdminInput[]
    createMany?: AgentCreateManyAdminInputEnvelope
    connect?: AgentWhereUniqueInput | AgentWhereUniqueInput[]
  }

  export type DriverCreateNestedOneWithoutUserInput = {
    create?: XOR<DriverCreateWithoutUserInput, DriverUncheckedCreateWithoutUserInput>
    connectOrCreate?: DriverCreateOrConnectWithoutUserInput
    connect?: DriverWhereUniqueInput
  }

  export type DriverCreateNestedManyWithoutClientInput = {
    create?: XOR<DriverCreateWithoutClientInput, DriverUncheckedCreateWithoutClientInput> | DriverCreateWithoutClientInput[] | DriverUncheckedCreateWithoutClientInput[]
    connectOrCreate?: DriverCreateOrConnectWithoutClientInput | DriverCreateOrConnectWithoutClientInput[]
    createMany?: DriverCreateManyClientInputEnvelope
    connect?: DriverWhereUniqueInput | DriverWhereUniqueInput[]
  }

  export type WalletCreateNestedOneWithoutUserInput = {
    create?: XOR<WalletCreateWithoutUserInput, WalletUncheckedCreateWithoutUserInput>
    connectOrCreate?: WalletCreateOrConnectWithoutUserInput
    connect?: WalletWhereUniqueInput
  }

  export type TicketCreateNestedManyWithoutPassengerInput = {
    create?: XOR<TicketCreateWithoutPassengerInput, TicketUncheckedCreateWithoutPassengerInput> | TicketCreateWithoutPassengerInput[] | TicketUncheckedCreateWithoutPassengerInput[]
    connectOrCreate?: TicketCreateOrConnectWithoutPassengerInput | TicketCreateOrConnectWithoutPassengerInput[]
    createMany?: TicketCreateManyPassengerInputEnvelope
    connect?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
  }

  export type TicketCreateNestedManyWithoutIssuedByInput = {
    create?: XOR<TicketCreateWithoutIssuedByInput, TicketUncheckedCreateWithoutIssuedByInput> | TicketCreateWithoutIssuedByInput[] | TicketUncheckedCreateWithoutIssuedByInput[]
    connectOrCreate?: TicketCreateOrConnectWithoutIssuedByInput | TicketCreateOrConnectWithoutIssuedByInput[]
    createMany?: TicketCreateManyIssuedByInputEnvelope
    connect?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
  }

  export type TicketCreateNestedManyWithoutTransferredToInput = {
    create?: XOR<TicketCreateWithoutTransferredToInput, TicketUncheckedCreateWithoutTransferredToInput> | TicketCreateWithoutTransferredToInput[] | TicketUncheckedCreateWithoutTransferredToInput[]
    connectOrCreate?: TicketCreateOrConnectWithoutTransferredToInput | TicketCreateOrConnectWithoutTransferredToInput[]
    createMany?: TicketCreateManyTransferredToInputEnvelope
    connect?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
  }

  export type LotadorPartnerCreateNestedManyWithoutLotadorInput = {
    create?: XOR<LotadorPartnerCreateWithoutLotadorInput, LotadorPartnerUncheckedCreateWithoutLotadorInput> | LotadorPartnerCreateWithoutLotadorInput[] | LotadorPartnerUncheckedCreateWithoutLotadorInput[]
    connectOrCreate?: LotadorPartnerCreateOrConnectWithoutLotadorInput | LotadorPartnerCreateOrConnectWithoutLotadorInput[]
    createMany?: LotadorPartnerCreateManyLotadorInputEnvelope
    connect?: LotadorPartnerWhereUniqueInput | LotadorPartnerWhereUniqueInput[]
  }

  export type AuditLogCreateNestedManyWithoutUserInput = {
    create?: XOR<AuditLogCreateWithoutUserInput, AuditLogUncheckedCreateWithoutUserInput> | AuditLogCreateWithoutUserInput[] | AuditLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutUserInput | AuditLogCreateOrConnectWithoutUserInput[]
    createMany?: AuditLogCreateManyUserInputEnvelope
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
  }

  export type UserUncheckedCreateNestedManyWithoutCreatedByInput = {
    create?: XOR<UserCreateWithoutCreatedByInput, UserUncheckedCreateWithoutCreatedByInput> | UserCreateWithoutCreatedByInput[] | UserUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: UserCreateOrConnectWithoutCreatedByInput | UserCreateOrConnectWithoutCreatedByInput[]
    createMany?: UserCreateManyCreatedByInputEnvelope
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type AgentUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<AgentCreateWithoutUserInput, AgentUncheckedCreateWithoutUserInput>
    connectOrCreate?: AgentCreateOrConnectWithoutUserInput
    connect?: AgentWhereUniqueInput
  }

  export type AgentUncheckedCreateNestedManyWithoutAdminInput = {
    create?: XOR<AgentCreateWithoutAdminInput, AgentUncheckedCreateWithoutAdminInput> | AgentCreateWithoutAdminInput[] | AgentUncheckedCreateWithoutAdminInput[]
    connectOrCreate?: AgentCreateOrConnectWithoutAdminInput | AgentCreateOrConnectWithoutAdminInput[]
    createMany?: AgentCreateManyAdminInputEnvelope
    connect?: AgentWhereUniqueInput | AgentWhereUniqueInput[]
  }

  export type DriverUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<DriverCreateWithoutUserInput, DriverUncheckedCreateWithoutUserInput>
    connectOrCreate?: DriverCreateOrConnectWithoutUserInput
    connect?: DriverWhereUniqueInput
  }

  export type DriverUncheckedCreateNestedManyWithoutClientInput = {
    create?: XOR<DriverCreateWithoutClientInput, DriverUncheckedCreateWithoutClientInput> | DriverCreateWithoutClientInput[] | DriverUncheckedCreateWithoutClientInput[]
    connectOrCreate?: DriverCreateOrConnectWithoutClientInput | DriverCreateOrConnectWithoutClientInput[]
    createMany?: DriverCreateManyClientInputEnvelope
    connect?: DriverWhereUniqueInput | DriverWhereUniqueInput[]
  }

  export type WalletUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<WalletCreateWithoutUserInput, WalletUncheckedCreateWithoutUserInput>
    connectOrCreate?: WalletCreateOrConnectWithoutUserInput
    connect?: WalletWhereUniqueInput
  }

  export type TicketUncheckedCreateNestedManyWithoutPassengerInput = {
    create?: XOR<TicketCreateWithoutPassengerInput, TicketUncheckedCreateWithoutPassengerInput> | TicketCreateWithoutPassengerInput[] | TicketUncheckedCreateWithoutPassengerInput[]
    connectOrCreate?: TicketCreateOrConnectWithoutPassengerInput | TicketCreateOrConnectWithoutPassengerInput[]
    createMany?: TicketCreateManyPassengerInputEnvelope
    connect?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
  }

  export type TicketUncheckedCreateNestedManyWithoutIssuedByInput = {
    create?: XOR<TicketCreateWithoutIssuedByInput, TicketUncheckedCreateWithoutIssuedByInput> | TicketCreateWithoutIssuedByInput[] | TicketUncheckedCreateWithoutIssuedByInput[]
    connectOrCreate?: TicketCreateOrConnectWithoutIssuedByInput | TicketCreateOrConnectWithoutIssuedByInput[]
    createMany?: TicketCreateManyIssuedByInputEnvelope
    connect?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
  }

  export type TicketUncheckedCreateNestedManyWithoutTransferredToInput = {
    create?: XOR<TicketCreateWithoutTransferredToInput, TicketUncheckedCreateWithoutTransferredToInput> | TicketCreateWithoutTransferredToInput[] | TicketUncheckedCreateWithoutTransferredToInput[]
    connectOrCreate?: TicketCreateOrConnectWithoutTransferredToInput | TicketCreateOrConnectWithoutTransferredToInput[]
    createMany?: TicketCreateManyTransferredToInputEnvelope
    connect?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
  }

  export type LotadorPartnerUncheckedCreateNestedManyWithoutLotadorInput = {
    create?: XOR<LotadorPartnerCreateWithoutLotadorInput, LotadorPartnerUncheckedCreateWithoutLotadorInput> | LotadorPartnerCreateWithoutLotadorInput[] | LotadorPartnerUncheckedCreateWithoutLotadorInput[]
    connectOrCreate?: LotadorPartnerCreateOrConnectWithoutLotadorInput | LotadorPartnerCreateOrConnectWithoutLotadorInput[]
    createMany?: LotadorPartnerCreateManyLotadorInputEnvelope
    connect?: LotadorPartnerWhereUniqueInput | LotadorPartnerWhereUniqueInput[]
  }

  export type AuditLogUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<AuditLogCreateWithoutUserInput, AuditLogUncheckedCreateWithoutUserInput> | AuditLogCreateWithoutUserInput[] | AuditLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutUserInput | AuditLogCreateOrConnectWithoutUserInput[]
    createMany?: AuditLogCreateManyUserInputEnvelope
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type EnumRoleFieldUpdateOperationsInput = {
    set?: $Enums.Role
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type UserUpdateOneWithoutCreatedUsersNestedInput = {
    create?: XOR<UserCreateWithoutCreatedUsersInput, UserUncheckedCreateWithoutCreatedUsersInput>
    connectOrCreate?: UserCreateOrConnectWithoutCreatedUsersInput
    upsert?: UserUpsertWithoutCreatedUsersInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutCreatedUsersInput, UserUpdateWithoutCreatedUsersInput>, UserUncheckedUpdateWithoutCreatedUsersInput>
  }

  export type UserUpdateManyWithoutCreatedByNestedInput = {
    create?: XOR<UserCreateWithoutCreatedByInput, UserUncheckedCreateWithoutCreatedByInput> | UserCreateWithoutCreatedByInput[] | UserUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: UserCreateOrConnectWithoutCreatedByInput | UserCreateOrConnectWithoutCreatedByInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutCreatedByInput | UserUpsertWithWhereUniqueWithoutCreatedByInput[]
    createMany?: UserCreateManyCreatedByInputEnvelope
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutCreatedByInput | UserUpdateWithWhereUniqueWithoutCreatedByInput[]
    updateMany?: UserUpdateManyWithWhereWithoutCreatedByInput | UserUpdateManyWithWhereWithoutCreatedByInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type AgentUpdateOneWithoutUserNestedInput = {
    create?: XOR<AgentCreateWithoutUserInput, AgentUncheckedCreateWithoutUserInput>
    connectOrCreate?: AgentCreateOrConnectWithoutUserInput
    upsert?: AgentUpsertWithoutUserInput
    disconnect?: AgentWhereInput | boolean
    delete?: AgentWhereInput | boolean
    connect?: AgentWhereUniqueInput
    update?: XOR<XOR<AgentUpdateToOneWithWhereWithoutUserInput, AgentUpdateWithoutUserInput>, AgentUncheckedUpdateWithoutUserInput>
  }

  export type AgentUpdateManyWithoutAdminNestedInput = {
    create?: XOR<AgentCreateWithoutAdminInput, AgentUncheckedCreateWithoutAdminInput> | AgentCreateWithoutAdminInput[] | AgentUncheckedCreateWithoutAdminInput[]
    connectOrCreate?: AgentCreateOrConnectWithoutAdminInput | AgentCreateOrConnectWithoutAdminInput[]
    upsert?: AgentUpsertWithWhereUniqueWithoutAdminInput | AgentUpsertWithWhereUniqueWithoutAdminInput[]
    createMany?: AgentCreateManyAdminInputEnvelope
    set?: AgentWhereUniqueInput | AgentWhereUniqueInput[]
    disconnect?: AgentWhereUniqueInput | AgentWhereUniqueInput[]
    delete?: AgentWhereUniqueInput | AgentWhereUniqueInput[]
    connect?: AgentWhereUniqueInput | AgentWhereUniqueInput[]
    update?: AgentUpdateWithWhereUniqueWithoutAdminInput | AgentUpdateWithWhereUniqueWithoutAdminInput[]
    updateMany?: AgentUpdateManyWithWhereWithoutAdminInput | AgentUpdateManyWithWhereWithoutAdminInput[]
    deleteMany?: AgentScalarWhereInput | AgentScalarWhereInput[]
  }

  export type DriverUpdateOneWithoutUserNestedInput = {
    create?: XOR<DriverCreateWithoutUserInput, DriverUncheckedCreateWithoutUserInput>
    connectOrCreate?: DriverCreateOrConnectWithoutUserInput
    upsert?: DriverUpsertWithoutUserInput
    disconnect?: DriverWhereInput | boolean
    delete?: DriverWhereInput | boolean
    connect?: DriverWhereUniqueInput
    update?: XOR<XOR<DriverUpdateToOneWithWhereWithoutUserInput, DriverUpdateWithoutUserInput>, DriverUncheckedUpdateWithoutUserInput>
  }

  export type DriverUpdateManyWithoutClientNestedInput = {
    create?: XOR<DriverCreateWithoutClientInput, DriverUncheckedCreateWithoutClientInput> | DriverCreateWithoutClientInput[] | DriverUncheckedCreateWithoutClientInput[]
    connectOrCreate?: DriverCreateOrConnectWithoutClientInput | DriverCreateOrConnectWithoutClientInput[]
    upsert?: DriverUpsertWithWhereUniqueWithoutClientInput | DriverUpsertWithWhereUniqueWithoutClientInput[]
    createMany?: DriverCreateManyClientInputEnvelope
    set?: DriverWhereUniqueInput | DriverWhereUniqueInput[]
    disconnect?: DriverWhereUniqueInput | DriverWhereUniqueInput[]
    delete?: DriverWhereUniqueInput | DriverWhereUniqueInput[]
    connect?: DriverWhereUniqueInput | DriverWhereUniqueInput[]
    update?: DriverUpdateWithWhereUniqueWithoutClientInput | DriverUpdateWithWhereUniqueWithoutClientInput[]
    updateMany?: DriverUpdateManyWithWhereWithoutClientInput | DriverUpdateManyWithWhereWithoutClientInput[]
    deleteMany?: DriverScalarWhereInput | DriverScalarWhereInput[]
  }

  export type WalletUpdateOneWithoutUserNestedInput = {
    create?: XOR<WalletCreateWithoutUserInput, WalletUncheckedCreateWithoutUserInput>
    connectOrCreate?: WalletCreateOrConnectWithoutUserInput
    upsert?: WalletUpsertWithoutUserInput
    disconnect?: WalletWhereInput | boolean
    delete?: WalletWhereInput | boolean
    connect?: WalletWhereUniqueInput
    update?: XOR<XOR<WalletUpdateToOneWithWhereWithoutUserInput, WalletUpdateWithoutUserInput>, WalletUncheckedUpdateWithoutUserInput>
  }

  export type TicketUpdateManyWithoutPassengerNestedInput = {
    create?: XOR<TicketCreateWithoutPassengerInput, TicketUncheckedCreateWithoutPassengerInput> | TicketCreateWithoutPassengerInput[] | TicketUncheckedCreateWithoutPassengerInput[]
    connectOrCreate?: TicketCreateOrConnectWithoutPassengerInput | TicketCreateOrConnectWithoutPassengerInput[]
    upsert?: TicketUpsertWithWhereUniqueWithoutPassengerInput | TicketUpsertWithWhereUniqueWithoutPassengerInput[]
    createMany?: TicketCreateManyPassengerInputEnvelope
    set?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
    disconnect?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
    delete?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
    connect?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
    update?: TicketUpdateWithWhereUniqueWithoutPassengerInput | TicketUpdateWithWhereUniqueWithoutPassengerInput[]
    updateMany?: TicketUpdateManyWithWhereWithoutPassengerInput | TicketUpdateManyWithWhereWithoutPassengerInput[]
    deleteMany?: TicketScalarWhereInput | TicketScalarWhereInput[]
  }

  export type TicketUpdateManyWithoutIssuedByNestedInput = {
    create?: XOR<TicketCreateWithoutIssuedByInput, TicketUncheckedCreateWithoutIssuedByInput> | TicketCreateWithoutIssuedByInput[] | TicketUncheckedCreateWithoutIssuedByInput[]
    connectOrCreate?: TicketCreateOrConnectWithoutIssuedByInput | TicketCreateOrConnectWithoutIssuedByInput[]
    upsert?: TicketUpsertWithWhereUniqueWithoutIssuedByInput | TicketUpsertWithWhereUniqueWithoutIssuedByInput[]
    createMany?: TicketCreateManyIssuedByInputEnvelope
    set?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
    disconnect?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
    delete?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
    connect?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
    update?: TicketUpdateWithWhereUniqueWithoutIssuedByInput | TicketUpdateWithWhereUniqueWithoutIssuedByInput[]
    updateMany?: TicketUpdateManyWithWhereWithoutIssuedByInput | TicketUpdateManyWithWhereWithoutIssuedByInput[]
    deleteMany?: TicketScalarWhereInput | TicketScalarWhereInput[]
  }

  export type TicketUpdateManyWithoutTransferredToNestedInput = {
    create?: XOR<TicketCreateWithoutTransferredToInput, TicketUncheckedCreateWithoutTransferredToInput> | TicketCreateWithoutTransferredToInput[] | TicketUncheckedCreateWithoutTransferredToInput[]
    connectOrCreate?: TicketCreateOrConnectWithoutTransferredToInput | TicketCreateOrConnectWithoutTransferredToInput[]
    upsert?: TicketUpsertWithWhereUniqueWithoutTransferredToInput | TicketUpsertWithWhereUniqueWithoutTransferredToInput[]
    createMany?: TicketCreateManyTransferredToInputEnvelope
    set?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
    disconnect?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
    delete?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
    connect?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
    update?: TicketUpdateWithWhereUniqueWithoutTransferredToInput | TicketUpdateWithWhereUniqueWithoutTransferredToInput[]
    updateMany?: TicketUpdateManyWithWhereWithoutTransferredToInput | TicketUpdateManyWithWhereWithoutTransferredToInput[]
    deleteMany?: TicketScalarWhereInput | TicketScalarWhereInput[]
  }

  export type LotadorPartnerUpdateManyWithoutLotadorNestedInput = {
    create?: XOR<LotadorPartnerCreateWithoutLotadorInput, LotadorPartnerUncheckedCreateWithoutLotadorInput> | LotadorPartnerCreateWithoutLotadorInput[] | LotadorPartnerUncheckedCreateWithoutLotadorInput[]
    connectOrCreate?: LotadorPartnerCreateOrConnectWithoutLotadorInput | LotadorPartnerCreateOrConnectWithoutLotadorInput[]
    upsert?: LotadorPartnerUpsertWithWhereUniqueWithoutLotadorInput | LotadorPartnerUpsertWithWhereUniqueWithoutLotadorInput[]
    createMany?: LotadorPartnerCreateManyLotadorInputEnvelope
    set?: LotadorPartnerWhereUniqueInput | LotadorPartnerWhereUniqueInput[]
    disconnect?: LotadorPartnerWhereUniqueInput | LotadorPartnerWhereUniqueInput[]
    delete?: LotadorPartnerWhereUniqueInput | LotadorPartnerWhereUniqueInput[]
    connect?: LotadorPartnerWhereUniqueInput | LotadorPartnerWhereUniqueInput[]
    update?: LotadorPartnerUpdateWithWhereUniqueWithoutLotadorInput | LotadorPartnerUpdateWithWhereUniqueWithoutLotadorInput[]
    updateMany?: LotadorPartnerUpdateManyWithWhereWithoutLotadorInput | LotadorPartnerUpdateManyWithWhereWithoutLotadorInput[]
    deleteMany?: LotadorPartnerScalarWhereInput | LotadorPartnerScalarWhereInput[]
  }

  export type AuditLogUpdateManyWithoutUserNestedInput = {
    create?: XOR<AuditLogCreateWithoutUserInput, AuditLogUncheckedCreateWithoutUserInput> | AuditLogCreateWithoutUserInput[] | AuditLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutUserInput | AuditLogCreateOrConnectWithoutUserInput[]
    upsert?: AuditLogUpsertWithWhereUniqueWithoutUserInput | AuditLogUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AuditLogCreateManyUserInputEnvelope
    set?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    disconnect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    delete?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    update?: AuditLogUpdateWithWhereUniqueWithoutUserInput | AuditLogUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AuditLogUpdateManyWithWhereWithoutUserInput | AuditLogUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
  }

  export type UserUncheckedUpdateManyWithoutCreatedByNestedInput = {
    create?: XOR<UserCreateWithoutCreatedByInput, UserUncheckedCreateWithoutCreatedByInput> | UserCreateWithoutCreatedByInput[] | UserUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: UserCreateOrConnectWithoutCreatedByInput | UserCreateOrConnectWithoutCreatedByInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutCreatedByInput | UserUpsertWithWhereUniqueWithoutCreatedByInput[]
    createMany?: UserCreateManyCreatedByInputEnvelope
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutCreatedByInput | UserUpdateWithWhereUniqueWithoutCreatedByInput[]
    updateMany?: UserUpdateManyWithWhereWithoutCreatedByInput | UserUpdateManyWithWhereWithoutCreatedByInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type AgentUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<AgentCreateWithoutUserInput, AgentUncheckedCreateWithoutUserInput>
    connectOrCreate?: AgentCreateOrConnectWithoutUserInput
    upsert?: AgentUpsertWithoutUserInput
    disconnect?: AgentWhereInput | boolean
    delete?: AgentWhereInput | boolean
    connect?: AgentWhereUniqueInput
    update?: XOR<XOR<AgentUpdateToOneWithWhereWithoutUserInput, AgentUpdateWithoutUserInput>, AgentUncheckedUpdateWithoutUserInput>
  }

  export type AgentUncheckedUpdateManyWithoutAdminNestedInput = {
    create?: XOR<AgentCreateWithoutAdminInput, AgentUncheckedCreateWithoutAdminInput> | AgentCreateWithoutAdminInput[] | AgentUncheckedCreateWithoutAdminInput[]
    connectOrCreate?: AgentCreateOrConnectWithoutAdminInput | AgentCreateOrConnectWithoutAdminInput[]
    upsert?: AgentUpsertWithWhereUniqueWithoutAdminInput | AgentUpsertWithWhereUniqueWithoutAdminInput[]
    createMany?: AgentCreateManyAdminInputEnvelope
    set?: AgentWhereUniqueInput | AgentWhereUniqueInput[]
    disconnect?: AgentWhereUniqueInput | AgentWhereUniqueInput[]
    delete?: AgentWhereUniqueInput | AgentWhereUniqueInput[]
    connect?: AgentWhereUniqueInput | AgentWhereUniqueInput[]
    update?: AgentUpdateWithWhereUniqueWithoutAdminInput | AgentUpdateWithWhereUniqueWithoutAdminInput[]
    updateMany?: AgentUpdateManyWithWhereWithoutAdminInput | AgentUpdateManyWithWhereWithoutAdminInput[]
    deleteMany?: AgentScalarWhereInput | AgentScalarWhereInput[]
  }

  export type DriverUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<DriverCreateWithoutUserInput, DriverUncheckedCreateWithoutUserInput>
    connectOrCreate?: DriverCreateOrConnectWithoutUserInput
    upsert?: DriverUpsertWithoutUserInput
    disconnect?: DriverWhereInput | boolean
    delete?: DriverWhereInput | boolean
    connect?: DriverWhereUniqueInput
    update?: XOR<XOR<DriverUpdateToOneWithWhereWithoutUserInput, DriverUpdateWithoutUserInput>, DriverUncheckedUpdateWithoutUserInput>
  }

  export type DriverUncheckedUpdateManyWithoutClientNestedInput = {
    create?: XOR<DriverCreateWithoutClientInput, DriverUncheckedCreateWithoutClientInput> | DriverCreateWithoutClientInput[] | DriverUncheckedCreateWithoutClientInput[]
    connectOrCreate?: DriverCreateOrConnectWithoutClientInput | DriverCreateOrConnectWithoutClientInput[]
    upsert?: DriverUpsertWithWhereUniqueWithoutClientInput | DriverUpsertWithWhereUniqueWithoutClientInput[]
    createMany?: DriverCreateManyClientInputEnvelope
    set?: DriverWhereUniqueInput | DriverWhereUniqueInput[]
    disconnect?: DriverWhereUniqueInput | DriverWhereUniqueInput[]
    delete?: DriverWhereUniqueInput | DriverWhereUniqueInput[]
    connect?: DriverWhereUniqueInput | DriverWhereUniqueInput[]
    update?: DriverUpdateWithWhereUniqueWithoutClientInput | DriverUpdateWithWhereUniqueWithoutClientInput[]
    updateMany?: DriverUpdateManyWithWhereWithoutClientInput | DriverUpdateManyWithWhereWithoutClientInput[]
    deleteMany?: DriverScalarWhereInput | DriverScalarWhereInput[]
  }

  export type WalletUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<WalletCreateWithoutUserInput, WalletUncheckedCreateWithoutUserInput>
    connectOrCreate?: WalletCreateOrConnectWithoutUserInput
    upsert?: WalletUpsertWithoutUserInput
    disconnect?: WalletWhereInput | boolean
    delete?: WalletWhereInput | boolean
    connect?: WalletWhereUniqueInput
    update?: XOR<XOR<WalletUpdateToOneWithWhereWithoutUserInput, WalletUpdateWithoutUserInput>, WalletUncheckedUpdateWithoutUserInput>
  }

  export type TicketUncheckedUpdateManyWithoutPassengerNestedInput = {
    create?: XOR<TicketCreateWithoutPassengerInput, TicketUncheckedCreateWithoutPassengerInput> | TicketCreateWithoutPassengerInput[] | TicketUncheckedCreateWithoutPassengerInput[]
    connectOrCreate?: TicketCreateOrConnectWithoutPassengerInput | TicketCreateOrConnectWithoutPassengerInput[]
    upsert?: TicketUpsertWithWhereUniqueWithoutPassengerInput | TicketUpsertWithWhereUniqueWithoutPassengerInput[]
    createMany?: TicketCreateManyPassengerInputEnvelope
    set?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
    disconnect?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
    delete?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
    connect?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
    update?: TicketUpdateWithWhereUniqueWithoutPassengerInput | TicketUpdateWithWhereUniqueWithoutPassengerInput[]
    updateMany?: TicketUpdateManyWithWhereWithoutPassengerInput | TicketUpdateManyWithWhereWithoutPassengerInput[]
    deleteMany?: TicketScalarWhereInput | TicketScalarWhereInput[]
  }

  export type TicketUncheckedUpdateManyWithoutIssuedByNestedInput = {
    create?: XOR<TicketCreateWithoutIssuedByInput, TicketUncheckedCreateWithoutIssuedByInput> | TicketCreateWithoutIssuedByInput[] | TicketUncheckedCreateWithoutIssuedByInput[]
    connectOrCreate?: TicketCreateOrConnectWithoutIssuedByInput | TicketCreateOrConnectWithoutIssuedByInput[]
    upsert?: TicketUpsertWithWhereUniqueWithoutIssuedByInput | TicketUpsertWithWhereUniqueWithoutIssuedByInput[]
    createMany?: TicketCreateManyIssuedByInputEnvelope
    set?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
    disconnect?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
    delete?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
    connect?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
    update?: TicketUpdateWithWhereUniqueWithoutIssuedByInput | TicketUpdateWithWhereUniqueWithoutIssuedByInput[]
    updateMany?: TicketUpdateManyWithWhereWithoutIssuedByInput | TicketUpdateManyWithWhereWithoutIssuedByInput[]
    deleteMany?: TicketScalarWhereInput | TicketScalarWhereInput[]
  }

  export type TicketUncheckedUpdateManyWithoutTransferredToNestedInput = {
    create?: XOR<TicketCreateWithoutTransferredToInput, TicketUncheckedCreateWithoutTransferredToInput> | TicketCreateWithoutTransferredToInput[] | TicketUncheckedCreateWithoutTransferredToInput[]
    connectOrCreate?: TicketCreateOrConnectWithoutTransferredToInput | TicketCreateOrConnectWithoutTransferredToInput[]
    upsert?: TicketUpsertWithWhereUniqueWithoutTransferredToInput | TicketUpsertWithWhereUniqueWithoutTransferredToInput[]
    createMany?: TicketCreateManyTransferredToInputEnvelope
    set?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
    disconnect?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
    delete?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
    connect?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
    update?: TicketUpdateWithWhereUniqueWithoutTransferredToInput | TicketUpdateWithWhereUniqueWithoutTransferredToInput[]
    updateMany?: TicketUpdateManyWithWhereWithoutTransferredToInput | TicketUpdateManyWithWhereWithoutTransferredToInput[]
    deleteMany?: TicketScalarWhereInput | TicketScalarWhereInput[]
  }

  export type LotadorPartnerUncheckedUpdateManyWithoutLotadorNestedInput = {
    create?: XOR<LotadorPartnerCreateWithoutLotadorInput, LotadorPartnerUncheckedCreateWithoutLotadorInput> | LotadorPartnerCreateWithoutLotadorInput[] | LotadorPartnerUncheckedCreateWithoutLotadorInput[]
    connectOrCreate?: LotadorPartnerCreateOrConnectWithoutLotadorInput | LotadorPartnerCreateOrConnectWithoutLotadorInput[]
    upsert?: LotadorPartnerUpsertWithWhereUniqueWithoutLotadorInput | LotadorPartnerUpsertWithWhereUniqueWithoutLotadorInput[]
    createMany?: LotadorPartnerCreateManyLotadorInputEnvelope
    set?: LotadorPartnerWhereUniqueInput | LotadorPartnerWhereUniqueInput[]
    disconnect?: LotadorPartnerWhereUniqueInput | LotadorPartnerWhereUniqueInput[]
    delete?: LotadorPartnerWhereUniqueInput | LotadorPartnerWhereUniqueInput[]
    connect?: LotadorPartnerWhereUniqueInput | LotadorPartnerWhereUniqueInput[]
    update?: LotadorPartnerUpdateWithWhereUniqueWithoutLotadorInput | LotadorPartnerUpdateWithWhereUniqueWithoutLotadorInput[]
    updateMany?: LotadorPartnerUpdateManyWithWhereWithoutLotadorInput | LotadorPartnerUpdateManyWithWhereWithoutLotadorInput[]
    deleteMany?: LotadorPartnerScalarWhereInput | LotadorPartnerScalarWhereInput[]
  }

  export type AuditLogUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<AuditLogCreateWithoutUserInput, AuditLogUncheckedCreateWithoutUserInput> | AuditLogCreateWithoutUserInput[] | AuditLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutUserInput | AuditLogCreateOrConnectWithoutUserInput[]
    upsert?: AuditLogUpsertWithWhereUniqueWithoutUserInput | AuditLogUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AuditLogCreateManyUserInputEnvelope
    set?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    disconnect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    delete?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    update?: AuditLogUpdateWithWhereUniqueWithoutUserInput | AuditLogUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AuditLogUpdateManyWithWhereWithoutUserInput | AuditLogUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
  }

  export type AgentCreatepermissionsInput = {
    set: string[]
  }

  export type UserCreateNestedOneWithoutAgentProfileInput = {
    create?: XOR<UserCreateWithoutAgentProfileInput, UserUncheckedCreateWithoutAgentProfileInput>
    connectOrCreate?: UserCreateOrConnectWithoutAgentProfileInput
    connect?: UserWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutAdminAgentsInput = {
    create?: XOR<UserCreateWithoutAdminAgentsInput, UserUncheckedCreateWithoutAdminAgentsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAdminAgentsInput
    connect?: UserWhereUniqueInput
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type AgentUpdatepermissionsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type UserUpdateOneRequiredWithoutAgentProfileNestedInput = {
    create?: XOR<UserCreateWithoutAgentProfileInput, UserUncheckedCreateWithoutAgentProfileInput>
    connectOrCreate?: UserCreateOrConnectWithoutAgentProfileInput
    upsert?: UserUpsertWithoutAgentProfileInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAgentProfileInput, UserUpdateWithoutAgentProfileInput>, UserUncheckedUpdateWithoutAgentProfileInput>
  }

  export type UserUpdateOneRequiredWithoutAdminAgentsNestedInput = {
    create?: XOR<UserCreateWithoutAdminAgentsInput, UserUncheckedCreateWithoutAdminAgentsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAdminAgentsInput
    upsert?: UserUpsertWithoutAdminAgentsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAdminAgentsInput, UserUpdateWithoutAdminAgentsInput>, UserUncheckedUpdateWithoutAdminAgentsInput>
  }

  export type DriverCreateworkDaysInput = {
    set: number[]
  }

  export type UserCreateNestedOneWithoutDriverProfileInput = {
    create?: XOR<UserCreateWithoutDriverProfileInput, UserUncheckedCreateWithoutDriverProfileInput>
    connectOrCreate?: UserCreateOrConnectWithoutDriverProfileInput
    connect?: UserWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutClientDriversInput = {
    create?: XOR<UserCreateWithoutClientDriversInput, UserUncheckedCreateWithoutClientDriversInput>
    connectOrCreate?: UserCreateOrConnectWithoutClientDriversInput
    connect?: UserWhereUniqueInput
  }

  export type TicketCreateNestedManyWithoutDriverInput = {
    create?: XOR<TicketCreateWithoutDriverInput, TicketUncheckedCreateWithoutDriverInput> | TicketCreateWithoutDriverInput[] | TicketUncheckedCreateWithoutDriverInput[]
    connectOrCreate?: TicketCreateOrConnectWithoutDriverInput | TicketCreateOrConnectWithoutDriverInput[]
    createMany?: TicketCreateManyDriverInputEnvelope
    connect?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
  }

  export type LocationEventCreateNestedManyWithoutDriverInput = {
    create?: XOR<LocationEventCreateWithoutDriverInput, LocationEventUncheckedCreateWithoutDriverInput> | LocationEventCreateWithoutDriverInput[] | LocationEventUncheckedCreateWithoutDriverInput[]
    connectOrCreate?: LocationEventCreateOrConnectWithoutDriverInput | LocationEventCreateOrConnectWithoutDriverInput[]
    createMany?: LocationEventCreateManyDriverInputEnvelope
    connect?: LocationEventWhereUniqueInput | LocationEventWhereUniqueInput[]
  }

  export type LotadorPartnerCreateNestedManyWithoutDriverInput = {
    create?: XOR<LotadorPartnerCreateWithoutDriverInput, LotadorPartnerUncheckedCreateWithoutDriverInput> | LotadorPartnerCreateWithoutDriverInput[] | LotadorPartnerUncheckedCreateWithoutDriverInput[]
    connectOrCreate?: LotadorPartnerCreateOrConnectWithoutDriverInput | LotadorPartnerCreateOrConnectWithoutDriverInput[]
    createMany?: LotadorPartnerCreateManyDriverInputEnvelope
    connect?: LotadorPartnerWhereUniqueInput | LotadorPartnerWhereUniqueInput[]
  }

  export type TicketUncheckedCreateNestedManyWithoutDriverInput = {
    create?: XOR<TicketCreateWithoutDriverInput, TicketUncheckedCreateWithoutDriverInput> | TicketCreateWithoutDriverInput[] | TicketUncheckedCreateWithoutDriverInput[]
    connectOrCreate?: TicketCreateOrConnectWithoutDriverInput | TicketCreateOrConnectWithoutDriverInput[]
    createMany?: TicketCreateManyDriverInputEnvelope
    connect?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
  }

  export type LocationEventUncheckedCreateNestedManyWithoutDriverInput = {
    create?: XOR<LocationEventCreateWithoutDriverInput, LocationEventUncheckedCreateWithoutDriverInput> | LocationEventCreateWithoutDriverInput[] | LocationEventUncheckedCreateWithoutDriverInput[]
    connectOrCreate?: LocationEventCreateOrConnectWithoutDriverInput | LocationEventCreateOrConnectWithoutDriverInput[]
    createMany?: LocationEventCreateManyDriverInputEnvelope
    connect?: LocationEventWhereUniqueInput | LocationEventWhereUniqueInput[]
  }

  export type LotadorPartnerUncheckedCreateNestedManyWithoutDriverInput = {
    create?: XOR<LotadorPartnerCreateWithoutDriverInput, LotadorPartnerUncheckedCreateWithoutDriverInput> | LotadorPartnerCreateWithoutDriverInput[] | LotadorPartnerUncheckedCreateWithoutDriverInput[]
    connectOrCreate?: LotadorPartnerCreateOrConnectWithoutDriverInput | LotadorPartnerCreateOrConnectWithoutDriverInput[]
    createMany?: LotadorPartnerCreateManyDriverInputEnvelope
    connect?: LotadorPartnerWhereUniqueInput | LotadorPartnerWhereUniqueInput[]
  }

  export type EnumDriverStatusFieldUpdateOperationsInput = {
    set?: $Enums.DriverStatus
  }

  export type DriverUpdateworkDaysInput = {
    set?: number[]
    push?: number | number[]
  }

  export type DecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type UserUpdateOneRequiredWithoutDriverProfileNestedInput = {
    create?: XOR<UserCreateWithoutDriverProfileInput, UserUncheckedCreateWithoutDriverProfileInput>
    connectOrCreate?: UserCreateOrConnectWithoutDriverProfileInput
    upsert?: UserUpsertWithoutDriverProfileInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutDriverProfileInput, UserUpdateWithoutDriverProfileInput>, UserUncheckedUpdateWithoutDriverProfileInput>
  }

  export type UserUpdateOneRequiredWithoutClientDriversNestedInput = {
    create?: XOR<UserCreateWithoutClientDriversInput, UserUncheckedCreateWithoutClientDriversInput>
    connectOrCreate?: UserCreateOrConnectWithoutClientDriversInput
    upsert?: UserUpsertWithoutClientDriversInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutClientDriversInput, UserUpdateWithoutClientDriversInput>, UserUncheckedUpdateWithoutClientDriversInput>
  }

  export type TicketUpdateManyWithoutDriverNestedInput = {
    create?: XOR<TicketCreateWithoutDriverInput, TicketUncheckedCreateWithoutDriverInput> | TicketCreateWithoutDriverInput[] | TicketUncheckedCreateWithoutDriverInput[]
    connectOrCreate?: TicketCreateOrConnectWithoutDriverInput | TicketCreateOrConnectWithoutDriverInput[]
    upsert?: TicketUpsertWithWhereUniqueWithoutDriverInput | TicketUpsertWithWhereUniqueWithoutDriverInput[]
    createMany?: TicketCreateManyDriverInputEnvelope
    set?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
    disconnect?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
    delete?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
    connect?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
    update?: TicketUpdateWithWhereUniqueWithoutDriverInput | TicketUpdateWithWhereUniqueWithoutDriverInput[]
    updateMany?: TicketUpdateManyWithWhereWithoutDriverInput | TicketUpdateManyWithWhereWithoutDriverInput[]
    deleteMany?: TicketScalarWhereInput | TicketScalarWhereInput[]
  }

  export type LocationEventUpdateManyWithoutDriverNestedInput = {
    create?: XOR<LocationEventCreateWithoutDriverInput, LocationEventUncheckedCreateWithoutDriverInput> | LocationEventCreateWithoutDriverInput[] | LocationEventUncheckedCreateWithoutDriverInput[]
    connectOrCreate?: LocationEventCreateOrConnectWithoutDriverInput | LocationEventCreateOrConnectWithoutDriverInput[]
    upsert?: LocationEventUpsertWithWhereUniqueWithoutDriverInput | LocationEventUpsertWithWhereUniqueWithoutDriverInput[]
    createMany?: LocationEventCreateManyDriverInputEnvelope
    set?: LocationEventWhereUniqueInput | LocationEventWhereUniqueInput[]
    disconnect?: LocationEventWhereUniqueInput | LocationEventWhereUniqueInput[]
    delete?: LocationEventWhereUniqueInput | LocationEventWhereUniqueInput[]
    connect?: LocationEventWhereUniqueInput | LocationEventWhereUniqueInput[]
    update?: LocationEventUpdateWithWhereUniqueWithoutDriverInput | LocationEventUpdateWithWhereUniqueWithoutDriverInput[]
    updateMany?: LocationEventUpdateManyWithWhereWithoutDriverInput | LocationEventUpdateManyWithWhereWithoutDriverInput[]
    deleteMany?: LocationEventScalarWhereInput | LocationEventScalarWhereInput[]
  }

  export type LotadorPartnerUpdateManyWithoutDriverNestedInput = {
    create?: XOR<LotadorPartnerCreateWithoutDriverInput, LotadorPartnerUncheckedCreateWithoutDriverInput> | LotadorPartnerCreateWithoutDriverInput[] | LotadorPartnerUncheckedCreateWithoutDriverInput[]
    connectOrCreate?: LotadorPartnerCreateOrConnectWithoutDriverInput | LotadorPartnerCreateOrConnectWithoutDriverInput[]
    upsert?: LotadorPartnerUpsertWithWhereUniqueWithoutDriverInput | LotadorPartnerUpsertWithWhereUniqueWithoutDriverInput[]
    createMany?: LotadorPartnerCreateManyDriverInputEnvelope
    set?: LotadorPartnerWhereUniqueInput | LotadorPartnerWhereUniqueInput[]
    disconnect?: LotadorPartnerWhereUniqueInput | LotadorPartnerWhereUniqueInput[]
    delete?: LotadorPartnerWhereUniqueInput | LotadorPartnerWhereUniqueInput[]
    connect?: LotadorPartnerWhereUniqueInput | LotadorPartnerWhereUniqueInput[]
    update?: LotadorPartnerUpdateWithWhereUniqueWithoutDriverInput | LotadorPartnerUpdateWithWhereUniqueWithoutDriverInput[]
    updateMany?: LotadorPartnerUpdateManyWithWhereWithoutDriverInput | LotadorPartnerUpdateManyWithWhereWithoutDriverInput[]
    deleteMany?: LotadorPartnerScalarWhereInput | LotadorPartnerScalarWhereInput[]
  }

  export type TicketUncheckedUpdateManyWithoutDriverNestedInput = {
    create?: XOR<TicketCreateWithoutDriverInput, TicketUncheckedCreateWithoutDriverInput> | TicketCreateWithoutDriverInput[] | TicketUncheckedCreateWithoutDriverInput[]
    connectOrCreate?: TicketCreateOrConnectWithoutDriverInput | TicketCreateOrConnectWithoutDriverInput[]
    upsert?: TicketUpsertWithWhereUniqueWithoutDriverInput | TicketUpsertWithWhereUniqueWithoutDriverInput[]
    createMany?: TicketCreateManyDriverInputEnvelope
    set?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
    disconnect?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
    delete?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
    connect?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
    update?: TicketUpdateWithWhereUniqueWithoutDriverInput | TicketUpdateWithWhereUniqueWithoutDriverInput[]
    updateMany?: TicketUpdateManyWithWhereWithoutDriverInput | TicketUpdateManyWithWhereWithoutDriverInput[]
    deleteMany?: TicketScalarWhereInput | TicketScalarWhereInput[]
  }

  export type LocationEventUncheckedUpdateManyWithoutDriverNestedInput = {
    create?: XOR<LocationEventCreateWithoutDriverInput, LocationEventUncheckedCreateWithoutDriverInput> | LocationEventCreateWithoutDriverInput[] | LocationEventUncheckedCreateWithoutDriverInput[]
    connectOrCreate?: LocationEventCreateOrConnectWithoutDriverInput | LocationEventCreateOrConnectWithoutDriverInput[]
    upsert?: LocationEventUpsertWithWhereUniqueWithoutDriverInput | LocationEventUpsertWithWhereUniqueWithoutDriverInput[]
    createMany?: LocationEventCreateManyDriverInputEnvelope
    set?: LocationEventWhereUniqueInput | LocationEventWhereUniqueInput[]
    disconnect?: LocationEventWhereUniqueInput | LocationEventWhereUniqueInput[]
    delete?: LocationEventWhereUniqueInput | LocationEventWhereUniqueInput[]
    connect?: LocationEventWhereUniqueInput | LocationEventWhereUniqueInput[]
    update?: LocationEventUpdateWithWhereUniqueWithoutDriverInput | LocationEventUpdateWithWhereUniqueWithoutDriverInput[]
    updateMany?: LocationEventUpdateManyWithWhereWithoutDriverInput | LocationEventUpdateManyWithWhereWithoutDriverInput[]
    deleteMany?: LocationEventScalarWhereInput | LocationEventScalarWhereInput[]
  }

  export type LotadorPartnerUncheckedUpdateManyWithoutDriverNestedInput = {
    create?: XOR<LotadorPartnerCreateWithoutDriverInput, LotadorPartnerUncheckedCreateWithoutDriverInput> | LotadorPartnerCreateWithoutDriverInput[] | LotadorPartnerUncheckedCreateWithoutDriverInput[]
    connectOrCreate?: LotadorPartnerCreateOrConnectWithoutDriverInput | LotadorPartnerCreateOrConnectWithoutDriverInput[]
    upsert?: LotadorPartnerUpsertWithWhereUniqueWithoutDriverInput | LotadorPartnerUpsertWithWhereUniqueWithoutDriverInput[]
    createMany?: LotadorPartnerCreateManyDriverInputEnvelope
    set?: LotadorPartnerWhereUniqueInput | LotadorPartnerWhereUniqueInput[]
    disconnect?: LotadorPartnerWhereUniqueInput | LotadorPartnerWhereUniqueInput[]
    delete?: LotadorPartnerWhereUniqueInput | LotadorPartnerWhereUniqueInput[]
    connect?: LotadorPartnerWhereUniqueInput | LotadorPartnerWhereUniqueInput[]
    update?: LotadorPartnerUpdateWithWhereUniqueWithoutDriverInput | LotadorPartnerUpdateWithWhereUniqueWithoutDriverInput[]
    updateMany?: LotadorPartnerUpdateManyWithWhereWithoutDriverInput | LotadorPartnerUpdateManyWithWhereWithoutDriverInput[]
    deleteMany?: LotadorPartnerScalarWhereInput | LotadorPartnerScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutWalletInput = {
    create?: XOR<UserCreateWithoutWalletInput, UserUncheckedCreateWithoutWalletInput>
    connectOrCreate?: UserCreateOrConnectWithoutWalletInput
    connect?: UserWhereUniqueInput
  }

  export type TransactionCreateNestedManyWithoutWalletInput = {
    create?: XOR<TransactionCreateWithoutWalletInput, TransactionUncheckedCreateWithoutWalletInput> | TransactionCreateWithoutWalletInput[] | TransactionUncheckedCreateWithoutWalletInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutWalletInput | TransactionCreateOrConnectWithoutWalletInput[]
    createMany?: TransactionCreateManyWalletInputEnvelope
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
  }

  export type TransactionUncheckedCreateNestedManyWithoutWalletInput = {
    create?: XOR<TransactionCreateWithoutWalletInput, TransactionUncheckedCreateWithoutWalletInput> | TransactionCreateWithoutWalletInput[] | TransactionUncheckedCreateWithoutWalletInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutWalletInput | TransactionCreateOrConnectWithoutWalletInput[]
    createMany?: TransactionCreateManyWalletInputEnvelope
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
  }

  export type UserUpdateOneRequiredWithoutWalletNestedInput = {
    create?: XOR<UserCreateWithoutWalletInput, UserUncheckedCreateWithoutWalletInput>
    connectOrCreate?: UserCreateOrConnectWithoutWalletInput
    upsert?: UserUpsertWithoutWalletInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutWalletInput, UserUpdateWithoutWalletInput>, UserUncheckedUpdateWithoutWalletInput>
  }

  export type TransactionUpdateManyWithoutWalletNestedInput = {
    create?: XOR<TransactionCreateWithoutWalletInput, TransactionUncheckedCreateWithoutWalletInput> | TransactionCreateWithoutWalletInput[] | TransactionUncheckedCreateWithoutWalletInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutWalletInput | TransactionCreateOrConnectWithoutWalletInput[]
    upsert?: TransactionUpsertWithWhereUniqueWithoutWalletInput | TransactionUpsertWithWhereUniqueWithoutWalletInput[]
    createMany?: TransactionCreateManyWalletInputEnvelope
    set?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    disconnect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    delete?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    update?: TransactionUpdateWithWhereUniqueWithoutWalletInput | TransactionUpdateWithWhereUniqueWithoutWalletInput[]
    updateMany?: TransactionUpdateManyWithWhereWithoutWalletInput | TransactionUpdateManyWithWhereWithoutWalletInput[]
    deleteMany?: TransactionScalarWhereInput | TransactionScalarWhereInput[]
  }

  export type TransactionUncheckedUpdateManyWithoutWalletNestedInput = {
    create?: XOR<TransactionCreateWithoutWalletInput, TransactionUncheckedCreateWithoutWalletInput> | TransactionCreateWithoutWalletInput[] | TransactionUncheckedCreateWithoutWalletInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutWalletInput | TransactionCreateOrConnectWithoutWalletInput[]
    upsert?: TransactionUpsertWithWhereUniqueWithoutWalletInput | TransactionUpsertWithWhereUniqueWithoutWalletInput[]
    createMany?: TransactionCreateManyWalletInputEnvelope
    set?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    disconnect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    delete?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    update?: TransactionUpdateWithWhereUniqueWithoutWalletInput | TransactionUpdateWithWhereUniqueWithoutWalletInput[]
    updateMany?: TransactionUpdateManyWithWhereWithoutWalletInput | TransactionUpdateManyWithWhereWithoutWalletInput[]
    deleteMany?: TransactionScalarWhereInput | TransactionScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutTicketsAsPassengerInput = {
    create?: XOR<UserCreateWithoutTicketsAsPassengerInput, UserUncheckedCreateWithoutTicketsAsPassengerInput>
    connectOrCreate?: UserCreateOrConnectWithoutTicketsAsPassengerInput
    connect?: UserWhereUniqueInput
  }

  export type DriverCreateNestedOneWithoutTicketsReceivedInput = {
    create?: XOR<DriverCreateWithoutTicketsReceivedInput, DriverUncheckedCreateWithoutTicketsReceivedInput>
    connectOrCreate?: DriverCreateOrConnectWithoutTicketsReceivedInput
    connect?: DriverWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutTicketsEmittedInput = {
    create?: XOR<UserCreateWithoutTicketsEmittedInput, UserUncheckedCreateWithoutTicketsEmittedInput>
    connectOrCreate?: UserCreateOrConnectWithoutTicketsEmittedInput
    connect?: UserWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutTicketsTransferredToInput = {
    create?: XOR<UserCreateWithoutTicketsTransferredToInput, UserUncheckedCreateWithoutTicketsTransferredToInput>
    connectOrCreate?: UserCreateOrConnectWithoutTicketsTransferredToInput
    connect?: UserWhereUniqueInput
  }

  export type TransactionCreateNestedOneWithoutTicketInput = {
    create?: XOR<TransactionCreateWithoutTicketInput, TransactionUncheckedCreateWithoutTicketInput>
    connectOrCreate?: TransactionCreateOrConnectWithoutTicketInput
    connect?: TransactionWhereUniqueInput
  }

  export type TransactionUncheckedCreateNestedOneWithoutTicketInput = {
    create?: XOR<TransactionCreateWithoutTicketInput, TransactionUncheckedCreateWithoutTicketInput>
    connectOrCreate?: TransactionCreateOrConnectWithoutTicketInput
    connect?: TransactionWhereUniqueInput
  }

  export type EnumTicketStatusFieldUpdateOperationsInput = {
    set?: $Enums.TicketStatus
  }

  export type UserUpdateOneRequiredWithoutTicketsAsPassengerNestedInput = {
    create?: XOR<UserCreateWithoutTicketsAsPassengerInput, UserUncheckedCreateWithoutTicketsAsPassengerInput>
    connectOrCreate?: UserCreateOrConnectWithoutTicketsAsPassengerInput
    upsert?: UserUpsertWithoutTicketsAsPassengerInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutTicketsAsPassengerInput, UserUpdateWithoutTicketsAsPassengerInput>, UserUncheckedUpdateWithoutTicketsAsPassengerInput>
  }

  export type DriverUpdateOneRequiredWithoutTicketsReceivedNestedInput = {
    create?: XOR<DriverCreateWithoutTicketsReceivedInput, DriverUncheckedCreateWithoutTicketsReceivedInput>
    connectOrCreate?: DriverCreateOrConnectWithoutTicketsReceivedInput
    upsert?: DriverUpsertWithoutTicketsReceivedInput
    connect?: DriverWhereUniqueInput
    update?: XOR<XOR<DriverUpdateToOneWithWhereWithoutTicketsReceivedInput, DriverUpdateWithoutTicketsReceivedInput>, DriverUncheckedUpdateWithoutTicketsReceivedInput>
  }

  export type UserUpdateOneRequiredWithoutTicketsEmittedNestedInput = {
    create?: XOR<UserCreateWithoutTicketsEmittedInput, UserUncheckedCreateWithoutTicketsEmittedInput>
    connectOrCreate?: UserCreateOrConnectWithoutTicketsEmittedInput
    upsert?: UserUpsertWithoutTicketsEmittedInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutTicketsEmittedInput, UserUpdateWithoutTicketsEmittedInput>, UserUncheckedUpdateWithoutTicketsEmittedInput>
  }

  export type UserUpdateOneWithoutTicketsTransferredToNestedInput = {
    create?: XOR<UserCreateWithoutTicketsTransferredToInput, UserUncheckedCreateWithoutTicketsTransferredToInput>
    connectOrCreate?: UserCreateOrConnectWithoutTicketsTransferredToInput
    upsert?: UserUpsertWithoutTicketsTransferredToInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutTicketsTransferredToInput, UserUpdateWithoutTicketsTransferredToInput>, UserUncheckedUpdateWithoutTicketsTransferredToInput>
  }

  export type TransactionUpdateOneWithoutTicketNestedInput = {
    create?: XOR<TransactionCreateWithoutTicketInput, TransactionUncheckedCreateWithoutTicketInput>
    connectOrCreate?: TransactionCreateOrConnectWithoutTicketInput
    upsert?: TransactionUpsertWithoutTicketInput
    disconnect?: TransactionWhereInput | boolean
    delete?: TransactionWhereInput | boolean
    connect?: TransactionWhereUniqueInput
    update?: XOR<XOR<TransactionUpdateToOneWithWhereWithoutTicketInput, TransactionUpdateWithoutTicketInput>, TransactionUncheckedUpdateWithoutTicketInput>
  }

  export type TransactionUncheckedUpdateOneWithoutTicketNestedInput = {
    create?: XOR<TransactionCreateWithoutTicketInput, TransactionUncheckedCreateWithoutTicketInput>
    connectOrCreate?: TransactionCreateOrConnectWithoutTicketInput
    upsert?: TransactionUpsertWithoutTicketInput
    disconnect?: TransactionWhereInput | boolean
    delete?: TransactionWhereInput | boolean
    connect?: TransactionWhereUniqueInput
    update?: XOR<XOR<TransactionUpdateToOneWithWhereWithoutTicketInput, TransactionUpdateWithoutTicketInput>, TransactionUncheckedUpdateWithoutTicketInput>
  }

  export type WalletCreateNestedOneWithoutTransactionsInput = {
    create?: XOR<WalletCreateWithoutTransactionsInput, WalletUncheckedCreateWithoutTransactionsInput>
    connectOrCreate?: WalletCreateOrConnectWithoutTransactionsInput
    connect?: WalletWhereUniqueInput
  }

  export type TicketCreateNestedOneWithoutTransactionInput = {
    create?: XOR<TicketCreateWithoutTransactionInput, TicketUncheckedCreateWithoutTransactionInput>
    connectOrCreate?: TicketCreateOrConnectWithoutTransactionInput
    connect?: TicketWhereUniqueInput
  }

  export type EnumTransactionTypeFieldUpdateOperationsInput = {
    set?: $Enums.TransactionType
  }

  export type WalletUpdateOneRequiredWithoutTransactionsNestedInput = {
    create?: XOR<WalletCreateWithoutTransactionsInput, WalletUncheckedCreateWithoutTransactionsInput>
    connectOrCreate?: WalletCreateOrConnectWithoutTransactionsInput
    upsert?: WalletUpsertWithoutTransactionsInput
    connect?: WalletWhereUniqueInput
    update?: XOR<XOR<WalletUpdateToOneWithWhereWithoutTransactionsInput, WalletUpdateWithoutTransactionsInput>, WalletUncheckedUpdateWithoutTransactionsInput>
  }

  export type TicketUpdateOneWithoutTransactionNestedInput = {
    create?: XOR<TicketCreateWithoutTransactionInput, TicketUncheckedCreateWithoutTransactionInput>
    connectOrCreate?: TicketCreateOrConnectWithoutTransactionInput
    upsert?: TicketUpsertWithoutTransactionInput
    disconnect?: TicketWhereInput | boolean
    delete?: TicketWhereInput | boolean
    connect?: TicketWhereUniqueInput
    update?: XOR<XOR<TicketUpdateToOneWithWhereWithoutTransactionInput, TicketUpdateWithoutTransactionInput>, TicketUncheckedUpdateWithoutTransactionInput>
  }

  export type DriverCreateNestedOneWithoutLocationEventsInput = {
    create?: XOR<DriverCreateWithoutLocationEventsInput, DriverUncheckedCreateWithoutLocationEventsInput>
    connectOrCreate?: DriverCreateOrConnectWithoutLocationEventsInput
    connect?: DriverWhereUniqueInput
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DriverUpdateOneRequiredWithoutLocationEventsNestedInput = {
    create?: XOR<DriverCreateWithoutLocationEventsInput, DriverUncheckedCreateWithoutLocationEventsInput>
    connectOrCreate?: DriverCreateOrConnectWithoutLocationEventsInput
    upsert?: DriverUpsertWithoutLocationEventsInput
    connect?: DriverWhereUniqueInput
    update?: XOR<XOR<DriverUpdateToOneWithWhereWithoutLocationEventsInput, DriverUpdateWithoutLocationEventsInput>, DriverUncheckedUpdateWithoutLocationEventsInput>
  }

  export type DriverCreateNestedOneWithoutLotadorPartnershipsInput = {
    create?: XOR<DriverCreateWithoutLotadorPartnershipsInput, DriverUncheckedCreateWithoutLotadorPartnershipsInput>
    connectOrCreate?: DriverCreateOrConnectWithoutLotadorPartnershipsInput
    connect?: DriverWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutLotadorPartnershipsInput = {
    create?: XOR<UserCreateWithoutLotadorPartnershipsInput, UserUncheckedCreateWithoutLotadorPartnershipsInput>
    connectOrCreate?: UserCreateOrConnectWithoutLotadorPartnershipsInput
    connect?: UserWhereUniqueInput
  }

  export type DriverUpdateOneRequiredWithoutLotadorPartnershipsNestedInput = {
    create?: XOR<DriverCreateWithoutLotadorPartnershipsInput, DriverUncheckedCreateWithoutLotadorPartnershipsInput>
    connectOrCreate?: DriverCreateOrConnectWithoutLotadorPartnershipsInput
    upsert?: DriverUpsertWithoutLotadorPartnershipsInput
    connect?: DriverWhereUniqueInput
    update?: XOR<XOR<DriverUpdateToOneWithWhereWithoutLotadorPartnershipsInput, DriverUpdateWithoutLotadorPartnershipsInput>, DriverUncheckedUpdateWithoutLotadorPartnershipsInput>
  }

  export type UserUpdateOneRequiredWithoutLotadorPartnershipsNestedInput = {
    create?: XOR<UserCreateWithoutLotadorPartnershipsInput, UserUncheckedCreateWithoutLotadorPartnershipsInput>
    connectOrCreate?: UserCreateOrConnectWithoutLotadorPartnershipsInput
    upsert?: UserUpsertWithoutLotadorPartnershipsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutLotadorPartnershipsInput, UserUpdateWithoutLotadorPartnershipsInput>, UserUncheckedUpdateWithoutLotadorPartnershipsInput>
  }

  export type UserCreateNestedOneWithoutAuditLogsInput = {
    create?: XOR<UserCreateWithoutAuditLogsInput, UserUncheckedCreateWithoutAuditLogsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAuditLogsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutAuditLogsNestedInput = {
    create?: XOR<UserCreateWithoutAuditLogsInput, UserUncheckedCreateWithoutAuditLogsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAuditLogsInput
    upsert?: UserUpsertWithoutAuditLogsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAuditLogsInput, UserUpdateWithoutAuditLogsInput>, UserUncheckedUpdateWithoutAuditLogsInput>
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

  export type NestedEnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
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

  export type NestedEnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
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

  export type NestedEnumDriverStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.DriverStatus | EnumDriverStatusFieldRefInput<$PrismaModel>
    in?: $Enums.DriverStatus[] | ListEnumDriverStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.DriverStatus[] | ListEnumDriverStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumDriverStatusFilter<$PrismaModel> | $Enums.DriverStatus
  }

  export type NestedDecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type NestedEnumDriverStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.DriverStatus | EnumDriverStatusFieldRefInput<$PrismaModel>
    in?: $Enums.DriverStatus[] | ListEnumDriverStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.DriverStatus[] | ListEnumDriverStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumDriverStatusWithAggregatesFilter<$PrismaModel> | $Enums.DriverStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumDriverStatusFilter<$PrismaModel>
    _max?: NestedEnumDriverStatusFilter<$PrismaModel>
  }

  export type NestedDecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type NestedEnumTicketStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.TicketStatus | EnumTicketStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TicketStatus[] | ListEnumTicketStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.TicketStatus[] | ListEnumTicketStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumTicketStatusFilter<$PrismaModel> | $Enums.TicketStatus
  }

  export type NestedEnumTicketStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TicketStatus | EnumTicketStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TicketStatus[] | ListEnumTicketStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.TicketStatus[] | ListEnumTicketStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumTicketStatusWithAggregatesFilter<$PrismaModel> | $Enums.TicketStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTicketStatusFilter<$PrismaModel>
    _max?: NestedEnumTicketStatusFilter<$PrismaModel>
  }

  export type NestedEnumTransactionTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.TransactionType | EnumTransactionTypeFieldRefInput<$PrismaModel>
    in?: $Enums.TransactionType[] | ListEnumTransactionTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.TransactionType[] | ListEnumTransactionTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumTransactionTypeFilter<$PrismaModel> | $Enums.TransactionType
  }

  export type NestedEnumTransactionTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TransactionType | EnumTransactionTypeFieldRefInput<$PrismaModel>
    in?: $Enums.TransactionType[] | ListEnumTransactionTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.TransactionType[] | ListEnumTransactionTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumTransactionTypeWithAggregatesFilter<$PrismaModel> | $Enums.TransactionType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTransactionTypeFilter<$PrismaModel>
    _max?: NestedEnumTransactionTypeFilter<$PrismaModel>
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

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type UserCreateWithoutCreatedUsersInput = {
    id?: string
    phone?: string | null
    displayId?: string | null
    name: string
    pinHash?: string | null
    passwordHash?: string | null
    role: $Enums.Role
    isActive?: boolean
    isBlocked?: boolean
    blockReason?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    createdBy?: UserCreateNestedOneWithoutCreatedUsersInput
    agentProfile?: AgentCreateNestedOneWithoutUserInput
    adminAgents?: AgentCreateNestedManyWithoutAdminInput
    driverProfile?: DriverCreateNestedOneWithoutUserInput
    clientDrivers?: DriverCreateNestedManyWithoutClientInput
    wallet?: WalletCreateNestedOneWithoutUserInput
    ticketsAsPassenger?: TicketCreateNestedManyWithoutPassengerInput
    ticketsEmitted?: TicketCreateNestedManyWithoutIssuedByInput
    ticketsTransferredTo?: TicketCreateNestedManyWithoutTransferredToInput
    lotadorPartnerships?: LotadorPartnerCreateNestedManyWithoutLotadorInput
    auditLogs?: AuditLogCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutCreatedUsersInput = {
    id?: string
    phone?: string | null
    displayId?: string | null
    name: string
    pinHash?: string | null
    passwordHash?: string | null
    role: $Enums.Role
    isActive?: boolean
    isBlocked?: boolean
    blockReason?: string | null
    createdById?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    agentProfile?: AgentUncheckedCreateNestedOneWithoutUserInput
    adminAgents?: AgentUncheckedCreateNestedManyWithoutAdminInput
    driverProfile?: DriverUncheckedCreateNestedOneWithoutUserInput
    clientDrivers?: DriverUncheckedCreateNestedManyWithoutClientInput
    wallet?: WalletUncheckedCreateNestedOneWithoutUserInput
    ticketsAsPassenger?: TicketUncheckedCreateNestedManyWithoutPassengerInput
    ticketsEmitted?: TicketUncheckedCreateNestedManyWithoutIssuedByInput
    ticketsTransferredTo?: TicketUncheckedCreateNestedManyWithoutTransferredToInput
    lotadorPartnerships?: LotadorPartnerUncheckedCreateNestedManyWithoutLotadorInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutCreatedUsersInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCreatedUsersInput, UserUncheckedCreateWithoutCreatedUsersInput>
  }

  export type UserCreateWithoutCreatedByInput = {
    id?: string
    phone?: string | null
    displayId?: string | null
    name: string
    pinHash?: string | null
    passwordHash?: string | null
    role: $Enums.Role
    isActive?: boolean
    isBlocked?: boolean
    blockReason?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    createdUsers?: UserCreateNestedManyWithoutCreatedByInput
    agentProfile?: AgentCreateNestedOneWithoutUserInput
    adminAgents?: AgentCreateNestedManyWithoutAdminInput
    driverProfile?: DriverCreateNestedOneWithoutUserInput
    clientDrivers?: DriverCreateNestedManyWithoutClientInput
    wallet?: WalletCreateNestedOneWithoutUserInput
    ticketsAsPassenger?: TicketCreateNestedManyWithoutPassengerInput
    ticketsEmitted?: TicketCreateNestedManyWithoutIssuedByInput
    ticketsTransferredTo?: TicketCreateNestedManyWithoutTransferredToInput
    lotadorPartnerships?: LotadorPartnerCreateNestedManyWithoutLotadorInput
    auditLogs?: AuditLogCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutCreatedByInput = {
    id?: string
    phone?: string | null
    displayId?: string | null
    name: string
    pinHash?: string | null
    passwordHash?: string | null
    role: $Enums.Role
    isActive?: boolean
    isBlocked?: boolean
    blockReason?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    createdUsers?: UserUncheckedCreateNestedManyWithoutCreatedByInput
    agentProfile?: AgentUncheckedCreateNestedOneWithoutUserInput
    adminAgents?: AgentUncheckedCreateNestedManyWithoutAdminInput
    driverProfile?: DriverUncheckedCreateNestedOneWithoutUserInput
    clientDrivers?: DriverUncheckedCreateNestedManyWithoutClientInput
    wallet?: WalletUncheckedCreateNestedOneWithoutUserInput
    ticketsAsPassenger?: TicketUncheckedCreateNestedManyWithoutPassengerInput
    ticketsEmitted?: TicketUncheckedCreateNestedManyWithoutIssuedByInput
    ticketsTransferredTo?: TicketUncheckedCreateNestedManyWithoutTransferredToInput
    lotadorPartnerships?: LotadorPartnerUncheckedCreateNestedManyWithoutLotadorInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutCreatedByInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCreatedByInput, UserUncheckedCreateWithoutCreatedByInput>
  }

  export type UserCreateManyCreatedByInputEnvelope = {
    data: UserCreateManyCreatedByInput | UserCreateManyCreatedByInput[]
    skipDuplicates?: boolean
  }

  export type AgentCreateWithoutUserInput = {
    id?: string
    isActive?: boolean
    dailyTicketLimit?: number
    permissions?: AgentCreatepermissionsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    admin: UserCreateNestedOneWithoutAdminAgentsInput
  }

  export type AgentUncheckedCreateWithoutUserInput = {
    id?: string
    adminId: string
    isActive?: boolean
    dailyTicketLimit?: number
    permissions?: AgentCreatepermissionsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AgentCreateOrConnectWithoutUserInput = {
    where: AgentWhereUniqueInput
    create: XOR<AgentCreateWithoutUserInput, AgentUncheckedCreateWithoutUserInput>
  }

  export type AgentCreateWithoutAdminInput = {
    id?: string
    isActive?: boolean
    dailyTicketLimit?: number
    permissions?: AgentCreatepermissionsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutAgentProfileInput
  }

  export type AgentUncheckedCreateWithoutAdminInput = {
    id?: string
    userId: string
    isActive?: boolean
    dailyTicketLimit?: number
    permissions?: AgentCreatepermissionsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AgentCreateOrConnectWithoutAdminInput = {
    where: AgentWhereUniqueInput
    create: XOR<AgentCreateWithoutAdminInput, AgentUncheckedCreateWithoutAdminInput>
  }

  export type AgentCreateManyAdminInputEnvelope = {
    data: AgentCreateManyAdminInput | AgentCreateManyAdminInput[]
    skipDuplicates?: boolean
  }

  export type DriverCreateWithoutUserInput = {
    id?: string
    licensePlate: string
    status?: $Enums.DriverStatus
    workDays?: DriverCreateworkDaysInput | number[]
    currentBalance?: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
    client: UserCreateNestedOneWithoutClientDriversInput
    ticketsReceived?: TicketCreateNestedManyWithoutDriverInput
    locationEvents?: LocationEventCreateNestedManyWithoutDriverInput
    lotadorPartnerships?: LotadorPartnerCreateNestedManyWithoutDriverInput
  }

  export type DriverUncheckedCreateWithoutUserInput = {
    id?: string
    clientId: string
    licensePlate: string
    status?: $Enums.DriverStatus
    workDays?: DriverCreateworkDaysInput | number[]
    currentBalance?: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
    ticketsReceived?: TicketUncheckedCreateNestedManyWithoutDriverInput
    locationEvents?: LocationEventUncheckedCreateNestedManyWithoutDriverInput
    lotadorPartnerships?: LotadorPartnerUncheckedCreateNestedManyWithoutDriverInput
  }

  export type DriverCreateOrConnectWithoutUserInput = {
    where: DriverWhereUniqueInput
    create: XOR<DriverCreateWithoutUserInput, DriverUncheckedCreateWithoutUserInput>
  }

  export type DriverCreateWithoutClientInput = {
    id?: string
    licensePlate: string
    status?: $Enums.DriverStatus
    workDays?: DriverCreateworkDaysInput | number[]
    currentBalance?: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutDriverProfileInput
    ticketsReceived?: TicketCreateNestedManyWithoutDriverInput
    locationEvents?: LocationEventCreateNestedManyWithoutDriverInput
    lotadorPartnerships?: LotadorPartnerCreateNestedManyWithoutDriverInput
  }

  export type DriverUncheckedCreateWithoutClientInput = {
    id?: string
    userId: string
    licensePlate: string
    status?: $Enums.DriverStatus
    workDays?: DriverCreateworkDaysInput | number[]
    currentBalance?: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
    ticketsReceived?: TicketUncheckedCreateNestedManyWithoutDriverInput
    locationEvents?: LocationEventUncheckedCreateNestedManyWithoutDriverInput
    lotadorPartnerships?: LotadorPartnerUncheckedCreateNestedManyWithoutDriverInput
  }

  export type DriverCreateOrConnectWithoutClientInput = {
    where: DriverWhereUniqueInput
    create: XOR<DriverCreateWithoutClientInput, DriverUncheckedCreateWithoutClientInput>
  }

  export type DriverCreateManyClientInputEnvelope = {
    data: DriverCreateManyClientInput | DriverCreateManyClientInput[]
    skipDuplicates?: boolean
  }

  export type WalletCreateWithoutUserInput = {
    id?: string
    balance?: Decimal | DecimalJsLike | number | string
    currency?: string
    updatedAt?: Date | string
    createdAt?: Date | string
    transactions?: TransactionCreateNestedManyWithoutWalletInput
  }

  export type WalletUncheckedCreateWithoutUserInput = {
    id?: string
    balance?: Decimal | DecimalJsLike | number | string
    currency?: string
    updatedAt?: Date | string
    createdAt?: Date | string
    transactions?: TransactionUncheckedCreateNestedManyWithoutWalletInput
  }

  export type WalletCreateOrConnectWithoutUserInput = {
    where: WalletWhereUniqueInput
    create: XOR<WalletCreateWithoutUserInput, WalletUncheckedCreateWithoutUserInput>
  }

  export type TicketCreateWithoutPassengerInput = {
    id?: string
    amount: Decimal | DecimalJsLike | number | string
    status?: $Enums.TicketStatus
    qrNonce: string
    shortCode?: string | null
    transferredAt?: Date | string | null
    cancelReason?: string | null
    cancelledById?: string | null
    usedAt?: Date | string | null
    expiresAt: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    driver: DriverCreateNestedOneWithoutTicketsReceivedInput
    issuedBy: UserCreateNestedOneWithoutTicketsEmittedInput
    transferredTo?: UserCreateNestedOneWithoutTicketsTransferredToInput
    transaction?: TransactionCreateNestedOneWithoutTicketInput
  }

  export type TicketUncheckedCreateWithoutPassengerInput = {
    id?: string
    driverId: string
    issuedById: string
    amount: Decimal | DecimalJsLike | number | string
    status?: $Enums.TicketStatus
    qrNonce: string
    shortCode?: string | null
    transferredToId?: string | null
    transferredAt?: Date | string | null
    cancelReason?: string | null
    cancelledById?: string | null
    usedAt?: Date | string | null
    expiresAt: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    transaction?: TransactionUncheckedCreateNestedOneWithoutTicketInput
  }

  export type TicketCreateOrConnectWithoutPassengerInput = {
    where: TicketWhereUniqueInput
    create: XOR<TicketCreateWithoutPassengerInput, TicketUncheckedCreateWithoutPassengerInput>
  }

  export type TicketCreateManyPassengerInputEnvelope = {
    data: TicketCreateManyPassengerInput | TicketCreateManyPassengerInput[]
    skipDuplicates?: boolean
  }

  export type TicketCreateWithoutIssuedByInput = {
    id?: string
    amount: Decimal | DecimalJsLike | number | string
    status?: $Enums.TicketStatus
    qrNonce: string
    shortCode?: string | null
    transferredAt?: Date | string | null
    cancelReason?: string | null
    cancelledById?: string | null
    usedAt?: Date | string | null
    expiresAt: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    passenger: UserCreateNestedOneWithoutTicketsAsPassengerInput
    driver: DriverCreateNestedOneWithoutTicketsReceivedInput
    transferredTo?: UserCreateNestedOneWithoutTicketsTransferredToInput
    transaction?: TransactionCreateNestedOneWithoutTicketInput
  }

  export type TicketUncheckedCreateWithoutIssuedByInput = {
    id?: string
    passengerId: string
    driverId: string
    amount: Decimal | DecimalJsLike | number | string
    status?: $Enums.TicketStatus
    qrNonce: string
    shortCode?: string | null
    transferredToId?: string | null
    transferredAt?: Date | string | null
    cancelReason?: string | null
    cancelledById?: string | null
    usedAt?: Date | string | null
    expiresAt: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    transaction?: TransactionUncheckedCreateNestedOneWithoutTicketInput
  }

  export type TicketCreateOrConnectWithoutIssuedByInput = {
    where: TicketWhereUniqueInput
    create: XOR<TicketCreateWithoutIssuedByInput, TicketUncheckedCreateWithoutIssuedByInput>
  }

  export type TicketCreateManyIssuedByInputEnvelope = {
    data: TicketCreateManyIssuedByInput | TicketCreateManyIssuedByInput[]
    skipDuplicates?: boolean
  }

  export type TicketCreateWithoutTransferredToInput = {
    id?: string
    amount: Decimal | DecimalJsLike | number | string
    status?: $Enums.TicketStatus
    qrNonce: string
    shortCode?: string | null
    transferredAt?: Date | string | null
    cancelReason?: string | null
    cancelledById?: string | null
    usedAt?: Date | string | null
    expiresAt: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    passenger: UserCreateNestedOneWithoutTicketsAsPassengerInput
    driver: DriverCreateNestedOneWithoutTicketsReceivedInput
    issuedBy: UserCreateNestedOneWithoutTicketsEmittedInput
    transaction?: TransactionCreateNestedOneWithoutTicketInput
  }

  export type TicketUncheckedCreateWithoutTransferredToInput = {
    id?: string
    passengerId: string
    driverId: string
    issuedById: string
    amount: Decimal | DecimalJsLike | number | string
    status?: $Enums.TicketStatus
    qrNonce: string
    shortCode?: string | null
    transferredAt?: Date | string | null
    cancelReason?: string | null
    cancelledById?: string | null
    usedAt?: Date | string | null
    expiresAt: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    transaction?: TransactionUncheckedCreateNestedOneWithoutTicketInput
  }

  export type TicketCreateOrConnectWithoutTransferredToInput = {
    where: TicketWhereUniqueInput
    create: XOR<TicketCreateWithoutTransferredToInput, TicketUncheckedCreateWithoutTransferredToInput>
  }

  export type TicketCreateManyTransferredToInputEnvelope = {
    data: TicketCreateManyTransferredToInput | TicketCreateManyTransferredToInput[]
    skipDuplicates?: boolean
  }

  export type LotadorPartnerCreateWithoutLotadorInput = {
    id?: string
    referenceCode: string
    isActive?: boolean
    createdAt?: Date | string
    driver: DriverCreateNestedOneWithoutLotadorPartnershipsInput
  }

  export type LotadorPartnerUncheckedCreateWithoutLotadorInput = {
    id?: string
    driverId: string
    referenceCode: string
    isActive?: boolean
    createdAt?: Date | string
  }

  export type LotadorPartnerCreateOrConnectWithoutLotadorInput = {
    where: LotadorPartnerWhereUniqueInput
    create: XOR<LotadorPartnerCreateWithoutLotadorInput, LotadorPartnerUncheckedCreateWithoutLotadorInput>
  }

  export type LotadorPartnerCreateManyLotadorInputEnvelope = {
    data: LotadorPartnerCreateManyLotadorInput | LotadorPartnerCreateManyLotadorInput[]
    skipDuplicates?: boolean
  }

  export type AuditLogCreateWithoutUserInput = {
    id?: string
    action: string
    entityType: string
    entityId: string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    ipAddress?: string | null
    createdAt?: Date | string
  }

  export type AuditLogUncheckedCreateWithoutUserInput = {
    id?: string
    action: string
    entityType: string
    entityId: string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    ipAddress?: string | null
    createdAt?: Date | string
  }

  export type AuditLogCreateOrConnectWithoutUserInput = {
    where: AuditLogWhereUniqueInput
    create: XOR<AuditLogCreateWithoutUserInput, AuditLogUncheckedCreateWithoutUserInput>
  }

  export type AuditLogCreateManyUserInputEnvelope = {
    data: AuditLogCreateManyUserInput | AuditLogCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutCreatedUsersInput = {
    update: XOR<UserUpdateWithoutCreatedUsersInput, UserUncheckedUpdateWithoutCreatedUsersInput>
    create: XOR<UserCreateWithoutCreatedUsersInput, UserUncheckedCreateWithoutCreatedUsersInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutCreatedUsersInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutCreatedUsersInput, UserUncheckedUpdateWithoutCreatedUsersInput>
  }

  export type UserUpdateWithoutCreatedUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    displayId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    pinHash?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isBlocked?: BoolFieldUpdateOperationsInput | boolean
    blockReason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdBy?: UserUpdateOneWithoutCreatedUsersNestedInput
    agentProfile?: AgentUpdateOneWithoutUserNestedInput
    adminAgents?: AgentUpdateManyWithoutAdminNestedInput
    driverProfile?: DriverUpdateOneWithoutUserNestedInput
    clientDrivers?: DriverUpdateManyWithoutClientNestedInput
    wallet?: WalletUpdateOneWithoutUserNestedInput
    ticketsAsPassenger?: TicketUpdateManyWithoutPassengerNestedInput
    ticketsEmitted?: TicketUpdateManyWithoutIssuedByNestedInput
    ticketsTransferredTo?: TicketUpdateManyWithoutTransferredToNestedInput
    lotadorPartnerships?: LotadorPartnerUpdateManyWithoutLotadorNestedInput
    auditLogs?: AuditLogUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutCreatedUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    displayId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    pinHash?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isBlocked?: BoolFieldUpdateOperationsInput | boolean
    blockReason?: NullableStringFieldUpdateOperationsInput | string | null
    createdById?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    agentProfile?: AgentUncheckedUpdateOneWithoutUserNestedInput
    adminAgents?: AgentUncheckedUpdateManyWithoutAdminNestedInput
    driverProfile?: DriverUncheckedUpdateOneWithoutUserNestedInput
    clientDrivers?: DriverUncheckedUpdateManyWithoutClientNestedInput
    wallet?: WalletUncheckedUpdateOneWithoutUserNestedInput
    ticketsAsPassenger?: TicketUncheckedUpdateManyWithoutPassengerNestedInput
    ticketsEmitted?: TicketUncheckedUpdateManyWithoutIssuedByNestedInput
    ticketsTransferredTo?: TicketUncheckedUpdateManyWithoutTransferredToNestedInput
    lotadorPartnerships?: LotadorPartnerUncheckedUpdateManyWithoutLotadorNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserUpsertWithWhereUniqueWithoutCreatedByInput = {
    where: UserWhereUniqueInput
    update: XOR<UserUpdateWithoutCreatedByInput, UserUncheckedUpdateWithoutCreatedByInput>
    create: XOR<UserCreateWithoutCreatedByInput, UserUncheckedCreateWithoutCreatedByInput>
  }

  export type UserUpdateWithWhereUniqueWithoutCreatedByInput = {
    where: UserWhereUniqueInput
    data: XOR<UserUpdateWithoutCreatedByInput, UserUncheckedUpdateWithoutCreatedByInput>
  }

  export type UserUpdateManyWithWhereWithoutCreatedByInput = {
    where: UserScalarWhereInput
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyWithoutCreatedByInput>
  }

  export type UserScalarWhereInput = {
    AND?: UserScalarWhereInput | UserScalarWhereInput[]
    OR?: UserScalarWhereInput[]
    NOT?: UserScalarWhereInput | UserScalarWhereInput[]
    id?: StringFilter<"User"> | string
    phone?: StringNullableFilter<"User"> | string | null
    displayId?: StringNullableFilter<"User"> | string | null
    name?: StringFilter<"User"> | string
    pinHash?: StringNullableFilter<"User"> | string | null
    passwordHash?: StringNullableFilter<"User"> | string | null
    role?: EnumRoleFilter<"User"> | $Enums.Role
    isActive?: BoolFilter<"User"> | boolean
    isBlocked?: BoolFilter<"User"> | boolean
    blockReason?: StringNullableFilter<"User"> | string | null
    createdById?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    deletedAt?: DateTimeNullableFilter<"User"> | Date | string | null
  }

  export type AgentUpsertWithoutUserInput = {
    update: XOR<AgentUpdateWithoutUserInput, AgentUncheckedUpdateWithoutUserInput>
    create: XOR<AgentCreateWithoutUserInput, AgentUncheckedCreateWithoutUserInput>
    where?: AgentWhereInput
  }

  export type AgentUpdateToOneWithWhereWithoutUserInput = {
    where?: AgentWhereInput
    data: XOR<AgentUpdateWithoutUserInput, AgentUncheckedUpdateWithoutUserInput>
  }

  export type AgentUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    dailyTicketLimit?: IntFieldUpdateOperationsInput | number
    permissions?: AgentUpdatepermissionsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    admin?: UserUpdateOneRequiredWithoutAdminAgentsNestedInput
  }

  export type AgentUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    adminId?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    dailyTicketLimit?: IntFieldUpdateOperationsInput | number
    permissions?: AgentUpdatepermissionsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AgentUpsertWithWhereUniqueWithoutAdminInput = {
    where: AgentWhereUniqueInput
    update: XOR<AgentUpdateWithoutAdminInput, AgentUncheckedUpdateWithoutAdminInput>
    create: XOR<AgentCreateWithoutAdminInput, AgentUncheckedCreateWithoutAdminInput>
  }

  export type AgentUpdateWithWhereUniqueWithoutAdminInput = {
    where: AgentWhereUniqueInput
    data: XOR<AgentUpdateWithoutAdminInput, AgentUncheckedUpdateWithoutAdminInput>
  }

  export type AgentUpdateManyWithWhereWithoutAdminInput = {
    where: AgentScalarWhereInput
    data: XOR<AgentUpdateManyMutationInput, AgentUncheckedUpdateManyWithoutAdminInput>
  }

  export type AgentScalarWhereInput = {
    AND?: AgentScalarWhereInput | AgentScalarWhereInput[]
    OR?: AgentScalarWhereInput[]
    NOT?: AgentScalarWhereInput | AgentScalarWhereInput[]
    id?: StringFilter<"Agent"> | string
    userId?: StringFilter<"Agent"> | string
    adminId?: StringFilter<"Agent"> | string
    isActive?: BoolFilter<"Agent"> | boolean
    dailyTicketLimit?: IntFilter<"Agent"> | number
    permissions?: StringNullableListFilter<"Agent">
    createdAt?: DateTimeFilter<"Agent"> | Date | string
    updatedAt?: DateTimeFilter<"Agent"> | Date | string
  }

  export type DriverUpsertWithoutUserInput = {
    update: XOR<DriverUpdateWithoutUserInput, DriverUncheckedUpdateWithoutUserInput>
    create: XOR<DriverCreateWithoutUserInput, DriverUncheckedCreateWithoutUserInput>
    where?: DriverWhereInput
  }

  export type DriverUpdateToOneWithWhereWithoutUserInput = {
    where?: DriverWhereInput
    data: XOR<DriverUpdateWithoutUserInput, DriverUncheckedUpdateWithoutUserInput>
  }

  export type DriverUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    licensePlate?: StringFieldUpdateOperationsInput | string
    status?: EnumDriverStatusFieldUpdateOperationsInput | $Enums.DriverStatus
    workDays?: DriverUpdateworkDaysInput | number[]
    currentBalance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    client?: UserUpdateOneRequiredWithoutClientDriversNestedInput
    ticketsReceived?: TicketUpdateManyWithoutDriverNestedInput
    locationEvents?: LocationEventUpdateManyWithoutDriverNestedInput
    lotadorPartnerships?: LotadorPartnerUpdateManyWithoutDriverNestedInput
  }

  export type DriverUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    clientId?: StringFieldUpdateOperationsInput | string
    licensePlate?: StringFieldUpdateOperationsInput | string
    status?: EnumDriverStatusFieldUpdateOperationsInput | $Enums.DriverStatus
    workDays?: DriverUpdateworkDaysInput | number[]
    currentBalance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ticketsReceived?: TicketUncheckedUpdateManyWithoutDriverNestedInput
    locationEvents?: LocationEventUncheckedUpdateManyWithoutDriverNestedInput
    lotadorPartnerships?: LotadorPartnerUncheckedUpdateManyWithoutDriverNestedInput
  }

  export type DriverUpsertWithWhereUniqueWithoutClientInput = {
    where: DriverWhereUniqueInput
    update: XOR<DriverUpdateWithoutClientInput, DriverUncheckedUpdateWithoutClientInput>
    create: XOR<DriverCreateWithoutClientInput, DriverUncheckedCreateWithoutClientInput>
  }

  export type DriverUpdateWithWhereUniqueWithoutClientInput = {
    where: DriverWhereUniqueInput
    data: XOR<DriverUpdateWithoutClientInput, DriverUncheckedUpdateWithoutClientInput>
  }

  export type DriverUpdateManyWithWhereWithoutClientInput = {
    where: DriverScalarWhereInput
    data: XOR<DriverUpdateManyMutationInput, DriverUncheckedUpdateManyWithoutClientInput>
  }

  export type DriverScalarWhereInput = {
    AND?: DriverScalarWhereInput | DriverScalarWhereInput[]
    OR?: DriverScalarWhereInput[]
    NOT?: DriverScalarWhereInput | DriverScalarWhereInput[]
    id?: StringFilter<"Driver"> | string
    userId?: StringFilter<"Driver"> | string
    clientId?: StringFilter<"Driver"> | string
    licensePlate?: StringFilter<"Driver"> | string
    status?: EnumDriverStatusFilter<"Driver"> | $Enums.DriverStatus
    workDays?: IntNullableListFilter<"Driver">
    currentBalance?: DecimalFilter<"Driver"> | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFilter<"Driver"> | Date | string
    updatedAt?: DateTimeFilter<"Driver"> | Date | string
  }

  export type WalletUpsertWithoutUserInput = {
    update: XOR<WalletUpdateWithoutUserInput, WalletUncheckedUpdateWithoutUserInput>
    create: XOR<WalletCreateWithoutUserInput, WalletUncheckedCreateWithoutUserInput>
    where?: WalletWhereInput
  }

  export type WalletUpdateToOneWithWhereWithoutUserInput = {
    where?: WalletWhereInput
    data: XOR<WalletUpdateWithoutUserInput, WalletUncheckedUpdateWithoutUserInput>
  }

  export type WalletUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    balance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currency?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    transactions?: TransactionUpdateManyWithoutWalletNestedInput
  }

  export type WalletUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    balance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currency?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    transactions?: TransactionUncheckedUpdateManyWithoutWalletNestedInput
  }

  export type TicketUpsertWithWhereUniqueWithoutPassengerInput = {
    where: TicketWhereUniqueInput
    update: XOR<TicketUpdateWithoutPassengerInput, TicketUncheckedUpdateWithoutPassengerInput>
    create: XOR<TicketCreateWithoutPassengerInput, TicketUncheckedCreateWithoutPassengerInput>
  }

  export type TicketUpdateWithWhereUniqueWithoutPassengerInput = {
    where: TicketWhereUniqueInput
    data: XOR<TicketUpdateWithoutPassengerInput, TicketUncheckedUpdateWithoutPassengerInput>
  }

  export type TicketUpdateManyWithWhereWithoutPassengerInput = {
    where: TicketScalarWhereInput
    data: XOR<TicketUpdateManyMutationInput, TicketUncheckedUpdateManyWithoutPassengerInput>
  }

  export type TicketScalarWhereInput = {
    AND?: TicketScalarWhereInput | TicketScalarWhereInput[]
    OR?: TicketScalarWhereInput[]
    NOT?: TicketScalarWhereInput | TicketScalarWhereInput[]
    id?: StringFilter<"Ticket"> | string
    passengerId?: StringFilter<"Ticket"> | string
    driverId?: StringFilter<"Ticket"> | string
    issuedById?: StringFilter<"Ticket"> | string
    amount?: DecimalFilter<"Ticket"> | Decimal | DecimalJsLike | number | string
    status?: EnumTicketStatusFilter<"Ticket"> | $Enums.TicketStatus
    qrNonce?: StringFilter<"Ticket"> | string
    shortCode?: StringNullableFilter<"Ticket"> | string | null
    transferredToId?: StringNullableFilter<"Ticket"> | string | null
    transferredAt?: DateTimeNullableFilter<"Ticket"> | Date | string | null
    cancelReason?: StringNullableFilter<"Ticket"> | string | null
    cancelledById?: StringNullableFilter<"Ticket"> | string | null
    usedAt?: DateTimeNullableFilter<"Ticket"> | Date | string | null
    expiresAt?: DateTimeFilter<"Ticket"> | Date | string
    createdAt?: DateTimeFilter<"Ticket"> | Date | string
    updatedAt?: DateTimeFilter<"Ticket"> | Date | string
  }

  export type TicketUpsertWithWhereUniqueWithoutIssuedByInput = {
    where: TicketWhereUniqueInput
    update: XOR<TicketUpdateWithoutIssuedByInput, TicketUncheckedUpdateWithoutIssuedByInput>
    create: XOR<TicketCreateWithoutIssuedByInput, TicketUncheckedCreateWithoutIssuedByInput>
  }

  export type TicketUpdateWithWhereUniqueWithoutIssuedByInput = {
    where: TicketWhereUniqueInput
    data: XOR<TicketUpdateWithoutIssuedByInput, TicketUncheckedUpdateWithoutIssuedByInput>
  }

  export type TicketUpdateManyWithWhereWithoutIssuedByInput = {
    where: TicketScalarWhereInput
    data: XOR<TicketUpdateManyMutationInput, TicketUncheckedUpdateManyWithoutIssuedByInput>
  }

  export type TicketUpsertWithWhereUniqueWithoutTransferredToInput = {
    where: TicketWhereUniqueInput
    update: XOR<TicketUpdateWithoutTransferredToInput, TicketUncheckedUpdateWithoutTransferredToInput>
    create: XOR<TicketCreateWithoutTransferredToInput, TicketUncheckedCreateWithoutTransferredToInput>
  }

  export type TicketUpdateWithWhereUniqueWithoutTransferredToInput = {
    where: TicketWhereUniqueInput
    data: XOR<TicketUpdateWithoutTransferredToInput, TicketUncheckedUpdateWithoutTransferredToInput>
  }

  export type TicketUpdateManyWithWhereWithoutTransferredToInput = {
    where: TicketScalarWhereInput
    data: XOR<TicketUpdateManyMutationInput, TicketUncheckedUpdateManyWithoutTransferredToInput>
  }

  export type LotadorPartnerUpsertWithWhereUniqueWithoutLotadorInput = {
    where: LotadorPartnerWhereUniqueInput
    update: XOR<LotadorPartnerUpdateWithoutLotadorInput, LotadorPartnerUncheckedUpdateWithoutLotadorInput>
    create: XOR<LotadorPartnerCreateWithoutLotadorInput, LotadorPartnerUncheckedCreateWithoutLotadorInput>
  }

  export type LotadorPartnerUpdateWithWhereUniqueWithoutLotadorInput = {
    where: LotadorPartnerWhereUniqueInput
    data: XOR<LotadorPartnerUpdateWithoutLotadorInput, LotadorPartnerUncheckedUpdateWithoutLotadorInput>
  }

  export type LotadorPartnerUpdateManyWithWhereWithoutLotadorInput = {
    where: LotadorPartnerScalarWhereInput
    data: XOR<LotadorPartnerUpdateManyMutationInput, LotadorPartnerUncheckedUpdateManyWithoutLotadorInput>
  }

  export type LotadorPartnerScalarWhereInput = {
    AND?: LotadorPartnerScalarWhereInput | LotadorPartnerScalarWhereInput[]
    OR?: LotadorPartnerScalarWhereInput[]
    NOT?: LotadorPartnerScalarWhereInput | LotadorPartnerScalarWhereInput[]
    id?: StringFilter<"LotadorPartner"> | string
    driverId?: StringFilter<"LotadorPartner"> | string
    lotadorUserId?: StringFilter<"LotadorPartner"> | string
    referenceCode?: StringFilter<"LotadorPartner"> | string
    isActive?: BoolFilter<"LotadorPartner"> | boolean
    createdAt?: DateTimeFilter<"LotadorPartner"> | Date | string
  }

  export type AuditLogUpsertWithWhereUniqueWithoutUserInput = {
    where: AuditLogWhereUniqueInput
    update: XOR<AuditLogUpdateWithoutUserInput, AuditLogUncheckedUpdateWithoutUserInput>
    create: XOR<AuditLogCreateWithoutUserInput, AuditLogUncheckedCreateWithoutUserInput>
  }

  export type AuditLogUpdateWithWhereUniqueWithoutUserInput = {
    where: AuditLogWhereUniqueInput
    data: XOR<AuditLogUpdateWithoutUserInput, AuditLogUncheckedUpdateWithoutUserInput>
  }

  export type AuditLogUpdateManyWithWhereWithoutUserInput = {
    where: AuditLogScalarWhereInput
    data: XOR<AuditLogUpdateManyMutationInput, AuditLogUncheckedUpdateManyWithoutUserInput>
  }

  export type AuditLogScalarWhereInput = {
    AND?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
    OR?: AuditLogScalarWhereInput[]
    NOT?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
    id?: StringFilter<"AuditLog"> | string
    userId?: StringFilter<"AuditLog"> | string
    action?: StringFilter<"AuditLog"> | string
    entityType?: StringFilter<"AuditLog"> | string
    entityId?: StringFilter<"AuditLog"> | string
    metadata?: JsonNullableFilter<"AuditLog">
    ipAddress?: StringNullableFilter<"AuditLog"> | string | null
    createdAt?: DateTimeFilter<"AuditLog"> | Date | string
  }

  export type UserCreateWithoutAgentProfileInput = {
    id?: string
    phone?: string | null
    displayId?: string | null
    name: string
    pinHash?: string | null
    passwordHash?: string | null
    role: $Enums.Role
    isActive?: boolean
    isBlocked?: boolean
    blockReason?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    createdBy?: UserCreateNestedOneWithoutCreatedUsersInput
    createdUsers?: UserCreateNestedManyWithoutCreatedByInput
    adminAgents?: AgentCreateNestedManyWithoutAdminInput
    driverProfile?: DriverCreateNestedOneWithoutUserInput
    clientDrivers?: DriverCreateNestedManyWithoutClientInput
    wallet?: WalletCreateNestedOneWithoutUserInput
    ticketsAsPassenger?: TicketCreateNestedManyWithoutPassengerInput
    ticketsEmitted?: TicketCreateNestedManyWithoutIssuedByInput
    ticketsTransferredTo?: TicketCreateNestedManyWithoutTransferredToInput
    lotadorPartnerships?: LotadorPartnerCreateNestedManyWithoutLotadorInput
    auditLogs?: AuditLogCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutAgentProfileInput = {
    id?: string
    phone?: string | null
    displayId?: string | null
    name: string
    pinHash?: string | null
    passwordHash?: string | null
    role: $Enums.Role
    isActive?: boolean
    isBlocked?: boolean
    blockReason?: string | null
    createdById?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    createdUsers?: UserUncheckedCreateNestedManyWithoutCreatedByInput
    adminAgents?: AgentUncheckedCreateNestedManyWithoutAdminInput
    driverProfile?: DriverUncheckedCreateNestedOneWithoutUserInput
    clientDrivers?: DriverUncheckedCreateNestedManyWithoutClientInput
    wallet?: WalletUncheckedCreateNestedOneWithoutUserInput
    ticketsAsPassenger?: TicketUncheckedCreateNestedManyWithoutPassengerInput
    ticketsEmitted?: TicketUncheckedCreateNestedManyWithoutIssuedByInput
    ticketsTransferredTo?: TicketUncheckedCreateNestedManyWithoutTransferredToInput
    lotadorPartnerships?: LotadorPartnerUncheckedCreateNestedManyWithoutLotadorInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutAgentProfileInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAgentProfileInput, UserUncheckedCreateWithoutAgentProfileInput>
  }

  export type UserCreateWithoutAdminAgentsInput = {
    id?: string
    phone?: string | null
    displayId?: string | null
    name: string
    pinHash?: string | null
    passwordHash?: string | null
    role: $Enums.Role
    isActive?: boolean
    isBlocked?: boolean
    blockReason?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    createdBy?: UserCreateNestedOneWithoutCreatedUsersInput
    createdUsers?: UserCreateNestedManyWithoutCreatedByInput
    agentProfile?: AgentCreateNestedOneWithoutUserInput
    driverProfile?: DriverCreateNestedOneWithoutUserInput
    clientDrivers?: DriverCreateNestedManyWithoutClientInput
    wallet?: WalletCreateNestedOneWithoutUserInput
    ticketsAsPassenger?: TicketCreateNestedManyWithoutPassengerInput
    ticketsEmitted?: TicketCreateNestedManyWithoutIssuedByInput
    ticketsTransferredTo?: TicketCreateNestedManyWithoutTransferredToInput
    lotadorPartnerships?: LotadorPartnerCreateNestedManyWithoutLotadorInput
    auditLogs?: AuditLogCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutAdminAgentsInput = {
    id?: string
    phone?: string | null
    displayId?: string | null
    name: string
    pinHash?: string | null
    passwordHash?: string | null
    role: $Enums.Role
    isActive?: boolean
    isBlocked?: boolean
    blockReason?: string | null
    createdById?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    createdUsers?: UserUncheckedCreateNestedManyWithoutCreatedByInput
    agentProfile?: AgentUncheckedCreateNestedOneWithoutUserInput
    driverProfile?: DriverUncheckedCreateNestedOneWithoutUserInput
    clientDrivers?: DriverUncheckedCreateNestedManyWithoutClientInput
    wallet?: WalletUncheckedCreateNestedOneWithoutUserInput
    ticketsAsPassenger?: TicketUncheckedCreateNestedManyWithoutPassengerInput
    ticketsEmitted?: TicketUncheckedCreateNestedManyWithoutIssuedByInput
    ticketsTransferredTo?: TicketUncheckedCreateNestedManyWithoutTransferredToInput
    lotadorPartnerships?: LotadorPartnerUncheckedCreateNestedManyWithoutLotadorInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutAdminAgentsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAdminAgentsInput, UserUncheckedCreateWithoutAdminAgentsInput>
  }

  export type UserUpsertWithoutAgentProfileInput = {
    update: XOR<UserUpdateWithoutAgentProfileInput, UserUncheckedUpdateWithoutAgentProfileInput>
    create: XOR<UserCreateWithoutAgentProfileInput, UserUncheckedCreateWithoutAgentProfileInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAgentProfileInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAgentProfileInput, UserUncheckedUpdateWithoutAgentProfileInput>
  }

  export type UserUpdateWithoutAgentProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    displayId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    pinHash?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isBlocked?: BoolFieldUpdateOperationsInput | boolean
    blockReason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdBy?: UserUpdateOneWithoutCreatedUsersNestedInput
    createdUsers?: UserUpdateManyWithoutCreatedByNestedInput
    adminAgents?: AgentUpdateManyWithoutAdminNestedInput
    driverProfile?: DriverUpdateOneWithoutUserNestedInput
    clientDrivers?: DriverUpdateManyWithoutClientNestedInput
    wallet?: WalletUpdateOneWithoutUserNestedInput
    ticketsAsPassenger?: TicketUpdateManyWithoutPassengerNestedInput
    ticketsEmitted?: TicketUpdateManyWithoutIssuedByNestedInput
    ticketsTransferredTo?: TicketUpdateManyWithoutTransferredToNestedInput
    lotadorPartnerships?: LotadorPartnerUpdateManyWithoutLotadorNestedInput
    auditLogs?: AuditLogUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutAgentProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    displayId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    pinHash?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isBlocked?: BoolFieldUpdateOperationsInput | boolean
    blockReason?: NullableStringFieldUpdateOperationsInput | string | null
    createdById?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdUsers?: UserUncheckedUpdateManyWithoutCreatedByNestedInput
    adminAgents?: AgentUncheckedUpdateManyWithoutAdminNestedInput
    driverProfile?: DriverUncheckedUpdateOneWithoutUserNestedInput
    clientDrivers?: DriverUncheckedUpdateManyWithoutClientNestedInput
    wallet?: WalletUncheckedUpdateOneWithoutUserNestedInput
    ticketsAsPassenger?: TicketUncheckedUpdateManyWithoutPassengerNestedInput
    ticketsEmitted?: TicketUncheckedUpdateManyWithoutIssuedByNestedInput
    ticketsTransferredTo?: TicketUncheckedUpdateManyWithoutTransferredToNestedInput
    lotadorPartnerships?: LotadorPartnerUncheckedUpdateManyWithoutLotadorNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserUpsertWithoutAdminAgentsInput = {
    update: XOR<UserUpdateWithoutAdminAgentsInput, UserUncheckedUpdateWithoutAdminAgentsInput>
    create: XOR<UserCreateWithoutAdminAgentsInput, UserUncheckedCreateWithoutAdminAgentsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAdminAgentsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAdminAgentsInput, UserUncheckedUpdateWithoutAdminAgentsInput>
  }

  export type UserUpdateWithoutAdminAgentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    displayId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    pinHash?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isBlocked?: BoolFieldUpdateOperationsInput | boolean
    blockReason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdBy?: UserUpdateOneWithoutCreatedUsersNestedInput
    createdUsers?: UserUpdateManyWithoutCreatedByNestedInput
    agentProfile?: AgentUpdateOneWithoutUserNestedInput
    driverProfile?: DriverUpdateOneWithoutUserNestedInput
    clientDrivers?: DriverUpdateManyWithoutClientNestedInput
    wallet?: WalletUpdateOneWithoutUserNestedInput
    ticketsAsPassenger?: TicketUpdateManyWithoutPassengerNestedInput
    ticketsEmitted?: TicketUpdateManyWithoutIssuedByNestedInput
    ticketsTransferredTo?: TicketUpdateManyWithoutTransferredToNestedInput
    lotadorPartnerships?: LotadorPartnerUpdateManyWithoutLotadorNestedInput
    auditLogs?: AuditLogUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutAdminAgentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    displayId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    pinHash?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isBlocked?: BoolFieldUpdateOperationsInput | boolean
    blockReason?: NullableStringFieldUpdateOperationsInput | string | null
    createdById?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdUsers?: UserUncheckedUpdateManyWithoutCreatedByNestedInput
    agentProfile?: AgentUncheckedUpdateOneWithoutUserNestedInput
    driverProfile?: DriverUncheckedUpdateOneWithoutUserNestedInput
    clientDrivers?: DriverUncheckedUpdateManyWithoutClientNestedInput
    wallet?: WalletUncheckedUpdateOneWithoutUserNestedInput
    ticketsAsPassenger?: TicketUncheckedUpdateManyWithoutPassengerNestedInput
    ticketsEmitted?: TicketUncheckedUpdateManyWithoutIssuedByNestedInput
    ticketsTransferredTo?: TicketUncheckedUpdateManyWithoutTransferredToNestedInput
    lotadorPartnerships?: LotadorPartnerUncheckedUpdateManyWithoutLotadorNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutDriverProfileInput = {
    id?: string
    phone?: string | null
    displayId?: string | null
    name: string
    pinHash?: string | null
    passwordHash?: string | null
    role: $Enums.Role
    isActive?: boolean
    isBlocked?: boolean
    blockReason?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    createdBy?: UserCreateNestedOneWithoutCreatedUsersInput
    createdUsers?: UserCreateNestedManyWithoutCreatedByInput
    agentProfile?: AgentCreateNestedOneWithoutUserInput
    adminAgents?: AgentCreateNestedManyWithoutAdminInput
    clientDrivers?: DriverCreateNestedManyWithoutClientInput
    wallet?: WalletCreateNestedOneWithoutUserInput
    ticketsAsPassenger?: TicketCreateNestedManyWithoutPassengerInput
    ticketsEmitted?: TicketCreateNestedManyWithoutIssuedByInput
    ticketsTransferredTo?: TicketCreateNestedManyWithoutTransferredToInput
    lotadorPartnerships?: LotadorPartnerCreateNestedManyWithoutLotadorInput
    auditLogs?: AuditLogCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutDriverProfileInput = {
    id?: string
    phone?: string | null
    displayId?: string | null
    name: string
    pinHash?: string | null
    passwordHash?: string | null
    role: $Enums.Role
    isActive?: boolean
    isBlocked?: boolean
    blockReason?: string | null
    createdById?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    createdUsers?: UserUncheckedCreateNestedManyWithoutCreatedByInput
    agentProfile?: AgentUncheckedCreateNestedOneWithoutUserInput
    adminAgents?: AgentUncheckedCreateNestedManyWithoutAdminInput
    clientDrivers?: DriverUncheckedCreateNestedManyWithoutClientInput
    wallet?: WalletUncheckedCreateNestedOneWithoutUserInput
    ticketsAsPassenger?: TicketUncheckedCreateNestedManyWithoutPassengerInput
    ticketsEmitted?: TicketUncheckedCreateNestedManyWithoutIssuedByInput
    ticketsTransferredTo?: TicketUncheckedCreateNestedManyWithoutTransferredToInput
    lotadorPartnerships?: LotadorPartnerUncheckedCreateNestedManyWithoutLotadorInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutDriverProfileInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutDriverProfileInput, UserUncheckedCreateWithoutDriverProfileInput>
  }

  export type UserCreateWithoutClientDriversInput = {
    id?: string
    phone?: string | null
    displayId?: string | null
    name: string
    pinHash?: string | null
    passwordHash?: string | null
    role: $Enums.Role
    isActive?: boolean
    isBlocked?: boolean
    blockReason?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    createdBy?: UserCreateNestedOneWithoutCreatedUsersInput
    createdUsers?: UserCreateNestedManyWithoutCreatedByInput
    agentProfile?: AgentCreateNestedOneWithoutUserInput
    adminAgents?: AgentCreateNestedManyWithoutAdminInput
    driverProfile?: DriverCreateNestedOneWithoutUserInput
    wallet?: WalletCreateNestedOneWithoutUserInput
    ticketsAsPassenger?: TicketCreateNestedManyWithoutPassengerInput
    ticketsEmitted?: TicketCreateNestedManyWithoutIssuedByInput
    ticketsTransferredTo?: TicketCreateNestedManyWithoutTransferredToInput
    lotadorPartnerships?: LotadorPartnerCreateNestedManyWithoutLotadorInput
    auditLogs?: AuditLogCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutClientDriversInput = {
    id?: string
    phone?: string | null
    displayId?: string | null
    name: string
    pinHash?: string | null
    passwordHash?: string | null
    role: $Enums.Role
    isActive?: boolean
    isBlocked?: boolean
    blockReason?: string | null
    createdById?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    createdUsers?: UserUncheckedCreateNestedManyWithoutCreatedByInput
    agentProfile?: AgentUncheckedCreateNestedOneWithoutUserInput
    adminAgents?: AgentUncheckedCreateNestedManyWithoutAdminInput
    driverProfile?: DriverUncheckedCreateNestedOneWithoutUserInput
    wallet?: WalletUncheckedCreateNestedOneWithoutUserInput
    ticketsAsPassenger?: TicketUncheckedCreateNestedManyWithoutPassengerInput
    ticketsEmitted?: TicketUncheckedCreateNestedManyWithoutIssuedByInput
    ticketsTransferredTo?: TicketUncheckedCreateNestedManyWithoutTransferredToInput
    lotadorPartnerships?: LotadorPartnerUncheckedCreateNestedManyWithoutLotadorInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutClientDriversInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutClientDriversInput, UserUncheckedCreateWithoutClientDriversInput>
  }

  export type TicketCreateWithoutDriverInput = {
    id?: string
    amount: Decimal | DecimalJsLike | number | string
    status?: $Enums.TicketStatus
    qrNonce: string
    shortCode?: string | null
    transferredAt?: Date | string | null
    cancelReason?: string | null
    cancelledById?: string | null
    usedAt?: Date | string | null
    expiresAt: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    passenger: UserCreateNestedOneWithoutTicketsAsPassengerInput
    issuedBy: UserCreateNestedOneWithoutTicketsEmittedInput
    transferredTo?: UserCreateNestedOneWithoutTicketsTransferredToInput
    transaction?: TransactionCreateNestedOneWithoutTicketInput
  }

  export type TicketUncheckedCreateWithoutDriverInput = {
    id?: string
    passengerId: string
    issuedById: string
    amount: Decimal | DecimalJsLike | number | string
    status?: $Enums.TicketStatus
    qrNonce: string
    shortCode?: string | null
    transferredToId?: string | null
    transferredAt?: Date | string | null
    cancelReason?: string | null
    cancelledById?: string | null
    usedAt?: Date | string | null
    expiresAt: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    transaction?: TransactionUncheckedCreateNestedOneWithoutTicketInput
  }

  export type TicketCreateOrConnectWithoutDriverInput = {
    where: TicketWhereUniqueInput
    create: XOR<TicketCreateWithoutDriverInput, TicketUncheckedCreateWithoutDriverInput>
  }

  export type TicketCreateManyDriverInputEnvelope = {
    data: TicketCreateManyDriverInput | TicketCreateManyDriverInput[]
    skipDuplicates?: boolean
  }

  export type LocationEventCreateWithoutDriverInput = {
    id?: string
    lat: number
    lng: number
    speed?: number
    heading?: number | null
    recordedAt: Date | string
  }

  export type LocationEventUncheckedCreateWithoutDriverInput = {
    id?: string
    lat: number
    lng: number
    speed?: number
    heading?: number | null
    recordedAt: Date | string
  }

  export type LocationEventCreateOrConnectWithoutDriverInput = {
    where: LocationEventWhereUniqueInput
    create: XOR<LocationEventCreateWithoutDriverInput, LocationEventUncheckedCreateWithoutDriverInput>
  }

  export type LocationEventCreateManyDriverInputEnvelope = {
    data: LocationEventCreateManyDriverInput | LocationEventCreateManyDriverInput[]
    skipDuplicates?: boolean
  }

  export type LotadorPartnerCreateWithoutDriverInput = {
    id?: string
    referenceCode: string
    isActive?: boolean
    createdAt?: Date | string
    lotador: UserCreateNestedOneWithoutLotadorPartnershipsInput
  }

  export type LotadorPartnerUncheckedCreateWithoutDriverInput = {
    id?: string
    lotadorUserId: string
    referenceCode: string
    isActive?: boolean
    createdAt?: Date | string
  }

  export type LotadorPartnerCreateOrConnectWithoutDriverInput = {
    where: LotadorPartnerWhereUniqueInput
    create: XOR<LotadorPartnerCreateWithoutDriverInput, LotadorPartnerUncheckedCreateWithoutDriverInput>
  }

  export type LotadorPartnerCreateManyDriverInputEnvelope = {
    data: LotadorPartnerCreateManyDriverInput | LotadorPartnerCreateManyDriverInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutDriverProfileInput = {
    update: XOR<UserUpdateWithoutDriverProfileInput, UserUncheckedUpdateWithoutDriverProfileInput>
    create: XOR<UserCreateWithoutDriverProfileInput, UserUncheckedCreateWithoutDriverProfileInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutDriverProfileInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutDriverProfileInput, UserUncheckedUpdateWithoutDriverProfileInput>
  }

  export type UserUpdateWithoutDriverProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    displayId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    pinHash?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isBlocked?: BoolFieldUpdateOperationsInput | boolean
    blockReason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdBy?: UserUpdateOneWithoutCreatedUsersNestedInput
    createdUsers?: UserUpdateManyWithoutCreatedByNestedInput
    agentProfile?: AgentUpdateOneWithoutUserNestedInput
    adminAgents?: AgentUpdateManyWithoutAdminNestedInput
    clientDrivers?: DriverUpdateManyWithoutClientNestedInput
    wallet?: WalletUpdateOneWithoutUserNestedInput
    ticketsAsPassenger?: TicketUpdateManyWithoutPassengerNestedInput
    ticketsEmitted?: TicketUpdateManyWithoutIssuedByNestedInput
    ticketsTransferredTo?: TicketUpdateManyWithoutTransferredToNestedInput
    lotadorPartnerships?: LotadorPartnerUpdateManyWithoutLotadorNestedInput
    auditLogs?: AuditLogUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutDriverProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    displayId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    pinHash?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isBlocked?: BoolFieldUpdateOperationsInput | boolean
    blockReason?: NullableStringFieldUpdateOperationsInput | string | null
    createdById?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdUsers?: UserUncheckedUpdateManyWithoutCreatedByNestedInput
    agentProfile?: AgentUncheckedUpdateOneWithoutUserNestedInput
    adminAgents?: AgentUncheckedUpdateManyWithoutAdminNestedInput
    clientDrivers?: DriverUncheckedUpdateManyWithoutClientNestedInput
    wallet?: WalletUncheckedUpdateOneWithoutUserNestedInput
    ticketsAsPassenger?: TicketUncheckedUpdateManyWithoutPassengerNestedInput
    ticketsEmitted?: TicketUncheckedUpdateManyWithoutIssuedByNestedInput
    ticketsTransferredTo?: TicketUncheckedUpdateManyWithoutTransferredToNestedInput
    lotadorPartnerships?: LotadorPartnerUncheckedUpdateManyWithoutLotadorNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserUpsertWithoutClientDriversInput = {
    update: XOR<UserUpdateWithoutClientDriversInput, UserUncheckedUpdateWithoutClientDriversInput>
    create: XOR<UserCreateWithoutClientDriversInput, UserUncheckedCreateWithoutClientDriversInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutClientDriversInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutClientDriversInput, UserUncheckedUpdateWithoutClientDriversInput>
  }

  export type UserUpdateWithoutClientDriversInput = {
    id?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    displayId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    pinHash?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isBlocked?: BoolFieldUpdateOperationsInput | boolean
    blockReason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdBy?: UserUpdateOneWithoutCreatedUsersNestedInput
    createdUsers?: UserUpdateManyWithoutCreatedByNestedInput
    agentProfile?: AgentUpdateOneWithoutUserNestedInput
    adminAgents?: AgentUpdateManyWithoutAdminNestedInput
    driverProfile?: DriverUpdateOneWithoutUserNestedInput
    wallet?: WalletUpdateOneWithoutUserNestedInput
    ticketsAsPassenger?: TicketUpdateManyWithoutPassengerNestedInput
    ticketsEmitted?: TicketUpdateManyWithoutIssuedByNestedInput
    ticketsTransferredTo?: TicketUpdateManyWithoutTransferredToNestedInput
    lotadorPartnerships?: LotadorPartnerUpdateManyWithoutLotadorNestedInput
    auditLogs?: AuditLogUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutClientDriversInput = {
    id?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    displayId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    pinHash?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isBlocked?: BoolFieldUpdateOperationsInput | boolean
    blockReason?: NullableStringFieldUpdateOperationsInput | string | null
    createdById?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdUsers?: UserUncheckedUpdateManyWithoutCreatedByNestedInput
    agentProfile?: AgentUncheckedUpdateOneWithoutUserNestedInput
    adminAgents?: AgentUncheckedUpdateManyWithoutAdminNestedInput
    driverProfile?: DriverUncheckedUpdateOneWithoutUserNestedInput
    wallet?: WalletUncheckedUpdateOneWithoutUserNestedInput
    ticketsAsPassenger?: TicketUncheckedUpdateManyWithoutPassengerNestedInput
    ticketsEmitted?: TicketUncheckedUpdateManyWithoutIssuedByNestedInput
    ticketsTransferredTo?: TicketUncheckedUpdateManyWithoutTransferredToNestedInput
    lotadorPartnerships?: LotadorPartnerUncheckedUpdateManyWithoutLotadorNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutUserNestedInput
  }

  export type TicketUpsertWithWhereUniqueWithoutDriverInput = {
    where: TicketWhereUniqueInput
    update: XOR<TicketUpdateWithoutDriverInput, TicketUncheckedUpdateWithoutDriverInput>
    create: XOR<TicketCreateWithoutDriverInput, TicketUncheckedCreateWithoutDriverInput>
  }

  export type TicketUpdateWithWhereUniqueWithoutDriverInput = {
    where: TicketWhereUniqueInput
    data: XOR<TicketUpdateWithoutDriverInput, TicketUncheckedUpdateWithoutDriverInput>
  }

  export type TicketUpdateManyWithWhereWithoutDriverInput = {
    where: TicketScalarWhereInput
    data: XOR<TicketUpdateManyMutationInput, TicketUncheckedUpdateManyWithoutDriverInput>
  }

  export type LocationEventUpsertWithWhereUniqueWithoutDriverInput = {
    where: LocationEventWhereUniqueInput
    update: XOR<LocationEventUpdateWithoutDriverInput, LocationEventUncheckedUpdateWithoutDriverInput>
    create: XOR<LocationEventCreateWithoutDriverInput, LocationEventUncheckedCreateWithoutDriverInput>
  }

  export type LocationEventUpdateWithWhereUniqueWithoutDriverInput = {
    where: LocationEventWhereUniqueInput
    data: XOR<LocationEventUpdateWithoutDriverInput, LocationEventUncheckedUpdateWithoutDriverInput>
  }

  export type LocationEventUpdateManyWithWhereWithoutDriverInput = {
    where: LocationEventScalarWhereInput
    data: XOR<LocationEventUpdateManyMutationInput, LocationEventUncheckedUpdateManyWithoutDriverInput>
  }

  export type LocationEventScalarWhereInput = {
    AND?: LocationEventScalarWhereInput | LocationEventScalarWhereInput[]
    OR?: LocationEventScalarWhereInput[]
    NOT?: LocationEventScalarWhereInput | LocationEventScalarWhereInput[]
    id?: StringFilter<"LocationEvent"> | string
    driverId?: StringFilter<"LocationEvent"> | string
    lat?: FloatFilter<"LocationEvent"> | number
    lng?: FloatFilter<"LocationEvent"> | number
    speed?: FloatFilter<"LocationEvent"> | number
    heading?: FloatNullableFilter<"LocationEvent"> | number | null
    recordedAt?: DateTimeFilter<"LocationEvent"> | Date | string
  }

  export type LotadorPartnerUpsertWithWhereUniqueWithoutDriverInput = {
    where: LotadorPartnerWhereUniqueInput
    update: XOR<LotadorPartnerUpdateWithoutDriverInput, LotadorPartnerUncheckedUpdateWithoutDriverInput>
    create: XOR<LotadorPartnerCreateWithoutDriverInput, LotadorPartnerUncheckedCreateWithoutDriverInput>
  }

  export type LotadorPartnerUpdateWithWhereUniqueWithoutDriverInput = {
    where: LotadorPartnerWhereUniqueInput
    data: XOR<LotadorPartnerUpdateWithoutDriverInput, LotadorPartnerUncheckedUpdateWithoutDriverInput>
  }

  export type LotadorPartnerUpdateManyWithWhereWithoutDriverInput = {
    where: LotadorPartnerScalarWhereInput
    data: XOR<LotadorPartnerUpdateManyMutationInput, LotadorPartnerUncheckedUpdateManyWithoutDriverInput>
  }

  export type UserCreateWithoutWalletInput = {
    id?: string
    phone?: string | null
    displayId?: string | null
    name: string
    pinHash?: string | null
    passwordHash?: string | null
    role: $Enums.Role
    isActive?: boolean
    isBlocked?: boolean
    blockReason?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    createdBy?: UserCreateNestedOneWithoutCreatedUsersInput
    createdUsers?: UserCreateNestedManyWithoutCreatedByInput
    agentProfile?: AgentCreateNestedOneWithoutUserInput
    adminAgents?: AgentCreateNestedManyWithoutAdminInput
    driverProfile?: DriverCreateNestedOneWithoutUserInput
    clientDrivers?: DriverCreateNestedManyWithoutClientInput
    ticketsAsPassenger?: TicketCreateNestedManyWithoutPassengerInput
    ticketsEmitted?: TicketCreateNestedManyWithoutIssuedByInput
    ticketsTransferredTo?: TicketCreateNestedManyWithoutTransferredToInput
    lotadorPartnerships?: LotadorPartnerCreateNestedManyWithoutLotadorInput
    auditLogs?: AuditLogCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutWalletInput = {
    id?: string
    phone?: string | null
    displayId?: string | null
    name: string
    pinHash?: string | null
    passwordHash?: string | null
    role: $Enums.Role
    isActive?: boolean
    isBlocked?: boolean
    blockReason?: string | null
    createdById?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    createdUsers?: UserUncheckedCreateNestedManyWithoutCreatedByInput
    agentProfile?: AgentUncheckedCreateNestedOneWithoutUserInput
    adminAgents?: AgentUncheckedCreateNestedManyWithoutAdminInput
    driverProfile?: DriverUncheckedCreateNestedOneWithoutUserInput
    clientDrivers?: DriverUncheckedCreateNestedManyWithoutClientInput
    ticketsAsPassenger?: TicketUncheckedCreateNestedManyWithoutPassengerInput
    ticketsEmitted?: TicketUncheckedCreateNestedManyWithoutIssuedByInput
    ticketsTransferredTo?: TicketUncheckedCreateNestedManyWithoutTransferredToInput
    lotadorPartnerships?: LotadorPartnerUncheckedCreateNestedManyWithoutLotadorInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutWalletInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutWalletInput, UserUncheckedCreateWithoutWalletInput>
  }

  export type TransactionCreateWithoutWalletInput = {
    id?: string
    type: $Enums.TransactionType
    amount: Decimal | DecimalJsLike | number | string
    balanceBefore: Decimal | DecimalJsLike | number | string
    balanceAfter: Decimal | DecimalJsLike | number | string
    reference?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    ticket?: TicketCreateNestedOneWithoutTransactionInput
  }

  export type TransactionUncheckedCreateWithoutWalletInput = {
    id?: string
    ticketId?: string | null
    type: $Enums.TransactionType
    amount: Decimal | DecimalJsLike | number | string
    balanceBefore: Decimal | DecimalJsLike | number | string
    balanceAfter: Decimal | DecimalJsLike | number | string
    reference?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type TransactionCreateOrConnectWithoutWalletInput = {
    where: TransactionWhereUniqueInput
    create: XOR<TransactionCreateWithoutWalletInput, TransactionUncheckedCreateWithoutWalletInput>
  }

  export type TransactionCreateManyWalletInputEnvelope = {
    data: TransactionCreateManyWalletInput | TransactionCreateManyWalletInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutWalletInput = {
    update: XOR<UserUpdateWithoutWalletInput, UserUncheckedUpdateWithoutWalletInput>
    create: XOR<UserCreateWithoutWalletInput, UserUncheckedCreateWithoutWalletInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutWalletInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutWalletInput, UserUncheckedUpdateWithoutWalletInput>
  }

  export type UserUpdateWithoutWalletInput = {
    id?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    displayId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    pinHash?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isBlocked?: BoolFieldUpdateOperationsInput | boolean
    blockReason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdBy?: UserUpdateOneWithoutCreatedUsersNestedInput
    createdUsers?: UserUpdateManyWithoutCreatedByNestedInput
    agentProfile?: AgentUpdateOneWithoutUserNestedInput
    adminAgents?: AgentUpdateManyWithoutAdminNestedInput
    driverProfile?: DriverUpdateOneWithoutUserNestedInput
    clientDrivers?: DriverUpdateManyWithoutClientNestedInput
    ticketsAsPassenger?: TicketUpdateManyWithoutPassengerNestedInput
    ticketsEmitted?: TicketUpdateManyWithoutIssuedByNestedInput
    ticketsTransferredTo?: TicketUpdateManyWithoutTransferredToNestedInput
    lotadorPartnerships?: LotadorPartnerUpdateManyWithoutLotadorNestedInput
    auditLogs?: AuditLogUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutWalletInput = {
    id?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    displayId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    pinHash?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isBlocked?: BoolFieldUpdateOperationsInput | boolean
    blockReason?: NullableStringFieldUpdateOperationsInput | string | null
    createdById?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdUsers?: UserUncheckedUpdateManyWithoutCreatedByNestedInput
    agentProfile?: AgentUncheckedUpdateOneWithoutUserNestedInput
    adminAgents?: AgentUncheckedUpdateManyWithoutAdminNestedInput
    driverProfile?: DriverUncheckedUpdateOneWithoutUserNestedInput
    clientDrivers?: DriverUncheckedUpdateManyWithoutClientNestedInput
    ticketsAsPassenger?: TicketUncheckedUpdateManyWithoutPassengerNestedInput
    ticketsEmitted?: TicketUncheckedUpdateManyWithoutIssuedByNestedInput
    ticketsTransferredTo?: TicketUncheckedUpdateManyWithoutTransferredToNestedInput
    lotadorPartnerships?: LotadorPartnerUncheckedUpdateManyWithoutLotadorNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutUserNestedInput
  }

  export type TransactionUpsertWithWhereUniqueWithoutWalletInput = {
    where: TransactionWhereUniqueInput
    update: XOR<TransactionUpdateWithoutWalletInput, TransactionUncheckedUpdateWithoutWalletInput>
    create: XOR<TransactionCreateWithoutWalletInput, TransactionUncheckedCreateWithoutWalletInput>
  }

  export type TransactionUpdateWithWhereUniqueWithoutWalletInput = {
    where: TransactionWhereUniqueInput
    data: XOR<TransactionUpdateWithoutWalletInput, TransactionUncheckedUpdateWithoutWalletInput>
  }

  export type TransactionUpdateManyWithWhereWithoutWalletInput = {
    where: TransactionScalarWhereInput
    data: XOR<TransactionUpdateManyMutationInput, TransactionUncheckedUpdateManyWithoutWalletInput>
  }

  export type TransactionScalarWhereInput = {
    AND?: TransactionScalarWhereInput | TransactionScalarWhereInput[]
    OR?: TransactionScalarWhereInput[]
    NOT?: TransactionScalarWhereInput | TransactionScalarWhereInput[]
    id?: StringFilter<"Transaction"> | string
    walletId?: StringFilter<"Transaction"> | string
    ticketId?: StringNullableFilter<"Transaction"> | string | null
    type?: EnumTransactionTypeFilter<"Transaction"> | $Enums.TransactionType
    amount?: DecimalFilter<"Transaction"> | Decimal | DecimalJsLike | number | string
    balanceBefore?: DecimalFilter<"Transaction"> | Decimal | DecimalJsLike | number | string
    balanceAfter?: DecimalFilter<"Transaction"> | Decimal | DecimalJsLike | number | string
    reference?: StringNullableFilter<"Transaction"> | string | null
    metadata?: JsonNullableFilter<"Transaction">
    createdAt?: DateTimeFilter<"Transaction"> | Date | string
  }

  export type UserCreateWithoutTicketsAsPassengerInput = {
    id?: string
    phone?: string | null
    displayId?: string | null
    name: string
    pinHash?: string | null
    passwordHash?: string | null
    role: $Enums.Role
    isActive?: boolean
    isBlocked?: boolean
    blockReason?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    createdBy?: UserCreateNestedOneWithoutCreatedUsersInput
    createdUsers?: UserCreateNestedManyWithoutCreatedByInput
    agentProfile?: AgentCreateNestedOneWithoutUserInput
    adminAgents?: AgentCreateNestedManyWithoutAdminInput
    driverProfile?: DriverCreateNestedOneWithoutUserInput
    clientDrivers?: DriverCreateNestedManyWithoutClientInput
    wallet?: WalletCreateNestedOneWithoutUserInput
    ticketsEmitted?: TicketCreateNestedManyWithoutIssuedByInput
    ticketsTransferredTo?: TicketCreateNestedManyWithoutTransferredToInput
    lotadorPartnerships?: LotadorPartnerCreateNestedManyWithoutLotadorInput
    auditLogs?: AuditLogCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutTicketsAsPassengerInput = {
    id?: string
    phone?: string | null
    displayId?: string | null
    name: string
    pinHash?: string | null
    passwordHash?: string | null
    role: $Enums.Role
    isActive?: boolean
    isBlocked?: boolean
    blockReason?: string | null
    createdById?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    createdUsers?: UserUncheckedCreateNestedManyWithoutCreatedByInput
    agentProfile?: AgentUncheckedCreateNestedOneWithoutUserInput
    adminAgents?: AgentUncheckedCreateNestedManyWithoutAdminInput
    driverProfile?: DriverUncheckedCreateNestedOneWithoutUserInput
    clientDrivers?: DriverUncheckedCreateNestedManyWithoutClientInput
    wallet?: WalletUncheckedCreateNestedOneWithoutUserInput
    ticketsEmitted?: TicketUncheckedCreateNestedManyWithoutIssuedByInput
    ticketsTransferredTo?: TicketUncheckedCreateNestedManyWithoutTransferredToInput
    lotadorPartnerships?: LotadorPartnerUncheckedCreateNestedManyWithoutLotadorInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutTicketsAsPassengerInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutTicketsAsPassengerInput, UserUncheckedCreateWithoutTicketsAsPassengerInput>
  }

  export type DriverCreateWithoutTicketsReceivedInput = {
    id?: string
    licensePlate: string
    status?: $Enums.DriverStatus
    workDays?: DriverCreateworkDaysInput | number[]
    currentBalance?: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutDriverProfileInput
    client: UserCreateNestedOneWithoutClientDriversInput
    locationEvents?: LocationEventCreateNestedManyWithoutDriverInput
    lotadorPartnerships?: LotadorPartnerCreateNestedManyWithoutDriverInput
  }

  export type DriverUncheckedCreateWithoutTicketsReceivedInput = {
    id?: string
    userId: string
    clientId: string
    licensePlate: string
    status?: $Enums.DriverStatus
    workDays?: DriverCreateworkDaysInput | number[]
    currentBalance?: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
    locationEvents?: LocationEventUncheckedCreateNestedManyWithoutDriverInput
    lotadorPartnerships?: LotadorPartnerUncheckedCreateNestedManyWithoutDriverInput
  }

  export type DriverCreateOrConnectWithoutTicketsReceivedInput = {
    where: DriverWhereUniqueInput
    create: XOR<DriverCreateWithoutTicketsReceivedInput, DriverUncheckedCreateWithoutTicketsReceivedInput>
  }

  export type UserCreateWithoutTicketsEmittedInput = {
    id?: string
    phone?: string | null
    displayId?: string | null
    name: string
    pinHash?: string | null
    passwordHash?: string | null
    role: $Enums.Role
    isActive?: boolean
    isBlocked?: boolean
    blockReason?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    createdBy?: UserCreateNestedOneWithoutCreatedUsersInput
    createdUsers?: UserCreateNestedManyWithoutCreatedByInput
    agentProfile?: AgentCreateNestedOneWithoutUserInput
    adminAgents?: AgentCreateNestedManyWithoutAdminInput
    driverProfile?: DriverCreateNestedOneWithoutUserInput
    clientDrivers?: DriverCreateNestedManyWithoutClientInput
    wallet?: WalletCreateNestedOneWithoutUserInput
    ticketsAsPassenger?: TicketCreateNestedManyWithoutPassengerInput
    ticketsTransferredTo?: TicketCreateNestedManyWithoutTransferredToInput
    lotadorPartnerships?: LotadorPartnerCreateNestedManyWithoutLotadorInput
    auditLogs?: AuditLogCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutTicketsEmittedInput = {
    id?: string
    phone?: string | null
    displayId?: string | null
    name: string
    pinHash?: string | null
    passwordHash?: string | null
    role: $Enums.Role
    isActive?: boolean
    isBlocked?: boolean
    blockReason?: string | null
    createdById?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    createdUsers?: UserUncheckedCreateNestedManyWithoutCreatedByInput
    agentProfile?: AgentUncheckedCreateNestedOneWithoutUserInput
    adminAgents?: AgentUncheckedCreateNestedManyWithoutAdminInput
    driverProfile?: DriverUncheckedCreateNestedOneWithoutUserInput
    clientDrivers?: DriverUncheckedCreateNestedManyWithoutClientInput
    wallet?: WalletUncheckedCreateNestedOneWithoutUserInput
    ticketsAsPassenger?: TicketUncheckedCreateNestedManyWithoutPassengerInput
    ticketsTransferredTo?: TicketUncheckedCreateNestedManyWithoutTransferredToInput
    lotadorPartnerships?: LotadorPartnerUncheckedCreateNestedManyWithoutLotadorInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutTicketsEmittedInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutTicketsEmittedInput, UserUncheckedCreateWithoutTicketsEmittedInput>
  }

  export type UserCreateWithoutTicketsTransferredToInput = {
    id?: string
    phone?: string | null
    displayId?: string | null
    name: string
    pinHash?: string | null
    passwordHash?: string | null
    role: $Enums.Role
    isActive?: boolean
    isBlocked?: boolean
    blockReason?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    createdBy?: UserCreateNestedOneWithoutCreatedUsersInput
    createdUsers?: UserCreateNestedManyWithoutCreatedByInput
    agentProfile?: AgentCreateNestedOneWithoutUserInput
    adminAgents?: AgentCreateNestedManyWithoutAdminInput
    driverProfile?: DriverCreateNestedOneWithoutUserInput
    clientDrivers?: DriverCreateNestedManyWithoutClientInput
    wallet?: WalletCreateNestedOneWithoutUserInput
    ticketsAsPassenger?: TicketCreateNestedManyWithoutPassengerInput
    ticketsEmitted?: TicketCreateNestedManyWithoutIssuedByInput
    lotadorPartnerships?: LotadorPartnerCreateNestedManyWithoutLotadorInput
    auditLogs?: AuditLogCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutTicketsTransferredToInput = {
    id?: string
    phone?: string | null
    displayId?: string | null
    name: string
    pinHash?: string | null
    passwordHash?: string | null
    role: $Enums.Role
    isActive?: boolean
    isBlocked?: boolean
    blockReason?: string | null
    createdById?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    createdUsers?: UserUncheckedCreateNestedManyWithoutCreatedByInput
    agentProfile?: AgentUncheckedCreateNestedOneWithoutUserInput
    adminAgents?: AgentUncheckedCreateNestedManyWithoutAdminInput
    driverProfile?: DriverUncheckedCreateNestedOneWithoutUserInput
    clientDrivers?: DriverUncheckedCreateNestedManyWithoutClientInput
    wallet?: WalletUncheckedCreateNestedOneWithoutUserInput
    ticketsAsPassenger?: TicketUncheckedCreateNestedManyWithoutPassengerInput
    ticketsEmitted?: TicketUncheckedCreateNestedManyWithoutIssuedByInput
    lotadorPartnerships?: LotadorPartnerUncheckedCreateNestedManyWithoutLotadorInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutTicketsTransferredToInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutTicketsTransferredToInput, UserUncheckedCreateWithoutTicketsTransferredToInput>
  }

  export type TransactionCreateWithoutTicketInput = {
    id?: string
    type: $Enums.TransactionType
    amount: Decimal | DecimalJsLike | number | string
    balanceBefore: Decimal | DecimalJsLike | number | string
    balanceAfter: Decimal | DecimalJsLike | number | string
    reference?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    wallet: WalletCreateNestedOneWithoutTransactionsInput
  }

  export type TransactionUncheckedCreateWithoutTicketInput = {
    id?: string
    walletId: string
    type: $Enums.TransactionType
    amount: Decimal | DecimalJsLike | number | string
    balanceBefore: Decimal | DecimalJsLike | number | string
    balanceAfter: Decimal | DecimalJsLike | number | string
    reference?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type TransactionCreateOrConnectWithoutTicketInput = {
    where: TransactionWhereUniqueInput
    create: XOR<TransactionCreateWithoutTicketInput, TransactionUncheckedCreateWithoutTicketInput>
  }

  export type UserUpsertWithoutTicketsAsPassengerInput = {
    update: XOR<UserUpdateWithoutTicketsAsPassengerInput, UserUncheckedUpdateWithoutTicketsAsPassengerInput>
    create: XOR<UserCreateWithoutTicketsAsPassengerInput, UserUncheckedCreateWithoutTicketsAsPassengerInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutTicketsAsPassengerInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutTicketsAsPassengerInput, UserUncheckedUpdateWithoutTicketsAsPassengerInput>
  }

  export type UserUpdateWithoutTicketsAsPassengerInput = {
    id?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    displayId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    pinHash?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isBlocked?: BoolFieldUpdateOperationsInput | boolean
    blockReason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdBy?: UserUpdateOneWithoutCreatedUsersNestedInput
    createdUsers?: UserUpdateManyWithoutCreatedByNestedInput
    agentProfile?: AgentUpdateOneWithoutUserNestedInput
    adminAgents?: AgentUpdateManyWithoutAdminNestedInput
    driverProfile?: DriverUpdateOneWithoutUserNestedInput
    clientDrivers?: DriverUpdateManyWithoutClientNestedInput
    wallet?: WalletUpdateOneWithoutUserNestedInput
    ticketsEmitted?: TicketUpdateManyWithoutIssuedByNestedInput
    ticketsTransferredTo?: TicketUpdateManyWithoutTransferredToNestedInput
    lotadorPartnerships?: LotadorPartnerUpdateManyWithoutLotadorNestedInput
    auditLogs?: AuditLogUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutTicketsAsPassengerInput = {
    id?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    displayId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    pinHash?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isBlocked?: BoolFieldUpdateOperationsInput | boolean
    blockReason?: NullableStringFieldUpdateOperationsInput | string | null
    createdById?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdUsers?: UserUncheckedUpdateManyWithoutCreatedByNestedInput
    agentProfile?: AgentUncheckedUpdateOneWithoutUserNestedInput
    adminAgents?: AgentUncheckedUpdateManyWithoutAdminNestedInput
    driverProfile?: DriverUncheckedUpdateOneWithoutUserNestedInput
    clientDrivers?: DriverUncheckedUpdateManyWithoutClientNestedInput
    wallet?: WalletUncheckedUpdateOneWithoutUserNestedInput
    ticketsEmitted?: TicketUncheckedUpdateManyWithoutIssuedByNestedInput
    ticketsTransferredTo?: TicketUncheckedUpdateManyWithoutTransferredToNestedInput
    lotadorPartnerships?: LotadorPartnerUncheckedUpdateManyWithoutLotadorNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutUserNestedInput
  }

  export type DriverUpsertWithoutTicketsReceivedInput = {
    update: XOR<DriverUpdateWithoutTicketsReceivedInput, DriverUncheckedUpdateWithoutTicketsReceivedInput>
    create: XOR<DriverCreateWithoutTicketsReceivedInput, DriverUncheckedCreateWithoutTicketsReceivedInput>
    where?: DriverWhereInput
  }

  export type DriverUpdateToOneWithWhereWithoutTicketsReceivedInput = {
    where?: DriverWhereInput
    data: XOR<DriverUpdateWithoutTicketsReceivedInput, DriverUncheckedUpdateWithoutTicketsReceivedInput>
  }

  export type DriverUpdateWithoutTicketsReceivedInput = {
    id?: StringFieldUpdateOperationsInput | string
    licensePlate?: StringFieldUpdateOperationsInput | string
    status?: EnumDriverStatusFieldUpdateOperationsInput | $Enums.DriverStatus
    workDays?: DriverUpdateworkDaysInput | number[]
    currentBalance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutDriverProfileNestedInput
    client?: UserUpdateOneRequiredWithoutClientDriversNestedInput
    locationEvents?: LocationEventUpdateManyWithoutDriverNestedInput
    lotadorPartnerships?: LotadorPartnerUpdateManyWithoutDriverNestedInput
  }

  export type DriverUncheckedUpdateWithoutTicketsReceivedInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    clientId?: StringFieldUpdateOperationsInput | string
    licensePlate?: StringFieldUpdateOperationsInput | string
    status?: EnumDriverStatusFieldUpdateOperationsInput | $Enums.DriverStatus
    workDays?: DriverUpdateworkDaysInput | number[]
    currentBalance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    locationEvents?: LocationEventUncheckedUpdateManyWithoutDriverNestedInput
    lotadorPartnerships?: LotadorPartnerUncheckedUpdateManyWithoutDriverNestedInput
  }

  export type UserUpsertWithoutTicketsEmittedInput = {
    update: XOR<UserUpdateWithoutTicketsEmittedInput, UserUncheckedUpdateWithoutTicketsEmittedInput>
    create: XOR<UserCreateWithoutTicketsEmittedInput, UserUncheckedCreateWithoutTicketsEmittedInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutTicketsEmittedInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutTicketsEmittedInput, UserUncheckedUpdateWithoutTicketsEmittedInput>
  }

  export type UserUpdateWithoutTicketsEmittedInput = {
    id?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    displayId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    pinHash?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isBlocked?: BoolFieldUpdateOperationsInput | boolean
    blockReason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdBy?: UserUpdateOneWithoutCreatedUsersNestedInput
    createdUsers?: UserUpdateManyWithoutCreatedByNestedInput
    agentProfile?: AgentUpdateOneWithoutUserNestedInput
    adminAgents?: AgentUpdateManyWithoutAdminNestedInput
    driverProfile?: DriverUpdateOneWithoutUserNestedInput
    clientDrivers?: DriverUpdateManyWithoutClientNestedInput
    wallet?: WalletUpdateOneWithoutUserNestedInput
    ticketsAsPassenger?: TicketUpdateManyWithoutPassengerNestedInput
    ticketsTransferredTo?: TicketUpdateManyWithoutTransferredToNestedInput
    lotadorPartnerships?: LotadorPartnerUpdateManyWithoutLotadorNestedInput
    auditLogs?: AuditLogUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutTicketsEmittedInput = {
    id?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    displayId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    pinHash?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isBlocked?: BoolFieldUpdateOperationsInput | boolean
    blockReason?: NullableStringFieldUpdateOperationsInput | string | null
    createdById?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdUsers?: UserUncheckedUpdateManyWithoutCreatedByNestedInput
    agentProfile?: AgentUncheckedUpdateOneWithoutUserNestedInput
    adminAgents?: AgentUncheckedUpdateManyWithoutAdminNestedInput
    driverProfile?: DriverUncheckedUpdateOneWithoutUserNestedInput
    clientDrivers?: DriverUncheckedUpdateManyWithoutClientNestedInput
    wallet?: WalletUncheckedUpdateOneWithoutUserNestedInput
    ticketsAsPassenger?: TicketUncheckedUpdateManyWithoutPassengerNestedInput
    ticketsTransferredTo?: TicketUncheckedUpdateManyWithoutTransferredToNestedInput
    lotadorPartnerships?: LotadorPartnerUncheckedUpdateManyWithoutLotadorNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserUpsertWithoutTicketsTransferredToInput = {
    update: XOR<UserUpdateWithoutTicketsTransferredToInput, UserUncheckedUpdateWithoutTicketsTransferredToInput>
    create: XOR<UserCreateWithoutTicketsTransferredToInput, UserUncheckedCreateWithoutTicketsTransferredToInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutTicketsTransferredToInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutTicketsTransferredToInput, UserUncheckedUpdateWithoutTicketsTransferredToInput>
  }

  export type UserUpdateWithoutTicketsTransferredToInput = {
    id?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    displayId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    pinHash?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isBlocked?: BoolFieldUpdateOperationsInput | boolean
    blockReason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdBy?: UserUpdateOneWithoutCreatedUsersNestedInput
    createdUsers?: UserUpdateManyWithoutCreatedByNestedInput
    agentProfile?: AgentUpdateOneWithoutUserNestedInput
    adminAgents?: AgentUpdateManyWithoutAdminNestedInput
    driverProfile?: DriverUpdateOneWithoutUserNestedInput
    clientDrivers?: DriverUpdateManyWithoutClientNestedInput
    wallet?: WalletUpdateOneWithoutUserNestedInput
    ticketsAsPassenger?: TicketUpdateManyWithoutPassengerNestedInput
    ticketsEmitted?: TicketUpdateManyWithoutIssuedByNestedInput
    lotadorPartnerships?: LotadorPartnerUpdateManyWithoutLotadorNestedInput
    auditLogs?: AuditLogUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutTicketsTransferredToInput = {
    id?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    displayId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    pinHash?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isBlocked?: BoolFieldUpdateOperationsInput | boolean
    blockReason?: NullableStringFieldUpdateOperationsInput | string | null
    createdById?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdUsers?: UserUncheckedUpdateManyWithoutCreatedByNestedInput
    agentProfile?: AgentUncheckedUpdateOneWithoutUserNestedInput
    adminAgents?: AgentUncheckedUpdateManyWithoutAdminNestedInput
    driverProfile?: DriverUncheckedUpdateOneWithoutUserNestedInput
    clientDrivers?: DriverUncheckedUpdateManyWithoutClientNestedInput
    wallet?: WalletUncheckedUpdateOneWithoutUserNestedInput
    ticketsAsPassenger?: TicketUncheckedUpdateManyWithoutPassengerNestedInput
    ticketsEmitted?: TicketUncheckedUpdateManyWithoutIssuedByNestedInput
    lotadorPartnerships?: LotadorPartnerUncheckedUpdateManyWithoutLotadorNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutUserNestedInput
  }

  export type TransactionUpsertWithoutTicketInput = {
    update: XOR<TransactionUpdateWithoutTicketInput, TransactionUncheckedUpdateWithoutTicketInput>
    create: XOR<TransactionCreateWithoutTicketInput, TransactionUncheckedCreateWithoutTicketInput>
    where?: TransactionWhereInput
  }

  export type TransactionUpdateToOneWithWhereWithoutTicketInput = {
    where?: TransactionWhereInput
    data: XOR<TransactionUpdateWithoutTicketInput, TransactionUncheckedUpdateWithoutTicketInput>
  }

  export type TransactionUpdateWithoutTicketInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    balanceBefore?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    balanceAfter?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    reference?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    wallet?: WalletUpdateOneRequiredWithoutTransactionsNestedInput
  }

  export type TransactionUncheckedUpdateWithoutTicketInput = {
    id?: StringFieldUpdateOperationsInput | string
    walletId?: StringFieldUpdateOperationsInput | string
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    balanceBefore?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    balanceAfter?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    reference?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WalletCreateWithoutTransactionsInput = {
    id?: string
    balance?: Decimal | DecimalJsLike | number | string
    currency?: string
    updatedAt?: Date | string
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutWalletInput
  }

  export type WalletUncheckedCreateWithoutTransactionsInput = {
    id?: string
    userId: string
    balance?: Decimal | DecimalJsLike | number | string
    currency?: string
    updatedAt?: Date | string
    createdAt?: Date | string
  }

  export type WalletCreateOrConnectWithoutTransactionsInput = {
    where: WalletWhereUniqueInput
    create: XOR<WalletCreateWithoutTransactionsInput, WalletUncheckedCreateWithoutTransactionsInput>
  }

  export type TicketCreateWithoutTransactionInput = {
    id?: string
    amount: Decimal | DecimalJsLike | number | string
    status?: $Enums.TicketStatus
    qrNonce: string
    shortCode?: string | null
    transferredAt?: Date | string | null
    cancelReason?: string | null
    cancelledById?: string | null
    usedAt?: Date | string | null
    expiresAt: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    passenger: UserCreateNestedOneWithoutTicketsAsPassengerInput
    driver: DriverCreateNestedOneWithoutTicketsReceivedInput
    issuedBy: UserCreateNestedOneWithoutTicketsEmittedInput
    transferredTo?: UserCreateNestedOneWithoutTicketsTransferredToInput
  }

  export type TicketUncheckedCreateWithoutTransactionInput = {
    id?: string
    passengerId: string
    driverId: string
    issuedById: string
    amount: Decimal | DecimalJsLike | number | string
    status?: $Enums.TicketStatus
    qrNonce: string
    shortCode?: string | null
    transferredToId?: string | null
    transferredAt?: Date | string | null
    cancelReason?: string | null
    cancelledById?: string | null
    usedAt?: Date | string | null
    expiresAt: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TicketCreateOrConnectWithoutTransactionInput = {
    where: TicketWhereUniqueInput
    create: XOR<TicketCreateWithoutTransactionInput, TicketUncheckedCreateWithoutTransactionInput>
  }

  export type WalletUpsertWithoutTransactionsInput = {
    update: XOR<WalletUpdateWithoutTransactionsInput, WalletUncheckedUpdateWithoutTransactionsInput>
    create: XOR<WalletCreateWithoutTransactionsInput, WalletUncheckedCreateWithoutTransactionsInput>
    where?: WalletWhereInput
  }

  export type WalletUpdateToOneWithWhereWithoutTransactionsInput = {
    where?: WalletWhereInput
    data: XOR<WalletUpdateWithoutTransactionsInput, WalletUncheckedUpdateWithoutTransactionsInput>
  }

  export type WalletUpdateWithoutTransactionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    balance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currency?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutWalletNestedInput
  }

  export type WalletUncheckedUpdateWithoutTransactionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    balance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currency?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TicketUpsertWithoutTransactionInput = {
    update: XOR<TicketUpdateWithoutTransactionInput, TicketUncheckedUpdateWithoutTransactionInput>
    create: XOR<TicketCreateWithoutTransactionInput, TicketUncheckedCreateWithoutTransactionInput>
    where?: TicketWhereInput
  }

  export type TicketUpdateToOneWithWhereWithoutTransactionInput = {
    where?: TicketWhereInput
    data: XOR<TicketUpdateWithoutTransactionInput, TicketUncheckedUpdateWithoutTransactionInput>
  }

  export type TicketUpdateWithoutTransactionInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: EnumTicketStatusFieldUpdateOperationsInput | $Enums.TicketStatus
    qrNonce?: StringFieldUpdateOperationsInput | string
    shortCode?: NullableStringFieldUpdateOperationsInput | string | null
    transferredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancelReason?: NullableStringFieldUpdateOperationsInput | string | null
    cancelledById?: NullableStringFieldUpdateOperationsInput | string | null
    usedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    passenger?: UserUpdateOneRequiredWithoutTicketsAsPassengerNestedInput
    driver?: DriverUpdateOneRequiredWithoutTicketsReceivedNestedInput
    issuedBy?: UserUpdateOneRequiredWithoutTicketsEmittedNestedInput
    transferredTo?: UserUpdateOneWithoutTicketsTransferredToNestedInput
  }

  export type TicketUncheckedUpdateWithoutTransactionInput = {
    id?: StringFieldUpdateOperationsInput | string
    passengerId?: StringFieldUpdateOperationsInput | string
    driverId?: StringFieldUpdateOperationsInput | string
    issuedById?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: EnumTicketStatusFieldUpdateOperationsInput | $Enums.TicketStatus
    qrNonce?: StringFieldUpdateOperationsInput | string
    shortCode?: NullableStringFieldUpdateOperationsInput | string | null
    transferredToId?: NullableStringFieldUpdateOperationsInput | string | null
    transferredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancelReason?: NullableStringFieldUpdateOperationsInput | string | null
    cancelledById?: NullableStringFieldUpdateOperationsInput | string | null
    usedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DriverCreateWithoutLocationEventsInput = {
    id?: string
    licensePlate: string
    status?: $Enums.DriverStatus
    workDays?: DriverCreateworkDaysInput | number[]
    currentBalance?: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutDriverProfileInput
    client: UserCreateNestedOneWithoutClientDriversInput
    ticketsReceived?: TicketCreateNestedManyWithoutDriverInput
    lotadorPartnerships?: LotadorPartnerCreateNestedManyWithoutDriverInput
  }

  export type DriverUncheckedCreateWithoutLocationEventsInput = {
    id?: string
    userId: string
    clientId: string
    licensePlate: string
    status?: $Enums.DriverStatus
    workDays?: DriverCreateworkDaysInput | number[]
    currentBalance?: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
    ticketsReceived?: TicketUncheckedCreateNestedManyWithoutDriverInput
    lotadorPartnerships?: LotadorPartnerUncheckedCreateNestedManyWithoutDriverInput
  }

  export type DriverCreateOrConnectWithoutLocationEventsInput = {
    where: DriverWhereUniqueInput
    create: XOR<DriverCreateWithoutLocationEventsInput, DriverUncheckedCreateWithoutLocationEventsInput>
  }

  export type DriverUpsertWithoutLocationEventsInput = {
    update: XOR<DriverUpdateWithoutLocationEventsInput, DriverUncheckedUpdateWithoutLocationEventsInput>
    create: XOR<DriverCreateWithoutLocationEventsInput, DriverUncheckedCreateWithoutLocationEventsInput>
    where?: DriverWhereInput
  }

  export type DriverUpdateToOneWithWhereWithoutLocationEventsInput = {
    where?: DriverWhereInput
    data: XOR<DriverUpdateWithoutLocationEventsInput, DriverUncheckedUpdateWithoutLocationEventsInput>
  }

  export type DriverUpdateWithoutLocationEventsInput = {
    id?: StringFieldUpdateOperationsInput | string
    licensePlate?: StringFieldUpdateOperationsInput | string
    status?: EnumDriverStatusFieldUpdateOperationsInput | $Enums.DriverStatus
    workDays?: DriverUpdateworkDaysInput | number[]
    currentBalance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutDriverProfileNestedInput
    client?: UserUpdateOneRequiredWithoutClientDriversNestedInput
    ticketsReceived?: TicketUpdateManyWithoutDriverNestedInput
    lotadorPartnerships?: LotadorPartnerUpdateManyWithoutDriverNestedInput
  }

  export type DriverUncheckedUpdateWithoutLocationEventsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    clientId?: StringFieldUpdateOperationsInput | string
    licensePlate?: StringFieldUpdateOperationsInput | string
    status?: EnumDriverStatusFieldUpdateOperationsInput | $Enums.DriverStatus
    workDays?: DriverUpdateworkDaysInput | number[]
    currentBalance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ticketsReceived?: TicketUncheckedUpdateManyWithoutDriverNestedInput
    lotadorPartnerships?: LotadorPartnerUncheckedUpdateManyWithoutDriverNestedInput
  }

  export type DriverCreateWithoutLotadorPartnershipsInput = {
    id?: string
    licensePlate: string
    status?: $Enums.DriverStatus
    workDays?: DriverCreateworkDaysInput | number[]
    currentBalance?: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutDriverProfileInput
    client: UserCreateNestedOneWithoutClientDriversInput
    ticketsReceived?: TicketCreateNestedManyWithoutDriverInput
    locationEvents?: LocationEventCreateNestedManyWithoutDriverInput
  }

  export type DriverUncheckedCreateWithoutLotadorPartnershipsInput = {
    id?: string
    userId: string
    clientId: string
    licensePlate: string
    status?: $Enums.DriverStatus
    workDays?: DriverCreateworkDaysInput | number[]
    currentBalance?: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
    ticketsReceived?: TicketUncheckedCreateNestedManyWithoutDriverInput
    locationEvents?: LocationEventUncheckedCreateNestedManyWithoutDriverInput
  }

  export type DriverCreateOrConnectWithoutLotadorPartnershipsInput = {
    where: DriverWhereUniqueInput
    create: XOR<DriverCreateWithoutLotadorPartnershipsInput, DriverUncheckedCreateWithoutLotadorPartnershipsInput>
  }

  export type UserCreateWithoutLotadorPartnershipsInput = {
    id?: string
    phone?: string | null
    displayId?: string | null
    name: string
    pinHash?: string | null
    passwordHash?: string | null
    role: $Enums.Role
    isActive?: boolean
    isBlocked?: boolean
    blockReason?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    createdBy?: UserCreateNestedOneWithoutCreatedUsersInput
    createdUsers?: UserCreateNestedManyWithoutCreatedByInput
    agentProfile?: AgentCreateNestedOneWithoutUserInput
    adminAgents?: AgentCreateNestedManyWithoutAdminInput
    driverProfile?: DriverCreateNestedOneWithoutUserInput
    clientDrivers?: DriverCreateNestedManyWithoutClientInput
    wallet?: WalletCreateNestedOneWithoutUserInput
    ticketsAsPassenger?: TicketCreateNestedManyWithoutPassengerInput
    ticketsEmitted?: TicketCreateNestedManyWithoutIssuedByInput
    ticketsTransferredTo?: TicketCreateNestedManyWithoutTransferredToInput
    auditLogs?: AuditLogCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutLotadorPartnershipsInput = {
    id?: string
    phone?: string | null
    displayId?: string | null
    name: string
    pinHash?: string | null
    passwordHash?: string | null
    role: $Enums.Role
    isActive?: boolean
    isBlocked?: boolean
    blockReason?: string | null
    createdById?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    createdUsers?: UserUncheckedCreateNestedManyWithoutCreatedByInput
    agentProfile?: AgentUncheckedCreateNestedOneWithoutUserInput
    adminAgents?: AgentUncheckedCreateNestedManyWithoutAdminInput
    driverProfile?: DriverUncheckedCreateNestedOneWithoutUserInput
    clientDrivers?: DriverUncheckedCreateNestedManyWithoutClientInput
    wallet?: WalletUncheckedCreateNestedOneWithoutUserInput
    ticketsAsPassenger?: TicketUncheckedCreateNestedManyWithoutPassengerInput
    ticketsEmitted?: TicketUncheckedCreateNestedManyWithoutIssuedByInput
    ticketsTransferredTo?: TicketUncheckedCreateNestedManyWithoutTransferredToInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutLotadorPartnershipsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutLotadorPartnershipsInput, UserUncheckedCreateWithoutLotadorPartnershipsInput>
  }

  export type DriverUpsertWithoutLotadorPartnershipsInput = {
    update: XOR<DriverUpdateWithoutLotadorPartnershipsInput, DriverUncheckedUpdateWithoutLotadorPartnershipsInput>
    create: XOR<DriverCreateWithoutLotadorPartnershipsInput, DriverUncheckedCreateWithoutLotadorPartnershipsInput>
    where?: DriverWhereInput
  }

  export type DriverUpdateToOneWithWhereWithoutLotadorPartnershipsInput = {
    where?: DriverWhereInput
    data: XOR<DriverUpdateWithoutLotadorPartnershipsInput, DriverUncheckedUpdateWithoutLotadorPartnershipsInput>
  }

  export type DriverUpdateWithoutLotadorPartnershipsInput = {
    id?: StringFieldUpdateOperationsInput | string
    licensePlate?: StringFieldUpdateOperationsInput | string
    status?: EnumDriverStatusFieldUpdateOperationsInput | $Enums.DriverStatus
    workDays?: DriverUpdateworkDaysInput | number[]
    currentBalance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutDriverProfileNestedInput
    client?: UserUpdateOneRequiredWithoutClientDriversNestedInput
    ticketsReceived?: TicketUpdateManyWithoutDriverNestedInput
    locationEvents?: LocationEventUpdateManyWithoutDriverNestedInput
  }

  export type DriverUncheckedUpdateWithoutLotadorPartnershipsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    clientId?: StringFieldUpdateOperationsInput | string
    licensePlate?: StringFieldUpdateOperationsInput | string
    status?: EnumDriverStatusFieldUpdateOperationsInput | $Enums.DriverStatus
    workDays?: DriverUpdateworkDaysInput | number[]
    currentBalance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ticketsReceived?: TicketUncheckedUpdateManyWithoutDriverNestedInput
    locationEvents?: LocationEventUncheckedUpdateManyWithoutDriverNestedInput
  }

  export type UserUpsertWithoutLotadorPartnershipsInput = {
    update: XOR<UserUpdateWithoutLotadorPartnershipsInput, UserUncheckedUpdateWithoutLotadorPartnershipsInput>
    create: XOR<UserCreateWithoutLotadorPartnershipsInput, UserUncheckedCreateWithoutLotadorPartnershipsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutLotadorPartnershipsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutLotadorPartnershipsInput, UserUncheckedUpdateWithoutLotadorPartnershipsInput>
  }

  export type UserUpdateWithoutLotadorPartnershipsInput = {
    id?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    displayId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    pinHash?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isBlocked?: BoolFieldUpdateOperationsInput | boolean
    blockReason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdBy?: UserUpdateOneWithoutCreatedUsersNestedInput
    createdUsers?: UserUpdateManyWithoutCreatedByNestedInput
    agentProfile?: AgentUpdateOneWithoutUserNestedInput
    adminAgents?: AgentUpdateManyWithoutAdminNestedInput
    driverProfile?: DriverUpdateOneWithoutUserNestedInput
    clientDrivers?: DriverUpdateManyWithoutClientNestedInput
    wallet?: WalletUpdateOneWithoutUserNestedInput
    ticketsAsPassenger?: TicketUpdateManyWithoutPassengerNestedInput
    ticketsEmitted?: TicketUpdateManyWithoutIssuedByNestedInput
    ticketsTransferredTo?: TicketUpdateManyWithoutTransferredToNestedInput
    auditLogs?: AuditLogUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutLotadorPartnershipsInput = {
    id?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    displayId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    pinHash?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isBlocked?: BoolFieldUpdateOperationsInput | boolean
    blockReason?: NullableStringFieldUpdateOperationsInput | string | null
    createdById?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdUsers?: UserUncheckedUpdateManyWithoutCreatedByNestedInput
    agentProfile?: AgentUncheckedUpdateOneWithoutUserNestedInput
    adminAgents?: AgentUncheckedUpdateManyWithoutAdminNestedInput
    driverProfile?: DriverUncheckedUpdateOneWithoutUserNestedInput
    clientDrivers?: DriverUncheckedUpdateManyWithoutClientNestedInput
    wallet?: WalletUncheckedUpdateOneWithoutUserNestedInput
    ticketsAsPassenger?: TicketUncheckedUpdateManyWithoutPassengerNestedInput
    ticketsEmitted?: TicketUncheckedUpdateManyWithoutIssuedByNestedInput
    ticketsTransferredTo?: TicketUncheckedUpdateManyWithoutTransferredToNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutAuditLogsInput = {
    id?: string
    phone?: string | null
    displayId?: string | null
    name: string
    pinHash?: string | null
    passwordHash?: string | null
    role: $Enums.Role
    isActive?: boolean
    isBlocked?: boolean
    blockReason?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    createdBy?: UserCreateNestedOneWithoutCreatedUsersInput
    createdUsers?: UserCreateNestedManyWithoutCreatedByInput
    agentProfile?: AgentCreateNestedOneWithoutUserInput
    adminAgents?: AgentCreateNestedManyWithoutAdminInput
    driverProfile?: DriverCreateNestedOneWithoutUserInput
    clientDrivers?: DriverCreateNestedManyWithoutClientInput
    wallet?: WalletCreateNestedOneWithoutUserInput
    ticketsAsPassenger?: TicketCreateNestedManyWithoutPassengerInput
    ticketsEmitted?: TicketCreateNestedManyWithoutIssuedByInput
    ticketsTransferredTo?: TicketCreateNestedManyWithoutTransferredToInput
    lotadorPartnerships?: LotadorPartnerCreateNestedManyWithoutLotadorInput
  }

  export type UserUncheckedCreateWithoutAuditLogsInput = {
    id?: string
    phone?: string | null
    displayId?: string | null
    name: string
    pinHash?: string | null
    passwordHash?: string | null
    role: $Enums.Role
    isActive?: boolean
    isBlocked?: boolean
    blockReason?: string | null
    createdById?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    createdUsers?: UserUncheckedCreateNestedManyWithoutCreatedByInput
    agentProfile?: AgentUncheckedCreateNestedOneWithoutUserInput
    adminAgents?: AgentUncheckedCreateNestedManyWithoutAdminInput
    driverProfile?: DriverUncheckedCreateNestedOneWithoutUserInput
    clientDrivers?: DriverUncheckedCreateNestedManyWithoutClientInput
    wallet?: WalletUncheckedCreateNestedOneWithoutUserInput
    ticketsAsPassenger?: TicketUncheckedCreateNestedManyWithoutPassengerInput
    ticketsEmitted?: TicketUncheckedCreateNestedManyWithoutIssuedByInput
    ticketsTransferredTo?: TicketUncheckedCreateNestedManyWithoutTransferredToInput
    lotadorPartnerships?: LotadorPartnerUncheckedCreateNestedManyWithoutLotadorInput
  }

  export type UserCreateOrConnectWithoutAuditLogsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAuditLogsInput, UserUncheckedCreateWithoutAuditLogsInput>
  }

  export type UserUpsertWithoutAuditLogsInput = {
    update: XOR<UserUpdateWithoutAuditLogsInput, UserUncheckedUpdateWithoutAuditLogsInput>
    create: XOR<UserCreateWithoutAuditLogsInput, UserUncheckedCreateWithoutAuditLogsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAuditLogsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAuditLogsInput, UserUncheckedUpdateWithoutAuditLogsInput>
  }

  export type UserUpdateWithoutAuditLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    displayId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    pinHash?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isBlocked?: BoolFieldUpdateOperationsInput | boolean
    blockReason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdBy?: UserUpdateOneWithoutCreatedUsersNestedInput
    createdUsers?: UserUpdateManyWithoutCreatedByNestedInput
    agentProfile?: AgentUpdateOneWithoutUserNestedInput
    adminAgents?: AgentUpdateManyWithoutAdminNestedInput
    driverProfile?: DriverUpdateOneWithoutUserNestedInput
    clientDrivers?: DriverUpdateManyWithoutClientNestedInput
    wallet?: WalletUpdateOneWithoutUserNestedInput
    ticketsAsPassenger?: TicketUpdateManyWithoutPassengerNestedInput
    ticketsEmitted?: TicketUpdateManyWithoutIssuedByNestedInput
    ticketsTransferredTo?: TicketUpdateManyWithoutTransferredToNestedInput
    lotadorPartnerships?: LotadorPartnerUpdateManyWithoutLotadorNestedInput
  }

  export type UserUncheckedUpdateWithoutAuditLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    displayId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    pinHash?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isBlocked?: BoolFieldUpdateOperationsInput | boolean
    blockReason?: NullableStringFieldUpdateOperationsInput | string | null
    createdById?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdUsers?: UserUncheckedUpdateManyWithoutCreatedByNestedInput
    agentProfile?: AgentUncheckedUpdateOneWithoutUserNestedInput
    adminAgents?: AgentUncheckedUpdateManyWithoutAdminNestedInput
    driverProfile?: DriverUncheckedUpdateOneWithoutUserNestedInput
    clientDrivers?: DriverUncheckedUpdateManyWithoutClientNestedInput
    wallet?: WalletUncheckedUpdateOneWithoutUserNestedInput
    ticketsAsPassenger?: TicketUncheckedUpdateManyWithoutPassengerNestedInput
    ticketsEmitted?: TicketUncheckedUpdateManyWithoutIssuedByNestedInput
    ticketsTransferredTo?: TicketUncheckedUpdateManyWithoutTransferredToNestedInput
    lotadorPartnerships?: LotadorPartnerUncheckedUpdateManyWithoutLotadorNestedInput
  }

  export type UserCreateManyCreatedByInput = {
    id?: string
    phone?: string | null
    displayId?: string | null
    name: string
    pinHash?: string | null
    passwordHash?: string | null
    role: $Enums.Role
    isActive?: boolean
    isBlocked?: boolean
    blockReason?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
  }

  export type AgentCreateManyAdminInput = {
    id?: string
    userId: string
    isActive?: boolean
    dailyTicketLimit?: number
    permissions?: AgentCreatepermissionsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DriverCreateManyClientInput = {
    id?: string
    userId: string
    licensePlate: string
    status?: $Enums.DriverStatus
    workDays?: DriverCreateworkDaysInput | number[]
    currentBalance?: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TicketCreateManyPassengerInput = {
    id?: string
    driverId: string
    issuedById: string
    amount: Decimal | DecimalJsLike | number | string
    status?: $Enums.TicketStatus
    qrNonce: string
    shortCode?: string | null
    transferredToId?: string | null
    transferredAt?: Date | string | null
    cancelReason?: string | null
    cancelledById?: string | null
    usedAt?: Date | string | null
    expiresAt: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TicketCreateManyIssuedByInput = {
    id?: string
    passengerId: string
    driverId: string
    amount: Decimal | DecimalJsLike | number | string
    status?: $Enums.TicketStatus
    qrNonce: string
    shortCode?: string | null
    transferredToId?: string | null
    transferredAt?: Date | string | null
    cancelReason?: string | null
    cancelledById?: string | null
    usedAt?: Date | string | null
    expiresAt: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TicketCreateManyTransferredToInput = {
    id?: string
    passengerId: string
    driverId: string
    issuedById: string
    amount: Decimal | DecimalJsLike | number | string
    status?: $Enums.TicketStatus
    qrNonce: string
    shortCode?: string | null
    transferredAt?: Date | string | null
    cancelReason?: string | null
    cancelledById?: string | null
    usedAt?: Date | string | null
    expiresAt: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LotadorPartnerCreateManyLotadorInput = {
    id?: string
    driverId: string
    referenceCode: string
    isActive?: boolean
    createdAt?: Date | string
  }

  export type AuditLogCreateManyUserInput = {
    id?: string
    action: string
    entityType: string
    entityId: string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    ipAddress?: string | null
    createdAt?: Date | string
  }

  export type UserUpdateWithoutCreatedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    displayId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    pinHash?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isBlocked?: BoolFieldUpdateOperationsInput | boolean
    blockReason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdUsers?: UserUpdateManyWithoutCreatedByNestedInput
    agentProfile?: AgentUpdateOneWithoutUserNestedInput
    adminAgents?: AgentUpdateManyWithoutAdminNestedInput
    driverProfile?: DriverUpdateOneWithoutUserNestedInput
    clientDrivers?: DriverUpdateManyWithoutClientNestedInput
    wallet?: WalletUpdateOneWithoutUserNestedInput
    ticketsAsPassenger?: TicketUpdateManyWithoutPassengerNestedInput
    ticketsEmitted?: TicketUpdateManyWithoutIssuedByNestedInput
    ticketsTransferredTo?: TicketUpdateManyWithoutTransferredToNestedInput
    lotadorPartnerships?: LotadorPartnerUpdateManyWithoutLotadorNestedInput
    auditLogs?: AuditLogUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutCreatedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    displayId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    pinHash?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isBlocked?: BoolFieldUpdateOperationsInput | boolean
    blockReason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdUsers?: UserUncheckedUpdateManyWithoutCreatedByNestedInput
    agentProfile?: AgentUncheckedUpdateOneWithoutUserNestedInput
    adminAgents?: AgentUncheckedUpdateManyWithoutAdminNestedInput
    driverProfile?: DriverUncheckedUpdateOneWithoutUserNestedInput
    clientDrivers?: DriverUncheckedUpdateManyWithoutClientNestedInput
    wallet?: WalletUncheckedUpdateOneWithoutUserNestedInput
    ticketsAsPassenger?: TicketUncheckedUpdateManyWithoutPassengerNestedInput
    ticketsEmitted?: TicketUncheckedUpdateManyWithoutIssuedByNestedInput
    ticketsTransferredTo?: TicketUncheckedUpdateManyWithoutTransferredToNestedInput
    lotadorPartnerships?: LotadorPartnerUncheckedUpdateManyWithoutLotadorNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateManyWithoutCreatedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    displayId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    pinHash?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isBlocked?: BoolFieldUpdateOperationsInput | boolean
    blockReason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type AgentUpdateWithoutAdminInput = {
    id?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    dailyTicketLimit?: IntFieldUpdateOperationsInput | number
    permissions?: AgentUpdatepermissionsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutAgentProfileNestedInput
  }

  export type AgentUncheckedUpdateWithoutAdminInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    dailyTicketLimit?: IntFieldUpdateOperationsInput | number
    permissions?: AgentUpdatepermissionsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AgentUncheckedUpdateManyWithoutAdminInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    dailyTicketLimit?: IntFieldUpdateOperationsInput | number
    permissions?: AgentUpdatepermissionsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DriverUpdateWithoutClientInput = {
    id?: StringFieldUpdateOperationsInput | string
    licensePlate?: StringFieldUpdateOperationsInput | string
    status?: EnumDriverStatusFieldUpdateOperationsInput | $Enums.DriverStatus
    workDays?: DriverUpdateworkDaysInput | number[]
    currentBalance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutDriverProfileNestedInput
    ticketsReceived?: TicketUpdateManyWithoutDriverNestedInput
    locationEvents?: LocationEventUpdateManyWithoutDriverNestedInput
    lotadorPartnerships?: LotadorPartnerUpdateManyWithoutDriverNestedInput
  }

  export type DriverUncheckedUpdateWithoutClientInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    licensePlate?: StringFieldUpdateOperationsInput | string
    status?: EnumDriverStatusFieldUpdateOperationsInput | $Enums.DriverStatus
    workDays?: DriverUpdateworkDaysInput | number[]
    currentBalance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ticketsReceived?: TicketUncheckedUpdateManyWithoutDriverNestedInput
    locationEvents?: LocationEventUncheckedUpdateManyWithoutDriverNestedInput
    lotadorPartnerships?: LotadorPartnerUncheckedUpdateManyWithoutDriverNestedInput
  }

  export type DriverUncheckedUpdateManyWithoutClientInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    licensePlate?: StringFieldUpdateOperationsInput | string
    status?: EnumDriverStatusFieldUpdateOperationsInput | $Enums.DriverStatus
    workDays?: DriverUpdateworkDaysInput | number[]
    currentBalance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TicketUpdateWithoutPassengerInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: EnumTicketStatusFieldUpdateOperationsInput | $Enums.TicketStatus
    qrNonce?: StringFieldUpdateOperationsInput | string
    shortCode?: NullableStringFieldUpdateOperationsInput | string | null
    transferredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancelReason?: NullableStringFieldUpdateOperationsInput | string | null
    cancelledById?: NullableStringFieldUpdateOperationsInput | string | null
    usedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    driver?: DriverUpdateOneRequiredWithoutTicketsReceivedNestedInput
    issuedBy?: UserUpdateOneRequiredWithoutTicketsEmittedNestedInput
    transferredTo?: UserUpdateOneWithoutTicketsTransferredToNestedInput
    transaction?: TransactionUpdateOneWithoutTicketNestedInput
  }

  export type TicketUncheckedUpdateWithoutPassengerInput = {
    id?: StringFieldUpdateOperationsInput | string
    driverId?: StringFieldUpdateOperationsInput | string
    issuedById?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: EnumTicketStatusFieldUpdateOperationsInput | $Enums.TicketStatus
    qrNonce?: StringFieldUpdateOperationsInput | string
    shortCode?: NullableStringFieldUpdateOperationsInput | string | null
    transferredToId?: NullableStringFieldUpdateOperationsInput | string | null
    transferredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancelReason?: NullableStringFieldUpdateOperationsInput | string | null
    cancelledById?: NullableStringFieldUpdateOperationsInput | string | null
    usedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    transaction?: TransactionUncheckedUpdateOneWithoutTicketNestedInput
  }

  export type TicketUncheckedUpdateManyWithoutPassengerInput = {
    id?: StringFieldUpdateOperationsInput | string
    driverId?: StringFieldUpdateOperationsInput | string
    issuedById?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: EnumTicketStatusFieldUpdateOperationsInput | $Enums.TicketStatus
    qrNonce?: StringFieldUpdateOperationsInput | string
    shortCode?: NullableStringFieldUpdateOperationsInput | string | null
    transferredToId?: NullableStringFieldUpdateOperationsInput | string | null
    transferredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancelReason?: NullableStringFieldUpdateOperationsInput | string | null
    cancelledById?: NullableStringFieldUpdateOperationsInput | string | null
    usedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TicketUpdateWithoutIssuedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: EnumTicketStatusFieldUpdateOperationsInput | $Enums.TicketStatus
    qrNonce?: StringFieldUpdateOperationsInput | string
    shortCode?: NullableStringFieldUpdateOperationsInput | string | null
    transferredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancelReason?: NullableStringFieldUpdateOperationsInput | string | null
    cancelledById?: NullableStringFieldUpdateOperationsInput | string | null
    usedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    passenger?: UserUpdateOneRequiredWithoutTicketsAsPassengerNestedInput
    driver?: DriverUpdateOneRequiredWithoutTicketsReceivedNestedInput
    transferredTo?: UserUpdateOneWithoutTicketsTransferredToNestedInput
    transaction?: TransactionUpdateOneWithoutTicketNestedInput
  }

  export type TicketUncheckedUpdateWithoutIssuedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    passengerId?: StringFieldUpdateOperationsInput | string
    driverId?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: EnumTicketStatusFieldUpdateOperationsInput | $Enums.TicketStatus
    qrNonce?: StringFieldUpdateOperationsInput | string
    shortCode?: NullableStringFieldUpdateOperationsInput | string | null
    transferredToId?: NullableStringFieldUpdateOperationsInput | string | null
    transferredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancelReason?: NullableStringFieldUpdateOperationsInput | string | null
    cancelledById?: NullableStringFieldUpdateOperationsInput | string | null
    usedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    transaction?: TransactionUncheckedUpdateOneWithoutTicketNestedInput
  }

  export type TicketUncheckedUpdateManyWithoutIssuedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    passengerId?: StringFieldUpdateOperationsInput | string
    driverId?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: EnumTicketStatusFieldUpdateOperationsInput | $Enums.TicketStatus
    qrNonce?: StringFieldUpdateOperationsInput | string
    shortCode?: NullableStringFieldUpdateOperationsInput | string | null
    transferredToId?: NullableStringFieldUpdateOperationsInput | string | null
    transferredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancelReason?: NullableStringFieldUpdateOperationsInput | string | null
    cancelledById?: NullableStringFieldUpdateOperationsInput | string | null
    usedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TicketUpdateWithoutTransferredToInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: EnumTicketStatusFieldUpdateOperationsInput | $Enums.TicketStatus
    qrNonce?: StringFieldUpdateOperationsInput | string
    shortCode?: NullableStringFieldUpdateOperationsInput | string | null
    transferredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancelReason?: NullableStringFieldUpdateOperationsInput | string | null
    cancelledById?: NullableStringFieldUpdateOperationsInput | string | null
    usedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    passenger?: UserUpdateOneRequiredWithoutTicketsAsPassengerNestedInput
    driver?: DriverUpdateOneRequiredWithoutTicketsReceivedNestedInput
    issuedBy?: UserUpdateOneRequiredWithoutTicketsEmittedNestedInput
    transaction?: TransactionUpdateOneWithoutTicketNestedInput
  }

  export type TicketUncheckedUpdateWithoutTransferredToInput = {
    id?: StringFieldUpdateOperationsInput | string
    passengerId?: StringFieldUpdateOperationsInput | string
    driverId?: StringFieldUpdateOperationsInput | string
    issuedById?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: EnumTicketStatusFieldUpdateOperationsInput | $Enums.TicketStatus
    qrNonce?: StringFieldUpdateOperationsInput | string
    shortCode?: NullableStringFieldUpdateOperationsInput | string | null
    transferredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancelReason?: NullableStringFieldUpdateOperationsInput | string | null
    cancelledById?: NullableStringFieldUpdateOperationsInput | string | null
    usedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    transaction?: TransactionUncheckedUpdateOneWithoutTicketNestedInput
  }

  export type TicketUncheckedUpdateManyWithoutTransferredToInput = {
    id?: StringFieldUpdateOperationsInput | string
    passengerId?: StringFieldUpdateOperationsInput | string
    driverId?: StringFieldUpdateOperationsInput | string
    issuedById?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: EnumTicketStatusFieldUpdateOperationsInput | $Enums.TicketStatus
    qrNonce?: StringFieldUpdateOperationsInput | string
    shortCode?: NullableStringFieldUpdateOperationsInput | string | null
    transferredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancelReason?: NullableStringFieldUpdateOperationsInput | string | null
    cancelledById?: NullableStringFieldUpdateOperationsInput | string | null
    usedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LotadorPartnerUpdateWithoutLotadorInput = {
    id?: StringFieldUpdateOperationsInput | string
    referenceCode?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    driver?: DriverUpdateOneRequiredWithoutLotadorPartnershipsNestedInput
  }

  export type LotadorPartnerUncheckedUpdateWithoutLotadorInput = {
    id?: StringFieldUpdateOperationsInput | string
    driverId?: StringFieldUpdateOperationsInput | string
    referenceCode?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LotadorPartnerUncheckedUpdateManyWithoutLotadorInput = {
    id?: StringFieldUpdateOperationsInput | string
    driverId?: StringFieldUpdateOperationsInput | string
    referenceCode?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    entityType?: StringFieldUpdateOperationsInput | string
    entityId?: StringFieldUpdateOperationsInput | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    entityType?: StringFieldUpdateOperationsInput | string
    entityId?: StringFieldUpdateOperationsInput | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    entityType?: StringFieldUpdateOperationsInput | string
    entityId?: StringFieldUpdateOperationsInput | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TicketCreateManyDriverInput = {
    id?: string
    passengerId: string
    issuedById: string
    amount: Decimal | DecimalJsLike | number | string
    status?: $Enums.TicketStatus
    qrNonce: string
    shortCode?: string | null
    transferredToId?: string | null
    transferredAt?: Date | string | null
    cancelReason?: string | null
    cancelledById?: string | null
    usedAt?: Date | string | null
    expiresAt: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LocationEventCreateManyDriverInput = {
    id?: string
    lat: number
    lng: number
    speed?: number
    heading?: number | null
    recordedAt: Date | string
  }

  export type LotadorPartnerCreateManyDriverInput = {
    id?: string
    lotadorUserId: string
    referenceCode: string
    isActive?: boolean
    createdAt?: Date | string
  }

  export type TicketUpdateWithoutDriverInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: EnumTicketStatusFieldUpdateOperationsInput | $Enums.TicketStatus
    qrNonce?: StringFieldUpdateOperationsInput | string
    shortCode?: NullableStringFieldUpdateOperationsInput | string | null
    transferredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancelReason?: NullableStringFieldUpdateOperationsInput | string | null
    cancelledById?: NullableStringFieldUpdateOperationsInput | string | null
    usedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    passenger?: UserUpdateOneRequiredWithoutTicketsAsPassengerNestedInput
    issuedBy?: UserUpdateOneRequiredWithoutTicketsEmittedNestedInput
    transferredTo?: UserUpdateOneWithoutTicketsTransferredToNestedInput
    transaction?: TransactionUpdateOneWithoutTicketNestedInput
  }

  export type TicketUncheckedUpdateWithoutDriverInput = {
    id?: StringFieldUpdateOperationsInput | string
    passengerId?: StringFieldUpdateOperationsInput | string
    issuedById?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: EnumTicketStatusFieldUpdateOperationsInput | $Enums.TicketStatus
    qrNonce?: StringFieldUpdateOperationsInput | string
    shortCode?: NullableStringFieldUpdateOperationsInput | string | null
    transferredToId?: NullableStringFieldUpdateOperationsInput | string | null
    transferredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancelReason?: NullableStringFieldUpdateOperationsInput | string | null
    cancelledById?: NullableStringFieldUpdateOperationsInput | string | null
    usedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    transaction?: TransactionUncheckedUpdateOneWithoutTicketNestedInput
  }

  export type TicketUncheckedUpdateManyWithoutDriverInput = {
    id?: StringFieldUpdateOperationsInput | string
    passengerId?: StringFieldUpdateOperationsInput | string
    issuedById?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: EnumTicketStatusFieldUpdateOperationsInput | $Enums.TicketStatus
    qrNonce?: StringFieldUpdateOperationsInput | string
    shortCode?: NullableStringFieldUpdateOperationsInput | string | null
    transferredToId?: NullableStringFieldUpdateOperationsInput | string | null
    transferredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancelReason?: NullableStringFieldUpdateOperationsInput | string | null
    cancelledById?: NullableStringFieldUpdateOperationsInput | string | null
    usedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LocationEventUpdateWithoutDriverInput = {
    id?: StringFieldUpdateOperationsInput | string
    lat?: FloatFieldUpdateOperationsInput | number
    lng?: FloatFieldUpdateOperationsInput | number
    speed?: FloatFieldUpdateOperationsInput | number
    heading?: NullableFloatFieldUpdateOperationsInput | number | null
    recordedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LocationEventUncheckedUpdateWithoutDriverInput = {
    id?: StringFieldUpdateOperationsInput | string
    lat?: FloatFieldUpdateOperationsInput | number
    lng?: FloatFieldUpdateOperationsInput | number
    speed?: FloatFieldUpdateOperationsInput | number
    heading?: NullableFloatFieldUpdateOperationsInput | number | null
    recordedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LocationEventUncheckedUpdateManyWithoutDriverInput = {
    id?: StringFieldUpdateOperationsInput | string
    lat?: FloatFieldUpdateOperationsInput | number
    lng?: FloatFieldUpdateOperationsInput | number
    speed?: FloatFieldUpdateOperationsInput | number
    heading?: NullableFloatFieldUpdateOperationsInput | number | null
    recordedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LotadorPartnerUpdateWithoutDriverInput = {
    id?: StringFieldUpdateOperationsInput | string
    referenceCode?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lotador?: UserUpdateOneRequiredWithoutLotadorPartnershipsNestedInput
  }

  export type LotadorPartnerUncheckedUpdateWithoutDriverInput = {
    id?: StringFieldUpdateOperationsInput | string
    lotadorUserId?: StringFieldUpdateOperationsInput | string
    referenceCode?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LotadorPartnerUncheckedUpdateManyWithoutDriverInput = {
    id?: StringFieldUpdateOperationsInput | string
    lotadorUserId?: StringFieldUpdateOperationsInput | string
    referenceCode?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransactionCreateManyWalletInput = {
    id?: string
    ticketId?: string | null
    type: $Enums.TransactionType
    amount: Decimal | DecimalJsLike | number | string
    balanceBefore: Decimal | DecimalJsLike | number | string
    balanceAfter: Decimal | DecimalJsLike | number | string
    reference?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type TransactionUpdateWithoutWalletInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    balanceBefore?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    balanceAfter?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    reference?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ticket?: TicketUpdateOneWithoutTransactionNestedInput
  }

  export type TransactionUncheckedUpdateWithoutWalletInput = {
    id?: StringFieldUpdateOperationsInput | string
    ticketId?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    balanceBefore?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    balanceAfter?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    reference?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransactionUncheckedUpdateManyWithoutWalletInput = {
    id?: StringFieldUpdateOperationsInput | string
    ticketId?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    balanceBefore?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    balanceAfter?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    reference?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
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