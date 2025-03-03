import { memoize } from 'lodash';

import { Constants, NetworkSettings } from '@types';
import { getEnv } from '@config/env';
import { encode } from '@src/utils';

const ADDRESSES = {
  NATIVE: '0x0000000000000000000000000000000000000000',
  ETH: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
  WETH: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
  DAI: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
  USDC: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
  USDT: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
  WBTC: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
  CRV: '0xD533a949740bb3306d119CC777fa900bA034cd52',
  VECRV: '0x5f3b5DfEb7B28CDbD7FAba78963EE202a494e2A2',
  YVECRV: '0xc5bDdf9843308380375a611c18B50Fb9341f502A',
  THREECRV: '0x6c3F90f043a72FA612cbac8115EE7e52BDe6E490',
  YVTHREECRV: '0x84E13785B5a27879921D6F685f041421C7F482dA',
  YVBOOST: '0x9d409a0A012CFbA9B15F6D4B36Ac57A46966Ab9a',
  YUSD: '0x4B5BfD52124784745c1071dcB244C6688d2533d3',
  YFI: '0x0bc529c00C6401aEF6D220BE8C6Ea1667F6Ad93e',
  YVYFI: '0xdb25cA703181E7484a155DD612b06f57E12Be5F0',
  BLUEPILLNFT: '0x35f5A420ef9BCc748329021FBD4ed0986AbdF201',
  WOOFYNFT: '0x0966a53f2533EaF01D0bB2fa0E2274f3002287F1',
};

const PARTNERS = {
  LEDGER_PARTNER_ID: '0x558247e365be655f9144e1a0140D793984372Ef3',
};

const NETWORK_SETTINGS: NetworkSettings = {
  mainnet: {
    id: 'mainnet',
    name: 'Ethereum',
    networkId: 1,
    rpcUrl: 'https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
    nativeCurrency: {
      name: 'Ethereum',
      symbol: 'ETH',
      decimals: 18,
    },
    simulationsEnabled: true,
    zapsEnabled: true,
    labsEnabled: true,
    ironBankEnabled: false,
    earningsEnabled: true,
    notifyEnabled: true,
    blockExplorerUrl: 'https://etherscan.io',
    txConfirmations: 2,
  },
  fantom: {
    id: 'fantom',
    name: 'Fantom',
    networkId: 250,
    rpcUrl: 'https://rpc.ftm.tools',
    nativeCurrency: {
      name: 'Fantom',
      symbol: 'FTM',
      decimals: 18,
    },
    simulationsEnabled: true,
    zapsEnabled: true,
    labsEnabled: false,
    ironBankEnabled: false,
    earningsEnabled: false,
    notifyEnabled: false,
    blockExplorerUrl: 'https://ftmscan.com',
    txConfirmations: 10,
  },
  arbitrum: {
    id: 'arbitrum',
    name: 'Arbitrum',
    networkId: 42161,
    rpcUrl: 'https://arb1.arbitrum.io/rpc',
    nativeCurrency: {
      name: 'Ethereum',
      symbol: 'ETH',
      decimals: 18,
    },
    simulationsEnabled: false,
    zapsEnabled: false,
    labsEnabled: false,
    ironBankEnabled: false,
    earningsEnabled: false,
    notifyEnabled: false,
    blockExplorerUrl: 'https://arbiscan.io',
    txConfirmations: 2,
  },
  optimism: {
    id: 'optimism',
    name: 'Optimism',
    networkId: 10,
    rpcUrl: 'https://mainnet.optimism.io',
    nativeCurrency: {
      name: 'Ethereum',
      symbol: 'ETH',
      decimals: 18,
    },
    simulationsEnabled: true,
    zapsEnabled: true,
    labsEnabled: false,
    ironBankEnabled: false,
    earningsEnabled: true,
    notifyEnabled: false,
    blockExplorerUrl: 'https://optimistic.etherscan.io',
    txConfirmations: 2,
  },
};

export const getConstants = memoize((): Constants => {
  const {
    ALCHEMY_API_KEY,
    ZAPPER_API_KEY,
    ETHEREUM_PROVIDER_HTTPS,
    FANTOM_PROVIDER_HTTPS,
    ARBITRUM_PROVIDER_HTTPS,
    OPTIMISM_PROVIDER_HTTPS,
  } = getEnv();
  return {
    STATE_VERSION: 1,
    MAX_UINT256: '115792089237316195423570985008687907853269984665640564039457584007913129639935',
    YEARN_API: 'https://api.yearn.finance/v1/chains/1/vaults/all',
    YEARN_ALERTS_API: 'http://yearn-alerts-balancer-2019386215.us-east-1.elb.amazonaws.com',
    SUPPORTED_NETWORKS: ['mainnet', 'fantom', 'arbitrum', 'optimism'],
    NETWORK_SETTINGS,
    RPC_URL: {
      mainnet: ETHEREUM_PROVIDER_HTTPS ?? `https://eth-mainnet.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
      fantom: FANTOM_PROVIDER_HTTPS ?? NETWORK_SETTINGS['fantom'].rpcUrl,
      arbitrum: ARBITRUM_PROVIDER_HTTPS ?? NETWORK_SETTINGS['arbitrum'].rpcUrl,
      optimism: OPTIMISM_PROVIDER_HTTPS ?? NETWORK_SETTINGS['optimism'].rpcUrl,
    },
    CONTRACT_ADDRESSES: {
      zapIn: '0xc2C171bD6FC3B5885b589ed8b4d135F31085e973',
      zapOut: '0x70ed999E2849A3C85EB4a6288B90c7ecA7b807F4',
      y3CrvBackZapper: '0x579422A1C774470cA623329C69f27cC3bEB935a1',
      trustedVaultMigrator: '0x1824df8D751704FA10FA371d62A37f9B8772ab90',
      triCryptoVaultMigrator: '0xC306a5ef4B990A7F2b3bC2680E022E6a84D75fC1',
      ...ADDRESSES,
      ...PARTNERS,
    },
    SLIPPAGE_OPTIONS: [0.01, 0.02, 0.03],
    DEFAULT_SLIPPAGE: 0.01,
    IRON_BANK_MAX_RATIO: 0.8,
    DEFAULT_THEME: 'system-prefs',
    AVAILABLE_THEMES: ['system-prefs', 'light', 'dark', 'cyberpunk', 'classic'],
    AVAILABLE_CUSTOM_THEMES: ['explorer'],
    DEFAULT_ALERT_TIMEOUT: 3000,
    DEFAULT_LANG: 'en',
    SUPPORTED_LANGS: ['en', 'es', 'ja', 'zh'],
    DUST_AMOUNT_USD: '10000000',
    YEARN_SUBGRAPH_ID: '5xMSe3wTNLgFQqsAc5SCVVwT4MiRb5AogJCuSN9PjzXF',
    ASSETS_ICON_URL: 'https://raw.githubusercontent.com/yearn/yearn-assets/master/icons/multichain-tokens/1/',
    ZAPPER_AUTH_TOKEN: encode({ str: `${ZAPPER_API_KEY}:`, encoding: 'base64' }),
  };
});
