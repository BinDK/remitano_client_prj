import { createConsumer } from '@rails/actioncable';

const cableUrl = process.env.REACT_APP_CABLE_URL || 'ws://localhost:3000/cable';
export const consumer = createConsumer(cableUrl);
