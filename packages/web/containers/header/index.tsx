import { useEffect, useState } from 'react';
import { Container, Group } from '@mantine/core';
import { getUserInfo, logout } from '@/services/auth';
import appConfig from '@/app.config.mjs';

import classes from './index.module.css';
import UserDropdown from './user-dropdown';
import TextLogo from './text-logo';

export default function Header() {
  const [user, setUser] = useState();

  useEffect(() => {
    // Get user info when mounted
    const retrieveUser = async () => {
      const localUser = await getUserInfo();
      setUser(localUser);
    };
    retrieveUser();
  }, []);

  const handleSignOut = async () => {
    logout();
    // Redirect after logout
    window.location.href = appConfig.logoutRedirect; 
  };

  return (
    <div className={classes.header}>
      <Container className={classes.mainSection} size="lg">
        <Group justify="space-between">
          <TextLogo />

          <UserDropdown user={user} onSignOut={handleSignOut} />
        </Group>
      </Container>
    </div>
  );
}
