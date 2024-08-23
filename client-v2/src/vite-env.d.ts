/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BASEURL: string;
  readonly ACCESS_TOKEN: string;
  readonly REFRESH_TOKEN: string;
  readonly ORGANIZATION: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
