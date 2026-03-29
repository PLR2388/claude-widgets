# claude-widgets

A collection of embeddable HTML widgets for Claude-related tooling.

---

## Widgets

### 🕐 Claude Code — Peak Hours

A lightweight, embeddable banner that shows whether Claude Code is currently in peak or off-peak hours, based on Anthropic's observed usage patterns (8am–2pm ET on weekdays).

**Features**
- Live clock updated every second
- Three states: peak, off-peak, weekend
- Countdown to next state change
- Automatically detects browser language — supports 35 languages
- Zero dependencies, pure HTML/JS/JSON
- Fully transparent background, embeds anywhere

**Supported languages**

Arabic, Bengali, Bulgarian, Catalan, Chinese (Simplified), Chinese (Traditional), Croatian, Czech, Danish, Dutch, English, Basque, Finnish, French, Galician, German, Greek, Hebrew, Hindi, Hungarian, Indonesian, Italian, Japanese, Korean, Malay, Norwegian, Persian, Polish, Portuguese, Romanian, Russian, Slovak, Spanish, Swedish, Tamil, Thai, Turkish, Ukrainian, Vietnamese

**Files**
```
claude-widgets/
├── index.html   # Widget markup and styles
├── app.js       # Logic: state detection, i18n loading, DOM updates
└── i18n.json    # Translations for all 35 supported languages
```

**Embed**

Host the three files together (e.g. GitHub Pages) and load `index.html` in an `<iframe>`:

```html
<iframe
  src="https://your-username.github.io/claude-widgets/"
  width="520"
  height="90"
  frameborder="0"
  scrolling="no"
  style="border:none;overflow:hidden;">
</iframe>
```

---

## License

MIT
