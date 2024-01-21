'use client';

import { Center, Loader } from '@mantine/core';
import { useEffect, useState } from 'react';
import { isLoggedIn } from '@/services/auth';

const LOGIN_PATH = '/';

export function AuthHoc({ children }: { children: any }) {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const validateAuth = async () => {
      const isAuthenticated: Boolean = await isLoggedIn();
      if (!isAuthenticated) {
        window.location.href = LOGIN_PATH;
      }
      setAuthenticated(true);
    };

    validateAuth();
  }, []);

  if (!authenticated) {
    return (
      <Center h="100vh">
        <Loader />
      </Center>
    );
  }

  return children;
}

export default AuthHoc;
