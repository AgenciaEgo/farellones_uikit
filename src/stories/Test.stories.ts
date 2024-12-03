import type { Meta, StoryObj } from '@storybook/react';

import TestClient from '../components/test_client/TestClient';

const meta = {
    title: 'Test',
    component: TestClient,
    parameters: {
        layout: 'centered',
    },
    tags: ['!autodocs'],
} satisfies Meta<typeof TestClient>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        text: 'Test!',
        handleClick: () => console.log('Click!'),
    },
};
