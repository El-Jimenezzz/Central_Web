/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_WEBHOOK_RESERVA: string;
  readonly VITE_WEBHOOK_CONDUCTOR: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
