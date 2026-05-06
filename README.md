# kagit

Minimal Git Hooks.

> [!TIP]
> Please see [Under the hood](#under-the-hood)

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
	"kagit": {
		"pre-commit": "echo 'Commiting your changes...'", // Change the script
		"pre-push": "echo 'Pushing...'", // Add pre-push hook
	},
	// ...
}
```

You must run `kagit` again (reinstall):

```sh
npx kagit
```

> [!TIP]
> If you oftenly change the hook script, the better way is combine it with [`npm` scripts]().
>
> ```jsonc
> {
> 	// ...
> 	"scripts": {
> 		"prepare": "kagit",
> 		"hooks:pre-commit": "npx nano-staged", // Now you can change this oftenly without reinstall
> 	},
> 	// ...
> 	"kagit": {
> 		"pre-commit": "npm run hooks:pre-commit",
> 	},
> 	// ...
> }
> ```

### Skip installing

If you want to skip the installation, you can set `KAGIT` variable to `0`:

```sh
export KAGIT=0
npx kagit # not doing anything
```

## Under the Hood

`kagit` will check if `.git` directory and `package.json` file are available.
If available, it will cleanup the `.git/hooks/` directory and fill it with scripts based on `package.json` configuration.
The scripts will be like this:

```sh
#!/bin/sh
# Your script in here
```

If you see on above, this script only run the command directly without any magic like prepending `PATH`, skip variable, init script, and other.
Because that, `kagit` is so minimalist and should be used for small projects.

## Credits

This tool is inspired by some populer similar tools:

- [`husky`](https://github.com/typicode/husky)
- [`simple-git-hooks`](https://github.com/toplenboren/simple-git-hooks)

## Name?

`kagit` (_/ka-git/_) is an acroymn of **"Kait Git"**, which is the Indonesian for **"Git Hooks"**.

## License

MIT
