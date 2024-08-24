import type { Meta, StoryObj } from '@storybook/vue3'

import ThemeChanger from '../ThemeChanger.vue'

const meta = {
  title: 'Features/ThemeChanger',
  component: ThemeChanger,
  tags: ['autodocs'],
  argTypes: {},
  args: {} // default value
} satisfies Meta<typeof ThemeChanger>

export default meta
type Story = StoryObj<typeof meta>

export const SimpleComponent: Story = {
  args: {}
}

export const CustomTemplate: Story = {
  args: {},
  render: (args) => ({
    components: { ThemeChanger },
    setup() {
      return { args }
    },
    template: '<ThemeChanger />'
  })
}
