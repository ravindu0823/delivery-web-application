/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BASEURL: string;
  readonly VITE_ACCESS_TOKEN: string;
  readonly VITE_REFRESH_TOKEN: string;
  readonly VITE_ORGANIZATION: string;
  readonly VITE_ORGANIZATION_DATA_USERNAME: string;
  readonly VITE_ORGANIZATION_DATA_PASSWORD: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
