import Search from "@/app/components/Search";
import { Suspense } from "react";
import Table from "../components/esposizioni/Table";
export const dynamic = "force-dynamic";

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  return (
    <div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="cerca esposizioni per anno" />
      </div>
      <Suspense
        key={query + currentPage}
        fallback={
          <div className="flex w-full h-full justify-center items-center mt-20">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        }
      >
        <Table query={query} />
      </Suspense>
    </div>
  );
}
