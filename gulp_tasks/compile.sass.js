'use strict';

// -------------------------------------
//   Task: Compile: Sass
// -------------------------------------
const stylemod = require('gulp-style-modules');
const autoprefixer = require('gulp-autoprefixer');
const path = require('path');
const importOnce = require('node-sass-import-once');

var getName = function(file) {
  return path.basename(file.path, path.extname(file.path));
};

var styleModuleDest = function(file) {
  return file.base;
};

module.exports = function(gulp, plugins) {
  return function() {

    return gulp.src([
        './src/*.scss',
        './src/**/*.scss'
      ])
      .pipe(plugins.sass({
          includePaths: './bower_components/',
          importer: importOnce,
          importOnce: {
            index: true,
            bower: true
          }
        })
        .on('error', plugins.sass.logError))
      .pipe(autoprefixer())
      .pipe(stylemod({
        // All files will be named 'styles.html'
        filename: function(file) {
          var name = getName(file) + '-styles';
          return name;
        },
        // Use '-css' suffix instead of '-styles' for module ids
        moduleId: function(file) {
          return getName(file) + '-styles';
        }
      }))
      .pipe(gulp.dest(styleModuleDest));

  };
};
