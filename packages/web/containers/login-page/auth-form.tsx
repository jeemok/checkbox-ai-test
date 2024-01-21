import Link from 'next/link';
import { Text, Paper, Group, PaperProps, Center } from '@mantine/core';
import GoogleButton from './google-button';
import appConfig from '@/app.config.mjs';

export default function AuthenticationForm(props: PaperProps) {
  return (
    <Center h="100vh">
      <Paper radius="md" p="xl" ta="center" {...props}>
        <Text size="lg" fw={500}>
          Welcome, please login with
        </Text>

        <Link href={appConfig.googleAuthorize} rel="noreferrer" style={{ textDecoration: 'none' }}>
          <Group grow mb="md" mt="md">
            <GoogleButton radius="xl">Google</GoogleButton>
          </Group>
        </Link>

        <Text c="dimmed" size="xs">
          it's safe I promise.
        </Text>
      </Paper>
    </Center>
  );
}
