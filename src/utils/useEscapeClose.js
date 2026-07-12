import { useEffect } from 'react';

/* Ferme au clavier (Échap) tout élément overlay/sheet ouvert — complète le clic sur le fond. */
export function useEscapeClose(open, onClose) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);
}
