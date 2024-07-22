import { atom } from 'recoil';

export const globalState = atom({
  key: 'globalState',
  default: {
    meubles: [],
    form_address: {
      dep: {},
      arr: {}
    },
    form_client: {}
  },
});
