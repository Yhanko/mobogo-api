// ── Tipos ────────────────────────────────────────────────────────────────────

export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface PaginatedResult<T> {
  items: T[];
  meta: PaginationMeta;
}

// ── Constantes ───────────────────────────────────────────────────────────────

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 20;
const MAX_LIMIT = 100;

// ── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Converte page/limit em skip/take para o Prisma.
 * Garante que os valores são válidos e dentro dos limites.
 */
export function toPrismaPage(params: PaginationParams): {
  skip: number;
  take: number;
  page: number;
  limit: number;
} {
  const page = Math.max(1, params.page ?? DEFAULT_PAGE);
  const limit = Math.min(MAX_LIMIT, Math.max(1, params.limit ?? DEFAULT_LIMIT));
  return {
    skip: (page - 1) * limit,
    take: limit,
    page,
    limit,
  };
}

/**
 * Monta o envelope paginado a partir dos items e do total.
 *
 * Uso típico no service:
 *
 *   const { skip, take, page, limit } = toPrismaPage({ page, limit });
 *   const [items, total] = await prisma.$transaction([
 *     prisma.ticket.findMany({ skip, take, where }),
 *     prisma.ticket.count({ where }),
 *   ]);
 *   return paginate(items, total, { page, limit });
 */
export function paginate<T>(
  items: T[],
  total: number,
  params: { page: number; limit: number },
): PaginatedResult<T> {
  const totalPages = Math.ceil(total / params.limit);
  return {
    items,
    meta: {
      total,
      page: params.page,
      limit: params.limit,
      totalPages,
      hasNext: params.page < totalPages,
      hasPrev: params.page > 1,
    },
  };
}
