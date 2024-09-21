/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface GalaxyDto {
  /** @format int32 */
  id?: number;
  name?: string;
  description?: string;
  imagePath?: string;
  planets?: Planet[];
}

export interface Planet {
  /** @format int32 */
  id?: number;
  name?: string;
  description?: string;
  /** @format date-time */
  dateVisited?: string | null;
  /** @format int32 */
  timesVisited?: number;
  /** @format int64 */
  population?: number;
  /** @format int32 */
  galaxyId?: number | null;
  galaxy?: Galaxy | null;
}

export interface Galaxy {
  /** @format int32 */
  id?: number;
  name?: string;
  description?: string;
  imagePath?: string;
  planets?: Planet[];
}

export interface CreateGalaxyDto {
  name?: string;
  description?: string;
  imagePath?: string;
}

export interface UpdateGalaxyDto {
  /** @format int32 */
  id?: number;
  name?: string;
  description?: string;
  planets?: Planet[];
}

export interface PlanetDto {
  /** @format int32 */
  id?: number;
  name?: string;
  description?: string;
  /** @format date-time */
  dateVisited?: string | null;
  /** @format int32 */
  timesVisited?: number;
  /** @format int64 */
  population?: number;
}

export interface CreatePlanetDto {
  name?: string;
  description?: string;
  /** @format int64 */
  population?: number;
}

export interface UpdatePlanetDto {
  /** @format int32 */
  id?: number;
  name?: string;
  description?: string;
  /** @format int64 */
  population?: number;
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (securityData: SecurityDataType | null) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "http://localhost:9000";
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) => fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join("&");
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter((key) => "undefined" !== typeof query[key]);
    return keys
      .map((key) => (Array.isArray(query[key]) ? this.addArrayQueryParam(query, key) : this.addQueryParam(query, key)))
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string") ? JSON.stringify(input) : input,
    [ContentType.Text]: (input: any) => (input !== null && typeof input !== "string" ? JSON.stringify(input) : input),
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === "object" && property !== null
              ? JSON.stringify(property)
              : `${property}`,
        );
        return formData;
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  protected mergeRequestParams(params1: RequestParams, params2?: RequestParams): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected createAbortSignal = (cancelToken: CancelToken): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(`${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`, {
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
      },
      signal: (cancelToken ? this.createAbortSignal(cancelToken) : requestParams.signal) || null,
      body: typeof body === "undefined" || body === null ? null : payloadFormatter(body),
    }).then(async (response) => {
      const r = response.clone() as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title My Title
 * @version 1.0.0
 * @baseUrl http://localhost:9000
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  galaxy = {
    /**
     * No description
     *
     * @tags Galaxy
     * @name GalaxyCreateGalaxy
     * @request POST:/Galaxy
     */
    galaxyCreateGalaxy: (data: CreateGalaxyDto, params: RequestParams = {}) =>
      this.request<GalaxyDto, any>({
        path: `/Galaxy`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Galaxy
     * @name GalaxyGetAll
     * @request GET:/Galaxy
     */
    galaxyGetAll: (params: RequestParams = {}) =>
      this.request<Galaxy[], any>({
        path: `/Galaxy`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Galaxy
     * @name GalaxyGetById
     * @request GET:/Galaxy/{id}
     */
    galaxyGetById: (id: number, params: RequestParams = {}) =>
      this.request<Galaxy, any>({
        path: `/Galaxy/${id}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Galaxy
     * @name GalaxyUpdateGalaxy
     * @request PUT:/Galaxy/{Id}
     */
    galaxyUpdateGalaxy: (id: number, data: UpdateGalaxyDto, params: RequestParams = {}) =>
      this.request<GalaxyDto, any>({
        path: `/Galaxy/${id}`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Galaxy
     * @name GalaxyAddPlanetToGalaxy
     * @request POST:/Galaxy/{galaxyId}/planets/{planetId}
     */
    galaxyAddPlanetToGalaxy: (galaxyId: number, planetId: number, params: RequestParams = {}) =>
      this.request<GalaxyDto, any>({
        path: `/Galaxy/${galaxyId}/planets/${planetId}`,
        method: "POST",
        format: "json",
        ...params,
      }),
  };
  planet = {
    /**
     * No description
     *
     * @tags Planet
     * @name PlanetCreatePlanet
     * @request POST:/Planet
     */
    planetCreatePlanet: (data: CreatePlanetDto, params: RequestParams = {}) =>
      this.request<PlanetDto, any>({
        path: `/Planet`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Planet
     * @name PlanetGetAll
     * @request GET:/Planet
     */
    planetGetAll: (params: RequestParams = {}) =>
      this.request<Planet[], any>({
        path: `/Planet`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Planet
     * @name PlanetGetById
     * @request GET:/Planet/{id}
     */
    planetGetById: (id: number, params: RequestParams = {}) =>
      this.request<Planet, any>({
        path: `/Planet/${id}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Planet
     * @name PlanetDelete
     * @request DELETE:/Planet/{id}
     */
    planetDelete: (id: number, params: RequestParams = {}) =>
      this.request<File, any>({
        path: `/Planet/${id}`,
        method: "DELETE",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Planet
     * @name PlanetUpdatePlanet
     * @request PUT:/Planet/{Id}
     */
    planetUpdatePlanet: (id: number, data: UpdatePlanetDto, params: RequestParams = {}) =>
      this.request<PlanetDto, any>({
        path: `/Planet/${id}`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
}
