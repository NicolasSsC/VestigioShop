import { Skeleton } from "@/components/ui/Skeleton";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function LoadingProductDetail() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-[#0f1113] transition-colors">
      <Navbar />
      <main className="flex-1 max-w-7xl mx-auto px-6 py-8 md:py-12 w-full">
        {/* BREADCRUMB SKELETON */}
        <div className="flex items-center gap-2 mb-8 md:mb-12">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-4" />
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-4" />
          <Skeleton className="h-4 w-32" />
        </div>

        {/* GRID PRINCIPAL */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14 items-start">
          
          {/* COLUMNA IZQUIERDA: GALERÍA */}
          <div className="flex flex-col gap-4">
            <Skeleton className="w-full aspect-square rounded-3xl" />
            <div className="grid grid-cols-3 gap-4">
              <Skeleton className="w-full aspect-square rounded-2xl" />
              <Skeleton className="w-full aspect-square rounded-2xl" />
              <Skeleton className="w-full aspect-square rounded-2xl" />
            </div>
          </div>

          {/* COLUMNA DERECHA: INFO Y COMPRA */}
          <div className="flex flex-col bg-white dark:bg-[#16191c] border border-gray-200 dark:border-gray-800 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xl">
            
            <div className="flex items-center justify-between mb-3">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-20" />
            </div>

            <Skeleton className="h-10 sm:h-12 md:h-14 w-full mb-2" />
            <Skeleton className="h-10 sm:h-12 md:h-14 w-3/4 mb-6" />

            {/* PRECIO */}
            <div className="mb-6 pb-6 border-b border-gray-100 dark:border-gray-800/80">
              <Skeleton className="h-10 sm:h-12 w-1/3" />
            </div>

            {/* VARIANTES */}
            <div className="mb-6">
              <Skeleton className="h-4 w-32 mb-3" />
              <div className="flex gap-3">
                <Skeleton className="w-10 h-10 rounded-full" />
                <Skeleton className="w-10 h-10 rounded-full" />
              </div>
            </div>

            {/* DESCRIPCIÓN */}
            <div className="space-y-3 mb-8">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-4/5" />
            </div>

            {/* ACCIONES Y CANTIDAD */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Skeleton className="h-14 w-full sm:w-40 rounded-xl flex-shrink-0" />
              <Skeleton className="flex-1 h-14 rounded-xl" />
            </div>

            {/* ESPECIFICACIONES */}
            <Skeleton className="h-32 w-full rounded-2xl" />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
