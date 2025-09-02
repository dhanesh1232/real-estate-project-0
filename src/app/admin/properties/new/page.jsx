import { PropertyEditor } from "@/components/admin/pages/properties/editor";
import {
  DEFAULT_FORM,
  DEFAULT_LOCATION,
  DEFAULT_SEO,
} from "@/components/admin/pages/properties/helper/default_data";

export default function Page() {
  return (
    <PropertyEditor
      propertyData={DEFAULT_FORM}
      seoData={DEFAULT_SEO}
      locationData={DEFAULT_LOCATION}
    />
  );
}
