"use strict";

var gulp = require("gulp");
var sass = require("gulp-sass");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var rename = require("gulp-rename");
var autoprefixer = require("autoprefixer");
var server = require("browser-sync").create();
var concat = require('gulp-concat');
var del = require("del");

gulp.task("clean", function () {
  return del("build");
});

gulp.task("copy", function () {
  return gulp.src([
      "source/fonts/**/*.{woff,woff2}",
      "source/img/**",
      "source/js/**"
    ], {
      base: "source"
    })
    .pipe(gulp.dest("build"));
});

gulp.task("css", function () {
  return gulp.src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());
});

gulp.task("html", function () {
  return gulp.src("source/*.html")
    .pipe(gulp.dest("build"));
});

gulp.task("pixel-glass-js", function () {
  return gulp.src("node_modules/pixel-glass/script.js")
    .pipe(rename("pixel-glass.js"))
    .pipe(gulp.dest("build/js"));
});

gulp.task("pixel-glass-css", function () {
  return gulp.src("node_modules/pixel-glass/styles.css")
    .pipe(rename("pixel-glass.css"))
    .pipe(gulp.dest("build/css"));
});

gulp.task("normalize-css", function () {
  return gulp.src("node_modules/normalize.css/normalize.css")
    .pipe(gulp.dest("build/css"));
});

gulp.task("polyfill-js", function () {
  return gulp.src(["node_modules/picturefill/dist/picturefill.min.js", "node_modules/svgxuse/svgxuse.min.js"])
    .pipe(concat("polyfill.min.js"))
    .pipe(gulp.dest("build/js"));
});

gulp.task("build", gulp.series(
  "clean",
  "copy",
  "css",
  "html",
  "normalize-css",
  "polyfill-js",
  "pixel-glass-js",
  "pixel-glass-css"
));


gulp.task("server", function () {
  server.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("source/sass/**/*.{scss,sass}", gulp.series("css"));
  gulp.watch("source/*.html", gulp.series("html", "refresh"));
});

gulp.task("refresh", function (done) {
  server.reload();
  done();
});

gulp.task("start", gulp.series("build", "server"));
