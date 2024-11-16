import axios from 'axios';

const authToken = Buffer.from(process.env.XENDIT_SECRET_KEY!).toString(
  'base64'
);

export async function createInvoice() {
  try {
    const { data, status } = await axios.post(
      'https://api.xendit.co/v2/invoices',
      {
        external_id: 'xendit_test_id_1',
        amount: 110000,
        currency: 'PHP',
        customer: {
          given_names: 'Ahmad',
          surname: 'Gunawan',
          email: 'ahmad_gunawan@example.com',
          mobile_number: '+6287774441111',
        },
        customer_notification_preference: {
          invoice_paid: ['email', 'whatsapp'],
        },
        success_redirect_url: 'example.com/success',
        failure_redirect_url: 'example.com/failure',
        items: [
          {
            name: 'PAlawan Tour',
            quantity: 1,
            price: 7000,
            category: 'Tour',
          },
        ],
      },
      {
        headers: {
          Authorization: `Basic ${authToken}`,
        },
      }
    );

    console.log(`Response returned with a status of ${status}`);

    const { invoice_url } = data;

    console.log(`Invoice created! Visit ${invoice_url} to complete payment`);
  } catch (error) {
    console.log('Request failed', error);
  }
}
