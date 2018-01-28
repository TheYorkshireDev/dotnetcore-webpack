# Dotnet Core Application with Webpack

A simple dotnet core web application that utilises webpack for bundling assets such as javascript, css and images.

Things to do:
- [x] 1. Create Dotnet Core 2.0 project
- [x] 2. Streamline pages and remove cruft that webpack will undertake
- [ ] 3. Install yarn and webpack
- [ ] 4. Add first webpack config and update build process to run it
- [ ] 5. Create production and development configs 
- [ ] 6. Add vendor configs 
- [ ] 7. Include less files
- [ ] 8. Implement more advanced plugins 

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
```
<p>Use this area to provide additional information.</p>
```

* Remove from Views/Home/Contact.cshtml
```
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

* Remove from Views/Home/Home.cshtml
```
    <div id="myCarousel" class="carousel slide" data-ride="carousel" data-interval="6000">
        <ol class="carousel-indicators">
            <li data-target="#myCarousel" data-slide-to="0" class="active"></li>
            <li data-target="#myCarousel" data-slide-to="1"></li>
            <li data-target="#myCarousel" data-slide-to="2"></li>
            <li data-target="#myCarousel" data-slide-to="3"></li>
        </ol>
        <div class="carousel-inner" role="listbox">
            <div class="item active">
                <img src="~/images/banner1.svg" alt="ASP.NET" class="img-responsive" />
                <div class="carousel-caption" role="option">
                    <p>
                        Learn how to build ASP.NET apps that can run anywhere.
                        <a class="btn btn-default" href="https://go.microsoft.com/fwlink/?LinkID=525028&clcid=0x409">
                            Learn More
                        </a>
                    </p>
                </div>
            </div>
            <div class="item">
                <img src="~/images/banner2.svg" alt="Visual Studio" class="img-responsive" />
                <div class="carousel-caption" role="option">
                    <p>
                        There are powerful new features in Visual Studio for building modern web apps.
                        <a class="btn btn-default" href="https://go.microsoft.com/fwlink/?LinkID=525030&clcid=0x409">
                            Learn More
                        </a>
                    </p>
                </div>
            </div>
            <div class="item">
                <img src="~/images/banner3.svg" alt="Package Management" class="img-responsive" />
                <div class="carousel-caption" role="option">
                    <p>
                        Bring in libraries from NuGet and npm, and automate tasks using Grunt or Gulp.
                        <a class="btn btn-default" href="https://go.microsoft.com/fwlink/?LinkID=525029&clcid=0x409">
                            Learn More
                        </a>
                    </p>
                </div>
            </div>
            <div class="item">
                <img src="~/images/banner4.svg" alt="Microsoft Azure" class="img-responsive" />
                <div class="carousel-caption" role="option">
                    <p>
                        Learn how Microsoft's Azure cloud platform allows you to build, deploy, and scale web apps.
                        <a class="btn btn-default" href="https://go.microsoft.com/fwlink/?LinkID=525027&clcid=0x409">
                            Learn More
                        </a>
                    </p>
                </div>
            </div>
        </div>
        <a class="left carousel-control" href="#myCarousel" role="button" data-slide="prev">
            <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
        </a>
        <a class="right carousel-control" href="#myCarousel" role="button" data-slide="next">
            <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
        </a>
    </div>
    
    <div class="row">
        <div class="col-md-3">
            <h2>Application uses</h2>
            <ul>
                <li>Sample pages using ASP.NET Core MVC</li>
                <li>Theming using <a href="https://go.microsoft.com/fwlink/?LinkID=398939">Bootstrap</a></li>
            </ul>
        </div>
        <div class="col-md-3">
            <h2>How to</h2>
            <ul>
                <li><a href="https://go.microsoft.com/fwlink/?LinkID=398600">Add a Controller and View</a></li>
                <li><a href="https://go.microsoft.com/fwlink/?LinkId=699315">Manage User Secrets using Secret Manager.</a></li>
                <li><a href="https://go.microsoft.com/fwlink/?LinkId=699316">Use logging to log a message.</a></li>
                <li><a href="https://go.microsoft.com/fwlink/?LinkId=699317">Add packages using NuGet.</a></li>
                <li><a href="https://go.microsoft.com/fwlink/?LinkId=699319">Target development, staging or production environment.</a></li>
            </ul>
        </div>
        <div class="col-md-3">
            <h2>Overview</h2>
            <ul>
                <li><a href="https://go.microsoft.com/fwlink/?LinkId=518008">Conceptual overview of what is ASP.NET Core</a></li>
                <li><a href="https://go.microsoft.com/fwlink/?LinkId=699320">Fundamentals of ASP.NET Core such as Startup and middleware.</a></li>
                <li><a href="https://go.microsoft.com/fwlink/?LinkId=398602">Working with Data</a></li>
                <li><a href="https://go.microsoft.com/fwlink/?LinkId=398603">Security</a></li>
                <li><a href="https://go.microsoft.com/fwlink/?LinkID=699321">Client side development</a></li>
                <li><a href="https://go.microsoft.com/fwlink/?LinkID=699322">Develop on different platforms</a></li>
                <li><a href="https://go.microsoft.com/fwlink/?LinkID=699323">Read more on the documentation site</a></li>
            </ul>
        </div>
        <div class="col-md-3">
            <h2>Run &amp; Deploy</h2>
            <ul>
                <li><a href="https://go.microsoft.com/fwlink/?LinkID=517851">Run your app</a></li>
                <li><a href="https://go.microsoft.com/fwlink/?LinkID=517853">Run tools such as EF migrations and more</a></li>
                <li><a href="https://go.microsoft.com/fwlink/?LinkID=398609">Publish to Microsoft Azure Web Apps</a></li>
            </ul>
        </div>
    </div>
```

* Remove from Views/Shared/_Layout.cshtml
```
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
```
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
```
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
