import { createConsumer } from '@rails/actioncable';

const cableUrl = process.env.REACT_APP_CABLE_URL || 'wss://vsharing.bindk.ovh/cable';
export const consumer = createConsumer(cableUrl);
