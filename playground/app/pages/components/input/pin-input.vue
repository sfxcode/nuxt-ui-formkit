<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
const pinInputSchema = [
  {
    $formkit: 'nuxtUIPinInput',
    id: 'pin-basic',
    name: 'pin1',
    placeholder: '-',
    label: 'Basic PIN Input',
    help: 'Enter a 6-digit PIN',
    validation: 'required',
  },
  {
    $formkit: 'nuxtUIPinInput',
    name: 'pin2',
    placeholder: '0',
    label: '4-Digit PIN',
    help: 'Short PIN code',
    length: 4,
    validation: 'required',
  },
  {
    $formkit: 'nuxtUIPinInput',
    name: 'pin3',
    placeholder: '0',
    label: '8-Digit Code',
    help: 'Extended verification code',
    length: 8,
  },
  {
    $formkit: 'nuxtUIPinInput',
    name: 'pin4',
    placeholder: '*',
    label: 'Masked PIN',
    help: 'PIN is masked for security',
    mask: true,
    validation: 'required',
  },
  {
    $formkit: 'nuxtUIPinInput',
    name: 'pin5',
    placeholder: '0',
    label: 'OTP Mode',
    help: 'One-time password mode',
    otp: true,
    length: 6,
    validation: 'required',
  },
  {
    $formkit: 'nuxtUIPinInput',
    name: 'pin6',
    placeholder: '0',
    label: 'With Autofocus',
    help: 'Automatically focused on load',
    autofocus: true,
    length: 6,
  },
  {
    $formkit: 'nuxtUIPinInput',
    name: 'pin7',
    placeholder: '-',
    label: 'With Highlight',
    help: 'Highlighted style',
    highlight: true,
    length: 6,
  },
  {
    $formkit: 'nuxtUIPinInput',
    name: 'pin8',
    placeholder: '0',
    label: 'Small Size',
    size: 'sm',
    length: 4,
  },
  {
    $formkit: 'nuxtUIPinInput',
    name: 'pin9',
    placeholder: '0',
    label: 'Medium Size (Default)',
    size: 'md',
    length: 4,
  },
  {
    $formkit: 'nuxtUIPinInput',
    name: 'pin10',
    placeholder: '0',
    label: 'Large Size',
    size: 'lg',
    length: 4,
  },
  {
    $formkit: 'nuxtUIPinInput',
    name: 'pin11',
    placeholder: '0',
    label: 'Extra Large Size',
    size: 'xl',
    length: 4,
  },
  {
    $formkit: 'nuxtUIPinInput',
    name: 'pin12',
    placeholder: '0',
    label: 'Primary Color',
    color: 'primary',
    length: 4,
  },
  {
    $formkit: 'nuxtUIPinInput',
    name: 'pin13',
    placeholder: '0',
    label: 'Success Color',
    color: 'success',
    length: 4,
  },
  {
    $formkit: 'nuxtUIPinInput',
    name: 'pin14',
    placeholder: '0',
    label: 'Error Color',
    color: 'error',
    length: 4,
  },
  {
    $formkit: 'nuxtUIPinInput',
    name: 'pin15',
    placeholder: '0',
    label: 'Outline Variant',
    variant: 'outline',
    length: 4,
  },
  {
    $formkit: 'nuxtUIPinInput',
    name: 'pin16',
    placeholder: '0',
    label: 'Soft Variant',
    variant: 'soft',
    length: 4,
  },
  {
    $formkit: 'nuxtUIPinInput',
    name: 'pin17',
    placeholder: '0',
    label: 'Subtle Variant',
    variant: 'subtle',
    length: 4,
  },
  {
    $formkit: 'nuxtUIPinInput',
    name: 'pin18',
    placeholder: '0',
    label: 'With Fixed Positioning',
    fixed: true,
    length: 4,
  },
  {
    $formkit: 'nuxtUIPinInput',
    name: 'pin20',
    placeholder: '0',
    label: 'Disabled',
    disabled: true,
    value: '9876',
    length: 4,
  },
]
</script>

<template>
  <div>
    <UContainer>
      <div class="mb-8">
        <h1 class="text-4xl font-bold mb-4">
          PinInput Component
        </h1>
        <p class="text-lg text-muted-foreground mb-2">
          The PinInput component integrates FormKit with Nuxt UI's UPinInput component, providing a seamless PIN/OTP input experience.
        </p>
        <p class="text-muted-foreground">
          Explore various PIN input configurations, validation patterns, styling options, and states below.
        </p>
      </div>

      <USeparator class="my-8" />

      <div class="space-y-12">
        <section>
          <h2 class="text-2xl font-semibold mb-4">
            Length Variations
          </h2>
          <p class="text-muted-foreground mb-6">
            Configure different PIN lengths (4, 6, or 8 digits).
          </p>
          <FUDataEdit
            :data="{}"
            :schema="pinInputSchema.slice(0, 3)"
          />
        </section>

        <USeparator />

        <section>
          <h2 class="text-2xl font-semibold mb-4">
            Security Features
          </h2>
          <p class="text-muted-foreground mb-6">
            Enable masking for secure input or OTP mode for one-time passwords.
          </p>
          <FUDataEdit
            :data="{}"
            :schema="pinInputSchema.slice(3, 5)"
          />
        </section>

        <USeparator />

        <section>
          <h2 class="text-2xl font-semibold mb-4">
            Input Features
          </h2>
          <p class="text-muted-foreground mb-6">
            Configure autofocus and highlight styling.
          </p>
          <FUDataEdit
            :data="{}"
            :schema="pinInputSchema.slice(5, 7)"
          />
        </section>

        <USeparator />

        <section>
          <h2 class="text-2xl font-semibold mb-4">
            Sizes
          </h2>
          <p class="text-muted-foreground mb-6">
            Available sizes: xs, sm, md (default), lg, and xl.
          </p>
          <FUDataEdit
            :data="{}"
            :schema="pinInputSchema.slice(7, 11)"
          />
        </section>

        <USeparator />

        <section>
          <h2 class="text-2xl font-semibold mb-4">
            Colors
          </h2>
          <p class="text-muted-foreground mb-6">
            Customize PIN input colors.
          </p>
          <FUDataEdit
            :data="{}"
            :schema="pinInputSchema.slice(11, 14)"
          />
        </section>

        <USeparator />

        <section>
          <h2 class="text-2xl font-semibold mb-4">
            Variants
          </h2>
          <p class="text-muted-foreground mb-6">
            Different variants including outline, soft, and subtle.
          </p>
          <FUDataEdit
            :data="{}"
            :schema="pinInputSchema.slice(14, 17)"
          />
        </section>

        <USeparator />

        <section>
          <h2 class="text-2xl font-semibold mb-4">
            Styling Options
          </h2>
          <p class="text-muted-foreground mb-6">
            Fixed positioning for input elements.
          </p>
          <FUDataEdit
            :data="{}"
            :schema="pinInputSchema.slice(17, 18)"
          />
        </section>

        <USeparator />

        <section>
          <h2 class="text-2xl font-semibold mb-4">
            States
          </h2>
          <p class="text-muted-foreground mb-6">
            Different states including readonly and disabled.
          </p>
          <FUDataEdit
            :data="{}"
            :schema="pinInputSchema.slice(18, 20)"
          />
        </section>
      </div>
    </UContainer>
  </div>
</template>
