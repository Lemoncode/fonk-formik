# fonk-formik

[![CircleCI](https://badgen.net/github/status/Lemoncode/fonk-formik/master/ci?icon=circleci&label=circleci)](https://circleci.com/gh/Lemoncode/fonk-formik/tree/master)
[![NPM Version](https://badgen.net/npm/v/@lemoncode/fonk-formik?icon=npm&label=npm)](https://www.npmjs.com/package/@lemoncode/fonk-formik)
[![bundle-size](https://badgen.net/bundlephobia/min/@lemoncode/fonk-formik)](https://bundlephobia.com/result?p=@lemoncode/fonk-formik)

This package serves as the entry point to the Formik Form state management library. It is intended to be paired with the generic Fonk package, which is shipped as to npm.

Check our [Fonk Documentation site](https://lemoncode.github.io/fonk-doc/) and [Formik](https://lemoncode.github.io/fonk-doc/formik) section.

How to install:

```bash
npm install @lemoncode/fonk-formik --save
```

Replace _createFormValidation_ with _createFormikValidation_ e.g.

```diff
- import { Validators, createFormValidation } from "@lemoncode/fonk";
+ import { Validators } from "@lemoncode/fonk";
+ import { createFormikValidation } from "@lemoncode/fonk-formik";

const validationSchema = {
  field: {
    email: [Validators.required.validator],
    password: [Validators.required.validator]
  }
};

- export const formValidation = createFormikValidation(validationSchema);
+ export const formValidation = createFormikValidation(validationSchema);
```

Example: how to validate at form validation level (Formik >> validate)

```diff
    <Formik
      initialValues={{ email: "", password: "" }}
+       validate={formValidation.validateForm}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
```

Example: how to validate at field level validation

```diff
  <form onSubmit={handleSubmit}>
    <Field 
      name="email" 
+      validate={(value) => formValidation.validateField("email", value)} />
```

Example: How to display field validation error message:

```diff
    <Field name="email" validate={validateField("email")} />
+    {errors &&
+      errors.email &&
+      errors.email.message &&
+       touched.email && 
+       <div>{errors.email.message}</div>}
```


# About Basefactor + Lemoncode

We are an innovating team of Javascript experts, passionate about turning your ideas into robust products.

[Basefactor, consultancy by Lemoncode](http://www.basefactor.com) provides consultancy and coaching services.

[Lemoncode](http://lemoncode.net/services/en/#en-home) provides training services.

For the LATAM/Spanish audience we are running an Online Front End Master degree, more info: http://lemoncode.net/master-frontend
