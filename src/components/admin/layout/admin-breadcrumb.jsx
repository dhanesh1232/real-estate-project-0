"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import React from "react";

export function AdminBreadcrumb() {
  const pathname = usePathname();

  // Split path into segments
  const segments = pathname.split("/").filter(Boolean);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {segments.map((segment, index) => {
          const href = "/" + segments.slice(0, index + 1).join("/");
          const isLast = index === segments.length - 1;

          return (
            <React.Fragment key={href}>
              <BreadcrumbItem>
                {!isLast ? (
                  <>
                    <BreadcrumbLink asChild>
                      <Link href={href} className="capitalize">
                        {segment === "admin"
                          ? "Dashboard"
                          : segment.replace(/-/g, " ")}
                      </Link>
                    </BreadcrumbLink>
                  </>
                ) : (
                  <BreadcrumbPage className="capitalize">
                    {segment === "admin"
                      ? "Dashboard"
                      : segment.replace(/-/g, " ")}
                  </BreadcrumbPage>
                )}
              </BreadcrumbItem>
              {!isLast && <BreadcrumbSeparator />}
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
