# Dotnet Core Application with Webpack

A simple dotnet core web application that utilises webpack for bundling assets such as javascript, css and images.

Things to do:
- [x] 1. Create Dotnet Core 2.0 project
- [x] 2. Streamline pages and remove cruft that webpack will undertake
- [x] 3. Install yarn and webpack
- [x] 4. Add first webpack config 
- [x] 5. Update build process to run webpack
- [ ] 6. Create production and development configs 
- [ ] 7. Add vendor configs 
- [ ] 8. Include less files
- [ ] 9. Implement more advanced plugins 

1. Using the dotnet core cli create an mvc project
```
dotnet new mvc
```

2. Remove any traces of bootstrap & jquery that are included in the project template. Also remove and tidy up files we do not need going forward.

**Remove:**
* bundleconfig.json
* wwwroot/css/*
* wwwroot/js/*
* wwwroot/images/*
* wwwroot/lib/*
* Views/Shared/_validationScriptsPartial.cshtml

**Edit:**
* Remove from Views/Home/About.cshtml
```html
<p>Use this area to provide additional information.</p>
```

* Remove from Views/Home/Contact.cshtml
```html
    <address>
        One Microsoft Way<br />
        Redmond, WA 98052-6399<br />
        <abbr title="Phone">P:</abbr>
        425.555.0100
    </address>
    
    <address>
        <strong>Support:</strong> <a href="mailto:Support@example.com">Support@example.com</a><br />
        <strong>Marketing:</strong> <a href="mailto:Marketing@example.com">Marketing@example.com</a>
    </address>
```

* Refactor Views/Home/Home.cshtml to
```html
@{
    ViewData["Title"] = "Home Page";
}
<h2 id="title">@ViewData["Title"]</h2>
```

* Remove from Views/Shared/_Layout.cshtml
```html
    <environment include="Development">
        <link rel="stylesheet" href="~/lib/bootstrap/dist/css/bootstrap.css" />
        <link rel="stylesheet" href="~/css/site.css" />
    </environment>
    <environment exclude="Development">
        <link rel="stylesheet" href="https://ajax.aspnetcdn.com/ajax/bootstrap/3.3.7/css/bootstrap.min.css"
                asp-fallback-href="~/lib/bootstrap/dist/css/bootstrap.min.css"
                asp-fallback-test-class="sr-only" asp-fallback-test-property="position" asp-fallback-test-value="absolute" />
        <link rel="stylesheet" href="~/css/site.min.css" asp-append-version="true" />
    </environment>
```
```html
    <nav class="navbar navbar-inverse navbar-fixed-top">
        <div class="container">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a asp-area="" asp-controller="Home" asp-action="Index" class="navbar-brand">website</a>
            </div>
            <div class="navbar-collapse collapse">
                <ul class="nav navbar-nav">
                    <li><a asp-area="" asp-controller="Home" asp-action="Index">Home</a></li>
                    <li><a asp-area="" asp-controller="Home" asp-action="About">About</a></li>
                    <li><a asp-area="" asp-controller="Home" asp-action="Contact">Contact</a></li>
                </ul>
            </div>
        </div>
    </nav>
```
```html
    <environment include="Development">
        <script src="~/lib/jquery/dist/jquery.js"></script>
        <script src="~/lib/bootstrap/dist/js/bootstrap.js"></script>
        <script src="~/js/site.js" asp-append-version="true"></script>
    </environment>
    <environment exclude="Development">
        <script src="https://ajax.aspnetcdn.com/ajax/jquery/jquery-2.2.0.min.js"
                asp-fallback-src="~/lib/jquery/dist/jquery.min.js"
                asp-fallback-test="window.jQuery"
                crossorigin="anonymous"
                integrity="sha384-K+ctZQ+LL8q6tP7I94W+qzQsfRV2a+AfHIi9k8z8l9ggpc8X+Ytst4yBo/hH+8Fk">
        </script>
        <script src="https://ajax.aspnetcdn.com/ajax/bootstrap/3.3.7/bootstrap.min.js"
                asp-fallback-src="~/lib/bootstrap/dist/js/bootstrap.min.js"
                asp-fallback-test="window.jQuery && window.jQuery.fn && window.jQuery.fn.modal"
                crossorigin="anonymous"
                integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa">
        </script>
        <script src="~/js/site.min.js" asp-append-version="true"></script>
    </environment>
    
    @RenderSection("Scripts", required: false)
```

3. Install javascript dependency manager and first libraries

I am using Yarn as my dependency manager but NPM would also work too, make sure what ever you choose is installed globally.

* Install Yarn: https://yarnpkg.com/en/docs/install
* Install NPM: https://www.npmjs.com/get-npm

Initalise the repository for the javascript libraries
```
cd website/
website$ yarn init

yarn init v1.3.2
question name (website): 
question version (1.0.0): 
question description: Simple repository with webpack
question entry point (index.js): 
question repository url: https://github.com/TheYorkshireDev/dotnetcore-webpack
question author: TheYorkshireDev
question license (MIT): 
question private: 
success Saved package.json
✨  Done in 74.29s.
```

This adds `package.json` to the root of the website folder

The first library we need is `webpack` so lets install it:
* Yarn: `yarn add webpack`
* NPM: `npm install webpack`

For quicker testing and a better user experience it is a good idea to install it globally too:
* Yarn: `yarn global add webpack`
* NPM: `npm install -g webpack`

4. Initial webpack configuration

Before we create any webpack config, some project configuration needs to take place. Usually, with dotnet core anything under the `wwwroot/` folder is published for this project though that is not going to be the case. We will NOT be publishing the css, javascript or images because they should be bundled by webpack. Instead we are going to be publishing as `dist/` folder containing these bundles, as such we need to exclude the paths of css, javascript and images.

In the `.csproj` file add:
```xml
  <ItemGroup>
    <Content Update="wwwroot\css\**\*.*" CopyToPublishDirectory="Never" />
    <Content Update="wwwroot\js\**\*.*" CopyToPublishDirectory="Never" />
    <Content Update="wwwroot\images\**\*.*" CopyToPublishDirectory="Never" />
  </ItemGroup>
```

Add two javascript files that we will use to test whether webpack worked.

Add `wwwroot/js/other.js`:
```js
function func() {
    document.getElementById("title").style.color = "#ff0000";
}

module.exports = func;
```

Add `wwwroot/js/main.js`:
```js
var other = require('./other');

other();
```
All we are doing here is making the title on the homepage red.

Add the code to the view which gives us a title to update and loads the bundle.

To `_layout.cshtml` add to the bottom of the body:
```html
<script src="~/dist/main.build.js" asp-append-version="true"></script>
</body>
</html>
```

5. Build webpack with dotnet

Webpack ideally should be built alongside the C# build rather than calling `webpack` directly, so lets add a couple of targets in the `.csproj`.

Add a build step to run webpack on build:
```xml
  <Target Name="DebugRunWebpack" BeforeTargets="Build" Condition=" '$(Configuration)' == 'Debug' ">
    <!-- Ensure Node.js is installed -->
    <Exec Command="node --version" ContinueOnError="true">
      <Output TaskParameter="ExitCode" PropertyName="ErrorCode" />
    </Exec>
    <Error Condition="'$(ErrorCode)' != '0'" Text="Node.js is required to build and run this project. To continue, please install Node.js from https://nodejs.org/, and then restart your command prompt or IDE." />

    <!-- In development, the dist files won't exist on the first run or when cloning to
         a different machine, so rebuild them if not already present. -->
    <Message Importance="high" Text="Performing development Webpack build..." />
    <Exec Command="node node_modules/webpack/bin/webpack.js" />
  </Target>
```

Add a build step to run webpack on publish:
```xml
  <Target Name="PublishRunWebpack" AfterTargets="ComputeFilesToPublish">
    <!-- As part of publishing, ensure the JS resources are freshly built in production mode -->

    <Exec Command="npm install" />
    <Message Importance="high" Text="Performing production Webpack build..." />
    <Exec Command="node node_modules/webpack/bin/webpack.js --env.prod" />

    <!-- Include the newly-built files in the publish output -->
    <ItemGroup>
      <DistFiles Include="wwwroot\dist\**" />
      <ResolvedFileToPublish Include="@(DistFiles->'%(FullPath)')" Exclude="@(ResolvedFileToPublish)">
        <RelativePath>%(DistFiles.Identity)</RelativePath>
        <CopyToPublishDirectory>PreserveNewest</CopyToPublishDirectory>
      </ResolvedFileToPublish>
    </ItemGroup>
  </Target>
```

6. Create production and development configs

We are going to extend the webpack configuration to allow for different environments such as development and production. In addition to the environments we want to reduce the amount of duplication between the two and therefore we will also have a base/common config.

Create a webpack folder with three files:
```
webpack/
  - webpack.base.config.js
  - webpack.dev.config.js
  - webpack.prod.config.js
```

We need to install a few additional javascript packages for our webpack config:
```
yarn add webpack-merge
yarn add uglifyjs-webpack-plugin
```

The location of the entry point and the name of the output bundle is not going to change depending on environment so these should be defined in the `webpack.base.config.js`.

```js
var path = require('path');

function baseConfig(currentDirectory) {
    var config = {
        entry: {
            main: './wwwroot/js/main'
        },
        output: {
            publicPath: "/dist/",
            path: path.join(currentDirectory, '/wwwroot/dist/'),
            filename: 'main.build.js'
        }
    };

    return config;
}

module.exports = baseConfig;
```
You may notice we pass in the current directory, this is because these webpack configs are not located in the root of the project so calling `__dirname` here would give us the incorrect folder.

In the development environment it is useful to have source-map for debugging javascript issues, so we add source map to the development config in `webpack.dev.config.js`

```js
var config = {
    devtool: 'eval-source-map'
};

module.exports = config;
```

For production environments you want javascript to be minified so we will add this configuration to `webpack.prod.config.js`

```js
var UglifyJsPlugin = require('uglifyjs-webpack-plugin');

var config = {
  plugins: [
    // Minify JS
    new UglifyJsPlugin({
      sourceMap: false
    })
  ]
};

module.exports = config;
```

Edit the `webpack.config.js` file to call each of these specific files depending on the environment.

```js
/*
 * Webpack configuration
 *
 * This file is is the entry point for running webpack. 
 */
var merge = require('webpack-merge');
var baseConfig = require('./webpack/webpack.base.config.js');
var devConfig = require('./webpack/webpack.dev.config.js');
var prodConfig = require('./webpack/webpack.prod.config.js');

var currentDirectory = __dirname;

module.exports = (env) => {
    const isDevBuild = !(env && env.prod);
    return merge(baseConfig(currentDirectory), isDevBuild ? devConfig : prodConfig);
};
```

<hr>

# Sources

* http://cecilphillip.com/setting-up-webpack-in-asp-net-core/
* https://medium.com/making-internets/webpack-configuration-done-right-86c325a6927f
* https://simonsmith.io/organising-webpack-config-environments/
* https://medium.com/@nirjhor123/webpack-3-quickstarter-configure-webpack-from-scratch-30a6c394038a