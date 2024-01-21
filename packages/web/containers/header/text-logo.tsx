import { Title, Text } from '@mantine/core';
import classes from './index.module.css';

export default function TextLogo() {
  return (
    <Title className={classes.textLogo} ta="center">
      <Text inherit variant="gradient" component="span" gradient={{ from: 'pink', to: 'yellow' }}>
        Tasks
      </Text>{' '}
      Management Software
    </Title>
  );
}
