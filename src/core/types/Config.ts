import { Network, Wei } from './Blockchain';
import { NetworkSettings, Theme, Language } from './Settings';

export interface Config extends Env, Constants {}

export interface Env {
  ENV: string;
  VERSION: string;
  HOST: string;
  NETWORK: Network;
  USE_MAINNET_FORK: boolean;
  USE_SDK_MOCK: boolean;
  ALLOW_DEV_MODE: boolean;
  ETHEREUM_PROVIDER_HTTPS: string | undefined;
  FANTOM_PROVIDER_HTTPS: string | undefined;
  ARBITRUM_PROVIDER_HTTPS: string | undefined;
  OPTIMISM_PROVIDER_HTTPS: string | undefined;
  CUSTOM_PROVIDER_HTTPS: string;
  INFURA_PROJECT_ID: string | undefined;
  ETHERSCAN_API_KEY: string | undefined;
  ALCHEMY_API_KEY: string | undefined;
  BLOCKNATIVE_KEY: string | undefined;
  FORTMATIC_KEY: string | undefined;
  PORTIS_KEY: string | undefined;
  UNSTOPPABLE_DOMAINS_ID: string | undefined;
  ZAPPER_API_KEY: string | undefined;
  YEARN_SUBGRAPH_KEY: string | undefined;
}

export interface Constants {
  STATE_VERSION: number;
  MAX_UINT256: Wei;
  YEARN_API: string;
  YEARN_ALERTS_API: string;
  SUPPORTED_NETWORKS: Network[];
  NETWORK_SETTINGS: NetworkSettings;
  RPC_URL: {
    [network: string]: string;
  };
  CONTRACT_ADDRESSES: {
    [KEY: string]: string;
  };
  SLIPPAGE_OPTIONS: number[];
  DEFAULT_SLIPPAGE: number;
  IRON_BANK_MAX_RATIO: number;
  DEFAULT_THEME: Theme;
  AVAILABLE_THEMES: Theme[];
  AVAILABLE_CUSTOM_THEMES: Theme[];
  DEFAULT_ALERT_TIMEOUT: number;
  DEFAULT_LANG: Language;
  SUPPORTED_LANGS: Language[];
  DUST_AMOUNT_USD: string;
  YEARN_SUBGRAPH_ID: string;
  ASSETS_ICON_URL: string;
  ZAPPER_AUTH_TOKEN: string;
}
