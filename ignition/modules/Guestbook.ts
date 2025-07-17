import { buildModule } from '@nomicfoundation/hardhat-ignition/modules';

const GuestbookModule = buildModule('GuestbookModule', (m) => {
  const guestbook = m.contract('Guestbook');
  return { guestbook };
});

export default GuestbookModule;
