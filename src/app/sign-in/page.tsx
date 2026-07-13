'use client';
import { Container, Paper, Title, Text, TextInput, PasswordInput, Button, Box, Anchor } from '@mantine/core';
import Link from 'next/link';

export default function SignInPage() {
  return (
    <Box pt={120} pb={80}>
      <Container size="xs">
        <Paper withBorder shadow="md" p="xl" radius="md" style={{ backgroundColor: 'white' }}>
          <Title order={2} ta="center" mb={4}>Welcome back</Title>
          <Text c="gray.6" ta="center" size="sm" mb="lg">Sign in to your eHealthwares account</Text>

          <TextInput label="Email" placeholder="you@organization.com" required mb="md" />
          <PasswordInput label="Password" placeholder="Enter your password" required mb="xs" />

          <Anchor component={Link} href="#" size="xs" c="brand.6" style={{ float: 'right' }} mb="lg">
            Forgot password?
          </Anchor>

          <Button fullWidth size="md" color="brand" mb="md">Sign In</Button>

          <Text ta="center" size="sm" c="gray.6">
            Don&apos;t have an account?{' '}
            <Anchor component={Link} href="/contact" c="brand.6">Contact us</Anchor>
          </Text>
        </Paper>
      </Container>
    </Box>
  );
}
