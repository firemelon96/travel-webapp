import axios from 'axios';

const authToken = Buffer.from(process.env.XENDIT_SECRET_KEY!).toString(
  'base64'
);

type Item = {
  name: string;
  quantity: number;
  price: number;
  category: string;
};

type Customer = {
  given_names: string;
  email: string;
  mobile_number: string;
};

type NotificationPreferences = {
  invoice_paid: string[];
};

export type Payload = {
  external_id: string;
  amount: number;
  currency: 'PHP' | 'USD';
  items: Item[];
  success_redirect_url: string;
  failure_redirect_url: string;
  customer: Customer;
  customer_notification_preference: NotificationPreferences;
};

export async function createXenditPayment(payload: Payload) {
  const response = await axios.post(
    'https://api.xendit.co/v2/invoices',
    { ...payload },
    {
      headers: {
        Authorization: `Basic ${authToken}`,
      },
    }
  );
  return response.data;
}
