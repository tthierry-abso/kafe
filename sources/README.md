<img {{MD}}align="right"{{/MD}} src="<%= HOMEPAGE %>/assets/logo-<%= PACKAGE %>.png" width="160" height="256" alt="<%= PACKAGE %>" />
### <%= PACKAGE %> v<%= VERSION %>
#### <%= DESCRIPTION %>
> <%= DEFINITION %>

<br>

## Quick start

#### Requirements
A jQuery instance that will be copied in <%= PACKAGE %>.

```html
<script src="//ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js"></script>
<script>window.<%= PACKAGE %>jQuery = window.jQuery</script>
```

#### With [Grunt](http://gruntjs.com/)
- Take the files under [builds](<%= REPO_URL %>/builds) folder and put them in a `libs` folder next to your `gruntfile.js`.
- Use [grunt-contrib-requirejs](https://github.com/gruntjs/grunt-contrib-requirejs) with a setup looking like this:

```js
config.requirejs.core = {
	options: {
		baseUrl:                 './',
		name:                    'libs/<%= PACKAGE %>/<%= PACKAGE %>',
		include:                 ['libs/<%= PACKAGE %>/date','libs/<%= PACKAGE %>/string'],
		out:                     'js/<%= PACKAGE %>-build.js',
		optimize:                'uglify',
		preserveLicenseComments: false,
		skipModuleInsertion:     true,
		findNestedDependencies:  true,
		pragmasOnSave:           { excludeRequire: true }
	}
};
```

#### Standalone
- Take the files under [builds](<%= REPO_URL %>/builds) folder and put them in your project.
- Remove the `require()` in the files header and include them manually.


{{MD}}
## Documentation
Visit the [<%= HOMEPAGE %>](<%= HOMEPAGE %>) website for all the things.
{{/MD}}

{{DOC}}
## Sources
Visit the [Github repository](<%= REPO %>) for all the things.
{{/DOC}}

## Release history
See the [CHANGELOG](<%= REPO_URL %>/CHANGELOG).

## License 
See the [MIT LICENSE](<%= REPO_URL %>/LICENSE).