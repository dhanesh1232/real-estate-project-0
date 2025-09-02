"use client";

import { PropertyEditor } from "@/components/admin/pages/properties/editor";
import {
  DEFAULT_FORM,
  DEFAULT_LOCATION,
  DEFAULT_SEO,
} from "@/components/admin/pages/properties/helper/default_data";
import { Loader } from "@/components/Layout/loader";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function PropertyDetail() {
  const params = useParams();
  const { property } = params;
  const [details, setDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`/api/properties/${property}`);
        const data = await res.json();
        setDetails(data.data);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
      }
    };
    if (property) {
      fetchProperty();
    }
  }, []);

  if (isLoading)
    return (
      <div className="text-center flex items-center justify-center h-screen w-full">
        <Loader />
      </div>
    );
  return (
    <PropertyEditor
      propertyData={details || DEFAULT_FORM}
      seoData={details?.seoMeta || DEFAULT_SEO}
      locationData={details?.location || DEFAULT_LOCATION}
    />
  );
}
