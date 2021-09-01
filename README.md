# yaml-dts-gen

generate d.ts file from yaml

# Install
```
yarn add yaml-dts -D
```

# Usage

as default, this cli generate .d.ts file.
Its filename follows original yaml file, like original.yml, then generate original.d.ts .

```bash
npm i -g typescript
npx yaml-dts [target yaml file]
```

# Example

```bash
npx yaml-dts a.yml
npx yaml-dts b.yaml
npx yaml-dts config/*
npx yaml-dts config/*.yml
npx yaml-dts config/*.yaml
```
