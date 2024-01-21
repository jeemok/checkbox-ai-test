import cx from 'clsx';
import { useState } from 'react';
import {
  Avatar,
  UnstyledButton,
  Group,
  Text,
  Menu,
  rem,
  useMantineColorScheme,
} from '@mantine/core';
import { IconLogout, IconChevronDown, IconSun, IconMoon, IconSunMoon } from '@tabler/icons-react';
import classes from './index.module.css';

export default function UserDropdown({ user, onSignOut }) {
  const [userMenuOpened, setUserMenuOpened] = useState(false);

  const { setColorScheme } = useMantineColorScheme();

  return (
    <Menu
      width={260}
      position="bottom-end"
      transitionProps={{ transition: 'pop-top-right' }}
      onClose={() => setUserMenuOpened(false)}
      onOpen={() => setUserMenuOpened(true)}
      withinPortal
    >
      <Menu.Target>
        <UnstyledButton className={cx(classes.user, { [classes.userActive]: userMenuOpened })}>
          <Group gap={7}>
            <Avatar src={user?.picture} alt={user?.name} radius="xl" size={35} />
            <Text fw={500} lh={1} mt={5} ml={5} mr={3}>
              {user?.name}
              <br />
              <Text fz="xs" c="dimmed" span>
                {user?.email}
              </Text>
            </Text>
            <IconChevronDown style={{ width: rem(12), height: rem(12) }} stroke={1.5} />
          </Group>
        </UnstyledButton>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Settings</Menu.Label>
        <Menu.Item
          leftSection={<IconSun style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
          onClick={() => setColorScheme('light')}
        >
          Light mode
        </Menu.Item>
        <Menu.Item
          leftSection={<IconMoon style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
          onClick={() => setColorScheme('dark')}
        >
          Dark mode
        </Menu.Item>
        <Menu.Item
          leftSection={<IconSunMoon style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
          onClick={() => setColorScheme('auto')}
        >
          Auto mode
        </Menu.Item>

        <Menu.Divider />
        <Menu.Item
          leftSection={<IconLogout style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
          onClick={onSignOut}
        >
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
