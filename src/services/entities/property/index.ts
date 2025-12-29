import { createPropertyService } from "./create-property.service";
import { getPropertyService } from "./get-property.service";
import { getPropertiesService } from "./get-properties.service";
import { updatePropertyService } from "./update-property.service";
import { deletePropertyService } from "./delete-property.service";

export const PropertyServices = {
  createPropertyService,
  getPropertyService,
  getPropertiesService,
  updatePropertyService,
  deletePropertyService,
};
