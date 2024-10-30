import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface CPImageProps {
  imageUrl: string;
  visible: boolean;
  onClose: () => void;
}

export const CPImage: React.FC<CPImageProps> = ({ imageUrl, visible, onClose }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!visible) {
      setIsLoaded(false);
    }
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="relative max-w-2xl w-full bg-white rounded-xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-2 right-2 p-2 bg-white/80 rounded-full hover:bg-white transition-colors z-10"
            >
              <X className="w-6 h-6" />
            </button>

            {!isLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
            <img
              src={imageUrl}
              alt="CP合照"
              className={`w-full h-auto transition-opacity duration-300 ${
                isLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={() => setIsLoaded(true)}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};