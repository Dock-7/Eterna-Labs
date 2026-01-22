/**
 * Exchange modal component with Convert, Deposit, and Buy tabs
 */

'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { memo, useState, useEffect, useCallback } from 'react';
import { X, Copy, ArrowUpDown, ChevronDown } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { cn } from '@/src/lib/utils';

interface ExchangeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialTab?: TabType;
}

type TabType = 'convert' | 'deposit' | 'buy';

// Solana icon component
const SolanaIcon = ({ className }: { className?: string }) => (
  <div className={cn('w-5 h-5 rounded-full bg-gradient-to-br from-purple-500 via-blue-500 to-green-500 flex items-center justify-center', className)}>
    <span className="text-white text-xs font-bold">S</span>
  </div>
);

// BNB icon component
const BNBIcon = ({ className }: { className?: string }) => (
  <div className={cn('w-5 h-5 rounded-full bg-yellow-400 flex items-center justify-center', className)}>
    <span className="text-yellow-900 text-xs font-bold">B</span>
  </div>
);

export const ExchangeModal = memo(function ExchangeModal({
  open,
  onOpenChange,
  initialTab = 'deposit',
}: ExchangeModalProps) {
  const [activeTab, setActiveTab] = useState<TabType>(initialTab);

  // Reset to initial tab when modal opens
  useEffect(() => {
    if (open) {
      setActiveTab(initialTab);
    }
  }, [open, initialTab]);
  const [convertFrom, setConvertFrom] = useState('SOL');
  const [convertTo, setConvertTo] = useState('BNB');
  const [buyAmount, setBuyAmount] = useState('0.0');
  const [convertAmount, setConvertAmount] = useState('0.0');
  const [copied, setCopied] = useState(false);

  // Mock deposit address
  const depositAddress = 'GnuXwSmW9R836uRNvKwJhg1xGX2B2uZwmyPHRJ4oTDsG';
  const solPrice = 129.19;

  const handleCopyAddress = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(depositAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  }, [depositAddress]);

  const tabs = [
    { id: 'convert' as TabType, label: 'Convert' },
    { id: 'deposit' as TabType, label: 'Deposit' },
    { id: 'buy' as TabType, label: 'Buy' },
  ];

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/60 z-50 animate-in fade-in-0" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100%-1rem)] sm:w-[calc(100%-2rem)] max-w-md h-[calc(100vh-2rem)] sm:h-[500px] max-h-[500px] bg-slate-900 border border-slate-700 rounded-xl shadow-xl z-50 animate-in fade-in-0 zoom-in-95 p-3 sm:p-4 flex flex-col">
          {/* Header */}
          <div className="flex items-start justify-between mb-4 flex-shrink-0">
            <Dialog.Title className="text-base font-semibold text-white">
              Exchange
            </Dialog.Title>
            <Dialog.Close asChild>
              <button
                className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </Dialog.Close>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-4 flex-shrink-0">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  'flex-1 px-3 py-1.5 text-sm font-medium rounded-lg transition-colors',
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white border border-blue-500'
                    : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700'
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Content Area - Fixed height container */}
          <div className="flex-1 overflow-y-auto min-h-0 pr-1">
            {/* Convert Tab */}
            {activeTab === 'convert' && (
            <div className="space-y-3 pb-2">
              <h3 className="text-base font-semibold text-white mb-3">Swap SOL for BNB</h3>
              
              {/* Converting Field */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-base text-slate-400">Converting</label>
                  <span className="text-xs text-slate-400">Balance: 0</span>
                </div>
                <div className="relative">
                  <input
                    type="number"
                    value={convertAmount}
                    onChange={(e) => setConvertAmount(e.target.value)}
                    placeholder="0.0"
                    className="w-full px-3 py-2 text-base bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
                    <SolanaIcon className="w-4 h-4" />
                    <span className="text-white text-xs font-medium">SOL</span>
                    <ChevronDown className="w-3 h-3 text-slate-400" />
                  </div>
                </div>
                <div className="text-[10px] text-slate-400">$0.71</div>
              </div>

              {/* Swap Icon */}
              <div className="flex justify-center my-3">
                <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center">
                  <ArrowUpDown className="w-4 h-4 text-white" />
                </div>
              </div>

              {/* Gaining Field */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs text-slate-400">Gaining</label>
                  <span className="text-xs text-slate-400">Balance: 0</span>
                </div>
                <div className="relative">
                  <input
                    type="number"
                    value={(parseFloat(convertAmount) * 0.1415).toFixed(4)}
                    readOnly
                    placeholder="0.0"
                    className="w-full px-3 py-2 text-sm bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none"
                  />
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
                    <BNBIcon className="w-4 h-4" />
                    <span className="text-white text-xs font-medium">BNB</span>
                    <ChevronDown className="w-3 h-3 text-slate-400" />
                  </div>
                </div>
                <div className="text-[10px] text-slate-400">1 SOL ≈ 0.1415 BNB</div>
              </div>

              {/* Confirm Button */}
              <button className="w-full mt-4 px-3 py-2 text-sm bg-gradient-to-r from-purple-600 to-purple-700 text-white font-medium rounded-lg hover:opacity-90 transition-opacity">
                Confirm
              </button>
            </div>
            )}

            {/* Deposit Tab */}
            {activeTab === 'deposit' && (
            <div className="space-y-4 pb-2">
              {/* Cryptocurrency Selection */}
              <div className="flex items-center gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg">
                    <SolanaIcon className="w-4 h-4" />
                    <span className="text-white text-xs font-medium">Solana</span>
                    <ChevronDown className="w-3 h-3 text-slate-400 ml-auto" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg">
                    <span className="text-xs text-slate-400">Balance: </span>
                    <span className="text-xs text-white">0 SOL</span>
                  </div>
                </div>
              </div>

              {/* Warning */}
              <div className="p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                <p className="text-xs text-yellow-400">
                  Only deposit Solana through the Solana network for this address.
                </p>
              </div>

              {/* QR Code and Address */}
              <div className="flex flex-col sm:flex-row gap-4 items-start">
                {/* QR Code */}
                <div className="flex-shrink-0 mx-auto sm:mx-0">
                  <div className="w-32 h-32 p-3 bg-white rounded-lg flex items-center justify-center relative">
                    <QRCodeSVG
                      value={depositAddress}
                      size={120}
                      level="H"
                      includeMargin={false}
                    />
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <SolanaIcon className="w-10 h-10" />
                    </div>
                  </div>
                </div>

                {/* Deposit Address */}
                <div className="flex-1 min-w-0">
                  <label className="block text-xs text-slate-400 mb-1.5">Deposit Address</label>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg">
                      <p className="text-base text-white font-mono break-all">{depositAddress}</p>
                    </div>
                    <button
                      onClick={handleCopyAddress}
                      className="p-2 bg-slate-800 border border-slate-700 rounded-lg hover:bg-slate-700 transition-colors"
                      aria-label="Copy address"
                    >
                      <Copy className={cn('w-4 h-4', copied ? 'text-green-400' : 'text-slate-400')} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Onramper Link */}
              <div className="text-center">
                <p className="text-xs text-slate-400 mb-2">
                  Don't have any Solana?{' '}
                  <a
                    href="https://onramper.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 underline"
                  >
                    Buy through Onramper.
                  </a>
                </p>
              </div>

              {/* Copy Address Button */}
              <button
                onClick={handleCopyAddress}
                className="w-full px-3 py-2 text-sm bg-gradient-to-r from-purple-600 to-purple-700 text-white font-medium rounded-lg hover:opacity-90 transition-opacity"
              >
                {copied ? 'Copied!' : 'Copy Address'}
              </button>
            </div>
            )}

            {/* Buy Tab */}
            {activeTab === 'buy' && (
            <div className="space-y-3 pb-2">
              {/* Cryptocurrency Selection */}
              <div className="flex items-center gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg">
                    <SolanaIcon className="w-4 h-4" />
                    <span className="text-white text-xs font-medium">Solana</span>
                    <ChevronDown className="w-3 h-3 text-slate-400 ml-auto" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg">
                    <span className="text-xs text-slate-400">Balance: </span>
                    <span className="text-xs text-white">0 SOL</span>
                  </div>
                </div>
              </div>

              {/* Buying Input */}
              <div className="space-y-1.5">
                <label className="text-xs text-slate-400">Buying</label>
                <div className="relative">
                  <input
                    type="number"
                    value={buyAmount}
                    onChange={(e) => setBuyAmount(e.target.value)}
                    placeholder="0.0"
                    className="w-full px-3 py-2 text-sm bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
                    <span className="text-xs text-slate-400">SOL Price: {solPrice}</span>
                    <SolanaIcon className="w-4 h-4" />
                    <span className="text-xs text-white">SOL</span>
                  </div>
                </div>
                <div className="text-[10px] text-red-400">Minimum: 20 USD</div>
                <div className="text-[10px] text-slate-400">
                  ≈ ${(parseFloat(buyAmount) * solPrice).toFixed(2)} USD
                </div>
              </div>

              {/* Powered By */}
              <div className="text-center py-3">
                <p className="text-[10px] text-slate-400 mb-1">powered by</p>
                <div className="inline-flex items-center gap-1.5">
                  <div className="w-5 h-5 rounded bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                    <span className="text-white text-[10px] font-bold">C</span>
                  </div>
                  <span className="text-xs text-slate-400">conramper</span>
                </div>
              </div>

              {/* Buy Button */}
              <button className="w-full px-3 py-2 text-sm bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:opacity-90 transition-opacity">
                Buy
              </button>
            </div>
            )}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
});
