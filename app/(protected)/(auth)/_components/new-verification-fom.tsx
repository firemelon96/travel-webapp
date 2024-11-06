'use client';

import { BeatLoader } from 'react-spinners';
import { useSearchParams } from 'next/navigation';
import { CardWrapper } from './card-wrapper';
import { useCallback, useEffect, useState } from 'react';
import { newVerification } from '@/actions/auth-actions';
import { FormSuccess } from '@/components/form-success';
import { FormError } from '@/components/form-error';

export const NewVerificationForm = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const onSubmit = useCallback(() => {
    if (!token) {
      setError('Missing Token');
      return;
    }

    //actions
    newVerification(token)
      .then((data) => {
        setSuccess(data.success);
        setError(data.error);
      })
      .catch(() => {
        setError('Something went wrong!');
      });
  }, [token]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <CardWrapper
      headerLabel='Confirming your verification.'
      backButtonHref='/sign-in'
      backButtonLabel='Back to login'
    >
      <div className='flex justify-center items-center w-full'>
        {!success && !error && <BeatLoader />}
        <FormSuccess message={success} />
        <FormError message={error} />
      </div>
    </CardWrapper>
  );
};