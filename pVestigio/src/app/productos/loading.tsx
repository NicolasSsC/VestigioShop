import { Skeleton } from "@/components/ui/Skeleton";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function LoadingCatalog() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-[#0f1113] transition-colors">
      <Navbar />
      <main className="flex-1">
        {/* HEADER SKELETON */}
        <section className="px-6 py-12 md:py-16 bg-gray-100/80 dark:bg-[#16191c]/60 border-b border-gray-200 dark:border-gray-800 text-center relative overflow-hidden">
          <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
            <Skeleton className="h-6 w-40 rounded-full mb-3" />
            <Skeleton className="h-10 md:h-14 w-3/4 mb-4" />
            <Skeleton className="h-4 md:h-5 w-2/3" />
          </div>
        </section>

        {/* LAYOUT SIDEBAR + GRID */}
        <section className="max-w-7xl mx-auto px-6 py-12 w-full">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 items-start">
            
            {/* SIDEBAR SKELETON */}
            <div className="w-full lg:w-72 flex-shrink-0 hidden lg:block">
              <div className="w-full bg-white dark:bg-[#16191c] border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-xl">
                <Skeleton className="h-5 w-24 mb-6" />
                <div className="space-y-4 mb-8">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                  <Skeleton className="h-4 w-4/5" />
                  <Skeleton className="h-4 w-full" />
                </div>
                <div className="pt-6 border-t border-gray-200 dark:border-gray-800">
                  <Skeleton className="h-4 w-28 mb-4" />
                  <Skeleton className="h-2 w-full mb-2" />
                  <div className="flex justify-between mb-8">
                    <Skeleton className="h-3 w-8" />
                    <Skeleton className="h-3 w-12" />
                  </div>
                </div>
                <div className="pt-6 border-t border-gray-200 dark:border-gray-800">
                  <Skeleton className="h-10 w-full rounded-xl" />
                </div>
              </div>
            </div>

            {/* GRID SKELETON */}
            <div className="flex-1 w-full">
              <div className="mb-6 pb-3 border-b border-gray-200 dark:border-gray-800/80 flex items-center justify-between">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-24 hidden sm:block" />
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="flex flex-col bg-white dark:bg-[#16191c] border border-gray-200 dark:border-gray-800 rounded-3xl p-5 shadow-xl">
                    <Skeleton className="w-full aspect-square rounded-2xl mb-4" />
                    <Skeleton className="h-3 w-20 mb-2" />
                    <Skeleton className="h-5 w-full mb-2" />
                    <Skeleton className="h-5 w-4/5 mb-6" />
                    
                    <div className="mt-auto flex items-center justify-between">
                      <Skeleton className="h-6 w-24" />
                      <Skeleton className="h-12 w-full rounded-xl mt-4" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
