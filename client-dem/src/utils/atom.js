// atoms.js
import { atom } from 'recoil';

export const globalState = atom({
  key: 'globalState',
  default: {
    meubles: null,
    form_address: null,
    form_client : null
  },
});
