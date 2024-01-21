'use client';

import { useEffect, useState } from 'react';
import { Center, Loader } from '@mantine/core';
import { login } from '@/services/auth';
import appConfig from '@/app.config.mjs';
import AuthenticationForm from '@/containers/login-page/auth-form';

export default function LandingPage() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleToken = async (token: string) => {
      setLoading(true);
      // Try getting the user details from the session
      const user = await login(token);
      if (!user) {
        throw new Error('Failed to login');
      }
      // Redirect after successful login
      window.location.href = appConfig.loginRedirect;
    };

    const token = new URLSearchParams(window.location.search).get('token');
    if (token) {
      handleToken(token);
    }
  }, []);

  if (loading) {
    return (
      <Center h="100vh">
        <Loader />
      </Center>
    );
  }

  return <AuthenticationForm />;
}
