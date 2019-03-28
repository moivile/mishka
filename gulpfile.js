"use strict";

const gulp = require("gulp");
const sass = require("gulp-sass");
const plumber = require("gulp-plumber");
const postcss = require("gulp-postcss");
const rename = require("gulp-rename");
const autoprefixer = require("autoprefixer");
const server = require("browser-sync").create();
const concat = require('gulp-concat');
const del = require("del");
const csso = require("gulp-csso");
const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");
const filter = require("gulp-filter");
const svgstore = require("gulp-svgstore");
const cheerio = require("gulp-cheerio");

gulp.task("clean", function () {
  return del("build");
});

gulp.task("copy", function () {
  return gulp.src([
      "source/fonts/**/*.{woff,woff2}",
      "source/js/**"
    ], {
      base: "source"
    })
    .pipe(gulp.dest("build"));
});

gulp.task("images", function () {

  const webpFilter = filter(["**", "!build/img/preview/**", "!build/img/background/**"], {
    restore: true
  });

  const spriteSvgFilter = filter(["build/img/inline-svg/**"], {
    restore: true
  });

  return gulp.src(["source/img/**/*.{png,jpg,svg}"])
    .pipe(imagemin([imagemin.optipng({
        optimizationLevel: 1
        // optimizationLevel: 3
      }),
      imagemin.jpegtran({
        progressive: true
      }),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest("build/img"))
    .pipe(webpFilter)
    .pipe(webp({
      quality: 90
      // quality: 80
    }))
    .pipe(webpFilter.restore)
    .pipe(spriteSvgFilter)
    .pipe(cheerio({
      run: function ($) {
        $('[fill]').removeAttr('fill');
      },
      parserOptions: {
        xmlMode: true
      }
    }))
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename("sprite.svg"))
    .pipe(spriteSvgFilter.restore)
    .pipe(gulp.dest("build/img"));
});

gulp.task("css", function () {
  return gulp.src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest("build/css"))
    .pipe(csso())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());
});

gulp.task("html", function () {
  return gulp.src("source/*.html")
    .pipe(gulp.dest("build"));
});

gulp.task("polyfill-js", function () {
  return gulp.src(["node_modules/picturefill/dist/picturefill.min.js", "node_modules/svgxuse/svgxuse.min.js"])
    .pipe(concat("polyfill.min.js"))
    .pipe(gulp.dest("build/js"));
});

gulp.task("pixel-glass", function () {
  return gulp.src("node_modules/pixel-glass/script.js")
    .pipe(rename("pixel-glass.js"))
    .pipe(gulp.dest("build/js"))
    .pipe(gulp.src("node_modules/pixel-glass/styles.css"))
    .pipe(rename("pixel-glass.css"))
    .pipe(gulp.dest("build/css"));
});



gulp.task("build", gulp.series(
  "clean",
  "copy",
  "images",
  "css",
  "html",
  "polyfill-js",
  "pixel-glass",
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
  gulp.watch("source/*.html", gulp.series("html", "reload"));
});

gulp.task("reload", function (done) {
  server.reload();
  done();
});

gulp.task("start", gulp.series("build", "server"));
