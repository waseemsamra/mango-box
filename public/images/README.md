# Image Storage Directory

This directory contains all static images for the KisanFresh application.

## Directory Structure

```
/images/
├── categories/
│   ├── mangoes/
│   │   ├── banner.jpg
│   │   └── thumbnail.jpg
│   ├── seasonal-fruits/
│   │   ├── banner.jpg
│   │   └── thumbnail.jpg
│   └── vegetables/
│       ├── banner.jpg
│       └── thumbnail.jpg
├── products/
│   ├── mangoes/
│   │   ├── dussehri-mango-1.jpg
│   │   ├── dussehri-mango-2.jpg
│   │   ├── chaunsa-mango-1.jpg
│   │   ├── chaunsa-mango-2.jpg
│   │   ├── anwar-ratol-1.jpg
│   │   ├── anwar-ratol-2.jpg
│   │   ├── almas-mango-1.jpg
│   │   ├── almas-mango-2.jpg
│   │   ├── badami-mango-1.jpg
│   │   └── badami-mango-2.jpg
│   ├── fruits/
│   └── vegetables/
├── origins/
│   ├── pakistan/
│   │   ├── lahore-thumb.jpg
│   │   ├── karachi-thumb.jpg
│   │   ├── islamabad-thumb.jpg
│   │   ├── multan-thumb.jpg
│   │   ├── peshawar-thumb.jpg
│   │   ├── quetta-thumb.jpg
│   │   ├── faisalabad-thumb.jpg
│   │   ├── sahiwal-thumb.jpg
│   │   ├── sialkot-thumb.jpg
│   │   ├── gujranwala-thumb.jpg
│   │   └── hyderabad-thumb.jpg
│   └── other-countries/
└── ui/
    ├── logos/
    ├── icons/
    └── backgrounds/
```

## Image Guidelines

- **Format**: Use JPEG for photos, PNG for graphics with transparency
- **Size**: Optimize for web (max 800x800px for product images)
- **Compression**: Balance quality and file size
- **Naming**: Use kebab-case with descriptive names
- **Alt Text**: Always provide meaningful alt text for accessibility

## Usage

Images in this directory are served statically and can be accessed via:
```
/images/[category]/[filename]
```

Example:
```html
<img src="/images/products/mangoes/dussehri-mango-1.jpg" alt="Fresh Dussehri Mangoes" />
```
