import { MessageCircle } from "lucide-react";

export function WhatsAppButton() {
  const whatsappUrl = "https://api.whatsapp.com/send?phone=%2B5551995550869&context=AfecMWLBW0nSJE2ec-P7ko438yexctpB1D3jc5rTl9hlsw9gcYMHsyjR0ozoomvX18NPc1WinT0SyqH9eXNrNlZsRL7TnCZP8M7X9GTC8eG4lwUmVKDan_LQXl3jnm7Z7a2Ia6b0Ndue-0V0e_J4vUfcwg&source=FB_Page&app=facebook&entry_point=page_cta&fbclid=IwY2xjawLKNPBleHRuA2FlbQIxMABicmlkETFveGc2OUI1dkhWNk04aDlXAR40_yUjTMcVEDsagDzfnC3IP29QRzSne1vVVaj4DIpFZugFhzQ9fykFGgEEeA_aem_As1vlJbcJE0WiMDyoUrt6g";

  const handleClick = () => {
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group"
      aria-label="Entrar no grupo do WhatsApp"
      title="Entrar no grupo do WhatsApp"
    >
      <MessageCircle className="w-6 h-6" />
      
      {/* Tooltip */}
      <div className="absolute bottom-full right-0 mb-2 bg-black text-white text-xs rounded-lg py-2 px-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
        Junte-se ao nosso grupo!
        <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black"></div>
      </div>

      {/* Animação de pulso */}
      <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-20"></div>
    </button>
  );
}