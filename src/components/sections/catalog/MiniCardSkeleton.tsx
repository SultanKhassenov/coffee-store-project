import { MINICARD_SKELETONS } from "@/lib/MINICARD_SKELETONS";

export default function CatalogSkeleton() {
  return (
    <div className="flex gap-4 overflow-hidden">
      {MINICARD_SKELETONS.map(({ show, count }) =>
        Array.from({ length: count }).map((_, i) => (
          <div
            key={`${show}-${i}`}
            className={`skeleton skeleton-vertical w-[220px] h-[300px] max-md:w-[110px] max-md:h-[150px] mb-10 rounded-lg ${show}`}
          />
        ))
      )}
    </div>
  );
}
