import type { Meta, StoryObj } from '@storybook/vue3'

import LanguageSwitcher from '../LanguageSwitcher.vue'

const meta = {
  title: 'Features/LanguageSwitcher',
  component: LanguageSwitcher,
  tags: ['autodocs'],
  argTypes: {},
  args: {} // default value
} satisfies Meta<typeof LanguageSwitcher>

export default meta
type Story = StoryObj<typeof meta>

export const SimpleComponent: Story = {
  args: {}
}

export const CustomTemplate: Story = {
  args: {},
  render: (args) => ({
    components: { LanguageSwitcher },
    setup() {
      return { args }
    },
    template: '<LanguageSwitcher />'
  })
}
