/// <reference types="vite/client" />

interface ImportMetaEnv {
  /**
   * Set to "true" at build time to expose Copernicus Sentinel imagery in the UI.
   * Left unset for the free NASA-only public build. Enabling it also requires the
   * Copernicus server credentials (see `.env.example`).
   */
  readonly VITE_ENABLE_SENTINEL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
