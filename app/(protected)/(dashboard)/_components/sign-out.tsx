import { signOutAction } from '@/actions/auth-actions';

export function SignOut() {
  return (
    <form action={signOutAction}>
      <button type='submit'>Sign Out</button>
    </form>
  );
}
