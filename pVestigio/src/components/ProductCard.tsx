interface ProductCardProps {
  title: string;
  category: string;
  description: string;
  price?: string;
  imageSrc: string;
  isSelected?: boolean;
  hasButton?: boolean;
  buttonText?: string;
  buttonVariant?: 'primary' | 'outline';
}

export default function ProductCard({
  title,
  category,
  description,
  price,
  imageSrc,
  isSelected = false,
  hasButton = false,
  buttonText = "VER PRODUCTO",
  buttonVariant = "outline",
}: ProductCardProps) {
  return (
    <div
      className={`relative rounded-xl p-5 flex flex-col items-center transition-all bg-[#16191c] ${
        isSelected
          ? "border-2 border-[#42938a] shadow-[0_0_20px_rgba(66,147,138,0.15)]"
          : "border border-[#2a2e33]"
      }`}
    >
      {/* Contenedor de la Imagen */}
      <div className="w-full h-48 flex items-center justify-center mb-4 relative">
        <img src={imageSrc} alt={title} className="max-h-full object-contain filter drop-shadow-md" />
      </div>

      {/* Textos del producto */}
      <div className="text-center w-full mb-4">
        <h3 className="text-white font-bold text-base tracking-wide uppercase">{title}</h3>
        <p className="text-gray-400 text-xs mb-1">{category}</p>
        <p className="text-gray-500 text-xs px-2 line-clamp-2">{description}</p>
      </div>

      {/* Precio o Estrellas opcionales */}
      {price && (
        <div className="w-full flex items-center justify-between mt-auto px-2 mb-3">
          <span className="text-white font-bold text-sm">{price}</span>
          <div className="text-yellow-500 text-xs">★★★★★</div>
        </div>
      )}

      {/* Botón opcional (como en los productos principales) */}
      {hasButton && (
        <button
          className={`w-full py-2.5 rounded-full text-xs font-bold tracking-wider transition-colors mt-2 ${
            buttonVariant === 'primary'
              ? 'bg-[#42938a] text-black hover:bg-[#33746d]'
              : 'border border-[#42938a] text-[#42938a] hover:bg-[#42938a]/10'
          }`}
        >
          {buttonText}
        </button>
      )}
    </div>
  );
}