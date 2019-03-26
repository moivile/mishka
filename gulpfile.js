"use strict";

var gulp = require("gulp");
var sass = require("gulp-sass");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var rename = require("gulp-rename");
var autoprefixer = require("autoprefixer");
var server = require("browser-sync").create();
var concat = require('gulp-concat');

gulp.task("css", function () {
  return gulp.src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest("source/css"))
    .pipe(server.stream());
});

gulp.task("pixel-glass-js", function () {
  return gulp.src("node_modules/pixel-glass/script.js")
    .pipe(rename("pixel-glass.js"))
    .pipe(gulp.dest("source/js"));
});

gulp.task("pixel-glass-css", function () {
  return gulp.src("node_modules/pixel-glass/styles.css")
    .pipe(rename("pixel-glass.css"))
    .pipe(gulp.dest("source/css"));
});

gulp.task("normalize-css", function () {
  return gulp.src("node_modules/normalize.css/normalize.css")
    .pipe(gulp.dest("source/css"));
});

gulp.task("polyfill-js", function () {
  return gulp.src(["node_modules/picturefill/dist/picturefill.min.js", "node_modules/svgxuse/svgxuse.min.js"])
    .pipe(concat("polyfill.min.js"))
    .pipe(gulp.dest("source/js"));
});


gulp.task("server", function () {
  server.init({
    server: "source/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("source/sass/**/*.{scss,sass}", gulp.series("css"));
  gulp.watch("source/*.html").on("change", server.reload);
});


gulp.task("start", gulp.series("css", "normalize-css", "pixel-glass-js", "pixel-glass-css", "polyfill-js", "server"));
