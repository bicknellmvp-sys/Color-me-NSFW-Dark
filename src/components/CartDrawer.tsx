import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, Plus, Minus, ArrowRight, ShieldCheck, Check } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (volumeId: string, delta: number) => void;
  onRemoveItem: (volumeId: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'checkout' | 'success'>('cart');

  // Checkout form state
  const [shippingName, setShippingName] = useState('');
  const [shippingEmail, setShippingEmail] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');

  if (!isOpen) return null;

  const rawSubtotal = cartItems.reduce((acc, item) => {
    let itemPrice = item.volume.price;
    if (item.format === 'digital') itemPrice = 14.00;
    if (item.format === 'bundle') itemPrice = item.volume.price + 10.00;
    return acc + itemPrice * item.quantity;
  }, 0);

  const discount = discountApplied ? rawSubtotal * 0.15 : 0;
  const shipping = rawSubtotal > 60 || rawSubtotal === 0 ? 0 : 7.50;
  const total = Math.max(0, rawSubtotal - discount + shipping);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'LAEVUS10' || promoCode.trim().toUpperCase() === 'DARKNESS') {
      setDiscountApplied(true);
    } else {
      alert('Invalid promo code. Try "LAEVUS10" for 15% off.');
    }
  };

  const handleCompleteOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!shippingName || !shippingEmail || !shippingAddress) return;
    setCheckoutStep('success');
    setTimeout(() => {
      onClearCart();
    }, 4000);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity animate-fade-in"
        onClick={onClose}
      />

      {/* Cart Drawer */}
      <div className="relative w-full max-w-lg bg-[#0c0c0c] border-l border-[#333333] h-full flex flex-col justify-between p-6 md:p-8 z-10 overflow-y-auto animate-slide-in-right">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#333333] pb-6">
          <div className="flex items-center gap-3">
            <ShoppingBag className="w-6 h-6 text-[#e60026]" />
            <span className="font-headline text-2xl text-[#e0e0e0] uppercase font-bold tracking-tighter">
              Shopping Bag
            </span>
            <span className="text-xs bg-[#e60026] text-white px-2 py-0.5 font-bold font-mono">
              {cartItems.reduce((a, b) => a + b.quantity, 0)}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#b0b0b0] hover:text-[#e60026] transition-colors"
            aria-label="Close cart"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content Body */}
        {checkoutStep === 'success' ? (
          <div className="flex-grow flex flex-col items-center justify-center text-center gap-6 py-12">
            <div className="w-16 h-16 rounded-full bg-[#e60026]/20 border border-[#e60026] flex items-center justify-center text-[#e60026]">
              <Check className="w-8 h-8" />
            </div>
            <h3 className="font-headline text-3xl text-[#e0e0e0] uppercase font-bold">
              Dispatch Confirmed
            </h3>
            <p className="font-inter text-sm text-[#b0b0b0] max-w-xs">
              Thank you, <span className="text-[#ffb3ae] font-semibold">{shippingName}</span>. Your archive items are being packed in discrete matte black casing.
            </p>
            <div className="p-4 bg-[#1c1b1b] border border-[#333333] text-xs text-[#b0b0b0] font-mono w-full text-left">
              <p>Order Reference: <span className="text-[#e60026]">#LVS-{Math.floor(100000 + Math.random() * 900000)}</span></p>
              <p className="mt-1">Tracking notification sent to: {shippingEmail}</p>
            </div>
            <button
              onClick={() => { setCheckoutStep('cart'); onClose(); }}
              className="mt-4 px-6 py-3 bg-[#e60026] text-white font-semibold text-xs uppercase tracking-wider hover:bg-[#ffb3ae] hover:text-black transition-colors"
            >
              Back to Archives
            </button>
          </div>
        ) : checkoutStep === 'checkout' ? (
          <div className="flex-grow py-6 flex flex-col gap-6">
            <button
              onClick={() => setCheckoutStep('cart')}
              className="text-xs text-[#e60026] uppercase tracking-wider font-semibold hover:underline self-start"
            >
              ← Back to Bag Items
            </button>

            <h3 className="font-headline text-xl text-[#e0e0e0] uppercase font-bold border-b border-[#333333] pb-2">
              Shipping & Dispatch Info
            </h3>

            <form onSubmit={handleCompleteOrder} className="flex flex-col gap-4">
              <div>
                <label className="block text-xs uppercase text-[#b0b0b0] font-semibold mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={shippingName}
                  onChange={(e) => setShippingName(e.target.value)}
                  placeholder="Raven Vance"
                  className="w-full bg-[#1c1b1b] border border-[#333333] px-3 py-2 text-sm text-[#e0e0e0] focus:border-[#e60026] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs uppercase text-[#b0b0b0] font-semibold mb-1">
                  Email Address (For digital dispatch)
                </label>
                <input
                  type="email"
                  required
                  value={shippingEmail}
                  onChange={(e) => setShippingEmail(e.target.value)}
                  placeholder="raven@domain.com"
                  className="w-full bg-[#1c1b1b] border border-[#333333] px-3 py-2 text-sm text-[#e0e0e0] focus:border-[#e60026] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs uppercase text-[#b0b0b0] font-semibold mb-1">
                  Shipping Address
                </label>
                <textarea
                  required
                  rows={3}
                  value={shippingAddress}
                  onChange={(e) => setShippingAddress(e.target.value)}
                  placeholder="108 Obsidian Way, Suite 4B, New York, NY 10001"
                  className="w-full bg-[#1c1b1b] border border-[#333333] px-3 py-2 text-sm text-[#e0e0e0] focus:border-[#e60026] outline-none"
                />
              </div>

              <div className="p-4 bg-[#1c1b1b] border border-[#333333] text-xs text-[#b0b0b0] flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#e60026] shrink-0" />
                <span>Discrete plain-black unbranded packaging guaranteed.</span>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-[#e60026] text-white font-semibold text-sm uppercase tracking-wider hover:bg-[#ffb3ae] hover:text-black transition-colors mt-2"
              >
                Pay ${total.toFixed(2)} & Complete Order
              </button>
            </form>
          </div>
        ) : (
          <div className="flex-grow overflow-y-auto py-6 flex flex-col gap-6">
            {cartItems.length === 0 ? (
              <div className="flex-grow flex flex-col items-center justify-center text-center py-16 gap-4">
                <ShoppingBag className="w-12 h-12 text-[#333333]" />
                <p className="font-headline text-lg text-[#b0b0b0] uppercase">
                  Your bag is empty
                </p>
                <p className="font-inter text-xs text-[#808080] max-w-xs">
                  Explore our physical archives or digital line vector downloads to add items.
                </p>
              </div>
            ) : (
              cartItems.map((item) => {
                let currentPrice = item.volume.price;
                if (item.format === 'digital') currentPrice = 14.00;
                if (item.format === 'bundle') currentPrice = item.volume.price + 10.00;

                return (
                  <div
                    key={item.volume.id}
                    className="flex gap-4 p-4 bg-[#1c1b1b] border border-[#333333] relative group"
                  >
                    <img
                      src={item.volume.coverImage}
                      alt={item.volume.title}
                      referrerPolicy="no-referrer"
                      className="w-20 h-20 object-cover bg-black shrink-0 border border-[#333333]"
                    />

                    <div className="flex-grow flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <h4 className="font-headline text-base text-[#e0e0e0] font-bold">
                            {item.volume.title}
                          </h4>
                          <button
                            onClick={() => onRemoveItem(item.volume.id)}
                            className="text-[#808080] hover:text-[#e60026] transition-colors p-1"
                            title="Remove"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <span className="text-[11px] text-[#ffb3ae] font-mono uppercase">
                          {item.format} format
                        </span>
                      </div>

                      <div className="flex justify-between items-center mt-2">
                        <div className="flex items-center border border-[#333333] bg-black">
                          <button
                            onClick={() => onUpdateQuantity(item.volume.id, -1)}
                            className="p-1.5 text-[#b0b0b0] hover:text-[#e60026]"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="px-3 text-xs font-mono text-[#e0e0e0]">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.volume.id, 1)}
                            className="p-1.5 text-[#b0b0b0] hover:text-[#e60026]"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <span className="font-mono text-sm font-bold text-[#e0e0e0]">
                          ${(currentPrice * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}

        {/* Cart Footer */}
        {cartItems.length > 0 && checkoutStep === 'cart' && (
          <div className="pt-6 border-t border-[#333333] flex flex-col gap-4 bg-[#0c0c0c]">
            {/* Promo code form */}
            <form onSubmit={handleApplyPromo} className="flex gap-2">
              <input
                type="text"
                placeholder="PROMO CODE (e.g. LAEVUS10)"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className="flex-grow bg-[#1c1b1b] border border-[#333333] px-3 py-2 text-xs text-[#e0e0e0] focus:border-[#e60026] uppercase outline-none"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-[#353534] hover:bg-[#e60026] text-white text-xs font-semibold uppercase tracking-wider transition-colors"
              >
                Apply
              </button>
            </form>

            {discountApplied && (
              <p className="text-xs text-[#e60026] font-mono">
                ✓ 15% VIP darkness discount applied!
              </p>
            )}

            {/* Calculations */}
            <div className="flex flex-col gap-1.5 text-xs font-mono text-[#b0b0b0]">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>${rawSubtotal.toFixed(2)}</span>
              </div>
              {discountApplied && (
                <div className="flex justify-between text-[#e60026]">
                  <span>Discount (15%):</span>
                  <span>-${discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping:</span>
                <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between text-base text-[#e0e0e0] font-bold font-headline border-t border-[#333333] pt-2 mt-1">
                <span>Total:</span>
                <span className="text-[#e60026]">${total.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={() => setCheckoutStep('checkout')}
              className="w-full py-4 bg-[#e60026] text-white font-semibold text-sm uppercase tracking-wider hover:bg-[#ffb3ae] hover:text-black transition-colors flex items-center justify-center gap-2 glow-effect"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
