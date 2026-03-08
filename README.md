# Website Ops Notes

## Runtime Config

Set these in `index.html` under `window.TP_CONFIG`:

- `calendlyUrl`: booking link used by primary CTA
- `formEndpoint`: Google Apps Script web app URL for lead capture

Example:

```html
<script>
  window.TP_CONFIG = {
    calendlyUrl: "https://calendly.com/connor-tessaropartners/15-min-meeting",
    formEndpoint: "https://script.google.com/macros/s/XXX/exec"
  };
</script>
```

## Domain

Use Vercel with:

- apex `A @ -> 76.76.21.21`
- `www` `A -> 76.76.21.21`
