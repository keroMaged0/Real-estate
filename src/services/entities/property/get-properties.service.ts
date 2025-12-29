import { Property } from "../../../models";
import { IPagination, PaginationResult } from "../../../types";

export const getPropertiesService = async (
  pagination: IPagination,
  sortBy: string = "createdAt",
  sortOrder: string = "desc"
): Promise<PaginationResult<any> & { message: string }> => {
  const { limit, skip, filter } = pagination;

  const sort: any = {};
  sort[sortBy] = sortOrder === "asc" ? 1 : -1;

  if (filter.$text) {
    sort.score = { $meta: "textScore" };
  }

  const [properties, total] = await Promise.all([
    Property.find(filter).sort(sort).skip(skip).limit(limit).lean(),
    Property.countDocuments(filter),
  ]);

  const totalPages = Math.ceil(total / limit);
  const hasNextPage = pagination.page < totalPages;
  const hasPrevPage = pagination.page > 1;

  return {
    data: properties.map((property) => ({
      id: property._id,
      title: property.title,
      description: property.description,
      price: property.price,
      location: property.location,
      type: property.type,
      status: property.status,
      images: property.images,
      createdBy: property.createdBy,
      createdAt: property.createdAt,
      updatedAt: property.updatedAt,
    })),
    pagination: {
      currentPage: pagination.page,
      totalPages,
      totalItems: total,
      itemsPerPage: limit,
      hasNextPage,
      hasPrevPage,
    },
    message: "Properties retrieved successfully",
  };
};
