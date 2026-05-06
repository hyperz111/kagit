# kagitin

Minimal Git Hooks.

> [!NOTE]
> Please see [Under the hood](#under-the-hood)

## Install

```sh
$ npm install kagitin --save-dev
```

## Usage

### Preparing

Add hook script to `kagitin` property in `package.json`:

```jsonc
{
	// ...
	"kagitin": {
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
		"prepare": "kagitin",
	},
	// ...
}
```

Register:

```sh
npm run prepare
```

### Uninstall

Just remove the `.git/hooks` directory:

```sh
rm -rf .git/hooks
```

### Changing

If you change the hook script:

```jsonc
{
	// ...
	"kagitin": {
		"pre-commit": "echo 'Commiting your changes...'", // Change the script
		"pre-push": "echo 'Pushing...'", // Add pre-push hook
	},
	// ...
}
```

You must run `kagitin` again (reinstall):

```sh
npx kagitin
```

> [!TIP]
> If you oftenly change the hook script, the better way is combine it with [`npm` scripts]().
>
> ```jsonc
> {
> 	// ...
> 	"scripts": {
> 		"prepare": "kagitin",
> 		"hooks:pre-commit": "npx nano-staged", // Now you can change this oftenly without reinstall
> 	},
> 	// ...
> 	"kagitin": {
> 		"pre-commit": "npm run hooks:pre-commit",
> 	},
> 	// ...
> }
> ```

### Skip installing

If you want to skip the installation, you can set `KAGIT` variable to `0`:

```sh
export KAGIT=0
npx kagitin # not doing anything
```

## Under the Hood

`kagitin` will check if `.git` directory and `package.json` file are available.
If available, it will cleanup the `.git/hooks/` directory and fill it with scripts based on `package.json` configuration.
The scripts will be like this:

```sh
#!/bin/sh
# Your script in here
```

If you see on above, this script only run the command directly without any magic like prepending `PATH`, skip variable, init script, and other.
Because that, `kagitin` is so minimalist and should be used for small projects.

## Credits

This tool is inspired by some populer similar tools:

- [`husky`](https://github.com/typicode/husky)
- [`simple-git-hooks`](https://github.com/toplenboren/simple-git-hooks)

## Name?

The original name of `kagitin` is `kagit` (_/ka-git/_, because the publishing problem), which is an acroymn of **"Kait Git"** (Indonesian for **"Git Hooks"**).

## License

MIT
