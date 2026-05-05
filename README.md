# kagit

Minimal Git Hooks.

## Install

```sh
$ npm install kagit --save-dev
```

## Usage

### Preparing

Add hook script to `kagit` property in `package.json`:

```jsonc
{
	// ...
	"kagit": {
		"pre-commit": "echo 'Commiting...'",
	},
	// ...
}
```

Add this `prepare` script in `package.json`:

```jsonc
{
	// ...
	"scripts": {
		"prepare": "kagit",
	},
	// ...
}
```

Register:

```console
npm run prepare
```

### Uninstall

Just remove the `.git/hooks` directory:

```console
rm -rf .git/hooks
```

### Changing

If you change the hook script:

```jsonc
{
	// ...
	"kagit": {
		"pre-commit": "echo 'Commiting your changes...'", // Change the script
		"pre-push": "echo 'Pushing...'", // Add pre-push hook
	},
	// ...
}
```

You must run `kagit` again (reinstall):

```console
npx kagit
```

## Credits

This tool is inspired by some populer similar tools:

- [`husky`](https://github.com/typicode/husky)
- [`simple-git-hooks`](https://github.com/toplenboren/simple-git-hooks)

## Name?

`kagit` (_/ka-git/_) is an acroymn of **"Kait Git"**, which is the Indonesian for **"Git Hooks"**.

## License

MIT
